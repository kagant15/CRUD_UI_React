// var $ = require('jquery');

var React = require('react');
var ReactDOM = require('react-dom');

var Table = require('react-bootstrap').Table;



/* Initial app state */
function getAppState(){
	return {list : [{
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

var Main = React.createClass({

	getInitialState: function() {
		return getAppState();
	},

	/* Setup socket listeners and corrisponding actions for each event */
	componentDidMount: function() {

	},

	render: function() {
		return (
			<div className='container'>
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
							          <button type="button" className="btn btn-primary">
							            Edit
							          </button>
							          <button type="button" className="btn btn-warning">
							            Delete
							          </button>
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
