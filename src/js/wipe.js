var cas = document.getElementById('cas');
var context =cas.getContext("2d");
var _w = cas.width,_h=cas.height;
var raduis = 10 //涂抹的半径
var movex,movey;
var isMouseDown=false;
var t = 0
var device = (/android|webos|iPhone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
// console.log(device);
var Press = device ? 'touchstart':'mousedown';
var Move = device ? 'touchmove':'mousemove';
var Uplift  = device ? 'touchend':'mouseup';


function drawMask(context){
	context.fillStyle="#666";
    context.fillRect(0,0,375,667);
    context.globalCompositeOperation="destination-out"
}
// 在画布上画半径为30的圆
function drawPoint(context,movex,movey){
	context.save();
	context.beginPath();
	context.arc(movex,movey,raduis,0,2*Math.PI);
	context.fillStyle="red";
	context.fill();
	context.restore();
}
function drawLine(context,x1,y1,x2,y2){
	console.log("传递参数的个数"+arguments.length)
	context.save();
	context.beginPath();
	context.lineCap="round"
	context.lineWidth = raduis*2;
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.stroke();
	context.restore();
}
// function drawRound(context,x1,y1,x2,y2){
// 	context.save();
// 	context.beginPath();
// 	if (arguments.length==3) {
// 		context.arc(x1,x2,raduis,0,2*Math.PI);
// 		context.fillStyle="red";
// 		context.fill();
// 	}else{
// 		context.lineCap="round"
// 		context.lineWidth = raduis*2;
// 		context.moveTo(x1,y1);
// 		context.lineTo(x2,y2);
// 		context.stroke();
// 	}
// 	context.restore();
// }
function clearRect(context){
	context.clearRect(0,0,_w,_h);
}
function getTransparencyPercent(context){
	var imgData =context.getImageData(0,0,_w,_h);
	for (var i = 0; i < imgData.data.length; i+=4) {
			var a = imgData.data[i+3];
			if (a==0) {
				t++;
			};
		};
		console.log("透明点的个数:"+t);
		var percent=(t/(_w*_h))*100;
		// console.log(percent);
		console.log("占总面积"+Math.ceil(percent)+"%");
		return Math.round(percent);
}
window.onload=function(){
	drawMask(context);
}

// 在canvas画布上监听自定义事件，mousedown，调用drawPoint图形
// cas.addEventListener('mousedown',down,false);
cas.addEventListener(Press,down,false);
function down(event){
		var evt = event || window.event;
		// 获取鼠标在视口的坐标，传递参数到drawpoint的
 		movex= device ? evt.touches[0].clientX:evt.clientX;
		movey= device ? evt.touches[0].clientY:evt.clientY;
		 drawPoint(context,movex,movey);
		 isMouseDown = true;
}

// cas.addEventListener('mousemove',move,false);
cas.addEventListener(Move,move,false);
function move(event){
	if (isMouseDown){
		var evt = event || window.event;
		evt.preventDefault(); 
		// 获取鼠标在视口的坐标，传递参数到drawpoint的
		var mox= device ? evt.touches[0].clientX:evt.clientX;
		var moy= device ? evt.touches[0].clientY: evt.clientY;
		// drawPoint(context,movex,movey);
		drawLine(context,movex,movey,mox,moy);
		// 把每次结束点变成下一次划线的开始点
		movex = mox;
	    movey = moy;
	}else{
		return false
	}
}
// cas.addEventListener('mouseup',fn2,false);
cas.addEventListener(Uplift,function(event){
	t=0
	isMouseDown = false;
	if ( getTransparencyPercent(context)>50) {
		alert("超过了50%的面积");
		clearRect(context);
	};
},false);


