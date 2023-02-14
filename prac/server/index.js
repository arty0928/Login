const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key.js');
const { auth } = require('./middleware/auth');
const {User} = require('./models/User');

//클라이언트에서 오는 자료를 서버에서 분석해서 받을 수 있도록 body-parser
//application/x-wwww-form-urlencoded 이런 데이터를 분석해서가져옴
app.use(bodyParser.urlencoded({extended: true})); 
//application.json : json타입을 가져와서 분석
app.use(bodyParser.json());
//body parser 종류 타입

app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect(config.mongoURI)
.then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//get 가져오기
app.get("/",(req,res) => res.send("Hello world"));
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/hello', (req,res) =>{
  res.send("hihi");
})



//post: 서버의 값이나 상태 바꿀때
app.post('/api/user/register',(req,res)=>{
    //회원가입시 필요한 정보를 client(postman)에게서 가져오면
    //데이터베이스에 넣어준다

    //model의 user를 require해서 가져오고, body-parser을 require해서 가져오기
    //회원정보들을 데베에 넣기위해 request.body
    //body안에 json형식으로 들어있게 -> body parser 덕분
    const user = new User(req.body); //typeof(user) : 객체

    //몽고디비 메소드
    //user 모델에 회원정보 저장
    //콜백으로 에러있으면 에러있다고 json 형식으로 전달
    user.save((err,userInfo) => {
        if(err) {
          console.log('회원가입 실패');
          // if(err.keyPattern.email==1){
          //   return res.json({success: false, message: "이미 사용중인 이메일입니다.", err});
          // }
          return res.json({success: false, err});
        }

        //회원정보를 잘 저장했으면 status 200 success status response 
        return res.status(200).json({
            success: true,
        });
    });
});


//로그인
app.post('/api/user/login',(req,res)=>{
  //요청된 이메일을 데이터 베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      })
  }

  //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
  //User.js에 comparePassword 메소드 생성
  user.comparePassword(req.body.password , (err, isMatch) =>{
    if(!isMatch)
    return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다"})

    //비밀번호까지 맞다면 토큰 생성하기
    user.generateToken((err, user) =>{
      if(err) return res.status(400).send(err);

      //console.log(`1:1로 매핑된 db의 user = ${user}`);
      //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 ...
      //cookieParser 라이브러리 설치 
      //x_auth라는 이름의 쿠키에 생성한 user.token을 넣어주고 res로 보냄
          res.cookie("x_auth",user.token)
          .status(200)
          .json({loginSuccess: true, userId:user._id})  
    })
  })
})
})


//middleware 폴더 생성
//auth를 미들웨어로 보내줌 -> require middleware/auth
app.get('/api/user/auth',auth,(req,res)=>{

  //여기까지 미들웨어를 통과해왔다는 얘기는 Authentification이 True
  res.status(200).json({
    _id: req.user._id, //auth에서 user를 req에 넣어서 req.user._id 접근 가능
     //임의로 설정 가능 role 0: 일반 유저, 1이면 관리자 유저
    isAuth: true,
    isAdmin: req.user.role === 0 ? false : true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})


//로그아웃 Logout: DB에서 해당 유저를 찾아서 그 토큰을 지워준다.
app.get('/api/user/logout',auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, //filter 
    {token: ""} //update 정보
    ,(err,user)=>{ //callback 함수
      if(err) return res.json({success: false, err});
      //console.log(user);
      return res.status(200).send({
        success: true,
        message: "Logout 완료"
      })
    })
})


const port = 5000;

//console.log(app.listen); //function: listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  }
)
