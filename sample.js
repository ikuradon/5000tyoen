var Canvas = require('canvas')
    , http = require('http');
 
http.createServer(function (req, res) {
 
    var canvas = new Canvas(200,200);
    var ctx = canvas.getContext('2d');
 
    // �l�p�`�`��
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillRect(10, 10, 190, 190);

    // �e�L�X�g�`��
    var text = "Canvas Test";
    ctx.font = '30px Impact';
    ctx.rotate(.1);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillText(text, 10, 100);
 
    // �A���_�[���C���`��
    var te = ctx.measureText(text);
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();
 
    // �o��
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<img src="' + canvas.toDataURL() + '" />');
 
}).listen(3000);