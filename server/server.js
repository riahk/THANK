var port = process.env.PORT || 6378;
var app = require('./request-handler.js');

app.listen(port);

console.log('Server now listening on port ' + port);

