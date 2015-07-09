﻿// ==UserScript==
// @name        MyFreeFarm French
// @namespace   https://github.com/BastianKanaan/GMscripts_MyFreeFarm
// @author      BastianKanaan
// @description Language pack "French" for MyFreeFarm Scripts
// @date        09.07.2015
// @version     1.0.1
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     /^http:\/\/(|www\.|s\d+\.)mabelleferme.fr\/.*$/
// @grant       GM_log
// ==/UserScript==

// Edit above the @include. This controls on which pages the script is called.
window.addEventListener("load",function(){
try{
    // Do not edit
    var texte=new Object();
    const PRODSTOP=-1;
    const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images
    // Important constants
    const COUNTRY="FR"; // The country ISO-code (2 digits)
    const LANGUAGE="fr"; // The language ISO-code (2 digits)
    const delimThou="."; // The separator for thousands (e.g. in 1,000).
    const regDelimThou="\\."; // = delimThou. "." has to be masked to "\\."!
    const regDelimThouShift="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)"; // = "([\\d"+delimThou+"])(\\d)"+delimThou+"(\\d{1,2}\\D)"
    const regDelimThouDelete="(\\d)\\.(\\.*)(\\d{1,2}\\D)"; // = "(\\d)"+delimThou+"("+delimThou+"*)(\\d{1,2}\\D)"
    const delimDeci=","; // The separator for decimals (e.g. in 1.99).
    const regDelimDeci=","; // = delimDeci. "." has to be masked to "\\."!
    const dateFormatDM = "day.month."; // The style a short date is displayed. You can use the tags "day" and "month".
    const dateFormatDMY = "day.month.year"; // The style a date is displayed. You can use the tags "day", "month" and "year".
    const timeFormatHM = "hour:min"; // The style a time is displayed. You can use the tags "hour" and "min".
    const timeFormatHMS = "hour:min:sec"; // The style a precise time is displayed. You can use the tags "hour", "min" and "sec".
    // Take the following from the game
    // For the following you have to take a message sent if you sell something on the market place
    texte["msgMarketsaleContent"]="(.*) a acheté (\\d+)x (.*?) pour (.*?) fL\\."; // The text where the information is stated. The information has to be replaced by "(.*?)".
    // For the following you have to take a message sent if you sell something via contract
    texte["msgContractsaleContent"]="(.*) a signé un de tes contrats!<br><br> Les produits suivants ont ét. vendu:<br>(.*?)<br> Le total de (.*?) fL a été crédité à ton compte\\."; // The text where the general information is stated. The information has to be replaced by "(.*?)".
    texte["msgContractsaleList"]="(\\d+)x (.*?)<br>"; // The line-pattern for the detailed selling list
    // For the following you have to take a message sent if somebody wants to add you as friend
    texte["msgFriend"]="(.+) souhaite t'ajouter à ses amis"; // The subject. The person has to be replaced by "(.+)"
    
    // And all the other texts you can enter what you want ...
    
    // Do not edit
    if(!top.window.wrappedJSObject.greaseMonkeyData){ top.window.wrappedJSObject.greaseMonkeyData=new Object(); }
    top.unsafeData = top.window.wrappedJSObject.greaseMonkeyData;
/*
function compareObjectsExistance(obj1,obj2,pre){
    try{
        if(typeof(pre)=="undefined") pre="";
        for(i in obj1){
            if(!obj1.hasOwnProperty(i)){ continue; }
            if(typeof obj2[i] == "undefined"){
                GM_log("miss in 2: "+pre+i);
            }else{
                if(typeof obj1[i] == "object"){
                    compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
                }
            }
        }
        for(i in obj2){
            if(!obj2.hasOwnProperty(i)){ continue; }
            if(typeof obj1[i] == "undefined"){
                GM_log("miss in 1: "+pre+i);
            }else{
                if(typeof obj2[i] == "object"){
                    compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
                }
            }
        }
    }catch(err){ GM_log("ERROR compareObjectsExistance\n"+err); }
}
window.setTimeout(function(){
    GM_log("START COMPARING");
    compareObjectsExistance(texte,top.unsafeData.texte);
    GM_log("END COMPARING");
},1000);
*/  
    top.unsafeData.texte=new Object();
    top.unsafeData.texte[LANGUAGE]=texte;
    top.unsafeData.LANGUAGE=LANGUAGE;
    top.unsafeData.COUNTRY=COUNTRY;
    top.unsafeData.delimThou=delimThou;
    top.unsafeData.regDelimThou=regDelimThou;
    top.unsafeData.regDelimThouShift=regDelimThouShift;
    top.unsafeData.regDelimThouDelete=regDelimThouDelete;
    top.unsafeData.delimDeci=delimDeci;
    top.unsafeData.regDelimDeci=regDelimDeci;
    top.unsafeData.dateFormatDM=dateFormatDM;
    top.unsafeData.dateFormatDMY=dateFormatDMY;
}catch(err){ GM_log("ERROR\npage="+location.href+"\n"+err); }
},false);