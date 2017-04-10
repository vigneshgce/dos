var axios = require('axios');
var endPoint="https://still-tundra-79168.herokuapp.com/";

function useNull(){
  return null;
}

var helpers = {
getHerokuInfo: function(url){
  return axios.get(endPoint+url).catch(useNull);
},
isNull:function(val){
      return val==undefined || val==null || val=="";
}
}

module.exports = helpers;