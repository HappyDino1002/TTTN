import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin, Select } from 'antd';

import FormModalInCuaHang from '../../../components/FormModalInCuaHang'

const { Option } = Select;

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const customIcon = () => {
    return (
        <span style={{ fontSize: '0px' }}></span>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const AllCuaHang = () => {

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [CuaHang, setCuaHang] = React.useState([]);
    const [KhuVuc, setKhuVuc] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rowId, setRowId] = React.useState(null);


    const khuvuc = [];
    KhuVuc.map((value) => {
        khuvuc.push(<Option key={value.TenKV}>{value.TenKV}</Option>);
        return value;
    })

    async function handleChangeKhuVuc(value) {
        //console.log(value);
        let khuvuc = KhuVuc.filter(val => value.includes(val.TenKV)).map(val => val.MaKV)
        console.log(khuvuc)

        let data = '';
        if (khuvuc.length > 0) {
            data = '{"MaKV":"' + khuvuc[0] + '"}';
            data = JSON.parse(data);
            await HTTP.patch('manage/CuaHang/' + rowId + '/update', data)
            setOpenKhuVucMessage(false);
            setOpen(true);
        } else {
            setOpenKhuVucMessage(true);
        }
    }

    function rowValueFunc(value) {
        setRowId(value.id)
    }

    const columns = [
        { field: 'MaCH', headerName: 'Mã Cửa Hàng', width: 180 },
        {
            field: 'TenCH',
            headerName: 'Tên Cửa Hàng',
            width: 165,
            editable: true,
        },
        {
            field: 'DiaChiCH',
            headerName: 'Địa Chỉ Cửa Hàng',
            width: 280,
            editable: true,
        },
        {
            field: "MaKV",
            headerName: "Khu Vực",
            width: 260,
            renderCell: (params) => (
                <Select
                    style={{ width: '100%' }}
                    placeholder="Xin hãy chọn khu vực"
                    mode="multiple"
                    defaultValue={
                        KhuVuc.filter(val => params.value.includes(val.MaKV)).map(val => val.TenKV)
                    }
                    removeIcon={customIcon}
                    onFocus={() => rowValueFunc(params)}
                    maxTagCount='responsive'
                    onChange={handleChangeKhuVuc}>
                    {khuvuc}
                </Select>
            ),
        },
        {
            field: "delete",
            headerName: "Action",
            width: 75,
            renderCell: (params) => (
                <Button
                    onClick={() => showModal(params.id)}
                    type="link"
                    danger>
                    Delete
                </Button>
            ),
        },
    ];

    const [id, setId] = useState(0);

    const showModal = (value) => {
        setId(value)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        deleteCuaHang();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openKhuVucMessage, setOpenKhuVucMessage] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleCommit = React.useCallback((model) => {
        try {
            modifyCuaHang(model);
            handleClick();
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    React.useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        await HTTP.get('manage/khuvuc-list').then((res) => {
            setKhuVuc(res.data)
        })
        await HTTP.get('manage/CuaHang-list').then((res) => {
            setCuaHang(res.data)
            setLoading(false)
        })
    }

    function fetchCuaHang() {
        HTTP.get('manage/CuaHang-list').then((res) => {
            setCuaHang(res.data)
        })
    }

    const modifyCuaHang = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifyKhuVuc = await HTTP.patch('manage/CuaHang/' + modifyValue.id + '/update', data)
        return modifyKhuVuc;
    }

    const deleteCuaHang = async () => {
        const modifyKhuVuc = await HTTP.delete('manage/CuaHang/' + id + '/delete').then(() => {
            fetchCuaHang()
        });
        return modifyKhuVuc;
    }

    const finishCreate = () => {
        fetchCuaHang()
    }

    if (loading) {
        return (
            <div className="spin">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div style={{ height: 580, width: '100%' }}>
            <div className={classes.root}>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    Thông tin đã được cập nhật thành công.
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openKhuVucMessage}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Chọn một Khu Vực đi ạ!
                    </Alert>
                </Snackbar>
            </div>
            <Modal title="Xoá cửa hàng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Có chắc muốn xoá cửa hàng này?</p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInCuaHang handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={CuaHang}
                getRowId={(row) => row.MaCH}
                columns={columns}
                pageSize={8}
                autoHeight
                pagination
                rowsPerPageOptions={[8]}
                disableSelectionOnClick
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
                editRowsModel={editRowsModel}
                onEditRowsModelChange={handleEditRowsModelChange}
                onCellEditCommit={handleCommit}
            />
        </div>
    );
};

export default AllCuaHang;