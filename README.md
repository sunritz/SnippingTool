# snippingtool 
## It is a Vue screenshot annotation widget
> It can intercept any position in the web page, and has a small blue brush to mark within the intercepted range. Finally, it is saved as a PNG file locally together with the marked content.
## dependencies
> It relies on jQuery and html2canvas, so make sure your project has both plug-ins installed before use.
## install

    npm i snippingtool 
***
> jQuery and snippingtool should been introduced into the current component.

    import  {startCapture} from 'snippingtool'
    import $ from 'jquery'
> Write a method

    methods:{
        draw(){
        startCapture($("body"));
        }
    }
> Add this method to the event of any button in the component template.

    <button @click="draw"></button>
***
>author[sunritz](mailto:sunritz@126.com)Welcome to communicate. 