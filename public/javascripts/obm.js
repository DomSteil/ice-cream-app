var express = require('express');
var _ = require("lodash");
var router = express.Router();

router.post('/', function(req, res) {
  // get the obm as an object
  var message = unwrapMessage(req.body);
  if (!_.isEmpty(message)) {
    // some something #awesome with message
    console.log(message);
    // return a 'true' Ack to Salesforce
    res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>true</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    );
  } else {
    // return a 'false' Ack to Salesforce
    res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>false</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    );
  }

});

// unwrap the xml and return object
unwrapMessage = function(obj) {
  try {

    var orgId = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].organizationid[0];
	var name = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:name'][0];
	var scoops = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:scoops'][0];
    var flavors = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:flavors'][0];
	var crispies = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:crispies'][0];
	var chocolateSauce = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:chocolatesauce'][0];
	var cinnamonShortbread = obj['soapenv:envelope']['soapenv:body'][0].notifications[0].notification[0].sobject[0]['sf:cinnamonshortbread'][0];

    return {
      orgId: orgId,
	  name: name,
	  scoops: scoops,
      flavors: flavors,
      crispies: crispies,
	  chocolateSauce: chocolateSauce,
	  cinnamonShortbread: cinnamonShortbread,
    };

  } catch (e) {
    console.log('Could not parse OBM XML', e);
    return {};
  }
};

module.exports = router;