const jwt = require('jwt-simple');
const SECRET_KEY ='g8Sv5wb2hsS1GgJ0ZG3xd5sB9';
function getToken(data) {
    const {idUser, email, name } = data;
    var payload = {
        idUser,
        email,
        name,
        exp:Date.now() + 86400000
    };
    var token = jwt.encode(payload, SECRET_KEY);
    return token;
}
function getRefreshToken(data) {
    const { idUser } = data;
    var payload = {
        idUser,
        expire: Date.now() + 2592000000
    }
    var refreshToken = jwt.encode(payload, SECRET_KEY);
    return refreshToken;
}
module.exports = {
    getToken,
    getRefreshToken
}