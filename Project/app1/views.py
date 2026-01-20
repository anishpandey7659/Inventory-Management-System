from django.http import HttpResponse
from .models import Product,Category,Supplier,StockOut,StockIn
from rest_framework import viewsets
from .serializers import ProductSerializer,CategorySerializer,SupplierSerializer,StockOutSerializer,StockInSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProductFilter,StockInFilter,StockOutFilter
from rest_framework.filters import SearchFilter


# Create your views here.
def first_view(request):
    return HttpResponse("Hi, How are you")


class ProductViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_class = ProductFilter
    search_fields = ['product_name']


class CategoryViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset=Supplier.objects.all()
    serializer_class=SupplierSerializer


class StockOutViewSet(viewsets.ModelViewSet):
    queryset=StockOut.objects.all().order_by('-date')
    serializer_class=StockOutSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = StockOutFilter
    search_fields = ['product__product_name']

class StockInViewSet(viewsets.ModelViewSet):
    queryset=StockIn.objects.all().order_by('-date')
    serializer_class=StockInSerializer
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_class = StockInFilter
    search_fields = ['product__product_name','supplier__name']






