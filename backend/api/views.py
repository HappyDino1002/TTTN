from django.shortcuts import render
from rest_framework import generics
from .serializers import BookLocationSerializer, BookCategorySerializer, BookSerializer
from .models import BookLocation, Book, BookCategory
from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
# Create your views here.


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BookLocationView(generics.ListAPIView):
    queryset = BookLocation.objects.all()
    serializer_class = BookLocationSerializer


class BookLocationCreateView(generics.CreateAPIView):
    queryset = BookLocation.objects.all()
    serializer_class = BookLocationSerializer


class BookLocationUpdateView(generics.UpdateAPIView):
    queryset = BookLocation.objects.all()
    serializer_class = BookLocationSerializer


class BookLocationDeleteView(generics.DestroyAPIView):
    queryset = BookLocation.objects.all()
    serializer_class = BookLocationSerializer


class BookCategoryView(generics.ListAPIView):
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer


class BookCategoryCreateView(generics.CreateAPIView):
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer


class BookCategoryDetailView(generics.RetrieveAPIView):
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer


class BookCategoryUpdateView(generics.UpdateAPIView):
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer


class BookCategoryDeleteView(generics.DestroyAPIView):
    queryset = BookCategory.objects.all()
    serializer_class = BookCategorySerializer


class BookView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'author']


class BookCreateView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookUpdateView(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDeleteView(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookUpdateView(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
