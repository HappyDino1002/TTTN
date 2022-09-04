import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin } from 'antd';

import FormModalInKhuVuc from '../../../components/FormModalInKhuVuc'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
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

const KhuVuc = () => {
    const columns = [
        { field: 'MaKV',headerName: 'Mã Khu Vực', width: 150 },
        {
            field: 'TenKV',
            headerName: 'Tên Khu Vực',
            width: 250,
            editable: true,
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

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [MaKV, setMaKV] = useState(0);

    const showModal = (value) => {
        setMaKV(value)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        deleteKhuVuc();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [KhuVuc, setKhuVuc] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleCommit = React.useCallback((model) => {
        try {
            modifyKhuVuc(model);
            handleClick();
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/khuvuc-list').then((res) => {
            if (isMounted) {
                setKhuVuc(res.data)
                setLoading(false)
            }
        })
        return () => { isMounted = false }
    }, [])

    const modifyKhuVuc = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifyKhuVuc = await HTTP.patch('manage/khuvuc/' + modifyValue.MaKV + '/update', data);
        return modifyKhuVuc;
    }

    const deleteKhuVuc = async () => {
        const modifyKhuVuc = await HTTP.delete('manage/khuvuc/' + MaKV + '/delete').then(() => {
            fetchKhuVuc()
        });
        return modifyKhuVuc;
    }

    function fetchKhuVuc() {
        HTTP.get('manage/khuvuc-list').then((res) => {
            setKhuVuc(res.data);
        })
    }

    const finishCreate = () => {
        fetchKhuVuc()
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
            </div>
            <Modal title="Xoá khu vực" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc xoá khu vực này không?</p>
                <p>   Warning : Việc này sẽ xoá dữ liệu cửa hàng liên quan đến khu vực !!!
                </p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInKhuVuc handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={KhuVuc}
                getRowId={(row) => row.MaKV}
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

export default KhuVuc;