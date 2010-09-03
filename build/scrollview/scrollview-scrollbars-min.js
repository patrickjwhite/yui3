YUI.add("scrollview-scrollbars",function(A){var L=A.ClassNameManager.getClassName,I,J=A.Transition.useNative,a="scrollbar",d="scrollview",c="verticalNode",M="horizontalNode",U="childCache",W="top",Q="left",G="width",V="height",P="scrollWidth",H="scrollHeight",b="_sbh",T="_sbv",N="transitionProperty",F="transform",E="translateX(",D="translateY(",Z="scaleX(",X="scaleY(",S="scrollX",R="scrollY",K="px",C=")",O=K+C;function B(){B.superclass.constructor.apply(this,arguments);}B.CLASS_NAMES={showing:L(d,a,"showing"),scrollbar:L(d,a),scrollbarV:L(d,a,"vert"),scrollbarH:L(d,a,"horiz"),scrollbarVB:L(d,a,"vert","basic"),scrollbarHB:L(d,a,"horiz","basic"),child:L(d,"child"),first:L(d,"first"),middle:L(d,"middle"),last:L(d,"last")};I=B.CLASS_NAMES;B.NAME="pluginScrollViewScrollbars";B.NS="scrollbars";B.SCROLLBAR_TEMPLATE=["<div>",'<span class="'+I.child+" "+I.first+'"></span>','<span class="'+I.child+" "+I.middle+'"></span>','<span class="'+I.child+" "+I.last+'"></span>',"</div>"].join("");B.ATTRS={verticalNode:{setter:"_setNode",value:A.Node.create(B.SCROLLBAR_TEMPLATE)},horizontalNode:{setter:"_setNode",value:A.Node.create(B.SCROLLBAR_TEMPLATE)}};A.namespace("Plugin").ScrollViewScrollbars=A.extend(B,A.Plugin.Base,{initializer:function(){this._host=this.get("host");this.afterHostMethod("_uiScrollY",this._update);this.afterHostMethod("_uiScrollX",this._update);this.afterHostMethod("_uiDimensionsChange",this._hostDimensionsChange);this.afterHostEvent("scrollEnd",this._hostScrollEnd);},_hostDimensionsChange:function(){var Y=this._host;this._renderBar(this.get(c),Y._scrollsVertical);this._renderBar(this.get(M),Y._scrollsHorizontal);this._update();A.later(500,this,"flash",true);},_hostScrollEnd:function(Y){if(!this._host._flicking){this.flash();}},_renderBar:function(e,g){var f=e.inDoc(),h=this._host._bb,Y=e.getData("isHoriz")?I.scrollbarHB:I.scrollbarVB;if(g&&!f){h.append(e);e.toggleClass(Y,this._basic);this._setChildCache(e);}else{if(!g&&f){e.remove();this._clearChildCache(e);}}},_setChildCache:function(g){var i=g.get("children"),e=i.item(0),h=i.item(1),f=i.item(2),Y=g.getData("isHoriz")?"offsetWidth":"offsetHeight";g.setStyle(N,F);h.setStyle(N,F);f.setStyle(N,F);g.setData(U,{fc:e,lc:f,mc:h,fcSize:e&&e.get(Y),lcSize:f&&f.get(Y)});},_clearChildCache:function(Y){Y.clearData(U);},_updateBar:function(Y,m,f,w){var k=this._host,g=this._basic,l=k._cb,r=0,n=1,e=Y.getData(U),s=e.lc,v=e.mc,AA=e.fcSize,z=e.lcSize,o,x,u,j,y,q,h,t,p,i;if(w){q=G;h=Q;t=b;p=k.get(q);i=k._scrollWidth||l.get(P);j=E;y=Z;m=(m!==undefined)?m:k.get(S);}else{q=V;h=W;t=T;p=k.get(q);i=k._scrollHeight||l.get(H);j=D;y=X;m=(m!==undefined)?m:k.get(R);}r=Math.floor(p*(p/i));n=Math.floor((m/(i-p))*(p-r));if(r>p){r=1;}if(n>(p-r)){r=r-(n-(p-r));}else{if(n<0){r=n+r;n=0;}}o=(r-(AA+z));if(o<0){o=0;}if(o===0&&n!==0){n=p-(AA+z)-1;}if(f!==0){u={duration:f};if(J){u.transform=j+n+O;}else{u[h]=n+K;}Y.transition(u);}else{if(J){Y.setStyle(F,j+n+O);}else{Y.setStyle(h,n+K);}}if(this[t]!==o){this[t]=o;if(o>0){if(f!==0){u={duration:f};if(J){u.transform=y+o+C;}else{u[q]=o+K;}v.transition(u);}else{if(J){v.setStyle(F,y+o+C);}else{v.setStyle(q,o+K);}}if(!w||!g){x=r-z;if(f!==0){u={duration:f};if(J){u.transform=j+x+O;}else{u[h]=x;}s.transition(u);}else{if(J){s.setStyle(F,j+x+O);}else{s.setStyle(h,x+K);}}}}}},_update:function(e,h,i){var g=this.get(c),Y=this.get(M),f=this._host;h=(h||0)/1000;if(!this._showing){this.show();}if(f._scrollsVertical&&g){this._updateBar(g,e,h,false);}if(f._scrollsHorizontal&&Y){this._updateBar(Y,e,h,true);}},show:function(Y){this._show(true,Y);},hide:function(Y){this._show(false,Y);},_show:function(Y,g){var f=this.get(c),h=this.get(M),i=(g)?0.6:0,e=(Y)?1:0,j;this._showing=Y;if(this._flashTimer){this._flashTimer.cancel();}j={duration:i,opacity:e};if(f){f.transition(j);}if(h){h.transition(j);}},flash:function(){var Y=false,e=this._host;if(e._scrollsVertical&&(e._scrollHeight>e.get(V))){Y=true;}if(e._scrollsHorizontal&&(e._scrollWidth>e.get(G))){Y=true;}if(Y){this.show(true);this._flashTimer=A.later(800,this,"hide",true);}},_setNode:function(e,Y){var f=(Y==M);e=A.one(e);if(e){e.addClass(I.scrollbar);e.addClass((f)?I.scrollbarH:I.scrollbarV);e.setData("isHoriz",f);}return e;},_basic:A.UA.ie&&A.UA.ie<=8});},"@VERSION@",{skinnable:true,requires:["plugin"]});