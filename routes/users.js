var express = require('express');
var router = express.Router();
var User = require('../Models/users');
var article = require('../Models/article');
var comments = require('../Models/comments');
/* GET users listing. */


// 注册
router.post('/register', (req, res)=>{
  let postData = {
    username: req.body.username,
    password: req.body.password,
    age: req.body.age,
    address: req.body.address
  }
  User.findOne({username: postData.username}, (err, data) =>{
    if(data){
      res.send('用户名已被注册')
    }else{
      User.create(postData, (err, data)=>{
        if(err){
          console.log('错啦？')
        }
        res.send('注册成功')
      })
    }
  })
})
// 登录
router.post('/login', (req, res) => {
  User.findOne({username: req.body.userName, password: req.body.password}, (err, data)=>{
    if(data){
      res.json({data: data, code: 0})
    }else{
      res.cookie('user', 'linzhiying', {expires: new Date(Date.now()+ 90000)})
      res.json({code:1, message:'账号密码错误', error:err})
    }
  })
  
})
// 仪表盘


module.exports = router;
