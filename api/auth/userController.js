const { create} = require("./signup");

const { getUserByEmail} = require("./login");

const {genSaltSync,hashSync, compareSync} = require('bcrypt');

const  { sign } = require('jsonwebtoken');

module.exports = {
    createUser :(req,res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.userPassword = hashSync(body.userPassword,salt)
        create(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection Error"
                });
            }
            return res.status(200).json({
                status:"S",
                message:"SignUp Successfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.userEmail, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    status: "F",
                    message: "Invalid Email or Password"
                });
            }
            if (results.isActive !== 1) {
                return res.json({
                    status: "F",
                    message: "Your account is not active"
                });
            }
            const result = compareSync(body.userPassword, results.userPassword);

            if (result ) {
                result.userPassword = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    status: "S",
                    message: "Login Successfully and Avtive is 1",
                    token: jsontoken
                });
            } else {
                return res.json({
                    status: "F",
                    data: "Invalid email or password"
                });
            }
        });
    },
}