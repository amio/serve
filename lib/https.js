var fs = require('fs')
var join = require('path').join
var exec = require('child_process').exec
var https = require('https')
var homedir = require('os').homedir()

var httpsOptions = {
  keytype: 'rsa:2048',
  days: 365,
  keyFile: join(homedir, '.serve.key'),
  certFile: join(homedir, '.serve.crt'),
  caFile: null
};

module.exports = function serveHTTPS (program, server, path) {

  // if passed, skip generation
  if (program.key && program.cert) {
    httpsOptions.keyFile = program.key;
    httpsOptions.certFile = program.cert;
    httpsOptions.caFile = program.ca;
    return httpsReady();
  }

  try {
    fs.accessSync(httpsOptions.keyFile, fs.constants.R_OK)
    fs.accessSync(httpsOptions.certFile, fs.constants.R_OK)
    return httpsReady();
  } catch (e) {
    generateKeyCert(homedir, httpsReady)
  }

  // once https is ready to start...
  function httpsReady () {
    launchHTTPSServer(program, server, path)
  };
}

function generateKeyCert (dir, cb) {
  var params = {
    C: 'US',
    ST: 'Test State',
    L: 'Test Locality',
    O: 'Org Name',
    OU: 'Org Unit Name',
    CN: 'localhost',
    emailAddress: 'test'
  };
  var subj = '';
  for (key in params) {
    if (!params.hasOwnProperty(key)) continue;
    subj += '/' + key + '=' + params[key];
  }

  // call openssl to generate keys
  var cmd = 'openssl req ' +
    ' -new -newkey ' + httpsOptions.keytype +
    ' -days ' + httpsOptions.days +
    ' -x509 ' +
    ' -nodes ' +
    ' -subj "' + subj + '"' +
    ' -keyout ' + httpsOptions.keyFile +
    ' -out ' + httpsOptions.certFile;

  exec(cmd, { cwd: dir }, function (err, stderr, stdout) {
    if (err) throw err;
    if (stderr) throw new Error(stderr);
    cb();
  });
}

function launchHTTPSServer (program, server, path) {
  var options = {
    key: fs.readFileSync(httpsOptions.keyFile),
    cert: fs.readFileSync(httpsOptions.certFile),
    requestCert: true,
    rejectUnauthorized: false
  };
  if (httpsOptions.caFile) {
    options.ca = fs.readFileSync(httpsOptions.caFile);
  }

  var httpsServer = https.createServer(options, server)

  // start the http server
  httpsServer.listen(program.httpsPort, function () {
    console.log('\033[90mServing \033[36m%s\033[90m on port \033[96m%d\033[0m', path, program.httpsPort);
  });
}
