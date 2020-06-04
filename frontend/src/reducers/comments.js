import {
    GET_POST_COMMENTS,
    DELETE_COMMENT,
    ADD_COMMENT,
    UPDATE_COMMENT
} from '../constants/ActionTypes'

export default function comments(state = [], action) {
    switch (action.type) {
        case GET_POST_COMMENTS:
            return action.comments
        case DELETE_COMMENT:
            return state.filter(comment => comment.id !== action.comment_id)
        case ADD_COMMENT:
            return state.concat(action.comment)
        case UPDATE_COMMENT:
            const new_state = state.filter(comment => comment.id !== action.updated_comment.id)
            // add updated post
            return new_state.concat(action.updated_comment)
        default:
            return state
    }
}

// case DELETE_POST:
//     return state.filter(post => post.parentId !== action.post_id)