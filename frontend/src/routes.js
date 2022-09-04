import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from './pages/ErrorStatus/NotFound';
import User from './pages/Manage/User/User'
import Home from './pages/Manage/Home/Home'
import KhuVuc from "./pages/Manage/KhuVuc/KhuVuc";
import CuaHang from "./pages/Manage/CuaHang/CuaHang";
import KhoNVL from "./pages/Manage/KhoNVL/KhoNVL";
import KhoSP from "./pages/Manage/KhoSP/KhoSP";
import ThucUong from "./pages/Manage/ThucUong/ThucUong";
import SanPham from "./pages/Manage/SanPham/SanPham";
import NhanVien from "./pages/Manage/NhanVien/NhanVien";
import TKNV from "./pages/Manage/TKNV/TKNV";
import TheThanhVien from "./pages/Manage/TheThanhVien/TheThanhVien";
import KhachHang from "./pages/Manage/KhachHang/KhachHang";
import CTKM from "./pages/Manage/CTKM/CTKM";
import AllBooks from "./pages/Manage/Book/AllBooks";
//import example from './pages/temp3'

const BaseRouter = () => (
  <Switch>
    <Route exact path='/admin' component={Home} />
    <Route path='/admin/all-book' component={AllBooks} />
    <Route path='/admin/users' component={User} />
    <Route path='/admin/khuvuc' component={KhuVuc} />
    <Route path='/admin/cuahang' component={CuaHang} />
    <Route path='/admin/khonvl' component={KhoNVL} />
    <Route path='/admin/khosp' component={KhoSP} />
    <Route path='/admin/thucuong' component={ThucUong} />
    <Route path='/admin/sanpham' component={SanPham} />
    <Route path='/admin/nhanvien' component={NhanVien} />
    <Route path='/admin/tknv' component={TKNV} />
    <Route path='/admin/thethanhvien' component={TheThanhVien} />
    <Route path='/admin/khachhang' component={KhachHang} />
    <Route path='/admin/ctkm' component={CTKM} />
    <Route path="*" component={NotFound} />

  </Switch>
);

export default BaseRouter;
