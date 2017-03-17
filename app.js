const express = require('express');
const expressVue = require('express-vue');
const path = require('path');
const app = express();
const port = 8080;

const routes = require('./routes/index');

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

// app.get('/', (req,res) => {

// 	 var scope = {
// 		// data: {
// 		// },
// 		// vue: {
// 		// 	components: ['hello']
// 		// }
// 	 }

//     res.render('index', scope);
// });

app.use('/', routes);

app.listen(port, (err, res) => {
	if (err){
		console.log("ERROR: " + err);
	}
	else{
		console.log('Server running...');
	}
});