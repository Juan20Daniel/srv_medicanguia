const connection = require('../model/model');

const savePublication = (req, res) => {
    const { idPublication, idUser, action } = req.body;
    const sql = "CALL saveOrRemovePub(?,?,?)";
    connection.query(sql, [idPublication, idUser, action.toString()], (err, rows) => {
        if(err) {
            return res.status(500).json({message:"Error del sevidor", err});
        }
        const result = JSON.parse(JSON.stringify(rows));
        res.status(200).json({save_publications:result[0]});
    })
}

module.exports = savePublication;