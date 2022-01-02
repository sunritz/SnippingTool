//开启截图
import $ from "jquery";
import html2canvas from "html2canvas";
var drawnode; //截图节点
export function startCapture(node) {
	drawnode = node;
	if ($("#crop").length > 0) {
		$("#crop").css("display", "block");
	} else {
		//创建截图面板并添加到body节点最后面
		var printpsPanel =
			`<div id="crop">
				<div id="printrange">
					<div id="printfull">
						<div id="printcontent"></div>
						<ul id="printbtn">
							<li>
								<a onclick="closeps(event)">
								<svg version="1.1" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
									<title>取消</title>
									<path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
								</svg>
								</a>
							</li>
							<li style="display: none;">
								<a onclick="draw(event)">
								<svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
								<title>pencil</title>
								<path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
								</svg>
								</a>
							</li>
							<li>
								<a onclick="reset(event)">
								<svg version="1.1" fill="#fff"  xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
								<title>重置</title>
								<path d="M23.808 32c3.554-6.439 4.153-16.26-9.808-15.932v7.932l-12-12 12-12v7.762c16.718-0.436 18.58 14.757 9.808 24.238z"></path>
								</svg>
								</a>
							</li>
							<li style="display: none;">
								<a id="downloadps" onclick="closeps(event)">
									<svg version="1.1" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
										<title>下载</title>
										<path d="M23 14l-8 8-8-8h5v-12h6v12zM15 22h-15v8h30v-8h-15zM28 26h-4v-2h4v2z"></path>
									</svg>
								</a>
							</li>
							<li>
								<a onclick="completes(event)">
								<svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
								<title>完成</title>
								<path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
								</svg>
								</a>
							</li>
							<li style="display: none;">
								<a onclick="completeps(event)">
									<svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32">
									<title>完成绘制</title>
									<path d="M29.996 4c0.001 0.001 0.003 0.002 0.004 0.004v23.993c-0.001 0.001-0.002 0.003-0.004 0.004h-27.993c-0.001-0.001-0.003-0.002-0.004-0.004v-23.993c0.001-0.001 0.002-0.003 0.004-0.004h27.993zM30 2h-28c-1.1 0-2 0.9-2 2v24c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-24c0-1.1-0.9-2-2-2v0z"></path>
									<path d="M26 9c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
									<path d="M28 26h-24v-4l7-12 8 10h2l7-6z"></path>
									</svg>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>`;
		$(document.body).append(printpsPanel);
		//赋值样式
		var w = $(window).width();
		var h = $(window).height();
		$("#crop").attr("style", "margin:0;padding:0;z-index: 20210926;display: block;width: " + (w - 4) +
			"px;height: " + (h - 4) +
			"px;background: transparent;overflow: hidden;position: absolute;top: 0px;left: 0px;border: 2px solid #0066FF;"
		);
		$("#crop #printrange").attr("style",
			"margin:0;padding:0;z-index: 20210926;width: 0px;height: 0px;box-shadow: rgba(59,59,59,0.5) 0 0 0 2018px;display: inline-block;position: absolute;left: 30%;top: 30%;cursor: move;border: 1px solid #004eff;"
		);
		$("#crop #printfull").attr("style", "margin:0;padding:0;width: 100%;height: 100%;position: relative;");
		$("#crop #printcontent").attr("style",
			"margin:0;padding:0;width: 100%;height: 100%;position: absolute;left: 0px;top: 0px;");
		$("#crop #printbtn").attr("style",
			"margin:0;padding:0;display: none;z-index: 1004;font-size: 14px;position: absolute;top: 0px;right: -1px;background-color: #004eff;border-radius: 0px 0px 8px 8px;"
		);
		$("#crop #printbtn li").attr("style",
			"margin:0 3px;padding:0;display: block;float: left;text-align: center;padding:4px;width: 24px;");
		$("#crop #printbtn li:nth-child(2),#crop #printbtn li:nth-child(4),#crop #printbtn li:nth-child(6)").css("display", "none");
		$("#crop #printbtn li a").attr("style",
		"margin:0;padding:0;cursor: pointer;color: #FFF;text-decoration: none;");
	}
	pointToRecDrag(document.getElementById("printrange")); //注册截图事件
}

//完成截图
window.completes = function(e) {
	isCanDrag = false; //禁止拖拽
	e.stopPropagation(); //阻止冒泡
	removeSetNodeEvent(document.getElementById("printrange"), 'onmousedown', drag); //注销事件

	//生成图片canvas
	var prleft = $("#printrange").css("left");
	var prtop = $("#printrange").css("top");
	var startx = prleft.substring(0, prleft.length - 2);
	var starty = prtop.substring(0, prtop.length - 2);
	var imgw = $("#printrange").width();
	var imgh = $("#printrange").height();
	convertHtmlCanvas(startx, starty, imgw, imgh);
	//显示按钮
	// $.each($("#printbtn li"), function(index, obj) {
	// 	$(obj).css("display", "none");
	// });
	$("#printbtn li:nth-child(3),#printbtn li:nth-child(5),#printbtn li:nth-child(4)").hide()
	$("#printbtn li:nth-child(2),#printbtn li:nth-child(6)").css("display", "block");
	$("#printbtn").css("left", ($("#printrange").width() - 100) + "px"); //32
}

window.completeps = function(e) {
	isCanDrag = false; //禁止拖拽
	e.stopPropagation(); //阻止冒泡
	removeSetNodeEvent(document.getElementById("printrange"), 'onmousedown', drag); //注销事件
	$("#printbtn li:nth-child(2),#printbtn li:nth-child(6)").hide();
	$("#printbtn li:nth-child(4)").css("display", "block");
	//生成图片canvas
	var prleft = $("#printrange").css("left");
	var prtop = $("#printrange").css("top");
	var startx = prleft.substring(0, prleft.length - 2);
	var starty = prtop.substring(0, prtop.length - 2);
	var imgw = $("#printrange").width();
	var imgh = $("#printrange").height();
	convertHtmlCanvasPs(startx, starty, imgw, imgh);	
}

//关闭截图
window.closeps = function(e) {
	$("#printcontent").empty(); //清除canvas
	isCanDrag = true; //允许拖拽
	e.stopPropagation(); //阻止冒泡
	removeSetNodeEvent(document, 'onmousedown', drag); //注销事件
	removeSetNodeEvent(document.getElementById("printrange"), 'onmousedown', drag); //注销事件
	$("#printbtn").css("display", "none");
	//显示按钮
	$.each($("#printbtn li"), function(index, obj) {
		$(obj).css("display", "block");
	});
	$("#printbtn li:nth-child(2),#printbtn li:nth-child(4),#printbtn li:nth-child(6)").css("display", "none");
	$("#printbtn").css("left", ($("#printrange").width() - 100) + "px"); //32
	$("#printrange").css("width", "0px");
	$("#printrange").css("height", "0px");
	//还原背景
	$("#printcontent").css("background", "none");
	$("#crop").css("background", "none");
	$("#crop").css("display", "none");
}
//重置
window.reset = function(e) {
	isCanDrag = true; //允许拖拽
	e.stopPropagation(); //阻止冒泡
	removeSetNodeEvent(document.getElementById("printrange"), 'onmousedown', drag); //注销事件
	$("#printbtn").css("display", "none");
	//显示按钮
	$.each($("#printbtn li"), function(index, obj) {
		$(obj).css("display", "block");
	});
	$("#printbtn li:nth-child(2),#printbtn li:nth-child(4),#printbtn li:nth-child(6)").css("display", "none");
	$("#printbtn").css("left", ($("#printrange").width() - 100) + "px"); //32
	$("#printrange").css("width", "0px");
	$("#printrange").css("height", "0px");
	//还原背景
	$("#printcontent").css("background", "none");
	$("#crop").css("background", "none");
	//再重新注册事件
	pointToRecDrag(document.getElementById("printrange"));
}
//Html转换Canvas
window.convertHtmlCanvas = function(startx, starty, imgw, imgh) {
	$("#crop").css("display", "none");
	html2canvas(drawnode[0]).then(function(canvas) {
		var img = convertCanvasImage(canvas); //转换canvas得到img·这时img是$("#divpic")范围的
		$("#crop").css("background", "url(" + img.src + ") no-repeat");
		$("#crop").css("background-position", "-2px -2px");
		//img加载时···截取特定部分
		img.onload = function() {
			$("#crop").css("display", "block");
			img.onload = null;
			canvas = convertImageCanvas(img, Number(startx) + 3, Number(starty) + 3, imgw,
				imgh); //选定范围重新绘制canvas
		}
	});
}

//Html转换Canvas 含绘制部分
window.convertHtmlCanvasPs = function(startx, starty, imgw, imgh) {
	$("#crop").css("display", "none");
	html2canvas(drawnode[0]).then(function(canvasz) {
		var img = convertCanvasImage(canvasz); //转换canvas得到img·这时img是$("#divpic")范围的
		$("#crop").css("background", "url(" + img.src + ") no-repeat");
		$("#crop").css("background-position", "-2px -2px");
		//img加载时···截取特定部分
		img.onload = function() {
			$("#crop").css("display", "block");
			img.onload = null;
			canvasz = convertImageCanvasPs(img, Number(startx) + 3, Number(starty) + 3, imgw,
				imgh); //选定范围重新绘制canvas
			// canvas转png下载
			img = convertCanvasImage(canvasz); //canvas再转换img···截取到特定部分的图片
			var imgsrcz = img.src; //获取img的src
			$("#printcontent").css("background", "url(" + imgsrcz + ") no-repeat");
			$("#printcontent").css("background-position", "0px 0px");
			//下载图片
			$('#downloadps').attr('href', imgsrcz); //设置路径
			$('#downloadps').attr('download', 'screenshot.png'); //设置下载图片名称
		}
	});
}

//canvas转换图片，返回图片
window.convertCanvasImage = function(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png", 0.1);
	return image;
}

var context,lineW;
//图片转换canvas，返回canvas
window.convertImageCanvas = function(image, startX, startY, width, height) {
	var canvas = document.createElement("canvas");
	canvas.setAttribute('id', 'canvas');
	canvas.width = width;
	canvas.height = height;
	$("#printcontent").append(canvas); //追加画布节点
	canvas.setAttribute('id', 'canvas');
	canvas.getContext("2d").drawImage(image, startX, startY, width, height, 0, 0, width, height);
	context = canvas.getContext("2d");
	lineW=3
	return canvas;
}

window.convertImageCanvasPs = function(image, startX, startY, width, height) {
	$("#crop #printrange").css("cursor","auto");
	var canvasz = document.getElementById("canvas");
	lineW = .01;
	return canvasz;
}

var cliX = new Array();
var cliY = new Array();
var cliDrag = new Array();
var paint;

var drawps;
window.draw = function() {
	$("#crop #printrange").css("cursor","url(data:image/png;base64,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),auto");
	drawps = bindNodeEvent(document, 'mousedown', function(e) {
		// var mouseX = e.pageX - this.offsetLeft;
		// var mouseY = e.pageY - this.offsetTop;
		console.log(e.pageX, $("#printcontent").offset().left)
		paint = true;
		// addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		addClick(e.pageX - $("#printcontent").offset().left, e.pageY - $("#printcontent").offset().top);
		bluedraw();
	})


	drawps = bindNodeEvent(document, 'mousemove', function(e) {
		if (paint) {
			// addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			addClick(e.pageX - $("#printcontent").offset().left, e.pageY - $("#printcontent").offset().top,
				true);
			bluedraw();
		}
	});
	drawps = bindNodeEvent(document, 'mouseup', function(e) {
		paint = false;
	});
	drawps = bindNodeEvent(document, 'mouseleave', function(e) {
		paint = false;
	});
}

window.addClick = function(x, y, dragging) {
	cliX.push(x);
	cliY.push(y);
	cliDrag.push(dragging);
}

var point = {};
point.notFirst = false;
window.bluedraw = function() {
	// canvas.width = canvas.width; // Clears the canvas
	context.strokeStyle = "#0094ff";
	context.lineJoin = "round";
	context.lineWidth = lineW;
	while (cliX.length > 0) {
		point.bx = point.x;
		point.by = point.y;
		point.x = cliX.pop();
		point.y = cliY.pop();
		point.drag = cliDrag.pop();
		context.beginPath();
		if (point.drag && point.notFirst) {
			context.moveTo(point.bx, point.by);
		} else {
			point.notFirst = true;
			context.moveTo(point.x - 1, point.y);
		}
		context.lineTo(point.x, point.y);
		context.closePath();
		context.stroke();
	}
}

//拉框截图方法·jQuery
window.pointToRecDrag = function(dragger) {
	$("#crop").on("mousedown", function(event) {
		var w = $(window).width();
		var h = $(window).height();
		var clickX = event.pageX;
		var clickY = event.pageY;
		$(dragger).width("0px");
		$(dragger).height("0px");
		var draggerw = $(dragger).width();
		var draggerh = $(dragger).height();
		$(dragger).css("left", clickX + "px");
		$(dragger).css("top", clickY + "px");
		$("#crop").on("mousemove", function(e) {
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var difw = mouseX - clickX; //鼠标移动像素大小
			var difh = mouseY - clickY;
			if (difw < 0 && difh < 0) {
				//向左上截图
				$(dragger).css("left", (clickX + difw) + "px");
				$(dragger).css("top", (clickY + difh) + "px");
			} else if (difw > 0 && difh < 0) {
				//向右上截图
				$(dragger).css("top", (clickY + difh) + "px");
			} else if (difw < 0 && difh > 0) {
				//向左下截图
				$(dragger).css("left", (clickX + difw) + "px");
			} else {
				//向右下截图
				$(dragger).css("left", clickX + "px");
				$(dragger).css("top", clickY + "px");
			}
			difw = Math.abs(difw); //取绝对值
			difh = Math.abs(difh);
			$(dragger).width(draggerw + difw + "px");
			$(dragger).height(draggerh + difh + "px");
		});
		$("#crop").on("mouseup", function(ev) {
			var mouseX = ev.pageX;
			var mouseY = ev.pageY;
			var difw = mouseX - clickX; //鼠标移动像素大小
			var difh = mouseY - clickY;
			//具体通过canvas截取img，直接赋值给dragger，然后就可以下载保存
			if (difw < 0 && difh < 0) {
				//按钮位置
				$("#printbtn").css("left", ($(dragger).width() - 95) + "px"); //32
				$("#printbtn").css("top", ($(dragger).height() + 1) + "px");
				if ((mouseY + 4 + 28) > h) {
					$("#printbtn").css("top", ($(dragger).height() - 28) + "px");
				}
			} else if (difw > 0 && difh < 0) {
				//按钮位置
				$("#printbtn").css("left", ($(dragger).width() - 95) + "px"); //32
				$("#printbtn").css("top", ($(dragger).height() + 1) + "px");
				if ((mouseY + 4 + 28) > h) {
					$("#printbtn").css("top", ($(dragger).height() - 28) + "px");
				}
			} else if (difw < 0 && difh > 0) {
				//按钮位置
				$("#printbtn").css("left", ($(dragger).width() - 95) + "px"); //32
				$("#printbtn").css("top", ($(dragger).height() + 1) + "px");
				if ((mouseY + 4 + 28) > h) {
					$("#printbtn").css("top", ($(dragger).height() - 28) + "px");
				}
			} else {
				//按钮位置
				$("#printbtn").css("left", ($(dragger).width() - 95) + "px"); //32
				$("#printbtn").css("top", ($(dragger).height() + 1) + "px");
				if ((mouseY + 4 + 28) > h) {
					$("#printbtn").css("top", ($(dragger).height() - 28) + "px");
				}
			}
			$("#printbtn").css({
				"display": "flex"
			}); //按钮
			//移除截图事件
			$("#crop").off("mousemove");
			$("#crop").off("mousedown");
			$("#crop").off("mouseup");
			//注册拖框事件
			dragNodeElement(document.getElementById("printrange"));
		});
	});
}
//拖拽方法·js
var isCanDrag = true; //是否允许拖拉
var drag; //拖拽对象
window.dragNodeElement = function(dragger) {
	if (isCanDrag) {
		var w = document.documentElement.clientWidth || document.body.clientWidth;
		var h = document.documentElement.clientHeight || document.body.clientHeight;
		drag = bindNodeEvent(dragger, 'onmousedown', function(e) {
			var printrangew = $("#printrange").width();
			var printrangeh = $("#printrange").height();
			e = e || event;
			var mouseX = e.clientX || e.pageX;
			var mouseY = e.clientY || e.pageY;
			var objStyle = dragger.currentStyle || window.getComputedStyle(dragger, null);
			var objX = parseInt(objStyle.left) || 0;
			var objY = parseInt(objStyle.top) || 0;
			var limitX = mouseX - objX;
			var limitY = mouseY - objY;
			if (!dragger.onDrag) {
				dragger.onDrag = bindNodeEvent(document, 'onmousemove', function(e) {
					e = e || event;
					dragger.style.left = ((e.clientX || e.pageX) - limitX) + 'px';
					dragger.style.top = ((e.clientY || e.pageY) - limitY) + 'px';
					if (h - ((e.clientY || e.pageY) - limitY + printrangeh + 6) < 28) {
						$("#printbtn").css("top", ($(dragger).height() - 28) + "px");
					} else {
						$("#printbtn").css("top", ($(dragger).height() + 1) + "px");
					}
					if (parseInt(dragger.style.left) <= 2) {
						dragger.style.left = 2 + "px";
					}
					if (parseInt(dragger.style.left) >= (w - printrangew - 6)) {
						dragger.style.left = (w - printrangew - 6) + "px";
					}
					if (parseInt(dragger.style.top) >= (h - printrangeh - 6)) {
						dragger.style.top = (h - printrangeh - 6) + "px";
					}
					if (parseInt(dragger.style.top) <= 2) {
						dragger.style.top = 2 + "px";
					}
				});
				dragger.onDragEnd = bindNodeEvent(document, 'onmouseup', function() {
					removeSetNodeEvent(document, 'onmousemove', dragger.onDrag);
					removeSetNodeEvent(document, 'onmouseup', dragger.onDragEnd);
					try {
						delete dragger.onDrag;
						delete dragger.onDragEnd;
					} catch (e) {
						dragger.removeAttribute('onDrag');
						dragger.removeAttribute('onDragEnd');
					}
				});
			}
		});
	}
}
//添加事件
window.bindNodeEvent = function(node, eventType, callback) {
	if (node.attachEvent) {
		if (eventType.indexOf('on')) {
			eventType = 'on' + eventType
		}
		node.attachEvent(eventType, callback);
	} else {
		if (!eventType.indexOf('on')) {
			eventType = eventType.substring(2, eventType.length);
		}
		node.addEventListener(eventType, callback, false);
	}
	return callback;
}
//移除事件
window.removeSetNodeEvent = function(node, eventType, callback) {
	if (node.detachEvent) {
		if (eventType.indexOf('on')) {
			eventType = 'on' + eventType
		}
		node.detachEvent(eventType, callback);
	} else {
		if (!eventType.indexOf('on')) {
			eventType = eventType.substring(2, eventType.length);
		}
		node.removeEventListener(eventType, callback, false);
	}
}
