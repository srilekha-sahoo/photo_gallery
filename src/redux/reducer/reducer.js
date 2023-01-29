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
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }

export default handleData;