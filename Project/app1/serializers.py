from rest_framework import serializers
from .models import Product,Category,Supplier,StockIn,Sale, SaleItem
from django.db import transaction
#Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model =Category
        fields="__all__"


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model =Supplier
        fields="__all__"

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )
    supplier= serializers.PrimaryKeyRelatedField(
        queryset=Supplier.objects.all()
    )

    class Meta:
        model = Product
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(instance.category).data
        data['supplier'] = SupplierSerializer(instance.supplier).data
        return data






class StockInSerializer(serializers.ModelSerializer):
    class Meta:
        model =StockIn
        fields="__all__"


class SaleItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = SaleItem
        fields = ["product", "quantity", "price"]

class SaleSerializer(serializers.ModelSerializer):
    items = SaleItemSerializer(many=True)

    class Meta:
        model = Sale
        fields = ["id", "customer_name", "customer_phone", "date", "subtotal", "tax", "total_amount", "items"]
        read_only_fields = ["id", "date"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")

        with transaction.atomic():
            sale = Sale.objects.create(**validated_data)

            for item in items_data:
                product = item["product"]
                quantity = item["quantity"]

                if quantity > product.quantity:
                    raise serializers.ValidationError(  
                        f"Not enough stock for product id {product.id}"
                    )

                SaleItem.objects.create(
                    sale=sale,
                    product=product,
                    quantity=quantity,
                )

                product.quantity -= quantity
                product.save()

        return sale


from django.contrib.auth.models import User
from rest_framework import serializers

class Userserializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True,min_length=8,style={'input_type':'password'})
    class Meta:
        model=User
        fields =['username','email','password']
    def create(self, validated_data):
        user=User.objects.create_user(**validated_data) 
        return user