// For data from api
export const fetchedData = (picture) => {
    return{
        type : "DATA",
        payload : picture
    }
}

// For filtered data
export const filteredData = (picture) => {
    return{
        type : "FLTRDATA",
        payload : picture
    }
}

export const addLikes = (likes) => {
    return{
        type : "LIKEADD",
        payload : likes
    }
}