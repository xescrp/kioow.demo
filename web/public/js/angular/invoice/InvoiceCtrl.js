//*******************************************************
// controler para el popup de la generacion de la factura
//*******************************************************

app.controller("InvoiceCtrl", function (
	$scope,
	$uibModalInstance,
	$http,
	items,
	tools_service,
	http_service,
	toaster,
	yto_api) {
    	 //inicializo booking y product con lo que le paso desde la pantalla de booking
        $scope.booking = items[0];

        $scope.dmcproduct = items[1];

        $scope.targetname = items[3];
        $scope.sourcename = items[2];

		// load over template invoice
		$scope.showLoadInvoice = false;

		/**
		 * funcion que cierra/oculta el moodal
		 */
        $scope.invoice = {
            name: '',
            date: new Date(),
            invoicenumber: '',
            target: $scope.targetname, //provider, agency, traveler, travelersense 
            source: $scope.sourcename, //provider, agency, traveler, travelersense
            file: null,
            city: '',
            amount: 0,
            cp: '',
            idnumber: '',
            taxinvoice: $scope.sourcename == 'agency' ? 21 : 0,
            address: '',
            country: {
                name_es: '',
                name: '',
                countrycode: ''
            },
            booking: { _id: $scope.booking._id, idBooking: $scope.booking._id }
        };

        
	    $scope.cancel = function () {
	        $uibModalInstance.dismiss('cancel');
	    };
	    
	    $scope.local = {
				priceperson : 0,
				pax: 0,
				subtotalpax: 0,
				subtotal: 0,
				total: 0,
				dmcvat: 0, // importe sobre el total, aplicando el vat
				vat: 0,   //valor vat que ponen en la factura
				omtdis: 0,
				omt: 0,
				topay: 0,
				invoicenumber: '',
				amountProvider: null,
				comments: '',
				invoiceDate : ''
			}
	    /**
	     * inicializa totales,netos e impuestos de la reserva
	     */
	    function _init () {		
	    		    	
			var r = $scope.local;
			_getPricePerson();
			r.pax=$scope.totalPax;
			
			//(neto dmc)			
			r.subtotalpax = $scope.booking.breakdown.agency.payment;
			r.total = r.subtotalpax;
			r.topay = r.subtotalpax;
			
			// calcular en base al vat seleccionado en la pantalla
			r.subtotal = r.topay / (1 +(parseInt(r.dmcvat)/100));
			r.subtotal = r.subtotal.toFixed(2);
			
			// regla del porcentaje amount/(1+(tax/100));
			r.vat = r.subtotal * (parseInt(r.dmcvat)/100);
            r.vat = r.vat.toFixed(2);

            var inv = recoverInvoice();
            (inv != null) ? $scope.invoice = inv : null;
//			//rellenar la fecha de la factura con la fecha actual (dd-mm-yyy)
//			var fec = new Date();
//			$scope.local.invoiceDate = fec.getDate() + "-" + (fec.getMonth()+1) + "-" + fec.getFullYear();
		}
	    
	
	    /**
	     * recalcula importes en funcion de los impuestos introducidos por el dmc
	     */
	    $scope.recalculate = function(){	
	    	if($scope.local.dmcvat<0)
	    		$scope.local.dmcvat=0;
	    	if($scope.local.dmcvat>100)
	    		$scope.local.dmcvat=100;
	    		
	    	_init();
	    }	    
	    
	    /**
	     * genera el pdf con la factura y guardar
	     * en base de datos el numero de factura
	     */
	    $scope.generateInvoice = function(callback){
	    	
	    	
	    	$scope.showLoadInvoice = true;
	    	// 1) validar campos
	    	
	    	// 1.1) validar numero de factura
	    	if($scope.invoice.invoicenumber == null ||
                $scope.invoice.invoicenumber== ''){
	    		toaster.pop('error',"Error Invoice Number","Please, enter a invoice number.",5000);
	    		//alert("Please, enter a invoice number.");
                tools_service.showPreloader($scope, 'hide');
	    		return;
	    	}
	    		    	
	    	// 1.2) validar comentarios
	    	if($scope.local.comments.length>400)
	    		$scope.local.comments = $scope.local.comments.substring(1, 400);
	    	
	    	// 1.3) validar fecha de la factura	    	
	   // 	if($scope.local.invoiceDate == null ||
	   // 		$scope.local.invoiceDate== '' ||
	   // 		$scope.local.invoiceDate.indexOf('-') == -1
	   // 			|| $scope.local.invoiceDate.split('-').length != 3){
				//toaster.pop('error',"Error Invoice Date","Please, enter a valid date.",5000);
	   // 		//alert("Please, enter a valid date.");
	   // 		return;
	   // 	}
	    	//generar la fecha correctamente (dd-mm-yyy)
	    	var parts = $scope.local.invoiceDate.split('-');
	    	$scope.booking.invoiceProviderDate = new Date(parts[2] + '-' + parts[1] + '-' + parts[0]);	    	

	    	// 2) generar factura en html
            tools_service.showPreloader($scope, 'show');
	    	_getInvoicePrint($scope.local, $scope.local.vat, $scope.dmcproduct,$scope.booking , function(result){	    		

	    		// 3) llamo al core para convertirlo en pdf	    		
	    		//nombre de la factura IDBOOKING - NUM.INVOICE
	    		var namefile = $scope.booking.idBooking + '-' +$scope.invoice.invoicenumber;
		    	//************************************************************************************
		    	//*version nueva llamando al api de yto
		    	//************************************************************************************
		    	
	    		// 2) llamo al core para convertirlo en pdf
		    	var rqCB = yto_api.post('/download/getpdffromhtml', {
	    		    html: result,
	    		    type: 'invoiceprovider',
	    		    namefile: namefile
	    		});
	    		
		    	//response OK
	    		rqCB.on(rqCB.oncompleteeventkey, function (invoicePdf) {
	    			
	    			//si se ha generado bien
	    			if(invoicePdf!=null && invoicePdf.url != null ){
                        // 4) forzar descarga del pdf
                        $scope.invoice.file = invoicePdf;
		    			$scope.invoiceProviderUrl = invoicePdf.url;	 
		    			//eventFire(document.querySelector("#invoicelink") ,"click");   			
                        window.open(invoicePdf.url, '_blank');
                        callback != null ? callback(summaryPdf.url) : null;

                        tools_service.showPreloader($scope, 'hide');
		    			// 5) guardar en base de datos en 
		    			//$scope.booking.invoiceProvider = $scope.local.invoicenumber;//factura del proveedor
		    			
		    			//// 6) guardo la ruta de la factura generada, en el objeto actual para descargarla mas veces
		    		 //   $scope.booking.voucherProviderUrlFile= invoicePdf.url;
		    					    		   
		    			//// 7) guardar nombre de la factura en bd
		    			//var pathFile = invoicePdf.url;
		       //     	var nameFile = pathFile.substr(pathFile.indexOf('/?file=')+7);
		       //     	nameFile = nameFile.substr(0,nameFile.indexOf('&type'));
		    			////$scope.booking.invoiceProviderFile = nameFile; // nombre del archivo de la factura
		       //     	$scope.booking.invoiceProviderFile = invoicePdf.url;
		    			
		    			//// 8) guardar la reserva (llamando a api yto)
		    		 //   var rq = {
	    				//	  command: 'save',
	    				//	  service: 'api',
	    				//	  request: {
	    				//		  data: $scope.booking,
	    				//		  query: { idBooking: $scope.booking.idBooking },
	    				//		  populate: [{path: 'affiliate'}, {path: 'dmc'}],
	    				//		  collectionname: 'Bookings',
	    				//		  oncompleteeventkey: 'save.done',
	    				//		  onerroreventkey: 'save.error',
	    				//	  } 
	    			 // 	};
	    				//var rqCB = yto_api.send(rq);

	    				//// response ok
	    				//rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
	    				//	console.info("info booking updated: ",rsp);	 
			    		//	$uibModalInstance.close({msg : 'ok', data: rsp});
	    				//});
	    				////on response noOk
	    				//rqCB.on(rqCB.onerroreventkey, function (err) {
	    				//	console.log('Error updating booking. Details: ',err);
	    				//	$uibModalInstance.close({msg : 'save error', err : err});
	    				//});
                        $uibModalInstance.close({ msg: 'ok', data: $scope.invoice });
	    			}
	    			
	    			//error al generar factura 
	    			else{
						$scope.showLoadInvoice = false;
                        $uibModalInstance.close({ msg: 'pdf error', err: err });
                        tools_service.showPreloader($scope, 'hide');
	    			}	 
	    				
	    			
	    		});            
	    		//response noOk
	    		rqCB.on(rqCB.onerroreventkey, function (err) {
	    			$scope.showLoadInvoice = false;				
                    $uibModalInstance.close({ msg: 'save error', err: err });		
                    tools_service.showPreloader($scope, 'hide');			
	    		});    
	    	});	 
	    };
	    
        function recoverInvoice() {
            return _.find($scope.booking.invoices, function (invoice) {
                return invoice.target.toLowerCase() == $scope.targetname.toLowerCase();
            });
        }
	    
	    /**
	     * funcion que dispara evento para descargar un archivo 
	     */
	    function eventFire(el, etype){
    	  if (el.fireEvent) {
    	    el.fireEvent('on' + etype);
    	  } else {
    	    var evObj = document.createEvent('Events');
    	    evObj.initEvent(etype, true, false);
    	    el.dispatchEvent(evObj);
    	  }
    	}

        var hashurl = {
            'agency': '/affiliate-invoice-wl-to-print',
            'provider': '/invoice-to-print',
            'travelersense': '/invoice-to-print'
        };

        var hashdata = {
            'agency': function () {
                return {
                    invoiceamount: $scope.booking.breakdown.agency.wl.total,
                    invoicenumber: $scope.invoice.invoicenumber,
                    invoicedate: $scope.invoice.date
                }
            },
            'provider': function () {
                return {
                    invoiceamount: $scope.booking.breakdown.provider.net,
                    invoicenumber: $scope.invoice.invoicenumber,
                    invoicedate: $scope.invoice.date
                }
            },
            'travelersense': function () {
                return {
                    invoiceamount: $scope.booking.breakdown.agency.net,
                    invoicenumber: $scope.invoice.invoicenumber,
                    invoicedate: $scope.invoice.date
                }
            }
        }

	    
	    function _getInvoicePrint(local, vat, dmcproduct, booking, callback) {    	

            var fetch_url = booking.bookingmodel != 'whitelabel' ? '/affiliate-invoice-to-print' : '/affiliate-invoice-wl-to-print';

            fetch_url = hashurl[$scope.sourcename];
            
            var interdata = hashdata[$scope.sourcename]();

            var postdata = {
                local: local,
                vat: vat,
                dmcproduct: dmcproduct,
                booking: booking,
                invoiceamount: interdata.invoiceamount,
                invoicenumber: interdata.invoicenumber,
                invoicedate: interdata.invoicedate.toLocaleDateString(),
                invoicesource: $scope.sourcename
            };

            
	    	 return $http({
	    	        //method: 'GET',
	    		    method: 'POST',
	    	        url: fetch_url,
	    	        //params: postdata,
	    	        data: postdata,
	    	        headers: {}
	    	        //headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
	    	     }).success(function(data){
	    	    	 //console.log(data);   
	    	    	 callback(data);
	    	    }).error(function(){
	    	        alert("error");
	    	    });		
	     } 
	    
	    
		//precio por persona
	    function _getPricePerson(){

            var totalPax = $scope.booking.paxes.length;
            var priceperson = $scope.booking.pricing.amount / totalPax;
            return priceperson;
		}
    		
        //carga las imagenes del cloudinary
        $scope.getimage = function (url, imagename) {
           return tools_service.cloudinaryUrl(url, imagename);
        };		
        
        
        /**
         * funcion que muestra el error al intentar subir una factura con diferencia de precio
         */
        $scope.feedbackErrorEN = function(){
            var feedback = 'Please, fill the invoice number and amount fields';
            if ($scope.invoice.invoicenumber == null || $scope.invoice.invoicenumber == ""){
                feedback = "Empty invoice number. Please insert one.";
        	}
            if ($scope.invoice.amount == null || $scope.invoice.amount == 0){
                feedback = "Empty amount. Please insert one.";
            }
            if ($scope.invoice.file == null || $scope.invoice.file.url == '') {
                feedback = "Empty file. Please attach the file to the form.";
            }
            feedback = !checkAmount() ? feedbackamount('EN') : feedback;
         //   if (($scope.booking.breakdown.provider.net != $scope.invoice.amount) || $scope.invoice.amount == 0){
         //       feedback = "Sorry, original amount was " + $scope.booking.breakdown.provider.net + " Now is " + $scope.invoice.amount + " Please contact with us.";
        	//}
            return feedback;
        };

        $scope.feedbackErrorES = function () {
            var feedback = 'Porfavor, informa los campos nº de factura e importe';
            if ($scope.invoice.invoicenumber == null || $scope.invoice.invoicenumber == "") {
                feedback = "Numero de factura vacio. Por favor, se requiere informar este campo.";
            }
            if ($scope.invoice.amount == null || $scope.invoice.amount == 0) {
                feedback = "Importe vacio. Por favor, se requiere informar este campo.";
            }
            if ($scope.invoice.file == null || $scope.invoice.file.url == '') {
                feedback = "No se ha cargado ningun archivo, por favor adjunta el archivo de tu factura.";
            }
            feedback = !checkAmount() ? feedbackamount('ES') : feedback;
            //if (($scope.booking.breakdown.agency.payment != $scope.invoice.amount) || $scope.invoice.amount == 0) {
            //    feedback = "El importe original es de " + $scope.booking.breakdown.agency.payment + ", no coincide con el importe " + $scope.invoice.amount + " introducido.";
            //}
            return feedback;
        };
    

        /**
         * funcion que comprueba que puede subir la factura
         */
        $scope._checkInvoice = function(){
            return ($scope.invoice.invoicenumber != null && $scope.invoice.invoicenumber != "") &&
                ($scope.invoice.amount != null && $scope.invoice.amount > 0) && 
                ($scope.invoice.file != null && $scope.invoice.file.url != '') &&
                checkAmount();       	
        }

        function feedbackamount(lang) {
            var rs = false;
            var amount = 0;
            var feedback = (lang == 'ES') ?
                'El importe original es de %topay%, no coincide con el importe ' + $scope.invoice.amount + ' introducido.' :
                'Sorry, original amount was %topay%. Now is ' + $scope.invoice.amount + ', please contact with us.';

            rs = $scope.sourcename == 'provider' ? $scope.booking.breakdown.provider.net == $scope.invoice.amount : rs;
            rs = $scope.sourcename == 'travelersense' ? $scope.booking.breakdown.agency.net == $scope.invoice.amount : rs;
            rs = $scope.sourcename == 'agency' ? $scope.booking.breakdown.agency.wl.total == $scope.invoice.amount : rs;

            amount = $scope.sourcename == 'provider' ? $scope.booking.breakdown.provider.net : amount;
            amount = $scope.sourcename == 'travelersense' ? $scope.booking.breakdown.agency.net : amount;
            amount = $scope.sourcename == 'agency' ? $scope.booking.breakdown.agency.wl.total : amount;

            console.log($scope.booking.breakdown);

            if (!rs) { return feedback.replace('%topay%', amount); } else { return null; }
        }

        function checkAmount() {
            var rs = false;
            rs = $scope.sourcename == 'provider' ? $scope.booking.breakdown.provider.net == $scope.invoice.amount : rs;
            rs = $scope.sourcename == 'travelersense' ? $scope.booking.breakdown.agency.net == $scope.invoice.amount : rs;
            rs = $scope.sourcename == 'agency' ? $scope.booking.breakdown.agency.wl.total == $scope.invoice.amount : rs;
            return rs;
        }
        /**
         * funcion que recibe la accion de subir el fichero, si todo es correcto y lo guarda en el servidor
         */
        $scope.fileuploaded = function () {
            console.log($scope.invoice);
        }

        $scope.$on('fileuploaded', function (ev, file) {
            //$scope.invoice.file = file;
            console.log($scope.invoice);
        });

        $scope.updateInvoiceComplete = function (callback) {
            $scope.showLoadInvoice = true;
            $scope.invoice.name = [$scope.booking.idBooking, $scope.invoice.invoicenumber].join('-');
            if ($scope.invoice != null && $scope.invoice.file != null && $scope.invoice.file.url != '') {

                var iquery = $scope.invoice._id != null && $scope.invoice._id != '' ? { _id : $scope.invoice._id } : { name: $scope.invoice.name, target: $scope.targetname };

                var req = {
                    data: $scope.invoice,
                    collectionname: 'Invoices',
                    query: iquery
                }
                var rq = {
                    command: 'save',
                    service: 'api',
                    request: req
                };

                var rqCB = yto_api.send(rq);

                rqCB.on(rqCB.oncompleteeventkey, function (rsp) {
                    console.log('invoice saved properly');
                    $scope.invoice = rsp;
                    //var inv = _.find($scope.booking.invoices, function (invoice) {
                    //    return (invoice.target.toLowerCase() == $scope.targetname.toLowerCase()) && (invoice.source.toLowerCase() == $scope.sourcename.toLowerCase());
                    //});

                    //inv != null ? inv = $scope.invoice : $scope.booking.invoices.push($scope.invoice);
                    $scope.booking.invoicesprovider == null ? $scope.booking.invoicesprovider = [] : null;
                    $scope.booking.invoicestravelersense == null ? $scope.booking.invoicestravelersense = [] : null;
                    $scope.booking.invoicesagency == null ? $scope.booking.invoicesagency = [] : null;

                    $scope.sourcename == 'provider' ? $scope.booking.invoicesprovider.push(rsp) : null;
                    $scope.sourcename == 'travelersense' ? $scope.booking.invoicestravelersense.push(rsp) : null;
                    $scope.sourcename == 'agency' ? $scope.booking.invoicesagency.push(rsp) : null;

                    $scope.showLoadInvoice = false;
                    $uibModalInstance.close({ msg: 'ok' });

                    if (callback != null && typeof (callback) === 'function') { callback(null, rsp); }
                });
                //on response noOk
                rqCB.on(rqCB.onerroreventkey, function (err) {
                    console.log(err, null);
                    $scope.showLoadInvoice = false;
                    console.log("Error uploading invoice. Conection error. Please try again later.");
                    $scope.errorServerSave = true;
                    $uibModalInstance.close({ msg: 'connection error' });
                    if (callback != null && typeof (callback) === 'function') { callback(err, pay); }
                });
                return rqCB;
            }

        }

        
        // init controller 
        _init();

});