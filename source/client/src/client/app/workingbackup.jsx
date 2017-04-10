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
        this.markedArtists=[];
        this.markedMovies=[];
        this.RTdata = this.RTdata.bind(this);
        this.findDegree = this.findDegree.bind(this);

    }

    findDegree(actorList){
        var that=this;
        helpers.getGithubInfo(actorList).then(function(res) {
            console.log("res is ", res);
            var actor1 = {};
            actor1 = res[0];
            if(!actor1){
            console.log("return call actor");
              return;
            }
            if(actor1) {
              if (that.count1 == 30 || that.count2 == 30) {
                  console.log("breaking up..");
                  return;
              }
              if(actor2&&actor2.url == 'amitabh-bachchan'){
                console.log("result is "+count2);
                return;
              }
              if(actor1.url == 'robert-de-niro'){
                console.log("result is "+that.count1);
                return;
              }
              var movies1 = actor1.movies;
              if(!movies1){
                console.log("return call movie");
                return;
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
                    console.log("act res 1 is ", arr);
                    arr.map(function(result){
                      console.log("result data ",result);
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
                    that.findDegree([actor1.url]);
                    console.log("after call");
                });
              }

            }
        });

    }

    RTdata() {
        var that=this;
        var actor={};
        actor['url']='amitabh-bachchan';
        that.findDegree(['amitabh-bachchan']);
    }

    componentDidMount() {
        var that = this;
    }

    render() {
        var data = this.state.rows;
        var that = this;
        var newrow = <div>
            <h1 > Jobs! < /h1> </div>;
        return ( <div > < h1 > welcome back by </h1><table><tbody> {newrow} <button onClick={this.RTdata}>find me</button> </tbody></table> </div>
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