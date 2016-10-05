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
		var bugRows = this.props.bugs.map(function(bug) {
			return <BugRow key={bug._id} bug={bug} />
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
		this.props.addBug({owner: form.owner.value, decs: form.decs.value, status: 'New', priority: 1});
		// clear the form for next input
		form.owner.value = ""; form.decs.value = "";
	}
});

var BugRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.bug._id}</td>
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
			bugs: []
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
	componentDidMount: function() {
		$.ajax('/api/bugs').done(function(data) {
			this.setState({bugs: data});
		}.bind(this));
	},
	addBug: function(bug) {
		console.log("Adding bug:", bug);
		// // making a copy of state
		// var bugsCopy = this.state.bugs.slice();
		// bug.id = this.state.bugs.length + 1;
		// // bug.priority = this.state.bugs.length +1;
		// bugsCopy.push(bug);
		// this.setState({bugs: bugsCopy});
		// use ajax to post a new bug
		$.ajax({
			// make AJAX POST to url /api/bugs of type JSON
			type: 'POST', url: '/api/bugs', contentType: 'application/json',
			data: JSON.stringify(bug),
			// if success make copy of bug in state
			success: function(data) {
				var bug = data;
				var bugsCopy = this.state.bugs.concat(bug);
				this.setState({bugs: bugsCopy});
			}.bind(this),
			// otherwise show error to user
			error: function(xhr, status, err) {
				console.log("Error adding bug:", err);
			}
		});
	}
});

ReactDOM.render(
	<BugList />,
	document.getElementById('main')
);