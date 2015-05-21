/**
 * Created by liusifei on 15/5/14.
 */
//var React = require('react');

var login = React.createClass({displayName: "login",
    'getInitialState': function () {
        return {
            'userName': '',
            'passWord': ''
        }
    },

    'render': function () {
        return (
            React.createElement("div", null, 
                React.createElement("div", null, 
                    React.createElement("span", null, "账号:"), 
                    React.createElement("input", {type: "text", value: this.state.userName})
                ), 
                React.createElement("div", null, 
                    React.createElement("span", null, "密码:"), 
                    React.createElement("input", {type: "password", valu: this.state.passWord})
                ), 
                React.createElement("div", null, 
                    React.createElement("button", {type: "button", onClick: this.handleClick_}, "登录")
                )
            )
        );
    },

    'handleClick_': function () {
        alert("测试一下")
    }
});

React.render(React.createElement(login), document.getElementById('login'));