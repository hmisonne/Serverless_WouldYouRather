import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddComment } from '../actions/shared'
import { generateUID } from '../utils/helpers'

class ReplyComment extends Component {
    state = {
        currComment: {
            body: '',
            author: '',
        },
    }

    handleInputChange = (e) => {
        const { name, value } = e.target
        this.setState((currState) => ({
            ...currState,
            currComment: {
                ...currState.currComment,
                [name]: value
            }
        }))
    }
    handleBodyChange = (e) => {
        const body = e.target.value
        this.setState((currState) => ({
            ...currState,
            currComment: {
                ...currState.currComment,
                body
            }
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { body, author } = this.state.currComment
        const { dispatch, parentId } = this.props
        let new_comment = {
            body,
            author,
            id: generateUID(),
            parentId,
            timestamp: Date.now()
        }
        dispatch(handleAddComment(new_comment))
        this.props.toggleReply()
    }

    render() {
        const { body , author } = this.state.currComment
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <br />
                  <textarea
                    className='textarea'
                    placeholder="Comment"
                    name="body"
                    type="text"
                    value={body}
                    onChange={this.handleBodyChange} />

                <br />
                  <input
                    placeholder="Author"
                    name="author"
                    type="text"
                    value={author}
                    onChange={this.handleInputChange} />
                <br />
                <input type="submit" value="Submit" />
              </form>
            </div>
            
        );
    }

}




export default connect()(ReplyComment);