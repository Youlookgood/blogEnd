var express = require('express');
var router = express.Router();
var article = require('../Models/article')

// 写文章
router.post('/writeArticle', (req, res)=>{
    let textData = {
        title: req.body.title,
        content: req.body.content,
        comments: req.body.comments,
        upTime: req.body.pubdate,
        author:"linzhiying",
        serial:parseInt(Math.random() * 1000000),
        status:req.body.status,
    }
    if(req.body.status == 1 && req.body.onEdit){
        article.findOneAndUpdate({title: textData.title}, textData, (err, data) =>{
            if(data){
                res.json({code:0, message:'success'})
            }else{
                res.send(err)
            }
        })
        return 
    }
    article.findOne({title: textData.title}, (err, data) => {
        if(data){
            res.send('数据重复啦')
        }else{
            article.create(textData, (err, data) => {
                if(data){
                    res.json({code: 0, message: 'success'})
                }else{
                    res.send(err)
                }
            })
        }
    })
})

// 获取所有文章
router.get('/getArticle',async (req, res, err) => {
    // 后台获取所有文章
    var text = await article.find({author:'linzhiying'}, (err, data)=>{
        if(data){
            return data
        }else if(err){
            return err
        }
    })
    // 首页获取所有文章
    if(req.query.page == 'home'){
        text = await article.find({author:'linzhiying', status:0}, (err, data)=>{
            if(data){
                return data
            }else{
                return err
            }
        })
    }
    // 获取文章详情
    if(req.query.page == 'detail'){
        text = await article.findOne({serial: req.query.serial}, (err, data) => {
            if(data){
                return data
            }else{
                return err
            }
        })
    }
    res.json({data: text, code:0, message:'success'})  
})

// 文章操作
router.post('/operation', async (req, res, err) => {
    let newDate = {
        title: req.body.title,
        status: req.body.status,
        content: req.body.content,
        comments: req.body.comments,
        upTime: req.body.upTime,
    }
    //更新
    if(req.body.serial && req.body.status == 0){
        await article.findOneAndUpdate({serial: req.body.serial}, newDate, (err, data)=>{
            if(data){
                res.json({code: 0, message: '更新成功'})
            }else{
                res.send(err)
            }
        })
    }
    //草稿
    if(req.body.serial && req.body.status ==1){
        await article.findOneAndUpdate({serial: req.body.serial}, {status: newDate.status}, (err, data) => {
            if(data){
                res.json({code: 0, message: 'successful'})
            }else{
                res.send(err)
            }
        })
    }
    //回收站
    if(req.body.serial && req.body.status == 2){
        await article.findOneAndUpdate({serial: req.body.serial}, {status: req.body.status}, (err, data) => {
            if(data){
                res.json({code: 0, message: 'successful'})
            }else{
                res.send(err)
            }
        })
    }
    //彻底删除
    if(req.body.serial && req.body.status == 3){
        await article.findOneAndRemove({serial: req.body.serial}, (err, data)=>{
            if(data){
                res.json({code: 0, message: 'successful'})
            }else{
                res.send(err)
            }
        })
    }

})



module.exports = router;