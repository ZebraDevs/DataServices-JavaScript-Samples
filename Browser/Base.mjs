//Base                         
//                             
//                             
var baseURL = "https://api.zebra.com/v2/tools/";
var apiKey = "";               
                               
                               
export function callServiceBytes(api, method, data){
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
            "apiKey": apiKey,                          
        },                     
        body: data,            
        method: method         
    };                         
                               
    fetch(uri, params)         
    .then(data=>{return data.json()})
    .catch(error=>console.log(error));
}                              

export function setApiKey(key){
    apiKey = key;
    console.log("API Key is now: " + apiKey);
}
                               
export default {callServiceBytes, setApiKey};
