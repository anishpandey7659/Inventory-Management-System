from django.db import models, transaction
from django.db.models import F,Sum
from decimal import Decimal
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return self.name

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    product_name = models.CharField(max_length=100)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0) 
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    sku = models.CharField(max_length=50, unique=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.product_name} - ({self.sku})"

    

class StockIn(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="stock_ins")
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE,null=True)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            # New StockIn
            with transaction.atomic():
                self.product.quantity += self.quantity
                self.product.save(update_fields=["quantity"])
                super().save(*args, **kwargs)
        else:
            # Updating existing StockIn
            old = StockIn.objects.get(pk=self.pk)
            diff = self.quantity - old.quantity
            with transaction.atomic():
                self.product.quantity += diff
                self.product.save(update_fields=["quantity"])
                super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.product.product_name} - {self.quantity}"




from decimal import Decimal, ROUND_HALF_UP
class Sale(models.Model):
    customer_name = models.CharField(max_length=50, blank=True, null=True)
    customer_phone = models.CharField(max_length=15, blank=True, null=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sale #{self.id} - {self.customer_name}"

    def update_totals(self):
        subtotal = self.items.aggregate(
            total=Sum(F('price') * F('quantity'))
        )['total'] or Decimal("0.00")

        tax_rate = Decimal("0.08")
        tax = (subtotal * tax_rate).quantize(Decimal("0.01"))

        Sale.objects.filter(pk=self.pk).update(
            subtotal=subtotal,
            tax=tax,
            total_amount=subtotal + tax
        )

class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey("Product", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def _update_price_total(self):
        self.price = self.product.selling_price
        self.total = (self.price * self.quantity).quantize(Decimal("0.01"))

    def _deduct_stock(self, product, qty):
        if product.quantity < qty:
            raise ValidationError("Not enough stock!")
        product.quantity = F('quantity') - qty
        product.save(update_fields=["quantity"])

    def _add_stock(self, product, qty):
        product.quantity = F('quantity') + qty
        product.save(update_fields=["quantity"])

    def save(self, *args, **kwargs):
        self._update_price_total()

        with transaction.atomic():
            # Lock the product row
            product = Product.objects.select_for_update().get(pk=self.product_id)

            if self.pk:
                # Update case
                old_item = SaleItem.objects.select_for_update().get(pk=self.pk)

                if old_item.sale_id != self.sale_id:
                    raise ValidationError("Cannot move item to another sale")

                # If product changed, restore stock of old product first
                if old_item.product_id != self.product_id:
                    old_product = Product.objects.select_for_update().get(pk=old_item.product_id)
                    self._add_stock(old_product, old_item.quantity)
                else:
                    # Same product, restore old quantity
                    self._add_stock(product, old_item.quantity)

            # Deduct stock for new quantity
            self._deduct_stock(product, self.quantity)

            super().save(*args, **kwargs)

        # Update sale totals after saving
        self.sale.update_totals()

    def delete(self, *args, **kwargs):
        with transaction.atomic():
            product = Product.objects.select_for_update().get(pk=self.product_id)
            self._add_stock(product, self.quantity)
            super().delete(*args, **kwargs)

        self.sale.update_totals()

class UserProfile(models.Model):
    ADMIN='admin'
    EMPLOYEE='employee'

    ROLE_CHOICE =[
        (ADMIN,'Admin'),
        (EMPLOYEE,'Employee'),
        ]
    
    user =models.models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    role =models.CharField(max_length=50,choices=ROLE_CHOICE,default=EMPLOYEE)
    phone=models.CharField(max_length=15,blank=True,null=True)

    def __str__(self):
        return f"{self.user.username} - {self.role}"