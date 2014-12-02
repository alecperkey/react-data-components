var React = require('react/addons');
var cx = React.addons.classSet;

/**
 * Used to cancel events.
 */
var preventDefault = function(ev)  {return ev.preventDefault();};

var ListButton = React.createClass({displayName: 'ListButton',

  render:function() {
    return (
      React.createElement("li", {className: this.props.className}, 
        React.createElement("a", {href: "#", onClick: this.props.event}, this.props.children)
      )
    );
  }

});

/**
 * Pagination component.
 */
var Pagination = React.createClass({displayName: 'Pagination',

  mixins: [ React.addons.PureRenderMixin ],

  propTypes: {
    /**
     * Event to trigger. Receives the page number.
     */
    onChangePage: React.PropTypes.func.isRequired,

    /**
     * Total number of pages.
     */
    totalPages: React.PropTypes.number.isRequired,

    /**
     * Current page being displayed.
     */
    currentPage: React.PropTypes.number.isRequired,

    /**
     * The number of pages to show. 5 by default.
     */
    showPages: React.PropTypes.number
  },

  getDefaultProps:function() {
    return {
      showPages: 5
    };
  },

  onChangePage:function(pageNumber, event) {
    event.preventDefault();
    this.props.onChangePage(pageNumber);
  },

  render:function() {
    var $__0=    this.props,totalPages=$__0.totalPages,showPages=$__0.showPages,currentPage=$__0.currentPage;

    if (totalPages === 0) {
      return null;
    }

    var diff = Math.floor(showPages / 2),
        start = currentPage - diff,
        end = currentPage + diff + 1;

    // Edge cases
    if (totalPages < showPages) {
      start = 0;
      end = totalPages;
    } else if (start <= 0) {
      start = 0;
      end = showPages;
    } else if (end >= totalPages) {
      start = totalPages - showPages;
      end = totalPages;
    }

    var buttons = [], btnClass, btnEvent;
    for (var i = start; i < end; i++) {
      // If the button is for the current page then disable the event.
      if (currentPage === i) {
        btnClass = 'active';
        btnEvent = preventDefault;
      } else {
        btnClass = null;
        btnEvent = this.onChangePage.bind(this, i);
      }
      buttons.push(
        React.createElement(ListButton, {
          key: i, 
          className: btnClass, 
          event: btnEvent}, 
          i + 1
        )
      );
    }

    // First and Prev button handlers and class
    var isFirst = currentPage === 0;
    var firstHandler = isFirst ? preventDefault : this.onChangePage.bind(this, 0);
    var firstClass = cx({
      'first': true,
      'disabled': isFirst
    });
    var prevHandler = isFirst ? preventDefault : this.onChangePage.bind(this, currentPage - 1);
    var prevClass = cx({
      'prev': true,
      'disabled': isFirst
    });

    // Next and Last button handlers and class
    var isLast = currentPage === (totalPages - 1);
    var nextHandler = isLast ? preventDefault : this.onChangePage.bind(this, currentPage + 1);
    var nextClass = cx({
      'next': true,
      'disabled': isLast
    });
    var lastHandler = isLast ? preventDefault : this.onChangePage.bind(this, totalPages - 1);
    var lastClass = cx({
      'last': true,
      'disabled': isLast
    });

    return (
      React.createElement("ul", {className: this.props.className}, 
        React.createElement(ListButton, {
          className: firstClass, 
          event: firstHandler}
        ), 
        React.createElement(ListButton, {
          className: prevClass, 
          event: prevHandler}
        ), 
        buttons, 
        React.createElement(ListButton, {
          className: nextClass, 
          event: nextHandler}
        ), 
        React.createElement(ListButton, {
          className: lastClass, 
          event: lastHandler}
        )
      )
    );
  }
});

module.exports = Pagination;
