const connection = require('../model/model');
const { getToken, getRefreshToken } = require('../jwt/jwtSimple');

const getUser = (req, res) => {
    const { idUser } = req.params;
    const sql = "CALL refreshUser(?)";
    connection.query(sql, [idUser], (err, rows) => {
        if(err) {
            res.status(500).json({message:err});
            return false;
        }
        const result = JSON.parse(JSON.stringify(rows));
        if(!result[0][0].active) {
            res.status(200).json({message:"This count has been blocked", active:rows[0].active});
            return false;
        }
        res.status(200).json({
            active:result[0][0].active,
            token:getToken(result[0][0]),
            refreshToken: getRefreshToken(result[0][0]),
            publications_saves:result[1]
        });
    })
}

module.exports = getUser;