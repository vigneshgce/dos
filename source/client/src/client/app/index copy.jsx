import React from 'react';
import {render} from 'react-dom';
import  axios from 'axios';
var helpers = require('./utils/helpers');

class App extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    flag: 1,
    cast:{},
    actor:{},
    actor1:{}
  };
  this.state.actor=props.data;
  this.state.jobs= [];
  //this.update=this.update.bind(this);
   this.RTdata=this.RTdata.bind(this);
} 
getCastInfo(url){
  return axios.get(endPoint + url);
}

RTdata(){
console.log("data 2");
var queue=[];
var queue1=[];
var actor1=this.state.actor1;
var actor=this.state.actor;
var count1=0,count2=0;
while(actor &&actor1) {
  if(count1==60||count2==60){
  console.log("breaking up..");
  break;
  }
  console.log("current node ",actor,actor1);
    console.log("count :"+count1);
    if(actor1.url == this.state.actor['actor2']){
      console.log("result is "+count1);
      break;
    }
    if(actor.url == this.state.actor['actor']){
      console.log("result is "+count1);
      break;
    }


  if(actor1){
    if(actor1.movies){
    count2++;
    var endPoint="http://data.moviebuff.com/";
    console.log("count 2 :"+count2);
      helpers.getInfoAll3([axios.get(endPoint + 'hands-of-stone'),axios.get(endPoint + 'idols-eye')]).then(function(response){
        console.log("getall response ",response);
      }.bind(this));
  }
  }
  console.log("queue2 data is ",queue1);
}
}

  componentDidMount() {
  helpers.getInfo(this.state.actor['actor1']).then(function(data){
        console.log("got data ",data);
        this.setState({
        actor:data.data
        })
      }.bind(this));

        helpers.getInfo(this.state.actor['actor2']).then(function(data){
        console.log("got data ",data);
        this.setState({
        actor1:data.data
        })
      }.bind(this));
}

  componentWillUnmount() {
    //this.serverRequest.abort();
   // this.RTdata();
  }

  render () {
      var data = this.state.rows;
      var that=this;
      var newrow=<div>
        <h1>Jobs!</h1>
        {this.state.jobs.map(function(job) {
          return (
            <div key={job.id} className="job">
              <a href={job.url}>
                {job.company_name}
                is looking for a 
                {job.term}
                {job.title}
              </a>
            </div>
          );
        })}
      </div>;
      return (
       <div><h1>welcome back by</h1><table><tbody> {newrow} <button onClick={this.RTdata}>find me</button></tbody></table></div>
      );
  }
}

var actor1='amitabh-bachchan';
var actor2='robert-de-niro';
var actor={};
actor.actor1=actor1;
actor.actor2=actor2;
actor.endpoint="http://data.moviebuff.com/";
render(<App data={actor}/>, document.getElementById('app'));