const multer = require('multer');
const path = require('path');
const moment = require('moment');
const connection = require('../model/model');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../images"),
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    } 
});

const load = multer({ storage });
const moveImage = load.single('image');

const createPublication = (req, res) => {
    const { originalname } = req.file;
    const { data } = req.body;
    console.log(data);
    const { 
        category, 
        nameClient, 
        tileClient, 
        prices, 
        phoneClient, 
        ubicationClient, 
        links, 
        moreinfo, 
        mySpecialits, 
        myStudens 
    } = JSON.parse(data);
    const idPublication = moment().unix();
    console.log(idPublication)
    const sqlTablePublication = "CALL createPublication(?,?,?,?,?,?,?,?)"; 
    connection.query(sqlTablePublication, [
        idPublication,
        nameClient.value,
        tileClient.value,
        phoneClient.value,
        ubicationClient.value,
        prices.value,
        category.value,
        originalname
    ], (err, rows) => {
        if(err) {
            console.log(err);
            res.status(500).json({message:"Error del servidor", err});
            return false;
        }
    })
    const result = links.map(link => {
        return Object.values({
            id:null, 
            name:link.name, 
            value:link.value, 
            active:link.active, 
            idPublication
        });
    });
    const sqlNetWorks = "INSERT INTO networks VALUES ?";
    connection.query(sqlNetWorks, [result], (err, rows) => {
        if(err) {
            console.log(err);
            res.status(500).json({message:"Error del servidor networks", err});
            return false;
        }
        console.log("networks saves: "+idPublication)
    })
    const resultMoreInfo = moreinfo.map(info => {
        return Object.values({
            id:null,
            infokey: info.key,
            value: info.value,
            idPublication
        })
    })
    const sqlMoreInfo ="INSERT INTO moreInfo VALUES ?";
    connection.query(sqlMoreInfo, [resultMoreInfo], (err, rows) => {
        if(err) {
            console.log(err);
            res.status(500).json({message:"Error del servidor moreInfo", err});
            return false;
        }
        console.log("moreInfo: "+idPublication)
    })
    const resultMySpecia = mySpecialits.map(specialit => {
        return Object.values({
            idSpaciStude:null,
            value:specialit.value,
            type:'specialty',
            idPublication
        })
    })
    const sqlSpecial = "INSERT INTO specialtyStudens VALUES ?";
    connection.query(sqlSpecial, [resultMySpecia], (err, rows) => {
        if(err) {
            console.log(err);
            res.status(500).json({message:"Error del servidor specialtyStudens", err});
            return false;
        }
        console.log("specialty: "+idPublication)
    })
    const resultStudens = myStudens.map(myStuden => {
        return Object.values({
            idSpaciStude:null,
            value:myStuden.value,
            type:'studens',
            idPublication
        })
    })
    connection.query(sqlSpecial, [resultStudens], (err, rows) => {
        if(err) {
            console.log(err);
            res.status(500).json({message:"Error del servidor specialtyStudens, studens", err});
            return false;
        }
        console.log("Studens: "+idPublication)
    })
    
    res.status(200).json({message:"publication created"});
}

module.exports = { moveImage, createPublication }