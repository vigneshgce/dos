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
            cast: {},
            actor: {},
            actor1: {}
        };
        this.queue1 = [];
        this.queue2 = [];
        this.count1 = 0;
        this.count2 = 0;
        this.isFound=false;
        this.markedArtists=[];
        this.markedMovies=[];
        this.RTdata = this.RTdata.bind(this);
        this.findDegree = this.findDegree.bind(this);
        this.chumma = this.chumma.bind(this);
    }

    chumma(){
    var url="https://still-tundra-79168.herokuapp.com/degree/get?actorurl1=thaveethu&actorurl2=amithab";
    helpers.getHerokuInfo(url).then(function(res){
      console.log("got res hero ",res);
    });
    //
    }

    findDegree(actorList,dos){
        try{
        var that=this;
        if(!that.isFound){
        helpers.getGithubInfo(actorList).then(function(res) {
            //console.log("res is ", res);
            var actor1 = {};
            actor1 = res[0];
            if(!actor1){
              //console.log("return call actor");
              if(that.queue1.length>0){
                actor1=that.queue1.shift();
                that.findDegree([actor1.url],dos);
              }
            }
            if(actor1) {
              if (that.count1 == 10000) {
                  console.log("breaking up..");
                  return;
              }
              if(actor2&&actor2.url == 'robert-de-niro'){
                console.log("result is "+count2);
                return;
              }
              if(actor1.url == 'amitabh-bachchan'){
                that.isFound=true;
                console.log("found result is "+that.count1,dos);
                throw new Error("Stopping the function!");
                return;
              }
              var movies1 = actor1.movies;
              if(!movies1){
                //console.log("return call movie");
                if(that.queue1.length>0){
                  actor1=that.queue1.shift();
                  that.findDegree([actor1.url],dos);
                }
              }
              if(movies1){
                that.count1++;
                helpers.getGithubInfo(movies1.filter(function(movie) {
                    if(that.markedMovies.indexOf(movie.url)<0){
                        that.markedMovies.push(movie.url);
                        return true;
                    }
                }).map(function(movie){
                  return movie.url;
                })).then(function(arr) {
                    //console.log("act res 1 is ", arr);
                    arr.map(function(result){
                      //console.log("result data ",result);
                      var movieData=result;

                      if(movieData){
                        if(movieData.cast) {
                        that.queue1=that.queue1.concat(movieData.cast.filter(function(item){
                          if(that.markedArtists.indexOf(item.url)<0){
                              that.markedArtists.push(item.url);
                              return item.url!=actor1.url;
                          }
                        }));
                        }
                        if(movieData.crew) {
                        that.queue1=that.queue1.concat(movieData.crew.filter(function(item){
                          if(that.markedArtists.indexOf(item.url)<0){
                              that.markedArtists.push(item.url);
                              return item.url!=actor1.url;
                          }
                        }));
                        }
                      }
                    });
                    actor1=that.queue1.shift();
                    dos=dos+1
                    that.findDegree([actor1.url],dos);
                    console.log("after call");
                });
              }

            }
        });
        }
        }
        catch(e){
        console.log("function stopped");
        }

    }

    RTdata() {
        var that=this;
        var actor={};
        actor['url']='amitabh-bachchan';
        try{
        that.findDegree(['robert-de-niro'],1);
        }
        catch(e){
          console.log("function stopped main");
        }
    }

    componentDidMount() {
        var that = this;
    }

    render() {
        var data = this.state.rows;
        var that = this;
        var newrow = <div>
            <h1 > Jobs! < /h1> </div>;
        return ( <div > < h1 > welcome back by </h1><table><tbody> {newrow} <button onClick={this.RTdata}>find me</button> <button onClick={this.chumma}>find me chumma</button> </tbody></table> </div>
        );
    }
}

var actor1 = 'amitabh-bachchan';
var actor2 = 'robert-de-niro';
var actor = {};
actor.actor1 = actor1;
actor.actor2 = actor2;
actor.endpoint = "http://data.moviebuff.com/";
render(<App data = {actor}/>, document.getElementById('app'));