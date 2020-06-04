import { RECEIVE_USERS} from '../constants/ActionTypes'

export function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users
	}
}