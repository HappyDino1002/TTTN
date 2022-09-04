import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const { Sider } = Layout;

const SiderComponent = () => {
    const classes = useStyles();
    const [openFirst, setOpenFirst] = React.useState(true);

    let indexUrl = null;
    if (window.location.pathname === '/admin') indexUrl = "/admin";
    else if (window.location.pathname === '/admin/all-book') indexUrl = "/admin/all-book";
    else if (window.location.pathname === '/admin/book-category') indexUrl = "/admin/book-category";
    else if (window.location.pathname === '/admin/book-location') indexUrl = "/admin/book-location";
    else if (window.location.pathname === '/admin/users') indexUrl = "/admin/users";
    else if (window.location.pathname === '/admin/khuvuc') indexUrl = "/admin/khuvuc";
    else if (window.location.pathname === '/admin/cuahang') indexUrl = "/admin/cuahang";
    else if (window.location.pathname === '/admin/khonvl') indexUrl = "/admin/khonvl";
    else if (window.location.pathname === '/admin/khosp') indexUrl = "/admin/khosp";
    else if (window.location.pathname === '/admin/thucuong') indexUrl = "/admin/thucuong";
    else if (window.location.pathname === '/admin/sanpham') indexUrl = "/admin/sanpham";
    else if (window.location.pathname === '/admin/nhanvien') indexUrl = "/admin/nhanvien";
    else if (window.location.pathname === '/admin/tknv') indexUrl = "/admin/tknv";
    else if (window.location.pathname === '/admin/thethanhvien') indexUrl = "/admin/thethanhvien";
    else if (window.location.pathname === '/admin/khachhang') indexUrl = "/admin/khachhang";
    else if (window.location.pathname === '/admin/ctkm') indexUrl = "/admin/ctkm";
    const [selectedIndex, setSelectedIndex] = React.useState(indexUrl);

    const handleFirstClick = (event, index) => {
        setOpenFirst(!openFirst);
        setSelectedIndex(index);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <Sider
            style={{ padding: '0px 0 0 0', background: 'white' }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            width={230}
        >
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <Link style={{ color: 'black' }} to="/admin">
                    <ListItem button
                        selected={selectedIndex === "/admin"}
                        onClick={(event) => handleListItemClick(event, "/admin")}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/users">
                    <ListItem button
                        selected={selectedIndex === "/admin/users"}
                        onClick={(event) => handleListItemClick(event, "/admin/users")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/khuvuc">
                    <ListItem button
                        selected={selectedIndex === "/admin/khuvuc"}
                        onClick={(event) => handleListItemClick(event, "/admin/khuvuc")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Khu Vuc" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/cuahang">
                    <ListItem button
                        selected={selectedIndex === "/admin/cuahang"}
                        onClick={(event) => handleListItemClick(event, "/admin/cuahang")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cua Hang" />
                    </ListItem>
                    <Link style={{ color: 'black' }} to="/admin/thethanhvien">
                    <ListItem button
                        selected={selectedIndex === "/admin/thethanhvien"}
                        onClick={(event) => handleListItemClick(event, "/admin/thethanhvien")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="The Thanh Vien" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/ctkm">
                    <ListItem button
                        selected={selectedIndex === "/admin/ctkm"}
                        onClick={(event) => handleListItemClick(event, "/admin/ctkm")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chuong Trinh Khuyen Mai" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/khachhang">
                    <ListItem button
                        selected={selectedIndex === "/admin/khachhang"}
                        onClick={(event) => handleListItemClick(event, "/admin/khachhang")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Khach Hang" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/khonvl">
                    <ListItem button
                        selected={selectedIndex === "/admin/khonvl"}
                        onClick={(event) => handleListItemClick(event, "/admin/khonvl")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Kho NVL" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/khosp">
                    <ListItem button
                        selected={selectedIndex === "/admin/khosp"}
                        onClick={(event) => handleListItemClick(event, "/admin/khosp")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Kho SP" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/nhanvien">
                    <ListItem button
                        selected={selectedIndex === "/admin/nhanvien"}
                        onClick={(event) => handleListItemClick(event, "/admin/nhanvien")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Nhan Vien" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/sanpham">
                    <ListItem button
                        selected={selectedIndex === "/admin/sanpham"}
                        onClick={(event) => handleListItemClick(event, "/admin/sanpham")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="San Pham" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/thucuong">
                    <ListItem button
                        selected={selectedIndex === "/admin/thucuong"}
                        onClick={(event) => handleListItemClick(event, "/admin/thucuong")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thuc Uong" />
                    </ListItem>
                </Link>
                <Link style={{ color: 'black' }} to="/admin/tknv">
                    <ListItem button
                        selected={selectedIndex === "/admin/tknv"}
                        onClick={(event) => handleListItemClick(event, "/admin/tknv")}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tai Khoan Nhan Vien" />
                    </ListItem>
                </Link>
                </Link>
            </List>
        </Sider>

    )
};

export default SiderComponent;