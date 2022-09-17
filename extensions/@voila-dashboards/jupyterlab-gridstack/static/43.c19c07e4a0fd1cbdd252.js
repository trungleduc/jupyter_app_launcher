"use strict";(self.webpackChunk_voila_dashboards_jupyterlab_gridstack=self.webpackChunk_voila_dashboards_jupyterlab_gridstack||[]).push([[43],{949:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GridStackDD=void 0;const s=i(142),r=i(379),o=i(709);class n extends s.GridStackDDI{static get(){return s.GridStackDDI.get()}remove(e){return this.draggable(e,"destroy").resizable(e,"destroy"),e.gridstackNode&&delete e.gridstackNode._initDD,this}}function a(e,t){let i=e?e.gridstackNode:void 0;i&&i.grid&&(t?i._isAboutToRemove=!0:delete i._isAboutToRemove,t?e.classList.add("grid-stack-item-removing"):e.classList.remove("grid-stack-item-removing"))}t.GridStackDD=n,r.GridStack.prototype._setupAcceptWidget=function(){if(this.opts.staticGrid||!this.opts.acceptWidgets&&!this.opts.removable)return n.get().droppable(this.el,"destroy"),this;let e,t,i=(i,s,r)=>{let a=s.gridstackNode;if(!a)return;r=r||s;let l=this.el.getBoundingClientRect(),{top:d,left:h}=r.getBoundingClientRect();h-=l.left,d-=l.top;let p={position:{top:d,left:h}};if(a._temporaryRemoved){if(a.x=Math.max(0,Math.round(h/t)),a.y=Math.max(0,Math.round(d/e)),delete a.autoPosition,this.engine.nodeBoundFix(a),!this.engine.willItFit(a)){if(a.autoPosition=!0,!this.engine.willItFit(a))return void n.get().off(s,"drag");a._willFitPos&&(o.Utils.copyPos(a,a._willFitPos),delete a._willFitPos)}this._onStartMoving(r,i,p,a,t,e)}else this._dragOrResize(r,i,p,a,t,e)};return n.get().droppable(this.el,{accept:e=>{let t=e.gridstackNode;if((null==t?void 0:t.grid)===this)return!0;if(!this.opts.acceptWidgets)return!1;if(null==t?void 0:t.subGrid)return!1;let i=!0;if("function"==typeof this.opts.acceptWidgets)i=this.opts.acceptWidgets(e);else{let t=!0===this.opts.acceptWidgets?".grid-stack-item":this.opts.acceptWidgets;i=e.matches(t)}if(i&&t&&this.opts.maxRow){let e={w:t.w,h:t.h,minW:t.minW,minH:t.minH};i=this.engine.willItFit(e)}return i}}).on(this.el,"dropover",((s,r,o)=>{let l=r.gridstackNode;if((null==l?void 0:l.grid)===this&&!l._temporaryRemoved)return!1;(null==l?void 0:l.grid)&&l.grid!==this&&!l._temporaryRemoved&&l.grid._leave(r,o),t=this.cellWidth(),e=this.getCellHeight(!0),l||(l=this._readAttr(r)),l.grid||(l._isExternal=!0,r.gridstackNode=l),o=o||r;let d=l.w||Math.round(o.offsetWidth/t)||1,h=l.h||Math.round(o.offsetHeight/e)||1;return l.grid&&l.grid!==this?(r._gridstackNodeOrig||(r._gridstackNodeOrig=l),r.gridstackNode=l=Object.assign(Object.assign({},l),{w:d,h,grid:this}),this.engine.cleanupNode(l).nodeBoundFix(l),l._initDD=l._isExternal=l._temporaryRemoved=!0):(l.w=d,l.h=h,l._temporaryRemoved=!0),a(l.el,!1),n.get().on(r,"drag",i),i(s,r,o),!1})).on(this.el,"dropout",((e,t,i)=>{let s=t.gridstackNode;return!!s&&(s.grid&&s.grid!==this||this._leave(t,i),!1)})).on(this.el,"drop",((e,t,i)=>{let s=t.gridstackNode;if((null==s?void 0:s.grid)===this&&!s._isExternal)return!1;let r=!!this.placeholder.parentElement;this.placeholder.remove();let a=t._gridstackNodeOrig;if(delete t._gridstackNodeOrig,r&&a&&a.grid&&a.grid!==this){let e=a.grid;e.engine.removedNodes.push(a),e._triggerRemoveEvent()}return!!s&&(r&&(this.engine.cleanupNode(s),s.grid=this),n.get().off(t,"drag"),i!==t?(i.remove(),t.gridstackNode=a,r&&(t=t.cloneNode(!0))):(t.remove(),n.get().remove(t)),!!r&&(t.gridstackNode=s,s.el=t,o.Utils.copyPos(s,this._readAttr(this.placeholder)),o.Utils.removePositioningStyles(t),this._writeAttr(t,s),this.el.appendChild(t),this._updateContainerHeight(),this.engine.addedNodes.push(s),this._triggerAddEvent(),this._triggerChangeEvent(),this.engine.endUpdate(),this._gsEventHandler.dropped&&this._gsEventHandler.dropped(Object.assign(Object.assign({},e),{type:"dropped"}),a&&a.grid?a:void 0,s),window.setTimeout((()=>{s.el&&s.el.parentElement?this._prepareDragDropByNode(s):this.engine.removeNode(s)})),!1))})),this},r.GridStack.prototype._setupRemoveDrop=function(){if(!this.opts.staticGrid&&"string"==typeof this.opts.removable){let e=document.querySelector(this.opts.removable);if(!e)return this;n.get().isDroppable(e)||n.get().droppable(e,this.opts.removableOptions).on(e,"dropover",((e,t)=>a(t,!0))).on(e,"dropout",((e,t)=>a(t,!1)))}return this},r.GridStack.setupDragIn=function(e,t){let i,s;if(e&&(i=e,s=Object.assign(Object.assign({},{revert:"invalid",handle:".grid-stack-item-content",scroll:!1,appendTo:"body"}),t||{})),"string"!=typeof i)return;let r=n.get();o.Utils.getElements(i).forEach((e=>{r.isDraggable(e)||r.dragIn(e,s)}))},r.GridStack.prototype._prepareDragDropByNode=function(e){let t=e.el,i=n.get();if(this.opts.staticGrid||(e.noMove||this.opts.disableDrag)&&(e.noResize||this.opts.disableResize))return e._initDD&&(i.remove(t),delete e._initDD),t.classList.add("ui-draggable-disabled","ui-resizable-disabled"),this;if(!e._initDD){let s,r,n=(i,o)=>{this._gsEventHandler[i.type]&&this._gsEventHandler[i.type](i,i.target),s=this.cellWidth(),r=this.getCellHeight(!0),this._onStartMoving(t,i,o,e,s,r)},a=(i,o)=>{this._dragOrResize(t,i,o,e,s,r)},l=s=>{this.placeholder.remove(),delete e._moving,delete e._lastTried;let r=s.target;if(r.gridstackNode&&r.gridstackNode.grid===this){if(e.el=r,e._isAboutToRemove){let o=t.gridstackNode.grid;o._gsEventHandler[s.type]&&o._gsEventHandler[s.type](s,r),i.remove(t),o.engine.removedNodes.push(e),o._triggerRemoveEvent(),delete t.gridstackNode,delete e.el,t.remove()}else e._temporaryRemoved?(o.Utils.removePositioningStyles(r),o.Utils.copyPos(e,e._orig),this._writePosAttr(r,e),this.engine.addNode(e)):(o.Utils.removePositioningStyles(r),this._writePosAttr(r,e)),this._gsEventHandler[s.type]&&this._gsEventHandler[s.type](s,r);this._extraDragRow=0,this._updateContainerHeight(),this._triggerChangeEvent(),this.engine.endUpdate()}};i.draggable(t,{start:n,stop:l,drag:a}).resizable(t,{start:n,stop:l,resize:a}),e._initDD=!0}return e.noMove||this.opts.disableDrag?(i.draggable(t,"disable"),t.classList.add("ui-draggable-disabled")):(i.draggable(t,"enable"),t.classList.remove("ui-draggable-disabled")),e.noResize||this.opts.disableResize?(i.resizable(t,"disable"),t.classList.add("ui-resizable-disabled")):(i.resizable(t,"enable"),t.classList.remove("ui-resizable-disabled")),this},r.GridStack.prototype._onStartMoving=function(e,t,i,s,r,o){if(this.engine.cleanNodes().beginUpdate(s),this._writePosAttr(this.placeholder,s),this.el.appendChild(this.placeholder),s.el=this.placeholder,s._lastUiPosition=i.position,s._prevYPix=i.position.top,s._moving="dragstart"===t.type,delete s._lastTried,"dropover"===t.type&&s._temporaryRemoved&&(this.engine.addNode(s),s._moving=!0),this.engine.cacheRects(r,o,this.opts.marginTop,this.opts.marginRight,this.opts.marginBottom,this.opts.marginLeft),"resizestart"===t.type){let t=n.get().resizable(e,"option","minWidth",r*(s.minW||1)).resizable(e,"option","minHeight",o*(s.minH||1));s.maxW&&t.resizable(e,"option","maxWidth",r*s.maxW),s.maxH&&t.resizable(e,"option","maxHeight",o*s.maxH)}},r.GridStack.prototype._leave=function(e,t){let i=e.gridstackNode;i&&(n.get().off(e,"drag"),i._temporaryRemoved||(i._temporaryRemoved=!0,this.engine.removeNode(i),i.el=i._isExternal&&t?t:e,!0===this.opts.removable&&a(e,!0),e._gridstackNodeOrig?(e.gridstackNode=e._gridstackNodeOrig,delete e._gridstackNodeOrig):i._isExternal&&(delete i.el,delete e.gridstackNode,this.engine.restoreInitial())))},r.GridStack.prototype._dragOrResize=function(e,t,i,s,r,n){let a,l=Object.assign({},s._orig),d=this.opts.marginLeft,h=this.opts.marginRight,p=this.opts.marginTop,g=this.opts.marginBottom,c=Math.round(.1*n),u=Math.round(.1*r);if(d=Math.min(d,u),h=Math.min(h,u),p=Math.min(p,c),g=Math.min(g,c),"drag"===t.type){if(s._temporaryRemoved)return;let t=i.position.top-s._prevYPix;s._prevYPix=i.position.top,o.Utils.updateScrollPosition(e,i.position,t);let a=i.position.left+(i.position.left>s._lastUiPosition.left?-h:d),c=i.position.top+(i.position.top>s._lastUiPosition.top?-g:p);l.x=Math.round(a/r),l.y=Math.round(c/n);let u=this._extraDragRow;if(this.engine.collide(s,l)){let e=this.getRow(),t=Math.max(0,l.y+s.h-e);this.opts.maxRow&&e+t>this.opts.maxRow&&(t=Math.max(0,this.opts.maxRow-e)),this._extraDragRow=t}else this._extraDragRow=0;if(this._extraDragRow!==u&&this._updateContainerHeight(),s.x===l.x&&s.y===l.y)return}else if("resize"===t.type){if(l.x<0)return;if(o.Utils.updateScrollResize(t,e,n),l.w=Math.round((i.size.width-d)/r),l.h=Math.round((i.size.height-p)/n),s.w===l.w&&s.h===l.h)return;if(s._lastTried&&s._lastTried.w===l.w&&s._lastTried.h===l.h)return;let h=i.position.left+d,g=i.position.top+p;l.x=Math.round(h/r),l.y=Math.round(g/n),a=!0}s._lastTried=l;let m={x:i.position.left+d,y:i.position.top+p,w:(i.size?i.size.width:s.w*r)-d-h,h:(i.size?i.size.height:s.h*n)-p-g};if(this.engine.moveNodeCheck(s,Object.assign(Object.assign({},l),{cellWidth:r,cellHeight:n,rect:m,resizing:a}))){s._lastUiPosition=i.position,this.engine.cacheRects(r,n,p,h,g,d),delete s._skipDown,a&&s.subGrid&&s.subGrid.onParentResize(),this._extraDragRow=0,this._updateContainerHeight();let e=t.target;this._writePosAttr(e,s),this._gsEventHandler[t.type]&&this._gsEventHandler[t.type](t,e)}},r.GridStack.prototype.movable=function(e,t){return this.opts.staticGrid||r.GridStack.getElements(e).forEach((e=>{let i=e.gridstackNode;i&&(t?delete i.noMove:i.noMove=!0,this._prepareDragDropByNode(i))})),this},r.GridStack.prototype.resizable=function(e,t){return this.opts.staticGrid||r.GridStack.getElements(e).forEach((e=>{let i=e.gridstackNode;i&&(t?delete i.noResize:i.noResize=!0,this._prepareDragDropByNode(i))})),this},r.GridStack.prototype.disable=function(){if(!this.opts.staticGrid)return this.enableMove(!1),this.enableResize(!1),this._triggerEvent("disable"),this},r.GridStack.prototype.enable=function(){if(!this.opts.staticGrid)return this.enableMove(!0),this.enableResize(!0),this._triggerEvent("enable"),this},r.GridStack.prototype.enableMove=function(e){return this.opts.staticGrid||(this.opts.disableDrag=!e,this.engine.nodes.forEach((t=>this.movable(t.el,e)))),this},r.GridStack.prototype.enableResize=function(e){return this.opts.staticGrid||(this.opts.disableResize=!e,this.engine.nodes.forEach((t=>this.resizable(t.el,e)))),this}},958:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DDBaseImplement=void 0,t.DDBaseImplement=class{constructor(){this._disabled=!1,this._eventRegister={}}get disabled(){return this._disabled}on(e,t){this._eventRegister[e]=t}off(e){delete this._eventRegister[e]}enable(){this._disabled=!1}disable(){this._disabled=!0}destroy(){delete this._eventRegister}triggerEvent(e,t){if(!this.disabled&&this._eventRegister&&this._eventRegister[e])return this._eventRegister[e](t)}}},396:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DDDraggable=void 0;const s=i(596),r=i(869),o=i(958);class n extends o.DDBaseImplement{constructor(e,t={}){super(),this.dragging=!1,this.ui=()=>{const e=this.el.parentElement.getBoundingClientRect(),t=this.helper.getBoundingClientRect();return{position:{top:t.top-e.top,left:t.left-e.left}}},this.el=e,this.option=t;let i=t.handle.substring(1);this.dragEl=e.classList.contains(i)?e:e.querySelector(t.handle)||e,this._dragStart=this._dragStart.bind(this),this._drag=this._drag.bind(this),this._dragEnd=this._dragEnd.bind(this),this.enable()}on(e,t){super.on(e,t)}off(e){super.off(e)}enable(){super.enable(),this.dragEl.draggable=!0,this.dragEl.addEventListener("dragstart",this._dragStart),this.el.classList.remove("ui-draggable-disabled"),this.el.classList.add("ui-draggable")}disable(e=!1){super.disable(),this.dragEl.removeAttribute("draggable"),this.dragEl.removeEventListener("dragstart",this._dragStart),this.el.classList.remove("ui-draggable"),e||this.el.classList.add("ui-draggable-disabled")}destroy(){this.dragging&&this._dragEnd({}),this.disable(!0),delete this.el,delete this.helper,delete this.option,super.destroy()}updateOption(e){return Object.keys(e).forEach((t=>this.option[t]=e[t])),this}_dragStart(e){s.DDManager.dragElement=this,this.helper=this._createHelper(e),this._setupHelperContainmentStyle(),this.dragOffset=this._getDragOffset(e,this.el,this.helperContainment);const t=r.DDUtils.initEvent(e,{target:this.el,type:"dragstart"});this.helper!==this.el?(this._setupDragFollowNodeNotifyStart(t),this._dragFollow(e)):this.dragFollowTimer=window.setTimeout((()=>{delete this.dragFollowTimer,this._setupDragFollowNodeNotifyStart(t)}),0),this._cancelDragGhost(e)}_setupDragFollowNodeNotifyStart(e){return this._setupHelperStyle(),document.addEventListener("dragover",this._drag,n.dragEventListenerOption),this.dragEl.addEventListener("dragend",this._dragEnd),this.option.start&&this.option.start(e,this.ui()),this.dragging=!0,this.helper.classList.add("ui-draggable-dragging"),this.triggerEvent("dragstart",e),this}_drag(e){e.preventDefault(),this._dragFollow(e);const t=r.DDUtils.initEvent(e,{target:this.el,type:"drag"});this.option.drag&&this.option.drag(t,this.ui()),this.triggerEvent("drag",t)}_dragEnd(e){if(this.dragFollowTimer)return clearTimeout(this.dragFollowTimer),void delete this.dragFollowTimer;this.paintTimer&&cancelAnimationFrame(this.paintTimer),document.removeEventListener("dragover",this._drag,n.dragEventListenerOption),this.dragEl.removeEventListener("dragend",this._dragEnd),this.dragging=!1,this.helper.classList.remove("ui-draggable-dragging"),this.helperContainment.style.position=this.parentOriginStylePosition||null,this.helper===this.el?this._removeHelperStyle():this.helper.remove();const t=r.DDUtils.initEvent(e,{target:this.el,type:"dragstop"});this.option.stop&&this.option.stop(t),this.triggerEvent("dragstop",t),delete s.DDManager.dragElement,delete this.helper}_createHelper(e){let t=this.el;return"function"==typeof this.option.helper?t=this.option.helper(e):"clone"===this.option.helper&&(t=r.DDUtils.clone(this.el)),document.body.contains(t)||r.DDUtils.appendTo(t,"parent"===this.option.appendTo?this.el.parentNode:this.option.appendTo),t===this.el&&(this.dragElementOriginStyle=n.originStyleProp.map((e=>this.el.style[e]))),t}_setupHelperStyle(){const e=this.helper.getBoundingClientRect(),t=this.helper.style;return t.pointerEvents="none",t["min-width"]=0,t.width=this.dragOffset.width+"px",t.height=this.dragOffset.height+"px",t.willChange="left, top",t.position="fixed",t.left=e.left+"px",t.top=e.top+"px",t.transition="none",setTimeout((()=>{this.helper&&(t.transition=null)}),0),this}_removeHelperStyle(){let e=this.helper?this.helper.gridstackNode:void 0;return!this.dragElementOriginStyle||e&&e._isAboutToRemove||(n.originStyleProp.forEach((e=>{this.helper.style[e]=this.dragElementOriginStyle[e]||null})),this.helper.style.transition="none",setTimeout((()=>{this.helper&&(this.helper.style.transition=this.dragElementOriginStyle.transition)}),0)),delete this.dragElementOriginStyle,this}_dragFollow(e){this.paintTimer&&cancelAnimationFrame(this.paintTimer),this.paintTimer=requestAnimationFrame((()=>{delete this.paintTimer;const t=this.dragOffset;let i={left:0,top:0};if("absolute"===this.helper.style.position){const{left:e,top:t}=this.helperContainment.getBoundingClientRect();i={left:e,top:t}}this.helper.style.left=e.clientX+t.offsetLeft-i.left+"px",this.helper.style.top=e.clientY+t.offsetTop-i.top+"px"}))}_setupHelperContainmentStyle(){return this.helperContainment=this.helper.parentElement,"fixed"!==this.helper.style.position&&(this.parentOriginStylePosition=this.helperContainment.style.position,window.getComputedStyle(this.helperContainment).position.match(/static/)&&(this.helperContainment.style.position="relative")),this}_cancelDragGhost(e){let t=document.createElement("div");return t.style.width="1px",t.style.height="1px",t.style.position="fixed",document.body.appendChild(t),e.dataTransfer.setDragImage(t,0,0),setTimeout((()=>document.body.removeChild(t))),e.stopPropagation(),this}_getDragOffset(e,t,i){let s=0,o=0;if(i){const e=document.createElement("div");r.DDUtils.addElStyles(e,{opacity:"0",position:"fixed",top:"0px",left:"0px",width:"1px",height:"1px",zIndex:"-999999"}),i.appendChild(e);const t=e.getBoundingClientRect();i.removeChild(e),s=t.left,o=t.top}const n=t.getBoundingClientRect();return{left:n.left,top:n.top,offsetLeft:-e.clientX+n.left-s,offsetTop:-e.clientY+n.top-o,width:n.width,height:n.height}}}t.DDDraggable=n,n.dragEventListenerOption=!0,n.originStyleProp=["transition","pointerEvents","position","left","top","opacity","zIndex","width","height","willChange","min-width"]},858:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DDDroppable=void 0;const s=i(596),r=i(958),o=i(869);class n extends r.DDBaseImplement{constructor(e,t={}){super(),this.el=e,this.option=t,this._dragEnter=this._dragEnter.bind(this),this._dragOver=this._dragOver.bind(this),this._dragLeave=this._dragLeave.bind(this),this._drop=this._drop.bind(this),this.el.classList.add("ui-droppable"),this.el.addEventListener("dragenter",this._dragEnter),this._setupAccept()}on(e,t){super.on(e,t)}off(e){super.off(e)}enable(){this.disabled&&(super.enable(),this.el.classList.remove("ui-droppable-disabled"),this.el.addEventListener("dragenter",this._dragEnter))}disable(e=!1){this.disabled||(super.disable(),e||this.el.classList.add("ui-droppable-disabled"),this.el.removeEventListener("dragenter",this._dragEnter))}destroy(){this._removeLeaveCallbacks(),this.disable(!0),this.el.classList.remove("ui-droppable"),this.el.classList.remove("ui-droppable-disabled"),super.destroy()}updateOption(e){return Object.keys(e).forEach((t=>this.option[t]=e[t])),this._setupAccept(),this}_dragEnter(e){if(!this._canDrop())return;if(e.preventDefault(),e.stopPropagation(),this.moving)return;this.moving=!0;const t=o.DDUtils.initEvent(e,{target:this.el,type:"dropover"});this.option.over&&this.option.over(t,this._ui(s.DDManager.dragElement)),this.triggerEvent("dropover",t),this.el.addEventListener("dragover",this._dragOver),this.el.addEventListener("drop",this._drop),this.el.addEventListener("dragleave",this._dragLeave),n.lastActive&&n.lastActive!==this&&n.lastActive._dragLeave(e,!0),n.lastActive=this}_dragOver(e){e.preventDefault(),e.stopPropagation()}_dragLeave(e,t){var i;if(e.preventDefault(),e.stopPropagation(),!t){let t=o.DDUtils.inside(e,this.el),r=s.DDManager.dragElement.el;if(t&&!(null===(i=r.gridstackNode)||void 0===i?void 0:i.subGrid)&&(t=!this.el.gridstack.engine.nodes.filter((e=>e.subGrid)).map((e=>e.subGrid.el)).some((t=>o.DDUtils.inside(e,t)))),t)return}if(this.moving){const t=o.DDUtils.initEvent(e,{target:this.el,type:"dropout"});this.option.out&&this.option.out(t,this._ui(s.DDManager.dragElement)),this.triggerEvent("dropout",t)}this._removeLeaveCallbacks(),n.lastActive===this&&delete n.lastActive}_drop(e){if(!this.moving)return;e.preventDefault();const t=o.DDUtils.initEvent(e,{target:this.el,type:"drop"});this.option.drop&&this.option.drop(t,this._ui(s.DDManager.dragElement)),this.triggerEvent("drop",t),this._removeLeaveCallbacks()}_removeLeaveCallbacks(){this.moving&&(delete this.moving,this.el.removeEventListener("dragover",this._dragOver),this.el.removeEventListener("drop",this._drop),this.el.removeEventListener("dragleave",this._dragLeave))}_canDrop(){return s.DDManager.dragElement&&(!this.accept||this.accept(s.DDManager.dragElement.el))}_setupAccept(){return this.option.accept&&"string"==typeof this.option.accept?this.accept=e=>e.matches(this.option.accept):this.accept=this.option.accept,this}_ui(e){return Object.assign({draggable:e.el},e.ui())}}t.DDDroppable=n},191:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DDElement=void 0;const s=i(725),r=i(396),o=i(858);class n{constructor(e){this.el=e}static init(e){return e.ddElement||(e.ddElement=new n(e)),e.ddElement}on(e,t){return this.ddDraggable&&["drag","dragstart","dragstop"].indexOf(e)>-1?this.ddDraggable.on(e,t):this.ddDroppable&&["drop","dropover","dropout"].indexOf(e)>-1?this.ddDroppable.on(e,t):this.ddResizable&&["resizestart","resize","resizestop"].indexOf(e)>-1&&this.ddResizable.on(e,t),this}off(e){return this.ddDraggable&&["drag","dragstart","dragstop"].indexOf(e)>-1?this.ddDraggable.off(e):this.ddDroppable&&["drop","dropover","dropout"].indexOf(e)>-1?this.ddDroppable.off(e):this.ddResizable&&["resizestart","resize","resizestop"].indexOf(e)>-1&&this.ddResizable.off(e),this}setupDraggable(e){return this.ddDraggable?this.ddDraggable.updateOption(e):this.ddDraggable=new r.DDDraggable(this.el,e),this}cleanDraggable(){return this.ddDraggable&&(this.ddDraggable.destroy(),delete this.ddDraggable),this}setupResizable(e){return this.ddResizable?this.ddResizable.updateOption(e):this.ddResizable=new s.DDResizable(this.el,e),this}cleanResizable(){return this.ddResizable&&(this.ddResizable.destroy(),delete this.ddResizable),this}setupDroppable(e){return this.ddDroppable?this.ddDroppable.updateOption(e):this.ddDroppable=new o.DDDroppable(this.el,e),this}cleanDroppable(){return this.ddDroppable&&(this.ddDroppable.destroy(),delete this.ddDroppable),this}}t.DDElement=n},596:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DDManager=void 0,t.DDManager=class{}},128:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DDResizableHandle=void 0;class i{constructor(e,t,i){this.moving=!1,this.host=e,this.dir=t,this.option=i,this._mouseDown=this._mouseDown.bind(this),this._mouseMove=this._mouseMove.bind(this),this._mouseUp=this._mouseUp.bind(this),this._init()}_init(){const e=document.createElement("div");return e.classList.add("ui-resizable-handle"),e.classList.add(`${i.prefix}${this.dir}`),e.style.zIndex="100",e.style.userSelect="none",this.el=e,this.host.appendChild(this.el),this.el.addEventListener("mousedown",this._mouseDown),this}destroy(){return this.moving&&this._mouseUp(this.mouseDownEvent),this.el.removeEventListener("mousedown",this._mouseDown),this.host.removeChild(this.el),delete this.el,delete this.host,this}_mouseDown(e){e.preventDefault(),this.mouseDownEvent=e,document.addEventListener("mousemove",this._mouseMove,!0),document.addEventListener("mouseup",this._mouseUp)}_mouseMove(e){let t=this.mouseDownEvent;!this.moving&&Math.abs(e.x-t.x)+Math.abs(e.y-t.y)>2?(this.moving=!0,this._triggerEvent("start",this.mouseDownEvent)):this.moving&&this._triggerEvent("move",e)}_mouseUp(e){this.moving&&this._triggerEvent("stop",e),document.removeEventListener("mousemove",this._mouseMove,!0),document.removeEventListener("mouseup",this._mouseUp),delete this.moving,delete this.mouseDownEvent}_triggerEvent(e,t){return this.option[e]&&this.option[e](t),this}}t.DDResizableHandle=i,i.prefix="ui-resizable-"},725:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DDResizable=void 0;const s=i(128),r=i(958),o=i(869),n=i(709);class a extends r.DDBaseImplement{constructor(e,t={}){super(),this._showHandlers=()=>{this.el.classList.remove("ui-resizable-autohide")},this._hideHandlers=()=>{this.el.classList.add("ui-resizable-autohide")},this._ui=()=>{const e=this.el.parentElement.getBoundingClientRect(),t={width:this.originalRect.width,height:this.originalRect.height+this.scrolled,left:this.originalRect.left,top:this.originalRect.top-this.scrolled},i=this.temporalRect||t;return{position:{left:i.left-e.left,top:i.top-e.top},size:{width:i.width,height:i.height}}},this.el=e,this.option=t,this.enable(),this._setupAutoHide(),this._setupHandlers()}on(e,t){super.on(e,t)}off(e){super.off(e)}enable(){super.enable(),this.el.classList.add("ui-resizable"),this.el.classList.remove("ui-resizable-disabled")}disable(){super.disable(),this.el.classList.add("ui-resizable-disabled"),this.el.classList.remove("ui-resizable")}destroy(){this._removeHandlers(),this.option.autoHide&&(this.el.removeEventListener("mouseover",this._showHandlers),this.el.removeEventListener("mouseout",this._hideHandlers)),this.el.classList.remove("ui-resizable"),delete this.el,super.destroy()}updateOption(e){let t=e.handles&&e.handles!==this.option.handles,i=e.autoHide&&e.autoHide!==this.option.autoHide;return Object.keys(e).forEach((t=>this.option[t]=e[t])),t&&(this._removeHandlers(),this._setupHandlers()),i&&this._setupAutoHide(),this}_setupAutoHide(){return this.option.autoHide?(this.el.classList.add("ui-resizable-autohide"),this.el.addEventListener("mouseover",this._showHandlers),this.el.addEventListener("mouseout",this._hideHandlers)):(this.el.classList.remove("ui-resizable-autohide"),this.el.removeEventListener("mouseover",this._showHandlers),this.el.removeEventListener("mouseout",this._hideHandlers)),this}_setupHandlers(){let e=this.option.handles||"e,s,se";return"all"===e&&(e="n,e,s,w,se,sw,ne,nw"),this.handlers=e.split(",").map((e=>e.trim())).map((e=>new s.DDResizableHandle(this.el,e,{start:e=>{this._resizeStart(e)},stop:e=>{this._resizeStop(e)},move:t=>{this._resizing(t,e)}}))),this}_resizeStart(e){this.originalRect=this.el.getBoundingClientRect(),this.scrollEl=n.Utils.getScrollElement(this.el),this.scrollY=this.scrollEl.scrollTop,this.scrolled=0,this.startEvent=e,this._setupHelper(),this._applyChange();const t=o.DDUtils.initEvent(e,{type:"resizestart",target:this.el});return this.option.start&&this.option.start(t,this._ui()),this.el.classList.add("ui-resizable-resizing"),this.triggerEvent("resizestart",t),this}_resizing(e,t){this.scrolled=this.scrollEl.scrollTop-this.scrollY,this.temporalRect=this._getChange(e,t),this._applyChange();const i=o.DDUtils.initEvent(e,{type:"resize",target:this.el});return this.option.resize&&this.option.resize(i,this._ui()),this.triggerEvent("resize",i),this}_resizeStop(e){const t=o.DDUtils.initEvent(e,{type:"resizestop",target:this.el});return this.option.stop&&this.option.stop(t),this.el.classList.remove("ui-resizable-resizing"),this.triggerEvent("resizestop",t),this._cleanHelper(),delete this.startEvent,delete this.originalRect,delete this.temporalRect,delete this.scrollY,delete this.scrolled,this}_setupHelper(){return this.elOriginStyleVal=a._originStyleProp.map((e=>this.el.style[e])),this.parentOriginStylePosition=this.el.parentElement.style.position,window.getComputedStyle(this.el.parentElement).position.match(/static/)&&(this.el.parentElement.style.position="relative"),this.el.style.position="absolute",this.el.style.opacity="0.8",this}_cleanHelper(){return a._originStyleProp.forEach(((e,t)=>{this.el.style[e]=this.elOriginStyleVal[t]||null})),this.el.parentElement.style.position=this.parentOriginStylePosition||null,this}_getChange(e,t){const i=this.startEvent,s={width:this.originalRect.width,height:this.originalRect.height+this.scrolled,left:this.originalRect.left,top:this.originalRect.top-this.scrolled},r=e.clientX-i.clientX,o=e.clientY-i.clientY;t.indexOf("e")>-1?s.width+=r:t.indexOf("w")>-1&&(s.width-=r,s.left+=r),t.indexOf("s")>-1?s.height+=o:t.indexOf("n")>-1&&(s.height-=o,s.top+=o);const n=this._constrainSize(s.width,s.height);return Math.round(s.width)!==Math.round(n.width)&&(t.indexOf("w")>-1&&(s.left+=s.width-n.width),s.width=n.width),Math.round(s.height)!==Math.round(n.height)&&(t.indexOf("n")>-1&&(s.top+=s.height-n.height),s.height=n.height),s}_constrainSize(e,t){const i=this.option.maxWidth||Number.MAX_SAFE_INTEGER,s=this.option.minWidth||e,r=this.option.maxHeight||Number.MAX_SAFE_INTEGER,o=this.option.minHeight||t;return{width:Math.min(i,Math.max(s,e)),height:Math.min(r,Math.max(o,t))}}_applyChange(){let e={left:0,top:0,width:0,height:0};if("absolute"===this.el.style.position){const t=this.el.parentElement,{left:i,top:s}=t.getBoundingClientRect();e={left:i,top:s,width:0,height:0}}return this.temporalRect?(Object.keys(this.temporalRect).forEach((t=>{const i=this.temporalRect[t];this.el.style[t]=i-e[t]+"px"})),this):this}_removeHandlers(){return this.handlers.forEach((e=>e.destroy())),delete this.handlers,this}}t.DDResizable=a,a._originStyleProp=["width","height","position","left","top","opacity","zIndex"]},869:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DDUtils=void 0;class i{static clone(e){const t=e.cloneNode(!0);return t.removeAttribute("id"),t}static appendTo(e,t){let i;i="string"==typeof t?document.querySelector(t):t,i&&i.appendChild(e)}static setPositionRelative(e){/^(?:r|a|f)/.test(window.getComputedStyle(e).position)||(e.style.position="relative")}static addElStyles(e,t){if(t instanceof Object)for(const i in t)t.hasOwnProperty(i)&&(Array.isArray(t[i])?t[i].forEach((t=>{e.style[i]=t})):e.style[i]=t[i])}static initEvent(e,t){const i={type:t.type},s={button:0,which:0,buttons:1,bubbles:!0,cancelable:!0,target:t.target?t.target:e.target};return e.dataTransfer&&(i.dataTransfer=e.dataTransfer),["altKey","ctrlKey","metaKey","shiftKey"].forEach((t=>i[t]=e[t])),["pageX","pageY","clientX","clientY","screenX","screenY"].forEach((t=>i[t]=e[t])),Object.assign(Object.assign({},i),s)}static inside(e,t){let i=e.relatedTarget||e.fromElement;if(!i){const{bottom:i,left:s,right:r,top:o}=t.getBoundingClientRect();return e.x<r&&e.x>s&&e.y<i&&e.y>o}return t.contains(i)}}t.DDUtils=i,i.isEventSupportPassiveOption=(()=>{let e=!1,t=()=>{};return document.addEventListener("test",t,{get passive(){return e=!0,!0}}),document.removeEventListener("test",t),e})()},43:function(e,t,i){var s=this&&this.__createBinding||(Object.create?function(e,t,i,s){void 0===s&&(s=i),Object.defineProperty(e,s,{enumerable:!0,get:function(){return t[i]}})}:function(e,t,i,s){void 0===s&&(s=i),e[s]=t[i]}),r=this&&this.__exportStar||function(e,t){for(var i in e)"default"===i||t.hasOwnProperty(i)||s(t,e,i)};Object.defineProperty(t,"__esModule",{value:!0}),t.GridStackDDNative=void 0;const o=i(596),n=i(191),a=i(949),l=i(709);r(i(949),t);class d extends a.GridStackDD{resizable(e,t,i,s){return this._getDDElements(e).forEach((e=>{if("disable"===t||"enable"===t)e.ddResizable&&e.ddResizable[t]();else if("destroy"===t)e.ddResizable&&e.cleanResizable();else if("option"===t)e.setupResizable({[i]:s});else{const i=e.el.gridstackNode.grid;let s=e.el.getAttribute("gs-resize-handles")?e.el.getAttribute("gs-resize-handles"):i.opts.resizable.handles;e.setupResizable(Object.assign(Object.assign(Object.assign({},i.opts.resizable),{handles:s}),{start:t.start,stop:t.stop,resize:t.resize}))}})),this}draggable(e,t,i,s){return this._getDDElements(e).forEach((e=>{if("disable"===t||"enable"===t)e.ddDraggable&&e.ddDraggable[t]();else if("destroy"===t)e.ddDraggable&&e.cleanDraggable();else if("option"===t)e.setupDraggable({[i]:s});else{const i=e.el.gridstackNode.grid;e.setupDraggable(Object.assign(Object.assign({},i.opts.draggable),{containment:i.opts._isNested&&!i.opts.dragOut?i.el.parentElement:i.opts.draggable.containment||null,start:t.start,stop:t.stop,drag:t.drag}))}})),this}dragIn(e,t){return this._getDDElements(e).forEach((e=>e.setupDraggable(t))),this}droppable(e,t,i,s){return"function"!=typeof t.accept||t._accept||(t._accept=t.accept,t.accept=e=>t._accept(e)),this._getDDElements(e).forEach((e=>{"disable"===t||"enable"===t?e.ddDroppable&&e.ddDroppable[t]():"destroy"===t?e.ddDroppable&&e.cleanDroppable():"option"===t?e.setupDroppable({[i]:s}):e.setupDroppable(t)})),this}isDroppable(e){return!(!(e&&e.ddElement&&e.ddElement.ddDroppable)||e.ddElement.ddDroppable.disabled)}isDraggable(e){return!(!(e&&e.ddElement&&e.ddElement.ddDraggable)||e.ddElement.ddDraggable.disabled)}isResizable(e){return!(!(e&&e.ddElement&&e.ddElement.ddResizable)||e.ddElement.ddResizable.disabled)}on(e,t,i){return this._getDDElements(e).forEach((e=>e.on(t,(e=>{i(e,o.DDManager.dragElement?o.DDManager.dragElement.el:e.target,o.DDManager.dragElement?o.DDManager.dragElement.helper:null)})))),this}off(e,t){return this._getDDElements(e).forEach((e=>e.off(t))),this}_getDDElements(e,t=!0){let i=l.Utils.getElements(e);if(!i.length)return[];let s=i.map((e=>e.ddElement||(t?n.DDElement.init(e):null)));return t||s.filter((e=>e)),s}}t.GridStackDDNative=d,a.GridStackDD.registerPlugin(d)}}]);