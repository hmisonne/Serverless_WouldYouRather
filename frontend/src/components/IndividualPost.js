import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleDeletePost } from '../actions/shared'
import {  handleUpdatePost } from '../actions/posts'

import ReplyComment from './ReplyComment'
import PostDesign from './PostDesign'
import { Link, withRouter } from 'react-router-dom'

class IndividualPost extends Component {
    state = {
        replyActive: false
    }
    handleDelete = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        const { id } = this.props.postDetail
        dispatch(handleDeletePost(id))
    }
    handleEdit = (e) => {
        e.preventDefault()
        const { id, category } = this.props.postDetail
        const { history } = this.props
        history.push(`/${category}/${id}/update`)
    }
    handleVote = (e) => {
        e.preventDefault()
        const option = e.target.name
        const { dispatch } = this.props
        let updated_post = this.props.postDetail

        option === 'upVote' ?
            updated_post.voteScore = updated_post.voteScore + 1 :
            updated_post.voteScore = updated_post.voteScore - 1

        dispatch(handleUpdatePost(updated_post))
    }
    handleReply = (e) => {
        e.preventDefault()
        this.toggleReply()
    }
    toggleReply = () => {
        this.setState((prevState)=> ({
            replyActive: !prevState.replyActive
        }))
    }
    render() {
        const { id, author, body, category, commentCount, timestamp, title, voteScore } = this.props.postDetail

        return (
            <div>
                <div className='post'>
                    <Link to={`/${category}/${id}`}>
                        <PostDesign 
                            postDetail={this.props.postDetail}
                            handleVote={this.handleVote}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            handleReply={this.handleReply}
                            />
                    </Link>

                </div>
                {this.state.replyActive &&
                    <ReplyComment 
                        parentId={id}
                        toggleReply={this.toggleReply}/>
                }
            </div>
        );
    }

}


export default withRouter(connect()(IndividualPost));