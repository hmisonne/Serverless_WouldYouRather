import {
    RECEIVE_DATA,
    ADD_POST,
    UPDATE_POST
} from '../constants/ActionTypes'

export function receivePosts(posts) {
    return {
        type: RECEIVE_DATA,
        posts
    }
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}


export function updatePost(updated_post) {
    return {
        type: UPDATE_POST,
        updated_post
    }
}


export function handleAddPost(new_post) {
    return dispatch => {
        return fetch("http://127.0.0.1:3001/posts", {
                method: 'POST',
                headers: { 'Authorization': 'mySecretToken', 'Content-Type': 'application/json' },
                body: JSON.stringify(new_post)
            })
            .then(res => res.json())
            .then(post => dispatch(addPost(post)))
    }
}


export function handleUpdatePost(updated_post) {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/posts/${updated_post.id}`, {
                method: 'PUT',
                headers: { 'Authorization': 'mySecretToken', 'Content-Type': 'application/json' },
                body: JSON.stringify(updated_post)
            })
            .then(res => res.json())
            .then(updated_post => dispatch(updatePost(updated_post)))
    }
}


export function handleFilterByCat(cat) {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/${cat}/posts`, {
                method: 'GET',
                headers: { 'Authorization': 'mySecretToken', 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(posts => dispatch(receivePosts(posts)))
    }
}

// export function updatePostCommentCount(post_id) {
//     return {
//         type: UPDATE_POST_COMMENT_COUNT,
//         post_id
//     }
// }


export function updatePostCommentCount(post_id) {
    return dispatch => {
        return fetch(`http://127.0.0.1:3001/posts/${post_id}`, {
                method: 'GET',
                headers: { 'Authorization': 'mySecretToken', 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(post => dispatch(updatePost(post)))
    }

}