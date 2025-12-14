from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from backend.serializers import MyTokenObtainPairSerializer, RegistrationSerializer
from django.conf import settings
import google.generativeai as genai
# from openai import OpenAI

# client = OpenAI(api_key=settings.OPENAI_API_KEY)

# class OpenAIChatView(APIView):
    
    # def post(self, request):
    #     try:
    #         user_message = request.data.get("message")
    #         if not user_message:
    #             return Response({"error": "Message is required"}, status=400)
    #         response = client.chat.completions.create(
    #             model="gpt-4o-mini",
    #             messages=[
    #                 {"role": "user", "content": user_message}
    #             ]
    #         )

    #         ai_reply = response.choices[0].message.content

    #         return Response({"reply": ai_reply}, status=status.HTTP_200_OK)

    #     except Exception as e:
    #         return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
genai.configure(api_key=settings.GOOGLE_API_KEY)

# for m in genai.list_models():
#     print(m.name)
    
class GeminiChatView(APIView):
    def post(self, request):
        try:
            user_message = request.data.get("message", "")

            if not user_message:
                return Response({"error": "Message is required"}, status=400)

            model = genai.GenerativeModel(model_name = "models/gemini-flash-latest")
            response = model.generate_content(user_message)
           
            return Response({"reply": response.text}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegistrationView(APIView):

    def post(self,request):
        serializer = RegistrationSerializer(data=request.data)
        
        data = {}
        
        if serializer.is_valid():
            account = serializer.save()
            
            data['response'] = "Registration Successful!"
            data['username'] = account.username
            data['email'] = account.email
            
            refresh = RefreshToken.for_user(account)
            #Custom claims
            refresh["username"] = account.username
            print(refresh)
            data['token'] = {
                                'refresh': str(refresh),
                                'access': str(refresh.access_token),
                            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = serializer.errors
            return Response(data, status=status.HTTP_406_NOT_ACCEPTABLE)
        

