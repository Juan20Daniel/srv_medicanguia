const connection = require('../model/model');

const getPublicationsSaves = (req, res) => {
    const { idUser } = req.params;
    const sql = "SELECT * FROM saves WHERE idUser_saves = ?";
    connection.query(sql, [idUser], (err, rows) => {
        if(err) {
            return res.status(500).json({message:"Error del servidor."});
        }
        res.status(200).json({publications_saves:rows});
    })
}

module.exports = getPublicationsSaves;