from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from shop.models import Product, UserCart, User
from .serializers import UserCartSerializer, ProductSerializer
from django.conf import settings
import razorpay
import hmac
import hashlib

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID,settings.RAZORPAY_KEY_SECRET))

class ProductView(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        data = Product.objects.all()
        serializer = ProductSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateOrderAPIView(APIView):
    def post(self, request):
        amount = request.data.get('amount')  # amount in rupees
        amount_in_paisa = int(amount * 100)

        razorpay_order = client.order.create({
            "amount": amount_in_paisa,
            "currency": "INR",
            "payment_capture": 1
        })

        return Response({
            "order_id": razorpay_order["id"],
            "amount": amount_in_paisa,
            "currency": "INR",
            "key": settings.RAZORPAY_KEY_ID
        }, status=status.HTTP_200_OK)


class VerifyPayment(APIView):
    def post(self, request):
        data = request.data
        
        razorpay_order_id = data.get("razorpay_order_id")
        razorpay_payment_id = data.get("razorpay_payment_id")
        razorpay_signature = data.get("razorpay_signature")

        # Create signature using secret
        generated_signature = hmac.new(
            bytes(settings.RAZORPAY_KEY_SECRET, 'utf-8'),
            bytes(f"{razorpay_order_id}|{razorpay_payment_id}", 'utf-8'),
            hashlib.sha256
        ).hexdigest()

        # Compare both
        if generated_signature == razorpay_signature:
            return Response({"status": "success", "message": "Payment verified"}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "failed", "message": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)


class CartView(APIView):
    
    permission_classes=[IsAuthenticated]
    def get(self, request):
        default_user = User.objects.first()
        user = request.user if request.user.is_authenticated else default_user
        # default_user = User.objects.first()
        cart_items = UserCart.objects.filter(user = user)
        serializer = UserCartSerializer(cart_items, many = True)
        total_items = sum(item.quantity for item in cart_items)

        return Response({
            "cartValues": serializer.data,
            "totalItems": total_items
        })
        
    # Add to Cart
    def post(self, request):
        default_user = User.objects.first()
        user = request.user if request.user.is_authenticated else default_user
        # print(user,request.data.get("cart")["cartValues"])
       
        cart_data = request.data.get("cart")["cartValues"] or []
        # print(cart_data)
        UserCart.objects.filter(user=user).delete()  # reset old cart
        
        for item in cart_data:
            try:
                product = Product.objects.get(id=item["id"])
                print(product)
                UserCart.objects.create(
                    user=user,
                    product=product,
                    quantity=item.get("quantity", 1)
                )
            except Product.DoesNotExist:
                print("product not exist")
                continue
            
        return Response({"message": "Cart updated"}, status=status.HTTP_200_OK)

    # def post(self, request):
    #     product_id = request.data.get("product_id")
    #     quantity = int(request.data.get("quantity"))

    #     try:
    #         product = Product.objects.get(id=product_id)
    #     except Product.DoesNotExist:
    #         return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

    #     cart_item, created = UserCart.objects.get_or_create(user=request.user, product=product)

    #     if not created:
    #         cart_item.quantity += quantity
    #     else:
    #         cart_item.quantity = quantity

    #     cart_item.save()

    #     return Response({"message": "Item added to cart"}, status=status.HTTP_200_OK)

    # def delete(self, request, product_id):
    #     try:
    #         cart_item = UserCart.objects.get(user=request.user, product__id=product_id)
    #         cart_item.delete()
    #         return Response({"message": "Item removed from cart"}, status=status.HTTP_200_OK)
    #     except UserCart.DoesNotExist:
    #         return Response({"error": "Item not found in cart"}, status=status.HTTP_404_NOT_FOUND)


