# from rest_framework import viewsets, status
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.contrib.auth import authenticate
# from .models import Product, Sale, SaleItem, Category, Supplier, StockIn, UserProfile
# from .serializers import (
#     ProductSerializer, SaleSerializer, SaleItemSerializer,
#     CategorySerializer, SupplierSerializer, StockInSerializer,
#     UserSerializer, LoginResponseSerializer
# )
# from .permissions import IsAdmin, IsAdminOrManager, IsAdminOrManagerOrCashier

# # Authentication Views
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login_view(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
    
#     user = authenticate(username=username, password=password)
    
#     if user is not None:
#         refresh = RefreshToken.for_user(user)
        
#         return Response({
#             'access': str(refresh.access_token),
#             'refresh': str(refresh),
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#                 'profile': {
#                     'role': user.profile.role,
#                     'phone': user.profile.phone
#                 }
#             }
#         }, status=status.HTTP_200_OK)
    
#     return Response(
#         {'error': 'Invalid credentials'},
#         status=status.HTTP_401_UNAUTHORIZED
#     )

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def current_user(request):
#     serializer = UserSerializer(request.user)
#     return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def logout_view(request):
#     try:
#         refresh_token = request.data.get("refresh")
#         token = RefreshToken(refresh_token)
#         token.blacklist()
#         return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# # Category ViewSet - Admin and Manager only
# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [IsAdminOrManager]

# # Supplier ViewSet - Admin only
# class SupplierViewSet(viewsets.ModelViewSet):
#     queryset = Supplier.objects.all()
#     serializer_class = SupplierSerializer
#     permission_classes = [IsAdmin]

# # Product ViewSet - Admin and Manager can CRUD, Cashier can only read
# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
    
#     def get_permissions(self):
#         if self.action in ['list', 'retrieve']:
#             # All authenticated users can view
#             permission_classes = [IsAuthenticated]
#         else:
#             # Only admin and manager can create/update/delete
#             permission_classes = [IsAdminOrManager]
#         return [permission() for permission in permission_classes]

# # StockIn ViewSet - Admin and Manager only
# class StockInViewSet(viewsets.ModelViewSet):
#     queryset = StockIn.objects.all()
#     serializer_class = StockInSerializer
#     permission_classes = [IsAdminOrManager]

# # Sale ViewSet - All roles can access
# class SaleViewSet(viewsets.ModelViewSet):
#     queryset = Sale.objects.all().prefetch_related('items')
#     serializer_class = SaleSerializer
#     permission_classes = [IsAdminOrManagerOrCashier]
    
#     def get_queryset(self):
#         # Cashiers can only see their own sales if needed
#         if self.request.user.profile.role == 'cashier':
#             # Optionally filter by cashier
#             return Sale.objects.all()
#         return Sale.objects.all()

# # SaleItem ViewSet - All roles can access
# class SaleItemViewSet(viewsets.ModelViewSet):
#     queryset = SaleItem.objects.all()
#     serializer_class = SaleItemSerializer
#     permission_classes = [IsAdminOrManagerOrCashier]