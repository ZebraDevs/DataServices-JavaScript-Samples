var baseURL = "test-api1.zebra.com";
var baseApiKey = "";               
                               
                               
function callServiceBytes2(api, method, data, apiKey){
    var uri = baseURL +api;

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
        host: baseURL,
        port: 443,
        path: "/v2/tools/" + api,
        method: method,
        gzip: true,
        encoding: "binary",
        headers:{              
            "apiKey": apiKey,          
            "Content-Type": "image/png"
        },                     
    //    body: data,            
    //    method: method         
    };                         
    
    return new Promise((resolve, reject) => {
        //Get data
        var data = [];
        var request = https.get(params, function(res){
            res.on('data', function(chunk){
                data.push(chunk)
            })
            .on('end', function(){
                //console.log("All data received");
                //console.log(data);

                resolve(data)
            });
        })
        request.on('error', function(err){
            reject(err)
        })
    })

}

function callServiceBytes(api, method, data, apiKey){
    var uri = "https://" + baseURL + "/v2/tools/" + api;   
    //var uri = api;                         
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
            "apiKey": apiKey,                          
        },                     
        body: data,            
        method: method         
    };                         
        
    return new Promise((resolve, reject) => {
        fetch(uri, params)         
        .then(data => resolve(data))
        .catch(error => reject(error) );
    });
    
}                              
                             
var setApiKey = function setApiKey(key){
    baseApiKey = key;            
    console.log("API Key is now: " + apiKey);
}                            
                                                                    

var Create = function(symbology, text, scale, rotation = "N", includeText = false, apiKey){
    var callFunction = null;
    if (typeof fetch === "function"){
        callFunction = callServiceBytes;
    }else{
        callFunction = callServiceBytes2;
    }

        return new Promise((resolve, reject) =>{        
            callFunction(`barcode/generate?symbology=${symbology}&text=${text}&scale=${scale}&rotate=${scale}&includeText=${includeText}`,null, null, apiKey)
                .then(data => resolve(data ) )
                .catch(error => reject(error));
        });
}

 
 
 
//FDA Recall
//
//
//
 
function DeviceSearch(search, limit=1, apiKey){
    var callFunction = null;
    if (typeof fetch === "function"){
        callFunction = callServiceBytes;
    }else{
        callFunction = callServiceBytes2;
    }

    return new Promise((resolve, reject) => {
        callFunction(`recalls/device/description?val=${search}&limit=${limit}`, null, null, apiKey)
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}
 
function DrugSearch(search, limit = 1, apiKey){
    var callFunction = null;
    if (typeof fetch === "function"){
        callFunction = callServiceBytes;
    }else{
        callFunction = callServiceBytes2;
    }

    return new Promise((resolve, reject) => {
        callFunction(`recalls/drug/description?val=${search}&limit=${limit}`, null, null, apiKey)
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}
 
function FoodUpc(upc, limit=1, apiKey){
    var callFunction = null;
    if (typeof fetch === "function"){
        callFunction = callServiceBytes;
    }else{
        callFunction = callServiceBytes2;
    }

    return new Promise((resolve, reject) => {
        callFunction(`recalls/food/upc?val=${upc}&limit=${limit}`, null, null, apiKey)
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}
 
function DrugUpc(upc, limit=1, apiKey){
    var callFunction = null;
    if (typeof fetch === "function"){
        callFunction = callServiceBytes;
    }else{
        callFunction = callServiceBytes2;
    }

    return new Promise((resolve, reject) => {
        callFunction(`recalls/drug/upc?val=${upc}&limit=${limit}`, null, null, apiKey)
                .then(data => resolve(data))
                .catch(error => reject(error));
    });
}
 
 
 
//UPC Lookup
//
//
//
//
function UpcLookup(upc, apiKey){
    var callFunction = null;
    if (typeof fetch === "function"){
        callFunction = callServiceBytes;
    }else{
        callFunction = callServiceBytes2;
    }

    return new Promise((resolve, reject) => {
            callFunction(`barcode/lookup?upc=${upc}`, null, null, apiKey)
                .then(data => resolve(data))
                .catch(error => reject(error));
    });
}
 

//Symbology
//
//
var Symbology =
	{
		/// <summary>
		/// AusPost 4 State Customer Code
		/// </summary>
		"auspost":"auspost",
		/// <summary>
		/// Aztec Code
		/// </summary>
		"azteccode":"azteccode",
		/// <summary>
		/// Compact Aztec Code
		/// </summary>
	    "azteccodecompact":"azteccodecompact",
		/// <summary>
		/// Aztec Runes
		/// </summary>
        "aztecrune":"aztecrune",
		/// <summary>
		/// BC412
		/// </summary>
        "bc412":"bc412",
		/// <summary>
		/// Channel Code
		/// </summary>
        "channelcode":"channelcode",
		/// <summary>
		/// Codablock F
		/// </summary>
        "codablockf":"codablockf",
		/// <summary>
		/// Code 11
		/// </summary>
        "code11":"code11",
		/// <summary>
		/// Code 128
		/// </summary>
        "code128":"code128",
		/// <summary>
		/// Code 16K
		/// </summary>
        "code16k":"code16k",
		/// <summary>
		/// Code 25
		/// </summary>
        "code2of5":"code2of5",
		/// <summary>
		/// Italian Pharmacode
		/// </summary>
        "code32":"code32",
		/// <summary>
		/// Code 39
		/// </summary>
        "code39":"code39",
		/// <summary>
		/// Code 39 Extended
		/// </summary>
        "code39ext":"code39ext",
		/// <summary>
		/// Code 49
		/// </summary>
        "code49":"code49",
		/// <summary>
		/// Code 93
		/// </summary>
        "code93":"code93",
		/// <summary>
		/// Code 93 Extended
		/// </summary>
        "code93ext":"code93ext",
		/// <summary>
		/// Code One
		/// </summary>
        "codeone":"codeone",
		/// <summary>
		/// COOP 2 of 5
		/// </summary>
        "coop2of5":"coop2of5",
		/// <summary>
		/// Custom 4 state symbology
		/// </summary>
        "daft":"daft",
		/// <summary>
		/// GS1 DataBar Expanded
		/// </summary>
        "databarexpanded":"databarexpanded",
		/// <summary>
		/// GS1 DataBar Expanded Composite
		/// </summary>
        "databarexpandedcomposite":"databarexpandedcomposite",
		/// <summary>
		/// GS1 DataBar Expanded Stacked
		/// </summary>
        "databarexpandedstacked":"databarexpandedstacked",
		/// <summary>
		/// GS1 DataBar Expanded Stacked Composite
		/// </summary>
        "databarexpandedstackedcomposite":"databarexpandedstackedcomposite",
		/// <summary>
		/// GS1 DataBar Limited
		/// </summary>
        "databarlimited":"databarlimited",
		/// <summary>
		/// GS1 DataBar Limited Composite
		/// </summary>
        "databarlimitedcomposite":"databarlimitedcomposite",
		/// <summary>
		/// GS1 DataBar Omnidirectional
		/// </summary>
        "databaromni":"databaromni",
		/// <summary>
		/// GS1 DataBar Omnidirectional Composite
		/// </summary>
        "databaromnicomposite":"databaromnicomposite",
		/// <summary>
		/// GS1 DataBar Stacked
		/// </summary>
        "databarstacked":"databarstacked",
		/// <summary>
		/// GS1 DataBar Stacked Composite
		/// </summary>
        "databarstackedcomposite":"databarstackedcomposite",
		/// <summary>
		/// GS1 DataBar Stacked Omnidirectional
		/// </summary>
        "databarstackedomni":"databarstackedomni",
		/// <summary>
		/// GS1 DataBar Stacked Omnidirectional Composite
		/// </summary>
        "databarstackedomnicomposite":"databarstackedomnicomposite",
		/// <summary>
		/// GS1 DataBar Truncated
		/// </summary>
        "databartruncated":"databartruncated",
		/// <summary>
		/// GS1 DataBar Truncated Composite
		/// </summary>
        "databartruncatedcomposite":"databartruncatedcomposite",
		/// <summary>
		/// Datalogic 2 of 5
		/// </summary>
        "datalogic2of5":"datalogic2of5",
		/// <summary>
		/// Data Matrix
		/// </summary>
        "datamatrix":"datamatrix",
		/// <summary>
		/// Data Matrix Rectangular
		/// </summary>
        "datamatrixrectangular":"datamatrixrectangular",
		/// <summary>
		/// DotCode
		/// </summary>
        "dotcode":"dotcode",
		/// <summary>
		/// EAN-13
		/// </summary>
        "ean13":"ean13",
		/// <summary>
		/// EAN-13 Composite
		/// </summary>
        "ean13composite":"ean13composite",
		/// <summary>
		/// GS1-14
		/// </summary>
        "ean14":"ean14",
		/// <summary>
		/// EAN-2 (2 digit addon)
		/// </summary>
        "ean2":"ean2",
		/// <summary>
		/// EAN-5 (5 digit addon)
		/// </summary>
        "ean5":"ean5",
		/// <summary>
		/// EAN-8
		/// </summary>
        "ean8":"ean8",
		/// <summary>
		/// EAN-8 Composite
		/// </summary>
        "ean8composite":"ean8composite",
		/// <summary>
		/// Flattermarken
		/// </summary>
        "flattermarken":"flattermarken",
		/// <summary>
		/// GS1-128
		/// </summary>
        "gs1_128":"gs1_128",
		/// <summary>
		/// GS1-128 Composite
		/// </summary>
        "gs1_128composite":"gs1_128composite",
		/// <summary>
		/// GS1 Composite 2D Component
		/// </summary>
        "gs1_cc":"gs1_cc",
		/// <summary>
		/// GS1 Data Matrix
		/// </summary>
        "gs1datamatrix":"gs1datamatrix",
		/// <summary>
		/// GS1 Data Matrix Rectangular
		/// </summary>
        "gs1datamatrixrectangular":"gs1datamatrixrectangular",
		/// <summary>
		/// GS1 North American Coupon
		/// </summary>
        "gs1northamericancoupon":"gs1northamericancoupon",
		/// <summary>
		/// GS1 QR Code
		/// </summary>
        "gs1qrcode":"gs1qrcode",
		/// <summary>
		/// Han Xin Code
		/// </summary>
        "hanxin":"hanxin",
		/// <summary>
		/// HIBC Aztec Code
		/// </summary>
        "hibcazteccode":"hibcazteccode",
		/// <summary>
		/// HIBC Codablock F
		/// </summary>
        "hibccodablockf":"hibccodablockf",
		/// <summary>
		/// HIBC Code 128
		/// </summary>
        "hibccode128":"hibccode128",
		/// <summary>
		/// HIBC Code 39
		/// </summary>
        "hibccode39":"hibccode39",
		/// <summary>
		/// HIBC Data Matrix
		/// </summary>
        "hibcdatamatrix":"hibcdatamatrix",
		/// <summary>
		/// HIBC Data Matrix Rectangular
		/// </summary>
        "hibcdatamatrixrectangular":"hibcdatamatrixrectangular",
		/// <summary>
		/// HIBC MicroPDF417
		/// </summary>
        "hibcmicropdf417":"hibcmicropdf417",
		/// <summary>
		/// HIBC PDF417
		/// </summary>
        "hibcpdf417":"hibcpdf417",
		/// <summary>
		/// HIBC QR Code
		/// </summary>
        "hibcqrcode":"hibcqrcode",
		/// <summary>
		/// IATA 2 of 5
		/// </summary>
        "iata2of5":"iata2of5",
		/// <summary>
		/// Deutsche Post Identcode
		/// </summary>
        "identcode":"identcode",
		/// <summary>
		/// Industrial 2 of 5
		/// </summary>
        "industrial2of5":"industrial2of5",
		/// <summary>
		/// Interleaved 2 of 5 (ITF)
		/// </summary>
        "interleaved2of5":"interleaved2of5",
		/// <summary>
		/// ISBN
		/// </summary>
        "isbn":"isbn",
		/// <summary>
		/// ISMN
		/// </summary>
        "ismn":"ismn",
		/// <summary>
		/// ISSN
		/// </summary>
        "issn":"issn",
		/// <summary>
		/// ITF-14
		/// </summary>
        "itf14":"itf14",
		/// <summary>
		/// Japan Post 4 State Customer Code
		/// </summary>
        "japanpost":"japanpost",
		/// <summary>
		/// Royal Dutch TPG Post KIX
		/// </summary>
        "kix":"kix",
		/// <summary>
		/// Deutsche Post Leitcode
		/// </summary>
        "leitcode":"leitcode",
		/// <summary>
		/// Matrix 2 of 5
		/// </summary>
        "matrix2of5":"matrix2of5",
		/// <summary>
		/// MaxiCode
		/// </summary>
        "maxicode":"maxicode",
		/// <summary>
		/// MicroPDF417
		/// </summary>
        "micropdf417":"micropdf417",
		/// <summary>
		/// Micro QR Code
		/// </summary>
        "microqrcode":"microqrcode",
		/// <summary>
		/// MSI Modified Plessey
		/// </summary>
        "msi":"msi",
		/// <summary>
		/// USPS Intelligent Mail
		/// </summary>
        "onecode":"onecode",
		/// <summary>
		/// PDF417
		/// </summary>
        "pdf417":"pdf417",
		/// <summary>
		/// Compact PDF417
		/// </summary>
        "pdf417compact":"pdf417compact",
		/// <summary>
		/// Two-track Pharmacode
		/// </summary>
        "pharmacode2":"pharmacode2",
		/// <summary>
		/// Pharmaceutical Binary Code
		/// </summary>
        "pharmacode":"pharmacode",
		/// <summary>
		/// USPS PLANET
		/// </summary>
        "planet":"planet",
		/// <summary>
		/// Plessey UK
		/// </summary>
        "plessey":"plessey",
		/// <summary>
		/// PosiCode
		/// </summary>
        "posicode":"posicode",
		/// <summary>
		/// USPS POSTNET
		/// </summary>
        "postnet":"postnet",
		/// <summary>
		/// Pharmazentralnummer (PZN)
		/// </summary>
        "pzn":"pzn",
		/// <summary>
		/// QR Code
		/// </summary>
        "qrcode":"qrcode",
		/// <summary>
		/// Codabar
		/// </summary>
        "rationalizedCodabar":"rationalizedCodabar",
		/// <summary>
		/// Custom 1D symbology
		/// </summary>
        "raw":"raw",
		/// <summary>
		/// Royal Mail 4 State Customer Code
		/// </summary>
        "royalmail":"royalmail",
		/// <summary>
		/// SSCC-18
		/// </summary>
        "sscc18":"sscc18",
		/// <summary>
		/// Miscellaneous symbols
		/// </summary>
        "symbol":"symbol",
		/// <summary>
		/// Telepen
		/// </summary>
        "telepen":"telepen",
		/// <summary>
		/// Telepen Numeric
		/// </summary>
        "telepennumeric":"telepennumeric",
		/// <summary>
		/// Ultracode
		/// </summary>
        "ultracode":"ultracode",
		/// <summary>
		/// UPC-A
		/// </summary>
        "upca":"upca",
		/// <summary>
		/// UPC-A Composite
		/// </summary>
        "upcacomposite":"upcacomposite",
		/// <summary>
		/// UPC-E
		/// </summary>
        "upce":"upce",
		/// <summary>
		/// UPC-E Composite
		/// </summary>
		"upcecomposite":"upcecomposite"
	}


module.exports = {
    BarcodeCreate: Create,
    setApiKey: setApiKey,
    UpcLookup: UpcLookup,
    DrugUpc: DrugUpc,
    DrugSearch: DrugSearch,
    DeviceSearch: DeviceSearch,
    FoodUpc: FoodUpc
}
