# SnippingTool
一个小巧的截图工具

#安装

npm i SnippingTool

#引入

import {startCapture} from "snippingtool"  

#方法

methods:{
  start() {
            startCapture($("body"));
        }
  }

#调用

@click="start"

