

export default function handler(req, res) {


     const username = req.body.username_Reg;
     const email = req.body.email_Reg;
     const address = req.body.address_Reg;
     const pass = req.body.password_Reg;

      
    const mysql = require('mysql2');
  
    // create the connection to database
    const connection = mysql.createConnection({
      host: '185.38.61.93',
      user: 'MGproject',
      password: 'F37E28sINiKukaNegu4uzIDu3I7iXe',
      port: 3306,
      database: 'groupproject'
    });
 
     
// check if user exist
  
    // simple query


  
   connection.query(
    "INSERT INTO `users` (`username`,`email`,  `pass`) VALUES ('"+username+"',  '"+email+"' , '"+pass+"');",
    
    function(err, results, fields) {

     
        // console.log(results)
        // console.log(err)
         if(results != null){
          console.log(results.insertId)
          res.status(200).json(results.insertId);
        }
     
   
      
     
    }
  );
  
  
  
      
      
  }
      