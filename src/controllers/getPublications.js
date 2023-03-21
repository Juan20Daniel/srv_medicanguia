const connection = require('../model/model');

const orderPublications = (values) => {
    return valuesOrdeds = values.sort((a, b) => {
        return b.category - a.category;
    });
}

const getPublications = (req, res) => {
    const sql = "CALL getPublications";
    connection.query(sql, (err, rows) => {
        if(err) return res.status(500).json({message:"Error en el servidor", err});
        const result = JSON.parse(JSON.stringify(rows));
        res.status(200).json({
            headerPublication:orderPublications(result[0]),
            comments:result[1],
            networks:result[2],
            moreifo:result[3],
            spaciStude:result[4],

        })
    })
}

module.exports = getPublications;