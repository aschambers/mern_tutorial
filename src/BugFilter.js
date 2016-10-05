var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
	render: function() {
		return (
			<div className="BugFilter">
				I filter bugs your code has!
			</div>
		);
	}
});

module.exports = BugFilter;