import _ from "lodash";


const initialState = []
  
const handleData = (state = initialState, action) => {
    switch (action.type) {
        case "DATA":
            const pics = action.payload;
            return {
                pictures: pics,
                filteredPictures: state.filteredPictures,
            };

        case "FLTRDATA":
            const filteredPics = action.payload;
            return {
                pictures: state.pictures,
                filteredPictures: filteredPics,
            }

        case "LIKEADD": 
            const pictureId = action.payload;
            const newPictures = _.cloneDeep(state);
            (newPictures.filteredPictures).map((picture) => {
                if(picture.id === pictureId){
                    const likedAlready = picture.likes;
                    picture.likes = likedAlready + 1;
                }
                return newPictures;
            })
            return newPictures;
            
      default:
        return state
    }
  }

export default handleData;