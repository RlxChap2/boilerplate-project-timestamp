var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;

  // Handle empty date parameter (current time)
  if (!dateParam) {
    let now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  let date;
  // Check if dateParam is a Unix timestamp (numeric string)
  if (/^-?\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    // Parse as ISO string or other date format
    date = new Date(dateParam);
  }

  // Handle invalid dates
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return successful response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
