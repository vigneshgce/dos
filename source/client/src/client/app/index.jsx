import React from 'react';
import {
    render
} from 'react-dom';
import axios from 'axios';
var helpers = require('./utils/helpers');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flag: 1,
            loading:false,
            degree:'',
            ajaxFinished:false,
            validationFail:false
        };
        this.fetchData = this.fetchData.bind(this);
    }
    fetchData(){
    this.setState({loading:true});
    var that=this;
    if (!helpers.isNull(this.refs.person1)&&!helpers.isNull(this.refs.person1)
    &&!helpers.isNull(this.refs.person1.value)&&!helpers.isNull(this.refs.person2.value)) {
      var person1 = this.refs.person1;
      var person1Value = person1.value;
      var person2 = this.refs.person2;
      var person2Value = person2.value;
      this.setState({validationFail:false});
      console.log("Input is " + person2Value+" "+person1Value);
    }else{
    this.setState({validationFail:true,loading:false});
    console.log("got error");
    }
    var url="degree/get?actorurl1="+person1Value+"&actorurl2="+person2Value;
    helpers.getHerokuInfo(url).then(function(res){
    setTimeout(function(){
      var degreeRes= res.data.COUNT;
      try{
        if(parseInt(degreeRes)===0){
          that.setState({validationFail:true});
        }
      }
      catch(e){
      that.setState({validationFail:true});
      }
      that.setState({loading:false,degree:degreeRes,ajaxFinished:true});
    },1000);
      console.log("got res hero ",res);
    });
    //
    }
    componentDidMount() {
        var that = this;
    }

    render() {
        var data = this.state.rows;
        var that = this;
        const content = this.state.loading ?  <img src="loading.gif" /> : this.state.ajaxFinished ?<div className="numberCircle">{this.state.degree}</div>:<div></div>;
        const validationText=this.state.validationFail?<div className="margin5 error">Please Enter valid Input</div> : <span></span>
        return ( <div className="container">
        <div className="containerLeft">
        <div>..Between</div>
         <input className="form-control input-lg margin5" placeholder="Person URL" type="text" ref="person1" />
            <div>..And</div>
          <input className="form-control input-lg margin5" placeholder="Person URL" type="text" ref="person2" />
            {validationText}
           <button className="btn btn-default margin5 button" onClick={this.fetchData}>Find degree</button> 
         </div>
        <div className="containerRight">
        {content}
        </div>
         <div className="clearBoth"></div>
          </div>
        );
    }
}
render(<App />, document.getElementById('app'));