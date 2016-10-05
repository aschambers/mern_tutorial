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
					React.createElement(BugRow, { id: 1, priority: "1", status: "Open", owner: "Alex", decs: "App crashes when opening" }),
					React.createElement(BugRow, { id: 2, priority: "2", status: "New", owner: "Brian", decs: "Pages have weird border" })
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
				this.props.id
			),
			React.createElement(
				"td",
				null,
				this.props.priority
			),
			React.createElement(
				"td",
				null,
				this.props.status
			),
			React.createElement(
				"td",
				null,
				this.props.owner
			),
			React.createElement(
				"td",
				null,
				this.props.decs
			)
		);
	}
});

var BugList = React.createClass({
	displayName: "BugList",

	render: function () {
		return React.createElement(
			"div",
			{ className: "BugList" },
			React.createElement(
				"h1",
				null,
				"List of all bugs here:"
			),
			React.createElement(BugFilter, null),
			React.createElement(BugTable, null),
			React.createElement("hr", null),
			React.createElement(BugAdd, null)
		);
	}
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));