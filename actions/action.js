/*
 * action types
 */

export const SET_SHOW_MODAL = 'SET_SHOW_MODAL'
export const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES'
export const CHANGE = 'CHANGE'
export const UPDATE_LIST = 'UPDATE_LIST'
export const DELETE_RECORD = 'DELETE_RECORD'
export const ADD_RECORD = 'ADD_RECORD'



/*
 * action creators
 */

export function setModal(data) {
  return { type: SET_SHOW_MODAL, data }
}

export function loadEmployees(data) {
  return { type: LOAD_EMPLOYEES, data }
}

export function changeValue(data) {
  return { type: CHANGE, data }
}

export function updateList(data) {
  return { type: UPDATE_LIST, data }
}

export function deleteRecord(data) {
  return { type: DELETE_RECORD, data }
}

export function addRecord(data) {
  return { type: ADD_RECORD, data }
}

