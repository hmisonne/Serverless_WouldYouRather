import React, { Component } from 'react';
import { formatDate } from '../utils/helpers'

const PostDesign = (props) => {


    const { id, author, body, category, commentCount, timestamp, title, voteScore } = props.postDetail

    return (
        <div className="post-info">
            <div>
                <span>{author}: {title}</span>
                <div>{formatDate(timestamp)}</div> 
                <p>{body}</p> 
            </div>
            <div className='post-icons'>
                <div>{voteScore} Votes 
                    {props.handleReply &&<span>{commentCount} Comments</span>}
                </div> 
                <div >
                    <button 
                        name='upVote'
                        onClick={props.handleVote}>+</button>
                    <button
                        name='downVote'
                        onClick={props.handleVote}>-</button>
                    <button onClick={props.handleEdit}>edit</button>
                    <button onClick={props.handleDelete}>delete</button>
                    {props.handleReply && <button onClick={props.handleReply}>reply</button>}
                    
                </div>
            </div>
            
        </div>
    );

}


export default PostDesign;