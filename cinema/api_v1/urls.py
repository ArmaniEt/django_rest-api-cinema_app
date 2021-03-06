from django.urls import include, path
from rest_framework import routers
from api_v1 import views
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'movies', views.MovieViewSet)
router.register(r'halls', views.HallViewSet)
router.register(r'shows', views.ShowViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'seats', views.SeatViewSet)
router.register(r'bookings', views.BookingViewSet)
router.register(r'discounts', views.DiscountViewSet)
router.register(r'tickets', views.TicketViewSet)

app_name = 'api_v1'

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.LoginView.as_view(), name='api_token_auth'),
    path('register/', views.UserCreateView.as_view(), name='register'),
    path('token-login/', views.TokenLoginView.as_view(), name='api_token_re_login'),
    path('register/update/<int:pk>/', views.UserUpdateView.as_view(), name='update')
]
