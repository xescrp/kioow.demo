'use strict';
var app = angular.module('openMarketTravelApp');

app.directive('ngChat', [
    'tools_service',
    'toaster',
    'http_service',
    '$log', '$location',
    '$anchorScroll',
    'anchorSmoothScroll',
    '$rootScope',
    'yto_api', 'Notification', 
    function (
        tools_service,
        toaster,
        http_service,
        $log,
        $location,
        $anchorScroll,
        anchorSmoothScroll,
        $rootScope,
        yto_api, Notification) {
    return {
        templateUrl: '/partials/chat/messages.html', //template to the markup for this directive...
        scope: {
            referenceobj: '=referenceobj',
            referencetype: '=referencetype', //a set that define what field is reference to find the chat: [dmc, traveler, booking, quote, query] 
            usertype: '=usertype',
            userobj: '=userobj',
            totype: '=totype',
            toid: '=toid',
            lang: '=lang',
            tocode: '=tocode',
            fromcode: '=fromcode',
            showempty: '=showempty',  
            userquery: '=userquery'        
        },
        link: function ($scope, el, attrs) {
            //not loaded chat...
            $scope.chat = null;
            $scope.reference = {type : '', id : '', user:''};
            $scope.to = {type : '', id : '', user:''};
            $scope.from = {type : '', id : '', user:''};
            $scope.hiddenMsgs = 0;
            $scope.collapsed = false;
            $scope.haveHiddenMesgs = false;
            $scope.urlapi = ''; //openmarket_api_service.apiCoreServiceUrl();
            $scope.timeUpdate = {};

            var debug = $location.search().debug;
            $scope.showLoadChat = true;
            //images helper
           $scope.getimage = function (url, imagename) {
               return tools_service.cloudinaryUrl(url, imagename);
           };


           // if chat doesn't exist create a new one

            var _newChat = function(){

                var dummy = {
                    code: "",
                    title: "",
                    slug: "",    
                    date: new Date(),
                    userquery: null,
                    booking: null,
                    booking2: null,
                    quote: null,
                    traveler: null,
                    dmc: null,
                    affiliate:null,
                    state: "new",
                    messages: []
                 };

                 // get ids to chat db and populate on response

                 var _setIds = function(arr){

                    for (var i = 0; i < arr.length; i++) {                   	
                        switch (arr[i].type) {
                            case 'dmc':
                                dummy.dmc = arr[i].id;
                                break;
                            case 'traveler':
                                dummy.traveler = arr[i].id;
                                break;
                            case 'booking':
                                dummy.booking2 = arr[i].id;
                                break;
                            case 'quote':
                                dummy.quote = arr[i].id;
                                break;
                           case 'userquery':
                                dummy.query = arr[i].id;
                                break;
                            default:
                                //nothing to do.. or default action...
                                break;
                        }
                    };
                 };
                 
                 _setIds([$scope.reference, $scope.to, $scope.from]);
                 return dummy
            }

            //fetch the chat object from bbdd - Methods: 
            function setChat(chat) {
                if (chat != null) {
                    $scope.chat = chat;
                }
                //do another stuff if you need...
                // ...

            }
        
            /**
             * rescta el chat por la booking
             */
            function getChatByBooking(id, callback) {
            	
                // unique
                if(debug)
                    $log.log('getChatByBooking :',id);
                
                
                // get user from api nueva
        	   	var rq = {
                    command: 'find',
                    service: 'api',
                    request: {
                        query: { booking2: id },
                        collectionname: 'Chats',
                        populate: [{path: 'roles'},{path: 'traveler'},{path: 'affiliate'},{path: 'booking2'},{path: 'dmc'}]                        
                    },           
                };
                var rqCB = yto_api.send(rq);

                // response OK
                rqCB.on(rqCB.oncompleteeventkey, function (data) {
                    if (data != null && data != '' && data.length > 0) {
                	
                		$scope.chat = data[0];
                		$scope.nochat = false;
                		$scope.loadChat = false;

                		_refreshChat();
                		_checkchatlength();
                      
                		// in x secs. pass un read mensajes to read
                		$scope.timeUpdate = setTimeout($scope.readNewMessages,15000);                		
                	
                   } else {
                	   	console.log("No chats found by booking id: ",id);
                	   	
                	   	if($scope.chat == null || $scope.chat == undefined || $scope.chat == ''){
                            $scope.chat = _newChat();
                        }
                	   	
                		var rq2 = {
                                command: 'findone',
                                service: 'api',
                                request: {
                                    query: { _id: id },
                                    collectionname: 'Bookings2',
                                    populate: [{path: 'affiliate'},{path: 'traveler'},{path: 'dmc'}]                                    
                                },           
                        };
                        var rqCB2 = yto_api.send(rq2);
                        
                        rqCB2.on(rqCB2.oncompleteeventkey, function (returnBooking) {
                        	
                    		if(returnBooking != null){
                        		$scope.chat.booking2 = returnBooking;
                        		console.log("+++ booking returned: ",returnBooking);
                        		$scope.nochat = true;
	                            $scope.loadChat = false;
                    		}
                        });
                        
            	   		rqCB2.on(rqCB2.onerroreventkey, function (err) {                        	
            	   			console.log("ERROR no booking was found. for id: ",id);
                			$scope.nochat = true;
                            $scope.loadChat = false;
                        });   	
                   	}       	
                });
                
                // response KO
                rqCB.on(rqCB.onerroreventkey, function (err) {                        	
                	$log.error('Error getting Chat By Booking id : ',id, '. Details: ',err);
                	$scope.nochat = true;
                    $scope.loadChat = false;
                });
            }

            function getChatsByQueryId(id, callback) {
                var rq = {
                    command: 'find',
                    service: 'api',
                    request: {
                        query: { userquery: id },
                        collectionname: 'Chats',
                        populate: [{ path: 'userquery' }, { path: 'affiliate' }, { path: 'quote' }, { path: 'dmc' }]
                    },
                };
                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (data) {

                    if (data != null && data.length > 0) {
                        console.log("++ chat rescatado: ", data);

                        $scope.chat = data[0];
                        $scope.nochat = false;
                        $scope.loadChat = false;

                        _refreshChat();
                        _checkchatlength();

                        // in x secs. pass un read mensajes to read
                        $scope.timeUpdate = setTimeout($scope.readNewMessages, 15000);

                    } else {
                        console.log('chat no encontrado...');
                        if ($scope.chat == null || $scope.chat == '') {
                            $scope.chat = _newChat();
                            $scope.nochat = true;
                            $scope.loadChat = false;
                            $scope.chat.userquery = id;
                            $scope.chat.affiliate = $scope.userquery != null && $scope.userquery.affiliate != null ? $scope.userquery.affiliate : $scope.chat.affiliate;
                            console.log('chat regenerado...');
                            console.log($scope.chat);
                        }
                   	}
                });

                // response KO
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    $log.error('Error getting user : ', code, '. Details: ', err);
                });     

            }
           
            /**
             * rescata el chat de la quote
             */
            function getChatsByQuoteId(id, callback) {
            	
                // unique
                if(debug)
                    $log.log('getChatsByQuoteId :',id);
                
                
                // get user from api nueva
        	   	var rq = {
                    command: 'find',
                    service: 'api',
                    request: {
                        query: { quote: id },
                        collectionname: 'Chats',
                        populate: [{path: 'userquery'},{path: 'affiliate'},{path: 'quote'},{path: 'dmc'}]                        
                    },           
                };
                var rqCB = yto_api.send(rq);

                // response OK
                rqCB.on(rqCB.oncompleteeventkey, function (data) {                	

                    if (data != null && data != '' && data.length > 0) {
                		console.log("++ chat rescatado: ",data);
                		                	
                		$scope.chat = data[0];
                		$scope.nochat = false;
                		$scope.loadChat = false;

                		_refreshChat();
                		_checkchatlength();
                      
                		// in x secs. pass un read mensajes to read
                		$scope.timeUpdate = setTimeout($scope.readNewMessages,15000);                		
                	
                   } else {
                	   
                	   	if($scope.chat == null || $scope.chat == ''){
                            $scope.chat = _newChat();
                        }
                	   	
                		var rq2 = {
                                command: 'find',
                                service: 'api',
                                request: {
                                    query: { _id: id },
                                    collectionname: 'Quotes',
                                    populate: [{path: 'affiliate'},{path: 'traveler'},{path: 'products'}]                                    
                                },           
                        };
                        var rqCB2 = yto_api.send(rq2);
                        
                        rqCB2.on(rqCB2.oncompleteeventkey, function (returnQuotes) {
                        	
                    		if(returnQuotes != null && returnQuotes.length > 0){
                    			
                    			
                    			$scope.chat.quote = returnQuotes[0];
                    			
                    			
                    			// *********************************
                    			// rescatar la query para el afiliado
                    			// *********************************
                    			var rqAffiliate = {
                                        command: 'find',
                                        service: 'api',
                                        request: {
                                            query: { _id: returnQuotes[0].userqueryId },
                                            collectionname: 'UserQueries',
                                            populate: [{path: 'affiliate'},{path: 'traveler'}]                                    
                                        },           
                                };
                                var rqCBAffiliate = yto_api.send(rqAffiliate);
                                
                                rqCBAffiliate.on(rqCBAffiliate.oncompleteeventkey, function (returnQuery) {                                	
                            		if(returnQuery != null && returnQuery.length > 0){                            			
                            			
                            			$scope.chat.userquery = returnQuery[0];                        		
                                		$scope.nochat = true;
        	                            $scope.loadChat = false;
        	                            console.log("+++ chat loaded: ",$scope.chat);
                            		}
                                });
                                
                                rqCBAffiliate.on(rqCBAffiliate.onerroreventkey, function (err) {                        	
                    	   			console.log("ERROR no query was found. for id: ",returnQuotes[0].userqueryId);
                        			$scope.nochat = true;
                                    $scope.loadChat = false;
                                });
                    		}
                        });
                        
            	   		rqCB2.on(rqCB2.onerroreventkey, function (err) {                        	
            	   			console.log("ERROR no quote was found. for id: ",id);
                			$scope.nochat = true;
                            $scope.loadChat = false;
                        });                	   
                   	}       	
                });
                
                // response KO
                rqCB.on(rqCB.onerroreventkey, function (err) {                        	
                	$log.error('Error getting user : ',code, '. Details: ',err);
                });     
            }

            // refresh browser view after api response 
            function _refreshChat(){
                if(debug)
                    console.log("refresh chat");

            };

            // if we have more than X messages we hide the rest             
            $scope.txtHaveHidden = true;

            $scope.showMessages = function(){
                if ($scope.hiddenMsgs == 0){
                    $scope.hiddenMsgs = $scope.totalmessagescount - 3;
                    $scope.txtHaveHidden = true;
                } else {
                    $scope.hiddenMsgs = 0;
                    $scope.txtHaveHidden = false;
                }
            }
            $scope.totalmessagescount = 0;
            // check messages length and hide the rest
            function _checkchatlength() {
                $scope.totalmessagescount = _.filter($scope.chat.messages, function (msg) {
                    return (msg.from.id == $scope.from.id && msg.to.id == $scope.to.id || msg.to.id == $scope.from.id && msg.from.id == $scope.to.id);
                });
                
                if ($scope.totalmessagescount > 2){                    
                    $scope.collapsed = true;
                    $scope.haveHiddenMesgs = true;
                    $scope.hiddenMsgs = $scope.totalmessagescount - 3;
                }
            };
                            

            // find the basic data from user and to user by type of user

            function _buildInterlocutor(interlocutor){
                if(debug)
                    console.log('interlocutor : ',interlocutor);

                switch (interlocutor.type) {
                    case 'dmc':
                        interlocutor.id = interlocutor.user._id;
                        if(interlocutor.user.images && interlocutor.user.images.logo && interlocutor.user.images.logo.url){
                        	interlocutor.avatar = interlocutor.user.images.logo.url;
                        }
                        interlocutor.name = interlocutor.user.company.name;
                        if (interlocutor.user.contact != undefined && interlocutor.user.contact != null && interlocutor.user.contact.reqFITContact != null){
                            interlocutor.email = interlocutor.user.contact.reqFITContact.email;
                        } else {
                            interlocutor.email = interlocutor.user.contact.email;
                        }
                        if(interlocutor.user.images && interlocutor.user.images.logo && interlocutor.user.images.logo.url){
                        	interlocutor.avatarimg = $scope.getimage(interlocutor.user.images.logo.url, 'avatarb36round');
                        }
                        break;
                        
                    case 'traveler':
                        interlocutor.id = interlocutor.user._id;
                        interlocutor.avatar = interlocutor.user.images.photo.url;
                        interlocutor.avatarimg = $scope.getimage(interlocutor.user.images.photo.url, 'avatarb36round');
                        interlocutor.name = interlocutor.user.firstname;
                        if(interlocutor.user.lastname != null){
                        	interlocutor.name+' '+interlocutor.user.lastname;	
                        }
                        interlocutor.email = interlocutor.user.email;
                        break;
                        
                    case 'affiliate':
                    	                    	
                    	interlocutor.id = interlocutor.user._id;
                    	if(interlocutor.user.images && interlocutor.user.images.logo && interlocutor.user.images.logo.url){
                        	interlocutor.avatar = interlocutor.user.images.logo.url;
                        }
                    	interlocutor.name = interlocutor.user.company.name;
                    	if (interlocutor.user.contact != undefined && interlocutor.user.contact != null){
                            interlocutor.email = interlocutor.user.contact.email;
                        }                    	
                    	if(interlocutor.user.images && interlocutor.user.images.logo && interlocutor.user.images.logo.url){
                    		interlocutor.avatarimg = $scope.getimage(interlocutor.user.images.logo.url, 'avatarb36round');
                        }
                        
                        break;
                    
		            case 'admin':
		            	interlocutor.id = interlocutor.user._id;
		            	if(interlocutor.user.images && interlocutor.user.images.logo && interlocutor.user.images.logo.url){
                        	interlocutor.avatar = interlocutor.user.images.logo.url;
                        }
		            	interlocutor.name = interlocutor.user.username;
		            	interlocutor.email = interlocutor.user.email;
		            	if(interlocutor.user.images && interlocutor.user.images.logo && interlocutor.user.images.logo.url){
	                       	interlocutor.avatarimg = $scope.getimage(interlocutor.user.images.logo.url, 'avatarb36round');
		            	}
		            			                
		                interlocutor.avatarimg = $scope.getimage(interlocutor.user.photo.url, 'avatarb36round');
		                break;
		            }
                
                _init();//inicializo el chat
            }

            /**
             * recuperar el chat de mongo 	
             */
            function getChat() {
                          	            	
                $scope.lang = $scope.lang.toUpperCase();

                $scope.reference.type = $scope.referencetype;
                $scope.reference.id = $scope.referenceobj;
                
            	console.log("-- get chat, type: ",$scope.reference.type,' id: ',$scope.referenceobj);
                
                switch ($scope.reference.type) {
                    case 'booking':
                        getChatByBooking($scope.reference.id, setChat);
                        break;
                    case 'quote':
                        getChatsByQuoteId($scope.reference.id, setChat);
                        break;
                    case 'userquery':
                        getChatsByQueryId($scope.reference.id, setChat);
                        break;
                    default:
                        //nothing to do.. or default action...
                        break;
                }                
            }


            // generic method for send response
            $scope.sendMessage = function(idmsg) {
            	
            	console.log("*** to: ",$scope.to);
            	console.log("*** from: ",$scope.from);
            	
            	
            	//laoder
            	$scope.showLoadChat = true;
            	            	
                if($scope.chat == null || $scope.chat == undefined || $scope.chat == ''){
                    $scope.chat = _newChat();                    
                }

                var message = {
                    message : '',
                    date: new Date(),                    
                    to : $scope.to,
                    from : $scope.from
                }                
                message.from.status= 'sending';
                
                if ($scope.lang == 'ES'){
                    message.message = $scope.txtmessage_es;
                } else {
                    message.message = $scope.txtmessage_en;
                }

                $scope.txtmessage_es = $scope.txtmessage_en = '';

                var idmsg = $scope.chat.messages.push(message);
                idmsg= --idmsg;

                
               // if(debug)
                    console.log(' +++ sendMessage chat : ',$scope.chat);

                _updateChat(idmsg, function(idmsg){

                    var message = $scope.chat.messages[idmsg];
                    $scope.showLoadChat = false;
                    Notification.success({ message: 'Mensaje enviado', title: 'nuevo mensaje' });
                    //toaster.pop('success', 'Mensaje enviado correctamente.', 'Hemos enviado un mensaje a '+message.to.name);
                });

            };

            
            /**
             * funcion que se llama cuando falla angular y se recarga la pagina
             */
            $scope.resendMsg = function(idmsg){

                // _updateChat(idmsg, function(idmsg){

                    var message = $scope.chat.messages[idmsg];
                    if(debug)
                        console.log(idmsg, ' message :', message);

                    switch (message.to.type) {
                        case 'dmc':
                            _sendNotificationToDmc(message, idmsg);
                            break;
                        case 'traveler':
                            _sendNotificationToTraveler(message, idmsg);
                            break;
                        case 'affiliate':                            
                        	_sendNotificationToAffiliate(message, idmsg);
                        	break;
                        default:
                            break;
                    }
                // });
            };

            
            /**
             * guarda el chat en mongo
             */
            function savecurrentchat(callback) {

                $scope.chat.affiliate = ($scope.chat.booking2 != null && $scope.chat.booking2.affiliate != null) ? $scope.chat.booking2.affiliate : $scope.chat.affiliate;
                $scope.chat.affiliate = ($scope.chat.userquery != null && $scope.chat.userquery.affiliate != null) ? $scope.chat.userquery.affiliate : $scope.chat.affiliate;
                $scope.chat.affiliate = ($scope.chat.quote != null && $scope.chat.quote.affiliate != null) ? $scope.chat.quote.affiliate : $scope.chat.affiliate;

                var rq = {
                    command: 'save',
                    service: 'api',
                    request: {
                        data: $scope.chat,
                        query: { code: $scope.chat.code },
                        collectionname: 'Chats',
                        oncompleteeventkey: 'save.done',
                        onerroreventkey: 'save.error',
                        populate: [{ path: 'booking2' }, { path: 'quote' }, { path: 'affiliate' }, { path: 'userquery' }]
                    }
                };
                var rqCB = yto_api.send(rq);

                // response OK
                rqCB.on(rqCB.oncompleteeventkey, function (returnchat) {
                    $scope.chat = returnchat;
                    _refreshChat();
                    callback != null ? callback() : null;
                });

                // response KO
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    callback != null ? callback() : null;
                });
            }

            function recovercurrentchat(callback) {
                var rq = {
                    command: 'findone',
                    service: 'api',
                    request: {
                   			  query: { _id: $scope.chat._id },
                   			  collectionname: 'Chats',
                        populate: [{ path: 'booking2' }, { path: 'booking' }, { path: 'affiliate' }, { path: 'dmc' }, { path: 'userquery' }]
                    }
                };
                var rqCB = yto_api.send(rq); 

                // response OK
                rqCB.on(rqCB.oncompleteeventkey, function (returnchat) {
                    var messageFinal = uniqueArrayMessage($scope.chat.messages, returnchat.messages);
                    $scope.chat = returnchat;
                    $scope.chat.messages = messageFinal;
                    $scope.chat.messages[$scope.chat.messages.length - 1].from.status = 'sent';
                    _refreshChat();
                    callback != null ? callback() : null;
                });

                rqCB.on(rqCB.onerroreventkey, function (err) {
                    console.error('Error getting chat : ', $scope.chat.code, '. Details: ', err);
                    callback != null ? callback(err) : null;
                });      

            }

            var _updateChat = function (obj, callback) {
                $scope.chat._id != null && $scope.chat._id != '' ?
                    (recovercurrentchat(function () { savecurrentchat(callback); })) :
                    (savecurrentchat(callback));
            }

            var _OLDupdateChat = function(obj, callback){
            
            
            	// *********************************
            	// 1.1) si es un chat de una booking
            	// *********************************
            	if($scope.chat.booking2!=null ){
            		

	                // adjuntar el traveler o afiliado al chat
	                if($scope.chat.booking2.affiliate != null){
	                	$scope.chat.affiliate = $scope.chat.booking2.affiliate;
	                }
	                else if($scope.chat.booking2.traveler != null){
	                	$scope.chat.traveler = $scope.chat.booking2.traveler;
	                }	                
            		
            		
            		//*******************************************************************************************
	                //2) busco el chat actual para refrescar si hubiera mensajes nuevos, que no esten en el scope
	                //*******************************************************************************************
            		var id = $scope.chat.booking2._id != null ? $scope.chat.booking2._id : $scope.chat.booking2;
                	
            		var rq = {
                   		  command:'findone', 
                   		  service: 'api',
                   		  request: {                   			  
                   			  query: { booking2: id },
                   			  collectionname: 'Chats',                   			 
                                      populate: [{ path: 'booking2' }, { path: 'booking' }, { path: 'affiliate' }, { path: 'dmc' }, , { path: 'userquery' }]
                   		  } 
            		};
            		var rqCB = yto_api.send(rq);                   
                   

            		// response OK
            		rqCB.on(rqCB.oncompleteeventkey, function (result) {                	   
                	               			
                	   // si hay resultados concateno mensajes
               			if(result !=null && result.code!=null ){
               				console.log("*** Messages del chat resctado: ", result.messages);
               				console.log("*** Messages del chat a guardar: ", $scope.chat.messages);
               			
               				var messageFinal = uniqueArrayMessage($scope.chat.messages,result.messages);
               				console.log("***vector resultante de mensajes: ",messageFinal);
               			
               				$scope.chat.messages=messageFinal;                			
               			}
               			else{                			
               				console.log("*** chat resctado vacio");
               			}
               		
               			// poner el estado del mensaje actual a sent (luego si ha habido error el chat.actions lo cambiara a error)
               			$scope.chat.messages[$scope.chat.messages.length-1].from.status = 'sent';
               			               			
               			
               			// *********************
               			//2) guardar chat actual
               			// *********************
               			var rq = {
                      		  command: 'save', 
                      		  service: 'api',
                      		  request: {
                      			  data: $scope.chat,
                      			  query: { code: $scope.chat.code },
                      			  collectionname: 'Chats',
                      			  oncompleteeventkey: 'save.done',
                      			  onerroreventkey: 'save.error',
                      			  populate: [{path: 'booking2'}, {path: 'quote'},{path: 'affiliate'},{path: 'userquery'}]
                      		  } 
               			};
               			var rqCB = yto_api.send(rq);
                      
               			// response OK
               			rqCB.on(rqCB.oncompleteeventkey, function (returnchat) {
                      	
               				if($scope.chat.booking2 != null && $scope.chat.booking2.status!=null){                	
               					$scope.chat.booking2.status = $scope.chat.booking2.status;                		
               				}
               				           
               				// actualizo el chat del scope
               				$scope.chat = returnchat;
                          
               				_refreshChat();

               				if (typeof(callback) == "function"){
               					if(obj != null && obj != undefined){
               						callback(obj);
               					}else {
               						callback();  
               					}                        
               				}                          	
               			});
                      
               			// response KO
               			rqCB.on(rqCB.onerroreventkey, function (err) {                        	
               				$log.error('Error saving chat : ',$scope.chat.code, '. Details: ',err);
               			});
            		});
            		
            		// response KO
           			rqCB.on(rqCB.onerroreventkey, function (err) {                        	
           				$log.error('Error getting chat : ',$scope.chat.code, '. Details: ',err);
           			});            		
            	}
            	
            	// *******************************
            	// 1.2) si es un chat de una query
            	// *******************************
            	else if($scope.chat.userquery!=null){           		
            		            		
	                // adjuntar el traveler o afiliado al chat
	                if($scope.chat.userquery.affiliate != null){
	                	$scope.chat.affiliate = $scope.chat.userquery.affiliate;
	                }
	                else if($scope.chat.userquery.traveler != null){
	                	$scope.chat.traveler = $scope.chat.userquery.traveler;
	                }	    
	                
	                var id = $scope.chat.quote._id != null ? $scope.chat.quote._id : $scope.chat.quote;                	
                	
                	var rq = {
                     		  command:'findone', 
                     		  service: 'api',
                     		  request: {                   			  
                     			  query: { quote: id },
                     			  collectionname: 'Chats',                   			 
                     			  populate: [{path: 'booking2'}, {path: 'quote'},{path: 'userquery'}]
                     		  } 
              		};
              		var rqCB = yto_api.send(rq);      
	                              		
              		// response OK
            		rqCB.on(rqCB.oncompleteeventkey, function (result) {                	   
                	   
                	   // si hay resultados concateno mensajes
               			if(result !=null && result.code!=null ){
               				console.log("*** Messages del chat resctado: ", result.messages);
               				console.log("*** Messages del chat a guardar: ", $scope.chat.messages);               			
               				var messageFinal = uniqueArrayMessage($scope.chat.messages,result.messages);
               				console.log("***vector resultante de mensajes: ",messageFinal);
               			
               				$scope.chat.messages=messageFinal;                			
               			}
               			else{                			
               				console.log("*** chat resctado vacio");               			
               			}
               		
               			               			
               	     	// poner el estado del mensaje actual a sent (luego si ha habido error el chat.actions lo cambiara a error)
               			$scope.chat.messages[$scope.chat.messages.length-1].from.status = 'sent';
               			
               			// *********************
               			//2) guardar chat actual
               			// *********************
               			var rq = {
                      		  command: 'save', 
                      		  service: 'api',
                      		  request: {
                      			  data: $scope.chat,
                      			  query: { code: $scope.chat.code },
                      			  collectionname: 'Chats',
                      			  oncompleteeventkey: 'save.done',
                      			  onerroreventkey: 'save.error',
                      			  populate: [{path: 'booking2'}, {path: 'quote'},{path: 'affiliate'},{path: 'userquery'}]
                      		  } 
               			};
               			var rqCB = yto_api.send(rq);
                      
               			// response OK
               			rqCB.on(rqCB.oncompleteeventkey, function (returnchat) {                      	
               			
               				if($scope.chat.quote != null && $scope.chat.quote.status!=null){                		
               					$scope.chat.quote.status = $scope.chat.quote.status;
               				}           
               				// actualizo el chat del scope
               				$scope.chat = returnchat;
                          
               				_refreshChat();

               				if (typeof(callback) == "function"){
               					if(obj != null && obj != undefined){
               						callback(obj);
               					}else {
               						callback();  
               					}                        
               				}                          	
               			});
                      
               			// response KO
               			rqCB.on(rqCB.onerroreventkey, function (err) {                        	
               				$log.error('Error saving chat : ',$scope.chat.code, '. Details: ',err);
               			});
            		});
            		
            		// response KO
           			rqCB.on(rqCB.onerroreventkey, function (err) {                        	
           				$log.error('Error getting chat : ',$scope.chat.code, '. Details: ',err);
           			});
            	}
            };
            
            
            /**
             * recibe dos vectores de mensajes de chat y devuelve uno con los mensajes de la union de los dos y con el estado final de cada mensaje
             */
            var uniqueArrayMessage = function(a, b) {
            	
            	if(a == null || b == null){
            		return null;
            	}
            	// concateno los dos vectores
                var result = a.concat(b);
                
                for(var i=0; i<result.length; ++i) {
                    for(var j=i+1; j<result.length; ++j) {
                        if(equalMessage(result[i], result[j])){
                            result.splice(j--, 1);
                        }
                    }
                }

                return result;
            };
            
            
            /**
             * funcion que compara si son iguales los mensajes
             */
            var equalMessage = function (messageA, messageB){
            	
            	if(messageA == null || messageB == null ){
            		return false;
            	}

            	if(messageA.date == messageB.date && messageA.title == messageB.title && messageA.message == messageB.message && 
            			messageA.to.type == messageB.to.type && messageA.to.email == messageB.to.email && 
            			messageA.from.type == messageB.from.type && messageA.from.email == messageB.from.email ){
            		return true;
            	}
            	return false;            	
            }
            


            $scope.readNewMessages = function(){
                var havechange = false;
                for (var i = $scope.chat.messages.length - 1; i >= 0; i--) {
                    if(debug)
                        console.log('$chat.messages[i].to.id : ',$scope.chat.messages[i].to.id,' - ',$scope.from.id ,'$scope.to.id')
                    if ($scope.chat.messages[i].to.id == $scope.from.id && $scope.chat.messages[i].to.status == 'new'){
                        if(debug)
                            console.log('match : ',$scope.chat.messages[i].message);

                        $scope.chat.messages[i].to.status = 'read';
                        $scope.chat.messages[i].from.status = 'read';
                        havechange = true;
                    }
                };

                _updateChat();

            };


            /**
             *  mail from traveler to dmc (eliminar, esto se hace por el subscriber chat.actions.js)
             */
            var _sendNotificationToDmc = function(message, idmsg){
          
            }

           
            /**
             * notificacion del dmc a traveler (eliminar, esto se hace por el subscriber chat.actions.js)
             */
            var _sendNotificationToTraveler = function(message, idmsg){            
              
             }

            
          
            /**
             * notificacion al admin (eliminar, esto se hace por el subscriber chat.actions.js)
             */
            var _sendNotificationToAdmin = function(message, idmsg){
            
             }
            

            //WATCH both scope variables that are set on the HTML Markup (see the markup..)
            $scope.$watch(function ($scope) { return $scope.referenceobj }, function (oldvalue, newvalue) {    
            	
               if (debug)
            	   console.log(' change  referenceobj :', $scope.referenceobj);
               _init();
            });

            
            $scope.$watch(function ($scope) { return $scope.referencetype }, function (oldvalue, newvalue) {
            	
        		if (debug)
        			console.log(' change  referencetype :', $scope.referencetype);                                	 
                _init();                
            });


            $scope.fromuser = {};
            $scope.touser = {};

            $scope.$watch(function ($scope) { return $scope.fromcode }, function (oldvalue, newvalue) {
                if (debug)
                	console.log(' change  fromcode :', $scope.fromcode);
                    
                if ($scope.fromcode != null && $scope.fromcode != '' && $scope.fromcode != undefined) {                	
                    _getUsers($scope.fromcode, 'from');
                }
            });
            
            $scope.$watch(function ($scope) { return $scope.showempty }, function (oldvalue, newvalue) {
                if (debug)
                	console.log(' change  showEmpty :', $scope.showempty);
                    
                if ($scope.showempty != null && $scope.showempty != '' && $scope.showempty != undefined) {                	
                   _init();                   
                }
            });


            $scope.$watch(function ($scope) { return $scope.tocode }, function (oldvalue, newvalue) {
                if (debug)
                	console.log(' change  to :', $scope.tocode);
                    
                if ($scope.tocode != null && $scope.tocode != '' && $scope.tocode != undefined) {                	
                    _getUsers($scope.tocode, 'to');
                }
            });

            
            /**
             * inicializar el chat
             */
            var _init = function(){           	          	
            	
     
            	 if($scope.referenceobj != undefined && $scope.referenceobj != null && $scope.referenceobj != "" && 
                 		$scope.referencetype != null  &&  $scope.referencetype != '' &&  $scope.referencetype != undefined &&
                 		$scope.fromcode != null && $scope.tocode != null && $scope.fromcode != undefined && $scope.tocode != undefined && 
                 		$scope.from != null && $scope.from.type != null && $scope.from.type != "" && $scope.from.user != null &&   
                 		$scope.to != null && $scope.to.type != null && $scope.to.type != ""  && $scope.to.user != null){            		 
                 
                    console.log("referenceobj: ",$scope.referenceobj);
                	console.log("referencetype: ",$scope.referencetype);            	
                	console.log("usertype: ",$scope.usertype);
                	console.log("userobj: ",$scope.userobj);
                	console.log("totype: ",$scope.totype);
                	console.log("toid: ",$scope.toid);
                	console.log("lang: ",$scope.lang);
                	console.log("tocode: ",$scope.tocode);
                	console.log("fromcode: ",$scope.fromcode);
                	console.log("showEmpty: ",$scope.showempty);  
                	console.log("*** to: ",$scope.to);
                	console.log("*** from: ",$scope.from);
                	 
                    getChat();
                    console.log('after all... hide preloader');
                    $scope.showLoadChat = false;
                }
            };


            /**
             * rescata de mongo los usuarios from y to indicados en la directiva del chat
             */            
            var _getUsers = function (code, roll){
                if (debug)
                    console.log('code : ', code,' roll : ', roll);
                console.log("--------------- getUsers",'code : ', code,' roll : ', roll);
                
                
                // get user from api nueva
        	   	var rq = {
                    command: 'findone',
                    service: 'api',
                    request: {
                        query: { code: code },
                        collectionname: 'Users',
                        populate: [{path: 'roles'}]
                    },           
                };
                var rqCB = yto_api.send(rq);

                // response OK
                rqCB.on(rqCB.oncompleteeventkey, function (data) {
                	if (data != null && data != ''){           	
                		__getUserData(data);
                   } else {
                   		$log.error('Error getting user : ',code);
                   }       	
                });
                
                // response KO
                rqCB.on(rqCB.onerroreventkey, function (err) {                        	
                	$log.error('Error getting user : ',code, '. Details: ',err);
                });	
                
                

                /**
                 * construira el interlecutor en base al usuario
                 */
                function __getUserData(user){
                	                	
                	// **************
                	// es un traveler
                	// **************
                    if(user.isTraveler){                    	
                    	var rq = {
                            command: 'findone',
                            service: 'api',
                            request: {
                                query: { code: code },
                                collectionname: 'Travelers',
                                populate: [{path: 'user'}]
                            },           
                        };
                        var rqCB = yto_api.send(rq);

                        // response OK
                        rqCB.on(rqCB.oncompleteeventkey, function (travel) {
                        	if (travel != null && travel != ''){
                        		
                        		$scope[roll].user = travel;
                                $scope[roll].type = 'traveler';
                                $scope[roll].id = travel._id;                               
                                _buildInterlocutor($scope[roll]);
                           } else {
                           		$log.error('Error getting traveler : ',code);
                           }       	
                        });
                        
                        // response KO
                        rqCB.on(rqCB.onerroreventkey, function (err) {                        	
                        	$log.error('Error getting traveler : ',code, '. Details: ',err);
                        });
                    }
                    
                    // *********
                    // es un dmc
                    // *********
                    if(user.isDMC){
                    	var rq = {
                            command: 'findone',
                            service: 'api',
                            request: {
                                query: { code: code },
                                collectionname: 'DMCs',
                                populate: [{path: 'user'},{path: 'admin'},{path: 'contactuser'}]
                            },           
                        };
                        var rqCB = yto_api.send(rq);

                        // response OK
                        rqCB.on(rqCB.oncompleteeventkey, function (dmc) {
                        	if (dmc != null && dmc != ''){
                        		
                        		$scope[roll].user = dmc;
                                $scope[roll].type = 'dmc';
                                $scope[roll].id = dmc._id;                               
                                _buildInterlocutor($scope[roll]);
                           } else {
                           		$log.error('Error getting dmc : ',code);
                           }       	
                        });
                        
                        // response KO
                        rqCB.on(rqCB.onerroreventkey, function (err) {                        	
                        	$log.error('Error getting dmc : ',code, '. Details: ',err);
                        });        
                    }
                    
                    // **************
                    // es un afiliado
                    // **************
                    if(user.isAffiliate){
                    	
                     	var rq = {
                            command: 'findone',
                            service: 'api',
                            request: {
                                query: { code: code },
                                collectionname: 'Affiliate',
                                populate: [{path: 'user'}]
                            },           
                        };
                        var rqCB = yto_api.send(rq);

                        // response OK
                        rqCB.on(rqCB.oncompleteeventkey, function (affiliate) {
                        	if (affiliate != null && affiliate != ''){
                        		
                        		console.log("++ afiliado: ",affiliate);
                        		
                        		$scope[roll].user = affiliate;
                                $scope[roll].type = 'affiliate';
                                $scope[roll].id = affiliate._id;                               
                                _buildInterlocutor($scope[roll]);
                           } else {
                           		$log.error('Error getting affiliate : ',code);
                           }       	
                        });
                        
                        // response KO
                        rqCB.on(rqCB.onerroreventkey, function (err) {                        	
                        	$log.error('Error getting affiliate : ',code, '. Details: ',err);
                        });
                    }
                    
                    // ********
                    // is admin
                    // ********
                    if(user.isAdmin){
                    		
                		$scope[roll].user = user;
                        $scope[roll].type = 'admin';
                       // $scope[roll].id = affiliate._id;                               
                        _buildInterlocutor($scope[roll]);
                    }
                }
            }



            //put here the rest of the code for the full featured OMT CHAT directive
            $scope.placeholder = function(){
                if ($scope.chat == null || $scope.chat == '' || $scope.chat == undefined){
                    if ($scope.lang =='ES'){
                        return 'escribe tu mensaje aquí...'
                    }else {
                        return 'write here your message...'
                    }
                } else {
                    if ($scope.lang =='ES'){
                        return 'escribe tu respuesta aquí...'
                    } else {
                        return 'write here your answer...'
                    }
                }
            };
            

            $scope.translate = function(langOrg, langDes, toTranslate, obj){

                //openmarket_api_service.translate(toTranslate, langOrg, langDes, 'google', function (translations) {
                //    if (translations.ResultOK) {
                //            obj.translation = translations.Translation[0];
                //            obj.showTranslation = true;
                //     } else {
                //         toaster.pop('error', 'Error translating text', 'The text ' + text + ' was unable to translate. Try again');
                //     }
                     
                //});

            }

            $scope.notification = function(subject, template, contentObj, to, callback) {
                var postdata = {
                    to:to,
                    subject: subject,
                    mailtemplate: template,
                    mailparameter: contentObj
                }
                var response = false;
                if (debug)
                    console.log('postdata',postdata);
                http_service.http_request($scope.urlapi + 'omt/SendEmailNotification', 'POST', '', postdata).then(
                function (res) {
                    if (res.ResultOK){
                        if(debug)
                            $log.info("Send Notification OK");

                        toaster.pop('success', 'Message sent successfully.', 'We have sent message to '+postdata.mailparameter.to.name);
                        response = true;
                    } else {
                        if(debug)
                            $log.error(res.Message);
                        
                        toaster.pop('error', 'Error sending message', 'We have problems with the service, please retry later.');
                        response = false;
                    }
                    if (angular.isFunction(callback)){
                        callback(response);
                    }
                },
                function (err) {
                    $log.error("error sending notification");
                    //throw 'An unknown error has ocurred sending notifications';
                        if (angular.isFunction(callback)){
                            callback(response);
                        }
                    }
                );
            };

            $scope.gotoElement = function(id) {
                $location.hash(id);
                anchorSmoothScroll.scrollTo(id);
            };

            $scope.$watch(function () { return $location.hash(); }, function (hash) {
                if (hash == "messageBox") {
                    $scope.gotoElement("messageBox");
                }
            });

        }
    }
}]);