from django.contrib import admin
from .models import Category,Supplier,Product,StockIn,StockOut,Sale,SaleItem
# Register your models here.
admin.site.register(Category)
admin.site.register(Supplier)
admin.site.register(Product)
admin.site.register(StockIn)
admin.site.register(StockOut)
# admin.site.register(Sale)
# admin.site.register(SaleItem)

class SaleItemInline(admin.TabularInline):
    model = SaleItem
    extra = 1 

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    inlines = [SaleItemInline]