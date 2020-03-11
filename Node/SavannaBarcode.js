var http = require("http");
global.https = require("https");
const fs = require('fs');
var ZebraSavanna = require("./AllCode.js");
    //ZebraSavanna.setApiKey("I1sUUtRw8aLqzxwW7RwGTkpJxCN06INb");
const yargs = require("yargs");


yargs.command("Help", "Displays help info", {
    command: {
        demandOption: false,
        type: "string",
        describe: "Command you wish to learn more about",
        alias: "c"
    }
}, (argv) => {
    showHelpInfo(argv.command);
})
.argv


yargs.command("UPCLookup", "Find product details from UPC", {
    value: {
        demandOption: true,
        type: "string",
        describe: "UPC to lookup",
        alias: "i"
    },
    api: {
        demandOption: true,
        type: "string",
        describe: "API key to authenticate with Zebra Savanna servers",
        alias: "a"
    }
}, (argv) => {
    CallUPCLookup(argv.value, argv.api);
})
.argv

yargs.command("CreateBarcode", "Returns a PNG of <input> of the requested <symbology>", {
    api: {
        demandOption: true,
        type: "string",
        describe: "API key to authenticate with Zebra Savanna servers",
        alias: "a"
    },
    symbology: {
        demandOption: true,
        type: "string",
        describe: "The type of barcode you would like returned",
        alias: "s"
    },
    input: {
        demandOption: true,
        type: "string",
        describe: "The value to be encoded",
        alias: "i",
    },
    rotation: {
        demandOption: false,
        type: "string",
        describe: "Rotation of the barcode: N = Normal, R = Clockwise, I = Inverted, L = Counter-Clockwise",
        default: "N",
        alias: "r"
    },
    size: {
        demandOption: false,
        type: "number",
        describe: "Sets the scale of returned barcode",
        default: "1",
        alias: "sz"
    },
    text: {
        demandOption: false,
        type: "bool",
        describe: "Toggle <input> from showing",
        default: true,
        alias: "t"
    }
}, (argv) => {
    CallCreateBarcode(argv.input, argv.symbology, argv.api);
})
//.help()
.argv


yargs.command("DrugUPC", "See if a drug is recalled by UPC", {
    api: {
        demandOption: true,
        type: "string",
        describe: "API key to authenticate with Zebra Savanna servers",
        alias: "a"
    },
    input: {
        demandOption: true,
        type: "string",
        describe: "Check if the FDA has recalled a drug by UPC",
        alias: "i"
    },
    count: {
        demandOption: false,
        type: "number",
        describe: "How many results to return starting with the most recent",
        alias: "c",
        default: 1
    }
}, (argv) =>{
    CallDrugUpc(argv.input, argv.count, argv.api)
})
//.help()
.argv


yargs.command("DrugSearch", "Search recalls of drugs matching <search>", {
    api: {
        demandOption: true,
        type: "string",
        describe: "API key to authenticate with Zebra Savanna servers",
        alias: "a"
    },
    search:{
        demandOption: true,
        type:"string",
        describe: "String to search for",
        alias: ["s","i"]
    },
    count: {
        demandOption: false,
        type: "number",
        describe: "How many results to return starting with the most recent",
        alias: "c",
        default: 1
    }
}, (argv) =>{
    CallDrugSearch(argv.search, argv.count, argv.api)
})
//.help()
.argv


yargs.command("FoodUPC", "Check for FDA recalls of food matching <search>", {
    api: {
        demandOption: true,
        type: "string",
        describe: "API key to authenticate with Zebra Savanna servers",
        alias: "a"
    },
    search: {
        demandOption: true,
        type: "string",
        describe: "String to search for",
        alias: ["s", "i"],
    },
    count: {
        demandOption: false,
        type: "number",
        describe: "How many results to return starting with the most recent",
        alias: "c",
        default: 1
    }
}, (argv) => {
    CallFoodUpc(argv.search, argv.count, argv.api);
})
//.help()
.argv


yargs.command("DeviceSearch", "Find FDA Recalls for devices matching <search>", {
    api: {
        demandOption: true,
        type: "string",
        describe: "API key to authenticate with Zebra Savanna servers",
        alias: "a"
    },
    search: {
        demandOption: true,
        type: "string",
        describe: "String to search for",
        alias: ["s", "i"],
    },
    count: {
        demandOption: false,
        type: "number",
        describe: "How many results to return starting with the most recent",
        alias: "c",
        default: 1
    }
}, (argv) => {
    CallDeviceSearch(argv.search, argv.count, argv.api);
})
.help()
.argv


function showHelpInfo(funcName){
var DefaultHelp = "Help\n" +
    "-Display help pages for Savanna barcode APIs\n" +
    "\t-c --command : Name of command to display help for possible values: CreateBarcode, UPCLookup, DrugUPC, DrugSearch, FoodUPC, DeviceSearch \n" +
    "\tExample: Help -c CreateBarcode";

var UPCLookupHelp = "UPCLookup \n"+
    "-Find product details from UPC value \n"+
    "\t -a --api : Savanna API key \n"+
    "\t -i --input : Value to search for \n";

var CreateBarcodeHelp = "CreateBarcode \n"+
    "-Generate a PNG with the supplied value and symbology \n"+
    "\t -a --api : Savanna API key \n"+
    "\t -i --input : Value to encode with <symbology> \n"+
    "\t -s --symbology : Symbology to encode <input> value with \n"+
    "\t -r --rotation : Orientation for resulting barcode values are (N)ormal, (R)ight rotation, (I)nverted, and (L)eft rotation \n";

var DrugUPCHelp = "DrugUPC \n"+
    "-Find FDA recalls by UPC \n"+
    "\t -a --api : Savanna API key \n"+
    "\t -i --input : UPC value to search for \n"+
    "\t -c --count : How many results to return sorted by newest \n";

var DrugSearchHelp = "DrugSearch \n"+
    "-Search for FDA drug recalls by search term \n"+
    "\t -a --api : Savanna API Key \n"+
    "\t -i -s --search : String to search for \n"+
    "\t -c --count : How many results to return sorted by newest";

var FoodUPCHelp = "FoodUPC \n"+
    "-Search FDA food recalls by search term \n"+
    "\t -a --api : Savanna API key \n"+
    "\t -i -s --search : String to search for \n"+
    "\t -c --count : How many results to return sorted by newest";

var DeviceSearchHelp = "DeviceSearch \n"+
    "-Search FDA device recalls for matching devices \n"+
    "\t -a --api : Savanna API key \n"+
    "\t -i -s --search : String to search for \n"+
    "\t -c --count : How many results to return sorted by newest";

    switch(funcName) {
        case "UPCLookup":
            console.log(UPCLookupHelp);
            break;
        case "CreateBarcode":
            console.log(CreateBarcodeHelp);
            break;
        case "DrugUPC":
            console.log(DrugUPCHelp);
            break;
        case "DrugSearch":
            console.log(DrugSearchHelp);
            break;
        case "FoodUPC":
            console.log(FoodUPCHelp);
            break;
        case "DeviceSearch":
            console.log(DeviceSearchHelp);
            break;
        default:
            console.log(DefaultHelp);
            break;
    }

}


function CallCreateBarcode(upc, symbology, apiKey){

        ZebraSavanna.BarcodeCreate(symbology, upc, 1, "N", true, apiKey)
            .then(data => {
                console.log("Create Barcode writing to disk.");
                var newData = data;
                    //.toString().replace("/^data:image\/\w+;base64", '');
                fs.writeFile(upc+".png", newData, "binary", (err) => { if(err){ console.log("Error: " + err); throw err; } } )
            })
            .catch(error => {
                console.log("Create Barcode failure");
                console.log(error);
            });
}

function CallUPCLookup(upcValue, apiKey){

        ZebraSavanna.UpcLookup(upcValue, apiKey)//"047701002292")
        .then(data => { 
                //console.log("Returned Data: " + data);
                console.log("UPC Lookup Info");
                var myNewData = JSON.parse(data);
                console.log(myNewData);
        })
        .catch(error => {
            console.log("UPC Lookup failure");
            console.log(error);
        });
}

function CallDeviceSearch(search, count, apiKey){

        ZebraSavanna.DeviceSearch(search, count)
            .then(data => {
                console.log("Device Search Info");
                //console.log("Returned Data: " + data);
                var myNewData = JSON.parse(data);
                console.log(myNewData);
            })
            .catch(error => {
                console.log("Device Search failure");
                console.log(error);
            });

}

function CallFoodUpc(upc, count, apiKey){

        ZebraSavanna.FoodUpc(upc, count, apiKey)
            .then(data =>{
                console.log("Food UPC Info");
                //console.log("Returned Data: " + data);
                var myNewData = JSON.parse(data);
                console.log(myNewData);
            })
            .catch(error => {
                console.log("Food UPC failure");
                console.log(error);
            });
        
}

function CallDrugSearch(drugUPC, count, apiKey){

        ZebraSavanna.DrugSearch(drugUPC, count, apiKey)
            .then(data =>{
                console.log("Drug Search");
                //console.log("Returned Data: " + data);
                var myNewData = JSON.parse(data);
                console.log(myNewData);
            })
            .catch(error => {
                console.log("Drug Search failure");
                console.log(error);
            });

}

function CallDrugUpc(drugUPC, count, apiKey){

        ZebraSavanna.DrugUpc(drugUPC, count, apiKey)
            .then(data =>{
                console.log("Drug UPC Info")
                //console.log("Returned Data: " + data);
                var myNewData = JSON.parse(data);
                console.log(myNewData);
            })
            .catch(error => {
                console.log("Drug UPC failure");
                console.log(error);
            });
           
}
