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
						<BugRow id={1} priority="1" status="Open" owner="Alex" decs="App crashes when opening" />
						<BugRow id={2} priority="2" status="New" owner="Brian" decs="Pages have weird border" />
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
				<td>{this.props.id}</td>
				<td>{this.props.priority}</td>
				<td>{this.props.status}</td>
				<td>{this.props.owner}</td>
				<td>{this.props.decs}</td>
			</tr>
		)
	}
})

var BugList = React.createClass({
	render: function() {
		return (
			<div className="BugList">
				<h1>List of all bugs here:</h1>
				<BugFilter />
				<BugTable />
				<hr />
				<BugAdd />
			</div>
		)
	}
});

ReactDOM.render(
	<BugList />,
	document.getElementById('main')
);