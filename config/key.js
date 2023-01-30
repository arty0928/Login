//process.env.NODE_ENV === 'production' -> 배포했다면
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}