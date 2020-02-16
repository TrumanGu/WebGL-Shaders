precision highp float;

varying vec2 v_TexCoord;

uniform sampler2D u_Sampler;

void main()
{   
    vec4 color = texture2D(u_Sampler, v_TexCoord);
    gl_FragColor = color;
}