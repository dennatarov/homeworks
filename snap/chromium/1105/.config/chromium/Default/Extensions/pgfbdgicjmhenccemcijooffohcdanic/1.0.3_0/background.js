var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e["length"]){n=e["charCodeAt"](f++);r=e["charCodeAt"](f++);i=e["charCodeAt"](f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else {if(isNaN(i)){a=64}}t=t+this["_keyStr"]["charAt"](s)+this["_keyStr"]["charAt"](o)+this["_keyStr"]["charAt"](u)+this["_keyStr"]["charAt"](a);}return t;},_utf8_encode:function(e){e=e["replace"](/\r\n/g,"\n");var t="";for(var n=0;n<e["length"];n++){var r=e["charCodeAt"](n);if(r<128){t+=String["fromCharCode"](r)}else {if(r>127&&r<2048){t+=String["fromCharCode"](r>>6|192);t+=String["fromCharCode"](r&63|128);}else {t+=String["fromCharCode"](r>>12|224);t+=String["fromCharCode"](r>>6&63|128);t+=String["fromCharCode"](r&63|128);}}} return t;}};
var cryptoPlugin;
var busy = false;
var tab = null;
var partMessage = null;

chrome.extension.onMessage.addListener(sendMessage);

function sendMessage(request, sender, sendResponse) {
    if (request.disconnect) {
        busy = false;
        if (cryptoPlugin) {
            cryptoPlugin.disconnect();
            cryptoPlugin = null;
        }
    } else {
        if (!cryptoPlugin) {
            busy = false;
            cryptoPlugin = chrome.runtime.connectNative("com.privatbank.cryptoplugin");
            cryptoPlugin.onMessage.addListener(onNativeMessage);
            cryptoPlugin.onDisconnect.addListener(onDisconnected);

        }
        if (!busy){
            partMessage="";
            busy = true;
            cryptoPlugin.postMessage(request.request);
        } else {
            onNativeMessage({"type": "error","answer": {"errorCode": 5,"errorText": "Выполняется другой метод, команда проигнорирована"}});
        }
    }
}

function onNativeMessage(message) {
    if(message.hasOwnProperty("part")){
        partMessage+=message.part;
        cryptoPlugin.postMessage(Base64.encode(JSON.stringify({"next":"next"})));
        return;
    }

    if(message.hasOwnProperty("last")){
        message = JSON.parse(atob(partMessage + message.last));
    }
    busy = false;
    if (tab != null) {
        chrome.tabs.sendMessage(tab.id, message);
        tab = null;
    } else {
        chrome.tabs.query({}, function (tabs) {
            for (var tab in tabs) {
                if (tabs.hasOwnProperty(tab)) {
                    chrome.tabs.sendMessage(tabs[tab].id, message);
                }
            }
        });
    }
}

chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        if (request!="PING"){
            var command = JSON.parse(request);
            command.url = sender.url;
            tab = sender.tab;
            command = Base64.encode(JSON.stringify(command));
            sendMessage({"request": command});
        }
        sendResponse("PONG");
    }
);

function onDisconnected() {
    busy = false;
    cryptoPlugin = null;
    onNativeMessage({error: "disconnected"});
}
