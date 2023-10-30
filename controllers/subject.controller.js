const db = require("../models/index.js");
const SUBJECT = db.subjects;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.subject) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
   // Create a Tutorial
  const msubject = new SUBJECT({
    
    subject: req.body.subject,
    hodid: req.body.hodid,
  });

  // Save Tutorial in the database
  msubject
    .save(msubject)
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the section."
      });
    });
};

 

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  //const title = req.query.title ;
  //customerid
  const customerid = req.query.customerid ;
 // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
 //db.collection.find({name:{'$regex' : 'string', '$options' : 'i'}})

  //find( { "customerid": { $eq: customerid } } )
    console.log(customerid);
    SUBJECT.find( { customerid: { $eq: customerid } } )
    .then(data => {
      res.send(data);
      console.log(data);
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving section."
      });
    });

 

};




exports.getsectionexams = (req, res) => {
    const customerid = req.query.customerid;
    
    console.log(customerid);
  
    SUBJECT.find( { customerid: { $eq: customerid } } )
  
  
      .then(data => {
        res.send(data);
        console.log(data);
      })
      .catch(err => {
        res.status(500).send({
          
          message:
            err.message || "Some error occurred while retrieving section."
        });
      });
  };
  

exports.getstudentmessges = (req, res) => {
  const customerid = req.query.customerid;
  
  console.log(customerid);

  SUBJECT.find( { studentid: { $eq: customerid } } )


    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        
        message:
          err.message || "Some error occurred while retrieving section."
      });
    });
};



// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SUBJECT.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  SUBJECT.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update section with id=${id}. Maybe section was not found!`
        });
      } else res.send({ message: "section was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating section with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SUBJECT.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete section with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "section was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    SUBJECT.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} section were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all section."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    SUBJECT.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sections."
      });
    });
};
