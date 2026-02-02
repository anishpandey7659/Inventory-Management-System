# serializers.py
from rest_framework import serializers
from django.db import transaction
from .tokens import *
from .models import CustomUser, Company, AdminProfile, ManagerProfile, StaffProfile

class CompanyRegistrationSerializer(serializers.Serializer):
    """Register a new company with an admin user"""
    
    # Company fields
    company_name = serializers.CharField(max_length=255)
    company_email = serializers.EmailField()
    company_phone = serializers.CharField(max_length=15)
    company_address = serializers.CharField()
    
    # Admin user fields
    admin_email = serializers.EmailField()
    admin_password = serializers.CharField(write_only=True)
    admin_confirm_password = serializers.CharField(write_only=True)
    admin_first_name = serializers.CharField(max_length=150)
    admin_last_name = serializers.CharField(max_length=150)
    admin_code = serializers.CharField(max_length=50)

    def validate_company_name(self, value):
        if Company.objects.filter(name__iexact=value).exists():
            raise serializers.ValidationError("Company with this name already exists.")
        return value

    def validate_company_email(self, value):
        if Company.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Company with this email already exists.")
        return value

    def validate_admin_email(self, value):
        if CustomUser.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value

    def validate_admin_code(self, value):
        if AdminProfile.objects.filter(admin_code=value).exists():
            raise serializers.ValidationError("This admin code is already in use.")
        return value
    
    def validate(self, data):
        """Validate that passwords match"""
        if data['admin_password'] != data['admin_confirm_password']:
            raise serializers.ValidationError({
                'admin_confirm_password': "Passwords do not match."
            })
        return data

    @transaction.atomic
    def create(self, validated_data):
        # 1. Create Company
        company = Company.objects.create(
            name=validated_data['company_name'],
            email=validated_data['company_email'],
            phone=validated_data['company_phone'],
            address=validated_data['company_address']
        )

        # 2. Create Admin User
        admin_user = CustomUser.objects.create_user(
            validated_data['admin_email'],
            validated_data['admin_password'],
            first_name=validated_data['admin_first_name'],
            last_name=validated_data['admin_last_name'],
            role='admin',
            company=company,
            is_staff=True
            )

        # 3. Create Admin Profile
        admin_profile = AdminProfile.objects.create(
            user=admin_user,
            company=company,
            admin_code=validated_data['admin_code']
        )
        tokens = get_tokens_for_user(admin_user)

        print("✅ ALL OBJECTS CREATED SUCCESSFULLY!")

        self.instance = {
            'company': company,
            'admin_user': admin_user,
            'admin_profile': admin_profile,
            'tokens': tokens
        }
        return self.instance
    
    def to_representation(self, instance):
        return {
            'company': {
                'id': instance['company'].id,
                'name': instance['company'].name,
                'email': instance['company'].email,
                'phone': instance['company'].phone,
                'address': instance['company'].address,

            },
            'admin_user': {
                'id': instance['admin_user'].id,
                'email': instance['admin_user'].email,
                'first_name': instance['admin_user'].first_name,
                'last_name': instance['admin_user'].last_name,
                'role': instance['admin_user'].role,
            },
            'tokens': instance['tokens'],
            'message': 'Company and admin user created successfully'
        }

class CreateManagerSerializer(serializers.Serializer):
    """Admin creates a manager"""
    
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=15)
    department = serializers.CharField(max_length=100, required=False, allow_blank=True)

    def validate_email(self, value):
        if CustomUser.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value

    def validate(self, attrs):
        # Check if the requester is an admin
        request = self.context.get('request')
        if not request or request.user.role != 'admin':
            raise serializers.ValidationError("Only admins can create managers.")
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        request = self.context.get('request')
        admin_user = request.user

        # Create Manager User
        manager_user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            role='manager',
            company=admin_user.company
        )

        # Create Manager Profile
        manager_profile = ManagerProfile.objects.create(
            user=manager_user,
            company=admin_user.company,
            created_by=admin_user,
            department=validated_data.get('department', '')
        )

        return manager_user


class CreateStaffSerializer(serializers.Serializer):
    """Admin or Manager creates staff"""
    
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=15)
    department = serializers.CharField(max_length=100, required=False, allow_blank=True)

    def validate_email(self, value):
        if CustomUser.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("User with this email already exists.")
        return value

    def validate(self, attrs):
        # Check if the requester is admin or manager
        request = self.context.get('request')
        if not request or request.user.role not in ['admin', 'manager']:
            raise serializers.ValidationError("Only admins and managers can create staff.")
        return attrs

    @transaction.atomic
    def create(self, validated_data):
        request = self.context.get('request')
        creator = request.user

        # Create Staff User
        staff_user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            role='staff',
            company=creator.company
        )

        # Create Staff Profile
        staff_profile = StaffProfile.objects.create(
            user=staff_user,
            company=creator.company,
            created_by=creator,
            department=validated_data.get('department', '')
        )

        return staff_user


class UserSerializer(serializers.ModelSerializer):
    """For displaying user info"""
    company_name = serializers.CharField(source='company.name', read_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 
                  'company_name', 'phone', 'is_active', 'created_at']
        read_only_fields = ['id', 'role', 'company_name', 'created_at']


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                raise serializers.ValidationError('Invalid credentials')

            if not user.check_password(password):
                raise serializers.ValidationError('Invalid credentials')

            if not user.is_active:
                raise serializers.ValidationError('User account is disabled')

            # Generate tokens
            tokens = get_tokens_for_user(user)  
            
            data['user'] = user
            data['tokens'] = tokens
            
            return data
        else:
            raise serializers.ValidationError('Must include email and password')