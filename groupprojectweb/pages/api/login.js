 
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./session_Config";

export default withIronSessionApiRoute(loginRoute, ironOptions);

 async function loginRoute(req, res) {

 
  
    // Get just the username and password and put them into variables.
    const username = req.body.username;
    const pass = req.body.password;
   
    const mysql = require('mysql2');
  
    // create the connection to database
    const connection = mysql.createConnection({
      host: '185.38.61.93',
      user: 'MGproject',
      password: 'F37E28sINiKukaNegu4uzIDu3I7iXe',
      port: 3306,
      database: 'groupproject'
    });
  
  
   let id ="";
    

  connection.query(
    "SELECT * FROM users WHERE username = '"+username+"' AND pass = '"+pass+"' LIMIT 1;",    
   async function(err, results_user, fields) {

    console.log(results_user)
    if(results_user[0].id > 0){
    id = results_user[0].id 
    req.session.user = {
      user_id: results_user[0].id,
      user_name: results_user[0].username,
      user_email: results_user[0].email,
      
    };
    await req.session.save();
    id = req.session.user.user_id;
  }
   
  })




   connection.query(
      "SELECT * FROM devices WHERE userID = '"+req.session.user.user_id+"' ;",    
     async function(err, results_devices, fields) {
    
if(results_devices == undefined){ results_devices=[]}
results_devices.map((item, index) => { 

})

      if(id > 0){
        req.session.devices = {
          devices: results_devices
        };

        await req.session.save();
      await res.status(200).json(req.session.user.user_id);
      }


    }
  );
  
  

  
      
      
  }
      