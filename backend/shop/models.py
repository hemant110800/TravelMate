from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_src = models.CharField(max_length=225,default="")
    image_alt = models.TextField(default="Product Image")
    
    def __str__(self):
        return f"{self.title} (${self.price})"

class UserCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    # total = models.DecimalField(max_digits=10,decimal_places=2)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [["user", "product"]]
        
    @property #dynamically computing
    def total(self):
        return self.quantity * self.product.price

    
