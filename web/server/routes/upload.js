
module.exports = function (app) {
    var cloudconfig = app.uploadconfiguration.cloudinary;
    var uploadconfig = app.uploadconfiguration.upload;
    var whitelabelbasepath = app.uploadconfiguration.whitelabelpath;

    var common = require('yourttoo.common');
    //Upload files management..
    var multer = require('multer');
    var swig = require('swig');
    var utils = common.utils;
    
    var whitelabelcustomsheader = multer.diskStorage({
        destination: function (req, file, cb) {
            var loginsession = req.defaultcontent.loginsession;
            var finalpath = loginsession != null && loginsession.affiliate != null &&
                loginsession.affiliate.wlcustom != null &&
                loginsession.affiliate.wlcustom.code != '' ?
                [whitelabelbasepath, loginsession.affiliate.code].join('/') : [whitelabelbasepath, 'unknown'].join('/');

            var fs = require('fs');
            common.utils.directoryExists(finalpath, 0744, function (err) {
                cb(null, finalpath);
            });  
        },
        filename: function (req, file, cb) {
            var filename = 'wl-header.html.swig';
            //the name...
            cb(null, filename)
        }
    });

    var whitelabelcustomsfooter = multer.diskStorage({
        destination: function (req, file, cb) {
            var loginsession = req.defaultcontent.loginsession;
            var finalpath = loginsession != null && loginsession.affiliate != null &&
                loginsession.affiliate.wlcustom != null &&
                loginsession.affiliate.wlcustom.code != '' ?
                [whitelabelbasepath, loginsession.affiliate.code].join('/') : [whitelabelbasepath, 'unknown'].join('/');
            var fs = require('fs');
            common.utils.directoryExists(finalpath, 0744, function (err) {
                cb(null, finalpath);
            });  
        },
        filename: function (req, file, cb) {
            var filename = 'wl-footer.html.swig';
            //the name...
            cb(null, filename)
        }
    });

    var storageimages = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadconfig.path + uploadconfig.cloudinary)
        },
        filename: function (req, file, cb) {
            var filename = utils.getToken() + '.' + utils.getfileextension(file.originalname);
            //the name...
            cb(null, filename)
        }
    });
    
    var storagevouchers = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadconfig.path + uploadconfig.vouchers)
        },
        filename: function (req, file, cb) {
            var filename = utils.getToken() + '.' + utils.getfileextension(file.originalname);
            //the name...
            cb(null, filename)
        }
    });
    
    var storageinsurances = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadconfig.path + uploadconfig.insurances);
        },
        filename: function (req, file, cb) {
            var filename = utils.getToken() + '.' + utils.getfileextension(file.originalname);
            //the name...
            cb(null, filename)
        }
    });
    
    var storagecertificates = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadconfig.path + uploadconfig.certificates);
        },
        filename: function (req, file, cb) {
            var filename = utils.getToken() + '.' + utils.getfileextension(file.originalname);
            //the name...
            cb(null, filename)
        }
    });
    
    var storageinvoice = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadconfig.path + uploadconfig.invoice);
        },
        filename: function (req, file, cb) {
            var filename = utils.getToken() + '.' + utils.getfileextension(file.originalname);
            //the name...
            cb(null, filename)
        }
    });
    
    var uploadimages = multer({ storage: storageimages });
    var uploadvouchers = multer({ storage: storagevouchers });
    var uploadinsurances = multer({ storage: storageinsurances });
    var uploadcertificates = multer({ storage: storagecertificates });
    var uploadinvoices = multer({ storage: storageinvoice });
    var uploadewhitelabelheader = multer({ storage: whitelabelcustomsheader });
    var uploadewhitelabelfooter = multer({ storage: whitelabelcustomsfooter });

    app.post('/upload/whitelabel/header', uploadewhitelabelheader.single('openmarketfile'), function (req, res) {

        var file = req.file;
        var target_path = file.destination + '/' + file.filename;

        res.send({ ResultOK: true, file: target_path });
    });

    app.post('/upload/whitelabel/footer', uploadewhitelabelfooter.single('openmarketfile'), function (req, res) {

        var file = req.file;
        var target_path = file.destination + '/' + file.filename;

        res.send({ ResultOK: true, file: target_path });
    });

    app.post('/upload/cloudinary', uploadimages.single('openmarketimages'), function (req, res) { 
        var file = req.file;
        var target_path = file.destination + '/' + file.filename;

        var cloudinary = require('cloudinary');
        cloudinary.config(cloudconfig);
        cloudinary.uploader.upload(target_path, function (result) {
            res.send(result);
        });
    });

    app.post('/upload/voucher', uploadvouchers.single('openmarketfile'), function (req, res) { 
        var file = req.file;
        var target_path = file.destination + '/' + file.filename;

        var cloudinary = require('cloudinary');
        cloudinary.config(cloudconfig);
        cloudinary.uploader.upload(target_path, function (result) {
            res.send(result);
        });

    });

    app.post('/upload/insurance', uploadinsurances.single('openmarketfile'), function (req, res) { 
        var file = req.file;
        var target_path = file.destination + '/' + file.filename;

        var cloudinary = require('cloudinary');
        cloudinary.config(cloudconfig);
        cloudinary.uploader.upload(target_path, function (result) {
            res.send(result);
        });
    });

    app.post('/upload/certification', uploadcertificates.single('openmarketfile'), function (req, res) { 
        var file = req.file;
        var target_path = file.destination + '/' + file.filename;

        var cloudinary = require('cloudinary');
        cloudinary.config(cloudconfig);
        cloudinary.uploader.upload(target_path, function (result) {
            res.send(result);
        });
    });

    app.post('/upload/invoice', uploadinvoices.single('openmarketfile'), function (req, res) {
    	
        var file = req.file;
        var target_path = file.destination + '/' + file.filename;

        var cloudinary = require('cloudinary');
        cloudinary.config(cloudconfig);
        cloudinary.uploader.upload(target_path, function (result) {
            res.send(result);
        });
    });
    
    /**
     * facturas del proveedor
     */
    app.post('/upload/invoiceprovider', uploadinvoices.single('openmarketfile'), function (req, res) { 
    	
        var file = req.file;
        var target_path = file.destination + '/' + file.filename;

        var cloudinary = require('cloudinary');
        cloudinary.config(cloudconfig);
        cloudinary.uploader.upload(target_path, function (result) {
            res.send(result);
        });
    });

    app.post('/upload/invoiceaffiliate', uploadinvoices.single('openmarketfile'), function (req, res) {

        var file = req.file;
        var target_path = file.destination + '/' + file.filename;

        var cloudinary = require('cloudinary');
        cloudinary.config(cloudconfig);
        cloudinary.uploader.upload(target_path, function (result) {
            res.send(result);
        });
    });
    
    

    /**
     * funcion que renombra una factura del proveedor con otro nombre
     */
    app.get('/upload/renamefileinvoice', function (req, res) {   
    	    	
    	 var source = req.query.source;
         var destination = req.query.dest;           
         console.log("name file source: "+source);
         console.log("name fila destination: "+destination);
         
         var fs = require('fs');
        
         
         var target_path = uploadconfig.path + uploadconfig.invoice+'/';
         
         
         var origFile = target_path+source;
         var finalFile = target_path+destination;
         
         console.log("fichero original: "+origFile);
         console.log("fichero destino: "+ finalFile);
         
         // 1) copiar el fichero al destino
         copyFile(origFile, finalFile, function (err) {
             if (err) {
                 console.log(err);
                 res.send(err);
             }
             else {
                 //copy done...
                 console.log('File copied ok!');
                 console.log("Deleting... file: ",origFile);
                 var fs = require('fs-extra');
                 
                 // 2) eliminar el fichero original
                 fs.remove(origFile, function(err){
                 	  if (err){
                 		  //return console.error(err);
                 		  console.log("Error deleting file: ",origFile);
                 	  }

                 	  res.send();

                 	  console.log("success deleted!")
                 	});
             }

         });

    });
    
    
    //Start Aux copy..
    function copyFile(source, target, cb) {

        var fs = require('fs');

        var cbCalled = false;

        var rd = fs.createReadStream(source);
        rd.on("error", function (err) {
            console.log('error en la creacion de stream in...' + err);
            done(err);
        });
        var wr = fs.createWriteStream(target);
        wr.on("error", function (err) {
            console.log('error en la creacion de stream out...' + err);
            done(err);
        });
        wr.on("close", function (ex) {           
            done();
        });
        rd.pipe(wr);

        function done(err) {
            if (!cbCalled) {
                cb(err);
                cbCalled = true;
            }
        }
    }

    
    
}