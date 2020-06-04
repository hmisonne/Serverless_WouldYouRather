import React from 'react'
import User from './User'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Leaderboard = (props) => {
	const {users, sortedUsers} = props
	return(
		<div>
			<h4>Leaderboard</h4>
			<ul>
				{sortedUsers.map(id => 
					<User 
						key={users[id].id}
						user={users[id]}/>
					)
					
				}
			</ul>
		</div>
		)
	}

function mapStateToProps ({ users }) {
	// Sort users for leaderboard
	const sortedUsers = Object.keys(users)
		.sort((a,b) => users[b].score - users[a].score)
	return {
		users,
		sortedUsers
	}
}

export default connect(mapStateToProps)(Leaderboard)

Leaderboard.propTypes = {
	users: PropTypes.object.isRequired,
	sortedUsers: PropTypes.array.isRequired,
}