// index.js
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// 1. Route for empty /api → return current time
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// 2. Route for /api/:date
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  let parsedDate;

  // If it's a timestamp in milliseconds
  if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listen on port
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("App listening on port " + listener.address().port);
});
