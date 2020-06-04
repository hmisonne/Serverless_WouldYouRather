import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleGetPostComments } from '../actions/comments'
import IndividualComment from './IndividualComment'
import IndividualPost from './IndividualPost'

class PostDetail extends Component {
    componentDidMount() {
        const { id } = this.props
        this.props.dispatch(handleGetPostComments(id))

    }
    render() {
        const { postDetail } = this.props
        const { comments } = this.props
        if (postDetail.title === undefined) {
            return (
                <div>404 not found</div>
            )
        }
        return (

            <div>
	            	<div>Post Detail</div>
			  		<IndividualPost postDetail={postDetail}/>
			  		<ul>
			  			{comments.map(comment =>
			  				<IndividualComment
				  				key={comment.id}
				  				comment={comment}/>
			  				)

			  			}
			  		</ul>
			  	</div>

        );
    }


}


function mapStateToProps({ comments, posts }, props) {
    const { id } = props.match.params
    let postDetail = {}
    if (posts.length !== 0) {
        postDetail = posts.filter(post => post.id === id)[0]
    }
    return {
        id,
        comments: comments.sort((a, b) => a.timestamp - b.timestamp),
        postDetail
    }
}

export default connect(mapStateToProps)(PostDetail)