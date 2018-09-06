import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import PersistentDrawer from './Components/memberlist/menu/menu.js'

const styles = theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

//sort function
var sortBy = (function () {
  var toString = Object.prototype.toString,
    // default parser function
    parse = function (x) { return x; },
    // gets the item to be sorted
    getItem = function (x) {
      var isObject = x != null && typeof x === "object";
      var isProp = isObject && this.prop in x;
      return this.parser(isProp ? x[this.prop] : x);
    };

  /**
   * Sorts an array of elements.
   *
   * @param {Array} array: the collection to sort
   * @param {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby(array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== "[object Object]") cfg = {};
    if (typeof cfg.parser !== "function") cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };

}());
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    const getTokenUrl = 'https://steltixemployees.azurewebsites.net/api/Key/employees';
    $.get(getTokenUrl)
      .then((token) => {
        const newUrl = `https://steltixemployees.table.core.windows.net/Employees${token}`;
        $.ajax({
          type: "GET",
          contentType: "application/json",
          url: newUrl,
          data: { name: 'norm' },
          dataType: "json",
        }).then((response) => {
          const keepResults = [];
          let newResults = response.value;
          for (const key in newResults) {
            if (newResults.hasOwnProperty(key)) {
              const element = newResults[key];
              if (element.locatioCode === 'STELTIX SA') {
                keepResults.push(element)
              }
            }
          }
          var sortedResults = sortBy(keepResults, { prop: "FullName", desc: false, })
          return sortedResults;
        }).then((finalRes) => {
          this.setState({ employees: finalRes })
          console.log(this.state)
        });
      })
  }

  handleClick = () => {
    //Call the parent method selectFlat
    // this.props.selectFlat(this.props.flat);
    $(".MuiButtonBase-root-61").click(function (event) {
      console.log(event);
      // var Employee = event.delegateTarget.children;
      // for (const key in Employee) {
      //   if (Employee.hasOwnProperty(key)) {
      //     const emp = Employee[key];
      //     console.log(typeof emp);
      //   }
      // }
      // console.log(typeof Employee)
     
      // localStorage.setItem("fullName", Employee);
  });
}

  render() {
    const { classes } = this.props;
    return (
     
      <div className={classes.root}>
       <div>
        <PersistentDrawer />
      </div>
      {/* <div className="memberList" onClick={this.handleClick}> */}
      <List >
      <div className="memberList" >
          {this.state.employees.map(value => (
            <ListItem onClick={this.handleClick} className="member" key={value.Mobile} dense button className={classes.listItem}>
              <Avatar alt={value.FullName} src="/static/images/remy.jpg" />
              <ListItemText primary={value.FullName} secondary={value.Position} />


              <ListItemSecondaryAction>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          </div>
        </List>


      </div>
      // </div>
      
    );
  }
}

export default withStyles(styles)(App);
