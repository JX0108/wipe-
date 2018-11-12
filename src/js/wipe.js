var cas = document.getElementById('cas');
var context =cas.getContext("2d");
var _w = cas.width,_h=cas.height;
var raduis = 30 //涂抹的半径
var movex,movey;
var isMouseDown=false;
var t = 0


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
	context.save();
	context.lineCap="round"
	context.lineWidth = raduis*2;
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineTo(x2,y2);
	context.stroke();
	context.restore();
}
// 在canvas画布上监听自定义事件，mousedown，调用drawPoint图形
cas.onclick=function(){

}
cas.addEventListener('mousedown',function(event){
		var evt = event || window.event;
		// 获取鼠标在视口的坐标，传递参数到drawpoint的
		 movex= evt.clientX;
		 movey= evt.clientY;
		 drawPoint(context,movex,movey);
		 isMouseDown = true;
},false);

cas.addEventListener('mousemove',function(event){
	if (isMouseDown){
		var evt = event || window.event;
		// 获取鼠标在视口的坐标，传递参数到drawpoint的
		var mox= evt.clientX;
		var moy= evt.clientY;
		// drawPoint(context,movex,movey);
		drawLine(context,movex,movey,mox,moy);
		// 把每次结束点变成下一次划线的开始点
		movex = mox;
	    movey = moy;
	}else{
		return false
	}
},false);
cas.addEventListener('mouseup',function(event){
	isMouseDown = false;
	if ( getTransparencyPercent(context)>50) {
		alert("超过了50%的面积");
		clearRect(context);
	};
},false);
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