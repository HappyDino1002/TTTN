import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin, Select } from 'antd';

import FormModalInKhoSP from '../../../components/FormModalInKhoSP'

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

const KhoSP = () => {

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [CuaHang, setCuaHang] = React.useState([]);
    const [KhoSP, setKhoSP] = React.useState([]);
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
            await HTTP.patch('manage/KhoSP/' + rowId + '/update', data)
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
        { field: 'MaKSP', headerName: 'Mã Sản Phẩm', width: 180 },
        {
            field: 'TenKSP',
            headerName: 'Tên Sản Phẩm',
            width: 165,
            editable: true,
        },
        {
            field: 'DvtKSP',
            headerName: 'Đơn vị tính',
            width: 280,
            editable: true,
        },
        {
            field: 'SoluongKSP',
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
        deleteKhoSP();
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
            modifyKhoSP(model);
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
        await HTTP.get('manage/KhoSP-list').then((res) => {
            setKhoSP(res.data)
            setLoading(false)
        })
    }

    function fetchKhoSP() {
        HTTP.get('manage/KhoSP-list').then((res) => {
            setKhoSP(res.data)
        })
    }

    const modifyKhoSP = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifyKhoSP = await HTTP.patch('manage/KhoSP/' + modifyValue.id + '/update', data)
        return modifyKhoSP;
    }

    const deleteKhoSP = async () => {
        const modifyKhoSP = await HTTP.delete('manage/KhoSP/' + id + '/delete').then(() => {
            fetchKhoSP()
        });
        return modifyKhoSP;
    }

    const finishCreate = () => {
        fetchKhoSP()
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
            <Modal title="Xoá sản phẩm kho" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Có chắc muốn xoá sản phẩm kho này?</p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInKhoSP handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={KhoSP}
                getRowId={(row) => row.MaKSP}
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

export default KhoSP;