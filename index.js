//开启截图
import $ from "jquery";
import html2canvas from "html2canvas";
var drawnode;//截图节点
export function startCapture(node){
  drawnode = node;
  if($("#crop").length > 0){
    $("#crop").css("display", "block");
  }else{
    //创建截图面板并添加到body节点最后面
    var printpsPanel = '<div id="crop"><div id="printrange"><div id="printfull"><div id="printcontent"></div><ul id="printbtn"><li><a onclick="closeps(event)">' +
        `<svg version="1.1" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
        <title>取消</title>
        <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
        </svg>` +
        '</a></li><li style="display: none;"><a id="downloadps" onclick="closeps(event)">' +
        `<svg version="1.1" fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
        <title>下载</title>' +
        <path d="M23 14l-8 8-8-8h5v-12h6v12zM15 22h-15v8h30v-8h-15zM28 26h-4v-2h4v2z"></path>
        </svg>`+
        '</a></li><li><a onclick="reset(event)">' +
        `<svg version="1.1" fill="#fff"  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
        <title>重置</title>
        <path d="M23.808 32c3.554-6.439 4.153-16.26-9.808-15.932v7.932l-12-12 12-12v7.762c16.718-0.436 18.58 14.757 9.808 24.238z"></path>
        </svg>` +
        '</a></li><li><a onclick="completes(event)">' +
        `<svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
        <title>完成</title>
        <path d="M27 4l-15 15-7-7-5 5 12 12 20-20z"></path>
        </svg>` +
        '</a></li></ul></div></div></div>';
    $(document.body).append(printpsPanel);
    //赋值样式
    var w = $(window).width();
    var h = $(window).height();
    $("#crop").attr("style", "margin:0;padding:0;z-index: 19950529;display: block;width: "+(w-4)+"px;height: "+(h-4)+"px;background: transparent;overflow: hidden;position: absolute;top: 0px;left: 0px;border: 2px solid #0066FF;");
    $("#crop #printrange").attr("style", "margin:0;padding:0;z-index: 19950529;width: 0px;height: 0px;box-shadow: rgba(59,59,59,0.5) 0 0 0 2018px;display: inline-block;position: absolute;left: 30%;top: 30%;cursor: move;border: 1px solid #004eff;");
    $("#crop #printfull").attr("style", "margin:0;padding:0;width: 100%;height: 100%;position: relative;");
    $("#crop #printcontent").attr("style", "margin:0;padding:0;width: 100%;height: 100%;position: absolute;left: 0px;top: 0px;");
    $("#crop #printbtn").attr("style", "margin:0;padding:0;display: none;z-index: 1004;font-size: 14px;position: absolute;top: 0px;right: -1px;background-color: #004eff;border-radius: 0px 0px 8px 8px;");
    $("#crop #printbtn li").attr("style", "margin:0 3px;padding:0;display: block;float: left;text-align: center;padding:4px;width: 24px;");
    $("#crop #printbtn li:nth-child(2)").css("display", "none");
    $("#crop #printbtn li:nth-child(2)").css({"width":"24px","marginLeft":"10px"});
    $("#crop #printbtn li a").attr("style", "margin:0;padding:0;cursor: pointer;color: #FFF;text-decoration: none;");
  }
  pointToRecDrag(document.getElementById("printrange"));//注册截图事件
}
//完成截图
window.completes=function(e){
  isCanDrag = false;//禁止拖拽
  e.stopPropagation();//阻止冒泡
  removeSetNodeEvent(document.getElementById("printrange"), 'onmousedown', drag);//注销事件
  //生成图片
  var prleft = $("#printrange").css("left");
  var prtop = $("#printrange").css("top");
  var startx = prleft.substring(0, prleft.length-2);
  var starty = prtop.substring(0, prtop.length-2);
  var imgw = $("#printrange").width();
  var imgh = $("#printrange").height();
  convertHtmlCanvas(startx, starty, imgw, imgh);
  //显示按钮
  $.each($("#printbtn li"), function(index, obj){
    $(obj).css("display", "none");
  });
  $("#printbtn li:first-child").css("display", "block");
  $("#printbtn li:nth-child(2)").css("display", "block");
  $("#printbtn").css("left", ($("#printrange").width()-78) + "px");//32
}


//关闭截图
window.closeps=function(e){
  isCanDrag = true;//允许拖拽
  e.stopPropagation();//阻止冒泡
  removeSetNodeEvent(document.getElementById("printrange"), 'onmousedown', drag);//注销事件
  $("#printbtn").css("display", "none");
  //显示按钮
  $.each($("#printbtn li"), function(index, obj){
    $(obj).css("display", "block");
  });
  $("#printbtn li:nth-child(2)").css("display", "none");
  $("#printbtn").css("left", ($("#printrange").width()-88) + "px");//32
  $("#printrange").css("width", "0px");
  $("#printrange").css("height", "0px");
  //还原背景
  $("#printcontent").css("background", "none");
  $("#crop").css("background", "none");
  $("#crop").css("display", "none");
}
//重置
window.reset=function(e){
  isCanDrag = true;//允许拖拽
  e.stopPropagation();//阻止冒泡
  removeSetNodeEvent(document.getElementById("printrange"), 'onmousedown', drag);//注销事件
  $("#printbtn").css("display", "none");
  //显示按钮
  $.each($("#printbtn li"), function(index, obj){
    $(obj).css("display", "block");
  });
  $("#printbtn li:nth-child(2)").css("display", "none");
  $("#printbtn").css("left", ($("#printrange").width()-88) + "px");//32
  $("#printrange").css("width", "0px");
  $("#printrange").css("height", "0px");
  //还原背景
  $("#printcontent").css("background", "none");
  $("#crop").css("background", "none");
  //再重新注册事件
  pointToRecDrag(document.getElementById("printrange"));
}
//Html转换Canvas
window.convertHtmlCanvas=function (startx, starty, imgw, imgh) {
  $("#crop").css("display", "none");
  html2canvas(drawnode[0]).then(function(canvas) {
    var img = convertCanvasImage(canvas);//转换canvas得到img·这时img是$("#divpic")范围的
    $("#crop").css("background", "url(" + img.src + ") no-repeat");
    $("#crop").css("background-position", "-2px -2px");
    //img加载时···截取特定部分
    img.onload = function() {
      $("#crop").css("display", "block");
      img.onload = null;
      canvas = convertImageCanvas(img, Number(startx)+3, Number(starty)+3, imgw, imgh);//选定范围重新绘制canvas
      img = convertCanvasImage(canvas);//canvas再转换img···截取到特定部分的图片
      var imgsrc = img.src;//获取img的src
      $("#printcontent").css("background", "url(" + imgsrc + ") no-repeat");
      $("#printcontent").css("background-position", "0px 0px");
      //下载图片
      $('#downloadps').attr('href', imgsrc); //设置路径
      $('#downloadps').attr('download', 'screenshot.png'); //设置下载图片名称
    }
  });
}
//canvas转换图片，返回图片
window.convertCanvasImage=function (canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png", 0.1);
  return image;
}
//图片转换canvas，返回canvas
window.convertImageCanvas=function (image, startX, startY, width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(image, startX, startY, width, height, 0, 0, width, height);
  return canvas;
}
//拉框截图方法·jQuery
window.pointToRecDrag=function (dragger){
  $("#crop").on("mousedown", function(event){
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
    $("#crop").on("mousemove", function(e){
      var mouseX = e.pageX;
      var mouseY = e.pageY;
      var difw = mouseX - clickX;//鼠标移动像素大小
      var difh = mouseY - clickY;
      if(difw<0 && difh<0){
        //向左上截图
        $(dragger).css("left", (clickX+difw) + "px");
        $(dragger).css("top", (clickY+difh) + "px");
      }else if(difw>0 && difh<0){
        //向右上截图
        $(dragger).css("top", (clickY+difh) + "px");
      }else if(difw<0 && difh>0){
        //向左下截图
        $(dragger).css("left", (clickX+difw) + "px");
      }else{
        //向右下截图
        $(dragger).css("left", clickX + "px");
        $(dragger).css("top", clickY + "px");
      }
      difw = Math.abs(difw); //取绝对值
      difh = Math.abs(difh);
      $(dragger).width(draggerw + difw + "px");
      $(dragger).height(draggerh + difh + "px");
    });
    $("#crop").on("mouseup", function(ev){
      var mouseX = ev.pageX;
      var mouseY = ev.pageY;
      var difw = mouseX - clickX;//鼠标移动像素大小
      var difh = mouseY - clickY;
      //具体通过canvas截取img，直接赋值给dragger，然后就可以下载保存
      if(difw<0 && difh<0){
        //按钮位置
        $("#printbtn").css("left", ($(dragger).width()-95) + "px");//32
        $("#printbtn").css("top", ($(dragger).height()+1) + "px");
        if((mouseY + 4 + 28) > h){
          $("#printbtn").css("top", ($(dragger).height()-28) + "px");
        }
      }else if(difw>0 && difh<0){
        //按钮位置
        $("#printbtn").css("left", ($(dragger).width()-95) + "px");//32
        $("#printbtn").css("top", ($(dragger).height()+1) + "px");
        if((mouseY + 4 + 28) > h){
          $("#printbtn").css("top", ($(dragger).height()-28) + "px");
        }
      }else if(difw<0 && difh>0){
        //按钮位置
        $("#printbtn").css("left", ($(dragger).width()-95) + "px");//32
        $("#printbtn").css("top", ($(dragger).height()+1) + "px");
        if((mouseY + 4 + 28) > h){
          $("#printbtn").css("top", ($(dragger).height()-28) + "px");
        }
      }else{
        //按钮位置
        $("#printbtn").css("left", ($(dragger).width()-95) + "px");//32
        $("#printbtn").css("top", ($(dragger).height()+1) + "px");
        if((mouseY + 4 + 28) > h){
          $("#printbtn").css("top", ($(dragger).height()-28) + "px");
        }
      }
      $("#printbtn").css({"display": "block"});//按钮
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
var isCanDrag = true;//是否允许拖拉
var drag; //拖拽对象
window.dragNodeElement=function (dragger) {
  if(isCanDrag){
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
      if(!dragger.onDrag) {
        dragger.onDrag = bindNodeEvent(document, 'onmousemove', function(e) {
          e = e || event;
          dragger.style.left = ((e.clientX || e.pageX) - limitX) + 'px';
          dragger.style.top = ((e.clientY || e.pageY) - limitY) + 'px';
          if(h - ((e.clientY || e.pageY) - limitY + printrangeh + 6) < 28){
            $("#printbtn").css("top", ($(dragger).height()-28) + "px");
          }else{
            $("#printbtn").css("top", ($(dragger).height()+1) + "px");
          }
          if(parseInt(dragger.style.left) <= 2) {
            dragger.style.left = 2 + "px";
          }
          if(parseInt(dragger.style.left) >= (w - printrangew - 6)) {
            dragger.style.left = (w - printrangew - 6) + "px";
          }
          if(parseInt(dragger.style.top) >= (h - printrangeh - 6)) {
            dragger.style.top = (h - printrangeh - 6) + "px";
          }
          if(parseInt(dragger.style.top) <= 2) {
            dragger.style.top = 2 + "px";
          }
        });
        dragger.onDragEnd = bindNodeEvent(document, 'onmouseup', function() {
          removeSetNodeEvent(document, 'onmousemove', dragger.onDrag);
          removeSetNodeEvent(document, 'onmouseup', dragger.onDragEnd);
          try {
            delete dragger.onDrag;
            delete dragger.onDragEnd;
          } catch(e) {
            dragger.removeAttribute('onDrag');
            dragger.removeAttribute('onDragEnd');
          }
        });
      }
    });
  }
}
//添加事件
window.bindNodeEvent=function (node, eventType, callback) {
  if(node.attachEvent) {
    if(eventType.indexOf('on')) { eventType = 'on' + eventType }
    node.attachEvent(eventType, callback);
  } else {
    if(!eventType.indexOf('on')) {
      eventType = eventType.substring(2, eventType.length);
    }
    node.addEventListener(eventType, callback, false);
  }
  return callback;
}
//移除事件
window.removeSetNodeEvent=function (node, eventType, callback) {
  if(node.detachEvent) {
    if(eventType.indexOf('on')) { eventType = 'on' + eventType }
    node.detachEvent(eventType, callback);
  } else {
    if(!eventType.indexOf('on')) {
      eventType = eventType.substring(2, eventType.length);
    }
    node.removeEventListener(eventType, callback, false);
  }
}
