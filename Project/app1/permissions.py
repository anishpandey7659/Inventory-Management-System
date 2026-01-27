# from rest_framework import permissions

# class IsAdmin(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user and request.user.is_authenticated and \
#                hasattr(request.user, 'profile') and request.user.profile.role == 'admin'

# class IsAdminOrManager(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user and request.user.is_authenticated and \
#                hasattr(request.user, 'profile') and \
#                request.user.profile.role in ['admin', 'manager']

# class IsAdminOrManagerOrCashier(permissions.BasePermission):
#     def has_permission(self, request, view):
#         return request.user and request.user.is_authenticated and \
#                hasattr(request.user, 'profile') and \
#                request.user.profile.role in ['admin', 'manager', 'cashier']