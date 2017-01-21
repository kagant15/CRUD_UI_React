
/* Ajax */
var axios = require('axios');

/* React */
var React = require('react');
var ReactDOM = require('react-dom');

/* React bootstrap */
var Table = require('react-bootstrap').Table;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

/* Immutable.js */
var Immutable = require('immutable');

/* Custom component */
var UpdateModal = require('./UpdateModal');

/* Initial app state */
function getAppState(){
	// -- default state
	var startingState = {
			showModal : false,
			isUpdateModal : false,
			showUpdateModal : false, 
			modelToEdit : Immutable.Map({}),
			list :  Immutable.List([])
		};

	return startingState;
}

/* returns YYYY-MM-DD format for today */
const today = ()=> new Date().toISOString().split('T')[0];

/* The main component for the application */
const Main = React.createClass({

	getInitialState() {
		return getAppState();
	},

	/* Component Setup */
	componentDidMount(){
		var me = this;
		axios({
		    method : "GET",
		    url : "/contacts"
		}).then(function success(response){
			// -- Load the initial data into the view
		    me.setState({ list : Immutable.fromJS(response.data)});
		}, function error(response){
			console.log("error", response);
		});

	},

	/* Close the delete modal */
	closeDeleteModal(){
		this.setState({showModal : false})
	},

	/* Open the modal and set the record that should be edited */
	open(record){
		this.setState({showModal : true, modelToEdit : record})
	},

	/* Callback to handle the changes of an input in the form */
	handleChange(event, property) {
		const thing = this.state.modelToEdit.set(property, event.target.value);
		this.setState({modelToEdit: thing});
	},

	/* Callback to handle the date change*/
	handleDateChange(date) {
		const thing = this.state.modelToEdit.set("dateHired", date.split('T')[0]);
		this.setState({modelToEdit: thing});
	},

	/* Close the modal */
	closeUpdateModal(){
		this.setState({showUpdateModal : false})
	},

	/* Edit record */
	onEditButtonClick(record, isUpdateModal){
		this.setState({showUpdateModal : true, modelToEdit : record, isUpdateModal: isUpdateModal})
	},

	/* Delete a record from the database */
	delete(){
		const me = this;
		const modelToEdit = this.state.modelToEdit;
		axios({
          method : "DELETE",
          url : "/contacts/"+modelToEdit.get('_id'),
          data : modelToEdit.get('_id')
        }).then(function success(response){

        	// -- update the view with the result from the delete
        	// -- delete the item from the list by index
        	const list = me.state.list;
			me.setState({
				showModal : false, 
				list : list.delete(
						list.findIndex(
				 			x=>{return x.get('_id')=== response.data._id}
				 		))
				});
        }, function error(response){
          console.log("error of delete");
        });
	},

	/* Update the record in the database */
	update(){
		const me = this;
		const modelToEdit = this.state.modelToEdit;
		axios({
          method : "PUT",
          url : "/contacts/"+modelToEdit.get('_id'),
          data : modelToEdit
        }).then(function success(response){

        	// -- update the list in the view based on the result of the update
        	// -- get the index then use it to update the view.
        	const list = me.state.list;
        	const newList = list.update(
								list.findIndex(
						 			x=>{return x.get("_id") === response.data._id}
						 		), record =>{ return Immutable.fromJS(response.data) });
        	
			me.setState({
				showUpdateModal : false, 
				list : newList
			});

        }, function error(response){
          console.log("error on update");
        });
	},

	/* Create a new record */
	create(){
		const me = this;
		const modelToEdit = this.state.modelToEdit;
		axios({
          method : "POST",
          url : "/contacts",
          data : modelToEdit
        }).then(function success(response){
        	const list = me.state.list;
        	const newList = list.push(Immutable.fromJS(response.data));
        	
			me.setState({
				showUpdateModal : false, 
				list : newList
			});

        }, function error(response){
          console.log("error on update");
        });
	},

	render() {
		return (
			<div className='container'>

			<UpdateModal show={this.state.showUpdateModal} 
						 handleChange={this.handleChange} 
						 record={this.state.modelToEdit} 
						 update={this.update}
						 create={this.create}
						 handleDateChange={this.handleDateChange}
						 isUpdateModal={this.state.isUpdateModal}
						 cancel={this.closeUpdateModal} />

			<div className="static-modal">
			    <Modal show={this.state.showModal}>
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
						{this.state.list.map((record)=>{
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
							          <Button bsStyle="primary" onClick={()=>{this.onEditButtonClick(record, true)}} >
							            Update
							          </Button>
							          <Button bsStyle='warning' onClick={()=>{this.open(record)}}>Delete</Button>
							        </td>
								</tr>
							)
						})}
						<tr>
					    	<td>
						        <button type="button" className="btn btn-primary" onClick={()=>{this.onEditButtonClick(Immutable.Map({ dateHired : today()}), false)}} >
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
module.exports = Main;
