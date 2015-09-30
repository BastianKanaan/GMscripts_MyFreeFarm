// ==UserScript==
// @name        MyFreeFarm LP Bulgarian
// @namespace   https://github.com/BastianKanaan/GMscripts_MyFreeFarm
// @author      BastianKanaan
// @description Language pack "Bulgarian" for MyFreeFarm Scripts
// @date        23.07.2015
// @version     1.0.4
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     /^http:\/\/(|www\.|s\d+\.)veselaferma.com\/.*$/
// @grant       GM_log
// ==/UserScript==

// Edit above the @include. This controls on which pages the script is called.
try{
// Do not edit ********************************************************************************************************
    if(!top.window.wrappedJSObject.greaseMonkeyData){ createObjectIn(top.window.wrappedJSObject, {defineAs: "greaseMonkeyData"}); }
    top.unsafeData = top.window.wrappedJSObject.greaseMonkeyData;
    if(undefined===top.unsafeData.text){
        top.unsafeData.text=new Object();
    }
    var text=top.unsafeData.text;
    const GM_Home  =GM_info["script"]["namespace"];
    const GM_Source=GM_info["script"]["namespace"];    
    const PRODSTOP=-1;
    const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images

// Important constants ************************************************************************************************
    const COUNTRY="BG"; // The country ISO-code (2 digits)
    const LANGUAGE="bg"; // The language ISO-code (2 digits)
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
    
// Take the following from the game ***********************************************************************************
    if(undefined===text[LANGUAGE]){
        text[LANGUAGE]=new Object();
        // Open the system messages and watch the Firefox console for warnings from "messagesSystem".
        // *************
        // Take from a message sent if you sell something on the market place.
        // - The subject: Replace the variable information by ".+". Prefix brackets with "\".
        text[LANGUAGE]["msgSubjectMarketsale"]="xxx";
        // - The content: The text where the information is stated. The information has to be replaced by "(.+?)".
        text[LANGUAGE]["msgContentMarketsale"]="(.+) закупи от пазара\\s*(\\d+)x (.+?) за сума\\s*<br>\\s*(.+?) кД\\."; 
        // *************
        // Take from a message sent if you sell something via contract.
        // - The subject.
        text[LANGUAGE]["msgSubjectContractsale"]="xxx";
        // - The content: The text where the general information is stated. The information has to be replaced by "(.+?)".
        text[LANGUAGE]["msgContentContractsale"]="(.+) подписа Ваш договор!<br>\\s*<br>\\s*Вие продадохте следните продукти:\\s*<br>([\\S\\s]*)\\s*<br>\\s*Плащане на стойност (.+?) кД е преведено в сметката Ви\\."; 
        // - The line-pattern for the detailed selling list (equals the replaced information above).
        text[LANGUAGE]["msgContentContractsaleList"]="\\s*(\\d+)x\\s*(.+?)\\s*<br>";
        // *************
        // Take the subject from a message sent if you won in a competition.
        text[LANGUAGE]["msgSubjectCongratulation"]="xxx";
        // Take the subject from a message sent if somebody wants to add you as friend. The person has to be replaced by "(.+)".
        text[LANGUAGE]["msgSubjectFriend"]="(.+) иска да стане Ваш приятел";
        // Take the subject from a message sent if you reach the next level
        text[LANGUAGE]["msgSubjectLevel"]="Вие достигнахте следващо ниво!";
        // Take the subject from a message sent if you got a present.
        text[LANGUAGE]["msgSubjectPresent"]="Вие получихте подарък.";
        // Take the subjects from messages sent if weed occurred on your field.
        text[LANGUAGE]["msgSubjectWeed1"]="xxx";
        text[LANGUAGE]["msgSubjectWeed2"]="xxx";
    
// And all the other texts you can enter what you want ****************************************************************
        text[LANGUAGE]["above"]="above";
        text[LANGUAGE]["absolute"]="absolute";
        text[LANGUAGE]["accountActive"]="Акаунтът активен";
        text[LANGUAGE]["accounts"]="Акаунти";
        text[LANGUAGE]["activation"]="Активиране";
        text[LANGUAGE]["additionalFarmi"]="%1% допълнително фермерче на ден";
        text[LANGUAGE]["additionalForestFarmiSlot"]="%1% допълнително място за фермерче в лесовъдството на ден";
        text[LANGUAGE]["additionalLogCapacity"]="Увеличава капацитета на трупите със %1%";
        text[LANGUAGE]["advertisingEnds"]="Рекламата завършва днес";
        text[LANGUAGE]["adviser"]="Съветник";
        text[LANGUAGE]["afterFee"]="След налагане на такса";
        text[LANGUAGE]["alertSetPriceNone"]="Наистина ли искате да зададете цена от 0кД за %PRODUCT%?";
        text[LANGUAGE]["alertSetPriceOverNPC"]="Наистина ли искате да зададете цена  %PRICE% за %PRODUCT%?<br>Тя е по-висока от цената на магазина от %NPC%.";
        text[LANGUAGE]["alertSetPriceOverObs"]=" Наистина ли искате да зададете цена от %PRICE% за %PRODUCT%?<br>Тя е много по-висока от средната пазарна цена от %OBS%.";
        text[LANGUAGE]["alertSetPriceUnderObs"]=" Наистина ли искате да зададете цена от %PRICE% за %PRODUCT%?<br> Тя е много по-ниска от средната пазарна цена от %OBS%.";
        text[LANGUAGE]["alertWillLowRack"]="Внимание! Това ще намали складовата наличност под минимума!";
        text[LANGUAGE]["all"]="Всичко";
        text[LANGUAGE]["autologinAllOk"]="Всички акаунти са логнати.";
        text[LANGUAGE]["autologinChecking"]="Проверява активните сесии. Моля изчакайте %1% секунди<br>...";
        text[LANGUAGE]["bonus"]="Бонус";
        text[LANGUAGE]["boughtTickets"]="Закупени билети";
        text[LANGUAGE]["buy"]="Купи";
        text[LANGUAGE]["buyers"]="Купувачи";
        text[LANGUAGE]["calcTo"]="Calculate to";
        text[LANGUAGE]["carpentry"]="Дърводелска работилница";
        text[LANGUAGE]["city"]="Град";
        text[LANGUAGE]["change"]="Размяна";
        text[LANGUAGE]["clearFilter"]="Clear filter";
        text[LANGUAGE]["click"]="Click";
        text[LANGUAGE]["clickAlt"]="Alt+Click";
        text[LANGUAGE]["clickCtrl"]="Ctrl+Click";
        text[LANGUAGE]["clickDouble"]="Double-Click";
        text[LANGUAGE]["clickToChange"]="Click to change";
        text[LANGUAGE]["coins"]=unsafeWindow.t_coins;
        text[LANGUAGE]["commission"]="Комисионна";
        text[LANGUAGE]["confirmUseObservedPrices"]="Тази цена ще замени предишната пазарна цена ...";
        text[LANGUAGE]["confirmChangelogVersion"]="Инсталирахте нова версия на Съветника.<br>Версия %1% съдържа следните промени:";
        text[LANGUAGE]["contract"]="Договор";
        text[LANGUAGE]["contractsReceived"]="Получени договори";
        text[LANGUAGE]["contractsSent"]="Изпратени договори";
        text[LANGUAGE]["copyToTextFile"]="Copy this string to a text-file";
        text[LANGUAGE]["couldNotGetRank"]="Вашата позиция не може да бъде определена.";
        text[LANGUAGE]["couldNotGetUpdateInfoOfX"]="Актуална информация за %1% не може да бъде определена.";
        text[LANGUAGE]["createStorageString"]="Create storage string";
        text[LANGUAGE]["cropped"]="Прибиране реколта";
        text[LANGUAGE]["currentOffers"]="Текуща оферта";
        text[LANGUAGE]["dailyRuns"]="Daily runs";
        text[LANGUAGE]["dailyTicket"]="Дневен билет";
        text[LANGUAGE]["dailyYield"]="Дневен добив";
        text[LANGUAGE]["date"]="Дата";
        text[LANGUAGE]["day"]="Ден";
        text[LANGUAGE]["day0"]="Днес";
        text[LANGUAGE]["day1"]="Утре";
        // text[LANGUAGE]["day2"]="Вдругиден"; // comment it if not used in the language
        text[LANGUAGE]["default"]="Начално";//?
        text[LANGUAGE]["delete"]="Изтрий";
        text[LANGUAGE]["deleteFollowingData"]="Изтрий следните данни";
        text[LANGUAGE]["demand"]="Търсене";
        text[LANGUAGE]["detail"]="Детайл";
        text[LANGUAGE]["difficulty"]="Трудност";
        text[LANGUAGE]["donkey"]="Магаре";
        text[LANGUAGE]["duration"]="продължителност";
        text[LANGUAGE]["editPrice"]="Коригирай цена";
        text[LANGUAGE]["emptyField"]="Празно поле!";
        text[LANGUAGE]["end"]="Край";
        text[LANGUAGE]["exchangedLots"]="Exchanged lots";
        text[LANGUAGE]["farm"]="Ферма";
        text[LANGUAGE]["farmersmarket"]=unsafeWindow.t_farmers_market;
        text[LANGUAGE]["farmX"]="%1%. ферма";
        text[LANGUAGE]["farmi"]="Фермерче";
        text[LANGUAGE]["farmis"]="Фермерчета";
        text[LANGUAGE]["farmpedia"]="FarmPedia";
        text[LANGUAGE]["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
        text[LANGUAGE]["farmzone"]="Място %1% от %2%. ферма";
        text[LANGUAGE]["feed"]="Хранене";
        text[LANGUAGE]["fields"]="Полета";
        text[LANGUAGE]["filter"]="Филтър";
        text[LANGUAGE]["filterForX"]="Филтър за %1%";
        text[LANGUAGE]["finished"]="готов";
        text[LANGUAGE]["foodworld"]=unsafeWindow.foodworld_title;
        text[LANGUAGE]["forest"]="Гора";
        text[LANGUAGE]["forestry"]="Лесовъдство";
        text[LANGUAGE]["formatNumbers"]="Коригирай брой";
        text[LANGUAGE]["formulaType"]=["Prod","+val","+pts"];
        text[LANGUAGE]["fl1"]="Поляна за цветя";
        text[LANGUAGE]["fl2"]="Цветарска работилница";
        text[LANGUAGE]["fl3"]="Развъждане на чудовищен плод";
        text[LANGUAGE]["fl5"]="Ветеринарен лекар";
        text[LANGUAGE]["fl6"]="Бързо хранене";
        text[LANGUAGE]["fw1"]="Щанд за сода";
        text[LANGUAGE]["fw2"]="Снек бар";
        text[LANGUAGE]["fw3"]="Магазин за сладки";
        text[LANGUAGE]["gain"]="Печалба";
        text[LANGUAGE]["gamecurrency"]=unsafeWindow.gamecurrency;
        text[LANGUAGE]["general"]="Главен";
        text[LANGUAGE]["given"]="Given";
        text[LANGUAGE]["goToDonkey"]="Към магарето Люк";
        text[LANGUAGE]["goToLottery"]="Към лотариен пункт";
        text[LANGUAGE]["goToMarket"]="Към пазара";
        text[LANGUAGE]["goToMarketOfX"]="Към пазара за %1%";
        text[LANGUAGE]["goToMarketstall"]="Към Щанд за сода";
        text[LANGUAGE]["goToPage"]="Към страница";
        text[LANGUAGE]["goToRank"]="Към позиция";
        text[LANGUAGE]["goToZoneX"]="Към %1%";
        text[LANGUAGE]["goods"]="Стока";
        text[LANGUAGE]["hide"]="скрит";
        text[LANGUAGE]["highlightProducts"]="Отбележи продукти на пазара";
        text[LANGUAGE]["highlightUser"]="Отбележи играч на пазара";
        text[LANGUAGE]["hotkeys"]="Hotkeys";
        text[LANGUAGE]["idle"]="не работи!";
        text[LANGUAGE]["importStorageString"]="Import storage string";
        text[LANGUAGE]["importStorageStringError"]="Sorry. Can't read the storage string.";
        text[LANGUAGE]["inStock"]="в наличност";
        text[LANGUAGE]["informationIsMissing"]="Липсва информация."
        text[LANGUAGE]["ingredients"]="Съставки";
        text[LANGUAGE]["invalidServer"]="Невалиден сървър";
        text[LANGUAGE]["inventory"]="Опис";
        text[LANGUAGE]["jobIncomplete"]="Задачата не завърши успешно";
        text[LANGUAGE]["jobComplete"]="задачата завърши успешно";
        text[LANGUAGE]["jobCurrent"]="Текуща задача";
        text[LANGUAGE]["keptLots"]="Kept lots";
        text[LANGUAGE]["level"]="Ниво";
        text[LANGUAGE]["levelTooLow"]="Вашето ниво е ниско";
        text[LANGUAGE]["levelXneeded"]="Ниво&nbsp;%1%&nbsp;е необходимо";
        text[LANGUAGE]["load"]="Зареди";
        text[LANGUAGE]["loading"]="Зареждане";
        text[LANGUAGE]["localTime"]="Локално време";
        text[LANGUAGE]["lodge"]="Log cabin";
        text[LANGUAGE]["login"]="Вход";
        text[LANGUAGE]["loginPageFound"]="Found login page";
        text[LANGUAGE]["loginPortalSubmitted"]="Submitted portal login";
        text[LANGUAGE]["loginSubmitted"]="Submitted login";
        text[LANGUAGE]["logDonkey"]="Дневник магарето Люк";
        text[LANGUAGE]["lotteryLog"]="Дневник Лотария";
        text[LANGUAGE]["lvl"]="Lvl";
        text[LANGUAGE]["manageVariables"]="Manage variables";
        text[LANGUAGE]["market"]="Market";
        text[LANGUAGE]["marketPrice"]="Пазарна&nbsp;цена";
        text[LANGUAGE]["marketplace"]="Пазар";
        text[LANGUAGE]["marketstall"]="Пазарен щанд";
        text[LANGUAGE]["megafield"]="Плантация";
        text[LANGUAGE]["megafieldCurrency"]=unsafeWindow.t_megafield_currency;
        text[LANGUAGE]["messages"]="Съобщения";
        text[LANGUAGE]["minRack"]="Min&nbsp;rack";
        text[LANGUAGE]["minRackamount"]="Съдържание на рафта";
        text[LANGUAGE]["missing"]="Липсва";
        text[LANGUAGE]["money"]="Предлага";
        text[LANGUAGE]["name"]="Име";
        text[LANGUAGE]["newLevelReached"]="Поздравления!<br>Вие достигнахте следващо ниво!";
        text[LANGUAGE]["nextMessage"]="Следващо съобщение";
        text[LANGUAGE]["no"]="Не";
        text[LANGUAGE]["nothingSelected"]="Нищо не е избрано";
        text[LANGUAGE]["NPC"]="NPC";
        text[LANGUAGE]["NPCprice"]="Цена на щанда за семена";
        text[LANGUAGE]["nr"]="Nr";
        text[LANGUAGE]["observed"]="Средна";
        text[LANGUAGE]["ok"]="OK";
        text[LANGUAGE]["oldOnes"]="Стар";
        text[LANGUAGE]["options"]="Настройки";
        text[LANGUAGE]["overNPCprice"]="повече от цената на щанда";
        text[LANGUAGE]["overX"]="повече %1%";
        text[LANGUAGE]["overview"]="преглед";
        text[LANGUAGE]["pageXNotLoaded"]="Страница '%1%' не е заредена.";
        text[LANGUAGE]["password"]="Парола";
        text[LANGUAGE]["pleaseOpenX"]="Отвори %1%.";
        text[LANGUAGE]["points"]="Точки";
        text[LANGUAGE]["pleaseWait"]="Моля изчакай";
        text[LANGUAGE]["portalLogin"]="Вход Портал";
        text[LANGUAGE]["powerups"]="Приготвяне";
        text[LANGUAGE]["previousMessage"]="предишно съобщение";
        text[LANGUAGE]["price"]="Цена";
        text[LANGUAGE]["prices"]="Цени";
        text[LANGUAGE]["product"]="Продукт";
        text[LANGUAGE]["productOverview"]="Преглед продукт";
        text[LANGUAGE]["productTimeSaving"]="%1% минути спестени за %2%";
        text[LANGUAGE]["production"]="Продукция";
        text[LANGUAGE]["products"]="Продукти";
        text[LANGUAGE]["profit"]="Печалба";
        text[LANGUAGE]["profitTable"]="Зона печалба дневно";
        text[LANGUAGE]["quantity"]="Количество";
        text[LANGUAGE]["quest_foodworld"]="Пикник зона мисии";
        text[LANGUAGE]["quest_forestry"]="Мисии (лесовъдство)";
        text[LANGUAGE]["quest_main"]="Мисии (ферма)";
        text[LANGUAGE]["questfoodworld1"]="1 серия мисии (пикник зона)";
        text[LANGUAGE]["questforestry1"]="1 серия мисии (лесовъдство)";
        text[LANGUAGE]["questforestry2"]="2 серия мисии (лесовъдство)";
        text[LANGUAGE]["questmain1"]="1 серия мисии (ферма)";
        text[LANGUAGE]["questmain2"]="2 серия мисии (ферма)";
        text[LANGUAGE]["quests"]="Мисии";
        text[LANGUAGE]["rackX"]="%1%. шкаф";
        text[LANGUAGE]["rank"]="Позиция";
        text[LANGUAGE]["readAll"]="Read all";
        text[LANGUAGE]["readyAtX"]="Готово в %1%"; // %1%=2:15+text[LANGUAGE]["shortOClock"]
        text[LANGUAGE]["readyAtX_day1"]="Готово утре в %1%";
        text[LANGUAGE]["readyAtX_day2"]="Готово след 2 дни в %1%"; // comment it if not used in the language
        text[LANGUAGE]["readySinceX"]="Готово от %1%";
        text[LANGUAGE]["recipes"]="Рецепти";
        text[LANGUAGE]["recursive"]="Recursive Needed";
        text[LANGUAGE]["relative"]="relative";
        text[LANGUAGE]["reloadInXSec"]="Зареждане след %1%s.";
        text[LANGUAGE]["relogin"]="Сесията завършва скоро.<br>Нов вход след %1%.";
        text[LANGUAGE]["remaining"]="Оставащо";
        text[LANGUAGE]["requestingUpdateInfoOfX"]="Requesting update information for %1% ..."
        text[LANGUAGE]["requestingUserStatistic"]="Requesting user statistic ...";
        text[LANGUAGE]["requirement"]="Изискване";
        text[LANGUAGE]["requirementPerProduction"]="Изисквания за продукция";
        text[LANGUAGE]["reward"]="Награда";
        text[LANGUAGE]["salesLog"]="Статистика продажби";
        text[LANGUAGE]["save"]="Save";
        text[LANGUAGE]["saveAsTemplate"]="Save as template";
        text[LANGUAGE]["sawmill"]="Дъскорезница";
        text[LANGUAGE]["scriptHomepage"]="Script Homepage";
        text[LANGUAGE]["searchPlayer"]="Търси играч";
        text[LANGUAGE]["seed"]="Засади";
        text[LANGUAGE]["seedPerField"]="Семена за поле";
        text[LANGUAGE]["sendContract"]="Изпрати договор";
        text[LANGUAGE]["sendContractAgain"]=" Изпрати договор отново";
        text[LANGUAGE]["sentContractNrX"]="Изпратен договор № %1%."
        text[LANGUAGE]["sendingXObservedPricesToServer"]="Изпраща %1% средни цени към сървъра ...";
        text[LANGUAGE]["server"]="Сървър";
        text[LANGUAGE]["serverTime"]="Сървърно време";
        text[LANGUAGE]["sessionEnd"]="Край на сесията в %1%<br>Влез отново";
        text[LANGUAGE]["seedVendor"]="Щанд за семена"; // Short for the seller of plants
        text[LANGUAGE]["seedVendorShort"]="Щанд за семена"; // Short for the seller of plants
        text[LANGUAGE]["shadowboxitem"]="Shadowbox item";
        text[LANGUAGE]["shortHours"]="h";
        text[LANGUAGE]["shortOClock"]="h";
        text[LANGUAGE]["shouldReload"]="Презареди страницата.";
        text[LANGUAGE]["showAll"]="Покажи всички";
        text[LANGUAGE]["showChangelog"]="Show changelog";
        text[LANGUAGE]["showLog"]="Show log";
        text[LANGUAGE]["showMissingProducts"]="Show product shortage";
        text[LANGUAGE]["showPasswords"]="покажи парола";
        text[LANGUAGE]["sinceX"]="since %1%";
        text[LANGUAGE]["single"]="Single";
        text[LANGUAGE]["start"]="Старт";
        text[LANGUAGE]["stat_days1"]="1 ден";
        text[LANGUAGE]["stat_days3"]="3 дни";
        text[LANGUAGE]["stat_days5"]="5 дни";
        text[LANGUAGE]["stat_days7"]="7 дни";
        text[LANGUAGE]["stat_gamefield"]="Show game";
        text[LANGUAGE]["stat_stats"]="Покажи статистика";
        text[LANGUAGE]["statistics"]="Статистика";
        text[LANGUAGE]["stock"]="Наличност";
        text[LANGUAGE]["stockValue"]="Наличност стойност";
        text[LANGUAGE]["stockXlow"]="Наличност на %1% ниска";
        text[LANGUAGE]["stockXmissing"]="Наличност на %1% липсва!!!";
        text[LANGUAGE]["storeXinContract"]="Добавете %1% в договор";
        text[LANGUAGE]["summarize"]="Обобщи";
        text[LANGUAGE]["takeObservedPrices"]="Вземи средна цена";
        text[LANGUAGE]["time"]="Време";
        text[LANGUAGE]["title"]="Заглавие";
        text[LANGUAGE]["toMessage"]="към съобщение";
        text[LANGUAGE]["toSeedVendor"]="Към щанд за семена";
        text[LANGUAGE]["total"]="Общо";
        text[LANGUAGE]["turnover"]="Оборот";
        text[LANGUAGE]["unitPrice"]="Единична цена";
        text[LANGUAGE]["upgradeForX"]="повиши&nbsp;за&nbsp;%1%";
        text[LANGUAGE]["upgradeLevel"]="Повиши ниво";
        text[LANGUAGE]["upjersAdvertising"]="Upjers-Реклама";
        text[LANGUAGE]["useQuestProducts"]= "Използвай текущите продукти за мисия";
        text[LANGUAGE]["userscriptNotStarted"]= "Скриптът не стартира напълно.";
        text[LANGUAGE]["useWildcard"]= "Използвай * за съответствие с една или повече букви.";
        text[LANGUAGE]["value"]="Стойност";
        text[LANGUAGE]["version"]="Версия";
        text[LANGUAGE]["veterinayLevelXNeeded"]="Изисква %1% ниво ветеринарен лекар";
        text[LANGUAGE]["waterBonus"]="%1%% бонус поливане";
        text[LANGUAGE]["waterNeeded"]="Необходимо е поливане";
        text[LANGUAGE]["waterNeededAtX"]="Поливане в %1%";
        text[LANGUAGE]["waterNeededAtX_day1"]="Поливане утре в %1%";
        text[LANGUAGE]["wateringFeature"]="Пръскачка";
        text[LANGUAGE]["windmill"]="Вятърна мелница";
        text[LANGUAGE]["writeMessage"]="напиши съобщение";
        text[LANGUAGE]["XIsUpToDate"]="%1% е актуално."
        text[LANGUAGE]["yes"]="Да";
        text[LANGUAGE]["yield"]="Добив";
        text[LANGUAGE]["yieldPerProduction"]="Добив от производство на";
        text[LANGUAGE]["youAreOnRankX"]="Вие сте на позиция %1%.";
        // category
        text[LANGUAGE]["category_c"]=text[LANGUAGE]["coins"];
        text[LANGUAGE]["category_v"]="Растения";
        text[LANGUAGE]["category_e"]="Продукти";
        text[LANGUAGE]["category_z"]=unsafeWindow.rack_deco;
        text[LANGUAGE]["category_o"]=unsafeWindow.rack_oil;
        text[LANGUAGE]["category_fw"]=unsafeWindow.rack_foodworld;
        text[LANGUAGE]["category_fw1"]="Напитки";
        text[LANGUAGE]["category_fw2"]="Храни";
        text[LANGUAGE]["category_fw3"]="Торти";
        text[LANGUAGE]["category_fw4"]="Не е достъпно";
        text[LANGUAGE]["category_fl"]="Цветя";
        text[LANGUAGE]["category_fla"]="Аранжименти";
        text[LANGUAGE]["category_f1"]="Фиданки";
        text[LANGUAGE]["category_f2"]="Дънери";
        text[LANGUAGE]["category_f3"]="Продукти дъскирезница";
        text[LANGUAGE]["category_f4"]="Продукти дърводелство";
        text[LANGUAGE]["category_f5"]="Wooden farmhouse items";
        text[LANGUAGE]["category_hr"]="Билки";
        text[LANGUAGE]["category_md"]="Лечебни тинктури";
        text[LANGUAGE]["category_r0"]="Продукт-рецепти";
        text[LANGUAGE]["category_r1"]="Рецепти-повишен добив";
        text[LANGUAGE]["category_r2"]=" Рецепти-повишаване точки ";
        text[LANGUAGE]["category_p0"]="Приготви-продукт";
        text[LANGUAGE]["category_p1"]="Приготви-повишен добив";
        text[LANGUAGE]["category_p2"]="Приготви-повишаване точки";
        // settings
        text[LANGUAGE]["settings_valAutoWater"]=["Автоматично поливане","След сеитба, растенията ще бъдат поливани, ако имате СуперАкаунт."];
        text[LANGUAGE]["settings_valAssumeWater"]=["Денонощно поливане","Важно за растения с период на зреене повече от 24ч."];
        text[LANGUAGE]["settings_valAutoCrop"]=["Автоматично прибиране реколта","След отваряне на полето, реколтата ще бъде прибрана, ако е готова"];
        text[LANGUAGE]["settings_valWaterNeeded"]=["Поливане","Да се показва ли необходимостта от поливане?"];
        text[LANGUAGE]["settings_valCropMsg"]=["Затвори диалога при жънене","Не ви харесват забележките на прасето?  Отървете се от тях!"];
        text[LANGUAGE]["settings_valLimitEmptyFields"]=["Празни полета","Ако броят на незасетите полета в нивата е повече, нивата ще се показва като незаета."];
        text[LANGUAGE]["settings_valLimitEmptyFields_forest"]=["Празни горски полета"," Ако броят на незасетите полета в гората е повече, гората ще се показва като незаета."];
        text[LANGUAGE]["settings_valMoveAnimals"]=["Move animals",""];
        text[LANGUAGE]["settings_valContractLogAmount"]=["Брой запазени договори","Вашите последни договори ще бъдат записани, така че да бъдат достъпни."];
        text[LANGUAGE]["settings_valFarmiLimits"]=["Фермери-Лимит","Фермерите са маркирани в 3 цвата в зависимост от заплащането."];
        text[LANGUAGE]["settings_valFarmiMiniInfo"]=["Фермери статус","Показва маркер над всеки фермер в зависимост от заплащането."];
        text[LANGUAGE]["settings_valMinRackMan"]=["Подробни настройки","Задава минимални стойности на рафта"];
        text[LANGUAGE]["settings_valMinRack"]=["Продукта е маркиран, ако наличността падне под тази стойност. Може да променяте броя в зависимост от категорията."];
        text[LANGUAGE]["settings_valMinRackPlantsize"]=["Размер растение","For example grain needs only half of the value above."];
        text[LANGUAGE]["settings_valMinRackGrowing"]=["Приготвяне продукти","Включва количеството продукти в производство и количеството продукти от рецепти."];
        text[LANGUAGE]["settings_valMinRackQuest"]=["Мисия-продукти","Включва продукти за мисии"];
        text[LANGUAGE]["settings_valMinRackRecursive"]=["Recursive products","Add the required products needed to make missing products, and calculate these again for the required proucts.(used by forestry products)"];
        text[LANGUAGE]["settings_valMinRackFarmis"]=["Фермери-продукти","Включва количеството продукти, търсени от доходоносните фермери."];
        text[LANGUAGE]["settings_valMinRackForestryFarmis"]=["Горски продукти","Включва продуктите за фермерите в лесовъдството."];
        text[LANGUAGE]["settings_protectMinRack"]=["Защита-Продажби","Не позволява продажбата на цена под минималната"];
        text[LANGUAGE]["settings_valBuyingLimitDown"]=["Bottom buy highlight",""];
        text[LANGUAGE]["settings_valBuyingLimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
        text[LANGUAGE]["settings_valBuyingLimitNPC"]=["Only allow buy less than price of NPC",""];
        text[LANGUAGE]["settings_valSellingLimit"]=["Лимит продажби","Вашите продажби са защитени - не позволява цени за вашите стоки извън определения лимит."];
        text[LANGUAGE]["settings_valJoinPrices"]=["One input","Joins the price input fields at the market stand."];
        text[LANGUAGE]["settings_valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
        text[LANGUAGE]["settings_valUseObservedPrices"]=["Използвай актуални цени","Цените се актуализират чрез кликане върху пазара. Актуалните цени да се виждат на ценоразписа?"];
        text[LANGUAGE]["settings_valSendStatistics"]=["Изпращане статистика","Подава статистически данни към  <a href='http://mff.metrax.eu/' target='_blank'>Statistik-Server</a>.  Лични данни не се изпращат!"];
        text[LANGUAGE]["settings_valPrivateMessages"]=["Брой запазени съобщения","Запазва последните лични съобщения, така че да са достъпни."];
        text[LANGUAGE]["settings_valMarketMessages"]=["Брой пазарни съобщения","Минали съобщения се пазят, дори и да са по-стари от 7 дни."];
        text[LANGUAGE]["settings_valMessageRe"]=["Късо заглавие","Замества \"Re:Re:\" с \"Re:\" в заглавието, когато отговаряте на съобщение."];
        text[LANGUAGE]["settings_valMessagesSystemMarkRead"]=["Прочети системни съобщения","Системните съобщения ще бъдат маркирани автоматично като прочетени."];
        text[LANGUAGE]["settings_valFoodworldFarmiPlacing"]=["Настани клиенти в пикник зоната","Избраните клиенти се настаняват автоматично на свободните места."];
        text[LANGUAGE]["settings_valAutoLogin"]=["Автоматичен вход","След въвеждане на име и парола, всички акаунти ще бъдат зареждани и обслужвани автоматично."];
        text[LANGUAGE]["settings_valUpdate"]=["Обновяване","Проверява за наличието на нова версия на този Съветник."];
        text[LANGUAGE]["settings_valServerTimeOffset"]=["Сървърно време",""];
        text[LANGUAGE]["settings_valGamecursor"]=["Курсор на играта","Използвайте курсор на играта."];
        text[LANGUAGE]["settings_valDrag"]=["Минимализиране","Позволява минимализиране на прозореца на играта чрез кликане в горния ляв ъгъл."];
        text[LANGUAGE]["settings_valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
        text[LANGUAGE]["settings_valHotkeys"]=["Комбинации от клавиши","Използвай комбинации от клавиши за бързо навигиране в играта."];
        text[LANGUAGE]["settings_hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmiLog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","seedVendor":"Seedretailer","overview":"Overview","contract":"Contracts","systemMessage":"(next unread) system message"};
        text[LANGUAGE]["settings_valzoneAddToGlobalTime"]=["Интегриране","Времето в играта да се сверява ли спрямо глобалното време?"];
        text[LANGUAGE]["settings_valGlobaltimeShowCroppedZone"]=["Интегриране на зони","Готовността на зоните да се свери ли спрямо глобалното време?"];
        text[LANGUAGE]["settings_cacheReset"]=["Изтриване на данни","Цялата налична информация за вашата ферма ще бъде изтрита ..."];
        //help
        text[LANGUAGE]["help_0"]=[,"This is small introduction to the functions of the Adviser-Script. Not all changes are written here, go find them yourself ... Sometimes a mouse-over helps. <br>At the bottom you see a button to visit the <a href=\""+GM_Home+"\" target=\"_blank\">homepage</a>. Next to it, there is the button for the options. You should look at them and configure as you desire.<br>Generally the script only knows what you have seen. So just visit the field if something is wrong."];
        text[LANGUAGE]["help_1"]=["The Zones","The fields are observed while you see them. The script saves the plants, times and watering. So on the farm view this can be displayed. Each zone has a time counter at its top to show you when it is ready.<br>If you own the planting helper, you can access it directly from opened field. At the top of an opened zone you can navigate directly to zones of the same type."];
        text[LANGUAGE]["help_2"]=["The Overview","Click the pig on the top and you will see an overview of your complete farm. Each zone, its output (product and points) and the next time of work are displayed. Also your total crop is shown. Below you see the wishes of your farmies. You can click each zone or farmie to navigate there. If you are run out of a product, it can take you directly to the market place."];
        text[LANGUAGE]["help_3"]=["Blue Bar","Your points are kept daily. At the bottom you see a bar displaying the current and past level. Each white and red (sunday) line is a day. If you click it you get a detailed table and perhaps a hint if you are lack of a product."];
        text[LANGUAGE]["help_4"]=["Shelf","Here informations of prices and value are added. The amount are reformatted to better style. At the bottom you have an input to seach an other player."];
        text[LANGUAGE]["help_5"]=["Profit Calculation","Next to the bottom of the shelf you can click <img src=\""+GFX+"buildingupdatebutton_off.png\" style=\"width: 15px;height: 15px;\">. This shows you a table calculating times and profits of your products. Click the stars to change the upgrade levels. Click the headline to sort."];
        text[LANGUAGE]["help_6"]=["Farmies","The bubbles of the farmies are expanded by a calculation if they pay enough. If your product amount runs too low, the product is marked. Click the house next to the farmies to see the ones of the last month. At the blue bar on the right you can set which farmies you send away. At the top a calculation is made, so you can decide if an advertising is profitable."];
        text[LANGUAGE]["help_7"]=["Hotkeys","You can quickly move to a place by pressing <i>Alt</i>+... See the options!"];
        text[LANGUAGE]["help_8"]=["Market place","On the market place you are \"protected\", means that you can't buy a product more expensive than in the retailer or by options set. If activated, you can directly switch to a product page by the incoming window on the right. At the top you can step to the next/previous product and see your current amount.<br>You find at the bottom a very important button: the prices. It gives you a table listing your product amounts, values and the prices that are everywhere used. So keep attention they are set right! An \"observed\" price is kept when you visit a market page of a single product.<br>On your market stall a few usefull values are displayed and your last offer was kept and is set now."];
        text[LANGUAGE]["help_9"]=["Messages","Your sales are kept and directly displayed - no need to open a message two times! Note the \"Read all\" and \"Log\" buttons. Your private messages are kept, too. So no need to look for the last messages of the current contact."];
        text[LANGUAGE]["help_10"]=["Contracts","They are kept, too. While creating a contact an input displays the value of the entered product. Enter first the price and then the amount to get inverse the amount. You can submit the same contract multiple times!"];
        text[LANGUAGE]["help_11"]=["Account Managing","You can save all your accounts in the options. So you can login easily in each one by the displayed buttons on the starting page. Note that you can switch directly the accounts at the same server."];
         
        text[LANGUAGE]["automat"] = "Автомат";
        text[LANGUAGE]["automat_planting"] = "Сеене...";
        text[LANGUAGE]["automat_waiting"] = "Изчакване...";
        text[LANGUAGE]["automat_watering"] = "Поливане...";
        text[LANGUAGE]["automat_feeding"] = "Хранене...";
        text[LANGUAGE]["automat_automatPlanting"] = "Сеялка";
        text[LANGUAGE]["automat_automatFeeding"] = "Хранилка";
        text[LANGUAGE]["automat_automatFactory"] = "Производство";
        text[LANGUAGE]["automat_automatMegafield"] = "Плантация-автомат";
        text[LANGUAGE]["automat_automatWindmill"] = "Мелница-автомат";
        text[LANGUAGE]["automat_botStart"] = "Старт";
        text[LANGUAGE]["automat_botStop"] = "Стоп";
        text[LANGUAGE]["automat_settings_botErrorBehaviour"] = "Поведение на Автомата при грешка";
        text[LANGUAGE]["automat_settings_pageReload"] = "Презареждане на страница";
        text[LANGUAGE]["automat_settings_botRestart"] = "Рестарт на бота";
        text[LANGUAGE]["automat_zonePairing"] = "Zone pairing";
        text[LANGUAGE]["automat_debugInfo"] = "Debug Info";
        text[LANGUAGE]["automat_windmill"] = "Вятърна мелница";
        text[LANGUAGE]["automat_timing"] = "Timing";
        text[LANGUAGE]["automat_general"] = "Главен";
        text[LANGUAGE]["automat_development"] = "Развитие";
        text[LANGUAGE]["automat_arrivedInFarm"] = "Пристига във ферма";
        text[LANGUAGE]["automat_changeToFarmX"] = "Към ферма %1%";
        text[LANGUAGE]["automat_changingToX"] = "Към %1%";
        text[LANGUAGE]["automat_closingFieldContainer"] = "Затваряне полета";
        text[LANGUAGE]["automat_closingFactoryContainer"] = "Затваряне производство";
        text[LANGUAGE]["automat_closingStableContainer"] = "Затваряне ферма за животни";
        text[LANGUAGE]["automat_openingZoneX"] = "Отваряне на %1%";
        text[LANGUAGE]["automat_zoneXIsOpened"] = "%1% е отворена";
        text[LANGUAGE]["automat_confirmChangelogVersion"]="Инсталирахте нова версия на автомата.<br>Версия %1% съдържа следните промени:";
        text[LANGUAGE]["automat_maximumStockCapacityReached"]="Достигате максимално количество.";
        text[LANGUAGE]["automat_nothingToCrop"]="Нищо за прибиране.";
        text[LANGUAGE]["automat_cropWaitingInX"]="Изчаква прибиране в %1%.";
        text[LANGUAGE]["automat_plantingAtX"]="Сеене в %1%.";
        text[LANGUAGE]["automat_plantingNoFreeField"]="Няма свободни полета.";
        text[LANGUAGE]["automat_plantingSetX"]="Избери растение \"%1%\".";
        text[LANGUAGE]["automat_queueItemAmountDecreased"]="Queue item amount decreased..";
        text[LANGUAGE]["automat_queueItemDeleted"]="Queue item deleted.";
        text[LANGUAGE]["automat_responseWaiting"]="Изчакване.";
        text[LANGUAGE]["automat_stopAdding"]="Adding stop to queue.";
        text[LANGUAGE]["automat_tourStarting"]="Starting tour.";
        text[LANGUAGE]["automat_vehicleNotKnown"]="Непознато превозно средство.";
        text[LANGUAGE]["automat_vehicleXNotAvailable"]="Vehicle \"%1%\" not available.";
        text[LANGUAGE]["automat_vehicleXBuying"]="Купи средство \"%1%\".";
        text[LANGUAGE]["automat_vehicleXSelected"]="Средство \"%1%\" е избрано.";
        text[LANGUAGE]["automat_msgUpdate"] = "Има нова версия на Автомата. Да инсталирам ли?";
        text[LANGUAGE]["automat_shouldUpdateAdviser"] = "Трябва да обновите Съветника!<br>Автоматът няма работи.";
        text[LANGUAGE]["automat_settings_autoPlant"] = "Да се покаже ли сеялката?";
        text[LANGUAGE]["automat_settings_autoWater"] = "Да се поливат ли полетата?";
        text[LANGUAGE]["automat_settings_autoFeed"] = "Да се покаже ли хранилката?";
        text[LANGUAGE]["automat_settings_botUse"] = "Използвай бот";
        text[LANGUAGE]["automat_settings_disableCropFields"]="Блокирай прибирането на спящите (закрити) полета.";
        text[LANGUAGE]["automat_settings_pauseShortMin"] = "Минимален работен интервал на бота";
        text[LANGUAGE]["automat_settings_pauseShortMax"] = "Максимален работен интервал на бота";
        text[LANGUAGE]["automat_settings_pauseMin"] = "Минимално изчакване на бота";
        text[LANGUAGE]["automat_settings_pauseMax"] = "Максимално изчакване на бота";
        text[LANGUAGE]["automat_settings_maxDurationBotRun"] = "Максимално време за действие на бота за 1 задача";
        text[LANGUAGE]["automat_settings_maxDurationBotStep"] = " Максимално време на действие за етап от задачата на бота ";
        text[LANGUAGE]["automat_setToDefault"] = "Върни началните настройки";
        text[LANGUAGE]["automat_settings_seedWaitForCrop"] = "Изчакай следваща сеитба, ако остават по-малко от";
        text[LANGUAGE]["automat_emergencyPlants"] = "Резервни култури. Засаждат се, ако избраната култура липсва или е недостатъчна.";
        text[LANGUAGE]["automat_settings_useQueueList"] = "Използвай опашка.";
        text[LANGUAGE]["automat_set12a"] = "Delete \n all zone queue\n data";
        text[LANGUAGE]["automat_set12b"] = "Изтриването приключи.";
        text[LANGUAGE]["automat_settings_showQueueTime"] = "Покажи времето за готовност на опашката.";
        text[LANGUAGE]["automat_set18a"] = "Изтрий опашката в мелницата";
        text[LANGUAGE]["automat_set18b"] = " Изтриването приключи ";
        text[LANGUAGE]["automat_settings_powerUpActivate"] = "Активирай приготвянето на готовите рецепти за продукти";
        text[LANGUAGE]["automat_settings_lotteryActivate"] = "Автоматично активиране на дневната лотария";
        text[LANGUAGE]["automat_settings_lotteryDailyLot"] = "Запази лотарийния билет";
        text[LANGUAGE]["automat_settings_questActivate"] = "Activate the Quest automatically to quest:";
        text[LANGUAGE]["automat_settings_questSolving"] = "Solve the Quest automatically to quest:";
        text[LANGUAGE]["automat_settings_farmiReject"] = "Отпрати фермер под:";
        text[LANGUAGE]["automat_settings_farmiAccept"] = "Приеми фермер над:";
        text[LANGUAGE]["automat_settings_farmiAcceptBelowMinValue"] = "Приеми фермер с покупка на продукти, чиито количества са под минималните.";
        text[LANGUAGE]["automat_settings_farmiRemoveMissing"] = "Отпрати фермер с продукти, които липсват или са с ниска доходност. Праг:";
        text[LANGUAGE]["automat_fields"] = "Поле";
        text[LANGUAGE]["automat_titleGeneral"] = "Главна опашка";
        text[LANGUAGE]["automat_titleQueue"] = "Опашка";
        text[LANGUAGE]["automat_QueCopyTextHeader"] = "Запиши опашка";
        text[LANGUAGE]["automat_QueCopyTextHeaderFrom"] = "Запиши от:";
        text[LANGUAGE]["automat_QueCopyTextHeaderTo"] = "Запиши в:";
        text[LANGUAGE]["automat_QueAddText"] = "Добави продукт в списъка."; //Add product
        text[LANGUAGE]["automat_QueAddAboveText"] = " Добави продукт в списъка преди този продукт ";
        text[LANGUAGE]["automat_QueDeleteText"] = "Изтрий продукта от списъка.";
        text[LANGUAGE]["automat_QueClose"] = "Затвори менюто";
        text[LANGUAGE]["automat_QueCloseAll"] = "Close all open Queue windows.";
        text[LANGUAGE]["automat_QueMin"] = "Lower value";
        text[LANGUAGE]["automat_QuePlus"] = "Increase value";
        text[LANGUAGE]["automat_QueBehaviourF"] = "Превключи в режим-шкаф";
        text[LANGUAGE]["automat_QueBehaviourR"] = " Превключи в режим-област";
        text[LANGUAGE]["automat_QueUpButton"] = "Повиши";
        text[LANGUAGE]["automat_QueDownButton"] = "Намали";
        text[LANGUAGE]["automat_buttonTimeLine"] = "Show field timelines";
        text[LANGUAGE]["automat_buttonOverview"] = "Покажи преглед";
        text[LANGUAGE]["automat_repeat_on"] = "Повторението е ON, натисни за OFF.";
        text[LANGUAGE]["automat_repeat_off"] = " Повторението е OFF, натисни за ON.";
        text[LANGUAGE]["automat_shuffle_on"] = "Разбъркването е ON, натисни за OFF.";
        text[LANGUAGE]["automat_shuffle_off"] = " Разбъркването е OFF, натисни за ON.";
        text[LANGUAGE]["automat_rotate"] = "Завъртане: place first entry after the last entry";
        text[LANGUAGE]["automat_stop"] = "СТОП";
        text[LANGUAGE]["automat_week"] = "седмица";
        text[LANGUAGE]["automat_inftext"] = "Работи за неопределено време";
        text[LANGUAGE]["automat_removeAllWeed"] = "Премахва всички %AMOUNT% %PROD%<br>плевели = %COST%<br>total = %TCOST%";
        text[LANGUAGE]["automat_usedFarmFieldsReadyAt"] = "Използваните полета са готови в:";
        text[LANGUAGE]["automat_CloseWindowTimer"] = "Затваряне на прозореца след %1%";
        text[LANGUAGE]["automat_CloseWindowTimerClick"] = "Прекъсни таймера";
        //%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
        text[LANGUAGE]["automat_QueDoWork"] = "Зоната се обслужва от бота";
        text[LANGUAGE]["automat_QueDontWork"] = " Зоната е игнорирана от бота";
        text[LANGUAGE]["automat_QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
        text[LANGUAGE]["automat_QueStop0"] = "The automatic culturing process will be stopped";
        text[LANGUAGE]["automat_QueStop1"] = "After culturing %FLDFROM% field the automatic process will be stopped.";
        text[LANGUAGE]["automat_QueStopX"] = "After culturing %FLDFROM% fields the automatic process will be stopped.";
        text[LANGUAGE]["automat_QueRepeat"] = "(Режим-повторение)";
        text[LANGUAGE]["automat_QueShuffle"] = "(Режим-разбъркване)";
        text[LANGUAGE]["automat_QueRepeatShuffle"] = "( Режим-повторение-разбъркване)";
        text[LANGUAGE]["automat_QueFieldInRow1"] = "(Nr. %FLDFROM%)";
        text[LANGUAGE]["automat_QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
        text[LANGUAGE]["automat_QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skipped";
        text[LANGUAGE]["automat_QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
        text[LANGUAGE]["automat_QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
        text[LANGUAGE]["automat_QueFieldMake"] = "Общо:";
        text[LANGUAGE]["automat_QueFieldToGo"] = "To go:";
        text[LANGUAGE]["automat_QueRoundMake"] = "Всеки етап: ";
        text[LANGUAGE]["automat_QueRoundMade"] = "Произведено:";
        text[LANGUAGE]["automat_QueRoundToGo"] = "To do:";
        text[LANGUAGE]["automat_QueUses"] = "Uses:";
        text[LANGUAGE]["automat_QueGives"] = "Добив:";
        text[LANGUAGE]["automat_QueFutter"] = "Намалено време:";
        text[LANGUAGE]["automat_QueTimeThis"] = "Време за производство:";
        text[LANGUAGE]["automat_QueTimeToGo"] = "Оставащо време:";
        text[LANGUAGE]["automat_QueTimeReady"] = "Готово в:";
        text[LANGUAGE]["automat_QueTimeFirstReady"] = "Първото е готово в:";
        text[LANGUAGE]["automat_QueTimeNextReady"] = "Следващото е готово в:";
        text[LANGUAGE]["automat_QueTimeRound"] = "Average each turn:";
        text[LANGUAGE]["automat_QueRackMode"]="(Режи-шкаф)";
        text[LANGUAGE]["automat_queueshow"]="Редактирай опашка"; 
        text[LANGUAGE]["automat_zoneXWaiting"]="Зона \"%1%\ изчаква"; 
        //For the Mill
        //%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
        text[LANGUAGE]["automat_MillQueue"] = "Мелница-опашка";
        text[LANGUAGE]["automat_MillDoWork"] = "Мелницата се обслужва автоматично.";
        text[LANGUAGE]["automat_MillDontWork"] = "Мелницата е игнорирана. Необходимо е ръчно обслужване.";
        text[LANGUAGE]["automat_MillClearAddAll"] = "Clear mill list then add all recipes";
        text[LANGUAGE]["automat_MillShuffle"] = "(Режим-разбъркване)";
        text[LANGUAGE]["automat_MillInRow1"] = "(Nr. %FLDFROM%)";
        text[LANGUAGE]["automat_MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
        text[LANGUAGE]["automat_MillTimeTotal"] = "Време за приготвяне:";
        text[LANGUAGE]["automat_MillTimeReady"] = "Готово в:";
        text[LANGUAGE]["automat_MillStoped"] = "Прекъсване на опашката, тази %PRODNAME% няма да бъде приготвена";
        text[LANGUAGE]["automat_MillStop0"] = "Автоматичното приготвяне ще бъде спряно";
        text[LANGUAGE]["automat_MillStop1"] = "След %FLDFROM% рецепта, автоматичното приготвяне ще бъде спряно.";
        text[LANGUAGE]["automat_MillStopX"] = "След %FLDFROM% рецепти, автоматичното приготвяне ще бъде спряно.";
        try{
        text[LANGUAGE]["automat_MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
        text[LANGUAGE]["automat_MillPowerUpText_0"] = top.window.wrappedJSObject.powerup_bonustext1;
        text[LANGUAGE]["automat_MillPowerUpText_1"] = top.window.wrappedJSObject.powerup_bonustext2;
        text[LANGUAGE]["automat_MillPowerUpText_2"] = top.window.wrappedJSObject.powerup_bonustext3;
        text[LANGUAGE]["automat_MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
        }catch(err){GM_logError("texte mill","","",err);}
        text[LANGUAGE]["automat_number"] = "Брой";
        text[LANGUAGE]["automat_lack"] = "Не достига";
        text[LANGUAGE]["automat_MillRecipesBought"] = "Общо закупени рецепти: ";
        text[LANGUAGE]["automat_MillRecipesUsed"] = "Общо използвани рецепти: ";
        text[LANGUAGE]["automat_MillRecipesBake"] = "Максимално рецепти за приготвяне: ";
        //title
        text[LANGUAGE]["automat_title_on_general"] = "Показва само главна опашка<br>+Ctrl: Покажи опашка";
        text[LANGUAGE]["automat_title_off_general"] = "Показва само главна опашка<br>+Ctrl: Скрий опашка ";
        text[LANGUAGE]["automat_title_on_farm1"] = "Показва само ферма 1<br>+Ctrl: Покажи първа ферма";
        text[LANGUAGE]["automat_title_off_farm1"] = "Показва само ферма 1<br>+Ctrl: Скрий първа ферма ";
        text[LANGUAGE]["automat_title_on_farm2"] = "Показва само ферма 2<br>+Ctrl: Покажи втора ферма";
        text[LANGUAGE]["automat_title_off_farm2"] = "Показва само ферма 2<br>+Ctrl: Скрий втора ферма";
        text[LANGUAGE]["automat_title_on_farm3"] = "Показва само ферма 3<br>+Ctrl: Покажи трета ферма";
        text[LANGUAGE]["automat_title_off_farm3"] = "Показва само ферма 3<br>+Ctrl: Скрий трета ферма";
        text[LANGUAGE]["automat_title_on_farm4"] = "Показва само ферма 4<br>+Ctrl: Покажи четвърта ферма";
        text[LANGUAGE]["automat_title_off_farm4"] = "Показва само ферма 4<br>+Ctrl: Скрий четвърта ферма";
        text[LANGUAGE]["automat_title_on_farmersmarket"] = "Показва само фермерски пазар<br>+Ctrl: Покажи фермерски пазар ";
        text[LANGUAGE]["automat_title_off_farmersmarket"] = "Показва само фермерски пазар<br>+Ctrl: Скрий фермерски пазар ";
        text[LANGUAGE]["automat_title_on_megafield"] = "Показва само плантация<br>+Ctrl: Покажи плантация";
        text[LANGUAGE]["automat_title_off_megafield"] = "Показва само плантация<br>+Ctrl: Скрий плантация";
        text[LANGUAGE]["automat_title_on_city"] = "Показва само мелницата<br>+Ctrl: Покажи мелница";
        text[LANGUAGE]["automat_title_off_city"] = "Показва само мелницата<br>+Ctrl: Скрий мелница";
        text[LANGUAGE]["automat_title_on_forestry"] = "Показва само лесовъдство<br>+Ctrl: Покажи лесовъдство";
        text[LANGUAGE]["automat_title_off_forestry"] = "Показва само лесовъдство<br>+Ctrl: Скрий лесовъдство";
        text[LANGUAGE]["automat_title_on_foodworld"] = "Показва само пикник зона<br>+Ctrl: Покажи пикник зона";
        text[LANGUAGE]["automat_title_off_foodworld"] = "Показва само пикник зона<br>+Ctrl: Скрий пикник зона";
        text[LANGUAGE]["automat_title_on_type1"] = "Показва само полета<br>+Ctrl: Покажи полета";
        text[LANGUAGE]["automat_title_off_type1"] = "Показва само полета<br>+Ctrl: Скрий полета";
        text[LANGUAGE]["automat_title_on_type2"] = "Показва само обори<br>+Ctrl: Покажи обори";
        text[LANGUAGE]["automat_title_off_type2"] = "Показва само обори <br>+Ctrl: Скрий обори";
        text[LANGUAGE]["automat_title_on_type3"] = "Показва само фабрики<br>+Ctrl: Покажи фабрики";
        text[LANGUAGE]["automat_title_off_type3"] = "Показва само фабрики <br>+Ctrl: Скрий фабрики";
        text[LANGUAGE]["automat_title_on_all"] = "Покажи всички опашки";
        text[LANGUAGE]["automat_title_off_all"] = "Скрий всички опашки";
        //help
        text[LANGUAGE]["automat_help_0"] = [,"This script can be used to add automation to the cultivation process."];
        text[LANGUAGE]["automat_help_1"] = ["How it works","If you click the \""+text[LANGUAGE]["automat_botStart"]+"\" button at the bottom of the page the automation process will be started.<br>You even can continue gaming as long as nothing is ready. Then the bot begins to simulate the clicks a user does. During that period you shouldn't interact."];
        text[LANGUAGE]["automat_help_2"] = ["Field","At the bottom of every zone an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next at the field."];
        text[LANGUAGE]["automat_help_3"] = ["Queue","If in the option menu of the Automat the queue checkbox is checked, clicking the product culturing icon of a zone will display a queue where multiple products can be queued. If the background of a queue item is red this item will not be cultered because a production stop item is added somewhere before in the list."];
        text[LANGUAGE]["automat_help_4"] = ["Repeat","Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue."];
        text[LANGUAGE]["automat_help_5"] = ["Shuffle","Enabling the \"Shuffle\" check box will randomly culture a product from the list."];
        text[LANGUAGE]["automat_help_6"] = ["Stables","At the bottom of every zone with a stable an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this product will be used to feed the stable. Click this icon to choose the feed amount through the slider or change the feed product by selecting the product."];
        text[LANGUAGE]["automat_help_7"] = ["Factories","At the bottom of every zone with a factory an icon is displayed. If the icon shows <div class = \"kp"+PRODSTOP+"\" style = \"display:inline-block;\">&nbsp;</div> the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product of this factory."];
        text[LANGUAGE]["automat_help_8"] = [text[LANGUAGE]["automat_zonePairing"],"In the \""+text[LANGUAGE]["automat_zonePairing"]+"\" menu of the Automat the radio-buttons controle the pairing of the zones. Also the general queue is extended to allow multiple general queues."];
        text[LANGUAGE]["automat_help_9"] = ["Windmill","The windmill queue works the same as the zone queue but instead of products recipes are baked.<br>As extra the mill queue has a <div class = \"queueButtonAddAll\">&nbsp;</div> button which can be used to clear and refill the queue with all available recipes that were bought and where there are enough ingredients in the rack to bake them.<br>If the background of a queue item is yellow then there are not enough products to bake all these recipes.<br><br><b>Note: </b>For first time user that have already bought recipes. Go to the miller or the trading lady screen so the bought recipes can be stored into the system."];
    }
// Do not edit ********************************************************************************************************
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
    if(undefined===top.unsafeData.COUNTRY){
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
    }    
}catch(err){ GM_log("ERROR\npage="+location.href+"\n"+err); }
