import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddPost, handleUpdatePost } from '../actions/posts'
import { generateUID } from '../utils/helpers'
import CreateEditPost from './CreateEditPost'
import CreateEditComment from './CreateEditComment'
import { handleUpdateComment } from '../actions/comments'

class CreateEdit extends Component {
    state = {
        currPost: {
            title: '',
            body: '',
            author: '',
            category: 'react'
        },
        categories: []
    }

    componentDidMount() {
        if (this.props.post) {
            this.setState(() => ({
                currPost: this.props.post
            }))
            fetch(`http://127.0.0.1:3001/categories`, { headers: { 'Authorization': 'mySecretToken' } })
                .then(res => res.json())
                .then(response => this.setState({ categories: response.categories }))
        }


    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState((currState) => ({
            ...currState,
            currPost: {
                ...currState.currPost,
                [name]: value
            }
        }))
    }
    handleBodyChange = (e) => {
        const body = e.target.value
        this.setState((currState) => ({
            ...currState,
            currPost: {
                ...currState.currPost,
                body
            }
        }))
    }
    handleSubmitComment = (e) => {
        const { body, id } = this.state.currPost
        const timestamp = Date.now()
        const { dispatch, history } = this.props
        dispatch(handleUpdateComment({id, body, timestamp}))
        history.push('/')
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { body, category, title, author } = this.state.currPost
        const { dispatch, history } = this.props
        let new_post = {
            title,
            body,
            author,
            category,
        }
        if (this.props.post.id) {
            new_post.id = this.props.post.id
            new_post.timestamp = this.props.post.timestamp
            dispatch(handleUpdatePost(new_post))
        } else {
            new_post.id = generateUID()
            new_post.timestamp = Date.now()
            dispatch(handleAddPost(new_post))
        }
        history.push('/')

    }

    render() {
        if (this.props.post.parentId) {
            return (
            <CreateEditComment
                handleSubmit={this.handleSubmitComment}
                handleBodyChange={this.handleBodyChange}
                currComment={this.state.currPost}
            />
        );
        }
        
        return (
            <CreateEditPost
                handleSubmit={this.handleSubmit}
                handleInputChange={this.handleInputChange}
                handleBodyChange={this.handleBodyChange}
                currPost={this.state.currPost}
                categories={this.state.categories}
            />
        );
    }

}


function mapStateToProps({ posts, comments }, props) {
    console.log('para',props.match.params)
    const { id } = props.match.params
    const { category } = props.match.params
    const categories = ['react', 'redux', 'udacity']
    let postDetail = {}
    if ((posts.length !== 0) && (categories.includes(category))) {
        postDetail = posts.filter(post => post.id === id)[0]
    }
    if ((comments.length !== 0) && (category === 'comments')){
        postDetail = comments.filter(comment => comment.id === id)[0]
    }
    return {
        post: postDetail,
    }
}

export default connect(mapStateToProps)(CreateEdit);