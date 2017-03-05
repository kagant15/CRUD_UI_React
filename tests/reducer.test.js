
/* reducers */
import reducer from '../reducers'
/* actinos */
import * as types from '../actions/action'

/* React */
import React from 'react';
import ReactDOM from 'react-dom'

/* Immutable.js */
import Immutable from 'immutable'

/* Custom component */
import UpdateModal from '../components/UpdateModal'


describe('App', () => {
    it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });
});

/* component test */
describe('UpdateModal', () => {
    it('renders without crashing', () => {
        const record = Immutable.Map({})


        const div = document.createElement('div');
        ReactDOM.render(<UpdateModal record={record} />, div);
    });
});

/* reducer test */
describe('reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        showModal : false,
        isUpdateModal : false,
        showUpdateModal : false, 
        modelToEdit : Immutable.Map({}),
        list :  Immutable.List([])
      }
    )
  })

  /* action test */
  it('should handle SET_SHOW_MODAL', () => {
    expect(
      reducer(undefined, {
        type: types.SET_SHOW_MODAL,
        data: {showModal : true}
      })
    ).toEqual(
      {
        showModal : true,
        isUpdateModal : false,
        showUpdateModal : false, 
        modelToEdit : Immutable.Map({}),
        list :  Immutable.List([])
      }
    )
  })
})