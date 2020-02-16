precision mediump float;
uniform sampler2D texture;
varying vec2 v_TexCoord;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

uniform float seed;

float randomRange(vec2 standard,float min,float max){
    return min+random(standard)*(max-min);
}
void main(){
    vec3 color=texture2D(texture,v_TexCoord).rgb;
    float maxOffset=seed*.8;
    float cTime=24.;
    float maxSplitOffset=seed*4.;
    for(float i=0.;i<10.;i+=1.){
        float sliceY=randomRange(vec2(cTime+seed,1999.+float(i)),0.,3.);
        float sliceH=randomRange(vec2(cTime+seed,9999.+float(i)),0.,.04);
        float hOffset=randomRange(vec2(cTime+seed,9625.+float(i)),-maxSplitOffset,maxSplitOffset);
        vec2 splitOff=v_TexCoord;
        splitOff.x+=hOffset;
        splitOff=fract(splitOff);
        if(v_TexCoord.y>sliceY&&v_TexCoord.y<fract(sliceY+sliceH)){
            color=texture2D(texture,splitOff).rgb;
        }
    }
    vec2 texOffset=vec2(
        randomRange(vec2(cTime+maxOffset,9999.),-maxOffset,maxOffset),
        randomRange(vec2(cTime,9999.),-maxOffset,maxOffset)
    );
    vec2 uvOff=fract(v_TexCoord+texOffset);
    
    float rnd=random(vec2(cTime+seed,9999.));
    if(rnd<.33){
        color.r=texture2D(texture,uvOff).r;
    }else if(rnd<.66){
        color.g=texture2D(texture,uvOff).g;
    }else{
        color.b=texture2D(texture,uvOff).b;
    }
    gl_FragColor=vec4(color,1.);
}