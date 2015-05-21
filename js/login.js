/**
 * Created by liusifei on 15/5/14.
 */
var React = require('react');

var login = React.createClass({
    'getInitialState': function () {
        return {
            'userName': '',
            'passWord': ''
        }
    },

    'render': function () {
        return (
            <div>
                <div>
                    <span>账号:</span>
                    <input type="text" value={this.state.userName}/>
                </div>
                <div>
                    <span>密码:</span>
                    <input type="password" valu={this.state.passWord}/>
                </div>
                <div>
                    <button type='button' onClick={this.handleClick_}>登录</button>
                </div>
            </div>
        );
    },

    'handleClick_': function () {
        alert("测试一下")
    }
});

React.render(React.createElement(login), document.getElementById('login'));