'use strict';

var app = angular.module("openMarketTravelApp");

app.controller("sendCtrl", ['$scope', '$http', 'toaster',
    '$location', '$anchorScroll', 'anchorSmoothScroll', '$timeout', 'openmarket_session_service',
    '$cookieStore', '$cookies', 'openmarket_api_service', 'openmarket_file_uploader', 'tools_service', '$log', 'openmarket_google_service', 'http_service', '$sce',
    function($scope, $http, toaster, $location, $anchorScroll, anchorSmoothScroll, $timeout, openmarket_session_service,
        $cookieStore, $cookies, openmarket_api_service, openmarket_file_uploader, tools_service, $log, openmarket_google_service, http_service, $sce) {


    	$scope.send = function(){
    		var subject = ""
    		var contentObj = {
            	
            }
    		$scope.notification('[test] - ' +  subject, 'dmcforgotpassword', contentObj);
    	}

    	 // send notifications
        $scope.notification = function(subject, template, contentObj, to) {
            var postdata = {
                to:['franllull@gmail.com'],
                subject: subject,
                mailtemplate: template,
                mailparameter: contentObj
            }
           	
           	http_service.http_request(openmarket_api_service.apiCoreServiceUrl() + 'omt/SendEmailNotification', 'POST', '', postdata).then(
            function (res) {
                if (res.ResultOK){
                	$log.info("Send Notification OK");
                } else {
                	$log.error(res.Message);
                	throw res.Message;
                }
            },
            function (err) {
            	$log.error("error sending notification");
                throw 'An unknown error has ocurred sending notifications';
            }
            );

        }

 }
]);