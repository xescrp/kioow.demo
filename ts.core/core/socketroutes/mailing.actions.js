module.exports = function (mailstack, socket) { 
    
    socket.on('push', function (message) {
        console.log('new email to be enqueued... to: ' + message.to); 
        var thismoment = new Date();
        mailstack.mailqueue.enqueue(message);
        socket.emit('push.done', {
            ResultOK: true,
            Message: 'Email pushed on the mail queue at ' + thismoment
        });
    });

    socket.on('error', function (err) {
        console.log('error en socket [Request failed]...');
        console.error(err.message);
        console.error(err.stack);
        socket.emit('uncaughtException', { error : err.message, stack: err.stack });
    });
}