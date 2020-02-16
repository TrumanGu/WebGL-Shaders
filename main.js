
function loadGL(gl, VSHADER_SOURCE, FSHADER_SOURCE){
    
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

    let n = initVertexBuffers(gl);

    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.activeTexture(gl.TEXTURE0)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
}
function initVideo(gl){
    
    const video = document.createElement('video');
    video.width = 512
    video.height = 288
    video.autoplay = true;
    video.muted = false;
    video.loop = true;
    video.controls= true;

    video.src = './resources/bad_guy.mp4';
    let canvasInner = document.getElementsByClassName('canvas-inner')[0]
    let clientHeight = innerHeight
    canvasInner.style = `height: ${clientHeight}px`
    canvasInner.append(video)
    video.play();
    let randomFn;
    video.addEventListener('pause',()=>{
        randomFn = null
    })
    video.addEventListener('playing',  ()=> {
        randomFn = throttle(()=>{
            let seed = gl.getUniformLocation(gl.program, 'seed')
            seed && gl.uniform1f(seed,RandomNumBoth(0, 0.01))
        },100)
        function render() {
            // 在这里对attribute进行修改 约定随机数为seed
            randomFn && randomFn()
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
            gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
            gl.clearDepth(1.0);                 // Clear everything
            gl.enable(gl.DEPTH_TEST);           // Enable depth testing
            gl.depthFunc(gl.LEQUAL);            // Near things obscure
            
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Draw the rectangle

            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }, true);

}
function initVertexBuffers(gl) {
    
    // 顶点着色器的坐标与纹理坐标的映射
    const vertices = new Float32Array([
        -1, 1, 0.0, 1.0,
        -1, -1, 0.0, 0.0,
        1, 1, 1.0, 1.0,
        1, -1, 1.0, 0.0
        ])
    // 创建缓冲区对象
    let vertexBuffer = gl.createBuffer()
    // 绑定buffer到缓冲对象上
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    // 向缓冲对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    const FSIZE = Float32Array.BYTES_PER_ELEMENT
    // 将缓冲区对象分配给a_Position变量
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)
    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position)
    // 将缓冲区对象分配给a_TexCoord变量
    let a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
    // 使用缓冲数据建立程序代码到着色器代码的联系
    gl.enableVertexAttribArray(a_TexCoord)

    
    return 4
}


async function main(){

    let canvas = document.getElementById('webgl');
    let gl = getWebGLContext(canvas);
    await loadFragment(gl, 'break')
    initVideo(gl)
    initEventListener(gl)
}



function initEventListener(gl){
   
    let gui = new dat.GUI();
    let filterControls = new function () {
        this.filter = 'break'
    };
    let controls = gui.add(filterControls, 'filter', { 
        '原画':'base', 
        '黑白':'gray',
        '画像':'paint',
        '户外':'outdoor',
        '室内':'room',
        '暗淡':'dim',
        '强光':'highlight',
        '电影':'film',
        '故障':'break',
        '波浪':'wave'
    });
    controls.onChange((value)=> {
        loadFragment(gl, value)
    });    
}


async function loadFragment(gl, name){
    let VSHADER_SOURCE = await request(`./filters/Vertex/${name}.vert`)
    let FSHADER_SOURCE = await request(`./filters/Fragment/${name}.frag`)
    loadGL(gl, VSHADER_SOURCE, FSHADER_SOURCE)
}

async function request(url){
    const res = await fetch(url)
    return await res.text()
}

function RandomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Rand * Range; //四舍五入
    return num;
}

function throttle(fn, gapTime) {
    let _lastTime = null;
  
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn();
        _lastTime = _nowTime
      }
    }
}