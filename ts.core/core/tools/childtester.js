

process.on('message', function (data) {
    
    console.log(data);
    data.result = { mas: 'tonto tu' };
    //data.emit('result', data);
    process.send(data);
});