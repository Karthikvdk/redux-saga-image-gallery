import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import imageReducer from "./imageReducer";
import loadingReducer from "./loadingReducer";
import pageReducer from "./pageReducer";
import statsReducer from "./statsReducer";

const rootReducer = combineReducers({
    images: imageReducer,
    error: errorReducer,
    isLoading: loadingReducer,
    nextPage: pageReducer,
    imageStats: statsReducer
});

export default rootReducer;