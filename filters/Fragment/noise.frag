precision highp float;
uniform sampler2D uTexture;
uniform float seed;
varying vec2 v_TexCoord;

float rand(vec2 co,float seed){
    return fract(sin(dot(co.xy*1.,vec2(12.9898,78.233)))*43758.5453*(seed+.01)/2.);
}
void main(){
    float noise=.4;
    vec4 color=texture2D(uTexture,v_TexCoord);
    color.rgb+=(.5-rand(v_TexCoord,seed))*noise;
    gl_FragColor=color;
}