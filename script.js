const color = {r:255,g:255,b:255,a:255}
const changeInput = x => {
    const parent = x.parentElement
    const parse = document.querySelector("#parse-ch")
    const format = formats.find(el => el.name == x.selectedOptions[0].value)
    if (format) {
        parse.removeChild(parse.childNodes[0])
        parse.appendChild(format.input())
    } else {
        console.log(x);
    }
    // switch (x.selectedOptions[0].value) {

    //     case 'HEX':;break;
    //     case 'HEXA':;break;
    //     case 'WEBSAFE':;break;
    //     case 'RGB':;break;
    //     case 'RGB %':;break;
    //     case 'RGBA':;break;
    //     case 'RGBA %':;break;
    //     // soon //
        
    //     case 'auto...':;break;
    //     case 'HSL':;break;
    //     case 'HSLA':;break;
    //     case 'CMYK':;break;
    //     case 'XYZ':;break;
    //     case 'LAB':;break;
    //     case 'HSB/HSV':;break;
    //     case 'Ncol':;break;
    //     case 'Hwb':;break;
    //     case 'from image':
    //         parent.querySelector('input[inputelement=true]')  
    //      <input disabled autocomplete="off" style="transform:translateX(25px)" type="file">  
    //     ;break;
    // }
    // parent.querySelector('input[inputelement=true]')
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
    let tmp = document.querySelectorAll("input.inp[type=number]")
    tmp[0].oninput = e => color.r = +e.target.value
    tmp[1].oninput = e => color.g = +e.target.value
    tmp[2].oninput = e => color.b = +e.target.value
    tmp = undefined
}
const convert = async () => {
    formats.forEach(x => {
        x.domEl?x.domEl:x.domEl=document.querySelector(`input[data-name="${x.name}"]`);
        x.domEl.value=x.to(color.r,color.g,color.b,color.a)
    })
}
const update = async interval => {
    const palete = document.querySelector("#palete");
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
    update(500)
}