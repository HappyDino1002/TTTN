import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin } from 'antd';

import FormModalInCate from '../../../components/FormModalInCate'

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

const Category = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 770,
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

    const [id, setId] = useState(0);

    const showModal = (value) => {
        setId(value)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        deleteBookCategory();
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
    const [bookCategory, setBookCategory] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleCommit = React.useCallback((model) => {
        try {
            modifyBookCategory(model);
            handleClick();
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    React.useEffect(() => {
        let isMounted = true;
        HTTP.get('manage/book-category').then((res) => {
            if (isMounted) {
                setBookCategory(res.data)
                setLoading(false)
            }
        })
        return () => { isMounted = false }
    }, [])

    const modifyBookCategory = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifyBookCategory = await HTTP.patch('manage/book-category/' + modifyValue.id + '/update', data);
        return modifyBookCategory;
    }

    const deleteBookCategory = async () => {
        const modifyBookCategory = await HTTP.delete('manage/book-category/' + id + '/delete').then(() => {
            fetchBookCategory()
        });
        return modifyBookCategory;
    }

    function fetchBookCategory() {
        HTTP.get('manage/book-category').then((res) => {
            setBookCategory(res.data);
        })
    }

    const finishCreate = () => {
        fetchBookCategory()
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
                        The information was updated successfully.
                    </Alert>
                </Snackbar>
            </div>
            <Modal title="Delete category" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure to delete this category?</p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInCate handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={bookCategory}
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

export default Category;