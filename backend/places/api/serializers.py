from rest_framework import serializers
from places.models import Place, UserPlace

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Place
        
class UserPlaceSerializer(serializers.ModelSerializer):
    place = PlaceSerializer(read_only = True)
    
    class Meta:
        model = UserPlace
        fields = ["id", "user", "place", "created_at"]
        read_only_fields = ["id", "user", "created_at"]