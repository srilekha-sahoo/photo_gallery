import handleData from "./reducer";
// import filterData from "./filteredReducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
    handleData,
    // filterData,
})

export default rootReducers;