import { createStore, combineReducers } from "redux";
import merchantsReducer from "./reducers/merchants";
import cardsReducer from "./reducers/cards";
import uiReducer from "./reducers/ui";

const rootReducer = combineReducers({
    merchant: merchantsReducer,
    card: cardsReducer,
    ui: uiReducer
});

const store = createStore(rootReducer);

export default store;
