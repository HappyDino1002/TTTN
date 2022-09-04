import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import HTTP from '../../../services/axiosConfig';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Spin, Select } from 'antd';

import FormModalInAllBook from '../../../components/FormModalInAllBook'

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

const AllBooks = () => {

    const [selectionModel, setSelectionModel] = React.useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [book, setBook] = React.useState([]);
    const [bookCategory, setBookCategory] = React.useState([]);
    const [bookLocation, setBookLocation] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rowId, setRowId] = React.useState(null);

    const location = [];
    bookLocation.map((value) => {
        location.push(<Option key={value.name}>{value.name}</Option>);
        return value;
    })

    const category = [];
    bookCategory.map((value) => {
        category.push(<Option key={value.name}>{value.name}</Option>);
        return value;
    })

    async function handleChangeCategory(value) {
        //console.log(value);
        let category = bookCategory.filter(val => value.includes(val.name)).map(val => val.id)

        let data = '';
        if (category.length > 0) {
            data = '{"category":[' + category + ']}';
            data = JSON.parse(data);
            await HTTP.patch('manage/books/' + rowId + '/update', data)
            setOpenCategoryMessage(false);
            setOpen(true);
        } else {
            setOpenCategoryMessage(true);
        }
    }

    async function handleChangeLocation(value) {
        //console.log(value);
        let location = bookLocation.filter(val => value.includes(val.name)).map(val => val.id)

        let data = '';
        if (location.length > 0) {
            data = '{"location":[' + location + ']}';
            data = JSON.parse(data);
            await HTTP.patch('manage/books/' + rowId + '/update', data)
            setOpenLocationMessage(false);
            setOpen(true);
        } else {
            setOpenLocationMessage(true);
        }

    }

    function rowValueFunc(value) {
        setRowId(value.id)
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 165,
            editable: true,
        },
        {
            field: 'author',
            headerName: 'Author',
            width: 140,
            editable: true,
        },
        {
            field: "category",
            headerName: "Category",
            width: 260,
            renderCell: (params) => (
                <Select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    mode="multiple"
                    defaultValue={
                        bookCategory.filter(val => params.value.includes(val.id)).map(val => val.name)
                    }
                    removeIcon={customIcon}
                    onFocus={() => rowValueFunc(params)}
                    maxTagCount='responsive'
                    onChange={handleChangeCategory}>
                    {category}
                </Select>
            ),
        },
        {
            field: "location",
            headerName: "Location",
            width: 160,
            renderCell: (params) => (
                <Select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    mode="multiple"
                    removeIcon={customIcon}
                    defaultValue={
                        bookLocation.filter(val => params.value.includes(val.id)).map(val => val.name)
                    }
                    maxTagCount='responsive'
                    onFocus={() => rowValueFunc(params)}
                    onChange={handleChangeLocation}>
                    {location}
                </Select>
            ),
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
            editable: true,
        },
        {
            field: 'quantity',
            headerName: 'Qty',
            type: 'number',
            width: 100,
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

    const [id, setId] = useState(0);

    const showModal = (value) => {
        setId(value)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        deleteBook();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openCategoryMessage, setOpenCategoryMessage] = React.useState(false);
    const [openLocationMessage, setOpenLocationMessage] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    /*function validateEmail(email) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }*/

    const handleEditRowsModelChange = React.useCallback((model) => {
        setEditRowsModel(model);
    }, []);

    const handleCommit = React.useCallback((model) => {
        try {
            modifyBook(model);
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
        await HTTP.get('manage/book-category').then((res) => {
            setBookCategory(res.data)
        })
        await HTTP.get('manage/book-location').then((res) => {
            setBookLocation(res.data)
        })
        await HTTP.get('manage/books').then((res) => {
            setBook(res.data)
            setLoading(false)
        })
    }

    function fetchBook() {
        HTTP.get('manage/books').then((res) => {
            setBook(res.data)
        })
    }

    const modifyBook = async (modifyValue) => {
        let data = '{"' + modifyValue.field + '":"' + modifyValue.value + '"}';
        data = JSON.parse(data);
        const modifyBookCategory = await HTTP.patch('manage/books/' + modifyValue.id + '/update', data)
        return modifyBookCategory;
    }

    const deleteBook = async () => {
        const modifyBookCategory = await HTTP.delete('manage/books/' + id + '/delete').then(() => {
            fetchBook()
        });
        return modifyBookCategory;
    }

    const finishCreate = () => {
        fetchBook()
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
                <Snackbar
                    open={openCategoryMessage}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Please select at least one of the category!
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openLocationMessage}
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Please select at least one of the location!
                    </Alert>
                </Snackbar>
            </div>
            <Modal title="Delete category" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure to delete this location?</p>
            </Modal>
            <div style={{ marginBottom: 20 }}>
                <FormModalInAllBook handleFinish={finishCreate} />
            </div>
            <DataGrid
                rows={book}
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

export default AllBooks;