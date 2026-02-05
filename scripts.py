import os
import csv
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE","Project.settings")
django.setup()
from .Project.app1.models import Category

def load_csv_data(file_path):
    if not os.path.exists(file_path):
        print(f"File {file_path} does not exist")
        return 
    try:
        with open(file_path,'r') as csvfile:
            reader = csv.DictReader(csvfile)
            products = []

            for row in reader:
                Category = row.get('product_name') 

                if not products_brand or not products_name:
                    print(f"Skipping row with missing data: {row}")
                    continue
                
                products.append(Product(  # Changed 'products' to 'Product'
                    product_name=products_name,
                    product_brand=products_brand,
                    product_price=random.uniform(500,1000)
                ))
            
            # Move bulk_create outside the loop
            Product.objects.bulk_create(products)
            print(f"Successfully updated {len(products)} products")
            
    except Exception as e:
        print(f"Error occurred: {e}")