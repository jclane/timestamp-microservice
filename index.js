// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function handleDateString(str) {
  try {
    str = Number(BigInt(str));
  } catch (err) {
    if (err instanceof SyntaxError) {
      return str;
    }
  }
  return str;
}

function getDateObj(date) {
  const d = handleDateString(date);
  const dObj = new Date(d);  
  const time = dObj.getTime();
  const utc = dObj.toUTCString();

  if (time != "NaN" && utc != "Invalid Date") {
    result = {
      unix: time,
      utc: utc
    };
  } else {
    result = {
      error: utc
    };
  }

  return result;
}

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let dStr;
  if (req.params.date) {
    dStr = req.params.date;
  } else {
    dStr = Date.now().toString();
  }
  const d = getDateObj(dStr);
  res.send(d);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
