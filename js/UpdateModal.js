
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

var ImmutablePropTypes = require("react-immutable-proptypes");


const onlyLetters = (str)=> {
	if(!str || str.length < 1){
		return 'warning';
	}
	else if(/^[a-zA-Z]+$/.test(str)){
		return 'success'
	}
	else{
		return 'error'
	}
}

const isEmail = (email)=> {
	if(!email || email.length < 1){
		return 'warning';
	}
	else if(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
		return 'success'
	}
	else{
		return 'error'
	}
}

const isPhoneNumber = (phoneNumber)=> {
	if(!phoneNumber || phoneNumber.length === 0){
		// -- do nothing
	}
	else if(phoneNumber && phoneNumber.match(/\d/g).length===10){
		return 'success';
	}
	else{
		return 'error'
	}
}


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

	componentDidMount() {

	},

	render(){
		return (
			<Modal show={this.props.show}>
				<Modal.Header>
			    	<Modal.Title>Update User</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form>
						<FormGroup controlId="formControlsFirstName" validationState={onlyLetters(this.props.record.get('firstName'))}>
					      <ControlLabel>First Name</ControlLabel>
					      <FormControl type="text" value={this.props.record.get('firstName')} onChange={(event)=>{this.props.handleChange(event, "firstName")}} />
					      <FormControl.Feedback />
					    </FormGroup>
						<FormGroup controlId="formControlsLastName" validationState={onlyLetters(this.props.record.get('lastName'))}>
					      <ControlLabel>Last Name</ControlLabel>
					      <FormControl type="text" value={this.props.record.get('lastName')} onChange={(event)=>{this.props.handleChange(event, "lastName")}} />
					      <FormControl.Feedback />
					    </FormGroup>
					    <FormGroup controlId="formControlsMiddleInitial" validationState={onlyLetters(this.props.record.get('middleInt'))}>
					      <ControlLabel>Middle Initial</ControlLabel>
					      <FormControl type="text" maxLength={1} style={{width : 40}} value={this.props.record.get('middleInt')} onChange={(event)=>{this.props.handleChange(event, "middleInt")}}/>
					    </FormGroup>
					    <FormGroup controlId="formControlsEmail" validationState={isEmail(this.props.record.get('email'))}>
					      <ControlLabel>E-mail</ControlLabel>
					      <FormControl type="email" value={this.props.record.get('email')} onChange={(event)=>{this.props.handleChange(event, "email")}} />
					      <FormControl.Feedback />
					    </FormGroup>
					    <FormGroup controlId="formControlsPhone" validationState={isPhoneNumber(this.props.record.get('phone'))}>
					      <ControlLabel>Phone Number</ControlLabel>
					      <FormControl type="text"  value={this.props.record.get('phone')} onChange={(event)=>{this.props.handleChange(event, "phone")}} />
					      <FormControl.Feedback />
					    </FormGroup>
					    <FormGroup controlId="formControlsSelect">
					      <ControlLabel>Position Category</ControlLabel>
					      <FormControl componentClass="select" value={this.props.record.get('position')} onChange={(event)=>{this.props.handleChange(event, "position")}} >
					      	<option value="Select">select</option>
					       	<option value="Indirect">Indirect</option>
			                <option value="Direct">Direct</option>
			                <option value="Program Manager">Program Manager</option>
			                <option value="Director">Director</option>
			                <option value="Executive">Executive</option>
					      </FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Date Hired</ControlLabel>
							<DatePicker id="example-datepicker" value={this.props.record.get('dateHired')} onChange={this.props.handleDateChange}/>
						</FormGroup>
					 </form>
			    </Modal.Body>

			    <Modal.Footer>
			    {this.props.isUpdateModal ? <Button bsStyle="primary" onClick={this.props.update}>Update</Button> : <Button bsStyle="primary" onClick={this.props.create}>Create</Button>}
			    	<Button onClick={this.props.cancel}>Cancel</Button>
			    </Modal.Footer>

			</Modal>
			)
	}
});

UpdateModal.propTypes = {
	show : React.PropTypes.bool,
	handleChange: React.PropTypes.func,
	record: ImmutablePropTypes.map.isRequired,
	update: React.PropTypes.func,
	cancel: React.PropTypes.func,
}

module.exports = UpdateModal;