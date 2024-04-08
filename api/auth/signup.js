const pool = require("../../config/connection");

module.exports = {
    create:(data,callBack)=>{
        pool.query(
            `insert into mooshi_user_table(userName,userEmail,userPassword,gender,interestList,createdOn) values (?,?,?,?,?,?)`,
            [
                data.userName,
                data.userEmail,
                data.userPassword,
                data.gender,
                data.interested,
                data.createdOn
                
            ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
        );
    }
}