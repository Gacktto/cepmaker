(function(){"use strict";importScripts("https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js");const a=async t=>await(await fetch(t)).text();onmessage=async function(t){const[s,r,o]=t.data;try{const[e,c,n]=await Promise.all([a(s),a(r),a(o)]),p=Papa.parse(e,{header:!0}).data,i=Papa.parse(c,{header:!0}).data,d=Papa.parse(n,{header:!0}).data;postMessage([p,i,d])}catch(e){console.error("Erro ao carregar os arquivos:",e)}}})();