import { Component, Input, OnInit } from '@angular/core';
import { Website } from "../../../models/Website";
import { Location } from "@angular/common";
import { WebsiteService } from "../../../services/website.service";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-website-form',
  templateUrl: './website-form.component.html',
  styleUrls: ['./website-form.component.css']
})
export class WebsiteFormComponent implements OnInit {

  @Input() model: Website;
  isNewRecord: boolean;
  submitted = false;
  formData = new FormGroup({
    domain: new FormControl(''),
    enabled: new FormControl(true)
  });

  constructor(
    private websiteService: WebsiteService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.websiteService.create(this.formData).subscribe(response => {
      if (response.success) {
        this.model = response.data.items;
      }
    });
  }

  create(website: Website): void {
    alert('ddd');
    this.isNewRecord = true;
    this.submitted = true;
    this.model = new Website();
    this.model.domain = 'abc';
    this.model.enabled = true;
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
