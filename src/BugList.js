var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

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
            <BugFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
            <hr />
            <BugTable bugs={this.state.bugs} />
            <hr />
            <BugAdd addBug={this.addBug} />
            </div>
        )
    },
    componentDidMount: function() {
        this.loadData({});
    },
    loadData: function(filter) {
        $.ajax('/api/bugs', {data: filter}).done(function(data) {
            this.setState({bugs: data});
        }.bind(this));
    },
    changeFilter: function(newFilter) {
      this.props.history.push({search: '?' + $.param(newFilter)});
      this.loadData(newFilter);
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

module.exports = BugList;
