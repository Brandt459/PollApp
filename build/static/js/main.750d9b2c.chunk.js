(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(1),s=n.n(o),r=n(13),l=n.n(r),i=(n(30),n(31),n(32),n(8)),c=n(2),d=n(9),u=n(10),h=n(4),j=n(12),p=n(11),b=function(e){Object(j.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(d.a)(this,n),(e=t.call(this)).state={username:null,loggedIn:!!localStorage.getItem("token")},e.handleLogout=e.handleLogout.bind(Object(h.a)(e)),e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.state.loggedIn&&this.setState({username:localStorage.getItem("user")})}},{key:"handleLogout",value:function(){localStorage.removeItem("token"),localStorage.removeItem("user"),localStorage.removeItem("userId"),this.setState({loggedIn:!1,username:null}),window.location.reload(!1)}},{key:"render",value:function(){var e=this.state.username;return Object(a.jsxs)("nav",{children:[Object(a.jsx)(i.b,{to:"/",children:"Home"}),e?Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:e}),Object(a.jsx)("li",{onClick:this.handleLogout,children:Object(a.jsx)(i.b,{children:"Log out"})})]}):Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:Object(a.jsx)(i.b,{to:"/register",children:"Register"})}),Object(a.jsx)("li",{children:Object(a.jsx)(i.b,{to:"/login",children:"Log in"})})]})]})}}]),n}(s.a.Component),m=n(17),O=n.p+"static/media/trash.f1497a79.svg",g=function(e){Object(j.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(d.a)(this,n),(e=t.call(this)).state={pollList:null},e.fetchPollList=e.fetchPollList.bind(Object(h.a)(e)),e.updatePoll=e.updatePoll.bind(Object(h.a)(e)),e.pollVote=e.pollVote.bind(Object(h.a)(e)),e.createPoll=e.createPoll.bind(Object(h.a)(e)),e.deletePoll=e.deletePoll.bind(Object(h.a)(e)),e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.fetchPollList()}},{key:"fetchPollList",value:function(){var e=this;fetch("/api/poll-list/").then((function(e){return e.json()})).then((function(t){return e.setState({pollList:t})}))}},{key:"updatePoll",value:function(e){var t=this;e.preventDefault();var n=l.a.findDOMNode(e.target).parentNode.parentNode.getAttribute("id"),a=this.state.pollList[n],o=parseInt(localStorage.getItem("userId"));a[e.target.name]=a[e.target.name]+1,a.votes.push(o),"option1total"===e.target.name?a.option1votes.push(o):a.option2votes.push(o),fetch("/api/update/".concat(a.id,"/"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){var a=Object(m.a)(t.state.pollList);a[n]=e,t.setState({pollList:a})}))}},{key:"pollVote",value:function(e){this.updatePoll(e),e.target.classList.add("active"),l.a.findDOMNode(e.target).parentNode.parentNode.classList.add("voted"),l.a.findDOMNode(e.target).parentNode.querySelectorAll("button").forEach((function(e){return e.disabled=!0}))}},{key:"createPoll",value:function(e){var t=this;e.preventDefault(),fetch("/api/create-poll/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:e.target.querySelector("#form-title").value,option1:e.target.querySelector("#form-option1").value,option2:e.target.querySelector("#form-option2").value,owner:localStorage.getItem("user")})}).then((function(e){return e.json()})).then((function(e){t.setState({pollList:[].concat(Object(m.a)(t.state.pollList),[e])})})),e.target.reset()}},{key:"deletePoll",value:function(e){e.preventDefault();var t=l.a.findDOMNode(e.target).parentNode.getAttribute("id"),n=this.state.pollList[t];fetch("/api/delete-poll/".concat(n.id,"/"),{method:"DELETE"});var a=Object(m.a)(this.state.pollList);a.splice(t,1),this.setState({pollList:a})}},{key:"render",value:function(){var e=this,t=this.state.pollList;try{return Object(a.jsxs)("div",{children:[localStorage.getItem("token")?Object(a.jsxs)("div",{className:"poll-create",children:[Object(a.jsx)("h1",{children:"Create a poll: "}),Object(a.jsxs)("form",{onSubmit:this.createPoll,id:"poll-form",children:[Object(a.jsx)("input",{style:{flex:3},type:"text",id:"form-title",required:!0,placeholder:"Title"}),Object(a.jsx)("input",{style:{flex:3},type:"text",id:"form-option1",required:!0,placeholder:"Option 1"}),Object(a.jsx)("input",{style:{flex:3},type:"text",id:"form-option2",required:!0,placeholder:"Option 2"}),Object(a.jsx)("input",{style:{flex:1},type:"submit",id:"form-submit",placeholder:"Submit"})]})]}):Object(a.jsx)("div",{className:"login-statement",children:Object(a.jsx)("h1",{children:"Log in to vote and create polls"})}),Object(a.jsx)("div",{className:"polls",children:t.map((function(n){var o=parseInt(localStorage.getItem("userId")),s=localStorage.getItem("user");return Object(a.jsxs)("div",{className:"poll ".concat(n.votes.includes(o)?"voted":""," ").concat(n.owner===s?"owned":""),id:t.indexOf(n),children:[Object(a.jsx)("h1",{className:"poll-title",children:n.title}),n.owner===s&&Object(a.jsx)("img",{src:O,alt:"trash",className:"trash-icon",onClick:e.deletePoll}),Object(a.jsxs)("div",{className:"poll-options",children:[Object(a.jsx)("button",{onClick:e.pollVote,name:"option1total",className:"poll-button ".concat(n.option1votes.includes(o)?"active":""),disabled:!localStorage.getItem("token")||n.votes.includes(o),children:n.option1}),Object(a.jsx)("button",{onClick:e.pollVote,name:"option2total",className:"poll-button ".concat(n.option2votes.includes(o)?"active":""),disabled:!localStorage.getItem("token")||n.votes.includes(o),children:n.option2})]}),Object(a.jsxs)("div",{className:"poll-results",children:[Object(a.jsx)("p",{children:"Total votes: "}),Object(a.jsx)("div",{className:"votes-container",children:Object(a.jsxs)("div",{className:"votes",children:[Object(a.jsx)("p",{children:n.option1total}),Object(a.jsx)("p",{children:n.option2total})]})})]})]})}))})]})}catch(n){return Object(a.jsx)("h1",{children:"Loading..."})}}}]),n}(s.a.Component);var f=function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)(b,{}),Object(a.jsx)(g,{})]})},v=n(16),x=n(24),S=function(e){Object(j.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(d.a)(this,n),(e=t.call(this)).state={username:null,password:null,redirect:!1,error:!1},e.handleSubmit=e.handleSubmit.bind(Object(h.a)(e)),e.handleChange=e.handleChange.bind(Object(h.a)(e)),e}return Object(u.a)(n,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),fetch("/api/users/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.state.username,password:this.state.password})}).then((function(e){return e.json()})).then((function(e){e.token?(localStorage.setItem("token",e.token),localStorage.setItem("user",Object(x.a)(e.token).username),fetch("/api/user_id/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:localStorage.getItem("user")})}).then((function(e){return e.json()})).then((function(e){return localStorage.setItem("userId",e)})),t.setState({redirect:!0})):t.setState({error:!0})}))}},{key:"handleChange",value:function(e){e.preventDefault(),this.setState(Object(v.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){return this.state.redirect?Object(a.jsx)(c.a,{to:"/"}):Object(a.jsxs)("div",{children:[Object(a.jsx)(b,{}),Object(a.jsxs)("div",{className:"register-container",children:[Object(a.jsx)("h1",{children:"REGISTER"}),this.state.error&&Object(a.jsx)("h2",{className:"register-error",children:"Username already exists!"}),Object(a.jsx)("div",{className:"form-container",children:Object(a.jsxs)("form",{onSubmit:this.handleSubmit,className:"register-form",children:[Object(a.jsx)("input",{type:"text",name:"username",onChange:this.handleChange,placeholder:"Username"}),Object(a.jsx)("input",{type:"password",name:"password",onChange:this.handleChange,placeholder:"Password"}),Object(a.jsx)("div",{className:"register-form-submit",children:Object(a.jsx)("input",{type:"submit",value:"REGISTER"})})]})})]})]})}}]),n}(s.a.Component),y=function(e){Object(j.a)(n,e);var t=Object(p.a)(n);function n(){var e;return Object(d.a)(this,n),(e=t.call(this)).state={username:null,password:null,loggedin:!1,error:!1},e.handleSubmit=e.handleSubmit.bind(Object(h.a)(e)),e.handleChange=e.handleChange.bind(Object(h.a)(e)),e}return Object(u.a)(n,[{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),fetch("/api/token-auth/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.state.username,password:this.state.password})}).then((function(e){return e.json()})).then((function(e){try{e.user.username&&(localStorage.setItem("token",e.token),localStorage.setItem("user",e.user.username),fetch("/api/user_id/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:localStorage.getItem("user")})}).then((function(e){return e.json()})).then((function(e){localStorage.setItem("userId",e)})),t.setState({loggedin:!0}))}catch(n){t.setState({error:!0})}}))}},{key:"handleChange",value:function(e){e.preventDefault(),this.setState(Object(v.a)({},e.target.name,e.target.value))}},{key:"render",value:function(){return this.state.loggedin?Object(a.jsx)(c.a,{to:"/"}):Object(a.jsxs)("div",{children:[Object(a.jsx)(b,{}),Object(a.jsxs)("div",{className:"register-container",children:[Object(a.jsx)("h1",{children:"LOG IN"}),this.state.error&&Object(a.jsx)("h2",{className:"register-error",children:"Invalid credentials!"}),Object(a.jsx)("div",{className:"form-container",children:Object(a.jsxs)("form",{onSubmit:this.handleSubmit,className:"register-form",children:[Object(a.jsx)("input",{type:"text",name:"username",onChange:this.handleChange,placeholder:"Username"}),Object(a.jsx)("input",{type:"password",name:"password",onChange:this.handleChange,placeholder:"Password"}),Object(a.jsx)("div",{className:"register-form-submit",children:Object(a.jsx)("input",{type:"submit",value:"LOG IN"})})]})})]})]})}}]),n}(s.a.Component),N=!!localStorage.getItem("token");l.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(i.a,{children:Object(a.jsxs)(c.d,{children:[Object(a.jsx)(c.b,{exact:!0,path:"/",component:f}),Object(a.jsx)(c.b,{exact:!0,path:"/register",component:S,children:N&&Object(a.jsx)(c.a,{to:"/"})}),Object(a.jsx)(c.b,{exact:!0,path:"/login",component:y,children:N&&Object(a.jsx)(c.a,{to:"/"})})]})})}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.750d9b2c.chunk.js.map