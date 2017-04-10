var axios = require('axios');
var endPoint="http://data.moviebuff.com/";

function getCastInfo (url) {
  return axios.get(endPoint + url);
}

function getUserInfo(username){
  return axios.get('https://api.github.com/users/' + username);
}

function getActorInfo(name){
  return axios.get('http://data.moviebuff.com/' + name).catch(useNull);
}

function getHerokuInfo(url){
  return axios.get(url).catch(useNull);
}

function useNull(){
  return null;
}

var helpers = {
getHerokuInfo: function(url){
  return axios.get(url).catch(useNull);
},
  getGithubInfo: function(usernameArr){
    return axios.all(usernameArr.map(function(username){
      return getActorInfo(username);
    }))
      .then(function(arr){
      //console.log("response ",arr);
        if(arr){
        return arr.map(function(res){
          if(res){
          return res.data;
          }
        });
        }
      });
  }}

var helpersn = {
    getInfo: function(url){
    return axios.all([getCastInfo(url)])
      .then(function(arr){
        return {
          data: arr[0].data        
        }
      }).catch(function(res) {
    if(res instanceof Error) {
        return {
          data: res.message        
        }
      console.log(res.message);
    } else {
        return {
          data: res.data        
        }
      console.log(res.data);
    }
  });
  },
    getInfoAll3: function (fnList) {
    return axios.all(fnList).then(function (info) {
      return info.map(function (currency) {
        console.log("ret data ",currency);
        return currency.data;
      })
    }).catch(function (error) {
      return ['false']
    })
  },
  getInfoAll2: function (mList) {
    return axios.all(mList.map(function (list) {
      return getCastInfo(list.url)
    })).then(function (info) {
      return info.map(function (currency) {
        return currency.data;
      })
    }).catch(function (error) {
      return ['false']
    })
  },
    getInfoAll: function (mList) {
    return axios.all(mList.map(function (list) {
      return getCastInfo(list.url)
    })).then(function (info) {
      return info.map(function (currency) {
        return currency.data;
      })
    }).catch(function (error) {
      return ['false']
    })
  }
}
module.exports = helpers;