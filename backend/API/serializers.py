from rest_framework import serializers
from .models import User, UserProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

#ikrame
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Access the user and set availability as online
        user = self.user
        user.status = "ONLINE"  # Assuming your User model has an `is_online` field
        user.refresh_token = data['refresh']
        user.save()
        return data

class UserProfileSerializer(serializers.ModelSerializer): #ModelSerializer: A special serializer that automatically creates serializer fields based on the model
    """
    Serializer for UserProfile model
    """
    class Meta:
        model = UserProfile
        fields = ('display_name', 'first_name', 'last_name', 'level', 'points', 'wins', 'losses', 'win_streak', 'status')
        # fields: Lists which model fields to include in the JSON output

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model with profile information
    """
    profile = UserProfileSerializer(read_only=True)  # Nested serializer Nests the profile data inside user data

    class Meta:
        model = User
        fields = ('id', 'email', 'avatar', 'is_two_factor_enabled', 'profile')
        read_only_fields = ('is_two_factor_enabled',)
        #read_only_fields: Fields that can't be modified through the API

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration
    """
    password2 = serializers.CharField(write_only=True) # Custom field
    display_name = serializers.CharField(write_only=True)
    #write_only=True: Fields that are accepted in requests but never returned in responses

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'display_name')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        # Custom validation
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def create(self, validated_data):
        # Custom creation logic
        display_name = validated_data.pop('display_name')
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        user.profile.display_name = display_name
        user.profile.save()
        return user