import authReducer from './auth.reducer';
import userReducer from './user.reducer';
import productReduer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import { combineReducers } from 'redux';
import pageReducer from './page.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReduer,
    category: categoryReducer,
    order: orderReducer,
    page:pageReducer
});

export default rootReducer;