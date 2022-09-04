import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin, Select } from 'antd';

import FormModalInThucUong from '../../../components/FormModalInThucUong'

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

const ThucUong = () => {

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [KhoNVL, setKhoNVL] = React.useState([]);
    const [ThucUong, setThucUong] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rowId, setRowId] = React.useState(null);


    const khonvl = [];
    KhoNVL.map((value) => {
        khonvl.push(<Option key={value.TenNVL}>{value.TenNVL}</Option>);
        return value;
    })

    async function handleChangeKhoNVL(value) {
        //console.log(value);
        let khonvl = KhoNVL.filter(val => value.includes(val.TenNVL)).map(val => val.MaNVL)
        console.log(khonvl)

        let data = '';
        if (khonvl.length > 0) {
            data = '{"MaNVL":"' + khonvl[0] + '"}';
            data = JSON.parse(data);
            await HTTP.patch('manage/ThucUong/' + rowId + '/update', data)
            setOpenKhoNVLMessage(false);
            setOpen(true);
        } else {
            setOpenKhoNVLMessage(true);
        }
    }

    function rowValueFunc(value) {
        setRowId(value.id)
    }

    const columns = [
        { field: 'MaTU', headerName: 'Mã Thức Uống', width: 180 },
        {
            field: 'TenTU',
            headerName: 'Tên Thức Uống',
            width: 165,
            editable: true,
        },
        {
            field: 'DvtTU',
            headerName: 'Đơn vị tính',
            width: 280,
            editable: true,
        },
        {
            field: 'GiaTU',
            headerName: 'Giá',
            width: 280,
            editable: true,
        },
        {
            field: "MaNVL",
            headerName: "Kho Nguyên Vật Liệu",
            width: 260,
            renderCell: (params) => (
                <Select
                    style={{ width: '100%' }}
                    placeholder="Xin hãy chọn kho nguyên vật liệu"
                    mode="multiple"
                    defaultValue={
                        KhoNVL.filter(val => params.value.includes(val.MaNVL)).map(val => val.TenNVL)
                    }
                    removeIcon={customIcon}
                    onFocus={() => rowValueFunc(params)}
                    maxTagCount='responsive'
                    onChange={handleChangeKhoNVL}>
                    {khonvl}
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
        deleteThucUong();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openKhoNVLMessage, setOpenKhoNVLMessage] = React.useState(false);

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
            modifyThucUong(model);
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
        await HTTP.get('manage/KhoNVL-list').then((res) => {
            setKhoNVL(res.data)
        })
        await HTTP.get('manage/ThucUong-list').then((res) => {
            setThucUong(res.data)
            setLoading(false)
        })
    }

    function fetchThucUong() {
        HTTP.get('manage/ThucUong-list').then((res) => {
            setThucUong(res.data)
        })
    }

    const modifyThucUong = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifyThucUong = await HTTP.patch('manage/ThucUong/' + modifyValue.id + '/update', data)
        return modifyThucUong;
    }

    const deleteThucUong = async () => {
        const modifyThucUong = await HTTP.delete('manage/ThucUong/' + id + '/delete').then(() => {
            fetchThucUong()
        });
        return modifyThucUong;
    }

    const finishCreate = () => {
        fetchThucUong()
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
                    open={openKhoNVLMessage}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Chọn một kho nguyên vật liệu đi ạ!
                    </Alert>
                </Snackbar>
            </div>
            <Modal title="Xoá thức uống" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Có chắc xoá thức uống này?</p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInThucUong handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={ThucUong}
                getRowId={(row) => row.MaTU}
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

export default ThucUong;