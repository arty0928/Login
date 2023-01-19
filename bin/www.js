"use strict";

const app = require("../app");
const PORT = 3000;

//listen 이 함수가 서버에서 실행해서 화면에 보여줌
app.listen(PORT, () =>{
    console.log('서버 가동');
});
