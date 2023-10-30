const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

const Razorpay = require('razorpay');

var instance = new Razorpay({
  key_id: 'rzp_test_GCM7vvTycC6ic7',
  key_secret: 'mHhzBkOZKg0ElhrRvTFBlZd3',
});



var corsOptions = {
  origin: "http://localhost:3200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
.connect("mongodb+srv://sri2627:Jhp$2627@cluster0.fatnc.mongodb.net/students", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our XRapplication." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/turorial.routes")(app);
require("./app/routes/asmt.routes")(app);
require("./app/routes/files.routes")(app);
require("./app/routes/userfiles.routes")(app);
require("./app/routes/exams.routes")(app);
require("./app/routes/results.routes")(app);
require("./app/routes/invoices.routes")(app);
require("./app/routes/sections.routes")(app);
require("./app/routes/event.routes")(app); 
require("./app/routes/syllabus.routes")(app); 
require("./app/routes/content.routes")(app); 
require("./app/routes/total.routes")(app); 
require("./app/routes/product.routes")(app); 
require("./app/routes/company.routes")(app); 
require("./app/routes/examtitle.routes")(app); 

require("./app/routes/razor.routes")(app); 
//require("./app/routes/userfiles.routes")(app);
//require("./app/routes/image.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
 
  
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "institution"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'institution' to roles collection");
      });


    }
  });
}
