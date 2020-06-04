import React, { Component } from 'react';
import IndividualPost from './IndividualPost'
import { connect } from 'react-redux'
import { handleFilterByCat } from '../actions/posts'
import { handleInitialData } from '../actions/shared'

class Home extends Component {
    state = {
        categories: [
            {
              name: 'react',
              path: 'react'
            },
            {
              name: 'redux',
              path: 'redux'
            },
            {
              name: 'udacity',
              path: 'udacity'
            }
        ],
        sortByRecentDate: true,
        sortByVote: false,

    }
    componentDidMount() {
        fetch(`http://127.0.0.1:3001/categories`, { headers: { 'Authorization': 'mySecretToken' } })
            .then(res => res.json())
            .then(result => this.setState({ categories: result.categories }))
        const { dispatch } = this.props
        const {category} = this.props.match.params
        category
        ? dispatch(handleFilterByCat(category))
        : dispatch(handleInitialData())
    }
    handleFilterCat = (e) => {
        e.preventDefault()
        const { name } = e.target
        const { dispatch } = this.props
        const { history } = this.props
        history.push(`/${name}`)
        dispatch(handleFilterByCat(name))
    }

    handleSort = (e) => {
        e.preventDefault()
        const { name } = e.target
        this.setState((prevState) => ({
            [name]: !prevState[name],
        }))
    }

    render() {
    	
        const { categories, sortByRecentDate, sortByVote } = this.state
        const { posts } = this.props

        sortByRecentDate
            ?
            posts.sort((a, b) => a.timestamp - b.timestamp) :
            posts.sort((a, b) => b.timestamp - a.timestamp)

        sortByVote && posts.sort((a, b) => a.voteScore - b.voteScore)

        return (
            <div>
		  	<button 
		  		onClick={this.handleSort}
		  		name='sortByRecentDate'>Sort By Date</button>
			<button
				onClick={this.handleSort}
		  		name='sortByVote'>Sort By Vote</button>  	
			  	<div>
				    <div>
				      Category
				    </div>

				    <ul>
				    	<button 
							key = 'reset'
							name = ''
							onClick = {this.handleFilterCat}> All</button>	
				    	{ categories.map(category =>
							<button 
								key = {category.name}
								name = {category.path}
								onClick = {this.handleFilterCat}> {category.name}</button>	
				    		)
				    	
				    	}
				    	
				    </ul>
				</div>

				<div>
				    <div>
				      Post
				    </div>
				    <ul>
				    	{ posts.map((post) =>
				    		<li key={post.id}>
							< IndividualPost
								id={post.id}
								postDetail={post}/>
							</li>
				    		)
				    	
				    	}
				    	
				    </ul>
				</div>	
			</div>
        );
    }

}

function mapStateToProps({ posts }) {
    return {
        posts,
    }
}

export default connect(mapStateToProps)(Home);