from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Place(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    title = models.CharField(max_length=200)
    image_src = models.CharField(max_length=225)
    image_alt = models.TextField()
    lat = models.FloatField()
    lon = models.FloatField()
    
    def __str__(self):
        return self.title
    
class UserPlace(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name="user_places")
    place = models.ForeignKey(Place,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = [["user","place"]]  #prevent duplicates