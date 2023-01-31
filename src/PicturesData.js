import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './CardStyles.css';
import SearchBar from './components/SearchBar';
import { fetchedData, filteredData } from './redux/action';
const _ = require("lodash"); 

const PicturesData = () => {

    const data = useSelector((state) => state.handleData.pictures)
    const filters = useSelector((state) => state.handleData.filteredPictures)

    const dispatch = useDispatch()

    // const [data, setData] = useState([]);
    // const [filter, setFilter] = useState(data);
    const [searchValue, setSearchValue] = useState("");
    let componentMounted = true;


    const fetchData = () => {
        return fetch("https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json")
            .then((response) => response.json())
            .then((result) => dispatch(fetchedData(result.pics)))
    }

    useEffect(() => {
        const getPictures = async () => {
            const response = fetch("https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json")
                .then((response) => response.json())
                .then((result) => dispatch(filteredData(result.pics)))
        }
        getPictures();
        fetchData();
    }, []);


    // useEffect(() => {
    //     const getPictures = async () => {
    //         const response = require("./pictures.json");
    //         if (componentMounted) {
    //             setData(response);
    //             setFilter(response);
    //         }

    //         return () => {
    //             componentMounted = false;
    //         }
    //     }

    //     getPictures();
    // }, []);

    const sortUpByPrice = () => {
        const result = [...filters].sort((a, b) => a.likes - b.likes);
        dispatch(filteredData(result));
    }

    const sortDownByPrice = () => {
        const result = [...filters].sort((a, b) => b.likes - a.likes);
        dispatch(filteredData(result));
    }

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
        filterPictures(e.target.value);
    }

    const filterPictures = (cat) => {

        const keyword = cat;

        if (keyword !== '') {
            const results = data.filter((x) => {
                return x.category.toLowerCase().startsWith(cat.toLowerCase());
            });
            dispatch(filteredData(results));
        } else {
            dispatch(filteredData(data));
        }

    }

    const ShowPictures = () => {
        return (
            <>
                <div className='mb-5' align="center">
                    <h4>Search Picture</h4>
                    <div>
                        <SearchBar
                            handleInputChange={handleInputChange}
                            searchValue={searchValue}
                        />
                        <button className="btn btn-outline-dark me-2" onClick={sortUpByPrice}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-up" viewBox="0 0 16 16">
                                <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                            </svg>
                        </button>
                        <button className="btn btn-outline-dark me-2" onClick={sortDownByPrice}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down-alt" viewBox="0 0 16 16">
                                <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {filters && filters.length > 0 ? (
                    filters.map((picture) => {
                        return (
                            <>
                                <div className="col-md-3 mb-4">
                                    <div className="card h-100">
                                        <img src={picture.url} class="card-img-top" alt={picture.category} height="250px" />
                                        <div className="card-body">
                                            <h5 className="card-title mb-0 fw-bold">{picture.category}</h5>
                                            <p className="card-text lead"><i class="fa-solid fa-heart"></i>{picture.likes}</p>
                                            {picture.comments.map((comment) => {
                                                return (
                                                    <p className='comments'>{comment}</p>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })) : (
                    <div align="center">
                        <h1 >No results found!</h1>
                    </div>
                )
                }
            </>
        )

    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5" >
                        <h1 className='display-6 fw-bolder 
                    text-center'>Pictures Gallery</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <ShowPictures />
                </div>
            </div>
        </div>
    )
}

export default PicturesData;