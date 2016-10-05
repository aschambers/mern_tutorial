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
							<th>Description</th>
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
			<div>
				<form name="bugAdd">
					<input type="text" name="owner" placeholder="Owner" /><br />
					<input type="text" name="decs" placeholder="Description" />
					{/* call handleSubmit function upon button click */}
					<button onClick={this.handleSubmit}>Add Bug</button>
				</form>
			</div>
		);
	},
	handleSubmit: function(e) {
		// prevent form from resubmitting upon button click
		e.preventDefault();
		// set form equal to form name
		var form = document.forms.bugAdd;
		// add properties entered to form
		this.props.addBug({owner: form.owner.value, decs: form.decs.value, status: 'New'});
		// clear the form for next input
		form.owner.value = ""; form.decs.value = "";
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
				<hr />
				<BugTable bugs={this.state.bugs} />
				<hr />
				<BugAdd addBug={this.addBug} />
			</div>
		)
	},
	addBug: function(bug) {
		console.log("Adding bug:", bug);
		// making a copy of state
		var bugsCopy = this.state.bugs.slice();
		bug.id = this.state.bugs.length + 1;
		bug.priority = this.state.bugs.length +1;
		bugsCopy.push(bug);
		this.setState({bugs: bugsCopy});
	}
});

ReactDOM.render(
	<BugList />,
	document.getElementById('main')
);