/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/
'use strict';(function(h,k){"function"===typeof define&&define.amd?define([],k):"undefined"!==typeof exports?k():(k(),h.FileSaver={})})(this,function(){function h(a,b){"undefined"===typeof b?b={autoBom:!1}:"object"!==typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b});return b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob([String.fromCharCode(65279),a],{type:a.type}):a}function k(a,b,e){var c=new XMLHttpRequest;
c.open("GET",a);c.responseType="blob";c.onload=function(){g(c.response,b,e)};c.onerror=function(){console.error("could not download file")};c.send()}function m(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(e){}return 200<=b.status&&299>=b.status}function l(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(e){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null);a.dispatchEvent(b)}}var f="object"===typeof window&&window.window===
window?window:"object"===typeof self&&self.self===self?self:"object"===typeof global&&global.global===global?global:void 0,g=f.saveAs||("object"!==typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(a,b,e){var c=f.URL||f.webkitURL,d=document.createElement("a");b=b||a.name||"download";d.download=b;d.rel="noopener";"string"===typeof a?(d.href=a,d.origin!==location.origin?m(d.href)?k(a,b,e):l(d,d.target="_blank"):l(d)):(d.href=c.createObjectURL(a),setTimeout(function(){c.revokeObjectURL(d.href)},
4E4),setTimeout(function(){l(d)},0))}:"msSaveOrOpenBlob"in navigator?function(a,b,e){b=b||a.name||"download";if("string"===typeof a)if(m(a))k(a,b,e);else{var c=document.createElement("a");c.href=a;c.target="_blank";setTimeout(function(){l(c)})}else navigator.msSaveOrOpenBlob(h(a,e),b)}:function(a,b,e,c){if(c=c||open("","_blank"))c.document.title=c.document.body.innerText="downloading...";if("string"===typeof a)return k(a,b,e);b="application/octet-stream"===a.type;e=/constructor/i.test(f.HTMLElement)||
f.safari;var d=/CriOS\/[\d]+/.test(navigator.userAgent);if((d||b&&e)&&"undefined"!==typeof FileReader){var g=new FileReader;g.onloadend=function(){var a=g.result,a=d?a:a.replace(/^data:[^;]*;/,"data:attachment/file;");c?c.location.href=a:window.location=a;c=null};g.readAsDataURL(a)}else{var l=f.URL||f.webkitURL,h=l.createObjectURL(a);c?c.location=h:window.location.href=h;c=null;setTimeout(function(){l.revokeObjectURL(h)},4E4)}});f.saveAs=g.saveAs=g;"undefined"!==typeof module&&(module.exports=g)});
