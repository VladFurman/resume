var eppscMyLinks = {


init : function () {

 
 eppscMyLinks.refreshCookieName = "refreshmysc"; eppscMyLinks.processingClassName = "ptnav2loading"; eppscMyLinks.TYPE_DROPDOWN = "DD";  eppscMyLinks.TargetFrame = top.frames["TargetContent"]; eppscMyLinks.Container = document.getElementById("eppsc_container"); eppscMyLinks.DropDown = document.getElementById("eppsc_dropdown");  eppscMyLinks.isTopFrame = (top.location == document.location); eppscMyLinks.type = ((eppscMyLinks.DropDown) ? eppscMyLinks.TYPE_DROPDOWN : "");  eppscMyLinks.baseUri = String(location).match(/\/ps(c|p)\/?([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0].replace('\/psp\/','\/psc\/'); eppscMyLinks.serviceUri = eppscMyLinks.baseUri + "s/WEBLIB_EPPSC.ISCRIPT1.FieldFormula.IScript_MyLinks?type=" + eppscMyLinks.type;  if (eppscMyLinks.getCookie(eppscMyLinks.refreshCookieName) == "true") {
 eppscMyLinks.setCookie(eppscMyLinks.refreshCookieName, "false", "", "/"); eppscMyLinks.reloadLinks(); }

}, 




setCookie : function (name, value, expires, path, domain, secure) {

 document.cookie = name + "=" + escape (value) +
 ((expires) ? "; expires=" + expires.toGMTString() : "") +
 ((path) ? "; path=" + path : "") +
 ((domain) ? "; domain=" + domain : "") +
 ((secure) ? "; secure" : "");}, 




getCookieVal : function (offset) {

 var endstr = document.cookie.indexOf (";", offset); if (endstr == -1) {
 endstr = document.cookie.length; }
 return unescape(document.cookie.substring(offset, endstr));}, 




getCookie : function (name) {

 var arg = name + "="; var alen = arg.length; var clen = document.cookie.length; var i = 0; while (i < clen) {
 var j = i + alen; if (document.cookie.substring(i, j) == arg) {
 return this.getCookieVal (j); }
 i = document.cookie.indexOf(" ", i) + 1; if (i == 0) break;  }
 return null;}, 




getCurrUrl : function () {

 var currUrlValue = ""; var idPrefix = ""; var selectedItem = null; if (this.TargetFrame) {
 
 if (!isCrossDomain(this.TargetFrame) && this.TargetFrame.strCurrUrl) {
 
 currUrlValue = this.TargetFrame.strCurrUrl; } else if (typeof ptNav2Info != 'undefined') {

 
 if (typeof ptNav2 != 'undefined') {
 idPrefix = ptNav2.crefLiIdPrefix; } else if (typeof pthNav != 'undefined') {
 idPrefix = pthNav.crefLiIdPrefix; }

 
 if (ptNav2Info.selectedId.indexOf(idPrefix) > -1) {
 selectedItem = ptUtil.id(ptNav2Info.selectedId); if (!selectedItem && (typeof pthNav != 'undefined')) {
 selectedItem = ptUtil.id(pthNav.bcCrefPrefix + pthNav.getPortalObjName(ptNav2Info.selectedId)); }

 if (selectedItem) {
 currUrlValue = selectedItem.firstChild.href; }
 }
 }

 } else if (this.isTopFrame) {
 
 currUrlValue = String(top.location); }

 return currUrlValue;}, 




removeNavCollPara : function (url) {

 var newUrl = url; var endpos = newUrl.indexOf("&ptpp.SCNode"); if (endpos > 0) {
 newUrl = newUrl.substring(0,endpos); }
 endpos = newUrl.indexOf("&EOPP.SCNode"); if (endpos > 0) {
 newUrl = newUrl.substring(0,endpos); }

 return newUrl;}, 




closePopup : function (url) {
 ptCommonObj.endModalCntrl();}, 



addLink : function () {

 var myscForm = document.forms["AddShortcut"]; if (myscForm.HomepageTab.value == "") {
 if (this.TargetFrame != null) {
 
 myscForm.Title.value = (!isCrossDomain(this.TargetFrame)) ? this.TargetFrame.document.title : top.document.title; myscForm.isFramed.value = "true"; } else {
 
 myscForm.Title.value = top.document.title; myscForm.isFramed.value = "false"; }
 } else {
 
 myscForm.TargetURL.value = String(top.location); myscForm.Title.value = document.title; myscForm.isFramed.value = "false"; }

 
 var url = this.getCurrUrl();  url = ((url != "") ? url : String(top.location)); myscForm.OriginatingURL.value = this.removeNavCollPara(url);  var re = new RegExp("[\/e\/?]" + "url" + "=([^&$]*)"); if (url.search(re) > -1) {
 url = decodeURIComponent(String(RegExp.$1)); }

 
 var TargetURL = ((url != "") ? url : myscForm.TargetURL.value); myscForm.TargetURL.value = this.removeNavCollPara(TargetURL);  if ((!this.isTopFrame) || (typeof popupObj_empty == 'undefined') || !popupObj_empty) {
 myscForm.isModal.value = "false"; myscForm.submit(); } else {
 myscForm.isModal.value = "true";  var myscUrl = String(myscForm.action).replace('\/psp\/','\/psc\/');  var myscFormParameters = (myscUrl.indexOf('?') > 0) ? '&' : '?'; for (var i = 0; i < myscForm.elements.length; i++) {
 myscFormParameters += ptCommonObj.getNV(myscForm.elements[i]); }

 
 var modalOptions = [true, true, true, null, 260, 470, "", true, ""]; popupObj_empty.showModal(myscUrl + myscFormParameters, modalOptions); }

}, 




editLinks : function (editSCUrl) {
 top.location = editSCUrl;}, 




reloadLinks : function () {

 if (eppscMyLinks.Container) eppscMyLinks.Container.className += " " + eppscMyLinks.processingClassName; var eppscLoader = new net.ContentLoader(
 eppscMyLinks.serviceUri,
 null, "eppsc_container", "GET",
 function () {
 
 
 if (eppscMyLinks.Container) eppscMyLinks.Container.className = eppscMyLinks.Container.className.replace(" " + eppscMyLinks.processingClassName, ""); var respHTML = this.req.responseText; switch (eppscMyLinks.type) {
 case eppscMyLinks.TYPE_DROPDOWN:
 if (eppscMyLinks.DropDown) {
 eppscMyLinks.DropDown.innerHTML = respHTML; }
 break; }
 
 },
 function () {
 
 
 var url = eppscMyLinks.getCurrUrl(); if (!eppscMyLinks.isTopFrame) {
 
 document.location.reload(); } else if ((url != "") && (url.indexOf("?") > 0)) {
 
 top.location = url; } else {
 
 top.location.reload(); }
 },
 null, 
 "application/x-www-form-urlencoded"
 );}, 




linkSelected : function (myscDD) {
 
 if (myscDD.selectedIndex > 0) {
 if (saveWarning("TargetContent", null, "_top", "")) {
 eval(myscDD.options[myscDD.selectedIndex].value); } else {
 myscDD.selectedIndex = 0; }
 }

}, 




open : function (url) {
 top.location = url;}, 




openNewWindow : function (url) {

 var formattedUrl = url.toLowerCase(); var pos = formattedUrl.indexOf("/servlets/")

 if ((pos > 0) && (formattedUrl.indexOf("ictype=", pos) > 0)) {

 prefix = url; suffix = ""; pos = formattedUrl.indexOf("&target="); if (pos < 0) pos = formattedUrl.indexOf("?target="); if (pos > 0) {
 prefix = url.substr(0, pos + 1); pos = formattedUrl.indexOf("&", pos + 8); if (pos > 0) suffix = url.substr(pos); } else {
 prefix = prefix + "&"; }; formattedUrl = prefix + "target=mylink" + (new Date()).valueOf() + suffix; } else {
 formattedUrl = url; }; window.open(formattedUrl);} 

};ptEvent.load(eppscMyLinks.init);function AddShortcut () {
 eppscMyLinks.addLink();}