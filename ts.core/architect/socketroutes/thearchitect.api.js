module.exports = function (thearchitect, socket) { 
    //handler identifier...
    socket.on('whoami', function (whoami) {
        console.log('Connection identification...');
        console.log(whoami);
        
        if (thearchitect.clients.hasItem(socket.id)) {
            var conn = thearchitect.clients.get(socket.id);
            conn.whoami = whoami;
            thearchitect.clients.set(socket.id, conn);
            console.log('Connection updated...' + socket.id);
        }

    });
    
    socket.on('debug', function () { 
        
    });

    socket.on('task.killemall', function (load) {
        console.log('HARD RESET received....');
        require('yourttoo.common').processes.killEmAll(process.pid, function (killed) {
            socket.emit('task.killemall.finished', {
                killed: killed
            });
        });
    });
    
    socket.on('get.status', function () {
        socket.emit('get.status.finished', thearchitect.currentprocesses);
    });

    socket.on('task.reboot', function (load) { 
        
    })
}