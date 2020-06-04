import { receivePosts, updatePostCommentCount } from './posts'
import { addComment } from './comments'
import {
    DELETE_POST,
    DELETE_COMMENT,
} from '../constants/ActionTypes'


export function handleInitialData() {
    return dispatch => {
        fetch("http://127.0.0.1:3001/posts", { headers: { 'Authorization': 'mySecretToken' } })
            .then(res => res.json())
            .then(posts => dispatch(receivePosts(posts)))
    }
}


export function handleDeletePost(post_id) {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/posts/${post_id}`, {
                method: 'DELETE',
                headers: { 'Authorization': 'mySecretToken', 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(post => {
                dispatch(deletePost(post.id))
            })
    }
}

export function deletePost(post_id) {
    return {
        type: DELETE_POST,
        post_id
    }
}

export function handleDeleteComment(comment_id) {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/comments/${comment_id}`, {
                method: 'DELETE',
                headers: { 'Authorization': 'mySecretToken', 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(comment => {
                dispatch(deleteComment(comment.id))
                dispatch(updatePostCommentCount(comment.parentId))
            })
    }
}

export function deleteComment(comment_id) {
    return {
        type: DELETE_COMMENT,
        comment_id
    }
}

export function handleAddComment(new_comment) {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/comments`, 
            {
                method: 'POST', 
                headers: { 'Authorization': 'mySecretToken', 'Content-Type': 'application/json' },
                body: JSON.stringify(new_comment) 
            })
            .then(res => res.json())
            .then(comment => {
                dispatch(addComment(comment))
                dispatch(updatePostCommentCount(comment.parentId))
            })
    }
}