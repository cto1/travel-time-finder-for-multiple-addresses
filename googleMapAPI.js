var axios = require('axios');

const GOOGLE_MAP_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&key=AIzaSyCs347q2Ndi52Ghdz4qpy62knfEKWm4zuc';

// API doc https://developers.google.com/maps/documentation/distance-matrix/intro

module.exports = {
  getData: function (origins, destinations) {
    var encodedOrigins = encodeURIComponent(origins);
    var encodedDestinations = encodeURIComponent(destinations)
    var requestUrl = `${GOOGLE_MAP_URL}&origins=${encodedOrigins}&destinations=${encodedDestinations}`;

    console.log("googleMapAPI " + requestUrl);

    return axios.get(requestUrl).then(function (res) {
        let travelData ={};
        res.data.rows.forEach( e => {
          //console.log("googleMapAPI " + JSON.stringify(e.elements));

          e.elements.forEach(d => {
          //  console.log("googleMapAPI " + d.distance.value);
            travelData.distance = d.distance.value;
          //  console.log("googleMapAPI " + d.duration.value);
            travelData.duration = d.duration.value;
          //  console.log("googleMapAPI " + JSON.stringify(travelData));
          })
          //console.log("googleMapAPI " + JSON.stringify(travelData));
        });
        return travelData;
    }, function (res) {
        throw new Error("error googleMapAPI " + res);
    });
  }
}
