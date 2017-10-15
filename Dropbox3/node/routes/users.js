const mySQL = require('./mysql');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var fs = require('fs');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var upload = multer({ dest: '../react/public/uploads/' });

var token;
var username;
const uploadsFolder = '../../uploads';

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/getUserData', function (req, res, next) {

    if(req.body.token === token){
        console.log(req.body.token);
        var reqUsername = req.body.username;

        const fetchDataSQL = "SELECT * FROM userdetails where email = '" + reqUsername + "'";

        mySQL.fetchData(function(err,results){
           if(err){
              res.status(404).json({message:'Some error occurred!'})
           }
           else
           {
                if(results.length > 0  ){
                 res.status(201).json({results:results});
              }
              else {
                 res.status(401).json({message: "You have not updated your details"});
              }
           }
        }, fetchDataSQL);
      }
      else{
            res.status(404);
      }

});


router.post('/doLogin', function (req, res, next) {
    upload = multer({ dest: `../react/public/uploads/${req.body.username}/` })
    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var jwtSecret = 'somesecretkey';

    const fetchDataSQL = "SELECT * FROM Users where email = '" + reqUsername + "' and password = '" + reqPassword+"'";
    mySQL.fetchData(function(err,results){
       if(err){
          res.status(404).json({message:'Some error occurred!'})
       }
       else
       {
          if(results.length > 0  ){
             token = jwt.sign({
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


    const insertDataSQL = "INSERT INTO users VALUES ('" + reqFirstName + "','" + reqLastName + "','" + reqEmail + "','" + reqPassword + "')";
    const fetchDataSQL = "SELECT * FROM Users where email = '" + reqEmail + "'";

    mySQL.fetchData(function(err,results){
       if(err){
          throw err;
       }
       else
       {
          if(results.length > 0  ){
             res.status(401).json({fl: 0,message: "Email already exists!!!"})
          }
          else {
            mySQL.insertData((err, results) => {
               if(err){
             			res.status(404).json({fl: 2,message:'Some error occurred!'})
         		}
         		else
         		{
         			    console.log("No. of results after insertion:" + results.affectedRows);
                  makeDir('../react/public/uploads/'+reqEmail)
                  makeDir('../react/public/uploads/'+reqEmail+'/Files/')
                  makeDir('../react/public/uploads/'+reqEmail+'/StarredFiles/')
                  res.status(201).json({fl: 1,message: "Yay!!! Your account has been created...! Please Login"})
                  console.log("Inserted");
               }
            },insertDataSQL)
          }
       }

    }, fetchDataSQL);
  })

  router.post('/changeUserData', function (req, res, next) {

    if(req.body.token === token){

      var reqUsername = req.body.username;

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
                                     res.status(201).json({message:"Details saved!!",results:results});
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

    }
    else{
                res.status(404);
    }

  })


  router.post('/files', upload.any(), function (req, res, next) {

    var username = req.query.username;
    console.log(username)

     console.log("here")
     if (!req.files) {
        return next(new Error('No files uploaded'))
     }

     req.files.forEach((file) => {
       console.log(path.join(__dirname,'../'))
        console.log(file.originalname)
        fs.rename(path.join(__dirname,'../../react/public') + `/uploads/` + file.filename, path.join(__dirname,'../../react/public') + `/uploads/${username}/Files/` + file.originalname, function(err) {
             if ( err ){
               console.log('ERROR: ' + err.message);
             }
          });
     })
     console.log('done..');
     res.status(200).end()
  })

  router.post('/getFiles', function (req, res, next) {

      var filelist=[];
      var username = req.body.username;

     if(req.body.token === token){

          fs.readdirSync(path.join(__dirname, `../../react/public/uploads/${username}/Files`)).forEach(file => {
                filelist.push(file);
          })
          console.log(filelist)
          res.status(201).json({files:filelist})
      }
       else{
             res.status(404);
       }

  })

  router.post('/getstarFiles', function (req, res, next) {

      var filelist=[];
      var username = req.body.username;

     if(req.body.token === token){

          fs.readdirSync(path.join(__dirname, `../../react/public/uploads/${username}/StarredFiles`)).forEach(file => {
                filelist.push(file);
          })
          console.log(filelist)
          res.status(201).json({files:filelist})
      }
       else{
             res.status(404);
       }

  })

  router.get('/deletefile',function(req, res){
      fs.unlinkSync(path.join(__dirname,'../../')+`/react/public/uploads/${req.query.username}/Files/`+`/${req.query.filename}`);
      res.status(200).json();
});

  router.get('/deletestarfile',function(req, res){
      fs.unlinkSync(path.join(__dirname,'../../')+`/react/public/uploads/${req.query.username}/StarredFiles/`+`/${req.query.filename}`);
      res.status(200).json();
  });

  router.get('/starfile',function(req, res){
      fs.writeFileSync(path.join(__dirname,'../../')+`/react/public/uploads/${req.query.username}/StarredFiles/${req.query.filename}`, fs.readFileSync(path.join(__dirname,'../../')+`/react/public/uploads/${req.query.username}/Files/`+`/${req.query.filename}`));
      res.status(200).json();
});

  const makeDir = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.log(err.message);
    }
  }
}


module.exports = router;
