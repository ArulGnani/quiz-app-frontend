(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{106:function(e,t,n){e.exports=n(203)},113:function(e,t,n){},120:function(e,t){},122:function(e,t){},154:function(e,t){},155:function(e,t){},197:function(e,t,n){},198:function(e,t,n){},199:function(e,t,n){},200:function(e,t,n){},201:function(e,t,n){},202:function(e,t,n){},203:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(103),s=n.n(i),o=n(24),c=n(4),u=n(20),m=n(16),l=n.n(m),p=n(3),f=function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())},h=function(e){var t=e.email,n=e.quizName,a=e.teamName,r=f(t);return""===t||""===n||""===a?"all fields are required!...":t.length<5||!1===r?"enter an valid email!...":n.lengt<3?"quizName should be min 5 char":!(a.length<5)||"teamName should be min 5 char"},b=n(8),d=n.n(b),g=(n(113),function(){var e=Object(a.useState)(""),t=Object(p.a)(e,2),n=t[0],i=t[1],s=Object(a.useState)(""),o=Object(p.a)(s,2),m=o[0],f=o[1],b=Object(a.useState)(""),g=Object(p.a)(b,2),O=g[0],j=g[1],v=Object(a.useState)(!1),y=Object(p.a)(v,2),E=y[0],S=y[1],w=Object(a.useState)(""),q=Object(p.a)(w,2),N=q[0],k=q[1],z=Object(a.useState)(!1),A=Object(p.a)(z,2),I=A[0],C=A[1],T=function(){var e;return l.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return C(!0),e={email:n,teamName:O,quizName:m},t.next=4,l.a.awrap(fetch("https://quiz-app-v1.herokuapp.com/api/client/login",{method:"POST",headers:{Accept:"application/json","Access-Control-Allow-Origin":!0,"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(t){C(!1);var n=t.token,a=t.error;a&&k(a),n&&(x(n,e),S(!0))})).catch((function(e){C(!1),d()("something went wrong!..","try again...","error")})));case 4:case"end":return t.stop()}}))},x=function(e,t){var n=sessionStorage.hasOwnProperty("state"),a=sessionStorage.hasOwnProperty("key");n&&sessionStorage.removeItem("state"),a&&sessionStorage.removeItem("key"),sessionStorage.setItem("state",JSON.stringify(t)),sessionStorage.setItem("key",JSON.stringify(e))};return E?r.a.createElement(c.a,{to:"/start-quiz"}):r.a.createElement("main",{id:"login-main"},r.a.createElement("form",{id:"login-form",className:I?"fade-bg":"",method:"post",onChange:function(){return k("")}},N?r.a.createElement("span",{id:"err"},N):I?r.a.createElement("span",{className:"loading"}):"",r.a.createElement("input",{type:"text",placeholder:"enter your email",value:n,onChange:function(e){return i(e.target.value)},name:"email",className:"login-input"}),r.a.createElement("input",{type:"text",placeholder:"enter your teamname",value:O,onChange:function(e){return j(e.target.value)},name:"teamName",className:"login-input"}),r.a.createElement("input",{type:"text",placeholder:"enter your quiz name",value:m,onChange:function(e){return f(e.target.value)},name:"quizName",className:"login-input"}),r.a.createElement("button",Object(u.a)({onClick:function(e){e.preventDefault();var t=h({email:n,quizName:m,teamName:O});!0!==t&&k(t),!0===t&&T()},className:"reg-submit-btn"},"className","login-btn"),"register")))}),O=n(25),j=(n(105),n(197),function(){var e=Object(a.useState)(!1),t=Object(p.a)(e,2),n=t[0],i=t[1];return n?r.a.createElement(c.a,{to:"/"}):r.a.createElement("main",{id:"err-page"},r.a.createElement("h1",{id:"err-msg"}," your not authericed... "),r.a.createElement("button",{onClick:function(){return i(!0)},id:"btn"},"home"))}),v=(n(198),function(){var e=Object(a.useState)(!1),t=Object(p.a)(e,2),n=t[0],i=t[1],s=Object(a.useState)(""),o=Object(p.a)(s,2),u=o[0],m=o[1],f=Object(a.useState)(""),h=Object(p.a)(f,2),b=h[0],g=h[1],v=Object(a.useState)(!1),y=Object(p.a)(v,2),E=y[0],S=y[1],w=Object(a.useState)(!1),q=Object(p.a)(w,2),N=q[0],k=q[1];Object(a.useEffect)((function(){var e=JSON.parse(sessionStorage.getItem("state")),t="key"in sessionStorage;e&&t&&(i(!0),m(e.quizName),g(e.teamName),d()("your registred successfully!..","proceed by pressing start quiz button...","info"))}),[]);var z=function(e){return l.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.awrap(fetch("https://quiz-app-v1.herokuapp.com/api/client/get-quiz-questions",{method:"GET",headers:{Accept:"application/json","Access-Control-Allow-Origin":!0,"Content-Type":"application/json","auth-key":e}}).then((function(e){return e.json()})).then((function(e){S(!1),e.err&&d()("something went wrong!","reload this page and try again...","error"),e.err||sessionStorage.setItem("questions",JSON.stringify(Object(O.a)(e)))})).catch((function(e){e&&(S(!1),d()("something went wrong!","try agin...","error"))})));case 2:case"end":return t.stop()}}))};return n?N?r.a.createElement(c.a,{to:"/quiz"}):r.a.createElement("main",{id:"start-main",className:E?"fade-bg":""},r.a.createElement("section",{id:"box"},E?r.a.createElement("span",{className:"loading"}):"",r.a.createElement("h2",{className:"start-header"},"quiz-name : ",r.a.createElement("b",null," ",u," ")),r.a.createElement("h2",{className:"start-header"},"team-name : ",r.a.createElement("b",null," ",b," ")),r.a.createElement("button",{onClick:function(){var e;return l.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e=JSON.parse(sessionStorage.getItem("key")))){t.next=5;break}return S(!0),t.next=5,l.a.awrap(fetch("https://quiz-app-v1.herokuapp.com/api/client/start-quiz",{method:"GET",headers:{Accept:"application/json","Access-Control-Allow-Origin":!0,"Content-Type":"application/json","auth-key":e}}).then((function(e){return e.json()})).then((function(t){var n,a;return l.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(n=t.status,a=t.time,"-"===n&&d()("pls wait quiz is not started...."),"finished"===n&&d()("quiz finished!..."),"started"!==n){r.next=9;break}return sessionStorage.setItem("timer",a),r.next=7,l.a.awrap(z(e));case 7:k(!0),d()("quiz has started!....");case 9:case"end":return r.stop()}}))})).catch((function(e){e&&(S(!1),d()("something went wrong!","try agin...","error"))})));case 5:case"end":return t.stop()}}))},id:"start-btn"},"start quiz"))):r.a.createElement(j,null)}),y=n(63),E=n(38),S=n(39),w=n(41),q=n(40),N=n(42),k=(n(199),function(e){function t(e){var n;return Object(E.a)(this,t),(n=Object(w.a)(this,Object(q.a)(t).call(this,e))).startTimer=function(){var e=setInterval((function(){if(0!==n.state.time){n.setState({time:n.state.time-1});var e=Math.floor(n.state.time/60),t=n.state.time-60*e;e=e<10?"0"+e:e,t=t<10?"0"+t:t,n.setState({timer:"".concat(e,":").concat(t)})}else n.stopTimer(),d()("your out of time!..."),n.props.submit()}),1e3);n.props.setIntervaId(e)},n.state={time:0,timer:"00:00"},n}return Object(N.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){this.props.timer&&this.setState({time:this.props.timer}),this.startTimer()}},{key:"stopTimer",value:function(){this.props.stopTimer(this.props.intervalId)}},{key:"render",value:function(){return r.a.createElement("div",{id:"timer-comp"},r.a.createElement("h2",{id:"timer"},this.state.timer))}}]),t}(a.Component)),z=(n(200),function(e){function t(e){var n;return Object(E.a)(this,t),(n=Object(w.a)(this,Object(q.a)(t).call(this,e))).state={questions:[]},n}return Object(N.a)(t,e),Object(S.a)(t,[{key:"componentDidMount",value:function(){this.props.questions&&(this.setState({questions:Object(O.a)(this.props.questions)}),this.mapAnswersToQuestion(this.props.questions))}},{key:"mapAnswersToQuestion",value:function(e){var t=this;0!==e.length&&e.forEach((function(e){t.props.answers[e._id]||t.props.updateAnswer(Object(u.a)({},e._id,e.question.answer))}))}},{key:"updateYoutAnswer",value:function(e){var t=e.target.id,n=e.target.getAttribute("option");this.props.updateYourAnswers(Object(u.a)({},t,n))}},{key:"render",value:function(){var e=this;return r.a.createElement("section",{id:"question-comp"},this.state.questions.map((function(t,n){var a=t.question,i=t._id;return r.a.createElement("div",{key:i,id:"container"},r.a.createElement("h2",{id:"question"},n+1,". ",a.ques),r.a.createElement("form",{id:"options"},a.options.map((function(t){return r.a.createElement("div",{key:t.id,id:"option"},r.a.createElement("input",{key:t.id,type:"radio",name:"option",id:i,option:t.option,onClick:function(t){return e.updateYoutAnswer(t)}}),r.a.createElement("span",{id:"option-answer"},t.option," . ",t.optionAns),r.a.createElement("br",null))}))))})))}}]),t}(a.Component)),A=(n(201),function(e){var t=Object(a.useState)(0),n=Object(p.a)(t,2),i=n[0],s=n[1],o=Object(a.useState)(!1),u=Object(p.a)(o,2),m=u[0],l=u[1];Object(a.useEffect)((function(){e.submit&&f()}),[e.submit]),Object(a.useEffect)((function(){e.noQuestions&&s(e.noQuestions)}),[e.noQuestions]);var f=function(){e.stopTimer(e.intervalId),e.setLoading(),h()},h=function(){var t=0;for(var n in e.yourAnswers)e.answers[n]===e.yourAnswers[n]&&(t+=1);b(t)},b=function(e){var t=Math.floor(i/2);g(e,e>=t)},g=function(t,n){var a=JSON.parse(sessionStorage.getItem("key")),r=JSON.stringify({points:t,certificate:n});a&&fetch("https://quiz-app-v1.herokuapp.com/api/client/send-result",{method:"POST",headers:{Accept:"application/json","Access-Control-Allow-Origin":!0,"Content-Type":"application/json","auth-key":a},body:r}).then((function(e){return e.json()})).then((function(t){e.setLoading(),O(),t.error?d()("something went wrong!..","pls contact incharge","error"):d()("submitted your answers successfully","check your email for certification...","success")})).catch((function(t){e.setLoading(),O(),d()("something went wrong!..","pls contact incharge","error")}))},O=function(){sessionStorage.clear(),l(!0)};return m?r.a.createElement(c.a,{to:"/"}):r.a.createElement("button",{onClick:f,id:"submit"},"submit")}),I=(n(202),function(){var e=Object(a.useState)(!1),t=Object(p.a)(e,2),n=t[0],i=t[1],s=Object(a.useState)([]),o=Object(p.a)(s,2),c=o[0],u=o[1],m=Object(a.useState)(0),l=Object(p.a)(m,2),f=l[0],h=l[1],b=Object(a.useState)({}),d=Object(p.a)(b,2),g=d[0],v=d[1],E=Object(a.useState)({}),S=Object(p.a)(E,2),w=S[0],q=S[1],N=Object(a.useState)(""),I=Object(p.a)(N,2),C=I[0],T=I[1],x=Object(a.useState)(!1),J=Object(p.a)(x,2),L=J[0],Q=J[1],M=Object(a.useState)(""),P=Object(p.a)(M,2),Y=P[0],D=P[1],_=Object(a.useState)(!1),G=Object(p.a)(_,2),Z=G[0],B=G[1];Object(a.useEffect)((function(){var e=JSON.parse(sessionStorage.getItem("questions")),t=JSON.parse(sessionStorage.getItem("timer")),n="key"in sessionStorage,a=JSON.parse(sessionStorage.getItem("state"));e&&t&&n&&a&&(i(!0),u(Object(O.a)(e)),h(t),D(a.quizName))}),[]);var $=function(e){return clearInterval(e)};return n?r.a.createElement("main",{id:"quiz",className:Z?"fade-bg":""},Z?r.a.createElement("span",{className:"loading"}):"",r.a.createElement("nav",{id:"quiz-header"},r.a.createElement(k,{timer:f,stopTimer:$,intervalId:C,setIntervaId:function(e){return T(e)},submit:function(){return Q(!0)}}),r.a.createElement("h2",{id:"quiz-name"},Y),r.a.createElement(A,{answers:g,yourAnswers:w,submit:L,intervalId:C,stopTimer:$,noQuestions:c.length,setLoading:function(){return B(!0)},resetLoading:function(){return B(!1)}})),r.a.createElement(z,{questions:c,answers:g,yourAnswers:w,updateAnswer:function(e){return v((function(t){return Object(y.a)({},t,{},e)}))},updateYourAnswers:function(e){return q((function(t){return Object(y.a)({},t,{},e)}))}})):r.a.createElement(j,null)}),C=function(){return r.a.createElement(o.a,null,r.a.createElement(c.b,{exact:!0,path:"/"},r.a.createElement(g,null)),r.a.createElement(c.b,{path:"/start-quiz"},r.a.createElement(v,null)),r.a.createElement(c.b,{path:"/quiz"},r.a.createElement(I,null)))};s.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[106,1,2]]]);
//# sourceMappingURL=main.d906d60a.chunk.js.map