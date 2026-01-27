# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from rest_framework_simplejwt.views import TokenRefreshView
# from . import api_views

# router = DefaultRouter()
# router.register(r'categories', api_views.CategoryViewSet)
# router.register(r'suppliers', api_views.SupplierViewSet)
# router.register(r'products', api_views.ProductViewSet)
# router.register(r'stock-in', api_views.StockInViewSet)
# router.register(r'sales', api_views.SaleViewSet)
# router.register(r'sale-items', api_views.SaleItemViewSet)

# urlpatterns = [
#     # Authentication
#     path('auth/login/', api_views.login_view, name='api_login'),
#     path('auth/logout/', api_views.logout_view, name='api_logout'),
#     path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('auth/user/', api_views.current_user, name='current_user'),
    
#     # API routes
#     path('', include(router.urls)),
# ]