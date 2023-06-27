var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
router.use( bodyParser.urlencoded() );
var nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: "Gmail",
    proxy:'http://wdcmail.hopto.org',// true for 465, false for other ports
    auth: {
      user: 'mridul.gupta.18csc@bmu.edu.in', // generated ethereal user
      pass: '1bGAHHadelaide'// generated ethereal password
    },
  });

router.post('/email', function (req,res,next){
  var d = req.body.Eusername;
// send mail with defined transport object
  let info =transporter.sendMail ({
    from: 'mridul.gupta.18csc@bmu.edu.in', // sender address
    to: req.body.Email, // list of receivers
    subject: 'Roster.com ' ,// Subject line
    text: 'Welcome to Roster.com', // plain text body
    html: '<p>Welcom User to roster.com to </p>'+d
  });
  res.send();

  });
router.post('/msignup.html', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO Manager (Musername,name,LastName,password) VALUES (?,?,?,?)";



    connection.query(query, [req.body.Musername,req.body.name,req.body.LastName,req.body.password], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

       res.send();

    });

  });

});
router.post('/esignup.html', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO Employee (Eusername,name,LastName,password) VALUES (?,?,?,?)";
    connection.query(query, [req.body.Eusername,req.body.name,req.body.LastName,req.body.password], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }


res.send();
    });

  });

});




router.post('/lemployee.html', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Employee WHERE Eusername=? AND password=?";

    connection.query(query, [req.body.Eusername,req.body.password], function(err, rows, fields) {
    connection.release();

    if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      if(rows.length > 0)
      {
        res.send();
      }
      else
      {
        res.sendStatus(401);
        return;
      }


    });
  });

});
router.post('/lmanager.html', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Manager WHERE Musername=? AND password=?";
    connection.query(query, [req.body.Musername,req.body.password], function(err, rows, fields) {
      connection.release(); // release connection

      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      if(rows.length > 0)
      {
        res.send();
      }
      else
      {
        res.sendStatus(401);
        return;
      }



    });

  });

});
router.get('/man', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM Employee";
    connection.query(query,  function(err, rows, fields) {
      console.log(query);
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

       res.send();

    });
  });

});

router.post('/addtask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var query = "INSERT INTO TASK (TaskID,Eusername,Taskname,StartTime,EndTime,Status) VALUES (?,?,?,?,?,'Pending')";
    connection.query(query, [req.body.TaskID,req.body.Eusername,req.body.Taskname,req.body.StartTime,req.body.EndTime], function(err, rows, fields) {
     // connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }


    });
       var query2 = "SELECT * FROM TASK WHERE TaskID=?";
    connection.query(query2, [req.body.TaskID], function(err, rows, fields) {
      connection.release(); // release connection

      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

            res.json(rows);






    });
  });

});


router.post('/ava', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO AVAILABILITY (StartT,EndT,Eusername,name) VALUES (?,?,?,?)";
    connection.query(query, [ req.body.StartT ,req.body.EndT ,req.body.Eusername,req.body.name], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

          var query1 = "SELECT * FROM AVAILABILITY WHERE Eusername =? ";
       connection.query(query1, [ req.body.Eusername], function(err, rows, fields) {
        //connection.release(); // release connection
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        console.log("works");
        res.json(rows);

        });

    });
  });

});

router.post('/avail', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    

          var query1 = "SELECT * FROM AVAILABILITY WHERE Eusername =? ";
       connection.query(query1, [ req.body.Eusername], function(err, rows, fields) {
        //connection.release(); // release connection
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.json(rows[0].name);

        });

    });
  });
  
  router.post('/taskstatus', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    

          var query1 = "SELECT * FROM TASK WHERE TaskID =? ";
       connection.query(query1, [ req.body.TaskID], function(err, rows, fields) {
        //connection.release(); // release connection
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.json(rows);

        });

    });
  });

router.post('/showtask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }


       var query2 = "SELECT * FROM TASK WHERE Eusername=?";
    connection.query(query2, [req.body.Eusername], function(err, rows, fields) {
      connection.release(); // release connection

      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

            res.json(rows);






    });
  });

});

router.post('/av', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    


    var query2 = "SELECT  * FROM AVAILABILITY WHERE Eusername=?;";
    connection.query(query2,[req.body.Eusername], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }


    res.json(rows);

    });
  });

});

router.post('/show', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM TASK WHERE Eusername=?";
    connection.query(query,  [req.body.Eusername],function(err, rows, fields) {

      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
    
         res.json(rows);
  
    
      



      

    });
  });
});
router.post('/etaskstatus', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM TASK WHERE TaskID=?";
    connection.query(query,  [req.body.TaskID],function(err, rows, fields) {

      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
    
         res.json(rows);
  
    
      



      

    });
  });
});
router.post('/updstatus', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE TASK SET Status=? where TaskID=?";
    connection.query(query,  [req.body.Status,req.body.TaskID],function(err, rows, fields) {

      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
    
      

    });
    res.send();
  });
});
router.post('/egroup', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    


    var query2 = "SELECT  * FROM  GROUPTASK WHERE Eusername=?;";
    connection.query(query2,[req.body.Eusername], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }


    res.json(rows);

    });
  });

});

router.post('/showgrouptask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM GROUPTASK WHERE Eusername=?";
    connection.query(query,  [req.body.Eusername],function(err, rows, fields) {

      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

       res.json(rows);

    });
  });

});

router.post('/addgrouptask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "INSERT INTO GROUPTASK (GroupID,Description,Eusername,StartTIME,EndTIME) VALUES (?,?,?,?,?)";
    connection.query(query,  [req.body.GroupID,req.body.Description,req.body.Eusername,req.body.StartTIME,req.body.EndTIME],function(err, rows, fields) {

      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }



    });
    res.send();
  });

});


router.post('/updateoption1', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE TASK SET Taskname = ?   WHERE TaskID = ?";
    connection.query(query,[req.body.Taskname,req.body.TaskID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }



    res.send();


    });
  });

});
router.post('/updateoption2', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE TASK SET StartTime = ?   WHERE TaskID = ?";
    connection.query(query,[req.body.StartTime,req.body.TaskID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }



    res.send();


    });
  });

});
router.post('/updateoption3', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE TASK SET EndTime = ?   WHERE TaskID = ?";
    connection.query(query,[req.body.EndTime,req.body.TaskID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }



    res.send();


    });
  });

});
router.post('/updateoption4', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE TASK SET Eusername = ?   WHERE TaskID = ?";
    connection.query(query,[req.body.Eusername,req.body.TaskID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }



    res.send();


    });
  });

});


router.post('/deletetask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "DELETE FROM TASK WHERE TaskID = ?";
    connection.query(query,[req.body.TaskID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }



    res.send();


    });
  });

});


module.exports = router;
