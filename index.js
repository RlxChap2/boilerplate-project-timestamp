const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for FCC testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static("public"));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Basic hello API
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// Handle /api without date => return current time
app.get("/api", (req, res) => {
  const currentDate = new Date();
  res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString()
  });
});

// Handle /api/:date
app.get("/api/:date", (req, res) => {
  let dateParam = req.params.date;
  let date;

  // If it's only digits, treat as Unix timestamp
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
