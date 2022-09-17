"use strict";(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[9609],{49609:(e,t,i)=>{i.r(t),i.d(t,{ABCWidgetFactory:()=>w,Base64ModelFactory:()=>F,Context:()=>p,DocumentModel:()=>y,DocumentRegistry:()=>P,DocumentWidget:()=>x,MimeContent:()=>b,MimeDocument:()=>D,MimeDocumentFactory:()=>O,TextModelFactory:()=>f});var s,n=i(67666),a=i(12439),r=i(78784),o=i(29118),h=i(82002),l=i(74547),d=i(18108),c=i(58646),_=i(15004);class p{constructor(e){this._path="",this._lineEnding=null,this._contentsModel=null,this._populatedPromise=new l.PromiseDelegate,this._isPopulated=!1,this._isReady=!1,this._isDisposed=!1,this._pathChanged=new c.Signal(this),this._fileChanged=new c.Signal(this),this._saveState=new c.Signal(this),this._disposed=new c.Signal(this),this._lastModifiedCheckMargin=500,this._timeConflictModalIsOpen=!1;const t=this._manager=e.manager;this.translator=e.translator||h.nullTranslator,this._trans=this.translator.load("jupyterlab"),this._factory=e.factory,this._dialogs=e.sessionDialogs||n.sessionContextDialogs,this._opener=e.opener||s.noOp,this._path=this._manager.contents.normalize(e.path),this._lastModifiedCheckMargin=e.lastModifiedCheckMargin||500;const i=this._manager.contents.localPath(this._path),d=this._factory.preferredLanguage(a.PathExt.basename(i)),_=e.modelDBFactory;if(_){const e=t.contents.localPath(this._path);this._modelDB=_.createNew(e),this._model=this._factory.createNew(d,this._modelDB,!1)}else this._model=this._factory.createNew(d,void 0,!1);const p=this._model.sharedModel,m=p.ydoc;this._ydoc=m,this._ycontext=m.getMap("context");const g=e.docProviderFactory;this._provider=g?g({path:this._path,contentType:this._factory.contentType,ymodel:p}):new r.ProviderMock,this._readyPromise=t.ready.then((()=>this._populatedPromise.promise));const u=a.PathExt.extname(this._path);this.sessionContext=new n.SessionContext({sessionManager:t.sessions,specsManager:t.kernelspecs,path:this._path,type:".ipynb"===u?"notebook":"file",name:a.PathExt.basename(i),kernelPreference:e.kernelPreference||{shouldStart:!1},setBusy:e.setBusy}),this.sessionContext.propertyChanged.connect(this._onSessionChanged,this),t.contents.fileChanged.connect(this._onFileChanged,this);const y=this.urlResolver=new o.RenderMimeRegistry.UrlResolver({path:this._path,contents:t.contents});this._ycontext.set("path",this._path),this._ycontext.observe((e=>{var t;const i=e.changes.keys.get("path");if(i){const e=this._ycontext.get("path");e&&e!==i.oldValue&&(y.path=e,this._path=e,this._provider.setPath(e),this._pathChanged.emit(this.path),null===(t=this.sessionContext.session)||void 0===t||t.setPath(e))}}))}get pathChanged(){return this._pathChanged}get fileChanged(){return this._fileChanged}get saveState(){return this._saveState}get disposed(){return this._disposed}get lastModifiedCheckMargin(){return this._lastModifiedCheckMargin}set lastModifiedCheckMargin(e){this._lastModifiedCheckMargin=e}get model(){return this._model}get path(){return this._path}get localPath(){return this._manager.contents.localPath(this._path)}get contentsModel(){return this._contentsModel}get factoryName(){return this.isDisposed?"":this._factory.name}get isDisposed(){return this._isDisposed}dispose(){this.isDisposed||(this._isDisposed=!0,this.sessionContext.dispose(),this._modelDB&&this._modelDB.dispose(),this._model.dispose(),this._provider.destroy(),this._model.sharedModel.dispose(),this._ydoc.destroy(),this._disposed.emit(void 0),c.Signal.clearData(this))}get isReady(){return this._isReady}get ready(){return this._readyPromise}async initialize(e){const t=await this._provider.acquireLock(),i=await this._provider.requestInitialContent();let s;s=e||i?this._save():this._revert();const n=()=>{this._provider.releaseLock(t)};return s.then((()=>{this._provider.putInitializedState(),this._model.initialize()})).then(n,n),s}rename(e){return this.ready.then((()=>this._manager.ready.then((()=>this._rename(e)))))}async save(){const[e]=await Promise.all([this._provider.acquireLock(),this.ready]);let t;t=this._save(),t=t.then((()=>{this._provider.putInitializedState()}));const i=()=>{this._provider.releaseLock(e)};return t.then(i,i),await t}saveAs(){return this.ready.then((()=>s.getSavePath(this._path))).then((e=>{if(!this.isDisposed&&e)return e===this._path?this.save():this._manager.ready.then((()=>this._manager.contents.get(e))).then((()=>this._maybeOverWrite(e))).catch((t=>{if(!t.response||404!==t.response.status)throw t;return this._finishSaveAs(e)}))}))}async download(){const e=await this._manager.contents.getDownloadUrl(this._path),t=document.createElement("a");t.href=e,t.download="",document.body.appendChild(t),t.click(),document.body.removeChild(t)}async revert(){const[e]=await Promise.all([this._provider.acquireLock(),this.ready]),t=this._revert(),i=()=>{this._provider.releaseLock(e)};return t.then(i,i),await t}createCheckpoint(){const e=this._manager.contents;return this._manager.ready.then((()=>e.createCheckpoint(this._path)))}deleteCheckpoint(e){const t=this._manager.contents;return this._manager.ready.then((()=>t.deleteCheckpoint(this._path,e)))}restoreCheckpoint(e){const t=this._manager.contents,i=this._path;return this._manager.ready.then((()=>e?t.restoreCheckpoint(i,e):this.listCheckpoints().then((s=>{if(!this.isDisposed&&s.length)return e=s[s.length-1].id,t.restoreCheckpoint(i,e)}))))}listCheckpoints(){const e=this._manager.contents;return this._manager.ready.then((()=>e.listCheckpoints(this._path)))}addSibling(e,t={}){const i=this._opener;return i&&i(e,t),new d.DisposableDelegate((()=>{e.close()}))}_onFileChanged(e,t){var i,s,n;if("rename"!==t.type)return;let r=t.oldValue&&t.oldValue.path,o=t.newValue&&t.newValue.path;if(o&&0===this._path.indexOf(r||"")){let e=t.newValue;r!==this._path&&(o=this._path.replace(new RegExp(`^${r}/`),`${o}/`),r=this._path,e={last_modified:null===(i=t.newValue)||void 0===i?void 0:i.created,path:o}),this._path=o,null===(s=this.sessionContext.session)||void 0===s||s.setPath(o);const h=Object.assign(Object.assign({},this._contentsModel),e),l=this._manager.contents.localPath(o);null===(n=this.sessionContext.session)||void 0===n||n.setName(a.PathExt.basename(l)),this._updateContentsModel(h),this._ycontext.set("path",this._path)}}_onSessionChanged(e,t){if("path"!==t)return;const i=this.sessionContext.session.path;i!==this._path&&(this._path=i,this._ycontext.set("path",this._path))}_updateContentsModel(e){const t={path:e.path,name:e.name,type:e.type,content:void 0,writable:e.writable,created:e.created,last_modified:e.last_modified,mimetype:e.mimetype,format:e.format},i=this._contentsModel?this._contentsModel.last_modified:null;this._contentsModel=t,this._ycontext.set("last_modified",t.last_modified),i&&t.last_modified===i||this._fileChanged.emit(t)}_populate(){return this._isPopulated=!0,this._isReady=!0,this._populatedPromise.resolve(void 0),this._maybeCheckpoint(!1).then((()=>{if(this.isDisposed)return;const e=this._model.defaultKernelName||this.sessionContext.kernelPreference.name;this.sessionContext.kernelPreference=Object.assign(Object.assign({},this.sessionContext.kernelPreference),{name:e,language:this._model.defaultKernelLanguage}),this.sessionContext.initialize().then((e=>{e&&this._dialogs.selectKernel(this.sessionContext,this.translator)}))}))}async _rename(e){var t,i;const s=this.path.split("/");s[s.length-1]=e;const n=s.join("/");await this._manager.contents.rename(this.path,n),await(null===(t=this.sessionContext.session)||void 0===t?void 0:t.setPath(n)),await(null===(i=this.sessionContext.session)||void 0===i?void 0:i.setName(e)),this._path=n,this._ycontext.set("path",this._path)}async _save(){this._saveState.emit("started");const e=this._model;let t;"json"===this._factory.fileFormat?t=e.toJSON():(t=e.toString(),this._lineEnding&&(t=t.replace(/\n/g,this._lineEnding)));const i={type:this._factory.contentType,format:this._factory.fileFormat,content:t};try{let t;if(await this._manager.ready,t=e.modelDB.isCollaborative?await this._manager.contents.save(this._path,i):await this._maybeSave(i),this.isDisposed)return;e.dirty=!1,this._updateContentsModel(t),this._isPopulated||await this._populate(),this._saveState.emit("completed")}catch(e){if("Cancel"===e.message||"Modal is already displayed"===e.message)throw e;const t=this._manager.contents.localPath(this._path),i=a.PathExt.basename(t);throw this._handleError(e,this._trans.__("File Save Error for %1",i)),this._saveState.emit("failed"),e}}_revert(e=!1){const t=Object.assign({type:this._factory.contentType,content:null!==this._factory.fileFormat},null!==this._factory.fileFormat?{format:this._factory.fileFormat}:{}),i=this._path,s=this._model;return this._manager.ready.then((()=>this._manager.contents.get(i,t))).then((t=>{if(!this.isDisposed){if("json"===t.format)s.fromJSON(t.content),e&&s.initialize();else{let i=t.content;-1!==i.indexOf("\r\n")?(this._lineEnding="\r\n",i=i.replace(/\r\n/g,"\n")):-1!==i.indexOf("\r")?(this._lineEnding="\r",i=i.replace(/\r/g,"\n")):this._lineEnding=null,s.fromString(i),e&&s.initialize()}return this._updateContentsModel(t),s.dirty=!1,this._isPopulated?void 0:this._populate()}})).catch((async e=>{const t=this._manager.contents.localPath(this._path),i=a.PathExt.basename(t);throw this._handleError(e,this._trans.__("File Load Error for %1",i)),e}))}_maybeSave(e){const t=this._path;return this._manager.contents.get(t,{content:!1}).then((i=>{var s;if(this.isDisposed)return Promise.reject(new Error("Disposed"));const n=this._lastModifiedCheckMargin,a=this._ycontext.get("last_modified")||(null===(s=this.contentsModel)||void 0===s?void 0:s.last_modified),r=a?new Date(a):new Date,o=new Date(i.last_modified);return a&&o.getTime()-r.getTime()>n?this._timeConflict(r,i,e):this._manager.contents.save(t,e)}),(i=>{if(i.response&&404===i.response.status)return this._manager.contents.save(t,e);throw i}))}async _handleError(e,t){await(0,n.showErrorMessage)(t,e)}_maybeCheckpoint(e){let t=this._contentsModel&&this._contentsModel.writable,i=Promise.resolve(void 0);return t?(i=e?this.createCheckpoint().then():this.listCheckpoints().then((e=>{if(t=this._contentsModel&&this._contentsModel.writable,!this.isDisposed&&!e.length&&t)return this.createCheckpoint().then()})),i.catch((e=>{if(!e.response||403!==e.response.status)throw e}))):i}_timeConflict(e,t,i){const s=new Date(t.last_modified);if(console.warn(`Last saving performed ${e} while the current file seems to have been saved ${s}`),this._timeConflictModalIsOpen)return Promise.reject(new Error("Modal is already displayed"));const a=this._trans.__('"%1" has changed on disk since the last time it was opened or saved.\nDo you want to overwrite the file on disk with the version open here,\nor load the version on disk (revert)?',this.path),r=n.Dialog.okButton({label:this._trans.__("Revert")}),o=n.Dialog.warnButton({label:this._trans.__("Overwrite")});return this._timeConflictModalIsOpen=!0,(0,n.showDialog)({title:this._trans.__("File Changed"),body:a,buttons:[n.Dialog.cancelButton(),r,o]}).then((e=>(this._timeConflictModalIsOpen=!1,this.isDisposed?Promise.reject(new Error("Disposed")):e.button.label===this._trans.__("Overwrite")?this._manager.contents.save(this._path,i):e.button.label===this._trans.__("Revert")?this.revert().then((()=>t)):Promise.reject(new Error("Cancel")))))}_maybeOverWrite(e){const t=this._trans.__('"%1" already exists. Do you want to replace it?',e),i=n.Dialog.warnButton({label:this._trans.__("Overwrite")});return(0,n.showDialog)({title:this._trans.__("File Overwrite?"),body:t,buttons:[n.Dialog.cancelButton(),i]}).then((t=>this.isDisposed?Promise.reject(new Error("Disposed")):t.button.label===this._trans.__("Overwrite")?this._manager.contents.delete(e).then((()=>this._finishSaveAs(e))):void 0))}async _finishSaveAs(e){var t,i;this._path=e,await(null===(t=this.sessionContext.session)||void 0===t?void 0:t.setPath(e)),await(null===(i=this.sessionContext.session)||void 0===i?void 0:i.setName(e.split("/").pop())),await this.save(),this._ycontext.set("path",this._path),await this._maybeCheckpoint(!0)}}!function(e){e.getSavePath=function(e,i){const s=(i=i||h.nullTranslator).load("jupyterlab"),a=n.Dialog.okButton({label:s.__("Save")});return(0,n.showDialog)({title:s.__("Save File As.."),body:new t(e),buttons:[n.Dialog.cancelButton(),a]}).then((e=>{var t;if(e.button.label===s.__("Save"))return null!==(t=e.value)&&void 0!==t?t:void 0}))},e.noOp=function(){};class t extends _.Widget{constructor(e){super({node:i(e)})}getValue(){return this.node.value}}function i(e){const t=document.createElement("input");return t.value=e,t}}(s||(s={}));var m=i(2771),g=i(8054),u=i(69934);class y extends m.CodeEditor.Model{constructor(e,t){super({modelDB:t}),this._defaultLang="",this._readOnly=!1,this._contentChanged=new c.Signal(this),this._stateChanged=new c.Signal(this),this._defaultLang=e||"";const i=new u.YFile;this.switchSharedModel(i,!0),this.value.changed.connect(this.triggerContentChange,this),this.sharedModel.dirty=!1,this.sharedModel.changed.connect(this._onStateChanged,this)}get contentChanged(){return this._contentChanged}get stateChanged(){return this._stateChanged}get dirty(){return this.sharedModel.dirty}set dirty(e){e!==this.dirty&&(this.sharedModel.dirty=e)}get readOnly(){return this._readOnly}set readOnly(e){if(e===this._readOnly)return;const t=this._readOnly;this._readOnly=e,this.triggerStateChange({name:"readOnly",oldValue:t,newValue:e})}get defaultKernelName(){return""}get defaultKernelLanguage(){return this._defaultLang}toString(){return this.value.text}fromString(e){this.value.text=e}toJSON(){return JSON.parse(this.value.text||"null")}fromJSON(e){this.fromString(JSON.stringify(e))}initialize(){}triggerStateChange(e){this._stateChanged.emit(e)}triggerContentChange(){this._contentChanged.emit(void 0),this.dirty=!0}_onStateChanged(e,t){t.stateChange&&t.stateChange.forEach((e=>{"dirty"===e.name&&e.oldValue===e.newValue||this.triggerStateChange(e)}))}}class f{constructor(){this._isDisposed=!1}get name(){return"text"}get contentType(){return"file"}get fileFormat(){return"text"}get isDisposed(){return this._isDisposed}dispose(){this._isDisposed=!0}createNew(e,t,i){return new y(e,t)}preferredLanguage(e){const t=g.Mode.findByFileName(e);return t&&t.mode}}class F extends f{get name(){return"base64"}get contentType(){return"file"}get fileFormat(){return"base64"}}class w{constructor(e){this._isDisposed=!1,this._widgetCreated=new c.Signal(this),this._translator=e.translator||h.nullTranslator,this._name=e.name,this._readOnly=void 0!==e.readOnly&&e.readOnly,this._defaultFor=e.defaultFor?e.defaultFor.slice():[],this._defaultRendered=(e.defaultRendered||[]).slice(),this._fileTypes=e.fileTypes.slice(),this._modelName=e.modelName||"text",this._preferKernel=!!e.preferKernel,this._canStartKernel=!!e.canStartKernel,this._shutdownOnClose=!!e.shutdownOnClose,this._toolbarFactory=e.toolbarFactory}get widgetCreated(){return this._widgetCreated}get isDisposed(){return this._isDisposed}dispose(){this.isDisposed||(this._isDisposed=!0,c.Signal.clearData(this))}get readOnly(){return this._readOnly}get name(){return this._name}get fileTypes(){return this._fileTypes.slice()}get modelName(){return this._modelName}get defaultFor(){return this._defaultFor.slice()}get defaultRendered(){return this._defaultRendered.slice()}get preferKernel(){return this._preferKernel}get canStartKernel(){return this._canStartKernel}get translator(){return this._translator}get shutdownOnClose(){return this._shutdownOnClose}set shutdownOnClose(e){this._shutdownOnClose=e}createNew(e,t){var i;const s=this.createNewWidget(e,t);return(0,n.setToolbar)(s,null!==(i=this._toolbarFactory)&&void 0!==i?i:this.defaultToolbarFactory.bind(this)),this._widgetCreated.emit(s),s}defaultToolbarFactory(e){return[]}}const v="jp-mod-dirty";class x extends n.MainAreaWidget{constructor(e){e.reveal=Promise.all([e.reveal,e.context.ready]),super(e),this.context=e.context,this.context.pathChanged.connect(this._onPathChanged,this),this._onPathChanged(this.context,this.context.path),this.context.model.stateChanged.connect(this._onModelStateChanged,this),this.context.ready.then((()=>{this._handleDirtyState()})),this.title.changed.connect(this._onTitleChanged,this)}setFragment(e){}async _onTitleChanged(e){const t=this.title.label,i=this.context.path.split("/").pop();if(t!==i){if(t.length>0&&!/[\/\\:]/.test(t)){const e=this.context.path;if(await this.context.rename(t),this.context.path!==e)return}this.title.label=i}}_onPathChanged(e,t){this.title.label=a.PathExt.basename(e.localPath)}_onModelStateChanged(e,t){"dirty"===t.name&&this._handleDirtyState()}_handleDirtyState(){this.context.model.dirty&&!this.title.className.includes(v)?this.title.className+=" jp-mod-dirty":this.title.className=this.title.className.replace(v,"")}}var T,C=i(2404);class b extends _.Widget{constructor(e){super(),this._changeCallback=e=>{if(!e.data||!e.data[this.mimeType])return;const t=e.data[this.mimeType];"string"==typeof t?t!==this._context.model.toString()&&this._context.model.fromString(t):null==t||l.JSONExt.deepEqual(t,this._context.model.toJSON())||this._context.model.fromJSON(t)},this._fragment="",this._ready=new l.PromiseDelegate,this._isRendering=!1,this._renderRequested=!1,this.addClass("jp-MimeDocument"),this.translator=e.translator||h.nullTranslator,this._trans=this.translator.load("jupyterlab"),this.mimeType=e.mimeType,this._dataType=e.dataType||"string",this._context=e.context,this.renderer=e.renderer,(this.layout=new _.StackedLayout).addWidget(this.renderer),this._context.ready.then((()=>this._render())).then((()=>{this.node===document.activeElement&&C.MessageLoop.sendMessage(this.renderer,_.Widget.Msg.ActivateRequest),this._monitor=new a.ActivityMonitor({signal:this._context.model.contentChanged,timeout:e.renderTimeout}),this._monitor.activityStopped.connect(this.update,this),this._ready.resolve(void 0)})).catch((e=>{requestAnimationFrame((()=>{this.dispose()})),(0,n.showErrorMessage)(this._trans.__("Renderer Failure: %1",this._context.path),e)}))}[n.Printing.symbol](){return n.Printing.getPrintFunction(this.renderer)}get ready(){return this._ready.promise}setFragment(e){this._fragment=e,this.update()}dispose(){this.isDisposed||(this._monitor&&this._monitor.dispose(),this._monitor=null,super.dispose())}onUpdateRequest(e){this._context.isReady&&(this._render(),this._fragment="")}async _render(){if(this.isDisposed)return;if(this._isRendering)return void(this._renderRequested=!0);this._renderRequested=!1;const e=this._context,t=e.model,i={};"string"===this._dataType?i[this.mimeType]=t.toString():i[this.mimeType]=t.toJSON();const s=new o.MimeModel({data:i,callback:this._changeCallback,metadata:{fragment:this._fragment}});try{if(this._isRendering=!0,await this.renderer.renderModel(s),this._isRendering=!1,this._renderRequested)return this._render()}catch(t){requestAnimationFrame((()=>{this.dispose()})),(0,n.showErrorMessage)(this._trans.__("Renderer Failure: %1",e.path),t)}}}class D extends x{setFragment(e){this.content.setFragment(e)}}class O extends w{constructor(e){super(T.createRegistryOptions(e)),this._rendermime=e.rendermime,this._renderTimeout=e.renderTimeout||1e3,this._dataType=e.dataType||"string",this._fileType=e.primaryFileType,this._factory=e.factory}createNewWidget(e){var t,i;const s=this._fileType,n=(null==s?void 0:s.mimeTypes.length)?s.mimeTypes[0]:"text/plain",a=this._rendermime.clone({resolver:e.urlResolver});let r;r=this._factory&&this._factory.mimeTypes.includes(n)?this._factory.createRenderer({mimeType:n,resolver:a.resolver,sanitizer:a.sanitizer,linkHandler:a.linkHandler,latexTypesetter:a.latexTypesetter}):a.createRenderer(n);const o=new b({context:e,renderer:r,mimeType:n,renderTimeout:this._renderTimeout,dataType:this._dataType});return o.title.icon=null==s?void 0:s.icon,o.title.iconClass=null!==(t=null==s?void 0:s.iconClass)&&void 0!==t?t:"",o.title.iconLabel=null!==(i=null==s?void 0:s.iconLabel)&&void 0!==i?i:"",new D({content:o,context:e})}}!function(e){e.createRegistryOptions=function(e){return Object.assign(Object.assign({},e),{readOnly:!0})}}(T||(T={}));var M,S=i(49140),k=i(81734);class P{constructor(e={}){this._modelFactories=Object.create(null),this._widgetFactories=Object.create(null),this._defaultWidgetFactory="",this._defaultWidgetFactoryOverrides=Object.create(null),this._defaultWidgetFactories=Object.create(null),this._defaultRenderedWidgetFactories=Object.create(null),this._widgetFactoriesForFileType=Object.create(null),this._fileTypes=[],this._extenders=Object.create(null),this._changed=new c.Signal(this),this._isDisposed=!1;const t=e.textModelFactory;if(this.translator=e.translator||h.nullTranslator,t&&"text"!==t.name)throw new Error("Text model factory must have the name `text`");this._modelFactories.text=t||new f,(e.initialFileTypes||P.getDefaultFileTypes(this.translator)).forEach((e=>{const t=Object.assign(Object.assign({},P.getFileTypeDefaults(this.translator)),e);this._fileTypes.push(t)}))}get changed(){return this._changed}get isDisposed(){return this._isDisposed}dispose(){if(!this.isDisposed){this._isDisposed=!0;for(const e in this._modelFactories)this._modelFactories[e].dispose();for(const e in this._widgetFactories)this._widgetFactories[e].dispose();for(const e in this._extenders)this._extenders[e].length=0;this._fileTypes.length=0,c.Signal.clearData(this)}}addWidgetFactory(e){const t=e.name.toLowerCase();if(!t||"default"===t)throw Error("Invalid factory name");if(this._widgetFactories[t])return console.warn(`Duplicate registered factory ${t}`),new d.DisposableDelegate(M.noOp);this._widgetFactories[t]=e;for(const i of e.defaultFor||[])-1!==e.fileTypes.indexOf(i)&&("*"===i?this._defaultWidgetFactory=t:this._defaultWidgetFactories[i]=t);for(const i of e.defaultRendered||[])-1!==e.fileTypes.indexOf(i)&&(this._defaultRenderedWidgetFactories[i]=t);for(const i of e.fileTypes)this._widgetFactoriesForFileType[i]||(this._widgetFactoriesForFileType[i]=[]),this._widgetFactoriesForFileType[i].push(t);return this._changed.emit({type:"widgetFactory",name:t,change:"added"}),new d.DisposableDelegate((()=>{delete this._widgetFactories[t],this._defaultWidgetFactory===t&&(this._defaultWidgetFactory="");for(const e of Object.keys(this._defaultWidgetFactories))this._defaultWidgetFactories[e]===t&&delete this._defaultWidgetFactories[e];for(const e of Object.keys(this._defaultRenderedWidgetFactories))this._defaultRenderedWidgetFactories[e]===t&&delete this._defaultRenderedWidgetFactories[e];for(const e of Object.keys(this._widgetFactoriesForFileType))k.ArrayExt.removeFirstOf(this._widgetFactoriesForFileType[e],t),0===this._widgetFactoriesForFileType[e].length&&delete this._widgetFactoriesForFileType[e];for(const e of Object.keys(this._defaultWidgetFactoryOverrides))this._defaultWidgetFactoryOverrides[e]===t&&delete this._defaultWidgetFactoryOverrides[e];this._changed.emit({type:"widgetFactory",name:t,change:"removed"})}))}addModelFactory(e){const t=e.name.toLowerCase();return this._modelFactories[t]?(console.warn(`Duplicate registered factory ${t}`),new d.DisposableDelegate(M.noOp)):(this._modelFactories[t]=e,this._changed.emit({type:"modelFactory",name:t,change:"added"}),new d.DisposableDelegate((()=>{delete this._modelFactories[t],this._changed.emit({type:"modelFactory",name:t,change:"removed"})})))}addWidgetExtension(e,t){(e=e.toLowerCase())in this._extenders||(this._extenders[e]=[]);const i=this._extenders[e];return-1!==k.ArrayExt.firstIndexOf(i,t)?(console.warn(`Duplicate registered extension for ${e}`),new d.DisposableDelegate(M.noOp)):(this._extenders[e].push(t),this._changed.emit({type:"widgetExtension",name:e,change:"added"}),new d.DisposableDelegate((()=>{k.ArrayExt.removeFirstOf(this._extenders[e],t),this._changed.emit({type:"widgetExtension",name:e,change:"removed"})})))}addFileType(e,t){const i=Object.assign(Object.assign(Object.assign({},P.getFileTypeDefaults(this.translator)),e),!(e.icon||e.iconClass)&&{icon:S.fileIcon});if(this._fileTypes.push(i),t){const e=i.name.toLowerCase();t.map((e=>e.toLowerCase())).forEach((t=>{this._widgetFactoriesForFileType[e]||(this._widgetFactoriesForFileType[e]=[]),this._widgetFactoriesForFileType[e].includes(t)||this._widgetFactoriesForFileType[e].push(t)})),this._defaultWidgetFactories[e]||(this._defaultWidgetFactories[e]=this._widgetFactoriesForFileType[e][0])}return this._changed.emit({type:"fileType",name:i.name,change:"added"}),new d.DisposableDelegate((()=>{if(k.ArrayExt.removeFirstOf(this._fileTypes,i),t){const e=i.name.toLowerCase();for(const i of t.map((e=>e.toLowerCase())))k.ArrayExt.removeFirstOf(this._widgetFactoriesForFileType[e],i);this._defaultWidgetFactories[e]===t[0].toLowerCase()&&delete this._defaultWidgetFactories[e]}this._changed.emit({type:"fileType",name:e.name,change:"removed"})}))}preferredWidgetFactories(e){const t=new Set,i=this.getFileTypesForPath(a.PathExt.basename(e));i.forEach((e=>{e.name in this._defaultWidgetFactoryOverrides&&t.add(this._defaultWidgetFactoryOverrides[e.name])})),i.forEach((e=>{e.name in this._defaultWidgetFactories&&t.add(this._defaultWidgetFactories[e.name])})),i.forEach((e=>{e.name in this._defaultRenderedWidgetFactories&&t.add(this._defaultRenderedWidgetFactories[e.name])})),this._defaultWidgetFactory&&t.add(this._defaultWidgetFactory),i.forEach((e=>{e.name in this._widgetFactoriesForFileType&&(0,k.each)(this._widgetFactoriesForFileType[e.name],(e=>{t.add(e)}))})),"*"in this._widgetFactoriesForFileType&&(0,k.each)(this._widgetFactoriesForFileType["*"],(e=>{t.add(e)}));const s=[];return t.forEach((e=>{const t=this._widgetFactories[e];t&&(t.modelName||"text")in this._modelFactories&&s.push(t)})),s}defaultRenderedWidgetFactory(e){const t=this.getFileTypesForPath(a.PathExt.basename(e));let i;for(const e of t)if(e.name in this._defaultRenderedWidgetFactories){i=this._widgetFactories[this._defaultRenderedWidgetFactories[e.name]];break}return i||this.defaultWidgetFactory(e)}defaultWidgetFactory(e){return e?this.preferredWidgetFactories(e)[0]:this._widgetFactories[this._defaultWidgetFactory]}setDefaultWidgetFactory(e,t){if(e=e.toLowerCase(),!this.getFileType(e))throw Error(`Cannot find file type ${e}`);if(!t)return void(this._defaultWidgetFactoryOverrides[e]&&delete this._defaultWidgetFactoryOverrides[e]);if(!this.getWidgetFactory(t))throw Error(`Cannot find widget factory ${t}`);t=t.toLowerCase();const i=this._widgetFactoriesForFileType[e];if(!(t===this._defaultWidgetFactory||i&&i.includes(t)))throw Error(`Factory ${t} cannot view file type ${e}`);this._defaultWidgetFactoryOverrides[e]=t}widgetFactories(){return(0,k.map)(Object.keys(this._widgetFactories),(e=>this._widgetFactories[e]))}modelFactories(){return(0,k.map)(Object.keys(this._modelFactories),(e=>this._modelFactories[e]))}widgetExtensions(e){return(e=e.toLowerCase())in this._extenders?new k.ArrayIterator(this._extenders[e]):(0,k.empty)()}fileTypes(){return new k.ArrayIterator(this._fileTypes)}getWidgetFactory(e){return this._widgetFactories[e.toLowerCase()]}getModelFactory(e){return this._modelFactories[e.toLowerCase()]}getFileType(e){return e=e.toLowerCase(),(0,k.find)(this._fileTypes,(t=>t.name.toLowerCase()===e))}getKernelPreference(e,t,i){t=t.toLowerCase();const s=this._widgetFactories[t];if(!s)return;const n=this.getModelFactory(s.modelName||"text");if(!n)return;const r=n.preferredLanguage(a.PathExt.basename(e)),o=i&&i.name;return{id:i&&i.id,name:o,language:r,shouldStart:s.preferKernel,canStart:s.canStartKernel,shutdownOnDispose:s.shutdownOnClose}}getFileTypeForModel(e){switch(e.type){case"directory":return(0,k.find)(this._fileTypes,(e=>"directory"===e.contentType))||P.getDefaultDirectoryFileType(this.translator);case"notebook":return(0,k.find)(this._fileTypes,(e=>"notebook"===e.contentType))||P.getDefaultNotebookFileType(this.translator);default:if(e.name||e.path){const t=e.name||a.PathExt.basename(e.path),i=this.getFileTypesForPath(t);if(i.length>0)return i[0]}return this.getFileType("text")||P.getDefaultTextFileType(this.translator)}}getFileTypesForPath(e){const t=[],i=a.PathExt.basename(e);let s=(0,k.find)(this._fileTypes,(e=>!(!e.pattern||null===i.match(e.pattern))));s&&t.push(s);let n=M.extname(i);for(;n.length>1;){const e=this._fileTypes.filter((e=>e.extensions.map((e=>e.toLowerCase())).includes(n)));t.push(...e),n="."+n.split(".").slice(2).join(".")}return t}}!function(e){function t(e){return{name:"default",displayName:(null==(e=e||h.nullTranslator)?void 0:e.load("jupyterlab")).__("default"),extensions:[],mimeTypes:[],contentType:"file",fileFormat:"text"}}function i(e){const i=null==(e=e||h.nullTranslator)?void 0:e.load("jupyterlab"),s=t(e);return Object.assign(Object.assign({},s),{name:"text",displayName:i.__("Text"),mimeTypes:["text/plain"],extensions:[".txt"],icon:S.fileIcon})}function s(e){const i=null==(e=e||h.nullTranslator)?void 0:e.load("jupyterlab");return Object.assign(Object.assign({},t(e)),{name:"notebook",displayName:i.__("Notebook"),mimeTypes:["application/x-ipynb+json"],extensions:[".ipynb"],contentType:"notebook",fileFormat:"json",icon:S.notebookIcon})}function n(e){const i=null==(e=e||h.nullTranslator)?void 0:e.load("jupyterlab");return Object.assign(Object.assign({},t(e)),{name:"directory",displayName:i.__("Directory"),extensions:[],mimeTypes:["text/directory"],contentType:"directory",icon:S.folderIcon})}e.getFileTypeDefaults=t,e.getDefaultTextFileType=i,e.getDefaultNotebookFileType=s,e.getDefaultDirectoryFileType=n,e.getDefaultFileTypes=function(e){const t=null==(e=e||h.nullTranslator)?void 0:e.load("jupyterlab");return[i(e),s(e),n(e),{name:"markdown",displayName:t.__("Markdown File"),extensions:[".md"],mimeTypes:["text/markdown"],icon:S.markdownIcon},{name:"PDF",displayName:t.__("PDF File"),extensions:[".pdf"],mimeTypes:["application/pdf"],icon:S.pdfIcon},{name:"python",displayName:t.__("Python File"),extensions:[".py"],mimeTypes:["text/x-python"],icon:S.pythonIcon},{name:"json",displayName:t.__("JSON File"),extensions:[".json"],mimeTypes:["application/json"],icon:S.jsonIcon},{name:"julia",displayName:t.__("Julia File"),extensions:[".jl"],mimeTypes:["text/x-julia"],icon:S.juliaIcon},{name:"csv",displayName:t.__("CSV File"),extensions:[".csv"],mimeTypes:["text/csv"],icon:S.spreadsheetIcon},{name:"tsv",displayName:t.__("TSV File"),extensions:[".tsv"],mimeTypes:["text/csv"],icon:S.spreadsheetIcon},{name:"r",displayName:t.__("R File"),mimeTypes:["text/x-rsrc"],extensions:[".R"],icon:S.rKernelIcon},{name:"yaml",displayName:t.__("YAML File"),mimeTypes:["text/x-yaml","text/yaml"],extensions:[".yaml",".yml"],icon:S.yamlIcon},{name:"svg",displayName:t.__("Image"),mimeTypes:["image/svg+xml"],extensions:[".svg"],icon:S.imageIcon,fileFormat:"base64"},{name:"tiff",displayName:t.__("Image"),mimeTypes:["image/tiff"],extensions:[".tif",".tiff"],icon:S.imageIcon,fileFormat:"base64"},{name:"jpeg",displayName:t.__("Image"),mimeTypes:["image/jpeg"],extensions:[".jpg",".jpeg"],icon:S.imageIcon,fileFormat:"base64"},{name:"gif",displayName:t.__("Image"),mimeTypes:["image/gif"],extensions:[".gif"],icon:S.imageIcon,fileFormat:"base64"},{name:"png",displayName:t.__("Image"),mimeTypes:["image/png"],extensions:[".png"],icon:S.imageIcon,fileFormat:"base64"},{name:"bmp",displayName:t.__("Image"),mimeTypes:["image/bmp"],extensions:[".bmp"],icon:S.imageIcon,fileFormat:"base64"},{name:"webp",displayName:t.__("Image"),mimeTypes:["image/webp"],extensions:[".webp"],icon:S.imageIcon,fileFormat:"base64"}]}}(P||(P={})),function(e){e.extname=function(e){const t=a.PathExt.basename(e).split(".");return t.shift(),("."+t.join(".")).toLowerCase()},e.noOp=function(){}}(M||(M={}))}}]);
//# sourceMappingURL=9609.44e1b0e.js.map