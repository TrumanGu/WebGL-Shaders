precision highp float;

varying vec2 v_TexCoord;

uniform vec3 resolution;
uniform float globalTime;

uniform sampler2D u_Sampler;

void main()
{   
    vec4 color = texture2D(u_Sampler,v_TexCoord);
    mat4 gray = mat4(
        0.3, 0.6, 0.1, 0.0,
        0.3, 0.6, 0.1, 0.0,
        0.3, 0.6, 0.1, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
    gl_FragColor = color * gray;
}