from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, SupplierViewSet, StockInViewSet, StockOutViewSet, first_view,SaleViewSet


router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('categories', CategoryViewSet)
router.register('suppliers', SupplierViewSet)
router.register('stockin', StockInViewSet)
router.register('stockout', StockOutViewSet)
router.register("sales", SaleViewSet, basename="sale")

urlpatterns = [
    # your app urls go here
    path('', include(router.urls)),
    path('hello/', first_view),


]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)