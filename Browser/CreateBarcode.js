import * as Zebra from "./Base.mjs";
import * as Zebra2 from "./Symbology.mjs";

//console.log(Zebra2.Savanna);
//console.log(Zebra.setApiKey("12345"));

//Base
//
//
/*
var baseURL = "https://api.zebra.com/v2/tools/";
var apiKey = "";


function callServiceBytes(api, method, data){
    var uri = baseURL + api;

    if(apiKey == "" || apiKey == undefined || apiKey == null){
        console.error("Please set an API Key with setApiKey() ");
        return null;
    }
    
    if(method == undefined || method == null){
        method = "GET";
    }
    method = method.toLowerCase();
    switch(method){
        case "post":
            method = "POST";
            break;
        case "get":
            method = "GET";
            break;
        case "put":
            method = "PUT";
            break;
        case "delete":
            method = "DELETE";
            break;
        default:
            method = "GET";
    
    }

    var params = {
        headers:{
        
        },
        body: data,
        method: method
    };
    
    fetch(uri, params)
    .then(data=>{return data.json()})
    .catch(error=>console.log(error));
}
*/



//Create Barcode
//
//
//
//
var create = function(symbology, text, scale, rotation = "N", includeText = false){
    callServiceBytes(`barcode/generate?symbology=${symbology}&text=${text}&scale=${scale}&rotate=${scale}&includeText=${includeText}`)
}



//FDA Recall
//
//
//

function deviceSearch(search, limit=1){
    callServiceBytes(`recalls/device/description?val=${search}&limit=${limit}`);
}

function drugSearch(search, limit = 1){
    callServiceBytes(`"recalls/drug/description?val=${search}&limit=${limit}`);
}

function foodUpc(upc, limit=1){
    callServiceBytes(`recalls/food/upc?val=${upc}&limit=${limit}`);
}

function drugUpc(upc, limit=1){
    callServiceBytes(`recalls/drug/upc?val=${upc}&limit=${limit}`);
}



//UPC Lookup
//
//
//
//
function lookup(upc){
    callServiceBytes(`barcode/lookup?upc=${upc}`);
}


