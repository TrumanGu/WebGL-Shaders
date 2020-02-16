precision highp float;
uniform sampler2D texture;
varying vec2 v_TexCoord;
void main(){
    float contrast=1.2;
    vec4 color=texture2D(texture,v_TexCoord);
    color.rgb=contrast*(color.rgb-.6)+.6;
    gl_FragColor=color;
}