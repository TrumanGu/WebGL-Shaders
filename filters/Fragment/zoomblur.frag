precision highp float;

varying vec2 v_TexCoord;

uniform vec3 resolution;
uniform float globalTime;

uniform sampler2D u_Sampler;


float perspective = 0.3;

const int samples = 200;
const float minBlur = 0.1;
const float maxBlur = 0.3;
const float speed = 3.0;

void mainImage( out vec4 fragColor, in vec2 v_TexCoord )
{
	vec2 p = v_TexCoord;
	
    vec4 result = vec4(0);
    
    float timeQ = mix(minBlur, maxBlur, 0.5);
    
	for (int i=0; i<=samples; i++)
    {        
        float q = float(i)/float(samples);
        result += texture2D(u_Sampler, p + (vec2(0.5)-p)*q*timeQ)/float(samples);
    }
    
	fragColor = result;
}



void main()
{   
    mainImage(gl_FragColor,v_TexCoord);
}