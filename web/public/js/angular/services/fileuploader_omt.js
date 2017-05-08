var app = angular.module("openMarketTravelApp");

app.service('openmarket_file_uploader', function () {
    // Get an XMLHttpRequest instance
    var _xhr = new XMLHttpRequest();
    var _input;
    function _upload_file_v2(fileinput, successcallback, errorcallback, progresscallbak) {
        try {
            _input = document.getElementById(fileinput);


        }
        catch (err) {
            if (errorcallback) {
                errorcallback(err);
            }
        }

    }

    function _upload_file(file, successcallback, errorcallback, progresscallback) {
        try {
        	
            var url = 'http://openmarketprd.cloudapp.net:3000/api/uploadfile';
        	
            console.log(file.type);
            
            _xhr = new XMLHttpRequest();
            _xhr.upload.currentProgress = 0;
            _xhr.upload.startData = 0;
            if (progresscallback) {
                _xhr.upload.addEventListener('progress', progresscallback);
            }
            if (successcallback) {
                _xhr.addEventListener('readystatechange',
                successcallback);
            }
            // Set up request
            _xhr.open('POST', url, true);
            _xhr.setRequestHeader('X-File-Size', file.size);
            _xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            var theformData = new FormData();

            theformData.append('openmarketimages', file);
            _xhr.send(theformData);
        }
        catch (err) {
            if (errorcallback) { errorcallback(err) };
        }

    }

    function _upload_file_local(file, uploadtype, successcallback, errorcallback, progresscallback) {
        try {
      
            var url = 'http://openmarketprd.cloudapp.net:3000/api/uploadfile';            
            
            if (uploadtype == 'insurance') {
                url += 'insurance';
            }
            if (uploadtype == 'certification') {
                url += 'certification';
            }
            console.log(file.type);
            //if (
            //    file.type != 'image/png' |
            //    file.type != 'image/jpg' |
            //    file.type != 'image/jpeg' |
            //    file.type != 'image/gif' |
            //    file.type != 'image/jpeg') {
            //    throw "File doesnt match png, jpg or gif";
            //    return;
            //}
            _xhr = new XMLHttpRequest();
            _xhr.upload.currentProgress = 0;
            _xhr.upload.startData = 0;
            if (progresscallback) {
                _xhr.upload.addEventListener('progress', progresscallback);
            }
            if (successcallback) {
                _xhr.addEventListener('readystatechange',
                successcallback);
            }
            // Set up request
            _xhr.open('POST', url, true);
            _xhr.setRequestHeader('X-File-Size', file.size);
            _xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
            var theformData = new FormData();

            theformData.append('openmarketfile', file);
            _xhr.send(theformData);
        }
        catch (err) {
            if (errorcallback) { errorcallback(err) };
        }

    }

    return ({
        uploadFile: _upload_file,
        uploadFileLocal: _upload_file_local
    });
});

//XML HTTP Request ... [service uploader]
(function (module) {

    var xhrFileUploader = function ($q) {

        var onprogress = function (httpRequest, scope) {
            return function (event) {
                scope.$broadcast("HttpfileProgress",
                    {
                        loaded: event.loaded,
                        total: event.total
                    });
            }
        };

        var onreadystatechange = function (httpRequest, deferred, scope) {
            return function (event) {
                var status = null;
                try {
                    status = event.target.status;
                }
                catch (e) {
                    return;
                }

                if (((status >= 200 && status < 300) || status == 304)) {
                    console.log(event);
                    var result = event.target.response;
                    if (result != null && result != '') {
                        console.log ('result ',result);
                        result = JSON.parse(result);
                        scope.$apply(function () {
                            deferred.resolve(result);
                        });
                    }
                }
            }
        };

        var getXHTTP = function (deferred, scope) {
            var _xhr = new XMLHttpRequest();
            _xhr.upload.currentProgress = 0;
            _xhr.upload.startData = 0;
            _xhr.upload.onprogress = onprogress(_xhr, scope);
            _xhr.onreadystatechange = onreadystatechange(_xhr, deferred, scope);
            return _xhr;
        };


        var _upload_file = function (file, scope) {
            var deferred = $q.defer();
           
            var xhrUploader = getXHTTP(deferred, scope);

           // var url = 'http://localhost:3000/api/uploadfile';
            var url = 'http://openmarketprd.cloudapp.net:3000/api/uploadfile';
            //var url = 'http://localhost:1000/upload/cloudinary'
            // var actualserver = '/upload/cloudinary';
            // var url = actualserver;
            // Set up request
            xhrUploader.open('POST', url, true);
            xhrUploader.setRequestHeader('X-File-Size', file.size);
            xhrUploader.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
            var theformData = new FormData();

            theformData.append('openmarketimages', file);
            xhrUploader.send(theformData);

            return deferred.promise;
        };

        
        var _upload_file_local = function (file, uploadtype, scope) {
            var deferred = $q.defer();
           
            var xhrUploader = getXHTTP(deferred, scope);   
        	       
    		
    		// var url = 'http://localhost:3000/api/uploadfile'; //for
				// TESTING
            //var url = 'http://openmarketprd.cloudapp.net:3000/api/uploadfile';
            //var url = 'http://localhost:1000/upload/';
            
             var actualserver = '/upload/';
             var url = actualserver;
            
            

            if (uploadtype == 'insurance') {
                 url += 'insurance';
            }
            if (uploadtype == 'certification') {
                 url += 'certification';
            }
            if (uploadtype == 'invoiceprovider') {            	
                 url += 'invoiceprovider';      
             }
            
            console.log("------> (fileUpload_omt) Url upload: ", url);
                          
            // 1) filtrado de tipos de fichero (SOLO PARA INVOICEPROVIDER)
            // solo dejamos .jpg,.png,.pdf,.doc,.docx,.xls,.xlsx
            var validExtensions = ["jpg","png","pdf","doc","docx","xls","xlsx"];
            var name =file.name;
        	var extension = name.substr(name.lastIndexOf(".")+1,name.length);
             
        	// si es de tipo insurance o certification no compruebo la extension, si es de tipo invoiceprovider si
            if(uploadtype != 'invoiceprovider' || validExtensions.indexOf(extension)!=-1){
	             // Set up request
	             xhrUploader.open('POST', url, true);
	             xhrUploader.setRequestHeader('X-File-Size', file.size);
	             xhrUploader.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
	             var theformData = new FormData();
	
	             theformData.append('openmarketfile', file);
	             xhrUploader.send(theformData);
	
	             return deferred.promise;
	    	}
	    	// error de extension
	    	else{        		
	    		console.log("enxtension:"+extension+" no valida.");
	    		scope.$apply(function () {
	    		
	    			if(scope!=null && scope.updateInvoiceComplete()!=null){        			
		        		scope.updateInvoiceComplete();
		        	}        		
	    		});        		
	    	}    
        }

        return {
            uploadFile: _upload_file,
            uploadFileLocal: _upload_file_local
        };

    }

    module.factory('xhrFileUploader', ['$q', xhrFileUploader]);

}(angular.module('openMarketTravelApp')));

//File Reader... [Utils for preview image]
(function (module) {
    console.log('File reader module...');

    var fileReader = function ($q) {

        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            }
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            }
        };

        var onProgress = function (reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };

        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };

    };

    //add module to openMarketTravelApp module...
    module.factory("fileReader",
                   ["$q", "$log", fileReader]);

}(angular.module('openMarketTravelApp')));