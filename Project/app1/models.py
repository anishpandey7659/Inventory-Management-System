from django.db import models, transaction
from django.db.models import F,Sum
from decimal import Decimal
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError
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
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    supplier = models.ForeignKey(Supplier,on_delete=models.CASCADE)
    sku = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.product_name} - ({self.sku})"
    

class StockIn(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # only when creating
            self.product.quantity += self.quantity
            self.product.save()
        super().save(*args, **kwargs)


class StockOut(models.Model):
    customer_name = models.CharField(max_length=50, default="Unknown")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        with transaction.atomic():
            product = Product.objects.select_for_update().get(id=self.product.id)

            if product.quantity < self.quantity:
                raise ValidationError("Not enough stock!")

            product.quantity = F('quantity') - self.quantity
            product.save(update_fields=['quantity'])

            super().save(*args, **kwargs)

class Sale(models.Model):
    customer_name = models.CharField(max_length=50,blank=True, null=True)
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
            )['total'] or 0

        tax_rate = Decimal('0.08')
        tax = subtotal * tax_rate # Example tax 8%
        self.subtotal = subtotal
        self.tax = tax
        self.total_amount = subtotal + tax
        self.save()


class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)


    def save(self, *args, **kwargs):
        self.price = self.product.selling_price
        self.total = self.price * self.quantity

        with transaction.atomic():
            product = Product.objects.select_for_update().get(id=self.product.id)

            if self.pk:
                old_item = SaleItem.objects.select_for_update().get(pk=self.pk)
                product.quantity = F('quantity') + old_item.quantity

            if product.quantity < self.quantity:
                raise ValidationError("Not enough stock!")

            product.quantity = F('quantity') - self.quantity
            product.save(update_fields=["quantity"])

            super().save(*args, **kwargs)

        self.sale.update_totals()

    def delete(self, *args, **kwargs):
        with transaction.atomic():
            product = Product.objects.select_for_update().get(id=self.product.id)
            product.quantity = F('quantity') + self.quantity
            product.save(update_fields=["quantity"])
            super().delete(*args, **kwargs)

        self.sale.update_totals()



