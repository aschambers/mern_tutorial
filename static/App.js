var data = [{ id: 1, priority: 1, status: "Open", owner: "Alex", decs: "App crashes when opening" }, { id: 2, priority: 2, status: "New", owner: "Brian", decs: "Pages have a weird border" }, { id: 3, priority: 3, status: "New", owner: "Ryan", decs: "Can't login to my e-mail" }];

var BugFilter = React.createClass({
	displayName: "BugFilter",

	render: function () {
		return React.createElement(
			"div",
			{ className: "BugFilter" },
			"I filter bugs your code has!"
		);
	}
});

var BugTable = React.createClass({
	displayName: "BugTable",

	render: function () {
		bugs = { data };
		var bugRows = this.props.bugs.map(function (bug) {
			return React.createElement(BugRow, { key: bug.id, bug: bug });
		});
		return React.createElement(
			"div",
			{ className: "BugTable" },
			React.createElement(
				"h1",
				null,
				"This is a list of bugs as a table."
			),
			React.createElement(
				"table",
				null,
				React.createElement(
					"thead",
					null,
					React.createElement(
						"tr",
						null,
						React.createElement(
							"th",
							null,
							"Id"
						),
						React.createElement(
							"th",
							null,
							"Priority"
						),
						React.createElement(
							"th",
							null,
							"Status"
						),
						React.createElement(
							"th",
							null,
							"Owner"
						),
						React.createElement(
							"th",
							null,
							"Title"
						)
					)
				),
				React.createElement(
					"tbody",
					null,
					bugRows
				)
			)
		);
	}
});

var BugAdd = React.createClass({
	displayName: "BugAdd",

	render: function () {
		return React.createElement(
			"div",
			{ className: "BugAdd" },
			"I am meant to add bugs!"
		);
	}
});

var BugRow = React.createClass({
	displayName: "BugRow",

	render: function () {
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				this.props.bug.id
			),
			React.createElement(
				"td",
				null,
				this.props.bug.priority
			),
			React.createElement(
				"td",
				null,
				this.props.bug.status
			),
			React.createElement(
				"td",
				null,
				this.props.bug.owner
			),
			React.createElement(
				"td",
				null,
				this.props.bug.decs
			)
		);
	}
});

var BugList = React.createClass({
	displayName: "BugList",

	getInitialState: function () {
		return {
			bugs: data
		};
	},
	render: function () {
		console.log("Rendering bug list, num items:", this.state.bugs.length);
		return React.createElement(
			"div",
			{ className: "BugList" },
			React.createElement(
				"h1",
				null,
				"List of all bugs here:"
			),
			React.createElement(BugFilter, null),
			React.createElement(BugTable, { bugs: this.state.bugs }),
			React.createElement(
				"button",
				{ onClick: this.addBug },
				"Add Bug"
			),
			React.createElement("hr", null),
			React.createElement(BugAdd, null)
		);
	},
	addBug: function () {
		var nextId = this.state.bugs.length + 1;
		this.newBug({ id: nextId, priority: 4, status: 'New', owner: 'Milan', decs: 'Console warning' });
	},
	newBug: function (bug) {
		console.log("Adding bug:", bug);
		// making a copy of state
		var bugsCopy = this.state.bugs.slice();
		bugsCopy.push(bug);
		this.setState({ bugs: bugsCopy });
	}
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));