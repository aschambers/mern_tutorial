var React = require('react');
var ReactDOM = require('react-dom');

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

module.exports = BugAdd;