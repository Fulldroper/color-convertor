const rc = () => Math.floor(Math.random() * Math.floor(255))
const color = {r:rc(),g:rc(),b:rc(),a:255}
const changeInput = x => {
    const parse = document.querySelector("#parse-ch")
    const format = formats.find(el => el.name == x.selectedOptions[0].value)
    if (format) {
        parse.removeChild(parse.childNodes[0])
        parse.appendChild(format.input())
    } else {
        console.log(x);
    }
}
const formats = [
    {
        name: "HEX",
        alpha: false,
        input: () => {
            const el = document.createElement('input')
            el.setAttribute("autocomplete", "false")
            el.setAttribute("placeholder", "#000000")
            el.classList = "inp"
            el.value = "#"
            el.oninput = e => {
                e.target.value.charAt(1) === "#" &&e.target.value.charAt(0) === "#" ? e.target.value = e.target.value.substring(1):0;
                e.target.value.length > 6 ? e.target.value = e.target.value.slice(0, -1):0;
            }
            return el
        },
        from: str => {
            str = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(str);
            return {r: parseInt(str[1], 16),g: parseInt(str[2], 16),b: parseInt(str[3], 16)};
        },
        to: (r,g,b) => {
            r=r<10?'0'+r:r
            g=g<10?'0'+g:g
            b=b<10?'0'+b:b
            return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        },
    },
    {
        name: "HEXA",
        alpha: true,
        input: () => {
            const el = document.createElement('input')
            el.setAttribute("autocomplete", "false")
            el.setAttribute("placeholder", "#00000000")
            el.classList = "inp"
            el.value = "#"
            el.oninput = e => {
                e.target.value.charAt(1) === "#" &&e.target.value.charAt(0) === "#" ? e.target.value = e.target.value.substring(1):0;
                e.target.value.length > 8 ? e.target.value = e.target.value.slice(0, -1):0;
            }
            return el
        },
        from: str => {
            str = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(str);
            return {r: parseInt(str[1], 16),g: parseInt(str[2], 16),b: parseInt(str[3], 16),a: parseInt(str[3], 16)};
        },
        to: (r,g,b,a) => {
            a=a<10?'0'+a:a
            r=r<10?'0'+r:r
            g=g<10?'0'+g:g
            b=b<10?'0'+b:b
            return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}${a==255?'':a.toString(16)}`
        },
    },
    {
        name: "WEBSAFE",
        alpha: false,
        input: () => {
            const el = document.createElement('input')
            el.setAttribute("autocomplete", "false")
            el.setAttribute("placeholder", "#000")
            el.classList = "inp"
            el.value = "#"
            el.oninput = e => {
                e.target.value.charAt(1) === "#" &&e.target.value.charAt(0) === "#" ? e.target.value = e.target.value.substring(1):0;
                e.target.value.length > 4 ? e.target.value = e.target.value.slice(0, -1):0;
            }
            return el
        },
        from: str => {
            str = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(str);
            return {r: parseInt(str[1], 16),g: parseInt(str[2], 16),b: parseInt(str[3], 16)};
        },
        to: (r,g,b) => {
            r=r>=15?15:r
            g=g>=15?15:g
            b=b>=15?15:b
            return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        },
    },
    {
        name: "RGB",
        alpha: false,
        input: () => {
            const el = document.createElement('p')
            const r = document.createElement('input')
            const g = document.createElement('input')
            const b = document.createElement('input')
            el.appendChild(r)
            el.appendChild(g)
            el.appendChild(b)
            el.childNodes.forEach(ch => {
                ch.setAttribute("autocomplete", "false")
                ch.setAttribute("type", "number")
                ch.setAttribute("min", "0")
                ch.setAttribute("max", "255")
                ch.setAttribute("placeholder", "0")
                ch.classList = "inp"
                ch.value = "0"
                ch.oninput = e => {
                    //-add fix func-//
                }
            })
            return el
        },
        from: str => {
            str = /^rgb\(?([a-f\d].*),([a-f\d].*),([a-f\d].*)\)$/i.exec(str);
            return {r: parseInt(str[1], 10),g: parseInt(str[2], 10),b: parseInt(str[3], 10)};
        },
        to: (r,g,b) => {
            return `rgb(${r},${g},${b})`
        },
    },
    {
        name: "RGB %",
        alpha: false,
        input: () => {
            const el = document.createElement('p')
            const r = document.createElement('input')
            const g = document.createElement('input')
            const b = document.createElement('input')
            el.appendChild(r)
            el.appendChild(g)
            el.appendChild(b)
            el.childNodes.forEach(ch => {
                ch.setAttribute("autocomplete", "false")
                ch.setAttribute("type", "number")
                ch.setAttribute("min", "0")
                ch.classList = "inp"
                ch.setAttribute("max", "100")
                ch.setAttribute("placeholder", "0")
                ch.value = "0"
                ch.oninput = e => {
                    //-add fix func-//
                }
            })
            return el
        },
        from: str => {
            str = /^rgb\(?([a-f\d].*)%,([a-f\d].*)%,([a-f\d].*)%\)$/i.exec(str);
            const conv = x => (parseInt(x,10)/100)*255
            return {r: conv(str[1]),g: conv(str[2]),b: conv(str[3])};
        },
        to: (r,g,b) => {
            const conv = x => {
                let a = (x/255)*100
                return a<100?a.toFixed(2):a
            }
            return `rgb(${conv(r)}%,${conv(g)}%,${conv(b)}%)`
        },
    },
    {
        name: "RGBA",
        alpha: true,
        input: () => {
            const el = document.createElement('p')
            const r = document.createElement('input')
            const g = document.createElement('input')
            const b = document.createElement('input')
            const a = document.createElement('input')
            el.appendChild(r)
            el.appendChild(g)
            el.appendChild(b)
            el.appendChild(a)
            el.childNodes.forEach(ch => {
                ch.setAttribute("autocomplete", "false")
                ch.setAttribute("type", "number")
                ch.classList = "inp"
                ch.setAttribute("min", "0")
                ch.setAttribute("max", "255")
                ch.setAttribute("placeholder", "0")
                ch.value = "0"
                ch.oninput = e => {
                    //-add fix func-//
                }
            })
            return el
        },
        from: str => {
            str = /^rgb\(?([a-f\d].*),([a-f\d].*),([a-f\d].*),([a-f\d].*)\)$/i.exec(str);
            return {r: parseInt(str[1], 10),g: parseInt(str[2], 10),b: parseInt(str[3], 10),a: parseInt(str[3], 10)};
        },
        to: (r,g,b,a=255) => {
            return `rgb(${r},${g},${b},${a})`
        },
    },
    {
        name: "RGBA %",
        alpha: true,
        input: () => {
            const el = document.createElement('p')
            const r = document.createElement('input')
            const g = document.createElement('input')
            const b = document.createElement('input')
            const a = document.createElement('input')
            el.appendChild(r)
            el.appendChild(g)
            el.appendChild(b)
            el.appendChild(a)
            el.childNodes.forEach(ch => {
                ch.setAttribute("autocomplete", "false")
                ch.setAttribute("type", "number")
                ch.setAttribute("min", "0")
                ch.classList = "inp"
                ch.setAttribute("max", "100")
                ch.setAttribute("placeholder", "0")
                ch.value = "0"
                ch.oninput = e => {
                    //-add fix func-//
                }
            })
            return el
        },
        from: str => {
            str = /^rgb\(?([a-f\d].*)%,([a-f\d].*)%,([a-f\d].*)%,([a-f\d].*)%\)$/i.exec(str);
            const conv = x => (parseInt(x,10)/100)*255
            return {r: conv(str[1]),g: conv(str[2]),b: conv(str[3]),a: conv(str[3])};
        },
        to: (r,g,b,a=255) => {
            const conv = x => {
                let a = (x/255)*100
                return a<100?a.toFixed(2):a
            }
            return `rgb(${conv(r)}%,${conv(g)}%,${conv(b)}%,${conv(a)}%)`
        },
    },
]
const fillFormats = () => {
    const result = document.querySelector("result")
    const select = document.querySelector("select")
    formats.forEach(x => {
        result.innerHTML += `<p><name>${x.name}</name><input res="true" data-name="${x.name}" disabled autocomplete="off" type="text" value="-"></p>`
        select.innerHTML += `<option>${x.name}</option>`
    })
}
const initEvents = () => {
    const file_input = document.querySelector('input[type=file]')
    const canvas = document.querySelector('canvas')
    file_input.onchange = e => {
        const getImgWH = x => {
            return new Promise((res,rej) => {
                const _url_ = window.URL || window.webkitURL;
                const img = new Image();
                _url_ || rej('url obj not found');
                img || rej('can`t create img');
                x || rej('empty input');
                img.onload = e => res({w:e.target.width,h:e.target.height,img});
                img.src = _url_.createObjectURL(x)
            })
        }
    
        if (file_input&&canvas) {
            getImgWH(e.target.files[0])
            .then(res=>{
                // canvas.setAttribute("width",`${res.w}px`)
                // canvas.setAttribute("height",`${res.h}px`)
                canvas.style.cursor = 'crosshair'
                canvas.getContext('2d').drawImage(res.img, 0, 0, res.w, res.h);
                canvas.onclick = x => {
                    const res = {
                        x : x.x - x.target.offsetLeft,
                        y : x.y - x.target.offsetTop,
                    }
                    const _color_ = canvas.getContext('2d').getImageData(res.x, res.y, 1, 1).data
                    color.r = _color_[0]
                    color.g = _color_[1]
                    color.b = _color_[2]
                    console.log(res);
                    //console.log(x,x.target,res,color,`rgb(${_color_[0]},${_color_[1]},${_color_[2]},${_color_[3]})`);
                }
            })
        }
    }
    canvas.onclick = () => file_input.click()
}
const convert = async () => {
    formats.forEach(x => {
        x.domEl?x.domEl:x.domEl=document.querySelector(`input[data-name="${x.name}"]`);
        x.domEl.value=x.to(color.r,color.g,color.b,color.a)
    })
}
const update = async interval => {
    const palete = document.querySelector("#palete");
    let tmp = document.querySelectorAll("input.inp[type=number]")
    // buffer for color
    const fnc = () => {
        palete.style.backgroundColor=`rgb(${color.r},${color.g},${color.b},${color.a})`
        
        convert()
    }
    fnc()
    this.timer = setInterval(fnc, interval);
}
const copy = that => {
    that.select()        
    that.setSelectionRange(0, 99999)
    document.execCommand("copy");
}
window.onload = () => {
    fillFormats()
    initEvents()
    document.querySelector("canvas.container").ondblclick = e => {
        e.target.querySelector(`input[type="file"]`).click()
    }
    update(500)
    changeInput({selectedOptions:[{value:'HEX'}]})
}