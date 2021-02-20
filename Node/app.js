const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const productRoute = require("./routes/productRoute");

// Manejo de archivo properties
const PropertiesReader = require("properties-reader");
const prop = PropertiesReader("config.properties");

var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Settings Cors
app.use(cors());

app.use(productRoute);

//app.use(morgan('combined'))

app.listen(prop.get("server.port"), () => {
  console.log(prop.get("server.message"));
});
