function fatalError(a,b){$("#fatal-error").find(".message").text(a),b&&$("#fatal-error").find(".title").text(b),$("#fatal-error").show()}function hideFatalError(){$("#fatal-error").fadeOut()}!function(a){"use strict";a.pmw=a.pmw||{},a.pmw.mconfig={name:"pmw",serverUrl:"",maxImageWidth:2048,maxImageHeight:2048,routes:{"":"postController"}}}(this);var fakeLocalStorage=function(){var a,b={};window.Storage&&window.localStorage?a=window.Storage.prototype:(window.localStorage={},a=window.localStorage),window.location.origin||(window.location.origin=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:""));var c=function(b,c){var d=null==b?null:a.getItem(b),e=location.href.substr(location.origin.length),f=document.createEvent("StorageEvent");f.initStorageEvent("storage",!1,!1,b,d,c,e,null),window.dispatchEvent(f)};a.key=function(a){var c=Object.keys(b)[a];return"string"==typeof c?c:null},a.getItem=function(a){return"string"==typeof b[a]?b[a]:null},a.setItem=function(a,d){c(a,d),b[a]=String(d)},a.removeItem=function(a){c(a,null),delete b[a]},a.clear=function(){c(null,null),b={}}};if("object"==typeof window.localStorage)try{localStorage.setItem("localStorageTest",1),localStorage.removeItem("localStorageTest")}catch(e){fakeLocalStorage()}else fakeLocalStorage();var backRoute;!function(a){"use strict";a.pmw=M.Application.extend().create(a.pmw.mconfig),$(document).ready(function(){function b(){$.get(pmw.options.serverUrl+"/webapp/"+c.event,{getEventInfo:!0},function(c){var d=moment(c.dateStart),e=moment(c.dateEnd);return moment().isBefore(d)?(fatalError("Cet événement n'a pas encore commencé: vous ne pouvez pas encore mettre de message sur ce mur.","Désolé."),void(this.refreshInterval||(this.refreshInterval=setInterval(b.bind(this),5e3)))):moment().isAfter(e)?void fatalError("Cet événement est terminé: vous ne pouvez plus mettre de message sur ce mur.","Désolé."):(this.refreshInterval&&(clearInterval(this.refreshInterval),hideFatalError()),this.styler=new a.pmw.Modules.Styler(c),a.pmw.eventInfo=c,$("#loading-splash-screen").hide(),void $("#main").show())}.bind(this)).fail(function(){fatalError("Le lien que vous avez suivi n'est pas valable. Veuillez contacter l'organisateur.")})}a.pmw.selectedWindowGroup=a.pmw.options.defaultWindowGroup,a.pmw.selectedGalImage=null,a.pmw.start({routing:{routes:a.pmw.options.routes,postController:a.pmw.Controllers.PostController.create()}});var c=querystring.parse(document.location.search.substring(1));return c.event?(a.pmw.options.eventId=c.event,void b.call(this)):void fatalError("Le lien que vous avez suivi n'est pas valable. Veuillez contacter l'organisateur.")})}(this),this.JST=this.JST||{},pmw.Views=pmw.Views||{},function(){"use strict";pmw.Views.BackheaderView=M.ToolbarView.extend({scopeKey:"pageHeadline"},{first:M.ButtonView.extend({icon:"icon-angle-left",events:{tap:function(){pmw.navigate({route:backRoute,transition:M.PageTransitions.CONST.MOVE_TO_RIGHT_FROM_LEFT})}}})})}(),pmw.Views=pmw.Views||{},function(){"use strict";pmw.Views.PostView=M.View.extend({cssClass:"page-post",template:'<div id="fb-root"></div>'},{area:M.View.extend({cssClass:"post-block container-fluid"},{helpText:M.TextView.extend({value:'Publiez instantanément un message sur le mur.<span class="moderation-active"> Nos modérateurs devront le valider.</span>'}),username:M.TextfieldView.extend({label:"Votre nom:",type:"text",required:!0,id:"username",cssClass:"required",regexp:/(.{2,})/,events:{keyup:"checkField"}}),company:M.TextfieldView.extend({label:"Entreprise:",type:"text",regexp:/(.+)/,required:!1,id:"company"}),text:M.TextareaView.extend({label:"Message:",cssClass:"text-box",id:"text",cssClass:"required",regexp:/(.{2,})/,events:{keyup:"checkField"}}),imagePreview:M.View.extend({useElement:YES,template:'<div class="image-preview"><button class="btn btn-md btn-inverse" id="remove-photo">X</button></div>'}),imageUpload:M.ButtonView.extend({icon:"icon-camera",cssClass:"add-image",value:"Ajouter une photo"}),submit:M.ButtonView.extend({value:"Envoyer",events:{tap:"sendPost"}}),scratchCanvas:M.View.extend({useElement:YES,template:'<canvas id="scratch-canvas"></canvas>'})}),modalContainer:M.View.extend({cssClass:"modal-alert-container"},{modalWindow:M.View.extend({cssClass:"modal-alert-window"},{text:M.View.extend({cssClass:"modal-alert-text"}),okButton:M.ButtonView.extend({value:"OK",cssClass:"ok-button",events:{tap:"closeModalAlert"}})})})})}(),pmw.Controllers=pmw.Controllers||{},function(){"use strict";pmw.Controllers.AbstractController=M.Controller.extend({headerView:null,contentView:null,menuView:null,pageHeadline:"",applicationStart:function(a){var b=M.SwitchHeaderContentLayout.extend({}).create(this,null,!0);pmw.setLayout(b),this._initViews(a)},show:function(a){this._initViews(a);var b=M.SwitchHeaderContentLayout.extend({}).create(this,null,!0);b._type===pmw.getLayout()._type?pmw.getLayout().startTransition():this.applicationStart()},applicationReady:function(){},_applyViews:function(){pmw.getLayout().applyViews({header:this.headerView,content:this.contentView})},_initViews:function(){}})}(),pmw.Controllers=pmw.Controllers||{},function(a){"use strict";function b(a,b){function c(a){var b=(a.naturalWidth,a.naturalHeight),c=document.createElement("canvas");c.width=1,c.height=b;var d=c.getContext("2d");d.drawImage(a,0,0);for(var e=d.getImageData(0,0,1,b).data,f=0,g=b,h=b;h>f;){var i=e[4*(h-1)+3];0===i?g=h:f=h,h=g+f>>1}var j=h/b;return 0===j?1:j}var d=c(b),e=arguments.length;switch(e){case 4:a.drawImage(b,arguments[2],arguments[3]/d);break;case 6:a.drawImage(b,arguments[2],arguments[3],arguments[4],arguments[5]/d);break;case 8:a.drawImage(b,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]/d);break;case 10:a.drawImage(b,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9]/d)}}var c=null,d=!1,e=null,f=function(){var a=new MobileDetect(window.navigator.userAgent);return a.os()},g=function(a,b,c){b?$(".ok-button").hide():$(".ok-button").show(),$(".modal-alert-text").html(a),$(".modal-alert-container").addClass("shown"),c?$(".ok-button .button").bind("tap",function(){c(),$(".ok-button .button").unbind("tap")}):($(".ok-button .button").unbind("tap"),$(".ok-button .button").bind("tap",function(){$(".modal-alert-container").removeClass("shown")}))};pmw.Controllers.PostController=pmw.Controllers.AbstractController.extend({tmpViews:null,_initViews:function(){this.contentView||(this.contentView=pmw.Views.PostView.create(this,null,!0)),this.headerView||(this.headerView=M.ToolbarView.extend({grid:"col-md-12",value:"Chargement..."}).create()),this._applyViews(),e=$("#scratch-canvas").get()[0].getContext("2d"),e.canvas.width=pmw.options.maxImageWidth,e.canvas.height=pmw.options.maxImageHeight,$(".post-block").show(),$(".page-post .add-image").prepend('<input type="file" accept="image/*" id="add-image-field">'),$("#add-image-field").on("change",this.uploadImage.bind(this)),$("#remove-photo").on("click tap",this.removePreviewImage.bind(this)),this.checkAllFields()},sendPost:function(){if(!this.checkAllFields())return!1;var b={username:this.contentView.childViews.area.childViews.username.getValue(),text:this.contentView.childViews.area.childViews.text.getValue()},d=this.contentView.childViews.area.childViews.company.getValue();0!==d.length&&(b.company=d),this.image&&(b.media={type:"image",url:this.image}),$.post(a.pmw.options.serverUrl+"/webapp/"+a.pmw.options.eventId,b,function(){c.hide(),g('Merci!<br>Votre message <span class="moderation-active">sera</span><span class="moderation-inactive">est</span> visible sur le mur<span class="moderation-active">  dès que notre équipe l\'aura validé</span>.'),$("input, textarea").val(""),this.removePreviewImage(),a.pmw.eventInfo.displayParameters.showWallOnWebappPost&&(window.location=a.pmw.options.serverUrl+"/wall/wall.html?host=localhost&port=8000&event="+a.pmw.options.eventId+"&iframe=1")}.bind(this)).fail(function(a){return c&&c.hide(),a.responseText?void alert(a.responseText):void alert("Une erreur s'est produite (connexion au serveur impossible), mais ce n'est pas de votre faute! Merci d'essayer plus tard.")}),c=M.LoaderView.create().render().show()},checkAllFields:function(){var a=!0;return a&=this.internalCheckField(this.contentView.childViews.area.childViews.username),a&=this.internalCheckField(this.contentView.childViews.area.childViews.text),a?(this.contentView.childViews.area.childViews.submit.enable(),!0):(this.contentView.childViews.area.childViews.submit.disable(),!1)},checkField:function(a,b){13==a.which&&(0!=b.$el.next().find("input").length?b.$el.next().find("input").focus():(b.$el.find("input").blur(),console.log("blur "+b.$el.find("input")))),b.usedOnce=!0,this.checkAllFields()},internalCheckField:function(a){return a.getValue().trim().match(a.regexp)?(a.$el.removeClass("wrong"),!0):(a.usedOnce&&a.$el.addClass("wrong"),!1)},uploadImageDone:function(a,g,h){console.log("Read photo");var i=new Image;i.onload=function(){null!=c&&c.hide(),h||EXIF.getData(i,function(){var a=e.canvas.width,b=e.canvas.height,c=EXIF.getTag(i,"Orientation");if(navigator.userAgent.match(/Windows Phone/i))switch(c){case 2:e.translate(a,0),e.scale(-1,1);break;case 3:e.translate(a,b),e.rotate(Math.PI);break;case 4:e.translate(0,b),e.scale(1,-1);break;case 5:e.rotate(-.5*Math.PI),e.scale(1,-1);break;case 6:e.rotate(-.5*Math.PI),e.translate(0,-b);break;case 7:e.rotate(-.5*Math.PI),e.translate(a,-b),e.scale(-1,1);break;case 8:e.rotate(.5*Math.PI),e.translate(-a,0)}else switch(c){case 2:e.translate(a,0),e.scale(-1,1);break;case 3:e.translate(a,b),e.rotate(Math.PI);break;case 4:e.translate(0,b),e.scale(1,-1);break;case 5:e.rotate(.5*Math.PI),e.scale(1,-1);break;case 6:e.rotate(.5*Math.PI),e.translate(0,-b);break;case 7:e.rotate(.5*Math.PI),e.translate(a,-b),e.scale(-1,1);break;case 8:e.rotate(-.5*Math.PI),e.translate(-a,0)}});var g=i.width,j=i.height,k=g/j,l=0,m=0,n=i.width,o=i.height;g>e.canvas.width&&(g=e.canvas.width,j=g/k),j>e.canvas.height&&(j=e.canvas.height,g=j*k),console.log("w = "+g+" h = "+j),e.canvas.width=g,e.canvas.height=j;var p=f();return"iOS"==p?(console.log("ios drawimage"),b(e,this,l,m,n,o,0,0,e.canvas.width,e.canvas.height)):(console.log("other drawimage"),e.drawImage(this,l,m,n,o,0,0,e.canvas.width,e.canvas.height)),console.log("imageUploaded = "+d),d?void this.showPreviewImage():void a.sendImage()},i.src=this.result},abort:function(){alert("Opération annulée.")},error:function(a){null!=c&&c.hide(),alert("Il y a eu une erreur, merci d'essayer plus tard. Erreur: "+a)},uploadImage:function(b){console.log("e");var e=b.target;if(!e.files||0==e.files.length)return void alert("Vous devez choisir ou prendre une photo!");var f=new FormData,g=this;c=M.LoaderView.create().render().show(),this.bindForceClose(),f.append("image",e.files[0]),$.ajax({url:a.pmw.options.serverUrl+"/webapp/"+a.pmw.options.eventId,type:"post",data:f,processData:!1,contentType:!1}).done(function(a){a.error&&alert(a.error),c.hide(),d=!0,g.image=a.url,g.showPreviewImage(),c.hide(!0)}).fail(function(a){return console.log(a),c&&c.hide(),a.responseText?void alert(a.responseText):void alert("Une erreur s'est produite (connexion au serveur impossible), mais ce n'est pas de votre faute! Merci d'essayer plus tard.")})},sendImage:function(){var b=this;if(!d){var f=e.canvas.toDataURL("image/jpeg",1),g="jpeg";-1!=f.substring(0,30).indexOf("image/png")&&(g="png"),c=M.LoaderView.create().render().show(),this.bindForceClose(),$.post(a.pmw.options.serverUrl+"/webapp/"+a.pmw.options.eventId,{base64Image:f,imageFormat:g},function(a){return null!=c&&c.hide(),a.error?void alert(a.error):(b.image=a.url,void b.showPreviewImage())}).fail(function(){null!=c&&c.hide(),alert("Une erreur s'est produite ... mais ce n'est pas de votre faute! Veuillez ressayer plus tard.")})}},showPreviewImage:function(){console.log("HEE"),console.log("this.image = "+a.pmw.options.serverUrl+this.image),$(".page-post .image-preview").css("backgroundImage","url('"+a.pmw.options.serverUrl+this.image+"')"),$(".page-post .image-preview").slideDown(300),$('.page-post .add-image .button [data-binding="value"]').text("Changer la photo")},removePreviewImage:function(){$(".page-post .image-preview").slideUp(300),$('.page-post .add-image .button [data-binding="value"]').text("Ajouter une photo"),this.image=null,d=!1},bindForceClose:function(){$(".loaderview .view").on("tap mousedown",function(){return null==loaderTouchStart?(loaderTouchStart=(new Date).getTime(),!1):(new Date).getTime()-loaderTouchStart>loaderOffTime?void(loaderTouchStart=null):(console.log("remove"),void this.forceCloseLoader())}.bind(this))},forceCloseLoader:function(){console.log(c),null!=c&&c.hide()},closeModalAlert:function(){$(".modal-alert-container").removeClass("shown")}})}(this),pmw.Modules=pmw.Modules||{},function(a){"use strict";var b=function(a){this.setDisplayParameters(a),console.log(a),$(".toolbarview .center").text(a.name),document.title=a.name};b.prototype.setDisplayParameters=function(a){var b={moderateNewContent:[{elem:".moderation-active",prop:"display",trans:function(a){return a?"initial":"none"}},{elem:"moderation-inactive",prop:"display",trans:function(a){return a?"none":"initial"}}],displayParameters:{logo:[{elem:".header .toolbarview .center:before",prop:"backgroundImage",trans:function(a){return'url("'+pmw.options.serverUrl+a+'")'}}],backgroundImage:[{elem:"body",prop:"backgroundImage",trans:function(a){return'url("'+pmw.options.serverUrl+a+'")'}}],askCompany:[{elem:"#company",prop:"display",trans:function(a){return a?"block":"none"}}],colors:{text:[{elem:"body, .textview",prop:"color"}],background:[{elem:".item header .source",prop:"color"},{elem:"#selected",prop:"backgroundColor"},{elem:".item .pinned",prop:"color"},{elem:".item header .author .author_photo",prop:"color"},{elem:"body",prop:"backgroundColor"},{elem:".button, .buttonview.active .button, .btn-inverse, .buttonview.disabled .button",prop:"backgroundColor"},{elem:".button, .buttonview.disabled .button",prop:"borderColor"}],border:[{elem:".item .content-inner",prop:"borderColor"}],content:[{elem:".post-block, .view .modal-alert-window",prop:"backgroundColor"},{elem:".button, .buttonview.active .button, .btn-inverse, .buttonview.disabled .button",prop:"color"}],titleBackground:[{elem:".header, .toolbarview",prop:"backgroundColor"}],titleText:[{elem:".toolbarview .center",prop:"color"}]}}},c=function(a,d){for(var e in d)if("object"==typeof d[e]&&null!==d[e])c(a.concat([e]),d[e]);else{console.log(e);for(var f=b,g=d[e],h=0;h<a.length;h++)f=f[a[h]];var i=f[e];for(var e in i){var j=g;if(i[e].hasOwnProperty("trans")&&(j=i[e].trans(g)),i[e].hasOwnProperty("prop")){var k={};k[i[e].prop]=j,jss.set(i[e].elem,k)}}}};jss.remove(),c([],a)},a.pmw.Modules.Styler=b}(this);