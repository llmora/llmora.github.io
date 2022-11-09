"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var defaultPriority = "time";

var paths = [{
  name: "Technical",
  description: ["If you like to get your hands dirty, build and break things and are a techie at heart this is your path. Good honest work, you get out what you put in and with a need of minimal interaction with others, including no management work.", "To walk this path you must excel technically in your area of interest, and that requires a serious investment in learning time."]
}, {
  name: "Consultancy",
  description: ["You have come into cyber maybe by having some IT knowledge, but what really makes you happy are audits, consultancy, governance and best practices. You take a higher-level approach than those people getting their hands dirty, and provide strategic improvements to the organisation you work with. You have likely accumulated certifications over the years and are really good at speaking with people and managing stakeholders."]
}, {
  name: "Enterpreneur",
  description: ["You have spent a few years working for somebody else, using your skills to do something that, while interesting, has not really felt satisfying. Probably the company you are working for is not aligned with what you really believe in, what you really want to devote yourself to - your purpose.", "Walking the enterpreneur path takes a leap of faith, stop working for others and focus on what really drives you."]
}];

var roles = [{
  name: "Startup Application security engineer",
  path: "Technical",
  years_learning: 10,
  years_in_role: 3,
  risk: 7,
  fun: 7,
  life: 5,
  description: ["If you are into securing applications, join a startup pre-IPO that values security as one of their unique selling points, work hard for little money and get equity with the hope that the startup will succeed; the big risk is that the time you spend may go down the drain if the startup does not make it, so research thoroughly before committing years of your life to a potential failure."],
  skills: ["Development background", "Develop software and contribute to open source", "Amazing understanding of how applications work", "Expertise on the business domain the start-up is targeting"]
}, {
  name: "Penetration tester for a big firm",
  path: "Technical",
  years_learning: 10,
  years_in_role: 10,
  risk: 3,
  fun: 7,
  life: 7,
  description: ["Offensive security is your middle name - maybe you have some red team experience or have spent more hours than you care to admit at HackTheBox. If you have a really good understanding of security testing, can land a role in a big security testing firm and are willing to put some years towards success, this is one of the paths with lower risk and nearly guaranteed success."],
  skills: ["Development background", "Develop software and contribute to open source", "Amazing understanding of how applications work", "Always up to date with latest developments"]
}, {
  name: "Top-tier incident responder",
  path: "Technical",
  years_learning: 10,
  years_in_role: 10,
  risk: 3,
  fun: 6,
  life: 5,
  description: ["People under distress are usually under the 'Money is not an issue' frame of mind, that is why incident response companies are able to pay big bucks for consultants with forensics and incident response skills. The customer stress transfers on to the job, so be ready for long nights and ungodly working hours.", "Try to find a company that specialises in incident response and that tends to work with big customers, maybe a boutique consultancy firm that works for top-listed companies, who are willing to pay the extra money to keep the incident as confidential as possible. Another low risk path, for those that have the required skills."],
  skills: ["Forensic and experience handling critical incidents", "Develop software and contribute to open source", "Amazing understanding of how IT systems work", "Always up to date with latest developments"]
}, {
  path: "Enterpreneur",
  name: "Founder of a cybersecurity product startup",
  years_learning: 5,
  years_in_role: 5,
  risk: 9,
  fun: 6,
  life: 3,
  description: ["Bringing a product to life that solves a problem you really care about, that will make the world a better place and that only you are capable of delivering. What could be more purposeful? It will take a few years to find the right product, convince people to share your views and -with a bit of luck and no shortage of struggles- you will come out successful on the other side. The majority of startups fail, so you are likely to spend quite a few years repurposing yourself, but with every failure there will be new learnings that get you closer to success. Being a founder is not for the faint of heart and requires a long-term investment, but it is certainly one of the more satisfying and lucrative ways to make it in cyber."],
  skills: ["Amazing understanding of the problem area you solve", "Amazing selling ability", "Networking", "Always up to date with latest developments", "Development knowledge", "Ability to attract investment and talent"]

}, {
  name: "Bug bounty researcher",
  path: "Technical",
  years_learning: 5,
  years_in_role: 5,
  risk: 9,
  fun: 8,
  life: 8,
  description: ["The ultimate dream for a techie: work on your own, at your own pace, breaking into products and sites for companies that are willing to pay money for your work. The downside is that there is no guaranteed outcome for the work: find nothing and you will get no income.", "You can hedge against this by finding a vulnerability niche that generates a bit of cash and automate across various bug bounty customers. On the other side you could specialise in a big platform (iOS, Android, smart contracts...) and try to target a big payout."],
  skills: ["Development background", "Amazing understanding of how applications work", "Structured approach to work", "Can pivot to pentester if it fails"]
}, {
  name: "Corporate CISO",
  path: "Consultancy",
  years_learning: 10,
  years_in_role: 10,
  risk: 5,
  fun: 5,
  life: 6,
  description: ["Consultants see a lot of different challenges due to the variety of customers but seldomly stay long enough to see the implementation of their findings through. If you are tired of changing so much, a CISO career may give you that stability and the ability to change the security culture of the organisation from the ground up.", "Find an organisation that is interesting and that keeps throwing challenges at you, or you would become bored before you know it. Boredom is probably the main risk you will face in this role."],
  skills: ["Good broad knowledge of security", "Good selling and stakeholder management ability", "Always up to date with latest developments", "Can pivot to consultant if it fails", "Good technical knowledge a plus"]

}, {
  name: "Self-employed security consultant",
  path: "Consultancy",
  years_learning: 10,
  years_in_role: 5,
  risk: 7,
  fun: 5,
  life: 5,
  description: ["Consultants get exposed to a large number of customers: meeting the customer, doing their work, delivering reports and moving on. It allows you to get a big exposure to different challenges however you may end up doing work on a specific niche that limits your ability to grow (and enjoy) if your employer keeps you shifting from projects to project without the ability to develop your skills.", "A great way to keep the job satisfaction is to establish yourself as the go-to person to consult for a specific area of knowledge, you work for yourself and get to focus your efforts on becoming the best person in that area. On the downside as a self-employed consultant you need to be constantly selling your services, being on the lookout for the next project even when you are still engaged with your current project - failing to do so risks your income drying up quickly."],
  skills: ["Amazing understanding of the area you consult on", "Amazing selling ability", "Speaking at Conferences, Networking, Blog", "Always up to date with latest developments", "Can pivot to CISO role if it fails"]
}, {
  name: "Security partner at a Big-4",
  path: "Consultancy",
  years_learning: 20,
  years_in_role: 3,
  risk: 8,
  fun: 3,
  life: 2,
  description: ["The ultimate corporate ladder, if you are willing to work long-long hours just get in on the ground floor of a Big-4 as an associate and live a life of slavery, competition against your colleagues and backstabbing to get to partner level in Cybersecurity. The higher you raise the stronger the competition, as in the Immortals: there can only be one.", "The risk is massive, it is likely you will invest 20+ years and there is no guaranteed outcome, only very few will actually make it - an outcome that will have little to do with cybersecurity and a lot to do with just how god you are at selling.. Imagine throwing 20 years of your life and having to start from scratch afer that. On the other site bonuses could accelerate making this a successful career.", "Just don't do it, pick something else :-)"],
  skills: ["Good understanding of the area you consult on", "Willingness to work long hours", "Amazing selling ability", "Networking", "Management capability", "Can pivot to CISO role if it fails"]
}];

/**** Matrix *****/

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
          var roleLink = role.name.toLowerCase().replace(a, "-");

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

/**** Article *****/

var RoleArticle = function (_React$Component4) {
  _inherits(RoleArticle, _React$Component4);

  function RoleArticle(props) {
    _classCallCheck(this, RoleArticle);

    var _this4 = _possibleConstructorReturn(this, (RoleArticle.__proto__ || Object.getPrototypeOf(RoleArticle)).call(this, props));

    _this4.state = { paths: paths, roles: roles };
    return _this4;
  }

  _createClass(RoleArticle, [{
    key: "render",
    value: function render() {
      var entries = [];

      if (this.state.paths) {
        entries = this.state.paths.map(function (path, idx) {
          var description = "";
          if (path.description) {
            description = path.description.map(function (descriptionParagraph, idx) {
              return React.createElement(
                "p",
                { key: idx },
                descriptionParagraph
              );
            });
          }

          var rolesForPath = roles.filter(function (role) {
            return role.path.toLowerCase() === path.name.toLowerCase();
          });

          return React.createElement(
            "div",
            { key: idx },
            React.createElement(
              "h2",
              null,
              "The ",
              path.name.toLowerCase(),
              " path"
            ),
            React.createElement(
              "div",
              null,
              description
            ),
            React.createElement(RolesForPath, { roles: rolesForPath })
          );
        });
      }

      return React.createElement(
        "div",
        null,
        entries
      );
    }
  }]);

  return RoleArticle;
}(React.Component);

var RolesForPath = function (_React$Component5) {
  _inherits(RolesForPath, _React$Component5);

  function RolesForPath(props) {
    _classCallCheck(this, RolesForPath);

    return _possibleConstructorReturn(this, (RolesForPath.__proto__ || Object.getPrototypeOf(RolesForPath)).call(this, props));
  }

  _createClass(RolesForPath, [{
    key: "render",
    value: function render() {
      var entries = [];

      if (this.props.roles) {
        entries = this.props.roles.map(function (role, idx) {
          return React.createElement(PathRole, { key: idx, role: role });
        });
      }

      return React.createElement(
        "div",
        null,
        entries
      );
    }
  }]);

  return RolesForPath;
}(React.Component);

var PathRole = function (_React$Component6) {
  _inherits(PathRole, _React$Component6);

  function PathRole(props) {
    _classCallCheck(this, PathRole);

    return _possibleConstructorReturn(this, (PathRole.__proto__ || Object.getPrototypeOf(PathRole)).call(this, props));
  }

  _createClass(PathRole, [{
    key: "render",
    value: function render() {
      var role = this.props.role;

      var roleLink = role.name.toLowerCase().replace(new RegExp(/\s+/gi), "-");

      var description = "";

      if (role.description) {
        description = role.description.map(function (descriptionParagraph, idx) {
          return React.createElement(
            "p",
            { markdown: "span", key: idx },
            descriptionParagraph
          );
        });
      }

      var skills = "";

      if (role.skills) {
        skills = role.skills.map(function (skill, idx) {
          return React.createElement(
            "span",
            { key: idx, className: "badge text-bg-primary" },
            skill
          );
        });
      }

      return React.createElement(
        "div",
        { id: "" + roleLink, className: "card mb-3" },
        React.createElement(
          "div",
          { className: "card-header" },
          React.createElement(
            "h5",
            null,
            React.createElement(
              "b",
              null,
              role.name,
              role.risk > 5 && React.createElement(
                "i",
                { className: "icon risk" },
                "RISK_ICON"
              )
            )
          )
        ),
        React.createElement(
          "div",
          { className: "card-body" },
          description,
          React.createElement(
            "div",
            { className: "my-3", style: { display: "flex", justifyContent: "space-between" } },
            skills
          )
        )
      );
    }
  }]);

  return PathRole;
}(React.Component);

var matrixDomContainer = document.querySelector("#matrix");
var matrixRoot = ReactDOM.createRoot(matrixDomContainer);
matrixRoot.render(React.createElement(RoleMatrix, null));

var articleDomContainer = document.querySelector("#article");
var articleRoot = ReactDOM.createRoot(articleDomContainer);
articleRoot.render(React.createElement(RoleArticle, null));