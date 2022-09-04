from rest_framework import serializers
from .models import Book, BookCategory, BookLocation
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BookCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCategory
        fields = ('id', 'name', 'description', 'slug')


class BookLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookLocation
        fields = ('id', 'name', 'description', 'slug')


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'name', 'description', 'author', 'image',
                  'quantity', 'slug', 'location', 'category')
