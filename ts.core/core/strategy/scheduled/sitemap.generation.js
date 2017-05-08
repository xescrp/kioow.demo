var startsitemapgenerator = function (callback) {
	
	var scriptpath = 'C:/development/node/yourttoo.travel/server/sitemap/generator.js';

	var workerhub = require('child_process');
	var worker = workerhub.fork(scriptpath);

	var end = {
		exit: false,
		close: false
	}

	worker.on('exit', function (code) {
		console.log('Generator exited with code ' + code);
		end.exit = true;
		if (end.exit && end.close) {
			callback({ ResultOK: true, Message: 'SiteMap generator Task Finished'});
		}
	});
	worker.on('close', function (code) {
		console.log('Generator closed with code ' + code);
		end.close = true;
		callback({ ResultOK: true, Message: 'SiteMap generator Task Finished' });
	});


}

var start = exports.start = startsitemapgenerator;