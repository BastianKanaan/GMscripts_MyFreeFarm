// ==UserScript==
// @name        MyFreeFarm LP Spanish
// @namespace   https://github.com/BastianKanaan/GMscripts_MyFreeFarm
// @author      BastianKanaan
// @description Language pack "Spanish" for MyFreeFarm Scripts
// @date        23.07.2015
// @version     1.0.4
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     /^http:\/\/(|www\.|s\d+\.)migranjalinda\.es\/.*$/
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
    const COUNTRY="ES"; // The country ISO-code (2 digits)
    const LANGUAGE="es"; // The language ISO-code (2 digits)
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
        // - The content: The text where the information is stated. The information has to be replaced by "(.*?)".
        text[LANGUAGE]["msgContentMarketsale"]="(.*) te ha comprado\\s*(\\d+) (.*?)\\s*<br>\\s*por (.*?) MG en el mercado\\.";
        // *************
        // Take from a message sent if you sell something via contract.
        // - The subject.
        text[LANGUAGE]["msgSubjectContractsale"]="xxx";
        // - The content: The text where the general information is stated. The information has to be replaced by "(.*?)".
        text[LANGUAGE]["msgContentContractsale"]="¡(.*) ha firmado un contrato tuyo!<br><br>\\s*Los siguientes productos se han vendido:<br>([\\S\\s]*)\\s*<br>\\s*El importe del contrato de (.*?) MG se ha sumado a tu cuenta\\.";
        // - The line-pattern for the detailed selling list (equals the replaced information above).
        text[LANGUAGE]["msgContentContractsaleList"]="\\s*(\\d+)x (.*?)<br>";
        // *************
        // Take the subject from a message sent if you won in a competition.
        text[LANGUAGE]["msgSubjectCongratulation"]="xxx";
        // Take the subject from a message sent if somebody wants to add you as friend. The person has to be replaced by "(.+)".
        text[LANGUAGE]["msgSubjectFriend"]="xxx";
        // Take the subject from a message sent if you reach the next level
        text[LANGUAGE]["msgSubjectLevel"]="xxx";
        // Take the subject from a message sent if you got a present.
        text[LANGUAGE]["msgSubjectPresent"]="xxx";
        // Take the subjects from messages sent if weed occurred on your field.
        text[LANGUAGE]["msgSubjectWeed1"]="xxx";
        text[LANGUAGE]["msgSubjectWeed2"]="xxx";
    
// And all the other texts you can enter what you want ****************************************************************
        text[LANGUAGE]["above"]="above";
        text[LANGUAGE]["absolute"]="absolute";
        text[LANGUAGE]["accountActive"]="Account active";
        text[LANGUAGE]["accounts"]="Accounts";
        text[LANGUAGE]["activation"]="Activation";
        text[LANGUAGE]["additionalFarmi"]="%1% additional farmie daily";
        text[LANGUAGE]["additionalForestFarmiSlot"]="%1% additional place in the forest farmi waiting queue";
        text[LANGUAGE]["additionalLogCapacity"]="Rack capacity for logs increases of %1%";
        text[LANGUAGE]["advertisingEnds"]="Advertising ends today";
        text[LANGUAGE]["adviser"]="Adviser";
        text[LANGUAGE]["afterFee"]="After Fee";
        text[LANGUAGE]["alertSetPriceNone"]="Do you really want to set no price for %PRODUCT%?";
        text[LANGUAGE]["alertSetPriceOverNPC"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is higher than the NPC-value of %NPC%.";
        text[LANGUAGE]["alertSetPriceOverObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much higher than the observed value of %OBS%.";
        text[LANGUAGE]["alertSetPriceUnderObs"]="Do you really want to set the price of %PRICE% for %PRODUCT%?<br>It is much lower than the observed value of %OBS%.";
        text[LANGUAGE]["alertWillLowRack"]="Attention! This will drop your stock below the minimal value!";
        text[LANGUAGE]["all"]="All";
        text[LANGUAGE]["autologinAllOk"]="All accounts logged in.";
        text[LANGUAGE]["autologinChecking"]="Checking active sessions.  Please wait %1% seconds<br>...";
        text[LANGUAGE]["bonus"]="Bonus";
        text[LANGUAGE]["boughtTickets"]="Bought tickets";
        text[LANGUAGE]["buy"]="Buy";
        text[LANGUAGE]["buyers"]="Buyers";
        text[LANGUAGE]["calcTo"]="Calculate to";
        text[LANGUAGE]["carpentry"]="Carpentry";
        text[LANGUAGE]["city"]="City";
        text[LANGUAGE]["change"]="Change";
        text[LANGUAGE]["clearFilter"]="Clear filter";
        text[LANGUAGE]["click"]="Click";
        text[LANGUAGE]["clickAlt"]="Alt+Click";
        text[LANGUAGE]["clickCtrl"]="Ctrl+Click";
        text[LANGUAGE]["clickDouble"]="Double-Click";
        text[LANGUAGE]["clickToChange"]="Click to change";
        text[LANGUAGE]["coins"]=unsafeWindow.t_coins;
        text[LANGUAGE]["commission"]="Commission";
        text[LANGUAGE]["confirmUseObservedPrices"]="The observed prices will overwrite previously saved market prices ...";
        text[LANGUAGE]["confirmChangelogVersion"]="You have installed a new version of the Adviser script.<br>The version %1% contains the following changes:";
        text[LANGUAGE]["contract"]="Contract";
        text[LANGUAGE]["contractsReceived"]="Contracts received";
        text[LANGUAGE]["contractsSent"]="Contracts sent";
        text[LANGUAGE]["copyToTextFile"]="Copy this string to a text-file";
        text[LANGUAGE]["couldNotGetRank"]="Your rank could not be determined.";
        text[LANGUAGE]["couldNotGetUpdateInfoOfX"]="Update information for %1% could not be determined.";
        text[LANGUAGE]["createStorageString"]="Create storage string";
        text[LANGUAGE]["cropped"]="Cropped";
        text[LANGUAGE]["currentOffers"]="Current offers";
        text[LANGUAGE]["dailyRuns"]="Daily runs";
        text[LANGUAGE]["dailyTicket"]="Daily ticket";
        text[LANGUAGE]["dailyYield"]="Daily yield";
        text[LANGUAGE]["date"]="Date";
        text[LANGUAGE]["day"]="Day";
        text[LANGUAGE]["day0"]="Today";
        text[LANGUAGE]["day1"]="Tomorrow";
        // text[LANGUAGE]["day2"]="Day after tomorrow"; // comment it if not used in the language
        text[LANGUAGE]["default"]="Default";
        text[LANGUAGE]["delete"]="Delete";
        text[LANGUAGE]["deleteFollowingData"]="Delete following data";
        text[LANGUAGE]["demand"]="Demand";
        text[LANGUAGE]["detail"]="Detail";
        text[LANGUAGE]["difficulty"]="Difficulty";
        text[LANGUAGE]["donkey"]="Donkey";
        text[LANGUAGE]["duration"]="duration";
        text[LANGUAGE]["editPrice"]="Edit price";
        text[LANGUAGE]["emptyField"]="Empty field!";
        text[LANGUAGE]["end"]="End";
        text[LANGUAGE]["exchangedLots"]="Exchanged lots";
        text[LANGUAGE]["farm"]="Farm";
        text[LANGUAGE]["farmersmarket"]=unsafeWindow.t_farmers_market;
        text[LANGUAGE]["farmX"]="%1%. farm";
        text[LANGUAGE]["farmi"]="Farmie";
        text[LANGUAGE]["farmis"]="Farmies";
        text[LANGUAGE]["farmpedia"]="FarmPedia";
        text[LANGUAGE]["farmpediaUrl"]="http://farmpedia.myfreefarm.de/";
        text[LANGUAGE]["farmzone"]="Building place %1% of %2%. farm";
        text[LANGUAGE]["feed"]="Feed";
        text[LANGUAGE]["fields"]="Fields";
        text[LANGUAGE]["filter"]="Filter";
        text[LANGUAGE]["filterForX"]="Filter for %1%";
        text[LANGUAGE]["finished"]="Finished";
        text[LANGUAGE]["foodworld"]=unsafeWindow.foodworld_title;
        text[LANGUAGE]["forest"]="Forest";
        text[LANGUAGE]["forestry"]="Forestry";
        text[LANGUAGE]["formatNumbers"]="Format numbers";
        text[LANGUAGE]["formulaType"]=["Prod","+val","+pts"];
        text[LANGUAGE]["fl1"]="Flower meadow";
        text[LANGUAGE]["fl2"]="Flower workshop";
        text[LANGUAGE]["fl3"]="Monster fruit culture";
        text[LANGUAGE]["fl5"]="Animal doctor";
        text[LANGUAGE]["fl6"]="Speed eating";
        text[LANGUAGE]["fw1"]="Soda stall";
        text[LANGUAGE]["fw2"]="Snack booth";
        text[LANGUAGE]["fw3"]="Pastry shop";
        text[LANGUAGE]["gain"]="Gain";
        text[LANGUAGE]["gamecurrency"]=unsafeWindow.gamecurrency;
        text[LANGUAGE]["general"]="General";
        text[LANGUAGE]["given"]="Given";
        text[LANGUAGE]["goToDonkey"]="Go to donkey Luke";
        text[LANGUAGE]["goToLottery"]="Go to lottery";
        text[LANGUAGE]["goToMarket"]="Go to market";
        text[LANGUAGE]["goToMarketOfX"]="Go to market of %1%";
        text[LANGUAGE]["goToMarketstall"]="Go to market stall";
        text[LANGUAGE]["goToPage"]="Go to page";
        text[LANGUAGE]["goToRank"]="Go to rank";
        text[LANGUAGE]["goToX"]="Go to %1%";
        text[LANGUAGE]["goods"]="Goods";
        text[LANGUAGE]["hide"]="hide";
        text[LANGUAGE]["highlightProducts"]="Highlight products at market";
        text[LANGUAGE]["highlightUser"]="Highlight user at market";
        text[LANGUAGE]["hotkeys"]="Hotkeys";
        text[LANGUAGE]["idle"]="idle !!";
        text[LANGUAGE]["importStorageString"]="Import storage string";
        text[LANGUAGE]["importStorageStringError"]="Sorry. Can't read the storage string.";
        text[LANGUAGE]["inStock"]="in stock";
        text[LANGUAGE]["informationIsMissing"]="Information is missing."
        text[LANGUAGE]["ingredients"]="Ingredients";
        text[LANGUAGE]["invalidServer"]="Invalid Server";
        text[LANGUAGE]["inventory"]="Inventory";
        text[LANGUAGE]["jobIncomplete"]="Job not finished successfully";
        text[LANGUAGE]["jobComplete"]="Job finished successfully";
        text[LANGUAGE]["jobCurrent"]="Current job";
        text[LANGUAGE]["keptLots"]="Kept lots";
        text[LANGUAGE]["level"]="Level";
        text[LANGUAGE]["levelTooLow"]="Your level is too low";
        text[LANGUAGE]["levelXneeded"]="Level&nbsp;%1%&nbsp;needed";
        text[LANGUAGE]["load"]="Load";
        text[LANGUAGE]["loading"]="Loading";
        text[LANGUAGE]["localTime"]="Local time";
        text[LANGUAGE]["lodge"]="Log cabin";
        text[LANGUAGE]["login"]="Login";
        text[LANGUAGE]["loginPageFound"]="Found login page";
        text[LANGUAGE]["loginPortalSubmitted"]="Submitted portal login";
        text[LANGUAGE]["loginSubmitted"]="Submitted login";
        text[LANGUAGE]["logDonkey"]="Donkey Luke Log";
        text[LANGUAGE]["lotteryLog"]="Lottery Log";
        text[LANGUAGE]["lvl"]="Lvl";
        text[LANGUAGE]["manageVariables"]="Manage variables";
        text[LANGUAGE]["market"]="Market";
        text[LANGUAGE]["marketPrice"]="Market&nbsp;Price";
        text[LANGUAGE]["marketplace"]="Market place";
        text[LANGUAGE]["marketstall"]="Market stall";
        text[LANGUAGE]["megafield"]="Megafield";
        text[LANGUAGE]["megafieldCurrency"]=unsafeWindow.t_megafield_currency;
        text[LANGUAGE]["messages"]="Messages";
        text[LANGUAGE]["minRack"]="Min&nbsp;rack";
        text[LANGUAGE]["minRackamount"]="Minimal rackamount";
        text[LANGUAGE]["missing"]="Need";
        text[LANGUAGE]["money"]="Offered";
        text[LANGUAGE]["name"]="Name";
        text[LANGUAGE]["newLevelReached"]="Congratulations!<br>You have reached the next level!";
        text[LANGUAGE]["nextMessage"]="next message";
        text[LANGUAGE]["no"]="No";
        text[LANGUAGE]["nothingSelected"]="Nothing selected";
        text[LANGUAGE]["NPC"]="NPC";
        text[LANGUAGE]["NPCprice"]="NPC-Price";
        text[LANGUAGE]["nr"]="Nr";
        text[LANGUAGE]["observed"]="Observed";
        text[LANGUAGE]["ok"]="OK";
        text[LANGUAGE]["oldOnes"]="Old";
        text[LANGUAGE]["options"]="Options";
        text[LANGUAGE]["overNPCprice"]="over NPC-price";
        text[LANGUAGE]["overX"]="over %1%";
        text[LANGUAGE]["overview"]="overview";
        text[LANGUAGE]["pageXNotLoaded"]="Page '%1%' is not loaded completely.";
        text[LANGUAGE]["password"]="Password";
        text[LANGUAGE]["pleaseOpenX"]="Please open %1%.";
        text[LANGUAGE]["points"]="Points";
        text[LANGUAGE]["pleaseWait"]="Pleae wait";
        text[LANGUAGE]["portalLogin"]="Portal-Login";
        text[LANGUAGE]["powerups"]="Power-Ups";
        text[LANGUAGE]["previousMessage"]="previous message";
        text[LANGUAGE]["price"]="Price";
        text[LANGUAGE]["prices"]="Prices";
        text[LANGUAGE]["product"]="Product";
        text[LANGUAGE]["productOverview"]="Product overview";
        text[LANGUAGE]["productTimeSaving"]="%1% minutes saving for %2%";
        text[LANGUAGE]["production"]="Production";
        text[LANGUAGE]["products"]="Products";
        text[LANGUAGE]["profit"]="Profit";
        text[LANGUAGE]["profitTable"]="Profit per Zone per Day";
        text[LANGUAGE]["quantity"]="Quantity";
        text[LANGUAGE]["quest_foodworld"]="Picnic area quest series";
        text[LANGUAGE]["quest_forestry"]="Series of quests (forestry)";
        text[LANGUAGE]["quest_main"]="Series of quests (farm)";
        text[LANGUAGE]["questfoodworld1"]="Picnic area quest series";
        text[LANGUAGE]["questforestry1"]="1st series of quests (forestry)";
        text[LANGUAGE]["questforestry2"]="2nd series of quests (forestry)";
        text[LANGUAGE]["questmain1"]="1st series of quests (farm)";
        text[LANGUAGE]["questmain2"]="2nd series of quests (farm)";
        text[LANGUAGE]["quests"]="Quests";
        text[LANGUAGE]["rackX"]="%1%. rack";
        text[LANGUAGE]["rank"]="Rank";
        text[LANGUAGE]["readAll"]="Read all";
        text[LANGUAGE]["readyAtX"]="Ready at %1%"; // %1%=2:15+text[LANGUAGE]["shortOClock"]
        text[LANGUAGE]["readyAtX_day1"]="Tomorrow ready at %1%";
        // text[LANGUAGE]["readyAtX_day2"]="Ready in 2days at %1%"; // comment it if not used in the language
        text[LANGUAGE]["readySinceX"]="Ready since %1%";
        text[LANGUAGE]["recipes"]="Recipes";
        text[LANGUAGE]["recursive"]="Recursive Needed";
        text[LANGUAGE]["relative"]="relative";
        text[LANGUAGE]["reloadInXSec"]="Reload in %1%s.";
        text[LANGUAGE]["relogin"]="Session ends soon.<br>New login in %1%.";
        text[LANGUAGE]["remaining"]="Remaining";
        text[LANGUAGE]["requestingUpdateInfoOfX"]="Requesting update information for %1% ..."
        text[LANGUAGE]["requestingUserStatistic"]="Requesting user statistic ...";
        text[LANGUAGE]["requirement"]="Need";
        text[LANGUAGE]["requirementPerProduction"]="Requirement per production";
        text[LANGUAGE]["reward"]="Reward";
        text[LANGUAGE]["salesLog"]="Sales log";
        text[LANGUAGE]["save"]="Save";
        text[LANGUAGE]["saveAsTemplate"]="Save as template";
        text[LANGUAGE]["sawmill"]="Sawmill";
        text[LANGUAGE]["scriptHomepage"]="Script Homepage";
        text[LANGUAGE]["searchPlayer"]="Search player";
        text[LANGUAGE]["seed"]="Seed";
        text[LANGUAGE]["seedPerField"]="Seed per field";
        text[LANGUAGE]["sendContract"]="Send contract";
        text[LANGUAGE]["sendContractAgain"]="Send contract again";
        text[LANGUAGE]["sentContractNrX"]="Sent contract no %1%."
        text[LANGUAGE]["sendingXObservedPricesToServer"]="Sending %1% observed prices to server ...";
        text[LANGUAGE]["server"]="Server";
        text[LANGUAGE]["serverTime"]="Time of server";
        text[LANGUAGE]["sessionEnd"]="End of Session at %1%<br>Click for new login";
        text[LANGUAGE]["seedVendor"]="Seed vendor"; // Short for the seller of plants
        text[LANGUAGE]["seedVendorShort"]="Shop"; // Short for the seller of plants
        text[LANGUAGE]["shadowboxitem"]="Shadowbox item";
        text[LANGUAGE]["shortHours"]="h";
        text[LANGUAGE]["shortOClock"]="h";
        text[LANGUAGE]["shouldReload"]="You should reload the page.";
        text[LANGUAGE]["showAll"]="Show all";
        text[LANGUAGE]["showChangelog"]="Show changelog";
        text[LANGUAGE]["showLog"]="Show log";
        text[LANGUAGE]["showMissingProducts"]="Show product shortage";
        text[LANGUAGE]["showPasswords"]="show passwords";
        text[LANGUAGE]["sinceX"]="since %1%";
        text[LANGUAGE]["single"]="Single";
        text[LANGUAGE]["start"]="Start";
        text[LANGUAGE]["stat_days1"]="1 day";
        text[LANGUAGE]["stat_days3"]="3 days";
        text[LANGUAGE]["stat_days5"]="5 days";
        text[LANGUAGE]["stat_days7"]="7 days";
        text[LANGUAGE]["stat_gamefield"]="Show game";
        text[LANGUAGE]["stat_stats"]="Show statistics";
        text[LANGUAGE]["statistics"]="Statistics";
        text[LANGUAGE]["stock"]="Stock";
        text[LANGUAGE]["stockValue"]="Stock value";
        text[LANGUAGE]["stockXlow"]="Stock %1% low";
        text[LANGUAGE]["stockXmissing"]="Stock %1% missing!!!";
        text[LANGUAGE]["storeXinContract"]="Store %1% in contract";
        text[LANGUAGE]["summarize"]="Summarize";
        text[LANGUAGE]["takeObservedPrices"]="Take observed prices";
        text[LANGUAGE]["time"]="Time";
        text[LANGUAGE]["title"]="Title";
        text[LANGUAGE]["toMessage"]="to message";
        text[LANGUAGE]["toSeedVendor"]="Go to seed vendor";
        text[LANGUAGE]["total"]="Total";
        text[LANGUAGE]["turnover"]="Turnover";
        text[LANGUAGE]["unitPrice"]="Unit price";
        text[LANGUAGE]["upgradeForX"]="upgrade&nbsp;for&nbsp;%1%";
        text[LANGUAGE]["upgradeLevel"]="Upgrade level";
        text[LANGUAGE]["upjersAdvertising"]="Upjers-Advertising";
        text[LANGUAGE]["useQuestProducts"]= "Use current quest products";
        text[LANGUAGE]["userscriptNotStarted"]= "The userscript is not started completely.";
        text[LANGUAGE]["useWildcard"]= "Use * to match one or more letters.";
        text[LANGUAGE]["value"]="Value";
        text[LANGUAGE]["version"]="Version";
        text[LANGUAGE]["veterinayLevelXNeeded"]="Veterinary level %1% needed";
        text[LANGUAGE]["waterBonus"]="%1%% water bonus";
        text[LANGUAGE]["waterNeeded"]="Water needed";
        text[LANGUAGE]["waterNeededAtX"]="Water needed at %1%";
        text[LANGUAGE]["waterNeededAtX_day1"]="Tomorrow water needed at %1%";
        text[LANGUAGE]["wateringFeature"]="Watering feature";
        text[LANGUAGE]["windmill"]="Windmill";
        text[LANGUAGE]["writeMessage"]="write message";
        text[LANGUAGE]["XIsUpToDate"]="%1% is up-to-date."
        text[LANGUAGE]["yes"]="Yes";
        text[LANGUAGE]["yield"]="Yield";
        text[LANGUAGE]["yieldPerProduction"]="Yield per production";
        text[LANGUAGE]["youAreOnRankX"]="You are on rank %1%.";
        // category
        text[LANGUAGE]["category_c"]=text[LANGUAGE]["coins"];
        text[LANGUAGE]["category_v"]="Plants";
        text[LANGUAGE]["category_e"]="Advanced products";
        text[LANGUAGE]["category_z"]=unsafeWindow.rack_deco;
        text[LANGUAGE]["category_o"]=unsafeWindow.rack_oil;
        text[LANGUAGE]["category_fw"]=unsafeWindow.rack_foodworld;
        text[LANGUAGE]["category_fw1"]="Drinks";
        text[LANGUAGE]["category_fw2"]="Food";
        text[LANGUAGE]["category_fw3"]="Cakes";
        text[LANGUAGE]["category_fw4"]="not yet available";
        text[LANGUAGE]["category_fl"]="Flowers";
        text[LANGUAGE]["category_fla"]="Arrangements";
        text[LANGUAGE]["category_f1"]="Saplings";
        text[LANGUAGE]["category_f2"]="Logs";
        text[LANGUAGE]["category_f3"]="Sawmill products";
        text[LANGUAGE]["category_f4"]="Carpentry products";
        text[LANGUAGE]["category_f5"]="Wooden farmhouse items";
        text[LANGUAGE]["category_hr"]="Medicinal herb";
        text[LANGUAGE]["category_md"]="Healing tincture";
        text[LANGUAGE]["category_r0"]="Recipes product";
        text[LANGUAGE]["category_r1"]="Recipes increade yield";
        text[LANGUAGE]["category_r2"]="Recipes increade points";
        text[LANGUAGE]["category_p0"]="Power-Ups Produkt";
        text[LANGUAGE]["category_p1"]="Power-Ups increade yield";
        text[LANGUAGE]["category_p2"]="Power-Ups increade points";
        // settings
        text[LANGUAGE]["settings_valAutoWater"]=["Automatic watering","Plants will be watered after planting, if you have 'Water everything' (Premium)."];
        text[LANGUAGE]["settings_valAssumeWater"]=["Assume watering","This is important for plants growing more than 24h. The calculation of the cropping time assumes watering when needed."];
        text[LANGUAGE]["settings_valAutoCrop"]=["Automatic harvesting","After opening your field, crops will be harvested if necessary."];
        text[LANGUAGE]["settings_valWaterNeeded"]=["Watering needed","Shall the necessity of watering be displayed?"];
        text[LANGUAGE]["settings_valCropMsg"]=["Close harvest dialog","Don't like the annoying harvest notification with the pig?  Get rid of it here."];
        text[LANGUAGE]["settings_valLimitEmptyFields"]=["Empty areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
        text[LANGUAGE]["settings_valLimitEmptyFields_forest"]=["Empty forest areas","If the number of unplanted areas in your field exceeds this number, the field will be shown as empty."];
        text[LANGUAGE]["settings_valMoveAnimals"]=["Move animals",""];
        text[LANGUAGE]["settings_valContractLogAmount"]=["Number contracts kept","Your last sent and received contracts are kept so that a history of them can be shown."];
        text[LANGUAGE]["settings_valFarmiLimits"]=["Farmie Limits","The farmies are marked in 3 cases depending on their payment-rate."];
        text[LANGUAGE]["settings_valFarmiMiniInfo"]=["Farmie Mini Info","Displays a small circle below each farmie showing its case of payment-rate."];
        text[LANGUAGE]["settings_valMinRackMan"]=["Detail configuration","You edit the amount on your own *here*"];
        text[LANGUAGE]["settings_valMinRack"]=[,"A product is marked if its amount in your rack is falling below this value. You can enter different values depending on the category."];
        text[LANGUAGE]["settings_valMinRackPlantsize"]=["Aspect size of plant","For example grain needs only half of the value above."];
        text[LANGUAGE]["settings_valMinRackGrowing"]=["Growing products","Adds the amount of products that are in production and ready by powerup."];
        text[LANGUAGE]["settings_valMinRackQuest"]=["Quest products","Adds the amount of the quest products"];
        text[LANGUAGE]["settings_valMinRackRecursive"]=["Recursive products","Add the required products needed to make missing products, and calculate these again for the required proucts.(used by forestry products)"];
        text[LANGUAGE]["settings_valMinRackFarmis"]=["Farmie products","Adds the amount of the products wanted by the farmies which pay more than the lower limit."];
        text[LANGUAGE]["settings_valMinRackForestryFarmis"]=["Lodge farmie products","Adds the amount of the products wanted by the lodge farmies."];
        text[LANGUAGE]["settings_protectMinRack"]=["Selling protection","Prohibits to sell products at market below the minimal rackamount"];
        text[LANGUAGE]["settings_valBuyingLimitDown"]=["Bottom buy highlight",""];
        text[LANGUAGE]["settings_valBuyingLimit"]=["Top buy limit","You can only buy products at the Market up to the limit given.  This protects you from accidentally purchasing very over-priced goods."];
        text[LANGUAGE]["settings_valBuyingLimitNPC"]=["Only allow buy less than price of NPC",""];
        text[LANGUAGE]["settings_valSellingLimit"]=["Sell limits","Your sales are also protected, so that you don't price your own goods too cheaply or too highly."];
        text[LANGUAGE]["settings_valJoinPrices"]=["One input","Joins the price input fields at the market stand."];
        text[LANGUAGE]["settings_valQuicklinks"]=["Show market quicklinks","Show Quicklinks at Market place"];
        text[LANGUAGE]["settings_valUseObservedPrices"]=["Use observed prices","Prices are observed while clicking through the market place. A calculated price can be seen in the price list. Shall this automatically override your settings?"];
        text[LANGUAGE]["settings_valSendStatistics"]=["Send statistics","Support the <a href='http://mff.metrax.eu/' target='_blank'>Statistik-Server</a>.  No private data is sent!"];
        text[LANGUAGE]["settings_valPrivateMessages"]=["Number private messages kept","Your last private messages are kept so that a message history of one contact can be shown."];
        text[LANGUAGE]["settings_valMarketMessages"]=["Number market messages kept","Old messages remain in this archive, even if they are older than the maximum 7 days."];
        text[LANGUAGE]["settings_valMessageRe"]=["Short subject","Replaces \"Re:Re:\" to \"Re:\" in the subject when you reply to a message."];
        text[LANGUAGE]["settings_valMessagesSystemMarkRead"]=["Read system messages","System messages are marked read automatically."];
        text[LANGUAGE]["settings_valFoodworldFarmiPlacing"]=["Locate picnic area farmis","Accepted picnic area farmis are located automatically to a vacant seat."];
        text[LANGUAGE]["settings_valAutoLogin"]=["Automatic login","Once username and password information is given, all accounts will be logged in, so that they can be fed, harvested, watered, and planted. Popups must be allowed with multiple accounts."];
        text[LANGUAGE]["settings_valUpdate"]=["Update","Checks whether an updated version of this Advisor script is available."];
        text[LANGUAGE]["settings_valServerTimeOffset"]=["Time of server",""];
        text[LANGUAGE]["settings_valGamecursor"]=["Game cursor","Use the game cursors instead of your system cursors."];
        text[LANGUAGE]["settings_valDrag"]=["Dragging","Allow moving windows by clicking the upper left corner."];
        text[LANGUAGE]["settings_valClickErrorbox"]=["Hide errorbox","Some users have problems with the error box. Keep in mind that this alert is normally useful!"];
        text[LANGUAGE]["settings_valHotkeys"]=["Hotkeys","Use hotkeys to quicker navigate the game. See the help."];
        text[LANGUAGE]["settings_hotkeymap"]={"prevPage":"previous Message, Zone, ...","nextPage":"next Message, Zone, ...","farm1":"1st farm","farm2":"2nd farm","farm3":"3rd farm","guild":"Club","city1":"First Village","city2":"Second Village","farmiLog":"Farmi-Log","help":"Help","market":"Market place","marketstand":"Market stand","messages":"Messages","options":"Options","profit":"Profit Calculation","seedVendor":"Seed retailer","overview":"Overview","contract":"Contracts","systemMessage":"(next unread) system message"};
        text[LANGUAGE]["settings_valzoneAddToGlobalTime"]=["Integrate","Shall the time be included to the global time?"];
        text[LANGUAGE]["settings_valGlobaltimeShowCroppedZone"]=["Integrate cropped zone","Shall the ready-state of the cropped zones be included in the global time?"];
        text[LANGUAGE]["settings_cacheReset"]=["Cache reset","All information about your farms will be deleted ..."];
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
         
        text[LANGUAGE]["automat"] = "Automaton";
        text[LANGUAGE]["automat_planting"] = "Planting...";
        text[LANGUAGE]["automat_waiting"] = "Waiting...";
        text[LANGUAGE]["automat_watering"] = "Watering...";
        text[LANGUAGE]["automat_feeding"] = "Feeding...";
        text[LANGUAGE]["automat_automatPlanting"] = "Seeding machine";
        text[LANGUAGE]["automat_automatFeeding"] = "Feeding machine";
        text[LANGUAGE]["automat_automatFactory"] = "Factory machine";
        text[LANGUAGE]["automat_automatMegafield"] = "Megafield machine";
        text[LANGUAGE]["automat_automatWindmill"] = "Mill machine";
        text[LANGUAGE]["automat_botStart"] = "Start Automaton-Bot";
        text[LANGUAGE]["automat_botStop"] = "Stop Automaton-Bot";
        text[LANGUAGE]["automat_settings_botErrorBehaviour"] = "Behaviour of Automaton in case of errors";
        text[LANGUAGE]["automat_settings_pageReload"] = "Reload of page";
        text[LANGUAGE]["automat_settings_botRestart"] = "Restart bot";
        text[LANGUAGE]["automat_zonePairing"] = "Zone pairing";
        text[LANGUAGE]["automat_debugInfo"] = "Debug Info";
        text[LANGUAGE]["automat_windmill"] = "windmill";
        text[LANGUAGE]["automat_timing"] = "Timing";
        text[LANGUAGE]["automat_general"] = "General";
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
        text[LANGUAGE]["automat_msgUpdate"] = "There is a new script version of the automaton. Install?";
        text[LANGUAGE]["automat_shouldUpdateAdviser"] = "You should update the script of the Adviser!<br>The Automaton will not run properly.";
        text[LANGUAGE]["automat_settings_autoPlant"] = "Shall the planting machine be displayed?";
        text[LANGUAGE]["automat_settings_autoWater"] = "Shall the fields be watered?";
        text[LANGUAGE]["automat_settings_autoFeed"] = "Shall the feeding machine be displayed?";
        text[LANGUAGE]["automat_settings_botUse"] = "Use bot";
        text[LANGUAGE]["automat_settings_disableCropFields"]="Block the cropping of sleeping fields.";
        text[LANGUAGE]["automat_settings_pauseShortMin"] = "Minimal clicking delay of the automaton";
        text[LANGUAGE]["automat_settings_pauseShortMax"] = "Maximal clicking delay of the automaton";
        text[LANGUAGE]["automat_settings_pauseMin"] = "Minimal waiting delay of the automaton";
        text[LANGUAGE]["automat_settings_pauseMax"] = "Maximal waiting delay of the automaton";
        text[LANGUAGE]["automat_settings_maxDurationBotRun"] = "Maximal running time of the automaton";
        text[LANGUAGE]["automat_settings_maxDurationBotStep"] = "Maximal running time for a step of the automaton";
        text[LANGUAGE]["automat_setToDefault"] = "Set to default";
        text[LANGUAGE]["automat_settings_seedWaitForCrop"] = "Wait planting if next cropping time is less than";
        text[LANGUAGE]["automat_emergencyPlants"] = "Emergency Plants. They are taken first if the needed plant is not available or fitting.";
        text[LANGUAGE]["automat_settings_useQueueList"] = "Use queue for the fields.";
        text[LANGUAGE]["automat_set12a"] = "Delete \n all zone queue\n data";
        text[LANGUAGE]["automat_set12b"] = "Delete Completed.";
        text[LANGUAGE]["automat_settings_showQueueTime"] = "Show calculated product ready time in the queue.";
        text[LANGUAGE]["automat_set18a"] = "Delete all mill queue data";
        text[LANGUAGE]["automat_set18b"] = "Delete Completed";
        text[LANGUAGE]["automat_settings_powerUpActivate"] = "Activate powerups for products";
        text[LANGUAGE]["automat_settings_lotteryActivate"] = "Activate the daily lottery automatically";
        text[LANGUAGE]["automat_settings_lotteryDailyLot"] = "Choose to keep the daily lot";
        text[LANGUAGE]["automat_settings_questActivate"] = "Activate the Quest automatically to quest:";
        text[LANGUAGE]["automat_settings_questSolving"] = "Solve the Quest automatically to quest:";
        text[LANGUAGE]["automat_settings_farmiReject"] = "Auto reject farmi below:";
        text[LANGUAGE]["automat_settings_farmiAccept"] = "Auto accept farmi above:";
        text[LANGUAGE]["automat_settings_farmiAcceptBelowMinValue"] = "Accept a farmi with an product item that is below the minimal product amount in the rack.";
        text[LANGUAGE]["automat_settings_farmiRemoveMissing"] = "Remove a farmi with missing products and the lowest yield. Threshold:";
        text[LANGUAGE]["automat_fields"] = "Fields";
        text[LANGUAGE]["automat_titleGeneral"] = "General queue";
        text[LANGUAGE]["automat_titleQueue"] = "Queue";
        text[LANGUAGE]["automat_QueCopyTextHeader"] = "Copy queue";
        text[LANGUAGE]["automat_QueCopyTextHeaderFrom"] = "Copy from:";
        text[LANGUAGE]["automat_QueCopyTextHeaderTo"] = "Copy to:";
        text[LANGUAGE]["automat_QueAddText"] = "Click to add a product to the list."; //Add product
        text[LANGUAGE]["automat_QueAddAboveText"] = "Click to add a product to the list before this product";
        text[LANGUAGE]["automat_QueDeleteText"] = "Delete this product from the list.";
        text[LANGUAGE]["automat_QueClose"] = "Close this menu";
        text[LANGUAGE]["automat_QueCloseAll"] = "Close all open Queue windows.";
        text[LANGUAGE]["automat_QueMin"] = "Lower value";
        text[LANGUAGE]["automat_QuePlus"] = "Increase value";
        text[LANGUAGE]["automat_QueBehaviourF"] = "Click to switch to rack-mode";
        text[LANGUAGE]["automat_QueBehaviourR"] = "Click to switch to field-mode";
        text[LANGUAGE]["automat_QueUpButton"] = "Move Up";
        text[LANGUAGE]["automat_QueDownButton"] = "Move Down";
        text[LANGUAGE]["automat_buttonTimeLine"] = "Show field timelines";
        text[LANGUAGE]["automat_buttonOverview"] = "Show overview of automatons";
        text[LANGUAGE]["automat_repeat_on"] = "Repeat list is ON, press to turn off repeat.";
        text[LANGUAGE]["automat_repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
        text[LANGUAGE]["automat_shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
        text[LANGUAGE]["automat_shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
        text[LANGUAGE]["automat_rotate"] = "Rotate: place first entry after the last entry";
        text[LANGUAGE]["automat_stop"] = "STOP";
        text[LANGUAGE]["automat_week"] = "week";
        text[LANGUAGE]["automat_inftext"] = "Runs indefinitely";
        text[LANGUAGE]["automat_removeAllWeed"] = "Remove all %AMOUNT% %PROD%<br>a piece = %COST%<br>total = %TCOST%";
        text[LANGUAGE]["automat_usedFarmFieldsReadyAt"] = "Used farm fields are ready at:";
        text[LANGUAGE]["automat_CloseWindowTimer"] = "Closing screen in %1%";
        text[LANGUAGE]["automat_CloseWindowTimerClick"] = "Click to reset timer";
        //%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
        text[LANGUAGE]["automat_QueDoWork"] = "Zone is done by bot";
        text[LANGUAGE]["automat_QueDontWork"] = "Zone is ignored by bot";
        text[LANGUAGE]["automat_QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
        text[LANGUAGE]["automat_QueStop0"] = "The automatic culturing process will be stopped";
        text[LANGUAGE]["automat_QueStop1"] = "After culturing %FLDFROM% field the automatic process will be stopped.";
        text[LANGUAGE]["automat_QueStopX"] = "After culturing %FLDFROM% fields the automatic process will be stopped.";
        text[LANGUAGE]["automat_QueRepeat"] = "(Repeat mode)";
        text[LANGUAGE]["automat_QueShuffle"] = "(Shuffle mode)";
        text[LANGUAGE]["automat_QueRepeatShuffle"] = "(Shuffle repeat mode)";
        text[LANGUAGE]["automat_QueFieldInRow1"] = "(Nr. %FLDFROM%)";
        text[LANGUAGE]["automat_QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
        text[LANGUAGE]["automat_QueRoundDoneR"] = "These fields %PRODNAME% are already cultured and will be skipped";
        text[LANGUAGE]["automat_QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
        text[LANGUAGE]["automat_QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
        text[LANGUAGE]["automat_QueFieldMake"] = "Total:";
        text[LANGUAGE]["automat_QueFieldToGo"] = "To go:";
        text[LANGUAGE]["automat_QueRoundMake"] = "Each turn: ";
        text[LANGUAGE]["automat_QueRoundMade"] = "Made:";
        text[LANGUAGE]["automat_QueRoundToGo"] = "To do:";
        text[LANGUAGE]["automat_QueUses"] = "Uses:";
        text[LANGUAGE]["automat_QueGives"] = "Yield:";
        text[LANGUAGE]["automat_QueFutter"] = "Time discount:";
        text[LANGUAGE]["automat_QueTimeThis"] = "Production time:";
        text[LANGUAGE]["automat_QueTimeToGo"] = "Culture time to go:";
        text[LANGUAGE]["automat_QueTimeReady"] = "Ready at:";
        text[LANGUAGE]["automat_QueTimeFirstReady"] = "First is ready at:";
        text[LANGUAGE]["automat_QueTimeNextReady"] = "Next is ready at:";
        text[LANGUAGE]["automat_QueTimeRound"] = "Average each turn:";
        text[LANGUAGE]["automat_QueRackMode"]="(Rack mode)";
        text[LANGUAGE]["automat_queueshow"]="Click to edit the queue"; 
        text[LANGUAGE]["automat_zoneXWaiting"]="Zone \"%1%\" is waiting"; 
        //For the Mill
        //%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
        text[LANGUAGE]["automat_MillQueue"] = "Mill Queue";
        text[LANGUAGE]["automat_MillDoWork"] = "The windmill is automatically maintained.";
        text[LANGUAGE]["automat_MillDontWork"] = "The windmill is ignored. Manual maintenance is required.";
        text[LANGUAGE]["automat_MillClearAddAll"] = "Clear mill list then add all recipes";
        text[LANGUAGE]["automat_MillShuffle"] = "(Shuffle mode)";
        text[LANGUAGE]["automat_MillInRow1"] = "(Nr. %FLDFROM%)";
        text[LANGUAGE]["automat_MillInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
        text[LANGUAGE]["automat_MillTimeTotal"] = "Total baking time:";
        text[LANGUAGE]["automat_MillTimeReady"] = "Ready:";
        text[LANGUAGE]["automat_MillStoped"] = "There is a stop added to the queue this %PRODNAME% will not be baked";
        text[LANGUAGE]["automat_MillStop0"] = "The automatic baking process will be stopped";
        text[LANGUAGE]["automat_MillStop1"] = "After %FLDFROM% recipe the automatic baking process will be stopped.";
        text[LANGUAGE]["automat_MillStopX"] = "After %FLDFROM% recipes the automatic baking process will be stopped.";
        try{
        text[LANGUAGE]["automat_MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
        text[LANGUAGE]["automat_MillPowerUpText_0"] = top.window.wrappedJSObject.powerup_bonustext1;
        text[LANGUAGE]["automat_MillPowerUpText_1"] = top.window.wrappedJSObject.powerup_bonustext2;
        text[LANGUAGE]["automat_MillPowerUpText_2"] = top.window.wrappedJSObject.powerup_bonustext3;
        text[LANGUAGE]["automat_MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
        }catch(err){GM_logError("texte mill","","",err);}
        text[LANGUAGE]["automat_number"] = "Number";
        text[LANGUAGE]["automat_lack"] = "Lack";
        text[LANGUAGE]["automat_MillRecipesBought"] = "Total recipes bought: ";
        text[LANGUAGE]["automat_MillRecipesUsed"] = "Total recipes used: ";
        text[LANGUAGE]["automat_MillRecipesBake"] = "Max recipes to bake: ";
        //title
        text[LANGUAGE]["automat_title_on_general"] = "Show general queue only<br>+Ctrl: Show general queue";
        text[LANGUAGE]["automat_title_off_general"] = "Show general queue only<br>+Ctrl: Hide general queue";
        text[LANGUAGE]["automat_title_on_farm1"] = "Show first farm only<br>+Ctrl: Show first farm";
        text[LANGUAGE]["automat_title_off_farm1"] = "Show first farm only<br>+Ctrl: Hide first farm";
        text[LANGUAGE]["automat_title_on_farm2"] = "Show second farm only<br>+Ctrl: Show second farm";
        text[LANGUAGE]["automat_title_off_farm2"] = "Show second farm only<br>+Ctrl: Hide second farm";
        text[LANGUAGE]["automat_title_on_farm3"] = "Show third farm only<br>+Ctrl: Show third farm";
        text[LANGUAGE]["automat_title_off_farm3"] = "Show third farm only<br>+Ctrl: Hide third farm";
        text[LANGUAGE]["automat_title_on_farm4"] = "Show fourth farm only<br>+Ctrl: Show fourth farm";
        text[LANGUAGE]["automat_title_off_farm4"] = "Show fourth farm only<br>+Ctrl: Hide fourth farm";
        text[LANGUAGE]["automat_title_on_farmersmarket"] = "Show farmersmarket only<br>+Ctrl: Show farmersmarket";
        text[LANGUAGE]["automat_title_off_farmersmarket"] = "Show farmersmarket only<br>+Ctrl: Hide farmersmarket";
        text[LANGUAGE]["automat_title_on_megafield"] = "Show megafield only<br>+Ctrl: Show megafield";
        text[LANGUAGE]["automat_title_off_megafield"] = "Show megafield only<br>+Ctrl: Hide megafield";
        text[LANGUAGE]["automat_title_on_city"] = "Show city only<br>+Ctrl: Show city";
        text[LANGUAGE]["automat_title_off_city"] = "Show city only<br>+Ctrl: Hide city";
        text[LANGUAGE]["automat_title_on_forestry"] = "Show forestry only<br>+Ctrl: Show forestry";
        text[LANGUAGE]["automat_title_off_forestry"] = "Show forestry only<br>+Ctrl: Hide forestry";
        text[LANGUAGE]["automat_title_on_foodworld"] = "Show picnic area only<br>+Ctrl: Show picnic area";
        text[LANGUAGE]["automat_title_off_foodworld"] = "Show picnic area only<br>+Ctrl: Hide picnic area";
        text[LANGUAGE]["automat_title_on_type1"] = "Show fields only<br>+Ctrl: Show fields";
        text[LANGUAGE]["automat_title_off_type1"] = "Show fields only<br>+Ctrl: Hide fields";
        text[LANGUAGE]["automat_title_on_type2"] = "Show stables only<br>+Ctrl: Show stables";
        text[LANGUAGE]["automat_title_off_type2"] = "Show stables only<br>+Ctrl: Hide stables";
        text[LANGUAGE]["automat_title_on_type3"] = "Show factories only<br>+Ctrl: Show factories";
        text[LANGUAGE]["automat_title_off_type3"] = "Show factories only<br>+Ctrl: Hide factories";
        text[LANGUAGE]["automat_title_on_all"] = "Show all farm queues";
        text[LANGUAGE]["automat_title_off_all"] = "Hide all farm queues";

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
