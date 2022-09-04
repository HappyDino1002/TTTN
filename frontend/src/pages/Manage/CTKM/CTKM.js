import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin } from 'antd';

import FormModalInCTKM from '../../../components/FormModalInCTKM'

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

const CTKM = () => {
    const columns = [
        { field: 'MaCT',headerName: 'Mã Chương Trình', width: 150 },
        {
            field: 'TenCT',
            headerName: 'Tên Chương Trình',
            width: 250,
            editable: true,
        },
        {
            field: 'NgayBatDau',
            headerName: 'Ngày Bắt Đầu',
            width: 250,
            editable: true,
        },
        {
            field: 'NgayKetThuc',
            headerName: 'Ngày Kết Thúc',
            width: 250,
            editable: true,
        },
        {
            field: 'HinhThucKM',
            headerName: 'Hình Thức',
            width: 250,
            editable: true,
        },
        {
            field: 'DKADung',
            headerName: 'Điều kiện',
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

    const [MaCT, setMaCT] = useState(0);

    const showModal = (value) => {
        setMaCT(value)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        deleteCTKM();
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
    const [CTKM, setCTKM] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleCommit = React.useCallback((model) => {
        try {
            modifyCTKM(model);
            handleClick();
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/CTKM-list').then((res) => {
            if (isMounted) {
                setCTKM(res.data)
                setLoading(false)
            }
        })
        return () => { isMounted = false }
    }, [])

    const modifyCTKM = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifyCTKM = await HTTP.patch('manage/CTKM/' + modifyValue.MaCT + '/update', data);
        return modifyCTKM;
    }

    const deleteCTKM = async () => {
        const modifyCTKM = await HTTP.delete('manage/CTKM/' + MaCT + '/delete').then(() => {
            fetchCTKM()
        });
        return modifyCTKM;
    }

    function fetchCTKM() {
        HTTP.get('manage/CTKM-list').then((res) => {
            setCTKM(res.data);
        })
    }

    const finishCreate = () => {
        fetchCTKM()
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
            <Modal title="Xoá chương trình khuyến mãi" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc xoá chương trình này không?</p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInCTKM handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={CTKM}
                getRowId={(row) => row.MaCT}
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

export default CTKM;