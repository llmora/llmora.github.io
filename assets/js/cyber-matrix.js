"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var defaultPriority = "time";

var roles = [{
  name: "Startup Application security engineer",
  path: "Technical",
  years_learning: 10,
  years_in_role: 3,
  risk: 7,
  fun: 7,
  life: 5
}, {
  name: "Penetration tester for a big firm",
  path: "Technical",
  years_learning: 10,
  years_in_role: 10,
  risk: 3,
  fun: 7,
  life: 7
}, {
  name: "Top-tier incident responder",
  path: "Technical",
  years_learning: 10,
  years_in_role: 10,
  risk: 3,
  fun: 6,
  life: 5
}, {
  path: "Enterpreneur",
  name: "Founder of a cybersecurity product startup",
  years_learning: 5,
  years_in_role: 5,
  risk: 9,
  fun: 6,
  life: 3
}, {
  name: "Bug bounty researcher",
  path: "Technical",
  years_learning: 5,
  years_in_role: 5,
  risk: 9,
  fun: 8,
  life: 8
}, {
  name: "Corporate CISO",
  path: "Consultancy",
  years_learning: 10,
  years_in_role: 10,
  risk: 5,
  fun: 5,
  life: 6
}, {
  name: "Self-employed security consultant",
  path: "Consultancy",
  years_learning: 10,
  years_in_role: 5,
  risk: 7,
  fun: 5,
  life: 5
}, {
  name: "Security partner at a Big-4",
  path: "Consultancy",
  years_learning: 20,
  years_in_role: 3,
  risk: 8,
  fun: 3,
  life: 2
}];

var RoleMatrix = function (_React$Component) {
  _inherits(RoleMatrix, _React$Component);

  function RoleMatrix(props) {
    _classCallCheck(this, RoleMatrix);

    var _this = _possibleConstructorReturn(this, (RoleMatrix.__proto__ || Object.getPrototypeOf(RoleMatrix)).call(this, props));

    _this.state = { roles: _this.orderRoles(roles, defaultPriority) };
    return _this;
  }

  _createClass(RoleMatrix, [{
    key: "orderRoles",
    value: function orderRoles(roles, priority) {
      var compareFunction = function compareFunction(a, b) {
        return a.years_learning + a.years_in_role - (b.years_learning + b.years_in_role);
      };

      switch (priority) {
        case "derisk":
          compareFunction = function compareFunction(a, b) {
            return a.risk - b.risk;
          };
          break;

        case "fun":
          compareFunction = function compareFunction(a, b) {
            return b.fun - a.fun;
          };
          break;

        case "life":
          compareFunction = function compareFunction(a, b) {
            return b.life - a.life;
          };
          break;
      }

      return roles.sort(compareFunction);
    }
  }, {
    key: "setRoles",
    value: function setRoles(priority) {
      this.setState({ roles: this.orderRoles(this.state.roles, priority) });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          Filter,
          { setRoles: this.setRoles.bind(this) },
          React.createElement(Roles, { roles: this.state.roles, defaultPriority: defaultPriority })
        )
      );
    }
  }]);

  return RoleMatrix;
}(React.Component);

var Filter = function (_React$Component2) {
  _inherits(Filter, _React$Component2);

  function Filter(props) {
    _classCallCheck(this, Filter);

    var _this2 = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

    _this2.state = { value: _this2.props.defaultPriority };

    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(Filter, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
      this.props.setRoles(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          null,
          React.createElement(
            "select",
            { onChange: this.handleChange },
            React.createElement(
              "option",
              { value: "time" },
              "Shortest time"
            ),
            React.createElement(
              "option",
              { value: "derisk" },
              "Less risk"
            ),
            React.createElement(
              "option",
              { value: "fun" },
              "More fun"
            ),
            React.createElement(
              "option",
              { value: "life" },
              "More life"
            )
          )
        ),
        React.createElement(
          "div",
          null,
          this.props.children
        )
      );
    }
  }]);

  return Filter;
}(React.Component);

var Roles = function (_React$Component3) {
  _inherits(Roles, _React$Component3);

  function Roles() {
    _classCallCheck(this, Roles);

    return _possibleConstructorReturn(this, (Roles.__proto__ || Object.getPrototypeOf(Roles)).apply(this, arguments));
  }

  _createClass(Roles, [{
    key: "render",
    value: function render() {
      var entries = [];

      if (this.props.roles) {
        entries = this.props.roles.map(function (role, idx) {

          var a = new RegExp(/\s+/gi);
          var roleLink = role.name.toLowerCase().replace(a, '-');

          role.name.replace();

          return React.createElement(
            "tr",
            { key: idx },
            React.createElement(
              "td",
              null,
              React.createElement(
                "a",
                { href: "#" + roleLink },
                role.name
              )
            ),
            React.createElement(
              "td",
              null,
              role.path
            ),
            React.createElement(
              "td",
              null,
              role.years_learning,
              " years"
            ),
            React.createElement(
              "td",
              null,
              role.years_in_role,
              " years"
            ),
            React.createElement(
              "td",
              null,
              role.risk
            ),
            React.createElement(
              "td",
              null,
              role.fun
            ),
            React.createElement(
              "td",
              null,
              role.life
            )
          );
        });
      }

      return React.createElement(
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
              "Role"
            ),
            React.createElement(
              "th",
              null,
              "Path"
            ),
            React.createElement(
              "th",
              null,
              "How long to acquire skills needed?"
            ),
            React.createElement(
              "th",
              null,
              "How quick to make $1M once you have skills?"
            ),
            React.createElement(
              "th",
              null,
              "Risk of failure"
            ),
            React.createElement(
              "th",
              null,
              "Fun"
            ),
            React.createElement(
              "th",
              null,
              "Life"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          entries
        )
      );
    }
  }]);

  return Roles;
}(React.Component);

var domContainer = document.querySelector("#matrix");
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(RoleMatrix, null));