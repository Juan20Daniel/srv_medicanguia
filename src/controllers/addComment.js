const connection = require('../model/model');

const addComent = (req, res) => {
    const { message, idUser, idPublication } = req.body;
    const sql = "CALL addComment(?,?,?)";
    connection.query(sql, [message, idUser, idPublication], (err, rows) => {
        if(err) {
            return res.status(500).json({message:"Error del servidor", err});
        }
        const result = JSON.parse(JSON.stringify(rows));
        res.status(200).json({comments:result[0]});
    })

}
module.exports = addComent;