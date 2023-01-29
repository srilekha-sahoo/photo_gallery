const initialState = []
  
const filterData = (state = initialState, action) => {
    switch (action.type) {
        case "DATA":
            const pics = action.payload;
            return[
                ...pics,
            ]

        case "FLTRDATA":
            const filteredPics = action.payload;
            return[
                ...filteredPics,
            ]
      default:
        // If this reducer doesn't recognize the action type, or doesn't
        // care about this specific action, return the existing state unchanged
        return state
    }
  }

export default filterData;