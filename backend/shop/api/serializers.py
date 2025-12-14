from rest_framework import serializers
from shop.models import Product, UserCart

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        
class UserCartSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="product.id")
    title = serializers.CharField(source="product.title")
    image_src = serializers.CharField(source="product.image_src")
    image_alt = serializers.CharField(source="product.image_alt")
    price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2)
    total = serializers.SerializerMethodField()

    class Meta:
        model = UserCart
        fields = ["id", "title", "price", "quantity", "total","image_src","image_alt"]

    def get_total(self, obj):
        return obj.total