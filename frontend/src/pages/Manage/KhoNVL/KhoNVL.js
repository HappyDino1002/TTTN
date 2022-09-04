import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin, Select } from 'antd';

import FormModalInKhoNVL from '../../../components/FormModalInKhoNVL'

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

const KhoNVL = () => {

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [CuaHang, setCuaHang] = React.useState([]);
    const [KhoNVL, setKhoNVL] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rowId, setRowId] = React.useState(null);


    const cuahang = [];
    CuaHang.map((value) => {
        cuahang.push(<Option key={value.TenCH}>{value.TenCH}</Option>);
        return value;
    })

    async function handleChangeCuaHang(value) {
        //console.log(value);
        let cuahang = CuaHang.filter(val => value.includes(val.TenCH)).map(val => val.MaCH)
        console.log(cuahang)

        let data = '';
        if (cuahang.length > 0) {
            data = '{"MaCH":"' + cuahang[0] + '"}';
            data = JSON.parse(data);
            await HTTP.patch('manage/KhoNVL/' + rowId + '/update', data)
            setOpenCuaHangMessage(false);
            setOpen(true);
        } else {
            setOpenCuaHangMessage(true);
        }
    }

    function rowValueFunc(value) {
        setRowId(value.id)
    }

    const columns = [
        { field: 'MaNVL', headerName: 'Mã Nguyên Vật Liệu', width: 180 },
        {
            field: 'TenNVL',
            headerName: 'Tên Nguyên Vật Liệu',
            width: 165,
            editable: true,
        },
        {
            field: 'DvtNVL',
            headerName: 'Đơn vị tính',
            width: 280,
            editable: true,
        },
        {
            field: 'SoluongNVL',
            headerName: 'Số lượng',
            width: 280,
            editable: true,
        },
        {
            field: "MaCH",
            headerName: "Cửa Hàng",
            width: 260,
            renderCell: (params) => (
                <Select
                    style={{ width: '100%' }}
                    placeholder="Xin hãy chọn cửa hàng"
                    mode="multiple"
                    defaultValue={
                        CuaHang.filter(val => params.value.includes(val.MaCH)).map(val => val.TenCH)
                    }
                    removeIcon={customIcon}
                    onFocus={() => rowValueFunc(params)}
                    maxTagCount='responsive'
                    onChange={handleChangeCuaHang}>
                    {cuahang}
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
        deleteKhoNVL();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openCuaHangMessage, setOpenCuaHangMessage] = React.useState(false);

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
            modifyKhoNVL(model);
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
        await HTTP.get('manage/CuaHang-list').then((res) => {
            setCuaHang(res.data)
        })
        await HTTP.get('manage/KhoNVL-list').then((res) => {
            setKhoNVL(res.data)
            setLoading(false)
        })
    }

    function fetchKhoNVL() {
        HTTP.get('manage/KhoNVL-list').then((res) => {
            setKhoNVL(res.data)
        })
    }

    const modifyKhoNVL = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifyKhoNVL = await HTTP.patch('manage/KhoNVL/' + modifyValue.id + '/update', data)
        return modifyKhoNVL;
    }

    const deleteKhoNVL = async () => {
        const modifyKhoNVL = await HTTP.delete('manage/KhoNVL/' + id + '/delete').then(() => {
            fetchKhoNVL()
        });
        return modifyKhoNVL;
    }

    const finishCreate = () => {
        fetchKhoNVL()
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
                    open={openCuaHangMessage}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Chọn một Cửa Hàng đi ạ!
                    </Alert>
                </Snackbar>
            </div>
            <Modal title="Xoá nguyên vật liệu" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Có chắc xoá nguyên vật liệu này?</p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInKhoNVL handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={KhoNVL}
                getRowId={(row) => row.MaNVL}
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

export default KhoNVL;