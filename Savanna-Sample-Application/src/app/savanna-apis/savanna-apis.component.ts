import { Component, OnInit } from '@angular/core';

// This is where you define the functions you want to use from AllCode.js
// declare const

@Component({
  selector: 'app-savanna-apis',
  templateUrl: './savanna-apis.component.html',
  styleUrls: ['./savanna-apis.component.css']
})
export class SavannaAPISComponent implements OnInit {
  radioButton;

  constructor() {
    this.radioButton = {
      function: ''
    };
  }

  ngOnInit(): void {}

  inputSelector() {
    const div = document.getElementById('options');
    div.innerHTML = '';
    if (this.radioButton.function === 'CreateBarcode') {
      // Display CreateBarcode options

      div.innerHTML = `
      <mat-form-field class="example-full-width">
    <mat-label>Leave a comment</mat-label>
    <textarea matInput placeholder="Ex. It makes me feel..."></textarea>
  </mat-form-field>
      `;
    } else if (this.radioButton.function === 'FDARecall') {
      // Display FDARecall options
    } else {
      // Display UPCLookup options
    }
  }
}
