from django.http import HttpResponse
from .models import Product,Category,Supplier,StockIn,Sale
from rest_framework import viewsets
from .serializers import ProductSerializer,CategorySerializer,SupplierSerializer,StockInSerializer,SaleSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProductFilter,StockInFilter
from rest_framework.filters import SearchFilter
from django.db.models import Sum, F,Case, When, Value, CharField
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
def first_view(request):
    return HttpResponse("Hi, How are you")


class ProductViewSet(viewsets.ModelViewSet):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_class = ProductFilter
    search_fields = ['product_name']
    
    def get_queryset(self):
        status = self.request.query_params.get("status")

        qs = Product.objects.annotate(
            stock_status=Case(
                When(quantity=0, then=Value("out_stock")),
                When(quantity__lte=20, then=Value("low_stock")),
                default=Value("in_stock"),
                output_field=CharField(),
            )
        )

        if status:
            qs = qs.filter(stock_status=status)

        return qs


class CategoryViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer
    pagination_class = None

class SupplierViewSet(viewsets.ModelViewSet):
    queryset=Supplier.objects.all()
    serializer_class=SupplierSerializer
    pagination_class = None


class StockInViewSet(viewsets.ModelViewSet):
    queryset=StockIn.objects.all().order_by('-date')
    serializer_class=StockInSerializer
    filter_backends = [DjangoFilterBackend,SearchFilter]
    filterset_class = StockInFilter
    search_fields = ['product__product_name','supplier__name']

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all() \
        .prefetch_related("items") \
        .order_by("-date")
    serializer_class = SaleSerializer




@api_view(['GET'])
def total_revenue(request):
    revenue = Sale.objects.aggregate(
        total_revenue=Sum('total_amount')
    )['total_revenue'] or 0

    return Response({"total_revenue": revenue})



### Auth
from .serializers import Userserializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class Registerview(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class =Userserializer
    permission_classes=[AllowAny] 
 
class ProtectedView(APIView):
    permission_classes =[IsAuthenticated]

    def get(self,request):
        response ={
            'status':'Request was permitted'
        }
        return Response(response)
        

from collections import defaultdict
from rest_framework.response import Response

@api_view(['GET'])
def products_grouped_by_category(request):
    queryset = Product.objects.select_related('category')

    grouped = defaultdict(list)
    for product in queryset:
        grouped[product.category.name].append(
            ProductSerializer(product).data
        )

    return Response(grouped)


