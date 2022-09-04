import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import HTTP from '../services/axiosConfig';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../components/Card';
import Search from '../components/Search'
import querystring from 'query-string'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Homepage = () => {
    const classes = useStyles();
    const [page, setPage] = useState({ from: 0, to: 4 })
    const [book, setBook] = useState([]);
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [bookCategory, setBookCategory] = useState([]);
    const [bookLocation, setBookLocation] = useState([]);

    const [filter, setFilter] = useState({
        search: '',
    })

    React.useEffect(() => {
        async function fetchData() {
            const paramString = querystring.stringify(filter)
            await HTTP.get(`manage/books?${paramString}`).then((res) => {
                fetchDataTemp()
                setBook(res.data)
                setItems(res.data.slice(0, 4))
            })
        }

        fetchData()
    }, [filter])

    const fetchDataTemp = async () => {
        await HTTP.get('manage/book-category').then((res) => {
            setBookCategory(res.data)
        })
        await HTTP.get('manage/book-location').then((res) => {
            setBookLocation(res.data)
        })
    }

    const fetchMoreData = () => {
        if (items.length >= book.length) {
            setHasMore(false);
            return;
        }
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            let fr = page.to;
            let t = page.to + 4;
            if (fr > book.length) fr = book.length;
            if (t > book.length) t = book.length;
            setPage({ from: fr, to: t });
            setItems(items.concat(book.slice(fr, t)))
        }, 1500);
    };

    function handleFiltersChange(newFilters) {
        console.log('New Filters', newFilters);
        setFilter({
            search: newFilters.searchTerm,
        });
    }

    return (
        <div>
            <Search onSubmit={handleFiltersChange} />
            <div className="text-center" style={{ marginTop: '60px', marginBottom: '60px' }}>
                <h1 style={{ color: 'rgb(115, 178, 245)', fontWeight: 'bold' }}>Welcome to BooK library</h1>
            </div>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <div className={classes.root}>
                        <LinearProgress style={{ margin: '20px' }} />
                    </div>
                }
                className="flex-container"
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b></b>
                    </p>
                }
            >
                {items.map((value, index) => (
                    <div key={index}>
                        <Card author={value.author} bookLocation={bookLocation} bookCategory={bookCategory} image={value.image} location={value.location} category={value.category} description={value.description} name={value.name} />
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default Homepage