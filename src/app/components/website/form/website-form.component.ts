import { Component, OnInit } from '@angular/core';
import { Website } from "../../../models/Website";
import { WebsiteService } from "../../../services/website.service";

@Component({
  selector: 'app-website-form',
  templateUrl: './website-form.component.html',
  styleUrls: ['./website-form.component.css']
})
export class WebsiteFormComponent implements OnInit {

  model = new Website();
  submitted = false;

  constructor(private websiteService: WebsiteService) {
  }

  ngOnInit() {
  }

  create(website: Website): void {
    this.submitted = true;
    this.websiteService.create(website).subscribe(response => {
      if (response.success) {
        this.model = response.data.items;
      }
    });
  }

}
