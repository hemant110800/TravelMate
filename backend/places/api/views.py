from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from places.api.serializers import (PlaceSerializer, UserPlaceSerializer)
from places.models import Place, UserPlace
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User

class PlaceView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        places = Place.objects.all()
        serializer = PlaceSerializer(places, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = PlaceSerializer(data = request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class PlaceDetailView(APIView):
    # permission_classes=[IsAuthenticated]
    def get(self, request, pk):
        try:
            place = Place.objects.get(pk = pk)
        except Place.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
            
        serializer = PlaceSerializer(place)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self,request, pk):
        try:
            place = Place.objects.get(pk = pk)
        except Place.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PlaceSerializer(place,data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            place = Place.objects.get(pk = pk)
        except Place.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        
        place.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)   
    
class UserPlaceView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self,request):
        print(request.user)
        # default_user = User.objects.first()
        user_places = UserPlace.objects.filter(user = request.user).order_by("-created_at")
        serializer = UserPlaceSerializer(user_places, many = True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request):
        # default_user = User.objects.first()
        
        place_id = request.data.get("place_id")
        try:
            place = Place.objects.get(id=place_id)
        except Place.DoesNotExist:
            return Response({"error": "Place not found"}, status=404)

        user_place, created = UserPlace.objects.get_or_create(user=request.user, place=place)
        serializer = UserPlaceSerializer(user_place)
        return Response(serializer.data, status=201 if created else 200)
        
    # PUT → replace user’s collection (send full list of place_ids)
    def put(self, request):
        place_ids = request.data.get("place_ids", [])
        places = Place.objects.filter(id__in=place_ids)

        # Clear old
        UserPlace.objects.filter(user=request.user).delete()

        # Add new
        user_places = [UserPlace(user=request.user, place=place) for place in places]
        UserPlace.objects.bulk_create(user_places)

        serializer = UserPlaceSerializer(user_places, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def delete(self, request):
        place_id = request.data.get("place_id")
        if not place_id:
            return Response({"message": "place_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user_place = UserPlace.objects.get(user=request.user, place_id=place_id)
            user_place.delete()
            return Response({"message": "Place removed"}, status=status.HTTP_200_OK)
        except UserPlace.DoesNotExist:
            return Response({"message": "Place not found in user collection"}, status=status.HTTP_404_NOT_FOUND)