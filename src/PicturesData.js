import React, { useState, useEffect } from 'react';
import './CardStyles.css';

const PicturesData = () => {

    const [data, setData] = useState([]);
    let componentMounted = true;

    useEffect(() => {
        const getPictures = async () => {
            const response = require("./pictures.json");
            if (componentMounted) {
                setData(response);
            }

            return () => {
                componentMounted = false;
            }
        }

        getPictures();
    }, []);


    const ShowPictures = () => {
        return (
            <>
                {data.map((picture) => {
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div className="card">
                                    <img src={picture.url} class="card-img-top" alt={picture.category} height="250px" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-0 fw-bold">{picture.category}</h5>
                                        <p className="card-text lead"><i class="fa-solid fa-heart"></i>{picture.likes}</p>
                                        {picture.comments.map((comment) => {
                                            return(
                                                <p className='comments'>{comment}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
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