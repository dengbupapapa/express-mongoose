process.stdin.resume();
process.on('SIGHUP', function() {
    console.log('read');
})
console.log('pid:', process.pid);