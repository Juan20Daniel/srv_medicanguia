function verify(values) {
    for(let i=0; i<=values.length - 1; i++) {
        if(!values[i].expretion.test(values[i].value)) {
            return false;
        }
    }
    return true;
}

module.exports = {
    verify
}