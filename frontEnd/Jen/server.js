var express = require('express')
var app = express()
var router  = express.Router()




app.use(express.static('assets'))


app.get('/',function(req,res){
	res.sendfile('GroceryList.html');
})

app.listen(3000,function(){
	console.log('Server is running on 3000')
})