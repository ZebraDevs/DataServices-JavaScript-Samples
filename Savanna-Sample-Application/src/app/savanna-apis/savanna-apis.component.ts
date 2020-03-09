import { Component, OnInit } from '@angular/core';
// import { AllCode } from '../../assets/js/AllCode';
declare var AllCode: any;

// This is where you define the functions you want to use from AllCode.js
// declare const

@Component({
  selector: 'app-savanna-apis',
  templateUrl: './savanna-apis.component.html',
  styleUrls: ['./savanna-apis.component.css']
})
export class SavannaAPISComponent implements OnInit {
  radioButton: any;
  createBarcodeIncludeText: any;
  createBarcodeScale: any;
  createBarcodeScaleX: any;
  createBarcodeScaleY: any;
  createBarcodeDisabled: string;
  // Default types
  barcodeArgs: any;
  fdaArgs: any;
  upcLookupArgs: any;

  constructor() {
    this.radioButton = {
      function: ''
    };
    this.createBarcodeIncludeText = {
      function: false
    };
    this.barcodeArgs = {
      symbology: '',
      text: '',
      scale: '',
      scaleX: '',
      scaleY: '',
      rotation: '',
      includeText: Boolean
    };
    this.fdaArgs = {
      function: '',
      searchValue: ''
    };
    this.upcLookupArgs = {
      upc: ''
    };
  }

  ngOnInit(): void {
    this.makeInputHidden();
  }

  inputSelector() {
    const createBarcodeOptions = document.getElementById('createBarcodeOptions');
    const fdaRecallOptions = document.getElementById('fdaRecallOptions');
    const upcLookupOptions = document.getElementById('upcLookupOptions');
    const go = document.getElementById('go');
    go.hidden = false;
    createBarcodeOptions.hidden = true;
    fdaRecallOptions.hidden = true;
    upcLookupOptions.hidden = true;
    if (this.radioButton.function === 'CreateBarcode') {
      // Display CreateBarcode options
      createBarcodeOptions.hidden = false;
    } else if (this.radioButton.function === 'FDARecall') {
      // Display FDARecall options
      fdaRecallOptions.hidden = false;
    } else {
      upcLookupOptions.hidden = false;
      // Display UPCLookup options
    }
  }

  makeInputHidden() {
    const createBarcodeOptions = document.getElementById('createBarcodeOptions');
    const fdaRecallOptions = document.getElementById('fdaRecallOptions');
    const upcLookupOptions = document.getElementById('upcLookupOptions');
    const go = document.getElementById('go');
    createBarcodeOptions.hidden = true;
    fdaRecallOptions.hidden = true;
    upcLookupOptions.hidden = true;
    go.hidden = true;
  }

  disableScales() {
    if (this.createBarcodeScale) {
      this.createBarcodeDisabled = 'XY';
    } else if (this.createBarcodeScaleX || this.createBarcodeScaleY) {
      this.createBarcodeDisabled = 'Scale';
    } else {
    this.createBarcodeDisabled = '';
    }
  }

  setFdaRecallFunction(fun) {
    // console.log(this.fdaRecallFunction.function + this.fdaRecallType.function);
    console.log(fun);
  }

  setFdaRecallType(type) {
    console.log(type);
  }

  setSymbology(symbology: string) {
    this.barcodeArgs.symbology = symbology;
  }

  setText(text: string) {
    this.barcodeArgs.text = text;
  }

  setScale(scale: string) {
    this.barcodeArgs.scaleX = null;
    this.barcodeArgs.scaleY = null;
    this.barcodeArgs.scale = scale;
  }

  setScaleX(scaleX: string) {
    this.barcodeArgs.scaleX = scaleX;
    this.barcodeArgs.scale = null;
  }

  setScaleY(scaleY: string) {
    this.barcodeArgs.scaleY = scaleY;
    this.barcodeArgs.scale = null;
  }

  setRotation(rotation: string) {
    this.barcodeArgs.rotation = rotation;
  }

  setIncludeText() {
    if (this.barcodeArgs.includeText) {
      this.barcodeArgs.includeText = false;
    } else if (!this.barcodeArgs.includeText) {
    this.barcodeArgs.includeText = true;
    } else {
      this.barcodeArgs.includeText = false;
    }
  }

  runProgram() {
    // Gets the function
    const func = this.getFunction();
    if (func === 'CreateBarcode') {
      AllCode.Create(
        this.barcodeArgs.symbology,
        this.barcodeArgs.text,
        this.barcodeArgs.scale,
        this.barcodeArgs.scaleX,
        this.barcodeArgs.scaleY,
        this.barcodeArgs.rotation,
        this.barcodeArgs.includeText
      );
    } else if (func === 'FDARecall') {
      this.getFDARecallArgs();

    } else if (func === 'UPCLookup') {
      this.getUPCLookupArgs();

    } else { console.error(); }
    console.log(this.barcodeArgs);
  }

  getFunction() {
    // Gets the type of call that's going to be made.
    return this.radioButton.function;
  }

  getCreateBarcodeArgs() {

  }

  getFDARecallArgs() {

  }

  getUPCLookupArgs() {

  }

}
