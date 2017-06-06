var Canvas = require('canvas')
	, Image = Canvas.Image
	, path = require('path')
	, express = require('express')
	, app = express();

Canvas.registerFont(fontFile('mplus-1p-black.ttf'), {family: 'mplus-1p-black'});

function fontFile(name) {
	return path.join(__dirname, name);
}

function draw(text, size) {
	text = text === undefined ? "5000兆円" : text;
	size = size === undefined ? 1 : size;
	//M@G1C NUMB3RS
	var posx = 70;
	var posy = 100;
	var height = 130;
	
	var canvas = new Canvas(0, 0);
	var context = canvas.getContext('2d');
	
	context.font = '100px "mplus-1p-black"';
	context.lineJoin = 'round';

	var metrics = context.measureText(text);
	var width = metrics.width + 90;
	canvas.height = height;
	canvas.width = width;

	context.setTransform(1,0,-0.4,1,0,0);
	
	console.log("Text: " + text);
	console.log("width: " + width);
	
	//銀色
	for (var i = 0; i < 10; i++) {
		{
			var grad = context.createLinearGradient(0, 20, 0, 100);
			grad.addColorStop(0, 'rgb(' + 10 * i + ', ' + 10 * i + ', ' + 10 * i + ')');
			context.strokeStyle = grad;
			context.lineWidth = 28;
			context.strokeText(text, posx - 3 + i, posy + 2);
		}
	}
	  //黒色
	{
		context.strokeStyle = "#000000";
		context.lineWidth = 22;
		context.strokeText(text, posx, posy);
	}
	//金色
	{
		var grad = context.createLinearGradient(0, 20, 0, 100);
		grad.addColorStop(0.3, 'rgb(255, 255, 255)');
		grad.addColorStop(0.5, 'rgb(240, 180, 5)');
		grad.addColorStop(0.8, 'rgb(89, 33, 0)');
		grad.addColorStop(1, 'rgb(240, 180, 5)');
		context.strokeStyle = grad;
		context.lineWidth = 19;
		context.strokeText(text, posx, posy);
	}

	//白
	{
		context.lineWidth = 6;
		context.strokeStyle = '#FFFFFF';
		context.strokeText(text, posx, posy - 3);
	}
	
	//赤
	{
		var grad = context.createLinearGradient(0, 20, 0, 100);
		grad.addColorStop(0, 'rgb(230, 0, 0)');
		grad.addColorStop(0.5, 'rgb(123, 0, 0)');
		grad.addColorStop(0.51, 'rgb(240, 0, 0)');
		grad.addColorStop(1, 'rgb(5, 0, 0)');
		context.lineWidth = 4;
		context.strokeStyle = grad;
		context.strokeText(text, posx, posy - 3);
	}


	//赤
	{
		var grad = context.createLinearGradient(0, 20, 0, 100);
		grad.addColorStop(0, 'rgb(230, 0, 0)');
		grad.addColorStop(0.5, 'rgb(123, 0, 0)');
		grad.addColorStop(0.51, 'rgb(240, 0, 0)');
		grad.addColorStop(1, 'rgb(5, 0, 0)');
		context.fillStyle = grad;
		context.fillText(text, posx, posy - 3);
	}

	var dstWidth = canvas.width * size;
	var dstHeight = canvas.height * size;
	var _res = new Canvas(dstWidth, dstHeight);
	_res.getContext('2d').drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, dstWidth, dstHeight);

	return _res;
}

app.get('/', function(req, res) {
	var text = req.query.text;
	var size = req.query.size;
	res.setHeader("Context-Type", "image/png");
	draw(text, size).pngStream().pipe(res);
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('5000兆円 app listening at http://%s:%s', host, port);
});