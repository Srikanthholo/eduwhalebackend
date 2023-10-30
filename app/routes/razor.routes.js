const { authJwt } = require("../middlewares");
 

const Razorpay = require('razorpay');

 


module.exports = app => {
  
 
  
    var router = require("express").Router();
 

    
    router.post("/", async(req, res)=>{

        var instance = new Razorpay({ key_id: 'rzp_test_GCM7vvTycC6ic7', key_secret: 'mHhzBkOZKg0ElhrRvTFBlZd3' })

       let order = await instance.orders.create({
          amount: req.body.amount * 100,
          currency: "INR",
          receipt: req.body.receipt,
        
        })
        res.send(order);
      

    }) 
 
     
  
    app.use("/api/payment", router);
  };
  