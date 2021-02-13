precision mediump float;
uniform vec3 uColor;
varying float vRandom;

uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;
varying float vTime;




void main()
{

    float time = vTime * 0.25;
    vec2 vUp = vUv;
    vec2 repeat = vec2(3.0, 16.0);
    vUp.x += sin(vUp.y);
    vUp = fract(vUp * repeat + vec2(0.0, time));
    vec4 textureColor = texture2D(uTexture, vUp);

    gl_FragColor = textureColor;

}
