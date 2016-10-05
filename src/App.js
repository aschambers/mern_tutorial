var data = [
  {id: 1, priority: 1, status: "Open", owner: "Alex", decs: "App crashes when opening"},
  {id: 2, priority: 2, status: "New", owner: "Brian", decs: "Pages have a weird border"},
  {id: 3, priority: 3, status: "New", owner: "Ryan", decs: "Can't login to my e-mail"}
];

var BugFilter = React.createClass({
	render: function() {
		return (
			<div className="BugFilter">
				I filter bugs your code has!
			</div>
		);
	}
});

var BugTable = React.createClass({
	render: function() {
		bugs={data}
		var bugRows = this.props.bugs.map(function(bug) {
			return <BugRow key={bug.id} bug={bug} />
		});
		return (
			<div className="BugTable">
				<h1>This is a list of bugs as a table.</h1>
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Priority</th>
							<th>Status</th>
							<th>Owner</th>
							<th>Title</th>
						</tr>
					</thead>
					<tbody>
						{bugRows}
					</tbody>
				</table>
			</div>
		);
	}
});

var BugAdd = React.createClass({
	render: function() {
		return (
			<div className="BugAdd">
				I am meant to add bugs!
			</div>
		);
	}
});

var BugRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.bug.id}</td>
				<td>{this.props.bug.priority}</td>
				<td>{this.props.bug.status}</td>
				<td>{this.props.bug.owner}</td>
				<td>{this.props.bug.decs}</td>
			</tr>
		)
	}
})

var BugList = React.createClass({
	getInitialState: function() {
		return {
			bugs: data
		};
	},
	render: function() {
		console.log("Rendering bug list, num items:", this.state.bugs.length);
		return (
			<div className="BugList">
				<h1>List of all bugs here:</h1>
				<BugFilter />
				<BugTable bugs={this.state.bugs} />
				<button onClick={this.addBug}>Add Bug</button>
				<hr />
				<BugAdd />
			</div>
		)
	},
	addBug: function() {
		var nextId = this.state.bugs.length + 1;
		this.newBug({id: nextId, priority: 4, status: 'New', owner: 'Milan', decs: 'Console warning'});
	},
	newBug: function(bug) {
		console.log("Adding bug:", bug);
		// making a copy of state
		var bugsCopy = this.state.bugs.slice();
		bugsCopy.push(bug);
		this.setState({bugs: bugsCopy});
	}
});

ReactDOM.render(
	<BugList />,
	document.getElementById('main')
);