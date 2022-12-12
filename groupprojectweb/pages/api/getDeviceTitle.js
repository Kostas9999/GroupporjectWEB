const mysql = require('mysql2');

export default function handler(req, res) {
 


    const device_Id = req.body.device_Id;

  
    const connection = mysql.createConnection({
      host: '185.38.61.93',
      user: 'MGproject',
      password: 'F37E28sINiKukaNegu4uzIDu3I7iXe',
      port: 3306,
      database: 'groupproject'
    });
  
  
    // simple query
  connection.query(
    `SELECT * FROM ${device_Id}.os;`,
    function(err, results, fields) {
   
       
       
      res.status(200).json({"OS" :
        {
            "hostname" : results[0].hostname,
            "version" : results[0].version
        }
            
        }
            
            );
  
     
    }
  );
  
  
  
  
  
  
  
      
      
  }
      