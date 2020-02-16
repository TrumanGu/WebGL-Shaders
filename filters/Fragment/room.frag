precision highp float;
uniform sampler2D texture;
varying vec2 v_TexCoord;
void main(){
    float brightness=.08;
    vec4 color=texture2D(texture,v_TexCoord);
    color.rgb+=brightness;
    gl_FragColor=color;
}