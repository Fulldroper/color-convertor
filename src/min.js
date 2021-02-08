const rc=()=>Math.floor(Math.random()*Math.floor(255)),color={r:rc(),g:rc(),b:rc(),a:255},changeInput=t=>{t.parentElement;const e=document.querySelector("#parse-ch"),a=formats.find(e=>e.name==t.selectedOptions[0].value);a?(e.removeChild(e.childNodes[0]),e.appendChild(a.input())):console.log(t)},formats=[{name:"HEX",alpha:!1,input:()=>{const t=document.createElement("input");return t.setAttribute("autocomplete","false"),t.setAttribute("placeholder","#000000"),t.classList="inp",t.value="#",t.oninput=(t=>{"#"===t.target.value.charAt(1)&&"#"===t.target.value.charAt(0)&&(t.target.value=t.target.value.substring(1)),t.target.value.length>6&&(t.target.value=t.target.value.slice(0,-1))}),t},from:t=>(t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}),to:(t,e,a)=>(e=e<10?"0"+e:e,a=a<10?"0"+a:a,`#${(t=t<10?"0"+t:t).toString(16)}${e.toString(16)}${a.toString(16)}`)},{name:"HEXA",alpha:!0,input:()=>{const t=document.createElement("input");return t.setAttribute("autocomplete","false"),t.setAttribute("placeholder","#00000000"),t.classList="inp",t.value="#",t.oninput=(t=>{"#"===t.target.value.charAt(1)&&"#"===t.target.value.charAt(0)&&(t.target.value=t.target.value.substring(1)),t.target.value.length>8&&(t.target.value=t.target.value.slice(0,-1))}),t},from:t=>(t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16),a:parseInt(t[3],16)}),to:(t,e,a,n)=>(n=n<10?"0"+n:n,e=e<10?"0"+e:e,a=a<10?"0"+a:a,`#${(t=t<10?"0"+t:t).toString(16)}${e.toString(16)}${a.toString(16)}${255==n?"":n.toString(16)}`)},{name:"WEBSAFE",alpha:!1,input:()=>{const t=document.createElement("input");return t.setAttribute("autocomplete","false"),t.setAttribute("placeholder","#000"),t.classList="inp",t.value="#",t.oninput=(t=>{"#"===t.target.value.charAt(1)&&"#"===t.target.value.charAt(0)&&(t.target.value=t.target.value.substring(1)),t.target.value.length>4&&(t.target.value=t.target.value.slice(0,-1))}),t},from:t=>(t=/^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(t),{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}),to:(t,e,a)=>(e=e>=15?15:e,a=a>=15?15:a,`#${(t=t>=15?15:t).toString(16)}${e.toString(16)}${a.toString(16)}`)},{name:"RGB",alpha:!1,input:()=>{const t=document.createElement("p"),e=document.createElement("input"),a=document.createElement("input"),n=document.createElement("input");return t.appendChild(e),t.appendChild(a),t.appendChild(n),t.childNodes.forEach(t=>{t.setAttribute("autocomplete","false"),t.setAttribute("type","number"),t.setAttribute("min","0"),t.setAttribute("max","255"),t.setAttribute("placeholder","0"),t.classList="inp",t.value="0",t.oninput=(t=>{})}),t},from:t=>(t=/^rgb\(?([a-f\d].*),([a-f\d].*),([a-f\d].*)\)$/i.exec(t),{r:parseInt(t[1],10),g:parseInt(t[2],10),b:parseInt(t[3],10)}),to:(t,e,a)=>`rgb(${t},${e},${a})`},{name:"RGB %",alpha:!1,input:()=>{const t=document.createElement("p"),e=document.createElement("input"),a=document.createElement("input"),n=document.createElement("input");return t.appendChild(e),t.appendChild(a),t.appendChild(n),t.childNodes.forEach(t=>{t.setAttribute("autocomplete","false"),t.setAttribute("type","number"),t.setAttribute("min","0"),t.classList="inp",t.setAttribute("max","100"),t.setAttribute("placeholder","0"),t.value="0",t.oninput=(t=>{})}),t},from:t=>{const e=t=>parseInt(t,10)/100*255;return{r:e((t=/^rgb\(?([a-f\d].*)%,([a-f\d].*)%,([a-f\d].*)%\)$/i.exec(t))[1]),g:e(t[2]),b:e(t[3])}},to:(t,e,a)=>{const n=t=>{let e=t/255*100;return e<100?e.toFixed(2):e};return`rgb(${n(t)}%,${n(e)}%,${n(a)}%)`}},{name:"RGBA",alpha:!0,input:()=>{const t=document.createElement("p"),e=document.createElement("input"),a=document.createElement("input"),n=document.createElement("input"),r=document.createElement("input");return t.appendChild(e),t.appendChild(a),t.appendChild(n),t.appendChild(r),t.childNodes.forEach(t=>{t.setAttribute("autocomplete","false"),t.setAttribute("type","number"),t.classList="inp",t.setAttribute("min","0"),t.setAttribute("max","255"),t.setAttribute("placeholder","0"),t.value="0",t.oninput=(t=>{})}),t},from:t=>(t=/^rgb\(?([a-f\d].*),([a-f\d].*),([a-f\d].*),([a-f\d].*)\)$/i.exec(t),{r:parseInt(t[1],10),g:parseInt(t[2],10),b:parseInt(t[3],10),a:parseInt(t[3],10)}),to:(t,e,a,n=255)=>`rgb(${t},${e},${a},${n})`},{name:"RGBA %",alpha:!0,input:()=>{const t=document.createElement("p"),e=document.createElement("input"),a=document.createElement("input"),n=document.createElement("input"),r=document.createElement("input");return t.appendChild(e),t.appendChild(a),t.appendChild(n),t.appendChild(r),t.childNodes.forEach(t=>{t.setAttribute("autocomplete","false"),t.setAttribute("type","number"),t.setAttribute("min","0"),t.classList="inp",t.setAttribute("max","100"),t.setAttribute("placeholder","0"),t.value="0",t.oninput=(t=>{})}),t},from:t=>{const e=t=>parseInt(t,10)/100*255;return{r:e((t=/^rgb\(?([a-f\d].*)%,([a-f\d].*)%,([a-f\d].*)%,([a-f\d].*)%\)$/i.exec(t))[1]),g:e(t[2]),b:e(t[3]),a:e(t[3])}},to:(t,e,a,n=255)=>{const r=t=>{let e=t/255*100;return e<100?e.toFixed(2):e};return`rgb(${r(t)}%,${r(e)}%,${r(a)}%,${r(n)}%)`}}],fillFormats=()=>{const t=document.querySelector("result"),e=document.querySelector("select");formats.forEach(a=>{t.innerHTML+=`<p><name>${a.name}</name><input res="true" data-name="${a.name}" disabled autocomplete="off" type="text" value="-"></p>`,e.innerHTML+=`<option>${a.name}</option>`})},initEvents=()=>{const t=document.querySelector("input[type=file]"),e=document.querySelector("canvas");t.onchange=(a=>{t&&e&&(t=>new Promise((e,a)=>{const n=window.URL||window.webkitURL,r=new Image;n||a("url obj not found"),r||a("can`t create img"),t||a("empty input"),r.onload=(t=>e({w:t.target.width,h:t.target.height,img:r})),r.src=n.createObjectURL(t)}))(a.target.files[0]).then(t=>{e.style.cursor="crosshair",e.getContext("2d").drawImage(t.img,0,0,t.w,t.h),e.onclick=(t=>{const a={x:t.x-t.target.offsetLeft,y:t.y-t.target.offsetTop},n=e.getContext("2d").getImageData(a.x,a.y,1,1).data;color.r=n[0],color.g=n[1],color.b=n[2],console.log(a)})})}),e.onclick=(()=>t.click())},convert=async()=>{formats.forEach(t=>{t.domEl?t.domEl:t.domEl=document.querySelector(`input[data-name="${t.name}"]`),t.domEl.value=t.to(color.r,color.g,color.b,color.a)})},update=async t=>{const e=document.querySelector("#palete");document.querySelectorAll("input.inp[type=number]");const a=()=>{e.style.backgroundColor=`rgb(${color.r},${color.g},${color.b},${color.a})`,convert()};a(),this.timer=setInterval(a,t)},copy=t=>{t.select(),t.setSelectionRange(0,99999),document.execCommand("copy")};window.onload=(()=>{fillFormats(),initEvents(),update(500)});