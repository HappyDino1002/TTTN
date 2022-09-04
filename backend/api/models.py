from django.db import models

# Creatfrom django.db import models

class KhuVuc(models.Model):
    MaKV = models.CharField(max_length=20, blank=False, primary_key= True)
    TenKV = models.CharField(max_length=150, blank=False)

    def __str__(self):
        return self.MaKV

class CuaHang(models.Model):
    MaCH = models.CharField(max_length=20, blank=False, primary_key= True)
    TenCH = models.CharField(max_length=150, blank=False)
    DiaChiCH = models.CharField(max_length=250, blank=False)
    MaKV =  models.ForeignKey(KhuVuc, on_delete=models.CASCADE)

    def __str__(self):
        return self.MaCH

class KhoNVL(models.Model):
    MaNVL = models.CharField(max_length=20, blank=False, primary_key= True)
    TenNVL = models.CharField(max_length=50, blank=False)
    DvtNVL = models.CharField(max_length=10, blank=False)
    SoluongNVL = models.FloatField(blank=False)
    MaCH = models.ManyToManyField(CuaHang)

    def __str__(self):
        return self.MaNVL

class ThucUong(models.Model):
    MaTU = models.CharField(max_length=10, blank=False, primary_key= True)
    TenTU = models.CharField(max_length=50, blank=False)
    DvtTU = models.CharField(max_length=10, blank=False)
    GiaTU = models.FloatField(blank=False)
    MaNVL = models.ManyToManyField(KhoNVL)

    def __str__(self):
        return self.MaTU

class KhoSP(models.Model):
    MaKSP = models.CharField(max_length=20, blank=False, primary_key= True)
    TenKSP = models.CharField(max_length=50, blank=False)
    DvtKSP = models.CharField(max_length=10, blank=False)
    SoluongKSP = models.FloatField(blank=False)
    MaCH = models.ManyToManyField(CuaHang)
    def __str__(self):
        return self.MaKSP


class SanPham(models.Model):
    MaSP = models.CharField(max_length=10, blank=False, primary_key= True)
    TenSP = models.CharField(max_length=50, blank=False)
    DvtSP = models.CharField(max_length=10, blank=False)
    GiaSP = models.FloatField(blank=False)
    MaKSP = models.ManyToManyField(KhoSP)

    def __str__(self):
        return self.MaSP

class NhanVien(models.Model):
    MaNV = models.CharField(max_length=10, blank=False, primary_key= True)
    HoTenNV = models.CharField(max_length=50, blank=False)
    DiaChiNV = models.CharField(max_length=150, blank=False)
    SdtNV = models.CharField(max_length=11, blank=False)
    ChucVu = models.CharField(max_length=30, blank=False)
    NgayVaoLam = models.DateTimeField(blank=False)
    GioiTinhNV = models.CharField(max_length=5, blank=False)
    NgaySinhNV = models.DateField(blank=False)
    EmailNV = models.EmailField(max_length=50, blank=False)
    MaKV = models.ForeignKey(KhuVuc, on_delete=models.CASCADE)
    MaCH = models.ForeignKey(CuaHang, on_delete=models.CASCADE)

    def __str__(self):
        return self.MaNV

class TKNV (models.Model):
    IDNVien = models.CharField(max_length=10, blank=False, primary_key= True)
    Matkhau = models.CharField(max_length=15, blank=False)
    MaNV = models.ForeignKey(NhanVien, on_delete=models.CASCADE)

    def __str__(self):
        return self.IDNVien

class TheThanhVien(models.Model):
    MaThe = models.CharField(max_length=10, blank=False, primary_key= True)
    HangThe = models.CharField(max_length=15, blank=False)
    DiemThuong = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return self.MaThe

class KhachHang(models.Model):
    MaKH = models.CharField(max_length=10, blank=False, primary_key= True)
    TenKH = models.CharField(max_length=50, blank=False)
    GioiTinhKH = models.CharField(max_length=50, blank=False)
    NgaySinhKH = models.DateField(blank=False)
    EmailKH = models.EmailField(max_length=50, blank=False)
    DiaChiKH = models.CharField(max_length=100, blank=False)
    SdtKH = models.CharField(max_length=50, blank=False)
    Diemtichluy = models.FloatField(blank=False)
    Hangthanhvien = models.CharField(max_length=50, blank=False)
    Ngaymothe = models.DateTimeField(blank=False)
    MaThe =  models.ManyToManyField(TheThanhVien)
    def __str__(self):
        return self.MaKH

class CTKM(models.Model):
    MaCT = models.CharField(max_length=20, blank=False, primary_key= True)
    TenCT = models.CharField(max_length=150, blank=False)
    NgayBatDau = models.DateTimeField(blank=False)
    NgayKetThuc = models.DateTimeField(blank=False)
    HinhThucKM = models.CharField(max_length=50, blank=False)
    DKADung = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.MaCT
class HoaDon(models.Model):
    MaHD = models.CharField(max_length=20, blank=False,primary_key= True)
    Ngaylaphoadon = models.DateField(blank=False)
    TongtientruocVAT = models.FloatField(blank=False)
    ThueVAT = models.FloatField(blank=False)
    ThanhTien= models.FloatField(blank=False)
    PTTToan = models.CharField(max_length=50, blank=False)
    MaNV = models.ForeignKey(NhanVien, on_delete=models.CASCADE)
    MaCH = models.ForeignKey(CuaHang, on_delete=models.CASCADE)
    MaTU = models.ManyToManyField(ThucUong)
    MaSP = models.ManyToManyField(SanPham)
    MaKH = models.ForeignKey(KhachHang, on_delete=models.CASCADE)
    MaCT = models.ForeignKey(CTKM, on_delete=models.CASCADE)

    def __str__(self):
        return self.MaHD