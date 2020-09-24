
import authReducer from '../reducers/authReducer'
import companyReducer from '../reducers/companyReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    authReducer,
    companyReducer
})

export default rootReducer;