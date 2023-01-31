//process.env.NODE_ENV === 'production' -> 배포했다면
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod'); //배포했으면
}else{
    module.exports = require('./dev') //로컬 환경이면
}