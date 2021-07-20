import { createStore, applyMiddleware } from "redux"; //http://developinginspanish.com/2020/09/17/react-redux-tutorial-para-principiantes-y-v/
import rootReducer from "../Reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

//https://rosolutions.com.mx/blog/index.php/2018/07/19/consumir-api-con-react-redux/
// Sale como utilizar middlewarepara consumir una api con react-redux
// thunk:facilitar el manejo del dispatch de Redux
// rootReducer:https://redux.js.org/api/combinereducers

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;