var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var BugEdit = React.createClass({
    render: function() {
        return (
            <div>
                Edit bug: {this.props.params.id}
                <br/>
                <form onSubmit={this.submit}>
                    Priority:
                    <select name="priority" value={this.state.priority} onChange={this.onChangePriority}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <br/>
                    Status:
                    <select value={this.state.status} onChange={this.onChangeStatus}>
                        <option>New</option>
                        <option>Open</option>
                        <option>Fixed</option>
                        <option>Closed</option>
                    </select>
                    <br/>
                    Owner: <input type="text" value={this.state.owner} onChange={this.onChangeOwner}/>
                    <br/>
                    Description: <input type="text" value={this.state.decs} onChange={this.onChangeDecs}/>
                    <br/>
                    <button type="submit">Submit</button><Link to="/bugs">Back to bug list</Link>
                </form>
            </div>
        );
    },
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        this.loadData();
    },
    componentDidUpdate: function(prevProps) {
        console.log("BugEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    loadData: function() {
        $.ajax('/api/bugs/' + this.props.params.id) .done(function(bug) {
            this.setState(bug);
        }.bind(this));
    },
    onChangePriority: function(e) {
        this.setState({priority: e.target.value});
    },
    onChangeStatus: function(e) {
        this.setState({status: e.target.value});
    },
    onChangeOwner: function(e) {
        this.setState({owner: e.target.value});
    },
    onChangeDecs: function(e) {
        this.setState({decs: e.target.value});
    },
    submit: function(e) {
        e.preventDefault();
        var bug = {
            status: this.state.status,
            priority: this.state.priority,
            owner: this.state.owner,
            title: this.state.decs
        }

        $.ajax({
            url: '/api/bugs/' + this.props.params.id, type: 'PUT', contentType:'application/json',
            data: JSON.stringify(bug),
            dataType: 'json',
            success: function(bug) {
                this.setState(bug);
            }.bind(this),
        });
    }
});

module.exports = BugEdit;