from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

# Available Endpoints:
# GET /api/auth/42/login/ - Get 42 login URL
# GET /api/auth/42/callback/ - OAuth callback (browser will be redirected here)
# GET /api/auth/status/ - Check auth status

urlpatterns = [
    # JWT token endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Get new tokens
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Refresh expired token
    
    # User registration and profile
    path('logout/', views.LogoutView.as_view(), name='logout'), #ikrame
    path('login/', views.LoginView.as_view(), name='login'), #ikrame
    path('islogged/', views.is_logged_in), #ikrame #mdf
    path('register/', views.RegisterView.as_view(), name='register'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),

    # 42 OAuth
    path('auth/42/login/', views.oauth_login, name='42_login'), # GET: Returns auth URL
    path('auth/42/callback/', views.oauth_42_callback, name='42_callback'),  # GET: Handles OAuth callback
    path('auth/status/', views.check_auth_status, name='auth_status'),  # Check login status
    path('api/auth/token/refresh/', views.refresh_token, name='token_refresh'),
    # path('oauth/', views.OAuthTestView.as_view(), name='oauth'),

    # 2FA
    path('2fa/enable/', views.enable_2fa, name='enable_2fa'),
    path('2fa/verify/', views.verify_2fa, name='verify_2fa'),
    path('2fa/validate/', views.validate_2fa, name='validate_2fa'),
    path('2fa/disable/', views.disable_2fa, name='disable_2fa'),
]