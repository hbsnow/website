// CSS loader
function loadCSS(e,t,n){"use strict";var i=window.document.createElement("link");var o=t||window.document.getElementsByTagName("script")[0];i.rel="stylesheet";i.href=e;i.media="only x";o.parentNode.insertBefore(i,o);setTimeout(function(){i.media=n||"all"})}
loadCSS('//fonts.googleapis.com/icon?family=Alegreya+Sans+SC:700');
loadCSS('styles/main.css');
