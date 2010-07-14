YUI.add("anim-base",function(B){var C="running",N="startTime",L="elapsedTime",J="start",I="tween",M="end",D="node",K="paused",O="reverse",H="iterationCount",A=Number;var F={},E;B.Anim=function(){B.Anim.superclass.constructor.apply(this,arguments);B.Anim._instances[B.stamp(this)]=this;};B.Anim.NAME="anim";B.Anim._instances={};B.Anim.RE_DEFAULT_UNIT=/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;B.Anim.DEFAULT_UNIT="px";B.Anim.DEFAULT_EASING=function(Q,P,S,R){return S*Q/R+P;};B.Anim._intervalTime=20;B.Anim.behaviors={left:{get:function(Q,P){return Q._getOffset(P);}}};B.Anim.behaviors.top=B.Anim.behaviors.left;B.Anim.DEFAULT_SETTER=function(S,T,V,W,Y,R,U,X){var Q=S._node,P=U(Y,A(V),A(W)-A(V),R);if(T in Q._node.style){Q.setStyle(T,P+X);}else{if(T in Q._node){Q._node[T]=P;}else{Q.setAttribute(T,P);}}};B.Anim.DEFAULT_GETTER=function(P,Q){return P._node.getComputedStyle(Q);};B.Anim.ATTRS={node:{setter:function(P){P=B.one(P);this._node=P;if(!P){}return P;}},duration:{value:1},easing:{value:B.Anim.DEFAULT_EASING,setter:function(P){if(typeof P==="string"&&B.Easing){return B.Easing[P];}}},from:{},to:{},startTime:{value:0,readOnly:true},elapsedTime:{value:0,readOnly:true},running:{getter:function(){return !!F[B.stamp(this)];},value:false,readOnly:true},iterations:{value:1},iterationCount:{value:0,readOnly:true},direction:{value:"normal"},paused:{readOnly:true,value:false},reverse:{value:false}};B.Anim.run=function(){var Q=B.Anim._instances;for(var P in Q){if(Q[P].run){Q[P].run();}}};B.Anim.pause=function(){for(var P in F){if(F[P].pause){F[P].pause();}}B.Anim._stopTimer();};B.Anim.stop=function(){for(var P in F){if(F[P].stop){F[P].stop();}}B.Anim._stopTimer();};B.Anim._startTimer=function(){if(!E){E=setInterval(B.Anim._runFrame,B.Anim._intervalTime);}};B.Anim._stopTimer=function(){clearInterval(E);E=0;};B.Anim._runFrame=function(){var P=true;for(var Q in F){if(F[Q]._runFrame){P=false;F[Q]._runFrame();}}if(P){B.Anim._stopTimer();}};B.Anim.RE_UNITS=/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;var G={run:function(){if(this.get(K)){this._resume();}else{if(!this.get(C)){this._start();}}return this;},pause:function(){if(this.get(C)){this._pause();}return this;},stop:function(P){if(this.get(C)||this.get(K)){this._end(P);}return this;},_added:false,_start:function(){this._set(N,new Date()-this.get(L));this._actualFrames=0;if(!this.get(K)){this._initAnimAttr();}F[B.stamp(this)]=this;B.Anim._startTimer();this.fire(J);},_pause:function(){this._set(N,null);this._set(K,true);delete F[B.stamp(this)];this.fire("pause");},_resume:function(){this._set(K,false);F[B.stamp(this)]=this;this.fire("resume");},_end:function(P){var Q=this.get("duration")*1000;if(P){this._runAttrs(Q,Q,this.get(O));}this._set(N,null);this._set(L,0);this._set(K,false);delete F[B.stamp(this)];this.fire(M,{elapsed:this.get(L)});},_runFrame:function(){var T=this._runtimeAttr.duration,R=new Date()-this.get(N),Q=this.get(O),P=(R>=T),S,U;this._runAttrs(R,T,Q);this._actualFrames+=1;this._set(L,R);this.fire(I);if(P){this._lastFrame();}},_runAttrs:function(Y,X,U){var V=this._runtimeAttr,R=B.Anim.behaviors,W=V.easing,P=X,Q,S,T;if(U){Y=X-Y;P=0;}for(T in V){if(V[T].to){Q=V[T];S=(T in R&&"set" in R[T])?R[T].set:B.Anim.DEFAULT_SETTER;if(Y<X){S(this,T,Q.from,Q.to,Y,X,W,Q.unit);}else{S(this,T,Q.from,Q.to,P,X,W,Q.unit);}}}},_lastFrame:function(){var P=this.get("iterations"),Q=this.get(H);Q+=1;if(P==="infinite"||Q<P){if(this.get("direction")==="alternate"){this.set(O,!this.get(O));}this.fire("iteration");}else{Q=0;this._end();}this._set(N,new Date());this._set(H,Q);},_initAnimAttr:function(){var W=this.get("from")||{},V=this.get("to")||{},P={duration:this.get("duration")*1000,easing:this.get("easing")},R=B.Anim.behaviors,U=this.get(D),T,S,Q;B.each(V,function(a,Y){if(typeof a==="function"){a=a.call(this,U);}S=W[Y];if(S===undefined){S=(Y in R&&"get" in R[Y])?R[Y].get(this,Y):B.Anim.DEFAULT_GETTER(this,Y);}else{if(typeof S==="function"){S=S.call(this,U);}}var X=B.Anim.RE_UNITS.exec(S);var Z=B.Anim.RE_UNITS.exec(a);S=X?X[1]:S;Q=Z?Z[1]:a;T=Z?Z[2]:X?X[2]:"";if(!T&&B.Anim.RE_DEFAULT_UNIT.test(Y)){T=B.Anim.DEFAULT_UNIT;}if(!S||!Q){B.error('invalid "from" or "to" for "'+Y+'"',"Anim");return;}P[Y]={from:S,to:Q,unit:T};},this);this._runtimeAttr=P;},_getOffset:function(Q){var S=this._node,T=S.getComputedStyle(Q),R=(Q==="left")?"getX":"getY",U=(Q==="left")?"setX":"setY";if(T==="auto"){var P=S.getStyle("position");if(P==="absolute"||P==="fixed"){T=S[R]();S[U](T);}else{T=0;}}return T;},destructor:function(){delete B.Anim._instances[B.stamp(this)];}};B.extend(B.Anim,B.Base,G);},"@VERSION@",{requires:["base-base","node-style"]});YUI.add("anim-color",function(B){var A=Number;B.Anim.behaviors.color={set:function(F,D,I,H,C,G,E){I=B.Color.re_RGB.exec(B.Color.toRGB(I));H=B.Color.re_RGB.exec(B.Color.toRGB(H));if(!I||I.length<3||!H||H.length<3){B.error("invalid from or to passed to color behavior");}F._node.setStyle(D,"rgb("+[Math.floor(E(C,A(I[1]),A(H[1])-A(I[1]),G)),Math.floor(E(C,A(I[2]),A(H[2])-A(I[2]),G)),Math.floor(E(C,A(I[3]),A(H[3])-A(I[3]),G))].join(", ")+")");},get:function(D,C){var E=D._node.getComputedStyle(C);E=(E==="transparent")?"rgb(255, 255, 255)":E;return E;}};B.each(["backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],function(C,D){B.Anim.behaviors[C]=B.Anim.behaviors.color;});},"@VERSION@",{requires:["anim-base"]});YUI.add("anim-curve",function(A){A.Anim.behaviors.curve={set:function(F,C,I,H,B,G,E){I=I.slice.call(I);H=H.slice.call(H);var D=E(B,0,100,G)/100;H.unshift(I);F._node.setXY(A.Anim.getBezier(H,D));},get:function(C,B){return C._node.getXY();}};A.Anim.getBezier=function(F,E){var G=F.length;var D=[];for(var C=0;C<G;++C){D[C]=[F[C][0],F[C][1]];}for(var B=1;B<G;++B){for(C=0;C<G-B;++C){D[C][0]=(1-E)*D[C][0]+E*D[parseInt(C+1,10)][0];D[C][1]=(1-E)*D[C][1]+E*D[parseInt(C+1,10)][1];}}return[D[0][0],D[0][1]];};},"@VERSION@",{requires:["anim-xy"]});YUI.add("anim-easing",function(A){A.Easing={easeNone:function(C,B,E,D){return E*C/D+B;
},easeIn:function(C,B,E,D){return E*(C/=D)*C+B;},easeOut:function(C,B,E,D){return -E*(C/=D)*(C-2)+B;},easeBoth:function(C,B,E,D){if((C/=D/2)<1){return E/2*C*C+B;}return -E/2*((--C)*(C-2)-1)+B;},easeInStrong:function(C,B,E,D){return E*(C/=D)*C*C*C+B;},easeOutStrong:function(C,B,E,D){return -E*((C=C/D-1)*C*C*C-1)+B;},easeBothStrong:function(C,B,E,D){if((C/=D/2)<1){return E/2*C*C*C*C+B;}return -E/2*((C-=2)*C*C*C-2)+B;},elasticIn:function(D,B,H,G,C,F){var E;if(D===0){return B;}if((D/=G)===1){return B+H;}if(!F){F=G*0.3;}if(!C||C<Math.abs(H)){C=H;E=F/4;}else{E=F/(2*Math.PI)*Math.asin(H/C);}return -(C*Math.pow(2,10*(D-=1))*Math.sin((D*G-E)*(2*Math.PI)/F))+B;},elasticOut:function(D,B,H,G,C,F){var E;if(D===0){return B;}if((D/=G)===1){return B+H;}if(!F){F=G*0.3;}if(!C||C<Math.abs(H)){C=H;E=F/4;}else{E=F/(2*Math.PI)*Math.asin(H/C);}return C*Math.pow(2,-10*D)*Math.sin((D*G-E)*(2*Math.PI)/F)+H+B;},elasticBoth:function(D,B,H,G,C,F){var E;if(D===0){return B;}if((D/=G/2)===2){return B+H;}if(!F){F=G*(0.3*1.5);}if(!C||C<Math.abs(H)){C=H;E=F/4;}else{E=F/(2*Math.PI)*Math.asin(H/C);}if(D<1){return -0.5*(C*Math.pow(2,10*(D-=1))*Math.sin((D*G-E)*(2*Math.PI)/F))+B;}return C*Math.pow(2,-10*(D-=1))*Math.sin((D*G-E)*(2*Math.PI)/F)*0.5+H+B;},backIn:function(C,B,F,E,D){if(D===undefined){D=1.70158;}if(C===E){C-=0.001;}return F*(C/=E)*C*((D+1)*C-D)+B;},backOut:function(C,B,F,E,D){if(typeof D==="undefined"){D=1.70158;}return F*((C=C/E-1)*C*((D+1)*C+D)+1)+B;},backBoth:function(C,B,F,E,D){if(typeof D==="undefined"){D=1.70158;}if((C/=E/2)<1){return F/2*(C*C*(((D*=(1.525))+1)*C-D))+B;}return F/2*((C-=2)*C*(((D*=(1.525))+1)*C+D)+2)+B;},bounceIn:function(C,B,E,D){return E-A.Easing.bounceOut(D-C,0,E,D)+B;},bounceOut:function(C,B,E,D){if((C/=D)<(1/2.75)){return E*(7.5625*C*C)+B;}else{if(C<(2/2.75)){return E*(7.5625*(C-=(1.5/2.75))*C+0.75)+B;}else{if(C<(2.5/2.75)){return E*(7.5625*(C-=(2.25/2.75))*C+0.9375)+B;}}}return E*(7.5625*(C-=(2.625/2.75))*C+0.984375)+B;},bounceBoth:function(C,B,E,D){if(C<D/2){return A.Easing.bounceIn(C*2,0,E,D)*0.5+B;}return A.Easing.bounceOut(C*2-D,0,E,D)*0.5+E*0.5+B;}};},"@VERSION@",{requires:["anim-base"]});YUI.add("anim-node-plugin",function(B){var A=function(C){C=(C)?B.merge(C):{};C.node=C.host;A.superclass.constructor.apply(this,arguments);};A.NAME="nodefx";A.NS="fx";B.extend(A,B.Anim);B.namespace("Plugin");B.Plugin.NodeFX=A;},"@VERSION@",{requires:["node-pluginhost","anim-base"]});YUI.add("anim-scroll",function(B){var A=Number;B.Anim.behaviors.scroll={set:function(F,G,I,J,K,E,H){var D=F._node,C=([H(K,A(I[0]),A(J[0])-A(I[0]),E),H(K,A(I[1]),A(J[1])-A(I[1]),E)]);if(C[0]){D.set("scrollLeft",C[0]);}if(C[1]){D.set("scrollTop",C[1]);}},get:function(D){var C=D._node;return[C.get("scrollLeft"),C.get("scrollTop")];}};},"@VERSION@",{requires:["anim-base"]});YUI.add("anim-xy",function(B){var A=Number;B.Anim.behaviors.xy={set:function(F,D,I,H,C,G,E){F._node.setXY([E(C,A(I[0]),A(H[0])-A(I[0]),G),E(C,A(I[1]),A(H[1])-A(I[1]),G)]);},get:function(C){return C._node.getXY();}};},"@VERSION@",{requires:["anim-base","node-screen"]});YUI.add("anim",function(A){},"@VERSION@",{skinnable:false,use:["anim-base","anim-color","anim-curve","anim-easing","anim-node-plugin","anim-scroll","anim-xy"]});