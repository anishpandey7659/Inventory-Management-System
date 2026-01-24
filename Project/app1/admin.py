from django.contrib import admin
from .models import Category,Supplier,Product,StockIn,Sale,SaleItem
# Register your models here.
admin.site.register(Category)
admin.site.register(Supplier)
admin.site.register(Product)
admin.site.register(StockIn)


class SaleItemInline(admin.TabularInline):
    model = SaleItem
    extra = 1 

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    inlines = [SaleItemInline]