const connection = require('../model/model');

const getComments = (req, res) => {
    const { idComment } = req.params;
    const sql = `
        SELECT idComments, message, dateComent, idUser_comm, idPublic_comm, users.name, idPublication FROM 
        users inner join comments on users.idUser = comments.idUser_comm inner join 
        publications on publications.idPublication = comments.idPublic_comm WHERE 
        idPublication = '${idComment}'
    `;
    connection.query(sql, (err, rows) => {
        if(err) {
            return res.status(500).json({message:"Error del servidor", err});
        }
        res.status(200).json(rows);
    })
}

module.exports = getComments;