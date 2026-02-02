# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import *
import uuid

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    registration_number = models.CharField(max_length=100, unique=True, null=True, blank=True)
    logo = models.ImageField(upload_to='company_logos/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'companies'
        verbose_name_plural = 'Companies'
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    username = None  # Remove username field
    email = models.EmailField(unique=True, db_index=True)
    
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('manager', 'Manager'),
        ('staff', 'Staff')
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='staff')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, 
                                related_name='users', null=True, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager() 

    class Meta:
        db_table = 'users'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.email} ({self.role})"


class AdminProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, 
                                related_name='admin_profile')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, 
                                related_name='admins')
    admin_code = models.CharField(max_length=50, unique=True)  # Unique admin code
    can_create_managers = models.BooleanField(default=True)
    can_create_staff = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'admin_profiles'
        unique_together = ['user', 'company']  # One admin profile per user per company

    def __str__(self):
        return f"Admin: {self.user.email} - {self.company.name}"


class ManagerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, 
                                related_name='manager_profile')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, 
                                related_name='managers')
    created_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, 
                                   null=True, related_name='created_managers')
    department = models.CharField(max_length=100, blank=True)
    can_create_staff = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'manager_profiles'

    def __str__(self):
        return f"Manager: {self.user.email} - {self.company.name}"


class StaffProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, 
                                related_name='staff_profile')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, 
                                related_name='staff')
    created_by = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, 
                                   null=True, related_name='created_staff')
    department = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'staff_profiles'

    def __str__(self):
        return f"Staff: {self.user.email} - {self.company.name}"
