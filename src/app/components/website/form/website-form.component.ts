import { Component, Input, OnInit } from '@angular/core';
import { Website } from "../../../models/Website";
import { Location } from "@angular/common";
import { WebsiteService } from "../../../services/website.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-website-form',
  templateUrl: './website-form.component.html',
  styleUrls: ['./website-form.component.css']
})
export class WebsiteFormComponent implements OnInit {

  @Input() model: Website;
  isNewRecord: boolean;
  submitted = false;

  constructor(
    private websiteService: WebsiteService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.model = new Website();
    this.model.domain = 'ddd';
  }

  create(website: Website): void {
    this.isNewRecord = true;
    this.submitted = true;
    this.websiteService.create(website).subscribe(response => {
      if (response.success) {
        this.model = response.data.items;
      }
    });
  }

  update(website: Website): void {
    this.isNewRecord = false;
    this.submitted = true;
    this.websiteService.update(website).subscribe(response => {
    });
  }

  goBack() {
    this.location.back();
  }

}
