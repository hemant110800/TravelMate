from django.urls import path
from shop.api.views import ProductView, CartView, CreateOrderAPIView, VerifyPayment

urlpatterns = [
    path('products/', ProductView.as_view(), name="product-list"),
    path('cart/', CartView.as_view(), name="cart-items"),
    path('create-order/', CreateOrderAPIView.as_view(), name="create-order"),
    path('verify_payment/', VerifyPayment.as_view(), name="verify_payment"),
    # # path('user-places/<str:pk>/', PlaceDetailView.as_view(), name="places-list"),
    # path('places/<str:pk>/', PlaceDetailView.as_view(), name="places-list"),
]
