
import { combineReducers } from 'redux'
import { SET_SHOW_MODAL, LOAD_EMPLOYEES, CHANGE, ADD_RECORD, DELETE_RECORD, UPDATE_LIST } from '../actions/action'

/* Immutable.js */
import Immutable from 'immutable'

const initialState = {
	showModal : false,
	isUpdateModal : false,
	showUpdateModal : false, 
	modelToEdit : Immutable.Map({}),
	list :  Immutable.List([])
}

function appReducer(state = initialState, action){
	// console.debug("action", action);
	switch (action.type){
		case SET_SHOW_MODAL:
			return Object.assign({}, state, action.data);
		case LOAD_EMPLOYEES:
			return Object.assign({}, state, {list : Immutable.fromJS(action.data)})
		case CHANGE:
			const modelToEdit_update = state.modelToEdit.set(action.data.property, action.data.value)
			return Object.assign({}, state, {modelToEdit : modelToEdit_update});
		case ADD_RECORD:
			const thing = state.list.push(Immutable.fromJS(action.data))
			return Object.assign({}, state, {list : thing, showUpdateModal : false})
		case DELETE_RECORD:
			const newList1 = state.list.delete(
								state.list.findIndex(
						 			x=>{return x.get("_id") === action.data._id}
						 		))

			return Object.assign({}, state, {list : newList1, showModal : false});
		case UPDATE_LIST:
			const newList = state.list.update(
								state.list.findIndex(
						 			x=>{return x.get("_id") === action.data._id}
						 		), record =>{ return Immutable.fromJS(action.data) });

			return Object.assign({}, state, {list : newList, showUpdateModal : false});
		default:
			return state;
	}
}

// const todoApp = combineReducers({
// 	  appReducer
// })

export default appReducer