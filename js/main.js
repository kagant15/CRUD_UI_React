var axios = require('axios');

var React = require('react');
var ReactDOM = require('react-dom');

var Table = require('react-bootstrap').Table;
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var UpdateModal = require('./UpdateModal');

/* Initial app state */
function getAppState(){
	// -- default state
	return {
			showModal : false,
			showUpdateModal : false, 
			modelToEdit : {
						firstName : '', 
						lastName : '', 
						middleInt : '',
						email : '',
						phone : '',
						position : '',
						dateHired : '',
						addressOne : ""
					},
			list : [{
						firstName : 'Thomas', 
						lastName : 'Kagan', 
						middleInt : 'M',
						email : 'tomkagan26@gmail.com',
						phone : '555-964-5555',
						position : 'Developer',
						dateHired : '12-15-1989',
						addressOne : "3901 Lyndhurst Drive"
					},
					{
						firstName : 'Samantha', 
						lastName : 'Shiley', 
						middleInt : 'M',
						email : 'sshiley@gmail.com',
						phone : '555-262-5555',
						position : 'Wife',
						dateHired : '1-24-1992',
						addressOne : "3901 Lyndhurst Drive"
					}] };
}


const Main = React.createClass({

	getInitialState() {
		return getAppState();
	},

	close(){
		this.setState({showModal : false})
	},

	open(record){
		this.setState({showModal : true, modelToEdit : record})
	},

	handleFirstNameChange(event) {
		const thing = this.state.modelToEdit;
		thing.firstName = event.target.value;
		this.setState({modelToEdit: thing});
	},

	delete(){
		var me = this;
		axios({
          method : "DELETE",
          url : "/contacts/"+me.state.modelToEdit._id,
          data : me.state.modelToEdit._id
        }).then(function success(response){
          location.reload()
        }, function error(response){
          console.log("error of delete");
        });
	},

	/* Update the record */
	update(){
		const record = this.state.modelToEdit;
		var me = this;
		axios({
          method : "PUT",
          url : "/contacts/"+me.state.modelToEdit._id,
          data : record
        }).then(function success(response){

			// -- update the list with the update data and in the correct place in the list
		    var newList = [];
		    me.state.list.forEach((record)=>{
		    	if(record._id === response.data._id){
		    		newList.push(response.data)
		    	else
		    		newList.push(record);
		    })

        	me.setState({showUpdateModal : false, list : newList});

        }, function error(response){
          console.log("error on update");
        });
	},

	/* Setup socket listeners and corrisponding actions for each event */
	componentDidMount: function() {
		var me = this;
		axios({
		    method : "GET",
		    url : "/contacts"
		}).then(function success(response){
		    me.setState({ list : response.data});
		}, function error(response){
			console.log("error", response);
		});

	},

	cancel(){
		this.setState({showUpdateModal : false})
	},

	onEditButtonClick(record){
		const thing = Object.assign({}, record);
		this.setState({showUpdateModal : true, modelToEdit : thing})
	},

	render() {
		return (
			<div className='container'>
			<UpdateModal show={this.state.showUpdateModal} handleFirstNameChange={this.handleFirstNameChange} record={this.state.modelToEdit} update={this.update} cancel={this.cancel} />
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
			        <Button bsStyle="primary" onClick={this.close}>Cancel</Button>
			      </Modal.Footer>

			    </Modal>
			  </div>
				<div className='panel panel-default'>
					<div className='panel-heading'>SBS Front End Project</div>
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
						{this.state.list.map((record, i)=>{
							return (
								<tr key={i}>
									<td>{record.firstName}</td>
									<td>{record.lastName}</td>
									<td>{record.middleInt}</td>
									<td>{record.email}</td>
									<td>{record.phone}</td>
									<td>{record.position}</td>
									<td>{record.dateHired}</td>
									<td>{record.addressOne}</td>
									<td>
							          <Button bsStyle="primary" onClick={()=>{this.onEditButtonClick(record)}} >
							            Edit
							          </Button>
							          <Button bsStyle='warning' onClick={()=>{this.open(record)}}>Delete</Button>
							        </td>
								</tr>
							)
						})}
						<tr>
					    	<td>
						        <button type="button" className="btn btn-primary">
						        	Add
						        </button>
					        </td>
					     </tr>
						</tbody>
					</Table>
				</div>
			</div>
		);
	},

	/* Event to set that latest state of the application */
	_onChange : function(){
		
	},

});
module.exports = Main;
