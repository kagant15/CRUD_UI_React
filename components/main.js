
/* Ajax */
var axios = require('axios');

/* React */
var React = require('react');
var ReactDOM = require('react-dom');

/* Redux */
var connect = require('react-redux').connect;

/* Actions */
var setModal = require('../actions/action').setModal;
var loadEmployees = require('../actions/action').loadEmployees;
var changeValue = require('../actions/action').changeValue;
var updateList = require('../actions/action').updateList;
var deleteRecord = require('../actions/action').deleteRecord;
var addRecord = require('../actions/action').addRecord;

/* React bootstrap */
var Table = require('react-bootstrap').Table;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

/* Immutable.js */
var Immutable = require('immutable');

/* Custom component */
var UpdateModal = require('./UpdateModal');

/* returns YYYY-MM-DD format for today */
const today = ()=> new Date().toISOString().split('T')[0];

/* The main component for the application */
const Main = React.createClass({

	/* Component Setup */
	componentDidMount(){
		// console.log("componentDidMount");
		var me = this;
		axios({
		    method : "GET",
		    url : "/contacts"
		}).then(function success(response){
			// -- Load the initial data into the view
		    me.props.dispatch(loadEmployees(response.data))
		}, function error(response){
			console.log("error on loading of initial data", response);
		});
	},

	componentWillUpdate(){
		// console.log("componentWillUpdate");
		// console.debug("this.props", this.props);
	},

	/* Close the delete modal */
	closeDeleteModal(){
		this.props.dispatch(setModal({showModal : false }))
	},

	/* Open the modal and set the record that should be edited */
	open(record){
		this.props.dispatch(setModal({showModal : true, modelToEdit : record}))
	},

	/* Callback to handle the changes of an input in the form */
	handleChange(event, property) {
		this.props.dispatch(changeValue({property : property, value : event.target.value}))
	},

	/* Callback to handle the date change*/
	handleDateChange(date) {
		this.props.dispatch(changeValue({property : "dateHired", value : date.split('T')[0]}))
	},

	/* Close the modal */
	closeUpdateModal(){
		this.props.dispatch(setModal({showUpdateModal : false}))
	},

	/* Edit record */
	onEditButtonClick(isUpdateModal, record = Immutable.Map({ dateHired : today()}) ){
		this.props.dispatch(setModal({showUpdateModal : true, modelToEdit : record, isUpdateModal: isUpdateModal }))
	},

	/* Delete a record from the database */
	delete(){
		const me = this;
		const modelToEdit = this.props.modelToEdit;
		axios({
          method : "DELETE",
          url : "/contacts/"+modelToEdit.get('_id'),
          data : modelToEdit.get('_id')
        }).then(function success(response){

			me.props.dispatch(deleteRecord(response.data))

        }, function error(response){
          console.log("error of delete");
        });
	},

	/* Update the record in the database */
	update(){
		const me = this;
		const modelToEdit = this.props.modelToEdit;
		axios({
          method : "PUT",
          url : "/contacts/"+modelToEdit.get('_id'),
          data : modelToEdit
        }).then(function success(response){

        	me.props.dispatch(updateList(response.data))


        }, function error(response){
          console.log("error on update");
        });
	},

	/* Create a new record */
	create(){
		const me = this;
		const modelToEdit = this.props.modelToEdit;
		axios({
          method : "POST",
          url : "/contacts",
          data : modelToEdit
        }).then(function success(response){
 
			me.props.dispatch(addRecord(response));


        }, function error(response){
          console.log("error on update");
        });
	},

	render() {
		// console.debug("RENDER this.props", this.props);
		return (
			<div className='container'>


			<UpdateModal show={this.props.showUpdateModal} 
						 handleChange={this.handleChange} 
						 record={this.props.modelToEdit} 
						 update={this.update}
						 create={this.create}
						 handleDateChange={this.handleDateChange}
						 isUpdateModal={this.props.isUpdateModal}
						 cancel={this.closeUpdateModal} />
	

			<div className="static-modal">
			    <Modal show={this.props.showModal}>
			      <Modal.Header>
			        <Modal.Title>Confrim Delete</Modal.Title>
			      </Modal.Header>

			      <Modal.Body>
			        Are you sure you wish to delete this record?
			      </Modal.Body>

			      <Modal.Footer>
			        <Button bsStyle='warning' onClick={this.delete}>Delete</Button>
			        <Button bsStyle="primary" onClick={this.closeDeleteModal}>Cancel</Button>
			      </Modal.Footer>

			    </Modal>
			</div>
				<div className='panel panel-default'>
					<div className='panel-heading'>Employees</div>
					<Table>
						<thead>
							<tr>
						        <th>First Name</th>
						        <th>Last Name</th>
						        <th>Middle Initial</th>
						        <th>E-mail</th>
						        <th>Phone Number</th>
						        <th>Position Category</th>
						        <th>Date Hired</th>
						        <th>Address 1</th>
						    </tr>
					    </thead>
					    <tbody>
						{this.props.list.map((record)=>{
							return (
								<tr key={record.get('_id')}>
									<td>{record.get('firstName')}</td>
									<td>{record.get('lastName')}</td>
									<td>{record.get('middleInt')}</td>
									<td>{record.get('email')}</td>
									<td>{record.get('phone')}</td>
									<td>{record.get('position')}</td>
									<td>{record.get('dateHired')}</td>
									<td>{record.get('addressOne')}</td>
									<td>
							          <Button bsStyle="primary" onClick={()=>{this.onEditButtonClick(true, record)}} >
							            Update
							          </Button>
							          <Button bsStyle='warning' onClick={()=>{this.open(record)}}>Delete</Button>
							        </td>
								</tr>
							)
						})}
						<tr>
					    	<td>
						        <button type="button" className="btn btn-primary" onClick={()=>{this.onEditButtonClick(false)}} >
						        	Add
						        </button>
					        </td>
					        <td></td>
					        <td></td>
					        <td></td>
					        <td></td>
					        <td></td>
					        <td></td>
					        <td></td>
					        <td></td>
					     </tr>
						</tbody>
					</Table>
				</div>
			</div>
		);
	}
});

const mapStateToProps = (state, ownProps) => {
	// console.debug("state from map", state);
	// console.debug("ownProps", ownProps);
	return state;
};

module.exports = connect(mapStateToProps)(Main);
