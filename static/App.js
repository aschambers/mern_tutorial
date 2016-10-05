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
		var bugRows = this.props.bugs.map(function (bug) {
			return React.createElement(BugRow, { key: bug._id, bug: bug });
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
							"Description"
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
			null,
			React.createElement(
				"form",
				{ name: "bugAdd" },
				React.createElement("input", { type: "text", name: "owner", placeholder: "Owner" }),
				React.createElement("br", null),
				React.createElement("input", { type: "text", name: "decs", placeholder: "Description" }),
				React.createElement(
					"button",
					{ onClick: this.handleSubmit },
					"Add Bug"
				)
			)
		);
	},
	handleSubmit: function (e) {
		// prevent form from resubmitting upon button click
		e.preventDefault();
		// set form equal to form name
		var form = document.forms.bugAdd;
		// add properties entered to form
		this.props.addBug({ owner: form.owner.value, decs: form.decs.value, status: 'New', priority: 1 });
		// clear the form for next input
		form.owner.value = "";form.decs.value = "";
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
				this.props.bug._id
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
			bugs: []
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
			React.createElement("hr", null),
			React.createElement(BugTable, { bugs: this.state.bugs }),
			React.createElement("hr", null),
			React.createElement(BugAdd, { addBug: this.addBug })
		);
	},
	componentDidMount: function () {
		$.ajax('/api/bugs').done(function (data) {
			this.setState({ bugs: data });
		}.bind(this));
	},
	addBug: function (bug) {
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
			success: function (data) {
				var bug = data;
				var bugsCopy = this.state.bugs.concat(bug);
				this.setState({ bugs: bugsCopy });
			}.bind(this),
			// otherwise show error to user
			error: function (xhr, status, err) {
				console.log("Error adding bug:", err);
			}
		});
	}
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));