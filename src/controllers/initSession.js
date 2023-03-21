const { verify } = require('../functions');
const md5 = require('md5');
const connection = require('../model/model');
const { getToken, getRefreshToken } = require('../jwt/jwtSimple');
const initSession = (req, res) => {
    const { email, password } = req.body;
    const dataToVerify = [
        {value:email, expretion:/^[a-zA-Z0-9.-_ñÑ]{1,60}@[a-zA-Z.]{4,206}$/},
        {value:password, expretion:/^.{4,30}$/}
    ]
    if(!verify(dataToVerify)) {
        res.status(500).json({message: "Algo esta mal."});
        return false;
    }
    const sql = "CALL initSession(?,?)";
    connection.query(sql, [email, md5(password)], (err, rows) => {
        if(err) {
            res.status(500).json({message: "Error al hacer la consulta"});
            return false;
        }
        const result = JSON.parse(JSON.stringify(rows));
        if(!result[0].length) {
            res.status(404).json({message:"El usuario es incorrecto o no existe."});
            return false;
        }
        if(!result[0][0].active) {
            res.status(500).json({ message:"La cuenta ha sido bloqueada." });
            return false;
        }
        const user = { 
            idUser:result[0][0]['@getId := idUser'],  
            email:result[0][0].email,
            name:result[0][0].name,
            active:result[0][0].active
        }
        res.status(200).json({
            token:getToken(user), 
            refreshToken:getRefreshToken(user),
            publications_saves:result[1]
        });
    });
}

module.exports = initSession;