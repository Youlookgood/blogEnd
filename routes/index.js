var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/article/addarticle', (req, res, next) => {
  res.send('this is first test')
  console.log(req, res)
})

module.exports = router;
