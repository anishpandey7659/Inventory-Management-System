from django.db import models

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
    quantity = models.IntegerField()
    supplier = models.ForeignKey(Supplier,on_delete=models.CASCADE)
    sku = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.product_name} - ({self.sku})"
    

class StockIn(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:  # only when creating
            self.product.quantity += self.quantity
            self.product.save()
        super().save(*args, **kwargs)


class StockOut(models.Model):
    customer_name = models.CharField(max_length=50, default="Unknown")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.quantity >self.product.quantity:
            raise ValueError("Not enough stock!")
        self.product.quantity -= self.quantity
        self.product.save()
        super().save(*args, **kwargs)

class Sale(models.Model):
    customer_name = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sale #{self.id} - {self.customer_name}"


class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        if self.quantity > self.product.quantity:
            raise ValueError("Not enough stock!")

        self.product.quantity -= self.quantity
        self.product.save()
        super().save(*args, **kwargs)


