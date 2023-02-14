const mongoose = require('mongoose'); //1. mongoose를 가져오고

//비밀번호 암호화
const bcrypt = require('bcrypt');
//salt를 10글자만들어서 비번 암호화
const saltRounds = 10;

//로그인 기능: Token
const jwt = require('jsonwebtoken');
const type = require('mongoose/lib/schema/operators/type');

const userSchema = mongoose.Schema({ //2. 스키마 생성
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //공백제거
        unique:1 //똑같은 이메일은 쓰지 못하게
    },
    password: {
        type: String,
        maxlength: 60
    },
    role:{ //일반유저인지, 관리자유저인지
        type: Number, 
        default: 0 
    },
    image: String,
    token: { //유효성 관리
        type: String
    },
    tokenExp: { //토큰 기한
        type: Number
    }
})

//유저 정보 저장전에, 다 끝나면 next() 콜백으로 index.js의 save호출
//'save'라는 메소드 이름과 match되는 메소드 이전에 진행
//callback으로 function
userSchema.pre('save', function(next){

    var user = this;
    //console.log(`typeof(user): ${typeof(user)}`); //object

    //비번이 수정되었을때만
    //isModified는 mongoose의 모듈
    if(user.isModified('password')){
        //비번 암호화: salt를 생성해서 err가 나면 return 성공하면 salt
        //genSaltSync는 string을 반환,
        //saltRounds : becrypt된 값을 해쉬하는데 걸리는 시간 (2의 10승만큼 계산 반복)
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            console.log(`salt : ${salt}`);
            //순수하게 넣은 비밀번호: user.password
            //userShema의 password가져오기 위해 user = this;
            //생성한 salt를 넣어주고,
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);

                //암호화해서 보내주기
                user.password = hash;
                //index.js의 save호출
                next();
            })
        })

        //bycrypt.genSalt 안하고 그냥 bcryt.hash(plainpassword,saltRounds)로 auto-generateSalt 후 hash가능
        // bcrypt.hash(user.password, 10, function(err, hash) {
        //     if(err) return next(err);

        //     //암호화해서 보내주기
        //     user.password = hash;
        //     //index.js의 save호출
        //     next();
        // })
        
        //hashSync(동기) vs hash, genSaltSync(동기) vs genSalt 비교
        //hashSync와 genSaltSync는 인자로 callback을 받지 않음

        // const salt = bcrypt.genSaltSync(saltRounds); 
        // const hashSalt = bcrypt.hashSync(user.password, salt);
        // if(hashSalt){
        //     next(); 
        // }

    }
    //비번이 수정된것이 아니면 그냥 저장
    else{
        next();
    }
})

//this: UserSchema의 Document 하나 
userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainpassword 1234567 === 암호화된 비번 "$2b$10$1bWGrIolGafj2Tbsv2VUbOn2tQmi8sVGGTHeap2ImLfG48Bxd7HtG"
    //this.password 는 암호화된 pw
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
            cb(null, isMatch);
    });
};

//this: UserSchema의 Document 하나 
userSchema.methods.generateToken = function(cb){
    var user = this;

    //jsonwebtoken을 이용해서 token을 생성하기
    //xxxx.yyyy.zzzz
    //header+ payload + keyObject
    // console.log(`generateToken : user._id = ${user._id}`) //63db3c7443efbf7412e5032b
    // console.log(`generateToken : user._id.toHexString() = ${user._id.toHexString()}`) //63db3c7443efbf7412e5032b
    
    // if(user._id == user._id.toHexString() ? console.log("true"): console.log("false")); //false
    // console.log(`user._id = ${typeof(user._id)}`); //obect
    // console.log(`user._id.toHexString() = ${typeof(user._id.toHexString())}`); //string
    
    var token = jwt.sign(user._id.toHexString(),'secretToken');
    //xxxxx.yyyyy.zzz
    //console.log(`'generatetoken' after signing token = ${token}`);

    //'secretToken은 keyObject
    user.token = token;
    //console.log(`token : ${typeof(token)}`); //string

    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}

//static의 this는 schema 전체 즉, user collection 전체
userSchema.statics.findByToken = function (token, cb){
    var user = this;

    //토큰을 decode한다.
    //generateToken시 secretToken(keyObject)을 했으니까
    //console.log('jwt.verify');

    //'secretToken' 은 대칭키(암호화, 복화화시 같은 키 사용)
    jwt.verify(token, 'secretToken', function(err,decoded){ 
        //decoded == userid
        //유저 아이디(decoded)를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 서버DB에 보관된 토큰이 일치하는지 확인
        //"_id:":decoded -> client가 보낸 쿠키의 토큰
        // "token" :token -> db에 저장된 토큰
        //위 2개가 같은지를 find
        user.findOne({"_id:":decoded, "token": token}, function(err,user){
            if(err) return cb(err);
            cb(null, user);
        })
    });
}

//console.log(`typeof(userSchema) : ${typeof(userSchema)}`); //object
const User = mongoose.model('User',userSchema); //스키마를 모델로 감싸줌
//console.log(`typeof(User): ${typeof(User)}`); //funciton

module.exports = {User};