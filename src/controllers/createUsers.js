const connection = require('../model/model');
var md5 = require('md5');
const { getToken, getRefreshToken } = require('../jwt/jwtSimple');
const { verify } = require('../functions');

const createUsers = (req, res) => {
    const { name, email, password } = req.body;
    const dataToVerify = [
        {value:name, expretion:/^([a-zA-ZñÑ]{2,9}\s){2}[a-zA-ZñÑ]{2,9}(\s*([a-zA-ZñÑ]{1,9})?){4}$/},
        {value:email, expretion:/^[a-zA-Z0-9.-_ñÑ]{1,60}@[a-zA-Z.]{4,206}$/},
        {value:password, expretion:/^.{4,30}$/}
    ]
    if(!verify(dataToVerify)) {
        res.status(500).json({message:"Algo esta mal."});
        return false;
    }
    const sql = 'CALL createUser(?,?,?)';
    connection.query(sql, [email, md5(password), name], (err, rows) => {
        if(err) {
            res.status(500).json({message:err});
            return false;
        } 
        const result = Object.values(JSON.parse(JSON.stringify(rows)));
        if(result[1][0].hasOwnProperty('name')) {
            res.status(200).json({
                message:"Usuario creado.", 
                token:getToken(result[1][0]),
                refreshToken:getRefreshToken(result[1][0]),
                publications_saves:[]
            });
        } else {
            res.status(404).json({message:"El correo ya existe.", email:email});
        }
    })
}

module.exports = createUsers;