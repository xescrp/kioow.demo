app.service('http_service', function ($http, $q) {
    return ({
        http_request: _http_request,
        http_request_with_headers: _http_request_with_headers
    });

    function _http_request(requesturl, requestmethod, requestparameters, requestdata) {
        // set headers $http.defaults.headers.
        var request = $http({
            method: requestmethod,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            },
            url: requesturl,
            params: requestparameters,
            data: requestdata
        });

        return (request.then(requestSuccess, requestError));
    }

    function _http_request_with_headers(requesturl, requestheaders, requestmethod, requestparameters, requestdata) {
        var request = $http({
            method: requestmethod,
            headers: requestheaders,
            url: requesturl,
            params: requestparameters,
            data: requestdata
        });

        return (request.then(requestSuccess, requestError));
    }

    function requestError(response) {
        //console.log(response);
        if (response != null && response.data == null) {

            return ($q.reject("An unknown error occurred."));

        }
        var errorMessage = response.data.message || response.data.Message;
        return ($q.reject(errorMessage));
    }

    function requestSuccess(response) {

        return (response.data);

    }
});