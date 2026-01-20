import os
import sys
import django
from faker import Faker
import random


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Project/Project/settings')
django.setup()

from .models import Category, Supplier, Product, StockIn, StockOut

fake = Faker()

# Create Categories
categories = []
for _ in range(5):
    cat = Category.objects.create(name=fake.word())
    categories.append(cat)

# Create Suppliers
suppliers = []
for _ in range(5):
    sup = Supplier.objects.create(
        name=fake.company(),
        phone=fake.phone_number(),
        email=fake.email(),
        address=fake.address()
    )
    suppliers.append(sup)

# Create Products
products = []
for _ in range(10):
    prod = Product.objects.create(
        product_name=fake.word(),
        sku=fake.unique.bothify(text='??-#####').upper(),
        category=random.choice(categories),
        supplier=random.choice(suppliers),
        purchase_price=round(random.uniform(10, 100), 2),
        selling_price=round(random.uniform(100, 200), 2),
        quantity=0
    )
    products.append(prod)

# Stock In (Add stock)
for product in products:
    StockIn.objects.create(
        product=product,
        quantity=random.randint(5, 20)
    )

# Stock Out (Sell stock)
for product in products:
    StockOut.objects.create(
        product=product,
        quantity=random.randint(1, 5)
    )

print("Demo data created successfully!")
