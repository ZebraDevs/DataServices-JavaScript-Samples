import * as AllCode from './AllCode.js';


// Base Savanna URL
// var baseURL = "test-api1.zebra.com";

// API Key here.
var baseApiKey = "s2ABMMbqbkLGhnFG4B2cMi33DPaBYdZ0";
export var jsonData = '';


export function callDrugUPC(searchValue) {
  AllCode.DrugUpc(searchValue, 10, baseApiKey)
    .then(data => {
      var items = "";
      var listInfo = "";
      data.json().then(d => {
        items = d;
        d.results.forEach(function(i, ind, arr) {
          listInfo += JSON.stringify(i);
        });
        console.log("Drug UPC: " + listInfo);
      });
    })
    .catch(error => {
      console.log("Drug UPC lookup failed!");
    });
}

export function callDrugSearch(searchValue) {
  AllCode.DrugSearch(searchValue, 10, baseApiKey)
    .then(data => {
      var items = "";
      var listInfo = "";
      //var text = "";
      data.json().then(d => {
        items = d.results;
        d.results.forEach(function(i, ind, arr) {
          listInfo += JSON.stringify(i, null,'\t');
        });
        console.log("Drug Search: " + listInfo);

        //Printing output to Angular
        if(document.getElementById("output")) {
        var old = document.getElementById("output")
        var reallyOld = old.parentNode
        reallyOld.removeChild(old)
        }
        var text = document.createElement("p");
        text.id = "output";
        text.innerText = listInfo;
        document.body.appendChild(text);
      });
    })
    .catch(error => {
      console.log("Drug Search failed!");
    });
}

export function callFoodUPC(searchValue) {
  FoodUpc(searchValue, 1, baseApiKey)
    .then(data => {
      var items = "";
      var listInfo = "";
      data.json().then(d => {
        window.items = d;
        d.results.forEach(function(i, ind, arr) {
          listInfo += JSON.stringify(i);
        });
        console.log("Food UPC: " + listInfo);
      });
    })
    .catch(error => {
      console.log("Food UPC lookup failed!");
    });
}

export function callDeviceSearch(searchValue) {
  DeviceSearch(searchValue, 10, baseApiKey)
    .then(data => {
      var items = "";
      var listInfo = "";
      data.json().then(d => {
        items = d;
        d.results.forEach(function(i, ind, arr) {
          listInfo += JSON.stringify(i);
        });
        console.log("Device Search: " + listInfo);
      });
    })
    .catch(error => {
      console.log("Device lookup failed!");
    });
}
export function callUPCLookup(upc) {
  UPCLookup(upc, baseApiKey)
    .then(data => {
      var items = "";
      var listInfo = "";
      data.json().then(d => {
        d.items.forEach(function(i, ind, arr) {
          listInfo += JSON.stringify(i);
        });
        console.log("UPC Lookup: " + listInfo);
        window.jsonData = listInfo;
      });
    })
    .catch(error => {
      console.log("UPC Lookup Failed");
      console.log(error);
    });
}

export function callCreateBarcode(symbology, text, scale, scaleX, scaleY, rotation, includeText) {
  AllCode.CreateBarcode(symbology, text, scale, scaleX, scaleY, rotation, includeText, baseApiKey)
    .then(data => {
      console.log("Create Barcode: " + data);
      window.myData = data.body;
      var reader = data.body.getReader();
      var imgData = "";
      window.image = document.createElement("img");
      document.body.appendChild(image);
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        }
      });
    })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob => URL.createObjectURL(blob))
    .then(url => console.log((window.image.src = url)))
    .catch(err => console.error(err));
}

function setOutput(info) {
  if(document.getElementById("output")) {
    var old = document.getElementById("output")
    var reallyOld = old.parentNode
    reallyOld.removeChild(old)
    }
    var text = document.createElement("p");
    text.id = "output";
    text.innerText = info;
    document.body.appendChild(text);
}