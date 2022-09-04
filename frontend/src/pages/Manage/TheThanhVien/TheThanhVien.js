import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin } from 'antd';

import FormModalInTheThanhVien from '../../../components/FormModalInTheThanhVien'

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

const TheThanhVien = () => {
    const columns = [
        { field: 'MaThe',headerName: 'Mã Thẻ', width: 150 },
        {
            field: 'HangThe',
            headerName: 'Hạng Thẻ',
            width: 250,
            editable: true,
        },
        {
            field: 'DiemThuong',
            headerName: 'Điểm Thưởng',
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

    const [MaThe, setMaThe] = useState(0);

    const showModal = (value) => {
        setMaThe(value)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        deleteTheThanhVien();
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
    const [TheThanhVien, setTheThanhVien] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleCommit = React.useCallback((model) => {
        try {
            modifyTheThanhVien(model);
            handleClick();
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/TheThanhVien-list').then((res) => {
            if (isMounted) {
                setTheThanhVien(res.data)
                setLoading(false)
            }
        })
        return () => { isMounted = false }
    }, [])

    const modifyTheThanhVien = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifyTheThanhVien = await HTTP.patch('manage/TheThanhVien/' + modifyValue.MaThe + '/update', data);
        return modifyTheThanhVien;
    }

    const deleteTheThanhVien = async () => {
        const modifyTheThanhVien = await HTTP.delete('manage/TheThanhVien/' + MaThe + '/delete').then(() => {
            fetchTheThanhVien()
        });
        return modifyTheThanhVien;
    }

    function fetchTheThanhVien() {
        HTTP.get('manage/TheThanhVien-list').then((res) => {
            setTheThanhVien(res.data);
        })
    }

    const finishCreate = () => {
        fetchTheThanhVien()
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
            <Modal title="Xoá thẻ" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc xoá thẻ này không?</p>
                <p>   Warning : Việc này sẽ xoá dữ liệu thẻ liên quan đến khách hàng !!!
                </p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInTheThanhVien handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={TheThanhVien}
                getRowId={(row) => row.MaThe}
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

export default TheThanhVien;