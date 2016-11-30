var columns = ["employee", "q_full", "q_postcode"];
var googleMapAPI = require("./googleMapAPI");

const DESTINATIONS = '+Parque+Empresarial+La+Marina,+Calle+de+la+Isla+del+Hierro,+7,+28703,+San+Sebasti%C3%A1n+de+los+Reyes,+Madrid,+Spain';

const OFFICE_0 = '+ISLA+DEL+HIERRO+7,+2+PL,+28703+SAN+SEBASTIÁN+DE+LOS+REYES,+MADRID,+Spain';
const OFFICE_1 = '+AVENIDA+DE+EUROPA+19,+28108+ALCOBENDAS,+MADRID,+Spain';
const OFFICE_2 = '+ANABEL+SEGURA+7,+28108+ALCOBENDAS,+MADRID,+Spain';
const OFFICE_ARRAY = [ OFFICE_0, OFFICE_1, OFFICE_2];

require("csv-to-array")({
   file: "./addresses/dataAll.csv",
   columns: columns
}, function (err, array) {
    array.forEach( e => {
      console.log("INDEX " + e.q_full);
      getOfficesTravelInfo(OFFICE_1, e.q_full, e.employee);
      });
});

function getOfficesTravelInfo(origins, destinations,employee) {
  var result = '';
  googleMapAPI.getData(origins,destinations).then(function (travelData) {
      //console.log("getOfficesTravelInfo travelData=" + JSON.stringify(travelData));
      result = `${employee},${travelData.distance},${travelData.duration}`;
      console.log(result);
      }, function (errorMessage) {
      console.log("getOfficesTravelInfo " + errorMessage);
  });
  return result;
}
