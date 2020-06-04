import {
    GET_POST_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENT
} from '../constants/ActionTypes'

export function getPostComments(comments) {
    return {
        type: GET_POST_COMMENTS,
        comments
    }
}


export function handleGetPostComments(id) {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/posts/${id}/comments`, { headers: { 'Authorization': 'mySecretToken' } })
            .then(res => res.json())
            .then(comments => {
                return dispatch(getPostComments(comments))
            })
    }
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function updateComment(updated_comment) {
    return {
        type: UPDATE_COMMENT,
        updated_comment
    }
}

export function handleUpdateCommentVote(updated_comment, option) {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/comments/${updated_comment.id}`, {
                method: 'POST',
                headers: { 'Authorization': 'mySecretToken', 'Content-Type': 'application/json' },
                body: JSON.stringify({ option })
            })
            .then(res => res.json())
            .then(updated_comment => dispatch(updateComment(updated_comment)))
    }
}

export function handleUpdateComment(comment) {
    const {id, body, timestamp} = comment
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/comments/${id}`, {
                method: 'PUT',
                headers: { 'Authorization': 'mySecretToken', 'Content-Type': 'application/json' },
                body: JSON.stringify({ timestamp, body })
            })
            .then(res => res.json())
            .then(updated_comment => dispatch(updateComment(updated_comment)))
    }
}