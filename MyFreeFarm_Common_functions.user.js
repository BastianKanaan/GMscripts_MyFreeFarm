// ==UserScript==
// @name           MyFreeFarm Common functions
// @namespace      https://github.com/BastianKanaan/GMscripts_MyFreeFarm
// @author         BastianKanaan
// @description    Common functions for MyFreeFarm-Scripts
// @date           22.02.2015
// @version        2.1.5
// ==/UserScript==

const VERSIONfunctionFile = "2.1.5";
var DEVMODE=GM_getValue("devmode",false);
var DEVMODE_EVENTS=GM_getValue("devmode_events",false);
var DEVMODE_FUNCTION=GM_getValue("devmode_function",false);
var DEVMODE_LOG_WARNING=GM_getValue("devmode_log_warning",false);
var DEVMODE_LOG_ERROR=GM_getValue("devmode_log_error",false);

// PROTOTYPES ************************************************************************************************************
String.prototype.reverse = function(){
try{
    var splitext = this.split("");
    var revertext = splitext.reverse();
    var reversed = revertext.join("");
    return reversed;
}catch(err){ GM_logError("String.prototype.reverse","","",err); }    
};
String.prototype.capitalize = function() {
try{
    return this.charAt(0).toUpperCase() + this.slice(1);
}catch(err){ GM_logError("String.prototype.capitalize","","",err); }
};
Array.prototype.equals = function(that){
try{
   // if the other array is a falsy value, return
    if (!that)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != that.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && that[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(that[i]))
                return false;
        }
        /**REQUIRES OBJECT COMPARE**/
        else if (this[i] instanceof Object && that[i] instanceof Object) {
            // recurse into another objects
            //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
            if (!this[i].equals(that[i]))
                return false;
            }
        else if (this[i] != that[i]) {
            return false;   
        }           
    }       
    return true;
}catch(err){ GM_logError("Array.prototype.equals","","",err); }
}  
Array.prototype.shuffle = function (){
try{
    var i=this.length, j, temp;
    if (i==0) return;
    while (--i) {
        j = Math.floor( Math.random()*(i+1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    temp=null;
}catch(err){ GM_logError("Array.prototype.shuffle","","",err); }    
};
Array.prototype.swap = function (from, to){
try{
    var temp;
    if (this.length==0) return;
    temp = this[from];
    this[from] = this[to];
    this[to] = temp;
    temp=null;
}catch(err){ GM_logError("Array.prototype.swap","from, to","",err); }
};
Object.prototype.equals = function(that) {
try{    
    //For the first loop, we only check for types
    for (propName in this) {
        //Check for inherited methods and properties - like .equals itself
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        //Return false if the return value is different
        if (this.hasOwnProperty(propName) != that.hasOwnProperty(propName)) {
            return false;
        }
        //Check instance type
        else if (typeof this[propName] != typeof that[propName]) {
            //Different types => not equal
            return false;
        }
    }
    //Now a deeper check using other objects property names
    for(propName in that) {
        //We must check instances anyway, there may be a property that only exists in object2
            //I wonder, if remembering the checked values from the first loop would be faster or not 
        if (this.hasOwnProperty(propName) != that.hasOwnProperty(propName)) {
            return false;
        }
        else if (typeof this[propName] != typeof that[propName]) {
            return false;
        }
        //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
        if(!this.hasOwnProperty(propName))
          continue;

        //Now the detail check and recursion

        //This returns the script back to the array comparing
        /**REQUIRES Array.equals**/
        if (this[propName] instanceof Array && that[propName] instanceof Array) {
                   // recurse into the nested arrays
           if (!this[propName].equals(that[propName]))
                        return false;
        }
        else if (this[propName] instanceof Object && that[propName] instanceof Object) {
                   // recurse into another objects
                   //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
           if (!this[propName].equals(that[propName]))
                        return false;
        }
        //Normal value comparison for strings and numbers
        else if(this[propName] != that[propName]) {
           return false;
        }
    }
    //If everything passed, let's say YES
    return true;
}catch(err){ GM_logError("Object.prototype.equals","","",err); }    
}  
Object.prototype.order = new Array();
Object.prototype.sortObj = function(sortfkt,descending){
    // sortfkt:
    // a[0] accesses the object-key "a", a[1] the containing data "Object[a]"
    // numbers first, then strings : default
    // numbers : function(a,b){return (parseFloat(a[0],10)-parseFloat(b[0],10));}
    // dates - ascending sorting : function(a,b){return (getTime(a[0])-getTime(b[0]));}
    // descending: bool
try{
    // Setup helping array
    var sorted = new Array();
    for (var i in this){
        if(!this.hasOwnProperty(i)){ continue; }
        sorted.push([i,this[i]]);
    }
    // Define default sorting function
    if(typeof sortfkt!="function"){
        sortfkt = function(a,b){
            if(isNaN(a[0])){
                if(isNaN(b[0])){ return ((a[0]>b[0])-(a[0]<b[0])); } // both strings
                else { return 1; } // string > number
            } else {
                if(isNaN(b[0])){ return -1; } // number < string
                else { return (a[0]-b[0]); } // both numbers
            }
        };
    }
    // Sorting the helping array
    sorted.sort(sortfkt);
    if(descending){ sorted.reverse(); }

    // Reconstruct sorted object
    this.order.splice(0,this.order.length);
    for(var j=0;j<sorted.length;j++){
        this.order.push(sorted[j][0]);
        // delete this[sorted[j][0]];
        // this[sorted[j][0]] = sorted[j][1];
    }
    sorted=null;
    return this;
}catch(err){ GM_logError("Object.prototype.sortObj","","",err); }
};
Object.prototype.isEmpty = function(){
try{
    for(var i in this){
        if(this.hasOwnProperty(i)){ return false; }
    }
    return true;
}catch(err){ GM_logError("Object.prototype.isEmpty","","",err); }
};
Object.prototype.length = function(){
try{
    var len = 0;
    for (var i in this){
        if(!this.hasOwnProperty(i)){ continue; }
        len++;
    }
    return len;
}catch(err){ GM_logError("Object.prototype.length","","",err); }
};
Object.prototype.clone = function () {
try{
    var o = (this instanceof Array)?[]:{};
    for (var property in this) {
        if(!this.hasOwnProperty(property)){ continue; }
        if((this[property]!=null)&&(typeof (this[property])=="object")){
            o[property] = this[property].clone()
        }else{
            o[property] = this[property];
        }
    }
    return o;
}catch(err){ GM_logError("Object.prototype.clone","","property="+property,err); }
};

// FUNCTIONS *************************************************************************************************************

function GM_setValueCache(name,value,debugName){
try{
    window.setTimeout(function(){
        GM_setValue(name,value);
    },0);
}catch(err){ GM_logError("GM_setValueCache","name="+name+" debugName="+debugName,"",err); }
}
function GM_setValue2(name,value,debugName){
// for developing / finding security errors, use debugName unique for optimal tracking
try{
    GM_setValue(name,value);
    if(GM_getValue(name)!=value){
        GM_logInfo("GM_setValue2","name="+name+" debugName="+debugName,"","Saved value not equal to value");
        GM_setValueCache(name,value);
    }
}catch(err){
    GM_logError("GM_setValue2","name="+name+" debugName="+debugName,"",err);
    GM_setValueCache(name,value);
}
}
function GM_logInfo(name,parameters,variables,text){
try{
    GM_log((COUNTRY?COUNTRY.toUpperCase():"")+"-"+(SERVER?SERVER:"")+": Information\n"+name+"\n"+parameters+"\n"+variables+"\n"+text);
}catch(err){ GM_logError("GM_logInfo","name="+name+" parameters="+parameters+" variables="+variables+" text="+text,"",err); }
};
function GM_logWarning(name,parameters,variables,text){
try{
    GM_log((COUNTRY?COUNTRY.toUpperCase():"")+"-"+(SERVER?SERVER:"")+": Warning\n"+name+"\n"+parameters+"\n"+variables+"\n"+text);
    if(DEVMODE_LOG_WARNING){ logBubble.add(name+"\n"+text,10,"orange"); }
}catch(err){ GM_logError("GM_logWarning","name="+name+" parameters="+parameters+" variables="+variables+" text="+text,"",err); }
};
function GM_logError(name,parameters,variables,text){
try{
    GM_log((COUNTRY?COUNTRY.toUpperCase():"")+"-"+(SERVER?SERVER:"")+": Error\n"+name+"\n"+parameters+"\n"+variables+"\n"+text);
    if(DEVMODE_LOG_ERROR){ logBubble.add(name+"\n"+text,10,"red"); }
}catch(err){ GM_log("ERROR in 'GM_logError'\nname="+name+"\n"+err); }
};

/*
GM_logError\("","","","(.*)\\n"\+err\)
GM_logError\("\1","","",err\)


GM_logError\("","","","(.*?) (.*)\\n"\+err\)
GM_logError\("\1","\2","",err\)

_GM_logError\((.*?) (.*)\)
GM_logError\("\1","","","\2"\)
*/

function $(ID){
try{
    return document.getElementById(ID);
}catch(err){ GM_logError("$","ID="+ID,"",err); }
}
function $top(ID) {
try{
    return top.document.getElementById(ID);
}catch(err){ GM_logError("$top","ID="+ID,"",err); }
}
function unsafe$(ID){
try{
    return unsafeWindow.document.getElementById(ID);
}catch(err){ GM_logError("unsafe$","ID="+ID,"",err); }
}
function unsafe$top(ID) {
try{
    return top.window.wrappedJSObject.document.getElementById(ID);
}catch(err){ GM_logError("unsafe$top","ID="+ID,"",err); }
}
function containerId(node) {
try{
    node = node.parentNode;
    while(node.id==""){
        if(node.parentNode){
            node = node.parentNode;
        } else {
            throw("No parent node found.");
            break;
        }
    }
    return node.id;
}catch(err){ GM_logError("containerId","node.id="+(node&&node.id?node.id:"?"),"",err); }
}
function removeElement(node){
try{
    if(node&&node.parentNode){
        node.parentNode.removeChild(node);
    }
}catch(err){ GM_logError("removeElement","node.id="+(node&&node.id?node.id:"?"),"",err); }
}
function createElement(type, attributes, append, inner){
try{
    var node = document.createElement(type);
    for (var attr in attributes) {
        if (!attributes.hasOwnProperty(attr)){ continue; }
        if (attr=="checked"){ node.checked=attributes[attr]; }
        else { node.setAttribute(attr, attributes[attr]); }
    }
    if (append) append.appendChild(node);
    if (inner) node.innerHTML = inner;
    return node;
}catch(err){ GM_logError("createElement","type="+type+" attributes="+JSON.stringify(attributes)+" append="+append+" append.id="+(append&&append.id?append.id:"?"),"",err); }
}
function unsafeCloneObject(obj){
try{
    if(typeof obj!="object"){
        return obj;
    }else if(!obj.valueOf){
        return obj;
    }else if(typeof cloneInto=="function"){
        return cloneInto(obj,unsafeWindow,{cloneFunctions:true});
    }else{
        return obj;
    }
}catch(err){ GM_logError("unsafeCloneObject","","",err); }
}
function unsafeOverwriteFunction(fooName,newFoo) {
try{
    if(!unsafeWindow[fooName]){
        GM_logWarning("unsafeOverwriteFunction","fooName="+fooName,"","Function does not exist.");
    }
    if(typeof exportFunction=="function"){
        exportFunction(newFoo,unsafeWindow,{"defineAs":"unsafe_"+fooName});
    }else{
        unsafeWindow["unsafe_"+fooName]=newFoo;
    }
    unsafeWindow["_"+fooName]=unsafeWindow[fooName];
    unsafeWindow[fooName]=unsafeWindow["unsafe_"+fooName];
}catch(err){ GM_logError("unsafeOverwriteFunction","fooName="+fooName,"",err); }
};

function raiseEvent(name){
try{
    var event = document.createEvent("Event");
    event.initEvent(name, true, true);
    document.dispatchEvent(event);
}catch(err){ GM_logError("raiseEvent","name="+name,"",err);}
}
function raiseEventTop(name){
try{
    // should be called from frame-documents to inform the top-document(main.php)
    // if frame is top itself (=multi-window gaming) it instead saves to variable and do_main will raise the event in the main-window
    if((PAGE!="main")&&(self==top)){
        window.setTimeout(function(){
            if(DEVMODE_EVENTS){ logBubble.add("raiseEventTop set "+name); }
            var raisedEvents = explode(GM_getValue(COUNTRY+"_"+SERVER+"_"+USERNAME+"_raisedEvents"),"raiseEventTop","{}");
            raisedEvents[name] = PAGE;
            GM_setValue(COUNTRY+"_"+SERVER+"_"+USERNAME+"_raisedEvents",implode(raisedEvents));
        },0);
    } else {
        if(DEVMODE_EVENTS){ logBubble.add("raiseEventTop "+name); }
        var event = top.document.createEvent("Event");
        event.initEvent(name, true, true);
        top.document.dispatchEvent(event);
    }
}catch(err){ GM_logError("raiseEventTop","name="+name,"",err);}
}

function click(node){
try{
    var event=new MouseEvent('click',{'view':window,'bubbles':true,'cancelable':true});
    node.dispatchEvent(event);
    if(DEVMODE){
        var T = node;
        var str = T.id;
        while(!T.id){
            T = T.parentNode;
            str += ".child";
        }
        GM_logInfo("click","node.id="+(node&&node.id?node.id:"?"),"","Click on "+str);
    }
    // if (node.href){ location.href = node.href; }
}catch(err){
    GM_logError("click","node.id="+(node&&node.id?node.id:"?"),"",err);
    throw ("ERROR in function 'click'");
}
}
function dblclick(node){
try{
    var event = document.createEvent("MouseEvents");
    event.initEvent("dblclick", true, true);
    node.dispatchEvent(event);
    // if (node.href){ location.href = node.href; }
}catch(err){
    GM_logError("dblclick","node.id="+(node&&node.id?node.id:"?"),"",err);
    throw ("ERROR in function 'dblclick'");
}
}
function mouseover(node){
try{
    var event = document.createEvent("MouseEvents");
    event.initEvent("mouseover", true, true);
    node.dispatchEvent(event);
}catch(err){
    GM_logError("mouseover","node.id="+(node&&node.id?node.id:"?"),"",err);
    throw ("ERROR in function 'mouseover'");
}
}
function mouseout(node){
try{
    var event = document.createEvent("MouseEvents");
    event.initEvent("mouseout", true, true);
    node.dispatchEvent(event);
}catch(err){
    GM_logError("mouseout","node.id="+(node&&node.id?node.id:"?"),"",err);
    throw ("ERROR in function 'mouseout'");
}
}
function change(node){
try{
    var event = document.createEvent("MouseEvents");
    event.initEvent("change", true, true);
    node.dispatchEvent(event);
}catch(err){
    GM_logError("change","node.id="+(node&&node.id?node.id:"?"),"",err);
    throw ("ERROR in function 'change'");
}
}
function keyup(node,keycode,ctrlKeyArg,altKeyArg,shiftKeyArg) {
try{
    if (!keycode) keycode=0;
    var event = document.createEvent("KeyboardEvent");
    event.initKeyEvent(
        "keyup",                    //  in DOMString typeArg,
        true,                           //  in boolean canBubbleArg,
        true,                           //  in boolean cancelableArg,
        null,                           //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.
        !!ctrlKeyArg,           //  in boolean ctrlKeyArg,
        !!altKeyArg,            //  in boolean altKeyArg,
        !!shiftKeyArg,      //  in boolean shiftKeyArg,
        false,                      //  in boolean metaKeyArg,
        keycode,                    //  in unsigned long keyCodeArg,
        0);
    node.dispatchEvent(event);
}catch(err){
    GM_logError("keyup","node.id="+(node&&node.id?node.id:"?")+" keycode="+keycode+" ctrlKeyArg="+ctrlKeyArg+" altKeyArg="+altKeyArg+" shiftKeyArg="+shiftKeyArg,"",err);
    throw ("ERROR in function 'keyup'");
}
}
function keydown(node,keycode,ctrlKeyArg,altKeyArg,shiftKeyArg){
try{
    if (!keycode) keycode=0;
    var event = document.createEvent("KeyboardEvent");
    event.initKeyEvent(
        "keydown",              //  in DOMString typeArg,
        true,                           //  in boolean canBubbleArg,
        true,                           //  in boolean cancelableArg,
        null,                           //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.
        !!ctrlKeyArg,           //  in boolean ctrlKeyArg,
        !!altKeyArg,            //  in boolean altKeyArg,
        !!shiftKeyArg,      //  in boolean shiftKeyArg,
        false,                      //  in boolean metaKeyArg,
        keycode,                    //  in unsigned long keyCodeArg,
        0);
    node.dispatchEvent(event);
}catch(err){
    GM_logError("keydown","node.id="+(node&&node.id?node.id:"?")+" keycode="+keycode+" ctrlKeyArg="+ctrlKeyArg+" altKeyArg="+altKeyArg+" shiftKeyArg="+shiftKeyArg,"",err);
    throw ("ERROR in function 'keydown'");
}
}

var timeMeasure = new Object();
function timeMeasureStart(str){
try{
    timeMeasure[str] = (new Date()).getTime();
}catch(err){ GM_logError("timeMeasureStart","str="+str,"",err); }
}
function timeMeasureStop(str){
try{
    if(timeMeasure[str]){
        GM_logInfo("timeMeasure","str="+str,"",((new Date()).getTime()-timeMeasure[str])+"ms");
        delete timeMeasure[str];
    }
}catch(err){ GM_logError("timeMeasureStop","str="+str,"",err); }
}

//---------------------------------------------------------------------------------------------------------------------------

function getElementLeft(id,toElem) {
try{
    var element = document.getElementById(id);
    xPos = element.offsetLeft;
    tempEl = element.offsetParent;
        while (tempEl != toElem.parenNode) {
            xPos += tempEl.offsetLeft;
            tempEl = tempEl.offsetParent;
        }
    return parseInt(xPos,10);
}catch(err){ GM_logError("getElementLeft","id="+id,"",err); }
}
function getElementTop(id,toElem) {
try{
    var element = document.getElementById(id);
    yPos = element.offsetTop;
    tempEl = element.offsetParent;
    while (tempEl != toElem.parenNode) {
            yPos += tempEl.offsetTop;
            tempEl = tempEl.offsetParent;
        }
    return parseInt(yPos,10);
}catch(err){ GM_logError("getElementTop","id="+id,"",err); }
}
function getOffset(el){
try{
    var _x = 0;
    var _y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)){
        if(el.style.position){
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
        }
        el = el.offsetParent; //.parentNode
    }
    return { top: _y, left: _x };
}catch(err){ GM_logError("getOffset","","",err); }
}
function insertAfter(newNode, refNode){
try{
    return refNode.nextSibling ? refNode.parentNode.insertBefore(newNode, refNode.nextSibling) : refNode.parentNode.appendChild(newNode);
}catch(err){ GM_logError("insertAfter","","",err); }
}
function removeAllCSS(reg){
try{
// The function seems to be not working. 
// "SecurityError: The operation is insecure."
return; 
    for (var i = document.styleSheets.length - 1; i >= 0; i--) {
        for (var j = document.styleSheets[i].cssRules.length - 1; j >= 0; j--) {
            if(document.styleSheets[i].cssRules[j].selectorText&&(document.styleSheets[i].cssRules[j].selectorText.match(reg))){
                document.styleSheets[i].deleteRule(j);
            }
        }
    }
}catch(err){ GM_logError("removeAllCSS","reg="+reg,"i="+i+" j="+j,err); }
}

//---------------------------------------------------------------------------------------------------------------------------
// TODO name? timeStr, getTimeStr, time2timestr, time2str, 2->To ?
function getTimeStr(time,hideSeconds){ // was int2timestr
// returns like "1d 12:30:42"
try{
    var str,help;
    if(time<0){ time *= -1; }
    if (hideSeconds) {
        str = timeFormatHM;
    } else {
        str = timeFormatHMS;
        help = time%60;
        str = str.replace("sec",((help<10)?"0":"")+Math.floor(help));
    }
    time=time/60;
    help = time%60;
    str = str.replace("min",((help<10)?"0":"")+Math.floor(help));
    time=time/60;
    help = time%24;
    str = str.replace("hour",((help<10)?"0":"")+Math.floor(help));
    time=time/24;
    if (time>=1){ str=Math.floor(time)+"d&nbsp;"+str; }
    return str;
}catch(err){ GM_logError("getTimeStr","time="+time+" hideSeconds="+hideSeconds,"",err); }
}
// TODO this includes the call of str2seconds(str)
// TODO name? getTime, timestr2time, str2time, 2->To ?

function getTime(str){ // was timestr2int
try{
    var help1 = null;
    var help;
    if(help=(/(\d+):(\d+):(\d+)/.exec(str))){
        help1 = [parseInt(help[1],10),parseInt(help[2],10),parseInt(help[3],10)];
        str = str.replace(/(\d+):(\d+):(\d+)/,"");
    }else if(help=(/(\d+):(\d+)/.exec(str))){
        help1 = [parseInt(help[1],10),parseInt(help[2],10),0];
        str = str.replace(/(\d+):(\d+)/,"");
    }else{
        help1 = [0,0,0];
    }
    if(help=(/(\d+)\.(\d+)\.(\d+)/.exec(str))){
        help[1] = parseInt(help[1],10);
        help[2] = parseInt(help[2],10)-1;
        help[3] = parseInt(help[3],10);
        if(help[3]<100){ help[3] += 2000; }
        return ((new Date(help[3],help[2],help[1],help1[0],help1[1],help1[2])).getTime()/1000);
    }else if(help=(/(\d+)\.(\d+)/.exec(str))){
        help[1] = parseInt(help[1],10)-1;
        help[2] = parseInt(help[2],10);
        if(help[2]<100){ help[2] += 2000; }
        return ((new Date(help[2],help[1],1,help1[0],help1[1],help1[2])).getTime()/1000);
    }else if(help=(/(\d+)-(\d+)/.exec(str))){
        help[1] = parseInt(help[1],10);
        help[2] = parseInt(help[2],10)-1;
        if(help[1]<100){ help[1] += 2000; }
        return ((new Date(help[1],help[2],1,help1[0],help1[1],help1[2])).getTime()/1000);
    }else if(help=(/(\d+)/.exec(str))){
        help[1] = parseInt(help[1],10);
        if(help[1]<100){ help[1] += 2000; }
        return ((new Date(help[1],0,1,help1[0],help1[1],help1[2])).getTime()/1000);
    }else{
        return ((Date.UTC(1970,0,1,help1[0],help1[1],help1[2]))/1000);
    }
}catch(err){ GM_logError("getTime","str="+str,"",err); }
}
/*
function getTime(str){ // was timestr2int
    var help = null;
    var help2;
    if(str.match(/\d+\.\d+\.\d+/)){
        if(str.match(/\d+\.\d+\.\d+.*\d+:\d+:\d+/)){
                help = [,,,,,];
                help2 = (/(\d+)\.(\d+)\.(\d+).*(\d+):(\d+):(\d+)/).exec(str);
                help[0] = parseInt(help2[3],10);
                help[1] = parseInt(help2[2],10);
                help[2] = parseInt(help2[1],10);
                help[3] = parseInt(help2[4],10);
                help[4] = parseInt(help2[5],10);
                help[5] = parseInt(help2[6],10);
        } else if(str.match(/\d+:\d+:\d+.*\d+\.\d+\.\d+/)){
                help = [,,,,,];
                help2 = (/(\d+):(\d+):(\d+).*(\d+)\.(\d+)\.(\d+)/).exec(str);
                help[0] = parseInt(help2[6],10);
                help[1] = parseInt(help2[5],10);
                help[2] = parseInt(help2[4],10);
                help[3] = parseInt(help2[1],10);
                help[4] = parseInt(help2[2],10);
                help[5] = parseInt(help2[3],10);
        } else {
            if(str.match(/\d+\.\d+\.\d+.*\d+:\d+/)){
                help = [,,,,,0];
                help2 = (/(\d+)\.(\d+)\.(\d+).*(\d+):(\d+)/).exec(str);
                help[0] = parseInt(help2[3],10);
                help[1] = parseInt(help2[2],10);
                help[2] = parseInt(help2[1],10);
                help[3] = parseInt(help2[4],10);
                help[4] = parseInt(help2[5],10);
            } else if(str.match(/\d+:\d+.*\d+\.\d+\.\d+/)){
                help = [,,,,,0];
                help2 = (/(\d+):(\d+).*(\d+)\.(\d+)\.(\d+)/).exec(str);
                help[0] = parseInt(help2[5],10);
                help[1] = parseInt(help2[4],10);
                help[2] = parseInt(help2[3],10);
                help[3] = parseInt(help2[1],10);
                help[4] = parseInt(help2[2],10);
            } else {
                help = [,,,0,0,0];
                help2 = (/(\d+)\.(\d+)\.(\d+)/).exec(str);
                help[0] = parseInt(help2[3],10);
                help[1] = parseInt(help2[2],10);
                help[2] = parseInt(help2[1],10);
            }
        }
        if(help){
            if(help[0]<100){ help[0]+=2000; }
            return ((new Date(help[0],help[1]-1,help[2],help[3],help[4],help[5])).getTime()/1000);
        }
    } else {
        if(str.match(/\d+:\d+:\d+/)){
            help = [,,];
            help2 = (/(\d+):(\d+):(\d+)/).exec(str);
            help[0] = parseInt(help2[1],10);
            help[1] = parseInt(help2[2],10);
            help[2] = parseInt(help2[3],10);
        } else if(str.match(/\d+:\d+/)){
            help = [,,0];
            help2 = (/(\d+):(\d+)/).exec(str);
            help[0] = parseInt(help2[1],10);
            help[1] = parseInt(help2[2],10);
        }
        if(help){
            return ((Date.UTC(1970,0,1,help[0],help[1],help[2]))/1000);
        }
    }
    GM_logInfo("getTime","str="+str,"","Failed");
    return 0;
}
*/
function getFormattedTime(str){
try{
    var help = null;
    var regDate = dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","\\d+").replace(/\./g,"\\.");
    var regTime = timeFormatHMS.replace("hour","\\d+").replace("min","\\d+").replace("sec","\\d+").replace(/\./g,"\\.");
    if(str.match(new RegExp(regDate))){
        if(str.match(new RegExp(regDate+".*"+regTime))){
                help = [,,,,,];
                help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
                str = str.replace(new RegExp(regDate),"");
                help[3] = parseInt((new RegExp(timeFormatHMS.replace("hour","(\\d+)").replace("min","\\d+").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[4] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","(\\d+)").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[5] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","\\d+").replace("sec","(\\d+)").replace(".","\\."))).exec(str)[1],10);
        } else if(str.match(new RegExp(regTime+".*"+regDate))){
                help = [,,,,,];
                help[3] = parseInt((new RegExp(timeFormatHMS.replace("hour","(\\d+)").replace("min","\\d+").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[4] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","(\\d+)").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[5] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","\\d+").replace("sec","(\\d+)").replace(".","\\."))).exec(str)[1],10);
                str = str.replace(new RegExp(regTime),"");
                help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
        } else {
            regTime = timeFormatHM.replace("hour","\\d+").replace("min","\\d+").replace(".","\\.");
            if(str.match(new RegExp(regDate+".*"+regTime))){
                help = [,,,,,0];
                help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
                str = str.replace(new RegExp(regDate),"");
                help[3] = parseInt((new RegExp(timeFormatHM.replace("hour","(\\d+)").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[4] = parseInt((new RegExp(timeFormatHM.replace("hour","\\d+").replace("min","(\\d+)").replace(".","\\."))).exec(str)[1],10);
            } else if(str.match(new RegExp(regTime+".*"+regDate))){
                help = [,,,,,0];
                help[3] = parseInt((new RegExp(timeFormatHM.replace("hour","(\\d+)").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[4] = parseInt((new RegExp(timeFormatHM.replace("hour","\\d+").replace("min","(\\d+)").replace(".","\\."))).exec(str)[1],10);
                str = str.replace(new RegExp(regTime),"");
                help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
            } else {
                help = [,,,0,0,0];
                help[0] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","\\d+").replace("year","(\\d+)").replace("hour","\\d+").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[1] = parseInt((new RegExp(dateFormatDMY.replace("day","\\d+").replace("month","(\\d+)").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[2] = parseInt((new RegExp(dateFormatDMY.replace("day","(\\d+)").replace("month","\\d+").replace("year","\\d+").replace(".","\\."))).exec(str)[1],10);
            }
        }
        if(help){
            if(help[0]<100){ help[0]+=2000; }
            return ((new Date(help[0],help[1]-1,help[2],help[3],help[4],help[5])).getTime()/1000);
        }
    } else {
        if(str.match(new RegExp(regTime))){
            help = [,,];
            help[0] = parseInt((new RegExp(timeFormatHMS.replace("hour","(\\d+)").replace("min","\\d+").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
            help[1] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","(\\d+)").replace("sec","\\d+").replace(".","\\."))).exec(str)[1],10);
            help[2] = parseInt((new RegExp(timeFormatHMS.replace("hour","\\d+").replace("min","\\d+").replace("sec","(\\d+)").replace(".","\\."))).exec(str)[1],10);
        } else {
            regTime = timeFormatHM.replace("hour","\\d+").replace("min","\\d+").replace(".","\\.");
            if(str.match(new RegExp(regTime))){
                help = [,,0];
                help[0] = parseInt((new RegExp(timeFormatHM.replace("hour","(\\d+)").replace("min","\\d+").replace(".","\\."))).exec(str)[1],10);
                help[1] = parseInt((new RegExp(timeFormatHM.replace("hour","\\d+").replace("min","(\\d+)").replace(".","\\."))).exec(str)[1],10);
            }
        }
        if(help){
            return ((Date.UTC(1970,0,1,help[0],help[1],help[2]))/1000);
        }
    }
    GM_logWarning("getFormattedTime","str="+str,"","Format did not match. Function returns 0.");
    return 0;
}catch(err){ GM_logError("getFormattedTime","str="+str,"",err); }
}
//TODO name? getDaytime, time2daytime
function getDaytimeStr(time,hideSeconds,paddHours){ // was uhrzeit
try{
    var time2 = new Date(time*1000);
    var str,help;
    if (hideSeconds) {
        str = timeFormatHM;
    } else {
        str = timeFormatHMS;
        help = time2.getSeconds();
        str = str.replace("sec",((help<10)?"0":"")+Math.floor(help));
    }
    help = time2.getMinutes();
    str = str.replace("min",((help<10)?"0":"")+Math.floor(help));
    help = time2.getHours();
    str = str.replace("hour",((!!paddHours && help<10)?"0":"")+Math.floor(help));
    return str;
}catch(err){ GM_logError("getDaytimeStr","time="+time+" hideSeconds="+hideSeconds+" paddHours="+paddHours,"",err); }
}
/*
function getDateStr(time,hideyear){ //TODO CHANGED THE ARGUMENTS
    var time2 = new Date(time*1000);
    str="";
    if (time2.getDate()<10) { str += "0"; }
    str += time2.getDate() +".";
    if (time2.getMonth()<9) { str += "0"; }
    str += (1+time2.getMonth())+".";
    if (!hideyear) str += (time2.getFullYear());
    return str;
}
*/
//TODO name? getDate, time2date
function getDateStr(time,yearformat,padd){ //in seconds //was datum
// yearformat:
// 0 -> 01.02.
// 1 -> 01.02.11
// 2 -> 01.02.2011 (default)
// padd:
// true -> 01.02.2011 (default)
// false -> 1.2.2011
try{
    if(typeof yearformat!="number"){ yearformat = 2; }
    if(typeof padd!="boolean"){ padd = true; }

    var time2 = new Date(time*1000);
    var str,help;
    switch(yearformat){
        case 0: str = "day.month"; break;
        case 1: str = ("day.month.year").replace("year",time2.getFullYear().toString().slice(-2)); break;
        case 2: str = ("day.month.year").replace("year",time2.getFullYear()); break;
    }
    help = time2.getDate();
    str = str.replace("day",((padd&&help<10)?"0":"")+help);
    help = 1+time2.getMonth();
    str = str.replace("month",((padd&&help<10)?"0":"")+help);
    return str;
}catch(err){ GM_logError("getDateStr","time="+time+" yearformat="+yearformat+" padd="+padd,"",err); }
}
function getFormattedDateStr(time,yearformat,padd){
// yearformat:
// 0 -> 01.02.
// 1 -> 01.02.11
// 2 -> 01.02.2011 (default)
// padd:
// true -> 01.02.2011 (default)
// false -> 1.2.2011
try{
    if(typeof yearformat!="number"){ yearformat = 2; }
    if(typeof padd!="boolean"){ padd = true; }

    var time2 = new Date(time*1000);
    var str,help;
    switch(yearformat){
        case 0: str = dateFormatDM; break;
        case 1: str = dateFormatDMY.replace("year",time2.getFullYear().toString().slice(-2)); break;
        case 2: str = dateFormatDMY.replace("year",time2.getFullYear()); break;
    }
    help = time2.getDate();
    str = str.replace("day",((padd&&help<10)?"0":"")+help);
    help = 1+time2.getMonth();
    str = str.replace("month",((padd&&help<10)?"0":"")+help);
    return str;
}catch(err){ GM_logError("getFormattedDateStr","time="+time+" yearformat="+yearformat+" padd="+padd,"",err); }
}
//TODO name? getDateText
function getDateText(time,yearformat){ // was datumDay
try{
    var time2 = Math.floor(time);
    var today = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate(),0,0,0)/1000; //begin of this day.
    if (time2 < today){
        return getFormattedDateStr(time,yearformat);
    } else if (time2 < (today+(1*24*60*60))){
        return getText("day0");
    } else if (getText("day1") && (time2 < (today+(2*24*60*60)))){
        return getText("day1");
    } else if (getText("day2") && (time2 < (today+(3*24*60*60)))){
        return getText("day2");
    } else {
        return getFormattedDateStr(time,yearformat);
    }
}catch(err){ GM_logError("getDateText","time="+time+" yearformat="+yearformat,"",err); }
}
function countDays(time1,time2){ //in seconds
// returns number of days from 1 to 2. for example 0 if both on one day.
// calculate times of midnight
try{
    time1 = new Date(Math.round(time1*1000));
    time1 = ((new Date(time1.getFullYear(),time1.getMonth(),time1.getDate())).getTime())/1000;
    time2 = new Date(Math.round(time2*1000));
    time2 = ((new Date(time2.getFullYear(),time2.getMonth(),time2.getDate())).getTime())/1000;
    return Math.round((time2-time1)/86400);
}catch(err){ GM_logError("countDays","time1="+time1+" time2="+time2,"",err); }
}
//---------------------------------------------------------------------------------------------------------------------------
function explode(str,debugName,defaultReturn,depth){
try{
    if(debugName==undefined){
        debugName = "";
        GM_logWarning("explode","debugName="+debugName,"","DebugName not set.");
    }else if(typeof defaultReturn==undefined){
        GM_logWarning("explode","debugName="+debugName,"","DefaultReturn not set.");
    }
        if(str==undefined){
            throw ("Argument is undefined.");
        }
        if(typeof str != "number" && typeof str != "string"){
            throw ("Argument is not a string nor a number.");
        }
//  if(str==""){ return undefined; }
        var help = eval('(' + str + ')');
        // if(defaultReturn==undefined){
            return help;
        // }
}catch(err){
    if(typeof defaultReturn==undefined){
        GM_logError("explode","debugName="+debugName+" defaultReturn=","",err);
        throw ("ERROR in function 'explode'");
    } else {
        GM_logWarning("explode","debugName="+debugName+" defaultReturn="+JSON.stringify(defaultReturn),"","Function returns given default. "+err);
        return defaultReturn;
    }
}
    /*
    try{
        function recusiveCheck(h,d,lvl,dpth){
            var i, correct=true;
            for(var i in d){
                if(!d.hasOwnProperty(i)){continue;}
                if(!((typeof h[i])==(typeof d[i]))||!((h[i] instanceof Array)==(d[i] instanceof Array))){
                    return false;
                }
                if(typeof d[i]=="object" && lvl<dpth && !recusiveControl(h[i],d[i],lvl+1,dpth)){
                    return false;
                }
            }
            return correct;
        }
        var correct=false;
        if(((typeof help)==(typeof defaultReturn))&&((help instanceof Array)==(defaultReturn instanceof Array))){
            correct=true;
            if(!isNaN(depth)&&depth>1&&!recusiveCheck(help,defaultReturn,0,depth)){
                correct=false;
            }
        }
        if(correct){
            return help;
        }else{
            return defaultReturn;
        }
    }catch(err){
        return help;
    }
    */
}
function implode(arr,debugName){
try{
    if(debugName==undefined){
        GM_logWarning("implode","arr="+JSON.stringify(arr),"","DebugName not set.");
        debugName = "";
    }
    var line = new String();
    var InternalCounter = -1;
    var NoKey = new Boolean(false);
    if (arr == undefined){ return ""; }
    if (typeof arr == "function"){ return "function"; }
    if (typeof arr == "string"){ return arr; }
    if (typeof arr == "boolean"){ return arr.toString(); }
    if (typeof arr == "number"){ return arr.toString(); }
    if (typeof arr != "object"){ throw("Argument is not an Object or Array. Type is " + typeof arr +".\n"); }
    var type = (arr instanceof Array); //true->array | false->object

    line = (type)?"[":"{";
    for(var i in arr ){
        try{
            if(!arr.hasOwnProperty(i)){continue;}
            InternalCounter++;
            if (type){
                while (i>InternalCounter){
                    line += ",";
                    InternalCounter++;
                }
            }else{
                line += "\"" + i + "\":";
            }
            if (typeof arr[i] == "number" || typeof arr[i] == "boolean"){
                line += arr[i];
            } else if (typeof arr[i] == "string"){
                line += "\"" + arr[i].replace(/\\/g,"\\\\").replace(/\"/g,"\\\"") + "\"";
            } else if(typeof arr[i] == "undefined"){
                line += 'undefined';
            } else if(arr[i]==null){
                line += 'null';
            } else {
                line += implode(arr[i],debugName);
            }
            line += ",";
        }catch(err){
            // GM_logError("implode","debugName="+debugName,"i="+i,err);
        }
    }
    var endChar = line.substring(line.length-1,line.length);
    return line.substring(0,line.length-1) + (("{[".indexOf(endChar)!=-1)? endChar:"")+ ((type)?"]":"}");
} catch (err){
    GM_logError("implode","debugName="+debugName,"",err);
    throw ("ERROR in function 'implode'");
}
}
function enc(str,sh) {
try{
    var encoded = "";
    for (i=0; i<str.length;i++) {
        encoded = encoded+String.fromCharCode(str.charCodeAt(i)+sh);
    }
    return encoded;
}catch(err){ GM_logError("enc","str="+str+" sh="+sh,"",err); }
}
function print_r(arr,line,showType,linebreak){
try{
    var str = new String();
    if (!line){ line=""; }
    if (!showType){ showType=false; }
    if (!linebreak){ linebreak="<br/>"; }
    if(typeof arr == "object"){
        for (var i in arr ){
            try{
                if(!arr.hasOwnProperty(i)){ continue; }
                var type = (arr instanceof Array);
                // GM_logInfo("print_r","","","i:" + i + " : " + typeof arr[i] + " | " + arr + "\n");
                if (typeof arr[i] == "string" || typeof arr[i] == "number" || typeof arr[i] == "boolean") {
                    str += line + (type?"[":"{") + i + (type?"]":"}") + " = " + arr[i] + ((showType)?" ("+typeof(arr[i])+")":"") + linebreak;
                } else if(typeof arr[i] == "undefined"){
                    str += line + (type?"[":"{") + i + (type?"]":"}") + " = " + linebreak;
                } else if(typeof arr[i] != "function"){
                    str += print_r(arr[i],line +(type?"[":"{") + i + (type?"]":"}"),showType,linebreak);
                }
            }catch(err){
                GM_logError("print_r","","i="+i,err);
                continue;
            }
        }
        if(!i){str += line + " = " + "undefined" + linebreak;}
    }else{
        str += " = " + arr;
    }
    return str;
} catch (err){
    GM_logError("print_r","","",err);
    throw ("ERROR in function 'print_r'");
}
}
function print_r_time(arr,line){
try{
    var str = new String();
//      for (var i = 0; i < arr.length; i++){
    for (var i in arr){
        try{
            if(!arr.hasOwnProperty(i)){ continue; }
            // GM_logInfo("print_r_time","","i="+i+" arr="+typeof arr[i]+"|"+arr,"");
            if (typeof arr[i] == "string" || typeof arr[i] == "number" || typeof arr[i] == "boolean") {
                str += line + "[" + i + "] = " + getDaytimeStr(arr[i]) + "<br/>";
            } else if(typeof arr[i] == "undefined"){
                str += line + "[" + i + "] = " + "<br/>";
            } else {
                str += print_r_time(arr[i],line +"[" + i + "]");
            }
        }catch(err){
            GM_logError("print_r_time","","i="+i,err);
            continue;
        }
    }
    if(!i){str += line + " = " + "undefined" + "<br/>";}
    return str;
} catch (err){
    GM_logError("print_r_time","","",err);
    throw ("ERROR in function 'print_r_time'");
}
}
function Log(obj,pre){
try{
    if(true){
        if(pre==undefined){ pre=""; }
        if(typeof(obj)=="object"){
            for(var v in obj){
                if(!obj.hasOwnProperty(v)){ continue; }
                Log(obj[v],pre+v+" : ");
            }
        } else if(typeof(obj)!="function"){
            GM_logWarning("Log","obj="+obj+" pre="+pre,"","");
        }
    }
}catch(err){ GM_logError("Log","obj="+obj+" pre="+pre,"",err); }
}

//---------------------------------------------------------------------------------------------------------------------------

function produktPic(type,product,append){
try{
    var prodNum = isNaN(parseInt(product,10))?prodId[product]:parseInt(product,10);
    var type = parseInt(type,10);
    var newdiv = createElement("div",{"type":type,"prod":prodNum,"style":"display:inline-block;position:relative;margin-right:3px;border:none;vertical-align:bottom;"});
    switch(type){
    case 0:case 4:
        if (prodNum>0){
            newdiv.setAttribute("class","kp"+prodNum);
        } else {
            createElement("img",{"src":GFX+"menu/coins.gif","style":"height:15px;width:15px;border:none;top:0px;vertical-align:bottom;"},newdiv);
        }
    break;
    case 1: newdiv.setAttribute("class","f_m_symbol"+prodNum); break;
    case 2: newdiv.setAttribute("class","fmm"+prodNum); break;
    case 3: newdiv.setAttribute("class","fmm"+prodNum); break;
    default: throw("Unknown type");
    }
    if (append){ append.appendChild(newdiv); }
    return newdiv;
} catch(err){ 
    GM_logError("produktPic","type="+type+" product="+product,"",err);
    return null; 
}
}
function numberFormat(number,decimals,dec_point,thousands_sep){
// http://kevin.vanzonneveld.net
// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +     bugfix by: Michael White (http://getsprink.com)
// +     bugfix by: Benjamin Lupton
// +     bugfix by: Allan Jensen (http://www.winternet.no)
// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
// +     bugfix by: Howard Yeend
// +    revised by: Luke Smith (http://lucassmith.name)
// +     bugfix by: Diogo Resende
// +     bugfix by: Rival
// %        note 1: For 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6
// *     example 1: numberFormat(1234.56);
// *     returns 1: '1,235'
// *     example 2: numberFormat(1234.56, 2, ',', ' ');
// *     returns 2: '1 234,56'
// *     example 3: numberFormat(1234.5678, 2, '.', '');
// *     returns 3: '1234.57'
// *     example 4: numberFormat(67, 2, ',', '.');
// *     returns 4: '67,00'
// *     example 5: numberFormat(1000);
// *     returns 5: '1,000'
// *     example 6: numberFormat(67.311, 2);
// *     returns 6: '67.31'
try{
    var n = number, prec = decimals;
    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);
    var sep = (typeof thousands_sep == "undefined") ? delimThou : thousands_sep; // changed!
    var dec = (typeof dec_point == "undefined") ? delimDeci : dec_point; // changed!

    var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

    var abs = Math.abs(n).toFixed(prec);
    var _, i;

    if (abs >= 1000) {
        _ = abs.split(/\D/);
        i = _[0].length % 3 || 3;

        _[0] = s.slice(0,i + (n < 0)) +
            _[0].slice(i).replace(/(\d{3})/g, sep+'$1');

        s = _.join(dec);
    } else {
        s = s.replace('.', dec);
    }
    return s;
}catch(err){ 
    GM_logError("numberFormat","number="+number,"",err);
    return ""; 
}
}
function numberFormatPrefixed(number){
// results: 1; 21; 321; 4.321; 54k; 654k; 7.654k; 87M
try{
    if(number>=10000000){
        return numberFormat(Math.floor(number/1000000))+"M";
    }else if(number>=10000){
        return numberFormat(Math.floor(number/1000))+"k";
    }else{
        return numberFormat(number);
    }
}catch(err){ 
    GM_logError("numberFormatPrefixed","number="+number,"",err);
    return ""; 
}
}
function moneyFormat(number){
try{
    return numberFormat(number,2)+"&nbsp;"+getText("gamecurrency");
}catch(err){ GM_logError("moneyFormat","number="+number,"",err); }
}
function moneyFormatInt(number){
try{
    return numberFormat(number,0)+"&nbsp;"+getText("gamecurrency");
}catch(err){ GM_logError("moneyFormatInt","number="+number,"",err); }
}
function moneyFormatLimit(number,limit){
try{
    return (number>limit?moneyFormatInt(number):moneyFormat(number));
}catch(err){ GM_logError("moneyFormatLimit","number="+number+" limit="+limit,"",err); }
}

function pointsFormat(number,containertype,append){
try{
    var newspan = createElement(containertype,{"style":"white-space:nowrap;"},append?append:false);
    newspan.addEventListener("mouseover",function(event){ toolTip.show(event,getText("points")); },false);
//  createElement("img",{"src":GFX+"points.gif","style":"border:0px;width:12px;height:12px;margin-right:2px;"},newspan);
    createElement("img",{"src":"data:image/gif;base64,R0lGODlhHgAeAMQfAP/ilv/Zdv/SWdikGv/VZkQ0CP/EJYhnEXdaDvO5HuqyHf/dgv/npf/MRLeLFpZyEsWWGP/FK//KO/7BH+KsHP/PT//gjqN8FP/HMayDFW1TDf/INWNLDH5gD6dmAAAAACH5BAEAAB8ALAAAAAAeAB4AAAX/4CeO5OgthFeubOtZaSu7b6rOuOgBljDdudluUVEAgyzPa9GgKJEui4VJcRyhJmlAUr1ilQCURAF5Yk2MMEGSoCS8JKV8rmRYAoLNZGKg+wkBCxYADIWGag0YBhESFYALC3gSEwoDHhINAo+DPCgVEhERGA0VAqYNEVUXD3MJE6OaBAQCnxEGixi5BmQPCBxyOh4OEAMJjA0SG7a3EwlkFx0F0mYmSg8ZEAp8tnuUAxkI0gXASR4XDgPazM0DDgfi1DQerswJzt/h5DkeohETFAMCQoA27gsyA1UyZHDg4MIBDXBoCBiToQOCDg8erOoQTwiBChMycBCnAeODAwciTq7wIAADBA3TPBQoiTJlECUNBkQbJ0cDzZQqTTRQ8CBmMJ8XbeKYd+FXvJ4aEAT9oAQCx4hKEEgN6mHAhY4llHRQ6qLMVKoeyJY7G+xKCAA7","style":"border:0px;width:12px;height:12px;margin-right:2px;"},newspan);
    createElement("span",{},newspan,numberFormat(number));
    return newspan;
}catch(err){ GM_logError("pointsFormat","number="+number+" containertype="+containertype,"",err); }
}
function coinsFormat(number,append){
try{
    var newdiv = createElement("div",{"style":"display:inline-block;height:16px;"});
    newdiv.addEventListener("mouseover",function(event){ toolTip.show(event,prodName[0]); },false);
    var newdiv1 = produktPic(0,0,newdiv);
    createElement("span",{},newdiv,numberFormat(number));
    if (append) append.appendChild(newdiv);
    return newdiv;
}catch(err){ GM_logError("coinsFormat","number="+number,"",err); }
}
function getForestryUserBuilding(pos){
try{
    if(unsafeWindow.forestry_user_buildings!=undefined&&pos!=undefined){
        for(var building in unsafeWindow.forestry_user_buildings){
            if(!unsafeWindow.forestry_user_buildings.hasOwnProperty(building)){continue;}
            if(unsafeWindow.forestry_user_buildings[building]["position"]==pos){
                return pos;
            }
        }
    }
    return false;
}catch(err){ GM_logError("coinsFormat","pos="+pos,"",err); }
}
//---------------------------------------------------------------------------------------------------------------------------

function getRandom(min,max){
try{
    if ( min > max ){return( -1 );  }
    if ( min == max ){return( min );}
    return( min + parseInt( Math.random() * ( max-min+1 ),10 ) );
}catch(err){ GM_logError("getRandom","min="+min+" max="+max,"",err); }
}
function compareVersions(version1,version2){
// returns -1 if ver1<ver2
// returns 0 if ver1=ver2
// returns +1 if ver1>ver2
try{
    if(version1==version2){
        return 0;
    } else {
        var ver1 = /(\d+)\.*(.*)/.exec(version1);
        var ver2 = /(\d+)\.*(.*)/.exec(version2);
        if(parseInt(ver1[1],10)<parseInt(ver2[1],10)){
            return -1;
        } else if(ver1[1]==ver2[1]){
            if(ver1[2]==""){ return -1; }
            if(ver2[2]==""){ return 1; }
            return compareVersions(ver1[2],ver2[2]);
        } else {
            return 1;
        }
    }
}catch(err){ GM_logError("compareVersions","version1="+version1+" version2="+version2,"",err); }
}

function alert2(text,yesText,noText,yesFkt,noFkt){
try{
    var newdiv = createElement("div",{"style":"display:block;z-index:9999;position:fixed;top:0px;left:0px;width:100%;height:100%;"},top.document.body);
    createElement("div",{"style":"display:block;position:fixed;top:0px;left:0px;width:100%;height:100%;background-color:black;opacity:0.7;"},newdiv);
    newdiv = createElement("div",{"style":"display:block;position:fixed;width:300px;top:50%;left:50%;margin-left:-180px;padding:30px;background-color:yellow;border:3px solid black;border-radius:10px;color:black;font-weight:bold;"},newdiv);
    createElement("div",{"style":"position:relative;color:black;font-weight:bold;"},newdiv,text);
    var newdiv1 = createElement("div",{"style":"position:relative;height:37px;witdh:100%;color:black;font-weight:bold;"},newdiv);
    var newbutton = createElement("button",{"type":"button","class":"link","style":"position:absolute;top:20px;left:30px;width:100px;font-weight:bold;"},newdiv1,yesText);
    newbutton.addEventListener("click",function(){
        if(typeof yesFkt=="function"){ yesFkt(); }
        removeElement(this.parentNode.parentNode.parentNode);
    },false);
    if(noText){
        newbutton = createElement("button",{"type":"button","class":"link","style":"position:absolute;top:20px;right:30px;width:100px;font-weight:bold;"},newdiv1,noText);
        newbutton.addEventListener("click",function(){
            if(typeof noFkt=="function"){ noFkt(); }
            removeElement(this.parentNode.parentNode.parentNode);
        },false);
    }
    newdiv.style.marginTop = -(newdiv.offsetHeight/2)+"px";
    newdiv=null;newdiv1=null;newbutton=null;
}catch(err){ GM_logError("alert2","text="+text+" yesText="+yesText+" noText="+noText,"",err); }
}

// CONSTANTS / GLOBALS ************************************************************************************************
// DOM
var ALL = null;
var container = null;
// Objects ************************************************************************************************************
try{
    if(!unsafeWindow.greaseMonkeyData){ createObjectIn(unsafeWindow, {defineAs: "greaseMonkeyData"}); }
    var unsafeData = unsafeWindow.greaseMonkeyData;
}catch(err){ GM_logError("unsafeData","","location.href="+location.href,err); }
try{
    if(!top.window.wrappedJSObject.greaseMonkeyData){ createObjectIn(top.window.wrappedJSObject, {defineAs: "greaseMonkeyData"}); }
    top.unsafeData = top.window.wrappedJSObject.greaseMonkeyData;
}catch(err){ GM_logError("top.unsafeData","","location.href="+location.href,err); }
const STAT_SERVER = {"AE":"http://mff.metrax.eu","AU":"http://mff.metrax.eu","BG":"http://mff.metrax.eu","BR":"http://mff.metrax.eu","DE":"http://mff.metrax.eu","DK":"http://mff.metrax.eu","ES":"http://mff.metrax.eu","FR":"http://mff.metrax.eu","GR":"http://mff.metrax.eu","HR":"http://mff.metrax.eu","HU":"http://mff.metrax.eu","IR":"http://mff.metrax.eu","IT":"http://mff.metrax.eu","NL":"http://mff.metrax.eu","NO":"http://mff.metrax.eu","NZ":"http://mff.metrax.eu","PL":"http://mff.metrax.eu","PT":"http://mff.metrax.eu","RO":"http://mff.metrax.eu","RU":"http://mff.metrax.eu","SE":"http://mff.metrax.eu","TH":"http://mff.metrax.eu","TR":"http://mff.metrax.eu","UK":"http://mff.metrax.eu","US":"http://mff.metrax.eu","VN":"http://mff.metrax.eu"};
// Helping Classes ****************************************************************************************************
if(top.unsafeData.toolTip){
    var toolTip=top.unsafeData.toolTip;
}else{
    var toolTip=new function(){
    try{
        var container=null;
        this.mousemove=function(event){
        try{
            if(container.style.display!="none"){
                var help=getOffset(frameElement);
                var cleft=(event.pageX+help.left-(container.offsetWidth/3));
                var mleft=Math.min(0,(top.document.body.clientWidth - cleft - container.offsetWidth));
                container.style.left=Math.max(0,cleft + mleft) + "px";
                container.style.top=Math.max(0,((top.document.body.clientHeight - event.pageY+help.top - 25 - container.offsetHeight)<0)?(event.pageY+help.top-25-container.offsetHeight):(event.pageY+help.top+25)) + "px";
            }
        }catch(err){ GM_logError("toolTip.mousemove","event="+event,"",err); }
        };
        this.init=function(){
        try{
            container=$top("divToolTip");
            if((container==null)&&(self==top)){
                container=createElement("div",{"id":"divToolTip","style":"z-index:999;overflow:visible;max-width:1000px;display:none;position:absolute;padding:4px;background-color:#fff;color:#000;border:2px solid #885F49;border-radius:5px;font-size:11px;"},ALL); // ="class":"ttbox"
                window.addEventListener("mousemove",toolTip.mousemove,false);
            }else{
                toolTip.hide(); // important when a frame loads while tooltip opened
            }
        }catch(err){ GM_logError("toolTip.init","","",err); }
        };
        this.show=function(event,content){
        try{
            var help = getOffset(frameElement);
            container.setAttribute("targetId",event.target.id);
            container.innerHTML = content;
            container.style.display = "block";
            window.addEventListener("mouseout",toolTip.hide,false);
            var cleft = (event.pageX+help.left-(container.offsetWidth/3));
            var mleft = Math.min(0,(top.document.body.clientWidth - cleft - container.offsetWidth));
            container.style.left = Math.max(0,cleft + mleft) + "px";
            container.style.top = Math.max(0,((top.document.body.clientHeight - event.pageY+help.top - 25 - container.offsetHeight)<0)?(event.pageY+help.top-25-container.offsetHeight):(event.pageY+help.top+25)) + "px";
        }catch(err){ GM_logError("toolTip.show","event="+event,"",err); }
        };
        this.adjust=function(targetElem){
        try{
            if (targetElem!=undefined && container.getAttribute("targetId")==targetElem.id){
                var xLeft = container.offsetLeft;
                var xTop = container.offsetTop;
                var B = document.createEvent("MouseEvents");
                B.initEvent("mouseout", true, true);
                targetElem.dispatchEvent(B);
                B.initEvent("mouseover", true, true);
                //B.initMouseEvent("mouseover", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null); //TODO set the correct coords
                targetElem.dispatchEvent(B);
                container.style.left = xLeft+"px";
                container.style.top = xTop+"px";
            }
        }catch(err){ GM_logError("toolTip.adjust","","",err); }
        };
        this.hide=function(){
        try{
            window.removeEventListener("mouseout",toolTip.hide,false);
            if(container){
                container.setAttribute("targetId","");
                container.style.display = "none";
                container.innerHTML = "";
            }
        }catch(err){ GM_logError("toolTip.hide","","",err); }
        };
    }catch(err){ GM_logError("toolTip","","",err); }
    };
    top.unsafeData.toolTip=toolTip;}
if(top.unsafeData.logBubble){
    var logBubble=top.unsafeData.logBubble;
}else{
    var logBubble=new function(){
    try{
        var container=null;
        var elements=[];
        var clearActive=false;
        var isMouseOver=false;
        this.init=function(){
        try{
            if((!container)&&ALL){
                container=createElement("div",{"id":"_divLogBubbleBox","style":"position:fixed;right:0;bottom:0;z-index:999;","isMouseOver":"0"},ALL);
                container.addEventListener("mouseover",function(event){
                    try{
                        isMouseOver=true;
                    }catch(err){ GM_logError("logBubble.mouseOver","event="+event,"",err); }
                },false);
                container.addEventListener("mouseout",function(event){
                    try{
                        var nodeSource=event.target;
                        if(nodeSource&&(nodeSource!=this)){
                            while(nodeSource=nodeSource.parentNode){
                                if(this==nodeSource){ break; }
                            }
                        }
                        var nodeTarget=event.relatedTarget;
                        if(nodeTarget&&(nodeTarget!=this)){
                            while(nodeTarget=nodeTarget.parentNode){
                                if(this==nodeTarget){ break; }
                            }
                        }
                        if(nodeSource!=nodeTarget){
                            isMouseOver=false;
                            logBubble.clear();
                        }
                    }catch(err){ GM_logError("logBubble.mouseOut","event="+event,"",err); }
                },false);
            }
        }catch(err){ GM_logError("logBubble.init","","",err); }
        };
        this.add=function(text,timer,color){
        try{
            if(!container){ logBubble.init(); }
            if(container){
                if(timer==undefined){ timer=10; }
                if(color==undefined){ color="blue"; }
                now=Math.floor((new Date()).getTime()/1000);
                elements.push(now+timer);
                createElement("div",{"class":"blackbox","style":"color:white;background-color:"+color+";border:2px solid black;border-radius:10px;padding:5px;margin-top:5px;"},container,getDaytimeStr(now)+"&nbsp;"+text);
                window.setTimeout(logBubble.clear,1000*timer+1);
            }
        }catch(err){ GM_logError("logBubble.add","text="+text,"",err); }
        };
        this.clear=function(){
        try{
            if(clearActive){
                window.setTimeout(logBubble.clear,200);
            }else if(container){
                clearActive=true;
                now=Math.floor((new Date()).getTime()/1000);
                if(!isMouseOver){
                    for (var i=elements.length-1;i>=0;i--){
                        if (elements[i]<=now){
                            removeElement(container.children[i]);
                            elements.splice(i,1);
                        }
                    }
                }
                clearActive = false;
            }
        }catch(err){ GM_logError("logBubble.clear","","",err); }
        };
        this.test=function(){
        try{
            GM_logInfo("logBubble.test","","","");
            logBubble.add("logBubble.test");
        }catch(err){ GM_logError("logBubble.test","","",err); }
        };
    }catch(err){ GM_logError("logBubble","","",err); }
    };
    top.unsafeData.logBubble=logBubble;
}
if(top.unsafeData.tracking){
    var tracking=top.unsafeData.tracking;
}else{
    var tracking=new function(){
    try{
        var data={};
        this.init=function(skriptName){
        try{
            if(!data[skriptName]){
                data[skriptName] = [];
                GM_registerMenuCommand("show tracking of "+skriptName, function(skriptName){
                return function(){
                    tracking.plot(skriptName);
                }
                }(skriptName));
            }
        }catch(err){ GM_logError("tracking.init","skriptName="+skriptName,"",err); }
        };
        this.start=function(skriptName,functionName,parameterArray){
        try{
            return data[skriptName].push([functionName,(new Date()).getTime(),null,parameterArray]);
        }catch(err){ GM_logError("tracking.start","skriptName="+skriptName+" functionName="+functionName,"",err); }
        };
        this.end=function(skriptName,trackingHandle){
        try{
            data[skriptName][trackingHandle-1][2]=(new Date()).getTime();
            // check for long durations?
        }catch(err){ GM_logError("tracking.end","skriptName="+skriptName,"",err); }
        };
        this.plot=function(skriptName){
        try{
            var container=createElement("div",{"style":"z-index:995;position:absolute;top:0;left:0;background-color:white;height:100%;"},ALL);
            var div=createElement("img",{"class":"link","src":GFX+"close.jpg","style":"position:absolute;top:0;right:0;width:20px;height:20px;margin:5px;"},container);
            div.addEventListener("click",function(){ removeElement(this.parentNode); },false);
            div=createElement("div",{"style":"height:100%;padding-right:20px;margin-right:30px;overflow:auto;"},container);
            var table,tr,td;
            table=createElement("table",{"border":"1"},div);
            tr=createElement("tr",{},table);
            createElement("th",{},table,"Nr");
            createElement("th",{},table,"function");
            createElement("th",{},table,"start");
            createElement("th",{},table,"end");
            createElement("th",{},table,"parameter");
            for(var i=0;i<data[skriptName].length;i++){
                tr=createElement("tr",{},table);
                createElement("td",{},table,i);
                for(var j=0;j<3;j++){
                    createElement("td",{},table,data[skriptName][i][j]);
                }
                createElement("td",{},table,data[skriptName][i][3]?implode(data[skriptName][i][3],"tracking.plot"):"");
            }
        }catch(err){ GM_logError("tracking.plot","skriptName="+skriptName,"",err); }
        };
    }catch(err){ GM_logError("tracking","","",err); }
    };
    top.unsafeData.tracking=tracking;
}
// Constants **********************************************************************************************************
const STAT_VIEW = {"DE":"http://mff.metrax.eu"};
const GAMEPAGES = {"AE":"myfreefarm.ae","AU":"au.myfreefarm.com","BG":"veselaferma.com","BR":"myfreefarm.com.br","DE":"myfreefarm.de","CZ":"myfreefarm.cz","DK":"myfreefarm.dk","ES":"migranjalinda.es","FR":"mabelleferme.fr","GR":"myfreefarm.gr","HR":"myfreefarm.com.hr","HU":"enkicsitanyam.hu","IR":"myfreefarm.ir","IT":"myfreefarm.it","NL":"myfreefarm.nl","NO":"myfreefarm.no","NZ":"myfreefarm.co.nz","PL":"wolnifarmerzy.pl","PT":"pt.myfreefarm.com","RO":"fermavesela.ro","RU":"mojaderewnja.ru","SE":"myfreefarm.se","TH":"th.myfreefarm.com","TR":"tr.myfreefarm.com","UK":"myfreefarm.co.uk","US":"myfreefarm.com","VN":"myfreefarm.com.vn"};
var pageZusatz = new Object();
if(location.search!=""){
    var help = location.search.replace(/^\?/,"").split(/\&/);
    for(var v=0;v<help.length;v++){
        var help2 = help[v].split(/\=/);
        pageZusatz[help2[0]] = help2[1];
    }
}
const sortObjFunctions = {
    "desc":function(a,b){return ((b[0]>a[0])-(b[0]<a[0]));},
    "int":function(a,b){return (parseInt(a[0],10)-parseInt(b[0],10));},
    "float":function(a,b){return (parseFloat(a[0],10)-parseFloat(b[0],10));},
    "date":function(a,b){return (getTime(a[0])-getTime(b[0]));},
    "productId":function(a,b){
        if(prodTyp[0][a[0]]==prodTyp[0][b[0]]){
            return(parseInt(a[0],10)-parseInt(b[0],10));
        } else {
            return({"c":0,"v":1,"e":2,"o":3,"fw1":4,"fw2":5,"fw3":6,"fw4":7,"z":8}[prodTyp[0][a[0]]]-{"c":0,"v":1,"e":2,"o":3,"fw1":4,"fw2":5,"fw3":6,"fw4":7,"z":8}[prodTyp[0][b[0]]]);
        }
    }
};

// Strings
var LANGUAGE = null;
var texte = new Object();
function getText(id,noWarning){
try{
    if(texte[LANGUAGE]&&texte[LANGUAGE][id]){
        return texte[LANGUAGE][id];
    }else if(texte["en"]&&texte["en"][id]){
        return texte["en"][id];
    }else{
        if(!noWarning){ GM_logWarning("getText","id="+id,"LANGUAGE="+LANGUAGE,"Text not found."); }
        return "";
    }
}catch(err){ GM_logError("getText","id="+id+" noWarning="+noWarning,"",err); }
}
var delimThou = ".";
var regDelimThou = "\\.";
var regDelimThouShift="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)";
var regDelimThouDelete="(\\d)\\.(\\.*)(\\d{1,2}\\D)";
var delimDeci = ",";
var regDelimDeci = ",";
var dateFormatDM = "day.month.";
var dateFormatDMY = "day.month.year";
var timeFormatHM = "hour:min";
var timeFormatHMS = "hour:min:sec";

var COUNTRY = null;
var SERVER = null;
var PAGE = null;
var GFX = null; // http://mff.wavecdn.de/mff/
var USERNAME = null;

// Numbers
var now = Math.floor((new Date()).getTime()/1000);
var todayStr;
var nowServerOff;
var todayServerStr;
// call:
// now = Math.floor((new Date()).getTime()/1000);
// todayStr = getDateStr(now,2,false); //4.2.2011
// nowServerOff = unsafeWindow.Zeit.Server+OFFSET;
// todayServerStr = getDateStr(nowServerOff,2,false);
var valServerTimeOffset = 0;
const NEVER = 2147483000; //upper limit of signed long

// special characters
const sign_average = "\u2205";
const sign_mult = "\u00D7";
const sign_sum = "\u2211"; //"\u03A3"
const sign_inf = "\u221E";
const A_dots = "\u00C4";
const a_dots = "\u00E4";
const O_dots = "\u00D6";
const o_dots = "\u00F6";
const sz = "\u00DF";
const U_dots = "\u00DC";
const u_dots = "\u00FC";

// ON LOAD ***************************************************************************************************************

function startScript(){
try{
    ALL = document.getElementsByTagName("body")[0];
    GFX = top.window.wrappedJSObject._GFX?top.window.wrappedJSObject._GFX:"http://mff.wavecdn.de/mff/";
    toolTip.init();
}catch(err){ GM_logError("startScript","","location.href="+location.href,err); }
}
if((document.readyState=="complete")||(document.readyState=="loaded")){
    startScript();
}else{
    window.addEventListener("load",startScript,false);
}