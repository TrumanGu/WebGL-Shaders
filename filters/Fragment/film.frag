precision highp float;
uniform sampler2D uTexture;
uniform float seed;
varying vec2 v_TexCoord;

float rand(vec2 co,float seed){
  return fract(sin(dot(co.xy*1.,vec2(12.9898,78.233)))*43758.5453*(seed+.01)/2.);
}
void main(){
  float noise=.2;
  float uSaturation=.7;
  float contrast=1.2;
  vec4 color=texture2D(uTexture,v_TexCoord);
  float rgMax=max(color.r,color.g);
  float rgbMax=max(rgMax,color.b);
  color.r+=rgbMax!=color.r?(rgbMax-color.r)*uSaturation:0.;
  color.g+=rgbMax!=color.g?(rgbMax-color.g)*uSaturation:0.;
  color.b+=rgbMax!=color.b?(rgbMax-color.b)*uSaturation:0.;
  color.rgb=contrast*(color.rgb-.5)+.52;
  color.rgb+=(.5-rand(v_TexCoord,seed))*noise;
  gl_FragColor=color;
}