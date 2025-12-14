from django.urls import path
from places.api.views import PlaceView, PlaceDetailView, UserPlaceView

urlpatterns = [
    path('places/', PlaceView.as_view(), name="places-list"),
    path('user-places/', UserPlaceView.as_view(), name="places-list"),
    # path('user-places/<str:pk>/', PlaceDetailView.as_view(), name="places-list"),
    path('places/<str:pk>/', PlaceDetailView.as_view(), name="places-list"),
]
