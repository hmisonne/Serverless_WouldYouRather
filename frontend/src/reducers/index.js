import { combineReducers } from 'redux'

import posts from './posts'
import comments from './comments'

export default combineReducers({
    posts,
    comments
})