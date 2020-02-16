precision highp float;

varying vec2 v_TexCoord;
uniform vec3 resolution;
uniform float globalTime;
uniform sampler2D u_Sampler;

void mainImage(out vec4 fragColor,in vec2 v_TexCoord)
{
	float stongth=.3;
	vec2 uv=v_TexCoord.xy;
	float waveu=sin((uv.y+globalTime)*20.)*.5*.05*stongth;
	fragColor=texture2D(u_Sampler,uv+vec2(waveu,0));;
}

void main()
{
	mainImage(gl_FragColor,v_TexCoord);
}
