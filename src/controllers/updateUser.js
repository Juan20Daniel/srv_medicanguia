const connection = require('../model/model');
const md5 = require('md5');
const { getToken, getRefreshToken } = require('../jwt/jwtSimple');

const updateUser = (req, res) => {
    const { idUser, email, password, name } = req.body;
    const newPassword = password === "false" ? password : md5(password);
    const sql = "CALL updateUser(?,?,?,?)";
    connection.query(sql, [idUser, email, newPassword, name], (err, rows) => {
        if(err) {
            return res.status(500).json({message:"error del servidor", err});
        }
        const result = JSON.parse(JSON.stringify(rows));
        res.status(200).json({
            token:getToken(result[0][0]),
            refreshToken:getRefreshToken(result[0][0])
        });
    })
}

module.exports = updateUser;