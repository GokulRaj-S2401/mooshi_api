const pool = require("../config/connection");

var  sql = "CREATE TABLE mooshi_user_table(userID int not null auto_increment ,userName varchar(50) not null,userEmail varchar(50) not null,userPassword varchar(100) not null,gender varchar(10) not null,interestList varchar(150) not null,isActive int  DEFAULT 1 not null,createdOn varchar(20) not null, primary key(userId))";

pool.query(sql,(error,result)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Table Created");
    }
})