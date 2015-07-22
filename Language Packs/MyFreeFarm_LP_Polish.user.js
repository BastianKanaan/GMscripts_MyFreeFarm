// ==UserScript==
// @name        MyFreeFarm LP Polish
// @namespace   https://github.com/BastianKanaan/GMscripts_MyFreeFarm
// @author      BastianKanaan
// @description Language pack "Polish" for MyFreeFarm Scripts
// @date        22.07.2015
// @version     1.0.3
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     /^http:\/\/(|www\.|s\d+\.)wolnifarmerzy.pl\/.*$/
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

    // Important constants
    const COUNTRY="PL"; // The country ISO-code (2 digits)
    const LANGUAGE="pl"; // The language ISO-code (2 digits)        
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
        text[LANGUAGE]["msgSubjectMarketsale"]="???";
        // - The content: The text where the information is stated. The information has to be replaced by "(.*?)".
        text[LANGUAGE]["msgContentMarketsale"]="(.*) zakupił od Ciebie na targu\\s*(\\d+)x (.*?) za kwotę\\s*<br>\\s*(.*?) ft\\."; 
        // *************
        // Take from a message sent if you sell something via contract.
        // - The subject.
        text[LANGUAGE]["msgSubjectContractsale"]="???";
        // - The content: The text where the general information is stated. The information has to be replaced by "(.*?)".
        text[LANGUAGE]["msgContentContractsale"]="(.*) podpisał wysłaną mu przez Ciebie umowę!<br>\\s*<br>\\s*Sprzedałeś następujące produkty:\\s*<br>([\\S\\s]*)\\s*<br>\\s*Należność za produkty w wysokości (.*?) ft została przelana na Twoje konto\\."; 
        // - The line-pattern for the detailed selling list (equals the replaced information above).
        text[LANGUAGE]["msgContentContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
        // *************
        // Take the subject from a message sent if you won in a competition.
        text[LANGUAGE]["msgSubjectCongratulation"]="???";
        // Take the subject from a message sent if somebody wants to add you as friend. The person has to be replaced by "(.+)".
        text[LANGUAGE]["msgSubjectFriend"]="(.+) chce zostać twoim przyjacielem";
        // Take the subject from a message sent if you reach the next level
        text[LANGUAGE]["msgSubjectLevel"]="???";
        // Take the subject from a message sent if you got a present.
        text[LANGUAGE]["msgSubjectPresent"]="???";
        // Take the subjects from messages sent if weed occurred on your field.
        text[LANGUAGE]["msgSubjectWeed1"]="???";
        text[LANGUAGE]["msgSubjectWeed2"]="???";
        
// And all the other texts you can enter what you want ****************************************************************
        text[LANGUAGE]["above"] = "Suma prod. powyżej";
        text[LANGUAGE]["absolute"] = "Potrzebne";
        text[LANGUAGE]["accountActive"]="Konto aktywne";
        text[LANGUAGE]["accounts"] = "Konta";
        text[LANGUAGE]["activation"] = "Aktywuje";
        text[LANGUAGE]["additionalFarmi"] = "%1% dodatkowy klient dziennie"; 
        text[LANGUAGE]["additionalForestFarmiSlot"] = "%1% dodatkowe miejsce w kolejce klientów leśnych";
        text[LANGUAGE]["additionalLogCapacity"] = "Zwiększa pojemność drewutni o %1%";
        text[LANGUAGE]["advertisingEnds"] = "Kampania reklamowa kończy się dziś";
        text[LANGUAGE]["adviser"] = "Doradca";
        text[LANGUAGE]["afterFee"] = "Po opłacie";
        text[LANGUAGE]["alertSetPriceNone"] = "Czy na pewno chcesz ustawić cenę %PRODUCT% na zero?";
        text[LANGUAGE]["alertSetPriceOverNPC"] = "Czy na pewno chcesz ustawić cenę %PRICE% dla %PRODUCT%?<br>To więcej niż dają NPC - %NPC%.";
        text[LANGUAGE]["alertSetPriceOverObs"] = "Czy na pewno chcesz ustawić cenę %PRICE% dla %PRODUCT%?<br>To znacznie więcej niż średnia (%OBS%).";
        text[LANGUAGE]["alertSetPriceUnderObs"] = "Czy na pewno chcesz ustawić cenę %PRICE% dla %PRODUCT%?<br>To znacznie mniej niż średnia (%OBS%).";
        text[LANGUAGE]["alertWillLowRack"] = "UWAGA! Na regale zostanie ci mniej niż ustalone minimum!";
        text[LANGUAGE]["all"] = "Wszystko";
        text[LANGUAGE]["autologinAllOk"] = "Wszystkie konta zalogowane.";
        text[LANGUAGE]["autologinChecking"] = "Sprawdzenie aktywnych sesji. Proszę odczekać %1% sekund<br>...";
        text[LANGUAGE]["bonus"]="Bonus";
        text[LANGUAGE]["boughtTickets"] = "Kupione losy";
        text[LANGUAGE]["buy"] = "Kupuj";
        text[LANGUAGE]["buyers"] = "Kupcy";
        text[LANGUAGE]["calcTo"] = "Wyliczone do"; 
        text[LANGUAGE]["carpentry"] = "Stolarnia";
        text[LANGUAGE]["city"] = "Miasto";
        text[LANGUAGE]["change"]="Change";
        text[LANGUAGE]["clearFilter"]="Wyczyść filtr";
        text[LANGUAGE]["click"] = "Klik";
        text[LANGUAGE]["clickAlt"] = "Alt+Klik";
        text[LANGUAGE]["clickCtrl"] = "Ctrl+Klik";
        text[LANGUAGE]["clickDouble"] = "Dwuklik";
        text[LANGUAGE]["clickToChange"] = "Kliknij aby zmienić";
        text[LANGUAGE]["clickDouble"]="Double-Click";
        text[LANGUAGE]["clickToChange"]="Click to change";
        text[LANGUAGE]["coins"]=unsafeWindow.t_coins;
        text[LANGUAGE]["commission"] = "Prowizja";
        text[LANGUAGE]["confirmUseObservedPrices"] = "Czy przyjąć średnią rynkową jako ceny na targu?";
        text[LANGUAGE]["confirmChangelogVersion"]="You have installed a new version of the Adviser script.<br>The version %1% contains the following changes:";
        text[LANGUAGE]["contract"] = "Umowa";
        text[LANGUAGE]["contractsReceived"] = "Umowy otrzymane";
        text[LANGUAGE]["contractsSent"] = "Umowy wysłane";
        text[LANGUAGE]["copyToTextFile"]="Copy this string to a text-file";
        text[LANGUAGE]["couldNotGetRank"]="Nie można określić twojego miejsca w rankingu."; 
        text[LANGUAGE]["couldNotGetUpdateInfoOfX"]="Nie znaleziono aktualizacji skryptu %1%"
        text[LANGUAGE]["createStorageString"]="Create storage string";
        text[LANGUAGE]["cropped"] = "Wysiewanie";
        text[LANGUAGE]["currentOffers"] = "Aktualne oferty";
        text[LANGUAGE]["dailyRuns"] = "Dzienna produkcja ";
        text[LANGUAGE]["dailyTicket"] = "Dzienne losy";
        text[LANGUAGE]["dailyYield"] = "Dzienny plon";
        text[LANGUAGE]["date"]="Date";
        text[LANGUAGE]["day"] = "Dzień";
        text[LANGUAGE]["day0"] = "Dziś";
        text[LANGUAGE]["day1"] = "Jutro";
        text[LANGUAGE]["day2"] = "Pojutrze"; //comment it if not used in the language
        text[LANGUAGE]["default"] = "Domyślnie";
        text[LANGUAGE]["delete"] = "Usuń";
        text[LANGUAGE]["deleteFollowingData"]="Delete following data";
        text[LANGUAGE]["demand"] = "Potrzebne";
        text[LANGUAGE]["detail"]="Detal";
        text[LANGUAGE]["difficulty"]="Difficulty";
        text[LANGUAGE]["donkey"]="Donkey";
        text[LANGUAGE]["duration"] = "Czas prod.";
        text[LANGUAGE]["editPrice"] = "Edytuj cenę";
        text[LANGUAGE]["emptyField"] = "Puste pole!";
        text[LANGUAGE]["end"]="End";
        text[LANGUAGE]["exchangedLots"] = "Wymienione losy";
        text[LANGUAGE]["farm"] = "Farma";
        text[LANGUAGE]["farmersmarket"]=unsafeWindow.t_farmers_market;
        text[LANGUAGE]["farmX"] = "%1%. farmę"; 
        text[LANGUAGE]["farmi"] = "Klient";
        text[LANGUAGE]["farmis"] = "Klienci";
        text[LANGUAGE]["farmpedia"] = "Do Niemieckiej FarmPedii";
        text[LANGUAGE]["farmpediaUrl"] = "http://farmpedia.myfreefarm.de/";
        text[LANGUAGE]["farmzone"] = "%1% miejsce pod zabudowę na %2% farmie";  
        text[LANGUAGE]["feed"] = "Karmienie";
        text[LANGUAGE]["fields"]="Fields";
        text[LANGUAGE]["filter"] = "Filtr";
        text[LANGUAGE]["filterForX"] = "Filtrowanie po %1%";
        text[LANGUAGE]["finished"] = "Gotowe";
        text[LANGUAGE]["foodworld"] = unsafeWindow.foodworld_title; 
        text[LANGUAGE]["forest"] = "Las";
        text[LANGUAGE]["forestry"] = "Leśnictwo";
        text[LANGUAGE]["formatNumbers"] = "Format liczb";
        text[LANGUAGE]["formulaType"] = ["Prod", "+val", "+pts"];
        text[LANGUAGE]["fl1"]="Rabatka";
        text[LANGUAGE]["fl2"]="Pracownia kwiatowa";
        text[LANGUAGE]["fl3"]="Monster fruit culture";
        text[LANGUAGE]["fl5"]="Animal doctor";
        text[LANGUAGE]["fl6"]="Speed eating";
        text[LANGUAGE]["fw1"] = "Stoisko z napojami";
        text[LANGUAGE]["fw2"] = "Bistro";
        text[LANGUAGE]["fw3"] = "Piekarnia";
        text[LANGUAGE]["gain"] = "Daje";
        text[LANGUAGE]["gamecurrency"]=unsafeWindow.gamecurrency;
        text[LANGUAGE]["general"] = "Ogólne";
        text[LANGUAGE]["given"] = "Oddano";
        text[LANGUAGE]["goods"] = "Towary";
        text[LANGUAGE]["goToDonkey"]="Go to donkey Luke";
        text[LANGUAGE]["goToLottery"] = "Przejdź do loterii";
        text[LANGUAGE]["goToMarket"] = "Idź na targ";
        text[LANGUAGE]["goToMarketOfX"] = "Idź na targ po %1%";
        text[LANGUAGE]["goToMarketstall"] = "Idź do Twojego Straganu";
        text[LANGUAGE]["goToPage"] = "Przejdź do strony";
        text[LANGUAGE]["goToRank"] = "Przejdź do pozycji";
        text[LANGUAGE]["goToX"]="Przejdź do %1%";
        text[LANGUAGE]["hide"]="ukryj";
        text[LANGUAGE]["highlightProducts"] = "Podświetl produkty na targu";
        text[LANGUAGE]["highlightUser"] = "Podświetl farmera na targu";
        text[LANGUAGE]["hotkeys"] = "Hotkeys";
        text[LANGUAGE]["idle"] = "Bezczynne!!";
        text[LANGUAGE]["importStorageString"]="Import storage string";
        text[LANGUAGE]["importStorageStringError"]="Sorry. Can't read the storage string.";
        text[LANGUAGE]["informationIsMissing"]="Brak danych."
        text[LANGUAGE]["ingredients"] = "Składniki";
        text[LANGUAGE]["inStock"] = "w regale";
        text[LANGUAGE]["invalidServer"] = "Błędny serwer";
        text[LANGUAGE]["inventory"] = "Zapasy";
        text[LANGUAGE]["jobIncomplete"]="Job not finished successfully";
        text[LANGUAGE]["jobComplete"]="Job finished successfully";
        text[LANGUAGE]["jobCurrent"]="Current job";
        text[LANGUAGE]["keptLots"] = "Zatrzymane losy";
        text[LANGUAGE]["level"] = "Poziom";
        text[LANGUAGE]["levelTooLow"] = "Twój poziom jest za niski";
        text[LANGUAGE]["levelXneeded"] = "Wymagany&nbsp;%1%&nbsp;poziom";
        text[LANGUAGE]["load"] = "Ładuj";
        text[LANGUAGE]["loading"] = "Ładowanie";
        text[LANGUAGE]["localTime"] = "Czas lokalny";
        text[LANGUAGE]["lodge"] = "Leśniczówka";
        text[LANGUAGE]["login"] = "Login";
        text[LANGUAGE]["loginPageFound"]="Found login page";
        text[LANGUAGE]["loginPortalSubmitted"]="Submitted portal login";
        text[LANGUAGE]["loginSubmitted"]="Submitted login";
        text[LANGUAGE]["logDonkey"]="Donkey Luke Log";
        text[LANGUAGE]["lotteryLog"] = "Historia loterii";
        text[LANGUAGE]["lvl"] = "Lvl";
        text[LANGUAGE]["manageVariables"] = "Zarządzaj zmiennymi";
        text[LANGUAGE]["market"] = "Targ";
        text[LANGUAGE]["marketplace"] = "Rynek";
        text[LANGUAGE]["marketPrice"] = "Na&nbsp;targu&nbsp;po";
        text[LANGUAGE]["marketstall"] = "Twój stragan";
        text[LANGUAGE]["megafield"]="Megafield";
        text[LANGUAGE]["megafieldCurrency"]=unsafeWindow.t_megafield_currency;
        text[LANGUAGE]["messages"] = "Wiadomości";
        text[LANGUAGE]["minRack"] = "Min&nbsp;ilość";
        text[LANGUAGE]["minRackamount"] = "Minimalna ilość w regale";
        text[LANGUAGE]["missing"] = "Brakuje";
        text[LANGUAGE]["money"] = "Oferuje";
        text[LANGUAGE]["name"] = "Login";
        text[LANGUAGE]["newLevelReached"] = "Gratulacje!<br>Osiągnąłeś kolejny poziom!";
        text[LANGUAGE]["nextMessage"] = "Następna wiadomość";
        text[LANGUAGE]["no"] = "Nie";
        text[LANGUAGE]["nothingSelected"]="Nothing selected";
        text[LANGUAGE]["NPC"] = "w sklepie";
        text[LANGUAGE]["NPCprice"] = "Cena sklepowa";
        text[LANGUAGE]["nr"] = "Nr";
        text[LANGUAGE]["observed"] = "Średnia rynkowa";
        text[LANGUAGE]["ok"] = "OK";
        text[LANGUAGE]["oldOnes"] = "Poprzednie";
        text[LANGUAGE]["options"] = "Opcje";
        text[LANGUAGE]["overNPCprice"] = "więcej niżw sklepie";
        text[LANGUAGE]["overview"] = "Przegląd";
        text[LANGUAGE]["overX"] = "więcej %1%";
        text[LANGUAGE]["pageXNotLoaded"]="Page '%1%' is not loaded completely.";
        text[LANGUAGE]["password"] = "Hasło";
        text[LANGUAGE]["pleaseOpenX"]="Otwórz %1%.";
        text[LANGUAGE]["points"] = "Punktów";
        text[LANGUAGE]["pleaseWait"]="Pleae wait";
        text[LANGUAGE]["portalLogin"]="Portal-Login";
        text[LANGUAGE]["powerups"] = "Power-Upy";
        text[LANGUAGE]["previousMessage"] = "Poprzednia wiadomość";
        text[LANGUAGE]["price"] = "Cena";
        text[LANGUAGE]["prices"] = "Ceny";
        text[LANGUAGE]["product"] = "Produkt";
        text[LANGUAGE]["production"] = "Produkcja";
        text[LANGUAGE]["productOverview"] = "Przegląd produktów";
        text[LANGUAGE]["products"] = "Produkty";
        text[LANGUAGE]["productTimeSaving"] = "%1% minut oszczędności dla %2%";  
        text[LANGUAGE]["profit"] = "Zysk";
        text[LANGUAGE]["profitTable"] = "Kalkulacja zysków dziennych";
        text[LANGUAGE]["quantity"] = "Ilość";
        text[LANGUAGE]["quest_foodworld"] = "Quest Piknikowy";
        text[LANGUAGE]["quest_forestry"]="Quest Leśny";
        text[LANGUAGE]["quest_main"]="Quest farmy";
        text[LANGUAGE]["questfoodworld1"]="Questy piknikowe";     
        text[LANGUAGE]["questforestry1"]="Questy I (leśne)";
        text[LANGUAGE]["questforestry2"]="Questy II (leśne)";
        text[LANGUAGE]["questmain1"]="Questy I (farma)";
        text[LANGUAGE]["questmain2"]="Questy II (farma)";
        text[LANGUAGE]["quests"] = "Questy";
        text[LANGUAGE]["rackX"] = "%1%. regał";
        text[LANGUAGE]["rank"] = "Pozycja";
        text[LANGUAGE]["readAll"] = "Wszystkie przeczytane";
        text[LANGUAGE]["readyAtX"] = "Gotowe o %1%"; //%1%=2:15+text[LANGUAGE]["shortOClock"]
        text[LANGUAGE]["readyAtX_day1"] = "Gotowe jutro o %1%";
        text[LANGUAGE]["readyAtX_day2"] = "Gotowe pojutrze o %1%"; //comment it if not used in the language
        text[LANGUAGE]["readySinceX"] = "Gotowe za %1%";
        text[LANGUAGE]["recipes"] = "Przepisy";
        text[LANGUAGE]["recursive"] = "Rekurencyjnie potrzebne"
        text[LANGUAGE]["relative"] = "Brakuje";
        text[LANGUAGE]["reloadInXSec"]="Reload in %1%s.";
        text[LANGUAGE]["relogin"] = "Zbliża się koniec sesji.<br>Nowe logowanie za %1% sek.";
        text[LANGUAGE]["remaining"]="Remaining";
        text[LANGUAGE]["requestingUpdateInfoOfX"]="Sprawdzam dostępne aktualizacje %1% ..."
        text[LANGUAGE]["requestingUserStatistic"]="Sprawdzam statystyki użytkownika ...";
        text[LANGUAGE]["requirement"] = "Potrzeba";
        text[LANGUAGE]["requirementPerProduction"] = "Wymagane do produkcji";
        text[LANGUAGE]["reward"] = "Nagroda";
        text[LANGUAGE]["salesLog"]="Log sprzedaży";
        text[LANGUAGE]["save"] = "Zapis";
        text[LANGUAGE]["saveAsTemplate"] = "Zapisz jako szablon";
        text[LANGUAGE]["sawmill"] = "Tartak";
        text[LANGUAGE]["scriptHomepage"] = "Strona skryptu";
        text[LANGUAGE]["searchPlayer"] = "Szukaj gracza";
        text[LANGUAGE]["seed"]="Seed";
        text[LANGUAGE]["seedPerField"]="Seed per field";
        text[LANGUAGE]["sendContract"] = "Wysłać umowę";
        text[LANGUAGE]["sendContractAgain"] = "Wyślij umowę ponownie";
        text[LANGUAGE]["sendingXObservedPricesToServer"]="Wysyłanie %1% obserwowanych cen na serwer ...";
        text[LANGUAGE]["sentContractNrX"]="Wyślij umowę nr %1%."
        text[LANGUAGE]["server"] = "Serwer";
        text[LANGUAGE]["serverTime"] = "Czas serwera";
        text[LANGUAGE]["sessionEnd"] = "Koniec sesji o %1% - Kliknij by zalogować ponownie";
        text[LANGUAGE]["seedVendor"] = "Sklep";
        text[LANGUAGE]["seedVendorShort"]="Sklep"; // Short for the seller of plants
        text[LANGUAGE]["shadowboxitem"]="Shadowbox item";
        text[LANGUAGE]["shortHours"] = "h";
        text[LANGUAGE]["shortOClock"] = "h";
        text[LANGUAGE]["shouldReload"] = "Powinieneś odświeżyć stronę.";
        text[LANGUAGE]["showAll"] = "Pokaż wszystko";
        text[LANGUAGE]["showChangelog"]="Show changelog";
        text[LANGUAGE]["showLog"] = "Pokaż log";
        text[LANGUAGE]["showMissingProducts"]="Pokaż braki produktowe";//?
        text[LANGUAGE]["showPasswords"] = "Pokaż hasło";
        text[LANGUAGE]["sinceX"] = "od %1%";
        text[LANGUAGE]["single"] = "Pojedyńczo";
        text[LANGUAGE]["start"] = "Start";
        text[LANGUAGE]["stat_days1"] = "1 dzień";
        text[LANGUAGE]["stat_days3"] = "3 dni";
        text[LANGUAGE]["stat_days5"] = "5 dni";
        text[LANGUAGE]["stat_days7"] = "7 dni";
        text[LANGUAGE]["stat_gamefield"] = "Pokaż grę";
        text[LANGUAGE]["stat_stats"] = "Pokaż statystyki";
        text[LANGUAGE]["statistics"] = "Statystyki";
        text[LANGUAGE]["stock"] = "Ilość";
        text[LANGUAGE]["stockValue"] = "Wartość towaru";
        text[LANGUAGE]["stockXlow"] = "Mało produktu: %1%";
        text[LANGUAGE]["stockXmissing"] = "Brakuje produktu: %1%!!!";
        text[LANGUAGE]["storeXinContract"] = "Przenieś %1% do umowy";
        text[LANGUAGE]["summarize"] = "Analiza obrotów";
        text[LANGUAGE]["takeObservedPrices"] = "Przyjmij średnią rynkową";
        text[LANGUAGE]["time"] = "Czsa";
        text[LANGUAGE]["title"] = "Nazwa";
        text[LANGUAGE]["toMessage"] = "do wiadomości";
        text[LANGUAGE]["toSeedVendor"] = "Idź do sklepu";
        text[LANGUAGE]["total"] = "Ogółem";
        text[LANGUAGE]["turnover"] = "Obrót";
        text[LANGUAGE]["unitPrice"] = "Cena jedn.";
        text[LANGUAGE]["upgradeForX"] = "Rozbudowa&nbsp;za&nbsp;%1%";
        text[LANGUAGE]["upgradeLevel"] = "Podnieś poziom";
        text[LANGUAGE]["upjersAdvertising"] = "Upjers-Advertising";
        text[LANGUAGE]["useQuestProducts"] = "Użyj towarów z bieżącego Questa";
        text[LANGUAGE]["userscriptNotStarted"]= "The userscript is not started completely.";
        text[LANGUAGE]["useWildcard"]= "Użyj * aby oznaczyć jedną lub więcej liter.";
        text[LANGUAGE]["value"] = "Wartość";
        text[LANGUAGE]["version"]="Version";
        text[LANGUAGE]["veterinayLevelXNeeded"]="Veterinary level %1% needed";
        text[LANGUAGE]["waterBonus"] = "%1%% bonus podlewania";
        text[LANGUAGE]["wateringFeature"] = "Maszyna nawadniajęaca";
        text[LANGUAGE]["waterNeeded"] = "Wymaga podlania";
        text[LANGUAGE]["waterNeededAtX"] = "Trzeba podlać o %1%";
        text[LANGUAGE]["waterNeededAtX_day1"] = "Trzeba podlać jutro o %1%";
        text[LANGUAGE]["windmill"] = "Młyn";
        text[LANGUAGE]["writeMessage"] = "Wyślij wiadomość";
        text[LANGUAGE]["XIsUpToDate"]="%1% jest aktualny."
        text[LANGUAGE]["yes"] = "Tak";
        text[LANGUAGE]["yield"] = "Plon";
        text[LANGUAGE]["yieldPerProduction"] = "Efekt produkcji";
        text[LANGUAGE]["youAreOnRankX"]="Jesteś na miejscu %1%.";
        // category
        text[LANGUAGE]["category_c"]=text[LANGUAGE]["coins"];
        text[LANGUAGE]["category_v"]="Rośliny";
        text[LANGUAGE]["category_e"]="Produkty zwierzęce";
        text[LANGUAGE]["category_z"]=unsafeWindow.rack_deco;
        text[LANGUAGE]["category_o"]=unsafeWindow.rack_oil;
        text[LANGUAGE]["category_f1"]="Sadzonki";
        text[LANGUAGE]["category_f2"]="Pnie";
        text[LANGUAGE]["category_f3"]="Produkty tartaku";
        text[LANGUAGE]["category_f4"]="Produkty stolarni";
        text[LANGUAGE]["category_f5"]="Produkty drewniane";
        text[LANGUAGE]["category_fw"]=unsafeWindow.rack_foodworld;
        text[LANGUAGE]["category_fw1"]="Napoje";
        text[LANGUAGE]["category_fw2"]="Przekąski";
        text[LANGUAGE]["category_fw3"]="Ciasta";
        text[LANGUAGE]["category_fw4"]="jeszcze niedostępne";
        text[LANGUAGE]["category_fl"]="Flowers";
        text[LANGUAGE]["category_fla"]="Arrangements";
        text[LANGUAGE]["category_hr"]="Medicinal herb";
        text[LANGUAGE]["category_md"]="Healing tincture";
        text[LANGUAGE]["category_r0"]="Przepisy - produkty";
        text[LANGUAGE]["category_r1"]="Przepisy - zwiększające wydajność";
        text[LANGUAGE]["category_r2"]="Przepisy - dające punkty";
        text[LANGUAGE]["category_p0"]="Power-Ups - produkty";
        text[LANGUAGE]["category_p1"]="Power-Ups - zwiększające wydajność";
        text[LANGUAGE]["category_p2"]="Power-Ups - dające punkty";  
        // settings
        text[LANGUAGE]["settings_valAutoWater"]=["Automatyczne podlewanie", "Rośliny będą automatycznie podlewane (jeśli masz konto Premium)."];
        text[LANGUAGE]["settings_valAssumeWater"]=["Kontynuuj podlewanie", "Jest to ważne dla roślin rosnących dłużej niż 24h. Na podstawie przewidywanego czasu zbioru jeśli podlewanie jest możliwe, to jest kontynuowane."];
        text[LANGUAGE]["settings_valAutoCrop"]=["Automatyczne zbiory", "Po wejściu na pole wszystkie plony zostaną automatycznie zebrane."];
        text[LANGUAGE]["settings_valWaterNeeded"]=["Info o podlewaniu","Czy ma być wyświetlana ikona informująca o niepodlanym polu?"];        
        text[LANGUAGE]["settings_valCropMsg"]=["Autozamykanie zbiorów", "Zaznacz jeśli denerwuje cię wyskakująca plansza z ilością zebranych plonów."];
        text[LANGUAGE]["settings_valLimitEmptyFields"]=["Puste miejsca", "Jeśli ilość pustych miejsc przekroczy tą wartość, to pole będzie oznaczone jako puste."];
        text[LANGUAGE]["settings_valLimitEmptyFields_forest"]=["Puste miejsca w lesie", "Jeśli ilość pustych miejsc przekroczy tą wartość, to pole będzie oznaczone jako puste."];
        text[LANGUAGE]["settings_valMoveAnimals"]=["Ruchome zwierzaki", ""];
        text[LANGUAGE]["settings_valContractLogAmount"]=["Ilość zachowanych umów", "Twoje ostatnio wysłanie i otrzymane umowy będą zachowane i będzie można przejrzeć ich historię."];
        text[LANGUAGE]["settings_valFarmiLimits"]=["Limit Klientów", "Klienci są oznaczani trzema kolorami zależnie od opłacalności ich oferty."];
        text[LANGUAGE]["settings_valFarmiMiniInfo"]=["Mini Info Klienta", "Wyświetla małe kółko pod klientem zależnie od opłacalności jego oferty."];
        text[LANGUAGE]["settings_valMinRackMan"]=["Minimalne ilości", "Możesz ustalić dokładną ilość *tutaj*"];
        text[LANGUAGE]["settings_valMinRack"]=[, " Produkt jest oznaczany, jeśli jego ilość w regale spadnie poniżej tego poziomu. Możesz ustalić różne wartości zależnie od kategorii."];
        text[LANGUAGE]["settings_valMinRackPlantsize"]=["Uwzględnij rozmiar sadzonki", "Przykładowo zboże potrzebuje tylko połowę powyższej wartości."];
        text[LANGUAGE]["settings_valMinRackGrowing"]=["Produkcja w toku", "Uwzględnia ilość produktów będących w trakcie produkcji/wzrostu i gotowych przez bonusy."];
        text[LANGUAGE]["settings_valMinRackQuest"]=["Produkty do Questów","Uwzględnia ilość potrzebną do wykonania Questa."];   
        text[LANGUAGE]["settings_valMinRackRecursive"]=["Produkty rekurencyjnie", "Dodaj produkty wymagane do produkcji brakujących towarów i przelicz ponownie dla takiego stanu (użyteczne przy produkcji leśnej)"];
        text[LANGUAGE]["settings_valMinRackFarmis"]=["Produkty klientów", "Dodaje ilość produktów potrzebnych dla klientów, którzy płacą więcej niż ustalone minimum."]
        text[LANGUAGE]["settings_valMinRackForestryFarmis"]=["Produkty klientów Lasu", "Dodaje ilość produktów potrzebnych dla klientów Lasu."];
        text[LANGUAGE]["settings_protectMinRack"]=["Ochrona sprzedaży", "Sprzedając na targu zostawi w regale ustalone minimum towaru"];
        text[LANGUAGE]["settings_valBuyingLimitDown"]=["Podświetlenie ceny poniżej minimum", ""];
        text[LANGUAGE]["settings_valBuyingLimit"]=["Górny limit zakupu", "Zaznaczasz do jakiej granicy chcesz kupować na targu. To chroni przed zakupem zbyt drogich produktów na targu."];
        text[LANGUAGE]["settings_valBuyingLimitNPC"]=["Blokada zakupów", "Pozwól na zakupy tylko do ceny sklepowej"];
        text[LANGUAGE]["settings_valSellingLimit"]=["Limity sprzedaży", "Zakres w jakim twoja sprzedaż będzie chroniona, abyś nie sprzedał swoich plonów zbyt tanio lub za drogo.."];
        text[LANGUAGE]["settings_valJoinPrices"]=["Uprość sprzedaż", "Połączy w jedno pola ceny na twoim straganie (ułatwia wprowadzanie cen)."];
        text[LANGUAGE]["settings_valQuicklinks"]=["Szybki przegląd rynku (ikony)", "Pokazuje wysuwany pasek z ikonami dostępnych towarów (z prawej)"];
        text[LANGUAGE]["settings_valUseObservedPrices"]=["Użyj średnich cen", "Podczas przeglądania cen na targu są one notowane i uśredniona cena jest wykazywana w tabeli cen. Czy automatycznie ma ona być przyjmowana jako rynkowa?"];
        text[LANGUAGE]["settings_valSendStatistics"]=["Wyślij statystyki", "Wspomaga <a href='http://mff.metrax.eu/' target='_blank'>Statistik-Server</a>.  Dane prywatne nie są wysyłąne!"];
        text[LANGUAGE]["settings_valPrivateMessages"]=["Ilość zachowanych prywatnych wiadomości", "Liczba prywatnych wiadomości, które zostaną zachowane, aby umożliwić przegląd historii danej umowy"];
        text[LANGUAGE]["settings_valMarketMessages"]=["Ilość zachowanych rynkowych wiadomości", "Zaznacz ile wiadomości ma być przechowywanych, nawet jeśli są starsze niż maksymalnie 7 dni."];
        text[LANGUAGE]["settings_valMessageRe"]=["Skrót tematu", "Zamienia \"Re:Re:\" na \"Re:\" w temacie wiadomości, gdy na nią odpowiadasz."];
      text[LANGUAGE]["settings_valMessagesSystemMarkRead"]=["Auto odczyt wiadomości","Automatycznie odczytywanie wiadomości systemowych."];
      text[LANGUAGE]["settings_valFoodworldFarmiPlacing"]=["Obsługa klientów strefy pikniku","Klienci stefy pikniku będą automatycznie umieszczani na wolnych miejscach."]; 
        text[LANGUAGE]["settings_valAutoLogin"]=["Automatyczne logowanie", "Po wprowadzeniu nazwy użytkownika i hasła następuje automatyczne logowanie. Pozwala to zachować ciągłość grania. Przy wielu kontach musi być dozwolone wyskakiwanie okienek."];
        text[LANGUAGE]["settings_valUpdate"]=["Aktualizacja", "Automatycznie sprawdza czy jest nowsza wersja tego skryptu."];
        text[LANGUAGE]["settings_valServerTimeOffset"]=["Czas serwera", ""];
        text[LANGUAGE]["settings_valGamecursor"]=["Kursor gry", "Użyj kursora gry zamiast systemowego."];
        text[LANGUAGE]["settings_valDrag"]=["Przesuwanie", "Pozwala na przesuwanie okien po kliknięciu na lewy górny róg."];
        text[LANGUAGE]["settings_valClickErrorbox"]=["Ukryj okno błędu", "Niektórzy użytkownicy mają problemy z oknem błędu. Pamiętaj jednak, że zasadniczo jest ono przydatne!"];
        text[LANGUAGE]["settings_valHotkeys"]=["Hotkeys", "Używanie klawiszy pozwala na szybsze poruszanie się po grze."];
        text[LANGUAGE]["settings_hotkeymap"]={"prevPage": "poprzednia wiadomość, pole, ...","nextPage": "następna wiadomość, pole, ...",      "farm1": "1-sza farma","farm2": "2-ga farma","farm3": "3-cia farma","guild": "Klub","city1": "Pierwsze miasto","city2": "Drugie miasto","farmilog": "Farmi-Log","help": "Pomoc","market": "Targ","marketstand": "Market stand","messages": "Wiadomości","options": "Opcje","profit": "Kalkulator zysków","sgh": "Sklep z nasionami","overview": "Przegląd","contract": "Umowy","systemmessage": "wiadomości systemowe"    };
        text[LANGUAGE]["settings_valzoneAddToGlobalTime"]=["Zintegruj", "Czy czas produkcji ma być wliczony do czasu ogólnego?"];
        text[LANGUAGE]["settings_valGlobaltimeShowCroppedZone"]=["Zintegruj zebrane pola", "Czy doliczyć do ogólnego czasu pola już zebrane?"];
        text[LANGUAGE]["settings_cacheReset"]=["Cache reset", "Usuwanie wszystkich danych zapisanych przez ten skrypt..."];
        //help
        text[LANGUAGE]["help_0"]=[,"Oto skrócona instrukcja funkcji dostępnych w Doradcy Farmera. Nie są tu opisane wszystkie, gdyż skrypt stale się rozwija. Aby odkryć niektóre wystarczy najechać na nie myszką. <br>Na dole strony widać przycisk opcji, możesz tam dopasować skrypt do swoich wymagań.<br> Generalnie skrypt wie tylko tyle ile zobaczy i ustalisz, więc w razie jakichś problemów radzę tam zajrzeć"];
        text[LANGUAGE]["help_1"]=["Pola","Po wejściu na pole skrypt zapisuje co jest produkowane, czas produkcji oraz czy rośliny są podlane. Informacje są później wyświetlane w widoku farmy. Każde pole ma własny licznik czasu, odliczający czas do zbioru.<br> Jeśli masz włączoną pomoc w sianiu to jest ona dostępna pod ikonką kwiatka. Na górze pola są umieszczone strzałki pozwalające na przemieszczanie się między polami"];
        text[LANGUAGE]["help_2"]=["Przegląd","Kliknięcie na świnkę na górze ekranu wyświetla przegląd informacji o całej farmie. Opisane jest tu każde pole, jego obecny stan (produkcja, punkty oraz czas zakończenia). Podawana jest też suma wszystkich zbiorów.<br> Poniżej wyświetlany jest spis brakujących produktów żądanych przez klientów. Zaś niżej szczegółowe zestawienie zamówień, w którym wyliczone są żądane produkty (braki oznaczone na czerwono), sugerowana cena, wartość rynkowa i nasz zysk.<br> Klikając na dany produkt (w zestawieniu braków lub indywidualnym) przeniesiesz się prosto na targ, abyś mógł go kupić.<br> Możesz też przejść do wybranego pola lub klienta po klikając na nie."];
        text[LANGUAGE]["help_3"]=["Niebieski pasek","Zdobywane punkty są codziennie zliczane, a ich ilość pokazywana na niebieskim pasku u dołu ekranu. Czarna kreska oddziela poziom poprzedni i bieżący, kreski białe oddzielają dni, zaś czerwona oznacza niedzielę.<br> Kliknięcie na ten pasek wyświetli tabelę zdobywanych punktów oraz braki w produktach"];
        text[LANGUAGE]["help_4"]=["Regał","Przedstawione tu informacje zostały rozszerzone o ceny oraz wartość towaru. Kolorem zaznaczone są towary, których jest za mało do zrealizowania zamówienia klientów."];
        text[LANGUAGE]["help_5"]=["Kalkulator zysków","U dołu planszy jest znaczek <img src=\"" + GFX + "buildingupdatebutton_off.png\" style=\"width: 15px; height: 15px;\">. Kliknięcie na niego otwiera tabelę zawierającą wyliczony czas zbiorów, ilość zdobywanych punktów oraz przewidywane zyski. Kliknięcie na gwiazdki zwiększa poziom dla danego towaru, zaś na nagłówki kolum - sortuje dane względem danej kolumny"];
        text[LANGUAGE]["help_6"]=["Klienci","Dymki nad klientami zostały rozszerzone o kalkulację czy zamówienie jest opłacalne. Towary, których jest za mało są oznaczone czerwoną ramką.<br> Na niebieskim pasku z prawej możesz ustalić poziom opłacalnośći poniżej którego klienci są odsyłani. <br>Tabela pozwala się zorientować jakie zyski osiągnięto z handlu z klientami"];
        text[LANGUAGE]["help_7"]=["Hotkeys","Możesz szybko przenosić się przy użyciu klawisza <i>Alt</i>+... zobacz w Opcjach!"];
        text[LANGUAGE]["help_8"]=["Targowisko","Na targu jesteś \"chroniony\", co znaczy, że nie możesz kupić towaru drożej niż w sklepie lub poza ustalonym w opcjach przedziałem. Jeśli włączony jest 'szybki przegląd rynku', to możesz przejść do wybranego towaru przez wysuwane boczne okno.<br> Z lewej u góry są strzałki pozwalające zmieniać towar oraz wyświetlana jest ilość danego towaru.<br> Na dole zaś jest bardzo ważny przycisk: CENY.<br> Zawiera on zestawienie ilości towarów oraz Arednich cen po jakich jest on wystawiany oraz ustalanej przez ciebie. Ceny te są wykorzystywane w wielu miejscach, więc dbaj by były aktualne.\" Średnia rynkowa\" jest ustalana, gdy odwiedzasz stronę danego towaru. Na twoim straganie wyświetlane jest kilka przydatnych informacji, zapamiętywana jest też twoja ostatnia oferta."];
        text[LANGUAGE]["help_9"]=["Wiadomości","Twoja sprzedaż jest monitorowana i wyświetlana od razu, więc nie trzeba klikać dwa razy.<br> Przydatny na pewno będzie przycisk \"Wszystkie przeczytane\" pozwalający za jednym kliknięciem oznaczyć wszystkie wiadomości. <br> Zaś przycisk \"Log\" zawiera zestawienie zapamiętanych wiadomości oraz analizy sprzedaży towarów na targu. <br>Twoje wiadomości prywatne są również zapamiętywane, więc znacznie łatiwej obsługuje się umowy."];
        text[LANGUAGE]["help_10"]=["Umowy","Są również zapamiętywane. Podczas tworzenia umowy w bocznym oknie wyświetlana jest wiadomość źródłowa, aby łatwiej było skompletować towar. Na bieżąco pokazywana jest wartość wysyłanego towaru. Można wysyłać wiele razy tą samą umowę."];
        text[LANGUAGE]["help_11"]=["Obsługa kont","Możesz zapisać wszystkie swoje konta w opcjach. Pozwala to na łatwe logowanie przy pomocy przycisków wyświetlanych na stronie startowej. Dzięki temu możesz przełączać się między kontami na tym samym serwerze."];
 
        text[LANGUAGE]["automat"] = "Automat";
        text[LANGUAGE]["automat_planting"] = "Wysiewanie...";
        text[LANGUAGE]["automat_waiting"] = "Oczekiwanie...";
        text[LANGUAGE]["automat_watering"] = "Podlewanie...";
        text[LANGUAGE]["automat_feeding"] = "Karmienie...";
        text[LANGUAGE]["automat_automatPlanting"] = "AutoZasiewy...";
        text[LANGUAGE]["automat_automatFeeding"] = "AutoKarmienie...";
        text[LANGUAGE]["automat_automatFactory"] = "AutoProdukcja...";
        text[LANGUAGE]["automat_automatMegafield"] = "Megafield machine";
        text[LANGUAGE]["automat_automatWindmill"] = "AutoMłyn...";
        text[LANGUAGE]["automat_botStart"] = "Startuj Auto-Bota";
        text[LANGUAGE]["automat_botStop"] = "Zatrzymaj Auto-Bota";
        text[LANGUAGE]["automat_settings_botErrorBehaviour"] = "Behaviour of Automaton in case of errors";
        text[LANGUAGE]["automat_settings_pageReload"] = "Reload of page";
        text[LANGUAGE]["automat_settings_botRestart"] = "Restart bot";
        text[LANGUAGE]["automat_zonePairing"] =  "Łączenie pól";
        text[LANGUAGE]["automat_debugInfo"] = "Debug Info";
        text[LANGUAGE]["automat_windmill"] ="Młyn";
        text[LANGUAGE]["automat_timing"] = "Czas";
        text[LANGUAGE]["automat_general"] =  "Ogólne";
        text[LANGUAGE]["automat_development"] = "Development";
        text[LANGUAGE]["automat_arrivedInFarm"] = "Arrived in farm";
        text[LANGUAGE]["automat_changeToFarmX"] = "Going to farm %1%";
        text[LANGUAGE]["automat_changingToX"] = "Going to %1%";
        text[LANGUAGE]["automat_closingFieldContainer"] = "Closing field";
        text[LANGUAGE]["automat_closingFactoryContainer"] = "Closing factory";
        text[LANGUAGE]["automat_closingStableContainer"] = "Closing stable";
        text[LANGUAGE]["automat_openingZoneX"] = "Opening zone %1%";
        text[LANGUAGE]["automat_zoneXIsOpened"] = "Zone %1% is opened";
        text[LANGUAGE]["automat_confirmChangelogVersion"]="You have installed a new version of the Automaton script.<br>The version %1% contains the following changes:";
        text[LANGUAGE]["automat_maximumStockCapacityReached"]="Maximum stock capacity will be reached.";
        text[LANGUAGE]["automat_nothingToCrop"]="Nothing to crop.";
        text[LANGUAGE]["automat_cropWaitingInX"]="Waiting for crop in %1%.";
        text[LANGUAGE]["automat_plantingAtX"]="Planting at %1%.";
        text[LANGUAGE]["automat_plantingNoFreeField"]="No free field to plant.";
        text[LANGUAGE]["automat_plantingSetX"]="Setting plant \"%1%\".";
        text[LANGUAGE]["automat_queueItemAmountDecreased"]="Queue item amount decreased..";
        text[LANGUAGE]["automat_queueItemDeleted"]="Queue item deleted.";
        text[LANGUAGE]["automat_responseWaiting"]="Waiting for response.";
        text[LANGUAGE]["automat_stopAdding"]="Adding stop to queue.";
        text[LANGUAGE]["automat_tourStarting"]="Starting tour.";
        text[LANGUAGE]["automat_vehicleNotKnown"]="No vehicle known.";
        text[LANGUAGE]["automat_vehicleXNotAvailable"]="Vehicle \"%1%\" not available.";
        text[LANGUAGE]["automat_vehicleXBuying"]="Buying vehicle \"%1%\".";
        text[LANGUAGE]["automat_vehicleXSelected"]="Vehicle \"%1%\" is selected.";
        text[LANGUAGE]["automat_msgUpdate"] = "Jest nowa wersja skryptu automatyzacji. Zainstalować?";
        text[LANGUAGE]["automat_shouldUpdateAdviser"] = "Powinieneś zaktualizować skrypt Doradcy!<br> Inaczej Automat nie będzie działał prawidłowo.";
        text[LANGUAGE]["automat_settings_autoPlant"] = "Czy wyświetlać ikony automatyzacji siewu?";
        text[LANGUAGE]["automat_settings_autoWater"] = "Czy pola mają być podlewane?";
        text[LANGUAGE]["automat_settings_autoFeed"] = "Czy wyświetlać ikony automatyzacji karmienia?";
        text[LANGUAGE]["automat_settings_botUse"] = "Użyj bota";
        text[LANGUAGE]["automat_settings_disableCropFields"]="Blokuj zbiory na uśpionych polach";
        text[LANGUAGE]["automat_settings_pauseShortMin"] = "Minimalna zwłoka dla automatyzacji siewu";
        text[LANGUAGE]["automat_settings_pauseShortMax"] = "Maksymalna zwłoka dla automatyzacji siewu";
        text[LANGUAGE]["automat_settings_pauseMin"] = "Minimalny czas oczekiwania między operacjami";
        text[LANGUAGE]["automat_settings_pauseMax"] = "Maksymalny czas oczekiwania między operacjami";
        text[LANGUAGE]["automat_settings_maxDurationBotRun"] = "Maximal running time of the automaton";
        text[LANGUAGE]["automat_settings_maxDurationBotStep"] = "Maximal running time for a step of the automaton";
        text[LANGUAGE]["automat_setToDefault"] = "Przywróć domyślne";
        text[LANGUAGE]["automat_settings_seedWaitForCrop"] ="Czekaj z zasiewem, jeśli do kolejnego zbioru to mniej niż";
        text[LANGUAGE]["automat_emergencyPlants"] = "Rośliny rezerwowe. Są używane jeśli wymagane rośliny nie są dostępne lub się skończą.";
        text[LANGUAGE]["automat_settings_useQueueList"] = "Użyj listy zasiewów dla pól.";
        text[LANGUAGE]["automat_set12a"] = "Usuń \n listy zasiewów\n dla wszystkich pól";
        text[LANGUAGE]["automat_set12b"] = "Usuwanie zakończone.";
        text[LANGUAGE]["automat_settings_showQueueTime"] = "Pokaż skalkulowany czas zbiorów na liście.";
        text[LANGUAGE]["automat_set18a"] ="Usuń wszystkie listy prac dla młyna";
        text[LANGUAGE]["automat_set18b"] = "Usuwanie zakończone";
        text[LANGUAGE]["automat_settings_powerUpActivate"] = "Aktywuj powerupy dla produktów";
        text[LANGUAGE]["automat_settings_lotteryActivate"] = "Automatycznie aktywuj dzienną loterię";
        text[LANGUAGE]["automat_settings_lotteryDailyLot"] = "Zaznacz, aby automatycznie odebrać nagrodę";
        text[LANGUAGE]["automat_settings_questActivate"] = "Aktywuj Quest automatycznie do questa:";
        text[LANGUAGE]["automat_settings_questSolving"] =  "Wykonaj Quest automatycznie do questa:";
        text[LANGUAGE]["automat_settings_farmiReject"] =  "Odrzucaj klientów poniżej :";
        text[LANGUAGE]["automat_settings_farmiAccept"] = "Akceptuj klientów powyżej:";
        text[LANGUAGE]["automat_settings_farmiAcceptBelowMinValue"] = "Akceptuj klientów, których obsługa spowoduje spadek towaru w Regale poniżej minimum.";
        text[LANGUAGE]["automat_settings_farmiRemoveMissing"] = "Usuwaj klientów dla których brakuje towaru i z najniższą wydajnością. Próg:";  
        text[LANGUAGE]["automat_fields"] = "Pola";
        text[LANGUAGE]["automat_titleGeneral"] = "Lista główna";;
        text[LANGUAGE]["automat_titleQueue"] = "Lista";
        text[LANGUAGE]["automat_QueCopyTextHeader"] = "Kopiuj listę";
        text[LANGUAGE]["automat_QueCopyTextHeaderFrom"] = "Kopuj z:";
        text[LANGUAGE]["automat_QueCopyTextHeaderTo"] = "Kopuj do:";
        text[LANGUAGE]["automat_QueAddText"] = "Kliknij aby dodać produkt do listy."; //Add product
        text[LANGUAGE]["automat_QueAddAboveText"] = "Kliknij aby dodać produkt do listy przed tą pozycją.";
        text[LANGUAGE]["automat_QueDeleteText"] = "Usuń ten produkt z listy.";
        text[LANGUAGE]["automat_QueClose"] = "Zamknij to menu";
        text[LANGUAGE]["automat_QueCloseAll"] = "Zamknij wszystkie otwarte listy zasiewów.";
        text[LANGUAGE]["automat_QueMin"] = "Zmniejsz wartość";
        text[LANGUAGE]["automat_QuePlus"] = "Zwiększ wartość";
        text[LANGUAGE]["automat_QueBehaviourF"] = "Kliknij aby przejść do trybu Regału";
        text[LANGUAGE]["automat_QueBehaviourR"] = "Kliknij aby przejść do trubu Pól";
        text[LANGUAGE]["automat_QueUpButton"] = "W górę";
        text[LANGUAGE]["automat_QueDownButton"] = "W dół";
        text[LANGUAGE]["automat_buttonTimeLine"] = "Pokaż linie czasowe prac";
        text[LANGUAGE]["automat_buttonOverview"] = "Pokaż przegląd automatyzacji";
        text[LANGUAGE]["automat_repeat_on"] = "Zapętlenie listy: TAK, kliknij aby wyłączyć.";
        text[LANGUAGE]["automat_repeat_off"] = "Zapętlenie listy: NIE, kliknij aby włączyć.";
        text[LANGUAGE]["automat_shuffle_on"] = "Losowe zasiewy: TAK, kliknij aby wyłączyć.";
        text[LANGUAGE]["automat_shuffle_off"] = "Losowe zasiewy: NIE, kliknij aby włączyć.";
        text[LANGUAGE]["automat_rotate"] = "Rotacja: przesuń towary o jedną pozycję (pierwszy na koniec)";
        text[LANGUAGE]["automat_stop"] = "STOP";
        text[LANGUAGE]["automat_week"] = "tydzień";
        text[LANGUAGE]["automat_inftext"] = "w nieskończoność";
        text[LANGUAGE]["automat_removeAllWeed"] = "Usuń wszystkie %AMOUNT% %PROD%<br>za szt. = %COST%<br>razem = %TCOST%";
        text[LANGUAGE]["automat_usedFarmFieldsReadyAt"] = "Użyte pola gootowe o:";
        text[LANGUAGE]["automat_CloseWindowTimer"] = "Zamknięcie ekranu za :%1%";
        text[LANGUAGE]["automat_CloseWindowTimerClick"] = "Kliknij aby zresetować timer!";
        //%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
        text[LANGUAGE]["automat_QueDoWork"] = "Pole obsługiwane przez bota";
        text[LANGUAGE]["automat_QueDontWork"] = "Pole ignorowane przez bota";
        text[LANGUAGE]["automat_QueueStoped"] = "Wykryto wstrzymanie produkcji. %PRODNAME% nie będzie dalej siany.";
        text[LANGUAGE]["automat_QueStop0"] = "Proces automatycznych zasiewów zostanie zatrzymany.";
        text[LANGUAGE]["automat_QueStop1"] = "Po obsianiu %FLDFROM% pola proces automatycznych zasiewów zostanie zatrzymany.";
        text[LANGUAGE]["automat_QueStopX"] =  "Po obsianiu %FLDFROM% pól proces automatycznych zasiewów zostanie zatrzymany.";
        text[LANGUAGE]["automat_QueRepeat"] = "(Tryb powtarzania)";
        text[LANGUAGE]["automat_QueShuffle"] = "(Tryb losowy)";
        text[LANGUAGE]["automat_QueRepeatShuffle"] = "(Tryb losowy powtarzalny)";
        text[LANGUAGE]["automat_QueFieldInRow1"] = "(Nr. %FLDFROM%)";
        text[LANGUAGE]["automat_QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
        text[LANGUAGE]["automat_QueRoundDoneR"] = "Te pola %PRODNAME% są już zagospodarowane i zostaną pominięte";
        text[LANGUAGE]["automat_QueRoundDone1"] = "Na tym polu %PRODNAME% został wysiany w tej turze, <br/>w kolejnej turze będzie wysiany ponownie.";
        text[LANGUAGE]["automat_QueRoundDoneX"] = "Na tych polach %PRODNAME% zostały wysiane w tej turze, <br/>w kolejnej turze będą wysiane ponownie.";
        text[LANGUAGE]["automat_QueFieldMake"] =  "Ogółem:";
        text[LANGUAGE]["automat_QueFieldToGo"] = "Pozostało:";
        text[LANGUAGE]["automat_QueRoundMake"] = "W każdej turze: ";
        text[LANGUAGE]["automat_QueRoundMade"] = "Wyprodukowano:";
        text[LANGUAGE]["automat_QueRoundToGo"] = "Pozostało:";
        text[LANGUAGE]["automat_QueUses"] = "Użyto:";
        text[LANGUAGE]["automat_QueGives"] = "Plon:";
        text[LANGUAGE]["automat_QueFutter"] = "Zysk czasowy:";
        text[LANGUAGE]["automat_QueTimeThis"] =  "Czas produkcji:";
        text[LANGUAGE]["automat_QueTimeToGo"] =  "Pozostały czas wzrostu:";
        text[LANGUAGE]["automat_QueTimeReady"] = "Gotowe o:";
        text[LANGUAGE]["automat_QueTimeFirstReady"] = "Pierwsze gotowe o:"
        text[LANGUAGE]["automat_QueTimeNextReady"] = "Następne gotowe o:";
        text[LANGUAGE]["automat_QueTimeRound"] =  "Średnio na turę:";
        text[LANGUAGE]["automat_QueRackMode"]="(Tryb regału)"
        text[LANGUAGE]["automat_queueshow"]="Kliknij aby edytować kolejkę";
        text[LANGUAGE]["automat_zoneXWaiting"]="Zone \"%1%\" is waiting"; 
        //For the Mill
        //%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
        text[LANGUAGE]["automat_MillQueue"] =  "Lista Młyna";
        text[LANGUAGE]["automat_MillDoWork"] ="Młyn jest obsługiwany automatycznie.";
        text[LANGUAGE]["automat_MillDontWork"] = "Młyn jest pomijany. Wymagana obsługa ręczna";
        text[LANGUAGE]["automat_MillClearAddAll"] ="Wyczyść listę młyna i dodaj ponownie wszystkie przepisy";     
        text[LANGUAGE]["automat_MillShuffle"] = "(Tryb losowy)";
        text[LANGUAGE]["automat_MillInRow1"] = "(Nr. %FLDFROM%)";
        text[LANGUAGE]["automat_MillInRowX"] = "(Nr. %FLDFROM% do %FLDTO%)";
        text[LANGUAGE]["automat_MillTimeTotal"] = "Całkowity czas tworzenia:";
        text[LANGUAGE]["automat_MillTimeReady"] = "Gotowe:";
        text[LANGUAGE]["automat_MillStoped"] = "Wykryto wstrzymanie produkcji. %PRODNAME% nie będzie dalej tworzony.";
        text[LANGUAGE]["automat_MillStop0"] = "Proces automatycznych wypieków zostanie zatrzymany.";
        text[LANGUAGE]["automat_MillStop1"] =  "Po wykonaniu %FLDFROM% przepisu proces automatycznych wypieków zostanie zatrzymany.";
        text[LANGUAGE]["automat_MillStopX"] = "Po wykonaniu %FLDFROM% przepisów proces automatycznych wypieków zostanie zatrzymany.";
        try{
            text[LANGUAGE]["automat_MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
            text[LANGUAGE]["automat_MillPowerUpText_0"] = top.window.wrappedJSObject.powerup_bonustext1;
            text[LANGUAGE]["automat_MillPowerUpText_1"] = top.window.wrappedJSObject.powerup_bonustext2;
            text[LANGUAGE]["automat_MillPowerUpText_2"] = top.window.wrappedJSObject.powerup_bonustext3;
            text[LANGUAGE]["automat_MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
        }catch(err){GM_logError("texte mill","","",err);}
        text[LANGUAGE]["automat_number"] ="Numer";
        text[LANGUAGE]["automat_lack"] = "Brak";
        text[LANGUAGE]["automat_MillRecipesBought"] = "Ilość wypieków ogółem: ";
        text[LANGUAGE]["automat_MillRecipesUsed"] = "Użyto ogółem przepisów: ";
        text[LANGUAGE]["automat_MillRecipesBake"] ="Max przepisów do zrobienia: ";
        //title
        text[LANGUAGE]["automat_title_on_general"] = "Pokaż tylko Listę Główną<br>+Ctrl: Pokaż Liste Główną";
        text[LANGUAGE]["automat_title_off_general"] = "Pokaż tylko Listę Główną<br>+Ctrl: Schowaj Liste Główną";
        text[LANGUAGE]["automat_title_on_farm1"] = "Pokaż tylko pierwszą farmę<br>+Ctrl: Pokaż pierwszą farmę";
        text[LANGUAGE]["automat_title_off_farm1"] = "Pokaż tylko pierwszą farmę<br>+Ctrl: Schowaj pierwszą farmę";
        text[LANGUAGE]["automat_title_on_farm2"] = "Pokaż tylko drugą farmę<br>+Ctrl: Pokaż drugą farmę";
        text[LANGUAGE]["automat_title_off_farm2"] = "Pokaż tylko drugą farmę<br>+Ctrl: Schowaj drugą farmę";
        text[LANGUAGE]["automat_title_on_farm3"] = "Pokaż tylko trzecią farmę<br>+Ctrl: Pokaż trzecią farmę";
        text[LANGUAGE]["automat_title_off_farm3"] = "Pokaż tylko trzecią farmę<br>+Ctrl: Schowaj trzecią farmę";
        text[LANGUAGE]["automat_title_on_farm4"] = "Pokaż tylko czwartą farmę<br>+Ctrl: Pokaż czwartą farmę";
        text[LANGUAGE]["automat_title_off_farm4"] = "Pokaż tylko czwartą farmę<br>+Ctrl: Schowaj czwartą farmę";
        text[LANGUAGE]["automat_title_on_farmersmarket"] = "Show farmersmarket only<br>+Ctrl: Show farmersmarket";
        text[LANGUAGE]["automat_title_off_farmersmarket"] = "Show farmersmarket only<br>+Ctrl: Hide farmersmarket";
        text[LANGUAGE]["automat_title_on_megafield"] = "Show megafield only<br>+Ctrl: Show megafield";
        text[LANGUAGE]["automat_title_off_megafield"] = "Show megafield only<br>+Ctrl: Hide megafield";
        text[LANGUAGE]["automat_title_on_city"] = "Show city only<br>+Ctrl: Show city";
        text[LANGUAGE]["automat_title_off_city"] = "Show city only<br>+Ctrl: Hide city";
        text[LANGUAGE]["automat_title_on_forestry"] = "Pokaż tylko las<br>+Ctrl: Pokaż las";
        text[LANGUAGE]["automat_title_off_forestry"] = "Pokaż tylko las<br>+Ctrl: Schowaj las";
        text[LANGUAGE]["automat_title_on_foodworld"] = "Pokaż tylko piknik<br>+Ctrl: Pokaż piknik";
        text[LANGUAGE]["automat_title_off_foodworld"] = "Pokaż tylko piknik<br>+Ctrl: Schowaj piknik";
        text[LANGUAGE]["automat_title_on_type1"] ="Pokaż tylko pola<br>+Ctrl: Pokaż pola";  
        text[LANGUAGE]["automat_title_off_type1"] = "Pokaż tylko pola<br>+Ctrl: Schowaj pola";  
        text[LANGUAGE]["automat_title_on_type2"] = "Pokaż tylko zagrody<br>+Ctrl: Pokaż zagrody";  
        text[LANGUAGE]["automat_title_off_type2"] = "Pokaż tylko zagrody<br>+Ctrl: Schowaj zagrody";  
        text[LANGUAGE]["automat_title_on_type3"] = "Pokaż tylko wytwórnie<br>+Ctrl: Pokaż wytwórnie";   
        text[LANGUAGE]["automat_title_off_type3"] = "Pokaż tylko wytwórnie<br>+Ctrl: Schowaj wytwórnie";
        text[LANGUAGE]["automat_title_on_all"] ="Pokaż listy dla wszystkich farm";
        text[LANGUAGE]["automat_title_off_all"] =  "Ukryj listy dla wszystkich farm";
        //help
        text[LANGUAGE]["automat_help_0"] = [, "Ten skrypt służy do automatyzacji produkcji na farmie."];
        text[LANGUAGE]["automat_help_1"] = ["Jak to działa?", "Jeśli klikniesz na dole przycisk '" + text[LANGUAGE]["automat"]["botStart"] + "' rozpocznie się proces automatyzacji.<br>Możesz kontynuować grę samemu dopóki nic nie będzie gotowe. Wówczas bot rozpocznie symulację klinięć za użytkownika. Podczas tego procesu nie powinieneś przeszkadzać automatowi."];
        text[LANGUAGE]["automat_help_2"] = ["Pole", "U dołu każdego pola wyświetlana jest ikona. Jeśli ikona pokazuje <div class = \"kp" + PRODSTOP + "\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub będzie zatrzymany po zakończeniu bieżących operacji. Na tym polu nie będzie nic siane ani produkowane do momentu wybrania innej opcji. Jeśli wybrana jest ikona produktu to będzie on wysiewany/produkowany w następnej kolejności."];
        text[LANGUAGE]["automat_help_3"] = ["Plan zasiewów", "Jeśli w opcjach zaznaczona jest lista zasiewów, kliknięcie na ikonę rośliny na wybranym polu wyświetla listę produktów, które mogą być uprawiane. Jeśli tło danej pozycji na liście jest czerwone, to znaczy, że do listy została dodana ikona zatrzymania produkcji gdzieś przed tą pozycją."];
        text[LANGUAGE]["automat_help_4"] = ["Zapętlenie", "Ikona \"Zapętlenie listy\" oznacza, że po włączeniu zasiewy będą realizowane \"w pętli\" tj. po ostatnim zostanie wysiany pierwszy i tak w kółko."];
        text[LANGUAGE]["automat_help_5"] = ["Losowe zasiewy", "Włączenie opcji \"Losowe zasiewy\" spowoduje, że do uprawy będą wybierane losowo pozycje z listy."];
        text[LANGUAGE]["automat_help_6"] = ["Zagrody", "Na dole każdej zagrody wyświetlana jest ikona. Jeśli pokazuje </div>" + PRODSTOP + "\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub będzie zatrzymany po zakończeniu bieżących operacji. Jeśli wyświetlany jest produkt, to będzie on używany w zagrodzie. Po kliknięciu na ikonę można zmienić produkt oraz ilość jaka będzie użyta do karmienia. Kliknięcie na ikonę pozwala ustawić ilość karmy za pomocą suwaka lub zmienić rodzaj karmy."];
        text[LANGUAGE]["automat_help_7"] = ["Przetwórnie", "Na dole każdej przetwórni również jest ikona i podobnie jak w przypadku pól czy zagród wyświetlenie <div class = \"kp" + PRODSTOP + "\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub będzie zatrzymany po zakończeniu bieżących operacji. Wyświetlana inna ikona informuje co jest produkowane obecnie."];
        text[LANGUAGE]["automat_help_8"] = [text[LANGUAGE]["automat_zonePairing"],"W opcji \"" + text[LANGUAGE]["automat"]["zonePairing"] + "\" znaczniki pozwalają ustalić, które pola wchodzą w skład danej listy zasiewów, co według niej będzie wysiewane oraz dodać dodatkowe listy zasiewów."];
        text[LANGUAGE]["automat_help_9"] = ["Młyn", "Lista prodkucji dla młyna działa podobnie jak lista zasiewów tylko, że tu wyrabiane są przepisy.<br> Lista produkcji dla młyna posiada dodatkowy przycisk <div class = \"queueButtonAddAll\">&nbsp;</div>, który może być wykorzystany do wyczyszczenia bieżcej listy i utworzenia nowej na podstawie zakupionych przepisów oraz ilości produktów w regale. Jeśli lista podświetlona jest na żółto to znaczy, że jest za mało surowców do produkcji wszystkich przepisów.<br><br><b>Uwaga: </b>Przed pierwszym użyciem, jeśli już zakupiliśmy, przepisy konieczna jest wizyta u handlarki lub młynarza, aby automat wczytał zakupione przepisy."];
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

