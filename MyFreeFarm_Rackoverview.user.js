// ==UserScript==
// @name           MyFreeFarm Rackoverview
// @namespace      https://github.com/BastianKanaan/GMscripts_MyFreeFarm
// @author         BastianKanaan
// @description    Gives an overview of your products
// @icon           data:image/png;base64,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
// @date           29.06.2014
// @version        1.3.0
// @include        /^http:\/\/(|www\.|s\d+\.)au\.myfreefarm\.com\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)veselaferma\.com\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.com\.br\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.de\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.cz\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.dk\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.gr\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)migranjalinda\.es\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)mabelleferme\.fr\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.com\.hr\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.ae\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.ir\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.it\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)enkicsitanyam\.hu\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.nl\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.co\.nz\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.no\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)wolnifarmerzy\.pl\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)pt\.myfreefarm\.com\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)fermavesela\.ro\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)mojaderewnja\.ru\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.se\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)th\.myfreefarm\.com\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)tr\.myfreefarm\.com\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.co\.uk\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.com\/.*$/
// @include        /^http:\/\/(|www\.|s\d+\.)myfreefarm\.com\.vn\/.*$/
// @exclude        http://*/dyn_bubbles.php*
// @exclude        http://*/login_inc.php*
// @exclude        http://*/stadt/*
// @exclude        http://*/nachrichten/*
// @exclude        http://*/vertraege/*
// @exclude        http://*/nutzer/*
// @exclude        http://*/payment/*
// @grant          GM_addStyle
// @grant          GM_deleteValue
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_log
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @require        https://raw.githubusercontent.com/BastianKanaan/GMscripts_MyFreeFarm/master/MyFreeFarm_Common_functions.user.js
// ==/UserScript==
// GM_log("Run Code Rackoverview:"+location.href);

	
const VERSION=GM_info["script"]["version"];
const neededVersionBerater="2.0";
const neededVersionFunctionFile="1.0.51";
//const USO_ID    ="85587";
//const USO_Home  =GM_info["script"]["namespace"]
//const USO_Source="http://userscripts.org/scripts/source/"+USO_ID+".user.js";
//const USO_Meta  ="http://userscripts.org/scripts/source/"+USO_ID+".meta.js";
const GM_Home  =GM_info["script"]["namespace"];
const GM_Source=GM_info["script"]["namespace"];

if(!VERSIONfunctionFile){
	alert("Hi, I am the MyFreeFarm Rackoverview-Script.\nThe function-file is missing.\nPlease install me again.");
	location.href=GM_Source;
}else if(compareVersions(neededVersionFunctionFile,VERSIONfunctionFile)>0){
	alert("Hi, I am the MyFreeFarm Rackoverview-Script.\nThe function-file is too old.\nPlease install me again.");
	location.href=GM_Source;
}
    
var DEVMODE=GM_getValue("devmode",false);
var DEVMODE_EVENTS=GM_getValue("devmode_events",false);
var DEVMODE_FUNCTION=GM_getValue("devmode_function",false);
     
    //08.03
    //var gameLocation=[null,null];
     
const sign_basepoint = "\u2031";
     
const EMPTYFILE = ["FARMNAME",0,[],0,1,1,0,[]];
var FARMNAME = null;
var FARMNR = null;
var bestand = new Array();
// bestand[int] = [farmName(string),money(int),rack(array of int),points(int),level(int),quest(int),quest-calc-to(int),missing amounts for quests(array of int)]
var prodTotal = new Array;
var productStatTime = 0;
var todayTime = new Date();
todayTime = Math.round(new Date(todayTime.getFullYear(),todayTime.getMonth(),todayTime.getDate(),0,0,0,0).getTime()/1000);
    /*
    function showMarket(pid){
            var cell = $top("shop");
            if(cell){
                    if (top.window.wrappedJSObject.city!=1){               
                            top.document.addEventListener("gameCity1",function(){
                                    top.document.removeEventListener("gameCity1",arguments.callee,false);
                                    showMarket(pid);
                            },false);
                            click($top("citylineitem1"));
                    } else if (cell.style.display!="block"){
                            cell.style.display = "block";
                            cell.style.visibility = "visible";
                            cell = $top("transp3");
                            cell.style.display = "block";
                            cell.style.visibility = "visible";
                            showMarket(pid);
                    } else {
                            $top("shopframe").src = "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/markt.php"+(typeof pid!="undefined"?"?page=1&order=p&id="+pid+"&filter=1&guild=0":"");;
                    }              
                    //closeInfoPanel();            
            } else {
                    location.href = "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/markt.php"+(typeof pid!="undefined"?"?page=1&order=p&id="+pid+"&filter=1&guild=0":"");;
            }
    }*/
     
function showMarket(pid){
	try{
		if((gameLocation[0]!="city")||(gameLocation[1]!=1)){
            document.addEventListener("gameCity1",function(pid){ return function(){
                document.removeEventListener("gameCity1",arguments.callee,false);
                    showMarket(pid);
                };}(pid),false);
                click($("speedlink_city1"));
        }else if($("market").style.display!="block"){
            document.addEventListener("gameOpenMarket",function(pid){ return function(){
            document.removeEventListener("gameOpenMarket",arguments.callee,false);
            showMarket(pid);
        };}(pid),false);
            unsafeWindow.close_page();
            unsafeWindow.hideDiv("shop");                          
            unsafeWindow.hideDiv("wbwcontainer");                          
            unsafeWindow.hideDiv("adcolumn");                              
            $("transp3").style.visibility = "visible";
            unsafeWindow.showDiv("transp3");
            unsafeWindow.marketAction("marketinit");
        }else{
            closeInfoPanel();
            unsafeWindow.market_filter_name="";
            unsafeWindow.market_filter_pid=parseInt(pid,10);
            unsafeWindow.market_filter_own=0;
            unsafeWindow.market_guild_filter=0;
            unsafeWindow.showOffers();                     
        }
    }catch(err){ GM_logError("showMarket pid="+pid+"\n"+err); }
}
     
     
    /*
    function readProductStat(){
            GM_log("readProductStat "+LNG+"."+SERVER);
            GM_xmlhttpRequest({
              method: "POST",
              url: "http://s"+SERVER+"."+GAMEPAGES[LNG]+"/stadt/stats.php?type=18&PAGE=1",
              headers:{
                'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; nl; rv:1.9.2.10) Gecko/20100914 Firefox/3.6.10 ( .NET CLR 3.5.30729; .NET4.0C)'
              },
              onerror: function(){
                            alert("error");
              },
              onload: function(response) {
                if (response.responseText) {
                try{
                    //GM_log(response.responseText.match(/<div id=\"rankinghead\"(?:\s+(?:.|\n)*?)?>&nbsp;<\/div>((.|\n)*)<div id=\"rankingnavi\"/)[1]);
                    newdiv = createElement("div");
                    newdiv.innerHTML = response.responseText.match(/<div id=\"rankinghead\"(?:\s+(?:.|\n)*?)?>&nbsp;<\/div>((.|\n)*)<div id=\"rankingnavi\"/)[1].replace(/^\s+|\s+$/g,"").replace(/<\/br>/g,"");
                    if (newdiv.firstElementChild.id == "rankingcontent"){
                            for (var v=0;v<newdiv.firstElementChild.children.length;v++){
                                    var iprod = newdiv.firstElementChild.children[v].firstElementChild.innerHTML;
                                    //GM_log(prodId[iprod] + " : " + iprod);
                                    if(!top.unsafeData.prodId[0][iprod]) GM_log("error:" + iprod);
                                    try{
                                            prodTotal[top.unsafeData.prodId[0][iprod]] = newdiv.firstElementChild.children[v].children[2].innerHTML;
                                    }catch(err){
                                            GM_log("error:"+err+" iprod:"+iprod+" prodId[0][iprod]:"+top.unsafeData.prodId[0][iprod]);
                                    }
                                            }
                                    }
                            //GM_log("prodTotal :" + print_r(prodTotal));
                            //GM_log("todayTime :" + todayTime);
                            productStatTime = todayTime;
                            GM_setValue(LNG+"_"+SERVER+"_productStatTime", productStatTime);
                            GM_setValue(LNG+"_"+SERVER+"_productStat", implode(prodTotal));
                }catch(err){GM_log("error" + err);}
                }
              }
            });
    }
    */
    /*function closeInfoPanel(){
            click($("infoPanelClose"));
    }*/
     
	function closeInfoPanel(){
            try{
                var div,div2;
                if(div=$top("infoPanel")){
                    div.setAttribute("mode","");
                    div.style.display="none";
                }
                if(div=$top("infoPanelInner")){
                    div.innerHTML="";
                }
                if(div=$top("multiframe")){
                    div.style.zIndex="101";
                    if((div.style.display!="block")&&(div2=$("transp100"))){
                        div2.style.display="none";
                    }
                }
                div=null;div2=null;
            } catch(err){ GM_logError("closeInfoPanel\n"+err); }
    }
	
   
     
    function buildInfoPanel(mode,mode2){
            if(typeof mode2=="undefined"){ mode2=""; }
            var container,newtable,newthead,newtbody,newtfoot,newtr,newtd,newtd1,newdiv1,newinput;
            var div,div1;
            if(!(div=$("infoPanel"))){
                    div1=$("garten_komplett");
                    div=createElement("div",{"id":"infoPanel","mode":"","style":"position:absolute;top:50px;left:"+(div1?20:100)+"px;width:660px;height:580px;background-color:#b8a789;z-index:100;display:none;"},div1?div1:ALL);
                    createElement("img",{"src":GFX+"guild/help_back.jpg","style":"position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;"},div);
                    createElement("div",{"id":"infoPanelInner","style":"position:absolute;width:595px;height:89%;margin:5%;overflow:none;"},div);
                    div1=createElement("img",{"id":"infoPanelClose","class":"link","src":GFX+"close.jpg","style":"position:absolute;top:8px;right:8px;width:20px;height:20px;"},div);
                    div1.addEventListener("click",closeInfoPanel,false);
            }
            if((div.style.zIndex=="101")&&(mode==div.getAttribute("mode"))&&(implode(mode2)==div.getAttribute("mode2"))){
                    closeInfoPanel();
            }else{
           
           
           
            //if(mode2==undefined){ mode2 = ""; }
            //var container = $("infoPanel");
            //var container;
            /*
            if((container.style.zIndex=="101")&&(mode==container.getAttribute("mode"))&&(implode(mode2)==container.getAttribute("mode2"))){
                    closeInfoPanel();
            */
    //      if(!(container=$("infoPanel"))) {
    //              closeInfoPanel();
           
    //      } else {
                    div.setAttribute("mode",mode);
                    div.setAttribute("mode2",implode(mode2));
                    div.style.display = "block";
                    div.style.zIndex = "102";
                    div.style.width = "800px";
                    div.style.left = "-100px";
                    div.style.background = "";
       
                    div = $("infoPanelInner");
                    div.innerHTML = "";
                    div.style.width = "90%";
                    div.style.height = "85%";
                    div.style.overflow= "auto";
                   
                    div.style.background = "";
                   
                    $("multiframe").style.zIndex = "99";
                    //$("transp100").style.display = "block";
     
                    switch(mode){
                    case "rackoverview":{
                            if(mode2){
                                    GM_setValue(LNG+"_"+SERVER+"_"+FARMNAME+"_modeRackoverview",mode2);
                            } else {
                                    mode2 = GM_getValue(LNG+"_"+SERVER+"_"+FARMNAME+"_modeRackoverview","cveoz");
                            }
                           
                            var newdiv = createElement("div",{"id":"offertypeselector","class":"productSort","style":"position:absolute;top:0px;left:0px;-moz-user-select:none;"},div);
                            newdiv.addEventListener("mouseover",function(event){
                                    var mouseOverText = event.target.getAttribute("mouseOverText");
                                    if(mouseOverText){
                                            //15.03
                                            mouseOverText='<div>'+getText("click")+'&nbsp;/&nbsp;'+getText("clickCtrl")+'</div><div>'+mouseOverText+'</div>';
                                            toolTip.show(event,mouseOverText);
                                    }
                            },false);
                           
                           
						    //Filter Pflanzen
                            var newdiv1 = createElement("div",{"mouseOverText":texte[LNG]["category_v"],"class":"rackcat1v","style":"float:left;width:27px;height:39px;background:url('"+GFX+"rack_sort_top.png') repeat scroll 0px 0px transparent;"},newdiv);
                            if (mode2.match(/v/)) {
                                    newdiv1.style.backgroundPosition=" 0px -78px";
                            } else {
                                    newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition=" 0px 0px";},false);
                                    newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition=" 0px -39px";},false);
                            }
                            newdiv1.addEventListener("click",function(event){
                                    if(event.ctrlKey){
                                            if(mode2.match(/v/)){ mode2=mode2.replace(/v/,""); }
                                            else { mode2 += "v"; }
                                    } else { mode2 = "v"; }
                                    $("infoPanel").setAttribute("mode","");
                                    buildInfoPanel("rackoverview",mode2);
                            },false);
                           
							//Filter fortschrittliche Produkte
                            newdiv1 = createElement("div",{"mouseOverText":texte[LNG]["category_e"],"class":"link","style":"float:left;width:27px;height:39px;background:url('"+GFX+"rack_sort_top.png') repeat scroll -27px 0px transparent;"},newdiv);
                            if (mode2.match(/e/)) {
                                    newdiv1.style.backgroundPosition="-27px -78px";
                            } else {
                                    newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-30px 0px";},false);
                                    newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-30px -39px";},false);
                            }
                            newdiv1.addEventListener("click",function(event){
                                    if(event.ctrlKey){
                                            if(mode2.match(/e/)){ mode2=mode2.replace(/e/,""); }
                                            else { mode2 += "e"; }
                                    } else { mode2 = "e"; }
                                    $("infoPanel").setAttribute("mode","");
                                    buildInfoPanel("rackoverview",mode2);
                            },false);
                           
							//Filter Öl
							newdiv1 = createElement("div",{"mouseOverText":texte[LNG]["category_o"],"class":"link","style":"float:left;width:54px;height:39px;background:url('"+GFX+"rack_sort_top.png') repeat scroll -53px 0px transparent;"},newdiv);
                            if (mode2.match(/o/)) {
                                    newdiv1.style.backgroundPosition="-53px -78px";
                            } else {
                                    newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-53px 0px";},false);
                                    newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-53px -39px";},false);
                            }
                            newdiv1.addEventListener("click",function(event){
                                    if(event.ctrlKey){
                                            if(mode2.match(/o/)){ mode2=mode2.replace(/o/,""); }
                                            else { mode2 += "o"; }
                                    } else { mode2 = "o"; }
                                    $("infoPanel").setAttribute("mode","");
                                    buildInfoPanel("rackoverview",mode2);
                            },false);
                           
                            //Filter Baumarkt
							newdiv1 = createElement("div",{"mouseOverText":texte[LNG]["category_z"],"class":"link","style":"float:left;width:54px;height:39px;background:url('"+GFX+"rack_sort_top.png') repeat scroll -159px 0px transparent;"},newdiv);
                            if (mode2.match(/z/)) {
                                    newdiv1.style.backgroundPosition="-159px -78px";
                            } else {
                                    newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-159px 0px";},false);
                                    newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-159px -39px";},false);
                            }
                            newdiv1.addEventListener("click",function(event){
                                    if(event.ctrlKey){
                                            if(mode2.match(/z/)){ mode2=mode2.replace(/z/,""); }
                                            else { mode2 += "z"; }
                                    } else { mode2 = "z"; }
                                    $("infoPanel").setAttribute("mode","");
                                    buildInfoPanel("rackoverview",mode2);
                            },false);
                           
							//Filter Picknick
                            newdiv1 = createElement("div",{"mouseOverText":texte[LNG]["category_fw"],"class":"link","style":"float:left;width:54px;height:39px;background:url('"+GFX+"rack_sort_top.png') repeat scroll -106px 0px transparent;"},newdiv);
                            if (mode2.match(/fw1fw2fw3fw4/)) {
                                    newdiv1.style.backgroundPosition="-106px -78px";
                            } else {
                                    newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-106px 0px";},false);
                                    newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-106px -39px";},false);
                            }
                            newdiv1.addEventListener("click",function(event){
                                    if(event.ctrlKey){
                                            if(mode2.match(/fw1fw2fw3fw4/)){ mode2=mode2.replace(/fw1fw2fw3fw4/,""); }
                                            else { mode2 += "fw1fw2fw3fw4"; }
                                    } else { mode2 = "fw1fw2fw3fw4"; }
                                    $("infoPanel").setAttribute("mode","");
                                    buildInfoPanel("rackoverview",mode2);
                            },false);
                           
							//Filter Blumen
							newdiv1 = createElement("div",{"mouseOverText":texte[LNG]["category_fl"]+" "+texte[LNG]["category_fla"],"class":"link","style":"float:left;width:54px;height:39px;background:url('"+GFX+"rack_sort_top.png') repeat scroll -212px 0px transparent;"},newdiv);
                            if (mode2.match(/flfla/)) {
                                    newdiv1.style.backgroundPosition="-212px -78px";
                            } else {
                                    newdiv1.addEventListener("mouseout",function(){this.style.backgroundPosition="-212px 0px";},false);
                                    newdiv1.addEventListener("mouseover",function(){this.style.backgroundPosition="-212px -39px";},false);
                            }
                            newdiv1.addEventListener("click",function(event){
                                    if(event.ctrlKey){
                                            if(mode2.match(/flfla/)){ mode2=mode2.replace(/flfla/,""); }
                                            else { mode2 += "flfla"; }
                                    } else { mode2 = "flfla"; }
                                    $("infoPanel").setAttribute("mode","");
                                    buildInfoPanel("rackoverview",mode2);
                            },false);
							
							
                            var newtable = createElement("table",{"border":"1", "height": "500px", "style":"position:absolute;top:50px;left:0px;-moz-user-select:none;"},div);
                            newtable.addEventListener("mouseover",function(event){
                                    var node = event.target;
                                    while((node!=this)&&(!node.getAttribute("mouseOverText"))){ node = node.parentNode; }
                                    if(node!=this){ showToolTip(event,node.getAttribute("mouseOverText"),this); }
                            },false);
                            var newtr = createElement("tr",{},newtable);
                            var newtd = createElement("td",{},newtr);
                            for(var farm=0;farm<bestand.length;farm++){
                                    createElement("td",{"style":"text-align:center;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,bestand[farm][0]);
                            }
                            if(bestand.length>1){
                                    createElement("td",{"style":"text-align:center;"},newtr,"\u03A3");
                            }
                            //benötige ich nicht
                            //createElement("td",{"style":"text-align:center;",title:getDateStr(productStatTime/1000)},newtr,"Stat Total");
                            //createElement("td",{"style":"text-align:center;"},newtr,"Total");
     
                            var oldclass = "c";
							mode2 += oldclass;
     
                            newtr = createElement("tr",{},newtable);
                            newtd = createElement("td",{},newtr,unsafeWindow.t_money);
                            var sum = 0;
                            for(var farm=0;farm<bestand.length;farm++){
                                    sum += bestand[farm][1];
                                    createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][1]));
                            }
                            if(bestand.length>1){
                                    createElement("td",{"style":"text-align:right;"},newtr,numberFormat(sum));
                            }
     
                            newtr = createElement("tr",{},newtable);
                            newtd = createElement("td",{},newtr,unsafeWindow.t_points);
                            for(var farm=0;farm<bestand.length;farm++){
                                    createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][3]));
                            }
                            if(bestand.length>1){
                                    createElement("td",{"style":"text-align:right;"},newtr,"");
                            }
     
                            newtr = createElement("tr",{},newtable);
                            newtd = createElement("td",{},newtr,unsafeWindow.guildquestlist_level.replace(/:/,""));
                            for(var farm=0;farm<bestand.length;farm++){
                                    createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][4]));
                            }
                            if(bestand.length>1){
                                    createElement("td",{"style":"text-align:right;"},newtr,"");
                            }
     
                            newtr = createElement("tr",{},newtable);
                            newtd = createElement("td",{},newtr,"Quest Farm 1");
                            for(var farm=0;farm<bestand.length;farm++){
                                    createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][5]));
                            }
                            if(bestand.length>1){
                                    createElement("td",{"style":"text-align:right;"},newtr,"");
                            }
     
                            /*newtr = createElement("tr",{},newtable);
                            newtd = createElement("td",{},newtr,"Quest Farm 1 to");
                            for(var farm=0;farm<bestand.length;farm++){
                                    if (FARMNR==farm){
                                            newtd = createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr);
                                            var newsel = createElement("select",{"id":"questselect","style":"width:100%;height:18px;direction:rtl"},newtd);
                                            createElement("option",{"value":0},newsel,"-");
                                            for(var i=bestand[farm][5];i<unsafeData.QUESTS["farm"]["1"].length;i++){
                                                    createElement("option",{"value":i},newsel,i);
                                            }
                                            newsel.addEventListener("change",function(){
                                                    bestand[FARMNR][6] = parseInt(this.value,10);
                                                    bestand[FARMNR][7] = new Array();
                                                    var item;
                                                    for(var v=bestand[FARMNR][5];v<=bestand[FARMNR][6];v++) {
                                                            for(var i=0;i<unsafeData.QUESTS["farm"]["1"][v][0].length;i++){
                                                                    item = unsafeData.getQuestBestAlternative(unsafeData.QUESTS["farm"]["1"][v][0][i]);
                                                                    if (!bestand[FARMNR][7][item[1]]) bestand[FARMNR][7][item[1]] = 0;
                                                                    bestand[FARMNR][7][item[1]] += item[2];
                                                            }
                                                    }
                                                    item=null;
                                                    GM_setValueCache(LNG+"_"+SERVER+"_rackoverview",implode(bestand));
                                                    $("infoPanel").setAttribute("mode","");
                                                    buildInfoPanel("rackoverview");
                                            },false);
                                            newsel.value = bestand[farm][6];
                                            newsel=null;i=null;
                                    }else{
                                            createElement("td",{"style":"text-align:right;"},newtr,numberFormat(bestand[farm][6]));
                                    }
                            }*/
                           
                            if(bestand.length>1){
                                    createElement("td",{"style":"text-align:right;"},newtr,"");
                            }
                            for(var v=0;v<unsafeData.prodNameSort[0].length;v++){
                                    var w = unsafeData.prodNameSort[0][v];
                                    var showProduct = false;
                                    for(var farm=0;farm<bestand.length;farm++){
                                            if((!showProduct)&&(mode2.search(unsafeData.prodTyp[0][w])>-1)){
                                                    if((bestand[farm][2][w]>-1)||(bestand[FARMNR][7][w]>0)){ showProduct = true; }
                                            }
                                    }
                                    if(showProduct){
                                            if(oldclass!=unsafeData.prodTyp[0][w]){
                                                    createElement("td",{"colspan":bestand.length+3},createElement("tr",{},newtable));
                                                    oldclass = unsafeData.prodTyp[0][w];
                                            }
                                            newtr = createElement("tr",{},newtable);
                                            newtd = createElement("td",{},newtr);
                                            produktPic(0,w,newtd);
                                            if (!unsafeData.prodBlock[0][w].match(/[lt]/)){ // if (unsafeData.prodBlock[w].match(/^[lt]*$/)) {
                                                    newtd.setAttribute("mouseOverText",texte[LNG]["goToMarketOfX"].replace("%1%",unsafeData.prodName[0][w]));
                                                    newa = createElement("span",{"id":w},newtd,unsafeData.prodName[0][w]);
													//newa = createElement("a",{"id":w},newtd,unsafeData.prodName[0][w]);
                                                    //newa.setAttribute("class","link");
                                                    //newa.addEventListener("click",function(){showMarket(this.id);},false);
                                                   
                                            }else{
                                                    createElement("span",{"id":w},newtd,unsafeData.prodName[0][w]);
                                            }
           
                                            sum = 0;
                                            for(var farm=0;farm<bestand.length;farm++){
    GM_log(farm);                                  
    GM_log(implode(bestand[farm]));                                
                                                    if(bestand[farm][2][w]>-1){ //product amount
                                                            sum += bestand[farm][2][w];
                                                            if (bestand[farm][7].length > 1){
                                                                    newtd = createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr);
                                                                    createElement("span",{"style":"text-align:right;"},newtd,numberFormat(bestand[farm][2][w]));
                                                                    if (!!bestand[farm][7][w] && bestand[farm][7][w]>0){
                                                                            if ((bestand[farm][2][w] - bestand[farm][7][w])<0){
                                                                                    createElement("span",{"style":"color:#cc0000;"},newtd," ("+numberFormat(bestand[farm][2][w]-bestand[farm][7][w])+ ")");
                                                                            }else{
                                                                                    createElement("span",{"style":"color:green;"},newtd," (+"+numberFormat(bestand[farm][2][w]-bestand[farm][7][w])+")");
                                                                            }
                                                                    }
                                                            }else{
                                                                    createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,numberFormat(bestand[farm][2][w]));
                                                            }
                                                    } else {
                                                            if (bestand[farm][7].length > 1){
                                                                    newtd = createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr);
                                                                    //createElement("span",{"style":"text-align:right;"},newtd,"--");
                                                                    createElement("span",{"style":"text-align:right;color:blue;padding:0px 2px 0px 2px;"},newtd,"Lvl&nbsp;" + unsafeWindow.produkt_level[w]);
                                                                    if (!!bestand[farm][7][w] && bestand[farm][7][w]>0){
                                                                            createElement("span",{"style":"color:#cc0000;"},newtd,"( -"+numberFormat(bestand[farm][7][w])+ " )");
                                                                    }
                                                            }else{
                                                                    createElement("td",{"style":"text-align:right;"+(FARMNR==farm?"background-color:#CCCCFF;":"")},newtr,"--");
                                                            }
                                                    }
                                            }
                                            if(bestand.length>1){
                                                    createElement("td",{"style":"text-align:right;"},newtr,numberFormat(sum));
                                            }
                                            //createElement("td",{"style":"text-align:right;"},newtr,numberFormat(prodTotal[w]));
                                            //createElement("td",{"style":"text-align:right;"},newtr,numberFormat(sum/prodTotal[w]*10000,0)+" "+sign_basepoint);
                                    }
                            }
                           
                            newtr = createElement("button",{"class":"link","style":"position:absolute;top:25px;left:450px"},div,"Clear all data");
                            newtr.addEventListener("click",function(){
                                    FARMNR = 0;
                                    bestand=[EMPTYFILE];
                                    bestand[FARMNR][0]=FARMNAME;
                                    for (var v=0;v<unsafeData.prodName[0].length;v++){
                                            bestand[FARMNR][2][v] = -1;
                                    }
                                    GM_setValue(LNG+"_"+SERVER+"_rackoverview",implode(bestand));
                                    closeInfoPanel();
                            },false);
                            newtable=null;newtr=null;newtd=null;newdiv=null;newdiv1=null;
                            break;
                    }
                    default:
                            break;
                    }
            }
            div=null;
    }//end buildinfo
     
    function do_main(){
            TOOLTIP = $top("divToolTip");
            LOG_BUBBLE_BOX = $top("divLogBubbleBox");
           
            if(top.unsafeData.texte==undefined){
                    top.unsafeData.texte=texte;
            }else{
                    texte=top.unsafeData.texte;
            }
     
    //      texte = unsafeData.texte;
    //      texte["rackoverview"] = new Object();
    //      texte["category"]=new Object();
            //LNG = unsafeData.LNG;
            LNG = unsafeData.LANGUAGE;
                   
            //14.03
            var COUNTRY=unsafeData.COUNTRY;
            SERVER = (new RegExp("s(\\d+)\\."+GAMEPAGES[COUNTRY].replace(/\./g,"\\."),"i").exec(location.hostname))[1];
            var loc=new RegExp("s(\\d+)\\."+GAMEPAGES[COUNTRY].replace(/\./g,"\\."),"i").exec(location.hostname);
            /*
            try{
                            gameLocation=["farm",unsafeWindow.farm-1];
            }catch(err){GM_logError("farmMove\n"+err);}
                    */
           
            PAGE = location.pathname.replace(/^\//,"").replace(/\.php.*$/,"");
            delimThou = unsafeData.delimThou;
            regDelimThou = new RegExp(unsafeData.regDelimThou,"g");
            delimDeci = unsafeData.delimDeci;
            regDelimDeci = new RegExp(unsafeData.regDelimDeci);
     
            switch (LNG){
                    case "au":case "nz":case "uk":case "us": {
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "bu":{
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "de":{
                                    if(top.unsafeData.texte["de"]["rackoverview"]==undefined){
                                            //texte["de"]=new Object();
                                            texte["de"]["rackoverview"] = new Object();
                                                                   
                                            texte["de"]["rackoverview"]["msgUpdate"] = "Es liegt eine neue Script-Version vor rackoverview. Diese installieren?";
                                            texte["de"]["rackoverview"]["shouldUpdateBerater"] = "Du solltest das Berater-Script aktualisieren!<br>Der Rackoverview-Script wird nicht ordnungsgem"+a_dots+sz+" arbeiten.";
                                    }
                           
                            break;}
                    case "dk":{
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "es": {
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "fr":{
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "gr":{
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "hu":{
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "it":{
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "nl":{
                            texte["rackoverview"]["msgUpdate"] = "Wil je de nieuwe script versie van rackoverview installeren?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "pl":{
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "ru": {
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "se": {
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
                    case "tr":{
                            texte["rackoverview"]["msgUpdate"] = "There is a new script version of rackoverview availible. Install?";
                            texte["rackoverview"]["shouldUpdateBerater"] = "You should update the script of the Adviser!<br>The Rackoverview-Script will not run properly.";
                            break;}
            }
     
            // Updatecheck
            if((!unsafeData.beraterVersion)||(compareVersions(neededVersionBerater,unsafeData.beraterVersion)>0)){
                    alert2(texte[LNG]["rackoverview"]["shouldUpdateBerater"],texte["ok"]);
            }
            // time,version on server,last checked version
            var updateCheck=explode(GM_getValue("updateCheck"),"do_main/updateCheck",[0,VERSION,VERSION]);
			//Update ausgeschaltet 22.03
           /*
            if(GM_getValue("valUpdate",true)&&(now-updateCheck[0]>1800)){
                    logBubble.add(getText("requestingUpdateInfoOfX").replace(/%1%/,GM_info["script"]["name"]));
                    updateCheck[0]=now;
                    GM_setValue2("updateCheck",implode(updateCheck),1);
                    GM_xmlhttpRequest({
                            method: "GET",
                            url: USO_Meta,
                            onload: function(response){
                                    try{
                                            if(response.responseText.match(/@version\s+\d+\.\d+\.\d+/)){
                                                    updateCheck[1]=(/@version\s+(\d+\.\d+\.\d+)/).exec(response.responseText)[1];
                                                    if(VERSION==updateCheck[1]){
                                                            // this script is the one of the server
                                                            updateCheck[2]=updateCheck[1];
                                                            GM_setValue2("updateCheck",implode(updateCheck),2);
                                                            logBubble.add(getText("XIsUpToDate").replace(/%1%/,GM_info["script"]["name"]));
                                                    }else if (updateCheck[1]!=updateCheck[2]){
                                                            alert2(getText("msgUpdateX").replace(/%1%/,GM_info["script"]["name"])+"<br>("+VERSION+"&nbsp;&rarr;&nbsp;"+updateCheck[1]+")",getText("yes"),getText("no"),function(){
                                                                    updateCheck[2]=updateCheck[1];
                                                                    GM_setValue2("updateCheck",implode(updateCheck),3);
                                                                    window.setTimeout(function(){
                                                                            location.href=USO_Source;
                                                                    },0);
                                                            },function(){
                                                                    updateCheck[2]=updateCheck[1];
                                                                    GM_setValue2("updateCheck",implode(updateCheck),4);
                                                            });
                                                    }else{
                                                            logBubble.add(getText("updateOfXAvailable").replace(/%1%/,GM_info["script"]["name"]));
                                                    }
                                            }else{
                                                    logBubble.add(getText("couldNotGetUpdateInfoOfX").replace(/%1%/,GM_info["script"]["name"]));
                                            }
                                    }catch(err){GM_logError("updateCheck.onload\n"+err);}                  
                            },
                            onerror: function(response){
                                    GM_logError("updateCheck.onerror\n"+response.responseText);
                            },
                            timeout: function(response){
                                    GM_logError("updateCheck.timeout\n"+response.responseText);
                            }
                    });
            }*/
           
            //08.03
            /*
            if(now-updateCheck[0]>1800){
                    showInLogBubble("Checking for update (Rackoverview)");
                    updateCheck[0] = now;
                    GM_setValue2("updateCheck",implode(updateCheck));
                    GM_xmlhttpRequest({
                            method: "GET",
                            url: USO_Meta,
                            onload: function(response) {
                                    if(response.responseText.match(/@version\s+\d+\.\d+\.\d+/)){
                                            updateCheck[1] = (/@version\s+(\d+\.\d+\.\d+)/).exec(response.responseText)[1];
                                            if(VERSION==updateCheck[1]){
                                                    // this script is the one of the server
                                                    updateCheck[2] = updateCheck[1];
                                                    GM_setValue2("updateCheck",implode(updateCheck));
                                            } else if (updateCheck[1]!=updateCheck[2]) {
                                                    alert2(texte[LNG]["rackoverview"]["msgUpdate"]+"<br>("+VERSION+"&nbsp;&rarr;&nbsp;"+updateCheck[1]+")",texte["yes"],texte["no"],function(){
                                                            updateCheck[2] = updateCheck[1];
                                                            GM_setValue2("updateCheck",implode(updateCheck));
                                                            window.setTimeout(function(){
                                                                    location.href = USO_Source;
                                                            },0);
                                                    },function(){
                                                            updateCheck[2] = updateCheck[1];
                                                            GM_setValue2("updateCheck",implode(updateCheck));
                                                    });
                                            }
                                    } else {
                                            GM_log("Update Check Rackoverview: Bad Response: "+response.responseText);
                                    }
                            }
                    });
            }
            */
           
            FARMNAME = $("username").innerHTML;
			bestand = explode(GM_getValue(LNG+"_"+SERVER+"_rackoverview"),"bestand",[]);
            if(!(bestand instanceof Array)){ bestand = new Array(); }
            // FARMNAME, cash, products, points, level, quest
            for(var v=0;v<bestand.length;v++){
                    if(bestand[v] instanceof Array){
                            if(bestand[v][0]==FARMNAME){
                                    if(FARMNR==null){
                                            FARMNR = v;
                                    } else {
                                            bestand.splice(v--,1);
                                    }
                            }
                    }else{
                            bestand.splice(v--,1);
                    }
            }
            if(FARMNR==null){
                    FARMNR = bestand.length;
                    bestand.push(EMPTYFILE);
                    bestand[FARMNR][0]=FARMNAME;
                    for (var v=0;v<unsafeData.prodName[0].length;v++){
                            bestand[FARMNR][2][v] = -1;
                    }
                    GM_setValue(LNG+"_"+SERVER+"_rackoverview",implode(bestand));
            }else{
                    if(!(bestand[FARMNR][2] instanceof Array)){
                            bestand[FARMNR][2]=[];
                            for (var v=0;v<unsafeData.prodName[0].length;v++){
                                    bestand[FARMNR][2][v] = -1;
                            }                      
                    }
                    if(!(bestand[FARMNR][7] instanceof Array)){ bestand[FARMNR][7]=[]; }
            }
     
    //benötige ich nicht  
    //      prodTotal = explode(GM_getValue(LNG+"_"+SERVER+"_productStat"),"productStat",[]);
    //      productStatTime = GM_getValue(LNG+"_"+SERVER+"_productStatTime",0);
     
            document.addEventListener("gameUpdateRack",function(){
				try{
                    // Money
                    bestand[FARMNR][1] = parseInt($("bar").innerHTML.replace(regDelimThou,""),10);
                    // Coins
                    bestand[FARMNR][2][0] = parseInt($("coins").innerHTML.replace(regDelimThou,""),10);
                    
					// Rack
                    for (var v=1;v<unsafeData.prodName[0].length;v++){
						if(!unsafeData.prodName[0].hasOwnProperty(v)){continue;}
                        if(unsafeData.prodBlock[0][v].match(/l/)){
							bestand[FARMNR][2][v] = -1;
                        }else{
                            bestand[FARMNR][2][v] = (unsafeData.prodStock[0][v]?unsafeData.prodStock[0][v]:0);
                        }
                    }
                    // Points
                    bestand[FARMNR][3] = parseInt($("pkt").innerHTML.replace(regDelimThou,""),10);
                    // Level
                    bestand[FARMNR][4] = parseInt($("levelnum").innerHTML.replace(regDelimThou,""),10);
                    // Quest
                    /*if((bestand[FARMNR][5]!=unsafeData.questData["farm"]["1"]["nr"])||(bestand[FARMNR][6]==undefined)){
                            bestand[FARMNR][5] = unsafeData.questData["farm"]["1"]["nr"];
                            if (bestand[FARMNR][6]==undefined){ //quest number to calc to
                                    bestand[FARMNR][6] = bestand[FARMNR][5]+1; //init
                            } else if (bestand[FARMNR][6]<bestand[FARMNR][5]){
                                    bestand[FARMNR][6] = 0; //calc-to-quest passed
                            }
                            bestand[FARMNR][7] = new Array(); //
                            var item;
                            for(var v=bestand[FARMNR][5];v<=bestand[FARMNR][6];v++) {
                                    if(unsafeData.QUESTS["farm"]["1"][v]){
                                            for(var i=0;i<unsafeData.QUESTS["farm"]["1"][v][0].length;i++){
                                                    item = unsafeData.getQuestBestAlternative(unsafeData.QUESTS["farm"]["1"][v][0][i]);
                                                    if (!bestand[FARMNR][7][item[1]]) bestand[FARMNR][7][item[1]] = 0;
                                                    bestand[FARMNR][7][item[1]] += item[2];
                                            }
                                    }
                            }
                            prod=null;
                    }*/
                    GM_setValue(LNG+"_"+SERVER+"_rackoverview",implode(bestand));
     
                    todayTime = new Date();
                    todayTime = Math.round(new Date(todayTime.getFullYear(),todayTime.getMonth(),todayTime.getDate(),0,0,0,0).getTime()/1000);
                    /*
                    if (productStatTime < todayTime){
                            window.setTimeout(readProductStat,0);
                            muss noch bearbeitet werden
                    }
                    */
					//catch(err){ alert("Sorry. Can't read the entered string.\n"+err+"  "+v); }
				}	catch(err){ GM_logError("gameUpdateRack\n"+err); } 
            },false);
     
            var newdiv = createElement("div",{"id":"divBeraterButtonsRackOverview","mouseOverText":"Rack Overview","class":"link beraterButtonIcon hoverBgRed"},$("divBeraterButtons"));
            createElement("img",{"src":GFX+"lager/sack1.png","style":"position:relative;top:5px;left:4px;width:22px;height:22px;"},newdiv);
            newdiv.addEventListener("click",function(){
                    buildInfoPanel("rackoverview");
            },false);
            newdiv=null;
    }
     
    // init script
    window.addEventListener("load",function(){
            if(unsafeData.beraterDone){
                    do_main();
            } else {
                    document.addEventListener("beraterDone",function(){
                            do_main();
                            document.removeEventListener("beraterDone",arguments.callee,false);
                    },false);
            }
    },false);