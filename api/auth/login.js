
const pool = require("../../config/connection");

module.exports = {
    getUserByEmail:(userEmail,callBack)=>{
        pool.query(
            `select * from mooshi_user_table where userEmail = ?`,
            [userEmail],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0])
            }
        );
    }
}