
var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var FormControl = require('react-bootstrap').FormControl;
var HelpBlock = require('react-bootstrap').HelpBlock;
var Form = require('react-bootstrap').Form;
var Col = require('react-bootstrap').Col;
var FieldGroup = require('react-bootstrap').FieldGroup;
var DatePicker = require("react-bootstrap-date-picker");


const UpdateModal = React.createClass({

	getInitialState() {
		return {
				firstName : '', 
				lastName : '', 
				middleInt : '',
				email : '',
				phone : '',
				position : 'select',
				dateHired : '',
				addressOne : ''
		}
	},

	componentDidMount: function() {

	},

	render(){
		return (
			<Modal show={this.props.show}>
				<Modal.Header>
			    	<Modal.Title>Update User</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form>
						<FormGroup controlId="formControlsFirstName">
					      <ControlLabel>First Name</ControlLabel>
					      <FormControl type="text" value={this.props.record.firstName} onChange={(event)=>{this.props.handleChange(event, "firstName")}} />
					    </FormGroup>
						<FormGroup controlId="formControlsLastName">
					      <ControlLabel>Last Name</ControlLabel>
					      <FormControl type="text" value={this.props.record.lastName} onChange={(event)=>{this.props.handleChange(event, "lastName")}} />
					    </FormGroup>
					    <FormGroup controlId="formControlsMiddleInitial">
					      <ControlLabel>Middle Initial</ControlLabel>
					      <FormControl type="text" value={this.props.record.middleInt} onChange={(event)=>{this.props.handleChange(event, "middleInt")}}/>
					    </FormGroup>
					    <FormGroup controlId="formControlsEmail">
					      <ControlLabel>E-mail</ControlLabel>
					      <FormControl type="email" value={this.props.record.email} onChange={(event)=>{this.props.handleChange(event, "email")}} />
					    </FormGroup>
					    <FormGroup controlId="formControlsPhone">
					      <ControlLabel>Phone Number</ControlLabel>
					      <FormControl type="text"  value={this.props.record.phone} onChange={(event)=>{this.props.handleChange(event, "phone")}} />
					    </FormGroup>
					    <FormGroup controlId="formControlsSelect">
					      <ControlLabel>Select</ControlLabel>
					      <FormControl componentClass="select" value={this.props.record.position} onChange={(event)=>{this.props.handleChange(event, "position")}} >
					      	<option value="select">select</option>
					       	<option value="indirect">Indirect</option>
			                <option value="direct">Direct</option>
			                <option value="programManager">Program Manager</option>
			                <option value="director">Director</option>
			                <option value="executive">Executive</option>
					      </FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Date Hired</ControlLabel>
							<DatePicker id="example-datepicker" />
						</FormGroup>
					 </form>
			    </Modal.Body>

			    <Modal.Footer>
			    	<Button bsStyle="primary" onClick={this.props.update}>Update</Button>
			    	<Button onClick={this.props.cancel}>Cancel</Button>
			    </Modal.Footer>

			</Modal>
			)
	}
});

UpdateModal.propTypes = {
	handleChange: React.PropTypes.func
}

module.exports = UpdateModal;