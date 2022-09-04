import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin, Select } from 'antd';

import FormModalInSanPham from '../../../components/FormModalInSanPham'

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

const SanPham = () => {

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [KhoSP, setKhoSP] = React.useState([]);
    const [SanPham, setSanPham] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rowId, setRowId] = React.useState(null);


    const khosp = [];
    KhoSP.map((value) => {
        khosp.push(<Option key={value.TenKSP}>{value.TenKSP}</Option>);
        return value;
    })

    async function handleChangeKhoSP(value) {
        //console.log(value);
        let khosp = KhoSP.filter(val => value.includes(val.TenKSP)).map(val => val.MaKSP)
        console.log(khosp)

        let data = '';
        if (khosp.length > 0) {
            data = '{"MaKSP":"' + khosp[0] + '"}';
            data = JSON.parse(data);
            await HTTP.patch('manage/SanPham/' + rowId + '/update', data)
            setOpenKhoSPMessage(false);
            setOpen(true);
        } else {
            setOpenKhoSPMessage(true);
        }
    }

    function rowValueFunc(value) {
        setRowId(value.id)
    }

    const columns = [
        { field: 'MaSP', headerName: 'Mã Sản Phẩm', width: 180 },
        {
            field: 'TenSP',
            headerName: 'Tên Sản Phẩm',
            width: 165,
            editable: true,
        },
        {
            field: 'DvtSP',
            headerName: 'Đơn vị tính',
            width: 280,
            editable: true,
        },
        {
            field: 'GiaSP',
            headerName: 'Giá',
            width: 280,
            editable: true,
        },
        {
            field: "MaKSP",
            headerName: "Kho Sản Phẩm",
            width: 260,
            renderCell: (params) => (
                <Select
                    style={{ width: '100%' }}
                    placeholder="Xin hãy chọn kho sản phẩm"
                    mode="multiple"
                    defaultValue={
                        KhoSP.filter(val => params.value.includes(val.MaKSP)).map(val => val.TenKSP)
                    }
                    removeIcon={customIcon}
                    onFocus={() => rowValueFunc(params)}
                    maxTagCount='responsive'
                    onChange={handleChangeKhoSP}>
                    {khosp}
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
        deleteSanPham();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openKhoSPMessage, setOpenKhoSPMessage] = React.useState(false);

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
            modifySanPham(model);
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
        await HTTP.get('manage/KhoSP-list').then((res) => {
            setKhoSP(res.data)
        })
        await HTTP.get('manage/SanPham-list').then((res) => {
            setSanPham(res.data)
            setLoading(false)
        })
    }

    function fetchSanPham() {
        HTTP.get('manage/SanPham-list').then((res) => {
            setSanPham(res.data)
        })
    }

    const modifySanPham = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifySanPham = await HTTP.patch('manage/SanPham/' + modifyValue.id + '/update', data)
        return modifySanPham;
    }

    const deleteSanPham = async () => {
        const modifySanPham = await HTTP.delete('manage/SanPham/' + id + '/delete').then(() => {
            fetchSanPham()
        });
        return modifySanPham;
    }

    const finishCreate = () => {
        fetchSanPham()
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
                    open={openKhoSPMessage}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Chọn một kho sản phẩm đi ạ!
                    </Alert>
                </Snackbar>
            </div>
            <Modal title="Xoá sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Có chắc xoá sản phẩm này?</p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInSanPham handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={SanPham}
                getRowId={(row) => row.MaSP}
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

export default SanPham;