
from django.conf import settings
from django.views.generic import TemplateView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import authentication_classes  ############
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect
from .serializers import UserSerializer, UserRegistrationSerializer, UserProfileSerializer
from .models import User
from .oauth_utils import FortyTwoOAuth
import pyotp
import qrcode
from io import BytesIO
import base64

from django.contrib.auth import authenticate
from rest_framework.views import APIView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from django.views.decorators.csrf import csrf_exempt

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    refresh_token = request.COOKIES.get('refresh')
    if not refresh_token:
        return Response({'error': 'No refresh token'}, status=401)
        
    try:
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)
        
        response = Response({'message': 'Token refreshed'})
        response.set_cookie(
            'access',
            access_token,
            httponly=True,
            secure=True,
            samesite='Lax'
        )
        return response
    except:
        return Response({'error': 'Invalid refresh token'}, status=401)

#ikrame
# mdf
@csrf_exempt
@api_view(['GET', 'OPTIONS'])
@permission_classes([IsAuthenticated])
def is_logged_in(request):
    if request.method == 'OPTIONS':
        return Response()
    
    print(f"User authenticated: {request.user.is_authenticated}")
    print(f"User: {request.user}")
    
    if request.user.is_authenticated:
        return Response({
            'message': 'User is authenticated',
            'user': {
                'email': request.user.email,
                # Add any other user data you need
            }
        })
    return Response({'message': 'User is not authenticated'}, status=401)
#ikrame
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if 'email' not in request.data or 'password' not in request.data:
            return Response({"error": "email and password required"}, status=400)
        user = authenticate(email=request.data.get('email'), password=request.data.get('password'))
        if not user:
            return Response({'message': "invalid credetials"}, status=status.HTTP_401_UNAUTHORIZED)
        response = Response({'message': 'Login successful'})
        refresh = RefreshToken.for_user(user)
        user.refresh_token = refresh
        user.save()
        response.set_cookie(
            key='access',
            value=str(refresh.access_token),
            httponly=True,
            secure=True,
            samesite='Lax',
        )
        response.set_cookie(
            key='refresh',
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite='Lax',
        )
        return response

#ikrame
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

#ikrame
class LogoutView(APIView):
    permission_classes = [IsAuthenticated] ############

    def post(self, request):
        user = request.user
        user.status = "Offline"
        user.refresh_token = ''
        user.save()
        print(user)
        response = Response({'message': 'logout success'})
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        return response


class RegisterView(generics.CreateAPIView): # CreateAPIView for handling POST requests
    """
    View for user registration
    """
    queryset = User.objects.all()                 # What data it works with
    permission_classes = (AllowAny,)              # Anyone can register
    serializer_class = UserRegistrationSerializer # How data is processed

class UserProfileView(generics.RetrieveUpdateAPIView): # RetrieveUpdateAPIView for GET and PUT/PATCH requests
    """
    View for retrieving and updating user profile
    """
    permission_classes = (IsAuthenticated,)  # Must be logged in
    serializer_class = UserSerializer        # Uses UserSerializer

    def get_object(self):
        return self.request.user             # Gets current user's profile

class OAuthTestView(TemplateView): # not important for tests onlyyyyyyyyy !!!!
    """
    View for OAuth test page
    """
    template_name = 'API/oauth_test.html'   # HTML template to render

@api_view(['GET'])                          # This decorator marks it as a REST API endpoint
@permission_classes([IsAuthenticated])      # This checks JWT token
def check_auth_status(request):
    """Check if user is authenticated and return user data"""
    # If valid JWT token exists, this runs
    # If not, returns 401 Unauthorized
    serializer = UserSerializer(request.user)
    return Response({
        'isAuthenticated': True,
        'user': serializer.data
    })

@api_view(['GET'])                          # This decorator marks it as a REST API endpoint
@permission_classes([AllowAny])           # Allows anyone to access this endpoint (no login needed)
@authentication_classes([])  ############
def oauth_login(request):
    """
    Initiates the 42 OAuth login process
    """
    oauth = FortyTwoOAuth()
    auth_url = oauth.get_auth_url()
    return Response({'auth_url': auth_url})

@api_view(['GET'])
def protected_route_example(request):
    if not request.user.is_authenticated:
        raise AuthenticationFailed({
            'status': 'error',
            'message': 'Authentication required',
            'code': 'authentication_required'
        })

@api_view(['GET'])
@permission_classes([AllowAny])
@authentication_classes([]) #############
def oauth_42_callback(request):
    print("\n=== Starting OAuth Callback with detailed logging ===")
    
    try:
        # Log request details
        print("Request GET params:", request.GET)
        code = request.GET.get('code')
        print("Authorization code received:", code)

        if not code:
            print("No code received in callback")
            return redirect('http://localhost:3000/logincallback?status=failed')

        oauth = FortyTwoOAuth()
        
        print("\n=== Getting Access Token ===")
        token_data = oauth.get_access_token(code)
        print("Token data received:", token_data)
        
        access_token = token_data.get('access_token')
        print("Access token:", access_token)
        
        print("\n=== Getting User Info ===")
        user_info = oauth.get_user_info(access_token)
        print("User info received:", user_info)
        
        print("\n=== Creating/Updating User ===")
        user, created = User.objects.update_or_create(
            email=user_info['email'],
            defaults={
                'is_two_factor_enabled': False,
                'first_time': True,
                'refresh_token': token_data.get('refresh_token', ''),
            }
        )
        print("User created/updated:", user.email, "Created:", created)
        
        print("\n=== Creating JWT Token ===")
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        print("JWT tokens created")
        
        print("\n=== Setting up Response ===")
        response = redirect('http://localhost:3000/logincallback?status=success')
        
        response.set_cookie(
            key='access',
            value=access_token,
            httponly=True,
            secure=True,
            samesite='Lax',
            domain='localhost'  # Added domain
        )
        response.set_cookie(
            key='refresh',
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite='Lax',
            domain='localhost'  # Added domain
        )
        print("Cookies set on response")
        
        return response

    except Exception as e:
        print(f"\n=== Error in OAuth Callback ===")
        print(f"Error type: {type(e)}")
        print(f"Error message: {str(e)}")
        import traceback
        traceback.print_exc()
        return redirect('http://localhost:3000/logincallback?status=failed')

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # This checks JWT token
@authentication_classes([])
def enable_2fa(request):
    """Generate 2FA secret and QR code"""
    if request.user.is_two_factor_enabled:
        return Response({'error': '2FA is already enabled'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Generate secret
    secret = pyotp.random_base32()
    request.user.two_factor_secret = secret
    request.user.save()
    
    # Generate QR code
    totp = pyotp.TOTP(secret)
    provisioning_uri = totp.provisioning_uri(
        request.user.email,
        issuer_name="Transcendence"
    )
    
    # Create QR code
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(provisioning_uri)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    qr_code = base64.b64encode(buffer.getvalue()).decode()
    
    return Response({
        'secret': secret,
        'qr_code': qr_code
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_2fa(request):
    """Verify 2FA setup with initial code"""
    code = request.data.get('code')
    if not code:
        return Response({'error': 'Code is required'}, status=status.HTTP_400_BAD_REQUEST)
        
    totp = pyotp.TOTP(request.user.two_factor_secret)
    if totp.verify(code):
        request.user.is_two_factor_enabled = True
        request.user.save()
        return Response({'success': True})
    
    return Response({'error': 'Invalid code'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def validate_2fa(request):
    """Validate 2FA code during login"""
    code = request.data.get('code')
    if not code:
        return Response({'error': 'Code is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not request.user.is_two_factor_enabled:
        return Response({'error': '2FA is not enabled'}, status=status.HTTP_400_BAD_REQUEST)
        
    totp = pyotp.TOTP(request.user.two_factor_secret)
    if totp.verify(code):
        request.session['2fa_verified'] = True
        return Response({'success': True})
    
    return Response({'error': 'Invalid code'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def disable_2fa(request):
    """Disable 2FA for user"""
    if not request.user.is_two_factor_enabled:
        return Response({'error': '2FA is not enabled'}, status=status.HTTP_400_BAD_REQUEST)
        
    request.user.is_two_factor_enabled = False
    request.user.two_factor_secret = ''
    request.user.save()
    
    if '2fa_verified' in request.session:
        del request.session['2fa_verified']
        
    return Response({'success': True})


