
// Use dump() under the hood so
// console.log() is sent to command-line
console.log = function() { dump.apply(window, arguments); };
