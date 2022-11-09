"use strict";

const e = React.createElement;

const defaultPriority = "time";

const roles = [
  {
    name: "Startup Application security engineer",
    path: "Technical",
    years_learning: 10,
    years_in_role: 3,
    risk: 7,
    fun: 7,
    life: 5,
  },

  {
    name: "Penetration tester for a big firm",
    path: "Technical",
    years_learning: 10,
    years_in_role: 10,
    risk: 3,
    fun: 7,
    life: 7,
  },

  {
    name: "Top-tier incident responder",
    path: "Technical",
    years_learning: 10,
    years_in_role: 10,
    risk: 3,
    fun: 6,
    life: 5,
  },

  {
    path: "Enterpreneur",
    name: "Founder of a cybersecurity product startup",
    years_learning: 5,
    years_in_role: 5,
    risk: 9,
    fun: 6,
    life: 3,
  },

  {
    name: "Bug bounty researcher",
    path: "Technical",
    years_learning: 5,
    years_in_role: 5,
    risk: 9,
    fun: 8,
    life: 8,
  },

  {
    name: "Corporate CISO",
    path: "Consultancy",
    years_learning: 10,
    years_in_role: 10,
    risk: 5,
    fun: 5,
    life: 6,
  },

  {
    name: "Self-employed security consultant",
    path: "Consultancy",
    years_learning: 10,
    years_in_role: 5,
    risk: 7,
    fun: 5,
    life: 5,
  },

  {
    name: "Security partner at a Big-4",
    path: "Consultancy",
    years_learning: 20,
    years_in_role: 3,
    risk: 8,
    fun: 3,
    life: 2,
  },

];

class RoleMatrix extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roles: this.orderRoles(roles, defaultPriority) };
  }

  orderRoles(roles, priority) {
    var compareFunction = function (a, b) {
      return (
        a.years_learning +
        a.years_in_role -
        (b.years_learning + b.years_in_role)
      );
    };

    switch (priority) {
      case "derisk":
        compareFunction = function (a, b) {
          return a.risk - b.risk;
        };
        break;

      case "fun":
        compareFunction = function (a, b) {
          return b.fun - a.fun;
        };
        break;

      case "life":
        compareFunction = function (a, b) {
          return b.life - a.life;
        };
        break;
    }

    return roles.sort(compareFunction);
  }

  setRoles(priority) {
    this.setState({ roles: this.orderRoles(this.state.roles, priority) });
  }

  render() {
    return (
      <div>
        <Filter setRoles={this.setRoles.bind(this)}>
          <Roles roles={this.state.roles} defaultPriority={defaultPriority} />
        </Filter>
      </div>
    );
  }
}

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultPriority };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.setRoles(event.target.value);
  }

  render() {
    return (
      <div>
        <div>
          <select onChange={this.handleChange}>
            <option value="time">Shortest time</option>
            <option value="derisk">Less risk</option>
            <option value="fun">More fun</option>
            <option value="life">More life</option>
          </select>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

class Roles extends React.Component {

  render() {
    let entries = [];

    if (this.props.roles) {
      entries = this.props.roles.map(function (role, idx) {

        let a = new RegExp(/\s+/gi);
        let roleLink = role.name.toLowerCase().replace(a, '-')

        role.name.replace()

        return (
          <tr key={idx}>
            <td><a href={`#${roleLink}`}>{role.name}</a></td>
            <td>{role.path}</td>
            <td>{role.years_learning} years</td>
            <td>{role.years_in_role} years</td>
            <td>{role.risk}</td>
            <td>{role.fun}</td>
            <td>{role.life}</td>
          </tr>
        );
      });
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Path</th>
            <th>How long to acquire skills needed?</th>
            <th>How quick to make $1M once you have skills?</th>
            <th>Risk of failure</th>
            <th>Fun</th>
            <th>Life</th>
          </tr>
        </thead>
        <tbody>{entries}</tbody>
      </table>
    );
  }
}

const domContainer = document.querySelector("#matrix");
const root = ReactDOM.createRoot(domContainer);
root.render(<RoleMatrix />);
