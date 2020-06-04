import {
    RECEIVE_DATA,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
} from '../constants/ActionTypes'

export default function posts(state = [], action) {
    switch (action.type) {
        case RECEIVE_DATA:
            return action.posts
        case ADD_POST:
            return state.concat(action.post)
        case DELETE_POST:
            return state.filter(post => post.id !== action.post_id)
        case UPDATE_POST:
            // remove old post 
            if (!action.updated_post.error) {
                const new_state = state.filter(post => post.id !== action.updated_post.id)
                // add updated post
                return new_state.concat(action.updated_post)
            }
            
        default:
            return state
    }
}