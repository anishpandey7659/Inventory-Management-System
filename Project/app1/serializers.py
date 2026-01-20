from rest_framework import serializers
from .models import Product,Category,Supplier,StockOut,StockIn

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
    supplier = serializers.PrimaryKeyRelatedField(
        queryset=Supplier.objects.all()
    )
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )

    class Meta:
        model = Product
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(instance.category).data
        data['supplier'] = SupplierSerializer(instance.supplier).data
        return data



class StockOutSerializer(serializers.ModelSerializer):
    class Meta:
        model =StockOut
        fields="__all__"


class StockInSerializer(serializers.ModelSerializer):
    class Meta:
        model =StockIn
        fields="__all__"