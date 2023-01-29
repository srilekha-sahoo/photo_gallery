import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './CardStyles.css';
import SearchBar from './components/SearchBar';
import { fetchedData, filteredData } from './redux/action';

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
                    <SearchBar 
                        handleInputChange={handleInputChange}
                        searchValue={searchValue} 
                    />
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