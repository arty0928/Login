const { User } = require('../models/User');

let auth = (req,res, next) => {
    //auth 인증처리를 하는 곳
    //1. 클라이언트 쿠키에서 토큰을 가져온다.
    //index.js에서 generateToken에서 x-auth로 쿠키를 넣음
    let token = req.cookies.x_auth;

    //2. 가져온 토큰을 decode한 후, 유저가 있는지 찾는다
    //user model에서 메소드를 만들어서 불러옴
    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        //유저가 없으면 인증 no
        if(!user) return res.json({isAuth: false, error: true})
        
        //유저가 있으면 인증 Okay
        req.token = token; //req에 넣어줘서 index.js에서 req.user했을때 접근 가능
        req.user = user;

        //auth가 미들웨어 였으니, index.js로 콜백
        next();
    })

}

module.exports = {auth};