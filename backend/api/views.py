from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .serializers import KhuVucSerializer,KhoNVLSerializer, TheThanhVienSerializer,ThucUongSerializer,KhachHangSerializer,KhoSPSerializer,CTKMSerializer,CuaHangSerializer,NhanVienSerializer,HoaDonSerializer,SanPhamSerializer,TKNVSerializer
from .models import KhoNVL, KhuVuc,TheThanhVien,ThucUong,KhachHang,KhoSP,CTKM,CuaHang,NhanVien,HoaDon,SanPham,TKNV


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class KhuVucList(generics.ListAPIView):
    queryset = KhuVuc.objects.all()
    serializer_class = KhuVucSerializer
    
class KhuVucUpdate(generics.UpdateAPIView):
    queryset = KhuVuc.objects.all()
    serializer_class = KhuVucSerializer

class KhuVucDestroy(generics.DestroyAPIView):
    queryset = KhuVuc.objects.all()
    serializer_class = KhuVucSerializer

class KhuVucCreate(generics.CreateAPIView):
    queryset = KhuVuc.objects.all()
    serializer_class = KhuVucSerializer

class ThucUongList(generics.ListAPIView):
    queryset = ThucUong.objects.all()
    serializer_class = ThucUongSerializer

class ThucUongUpdate(generics.UpdateAPIView):
    queryset = ThucUong.objects.all()
    serializer_class = ThucUongSerializer

class ThucUongDestroy(generics.DestroyAPIView):
    queryset = ThucUong.objects.all()
    serializer_class = ThucUongSerializer

class ThucUongCreate(generics.CreateAPIView):
    queryset = ThucUong.objects.all()
    serializer_class = ThucUongSerializer

class KhoNVLList(generics.ListAPIView):
    queryset = KhoNVL.objects.all()
    serializer_class = KhoNVLSerializer
    
class KhoNVLUpdate(generics.UpdateAPIView):
    queryset = KhoNVL.objects.all()
    serializer_class = KhoNVLSerializer

class KhoNVLDestroy(generics.DestroyAPIView):
    queryset = KhoNVL.objects.all()
    serializer_class = KhoNVLSerializer

class KhoNVLCreate(generics.CreateAPIView):
    queryset = KhoNVL.objects.all()
    serializer_class = KhoNVLSerializer

class SanPhamList(generics.ListAPIView):
    queryset = SanPham.objects.all()
    serializer_class = SanPhamSerializer
    
class SanPhamUpdate(generics.UpdateAPIView):
    queryset = SanPham.objects.all()
    serializer_class = SanPhamSerializer

class SanPhamDestroy(generics.DestroyAPIView):
    queryset = SanPham.objects.all()
    serializer_class = SanPhamSerializer

class SanPhamCreate(generics.CreateAPIView):
    queryset = SanPham.objects.all()
    serializer_class = SanPhamSerializer

class KhoSPList(generics.ListAPIView):
    queryset = KhoSP.objects.all()
    serializer_class = KhoSPSerializer
    
class KhoSPUpdate(generics.UpdateAPIView):
    queryset = KhoSP.objects.all()
    serializer_class = KhoSPSerializer

class KhoSPDestroy(generics.DestroyAPIView):
    queryset = KhoSP.objects.all()
    serializer_class = KhoSPSerializer

class KhoSPCreate(generics.CreateAPIView):
    queryset = KhoSP.objects.all()
    serializer_class = KhoSPSerializer

class NhanVienList(generics.ListAPIView):
    queryset = NhanVien.objects.all()
    serializer_class = NhanVienSerializer
    
class NhanVienUpdate(generics.UpdateAPIView):
    queryset = NhanVien.objects.all()
    serializer_class = NhanVienSerializer

class NhanVienDestroy(generics.DestroyAPIView):
    queryset = NhanVien.objects.all()
    serializer_class = NhanVienSerializer

class NhanVienCreate(generics.CreateAPIView):
    queryset = NhanVien.objects.all()
    serializer_class = NhanVienSerializer

class TKNVList(generics.ListAPIView):
    queryset = TKNV.objects.all()
    serializer_class = TKNVSerializer
    
class TKNVUpdate(generics.UpdateAPIView):
    queryset = TKNV.objects.all()
    serializer_class = TKNVSerializer

class TKNVDestroy(generics.DestroyAPIView):
    queryset = TKNV.objects.all()
    serializer_class = TKNVSerializer

class TKNVCreate(generics.CreateAPIView):
    queryset = TKNV.objects.all()
    serializer_class = TKNVSerializer

class CuaHangList(generics.ListAPIView):
    queryset = CuaHang.objects.all()
    serializer_class = CuaHangSerializer
    
class CuaHangUpdate(generics.UpdateAPIView):
    queryset = CuaHang.objects.all()
    serializer_class = CuaHangSerializer

class CuaHangDestroy(generics.DestroyAPIView):
    queryset = CuaHang.objects.all()
    serializer_class = CuaHangSerializer

class CuaHangCreate(generics.CreateAPIView):
    queryset = CuaHang.objects.all()
    serializer_class = CuaHangSerializer

class HoaDonList(generics.ListAPIView):
    queryset = HoaDon.objects.all()
    serializer_class = HoaDonSerializer
    
class HoaDonUpdate(generics.UpdateAPIView):
    queryset = HoaDon.objects.all()
    serializer_class = HoaDonSerializer

class HoaDonDestroy(generics.DestroyAPIView):
    queryset = HoaDon.objects.all()
    serializer_class = HoaDonSerializer

class HoaDonCreate(generics.CreateAPIView):
    queryset = HoaDon.objects.all()
    serializer_class = HoaDonSerializer

class KhachHangList(generics.ListAPIView):
    queryset = KhachHang.objects.all()
    serializer_class = KhachHangSerializer
    
class KhachHangUpdate(generics.UpdateAPIView):
    queryset = KhachHang.objects.all()
    serializer_class = KhachHangSerializer

class KhachHangDestroy(generics.DestroyAPIView):
    queryset = KhachHang.objects.all()
    serializer_class = KhachHangSerializer

class KhachHangCreate(generics.CreateAPIView):
    queryset = KhachHang.objects.all()
    serializer_class = KhachHangSerializer

class TheThanhVienList(generics.ListAPIView):
    queryset = TheThanhVien.objects.all()
    serializer_class = TheThanhVienSerializer
    
class TheThanhVienUpdate(generics.UpdateAPIView):
    queryset = TheThanhVien.objects.all()
    serializer_class = TheThanhVienSerializer

class TheThanhVienDestroy(generics.DestroyAPIView):
    queryset = TheThanhVien.objects.all()
    serializer_class = TheThanhVienSerializer

class TheThanhVienCreate(generics.CreateAPIView):
    queryset = TheThanhVien.objects.all()
    serializer_class = TheThanhVienSerializer

class CTKMList(generics.ListAPIView):
    queryset = CTKM.objects.all()
    serializer_class = CTKMSerializer
    
class CTKMUpdate(generics.UpdateAPIView):
    queryset = CTKM.objects.all()
    serializer_class = CTKMSerializer

class CTKMDestroy(generics.DestroyAPIView):
    queryset = CTKM.objects.all()
    serializer_class = CTKMSerializer

class CTKMCreate(generics.CreateAPIView):
    queryset = CTKM.objects.all()
    serializer_class = CTKMSerializer