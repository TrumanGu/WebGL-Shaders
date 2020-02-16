precision highp float;
uniform sampler2D texture;
varying vec2 v_TexCoord;
void main(){
    float contrast=1.3;
    vec4 color=texture2D(texture,v_TexCoord);
    color.rgb=contrast*(color.rgb-.5)+.52;
    gl_FragColor=color;
}