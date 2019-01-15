const express = require('express');
const router = express.Router();
const comment = require('../Models/comments');

//创建评论
router.post('/createOroperation', (req, res, next) => {
    let params = {
        name: req.body.content.name,
        content: req.body.content.text,
        email: req.body.content.email,
        serial:parseInt(Math.random() * 1000000),
        status: req.body.status,
        relation: req.body.content.relation
    }
    if(params.status){
        comment.findOne({name: params.serial}, (err, data)=>{
            if(data){
                res.json({code:1, message:'重复数据'})
            }else{
                comment.create(params, (err, data) => {
                    if(data){
                        res.json({code: 0, datas:data, message:'success'})
                    }else{
                        res.send(err)
                    }
                })
            }
        })
    }
})
//获取评论
router.get('/getComments', (req, res, next) => {
    let param = {
        quantity: req.query.quantity,
        status: req.query.status
    }
    if(param.quantity == 'all' && param.status == 0){
        comment.find({}, (err, data)=>{
            if(data){
                res.json({code: 0, message:'success', datas:data})
            }else{
                res.send(err)
            }
        })
    }
    if(param.status == 0 && !param.quantity){
        forComment(res, comment, param.status)
    }
    if(param.status == 1){
        forComment(res, comment, param.status)
    }
    if(param.status == 2){
        forComment(res, comment, param.status)
    }
    
})
//获取文章评论
router.get('/getArticleComment', (req, res, next) => {
    let param = {
        relation: req.query.relation
    }
    if(param.relation){
        comment.find({relation: param.relation}, (err, data)=>{
            if(err){
                return res.send(err)
            }
            res.json({code:0, data:data, message:'success'})
        })
    }
})
//评论操作
router.post('/operation', (req, res, next)=>{
    let body = {
        status: req.body.status,
        serial: req.body.serial
    }

    switch(body.status){
        case 0:
            operation(comment, body, res);
            break;
        case 1:
            operation(comment, body, res);
            break;
        case 2:
            operation(comment, body, res);
            break;
        case 3:
            operation(comment, body, res);  
            break;     
    }
    // if(body.status == '1'){
    //     comment.findOneAndUpdate({serial: body.serial}, {status: body.status} ,(err, data) => {
    //         if(err){
    //             return res.send(err)
    //         }
    //         res.json({code:0, message:'success', data:data})
    //     })
    //     comment.findOneAndRemove
    // }

})

function forComment(response,name, number) { 
    name.find({status: number}, (err, data) => {
        if(data){
            response.json({code:0, message:'success', data:data})
        }else{
            response.json({code:1, data:err})
        }
    })
 }

 function operation(name,param, response) { 
     if(param.status == 3){
         name.findOneAndRemove({serial: param.serial}, (err, data) => {
             if(err){
                 return respons.send(err)
             }
             response.json({code:0, message:'success', data:data})
         })
         return 
     }
    name.findOneAndUpdate({serial: param.serial}, {status: param.status} ,(err, data) => {
        if(err){
            return response.send(err)
        }
        response.json({code:0, message:'success', data:data})
    })
  }

module.exports = router;