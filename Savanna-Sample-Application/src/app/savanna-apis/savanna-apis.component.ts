import { Component, OnInit } from '@angular/core';

// This is where you define the functions you want to use from AllCode.js
// declare const

@Component({
  selector: 'app-savanna-apis',
  templateUrl: './savanna-apis.component.html',
  styleUrls: ['./savanna-apis.component.css']
})
export class SavannaAPISComponent implements OnInit {
  radioButton: any;
  fdaRecallFunction: any;
  fdaRecallType: any;
  createBarcodeIncludeText: any;
  createBarcodeScale: any;
  createBarcodeScaleX: any;
  createBarcodeScaleY: any;
  createBarcodeDisabled: string;

  constructor() {
    this.radioButton = {
      function: ''
    };
    this.createBarcodeIncludeText = {
      function: ''
    };
    this.fdaRecallFunction = {
      function: ''
    };
    this.fdaRecallType = {
      function: ''
    };
  }

  ngOnInit(): void {
    this.makeInputHidden();
  }

  inputSelector() {
    const createBarcodeOptions = document.getElementById('createBarcodeOptions');
    const fdaRecallOptions = document.getElementById('fdaRecallOptions');
    const upcLookupOptions = document.getElementById('upcLookupOptions');
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
    createBarcodeOptions.hidden = true;
    fdaRecallOptions.hidden = true;
    upcLookupOptions.hidden = true;
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
}
