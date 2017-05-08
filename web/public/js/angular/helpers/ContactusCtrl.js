var app = angular.module("openMarketTravelApp");

app.controller("affiliateContactusCtrl", 
    ['$scope', '$http', 'toaster', 'tools_service', '$log', 'yto_api', 'http_service',
    function($scope, $http, toaster, tools_service, $log, yto_api, http_service){

    $scope.checkSend = {
        omt : false,
        user : false
    };

    $scope.formlang = "";

    $scope.checkform = function(formok){
        if(formok){
            $scope.send();
        } else {
            if ($scope.formlang == "es") {
                toaster.pop('error', 'Formulario Incorrecto', 'Revisa los campos en rojo, por favor.');    
            } else {
                toaster.pop('error', 'Invalid Form', 'Please check fields in red.');
            }
        }
    };

  	$scope.send = function(){
      var msg = $scope.msg;
  		var subject = "[YTO] nuevo mensaje de "+msg.name;
  		var from = [msg.email];
  		var content = msg;
      var to = ['notification@yourttoo.com'];
      // to omt
  		$scope.notification(subject, "ytoadminmessage", content, to, function(){
          $scope.checkSend.omt = true;
          if($scope.formlang == "es") {
              // to client
              $scope.notification(subject, "ytoaffiliatecontact", content, from, function(){
                  $scope.checkSend.user = true;
                  _oksend();
              });    
          } else {
              $scope.notification(subject, "ytoaffiliatecontact", content, from, function(){
                  $scope.checkSend.user = true;
                  _oksend();
              });
          }

      });
  	};

    function _oksend(){
        if ($scope.checkSend.omt && $scope.checkSend.user){
            if ($scope.formlang == "es") {
                toaster.pop('success', 'Mensaje enviado', 'Gracias.');
            } else {
                toaster.pop('success', 'Message Sending', 'Thanks.');
            }
            $scope.msg ={
                name : "",
                email : "",
                phone : "",
                msg: "",
                type : "",
                acceptconditions: false
            } 
        } else{
            if ($scope.formlang == "es") {
                toaster.pop('error', 'Error del Servidor', 'Inténtalo de nuevo más tarde.');
            } else {
                toaster.pop('error', 'Server Error', 'Please try later.');
            }            
        }
    }
	// send notifications
    $scope.notification = function(subject, template, contentObj, to, callback) {

      var request = {
          command: 'email',
          service: 'api',
          request: {
              oncompleteeventkey: 'email.done',
              onerroreventkey: 'email.error',
              to: to,
              subject: subject,
              mailtemplate: template,
              mailparameter: contentObj,
          }
      };

      var rqMail = yto_api.send(request);
      //on response Ok
      rqMail.on(rqMail.oncompleteeventkey, function (rsp) { 
          tools_service.showPreloader($scope, "hide");
          $log.info("Send Notification OK", rsp);

          if (angular.isFunction(callback)){
              callback();
              // google analytics event to track action 
              if ($scope.formtype == 'contact'){
                  ga('send', {
                        'hitType': 'event',          // Required.
                        'eventCategory': 'form',   // Required.
                        'eventAction': 'ok',      // Required.
                        'eventLabel': 'Send Form Contact',
                        'eventValue': 1
                  });
              } else if($scope.formtype == 'affiliate'){
                  ga('send', {
                        'hitType': 'event',          // Required.
                        'eventCategory': 'form',   // Required.
                        'eventAction': 'ok',      // Required.
                        'eventLabel': 'Send Form Affiliate',
                        'eventValue': 1
                  });
              }
              // end google analytics event to track action 
          }
      });
      //on response noOk
      rqMail.on(rqMail.onerroreventkey, function (err) { 
          $log.error(err);
          tools_service.showPreloader($scope, "hide");
          if ($scope.formlang == "es") {
              toaster.pop('error', 'Error del Servidor', 'Inténtalo de nuevo más tarde.');
          } else {
              toaster.pop('error', 'Server Error', 'Please try later.');
          }
          // google analytics event to track action 
          if ($scope.formtype == 'contact'){
              ga('send', {
                    'hitType': 'event',          // Required.
                    'eventCategory': 'form',   // Required.
                    'eventAction': 'error',      // Required.
                    'eventLabel': 'Send Form Contact',
                    'eventValue': 1
              });
          } else if($scope.formtype == 'affiliate'){
              ga('send', {
                    'hitType': 'event',          // Required.
                    'eventCategory': 'form',   // Required.
                    'eventAction': 'error',      // Required.
                    'eventLabel': 'Send Form Affiliate',
                    'eventValue': 1
              });
          };
          // end google analytics event to track action
      });

    };

}]);