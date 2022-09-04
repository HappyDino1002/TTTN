from rest_framework import serializers
from django.contrib.auth.models import User
from .models import CTKM, TKNV, CuaHang, HoaDon, KhachHang, KhoNVL, KhoSP, KhuVuc, NhanVien, SanPham, TheThanhVien, ThucUong  


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ThucUongSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThucUong
        fields = '__all__'

class KhoNVLSerializer(serializers.ModelSerializer):
    class Meta:
        model = KhoNVL
        fields = '__all__'

class SanPhamSerializer(serializers.ModelSerializer):
    class Meta:
        model = SanPham
        fields ='__all__'
 
class KhoSPSerializer(serializers.ModelSerializer):
    class Meta:
        model = KhoSP
        fields = '__all__'

class NhanVienSerializer(serializers.ModelSerializer):
    class Meta:
        model = NhanVien
        fields = '__all__'

class TKNVSerializer(serializers.ModelSerializer):
    class Meta:
        model = TKNV
        fields = '__all__'

class KhuVucSerializer(serializers.ModelSerializer):
    class Meta:
        model = KhuVuc
        fields = '__all__'

class CuaHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuaHang
        fields = '__all__'

class HoaDonSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoaDon
        fields = '__all__'

class KhachHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = KhachHang
        fields = '__all__'

class TheThanhVienSerializer(serializers.ModelSerializer):
    class Meta:
        model = TheThanhVien
        fields = '__all__'

class CTKMSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTKM
        fields = '__all__'
