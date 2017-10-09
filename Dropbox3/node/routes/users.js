const mySQL = require('./mysql');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
//import jwt from 'jsonwebtoken';
//var config = require('./config')
//import config from '../config';

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/getUserData', function (req, res, next) {

    var reqUsername = req.body.username;

    const fetchDataSQL = "SELECT * FROM userdetails where email = '" + reqUsername + "'";

    mySQL.fetchData(function(err,results){
       if(err){
          throw err;
       }
       else
       {
          //console.log(results.length);
          if(results.length > 0  ){
            //console.log(results[0].firstname)
             res.status(201).json({results:results});
          }
          else {
             res.status(401).json({message: "You have not updated your details"});
          }
       }
    }, fetchDataSQL);

});


router.post('/doLogin', function (req, res, next) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var jwtSecret = 'somesecretkey';

    const fetchDataSQL = "SELECT * FROM Users where email = '" + reqUsername + "' and password = '" + reqPassword+"'";
    mySQL.fetchData(function(err,results){
       if(err){
          throw err;
       }
       else
       {
          //console.log(results.length);
          if(results.length > 0  ){
            //console.log(results[0].firstname)
            const token = jwt.sign({
              username: reqUsername
            }, jwtSecret)
             res.status(201).json({message: "Login Successful!!!",token:token,firstname: results[0].firstname,lastname: results[0].lastname});
             console.log("Login Successful")
          }
          else {
             res.status(401).json({message: "Oops!! Invalid login. Please try again.."});
             console.log("No data");
          }
       }
    }, fetchDataSQL);

});

router.post('/doSignUp', function (req, res, next) {

    var reqFirstName = req.body.firstName;
    var reqLastName = req.body.lastName;
    var reqEmail = req.body.email;
    var reqPassword = req.body.password;
  //  var insertData,selectData;

    const insertDataSQL = "INSERT INTO users VALUES ('" + reqFirstName + "','" + reqLastName + "','" + reqEmail + "','" + reqPassword + "')";
    const fetchDataSQL = "SELECT * FROM Users where email = '" + reqEmail + "'";

    mySQL.fetchData(function(err,results){
       if(err){
          throw err;
       }
       else
       {
          //console.log(results.length);
          if(results.length > 0  ){
        //     selectData = {message: "Email already exists!!!"};
             res.status(401).json({fl: 0,message: "Email already exists!!!"})
          }
          else {
            mySQL.insertData((err, results) => {
               if(err){
         			throw err;
         		}
         		else
         		{
         			    console.log("No. of results after insertion:" + results.affectedRows);
          //        insertData = {message: "Yay!!! Your account has been created...! Please Login"};
                  res.status(201).json({fl: 1,message: "Yay!!! Your account has been created...! Please Login"})
                  console.log("Inserted");
               }
            },insertDataSQL)
          }
       }

    }, fetchDataSQL);

  })

  router.post('/changeUserData', function (req, res, next) {

      var reqUsername = req.body.username;
      var reqContact = req.body.contact;

      if(!req.body.w1 == ''){
        var reqw1 = req.body.w1;
      }else {
        var reqw1 = '';
      }

      if(!req.body.w2 == ''){
        var reqw2 = req.body.w2;
      }else{
        var reqw2 = '';
      }

      if(!req.body.e1 == ''){
        var reqe1 = req.body.e1;
      }else {
        var reqe1 = '';
      }

      if(!req.body.e2 == ''){
        var reqe2 = req.body.e2;
      }else{
        var reqe2 = '';
      }

      if(!req.body.m1 == ''){
        var reqm1 = req.body.m1;
      }else {
        var reqm1 = '';
      }

      if(!req.body.m2 == ''){
        var reqm2 = req.body.m2;
      }else{
        var reqm2 = '';
      }

      if(!req.body.sh1 == ''){
        var reqsh1 = req.body.sh1;
      }else{
        var reqsh1 = '';
      }

      if(!req.body.sh2 == ''){
        var reqsh2 = req.body.sh2;
      }else {
        var reqsh2 = '';
      }

      if(!req.body.sp1 == ''){
        var reqsp1 = req.body.sp1;
      }else {
        var reqsp1 = '';
      }

      if(!req.body.sp2 == ''){
        var reqsp2 = req.body.sp2;
      }else {
        var reqsp2 = '';
      }
    //  var insertData,selectData;

      const fetchDataSQL = "SELECT * FROM userdetails where email = '" + reqUsername + "'";
      const insertDataSQL1 = "INSERT INTO userdetails VALUES ('" + reqw1 + "','" + reqe1 + "','" + reqm1 + "','" + reqsh1 + "','" + reqsp1 + "','" + reqUsername + "')";
      const insertDataSQL2 = "INSERT INTO userdetails VALUES ('" + reqw2 + "','" + reqe2 + "','" + reqm2 + "','" + reqsh2 + "','" + reqsp2 + "','" + reqUsername + "')";

      mySQL.fetchData(function(err,results){
           if(err){
              throw err;
           }
            else
           {
              //INSERT PART
              if(results.length === 0  ){
                mySQL.insertData((err, results) => {
                   if(err){
                     res.status(401).json({message: "Some error occured"});
                    }
                      else
                    {
                          //console.log(results);
                          mySQL.insertData((err, results) => {
                             if(err){
                       			res.status(401).json({message: "Some error occured"});
                       		}
                       		else
                       		{
                            mySQL.fetchData(function(err,results){
                               if(err){
                                  res.status(401).json({message: "Some error occured"});
                               }
                               else
                               {
                                  //console.log(results.length);
                                  if(results.length > 0  ){
                                    //console.log(results[0].firstname)
                                     res.status(201).json({results:results});
                                     console.log("Everything is fine")
                                  }
                                  else {
                                     res.status(401).json({message: "Some error occured"});
                                     //console.log("No data");
                                  }
                               }
                            }, fetchDataSQL);

                          }
                        },insertDataSQL2)
                    }
                  },insertDataSQL1)
                }

              //UPDATE PART
              else {
                console.log("Inside else")
              }

            }

        }, fetchDataSQL);

  })


module.exports = router;
