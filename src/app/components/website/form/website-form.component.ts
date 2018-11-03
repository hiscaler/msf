import { Component, OnInit } from '@angular/core';
import { Website } from "../../../models/Website";

@Component({
  selector: 'app-website-form',
  templateUrl: './website-form.component.html',
  styleUrls: ['./website-form.component.css']
})
export class WebsiteFormComponent implements OnInit {

  model = new Website();
  submitted = false;

  constructor() {
  }

  ngOnInit() {
  }

  create() {
    this.model.domain = 'www.example.com';
    this.model.enabled = true;
  }

  onSubmit() {
    this.submitted = true;
  }

}
