import { Component, Input, OnInit } from '@angular/core';
import { Website } from "../../../models/Website";
import { Location } from "@angular/common";
import { WebsiteService } from "../../../services/website.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-website-form',
  templateUrl: './website-form.component.html',
  styleUrls: ['./website-form.component.css']
})
export class WebsiteFormComponent implements OnInit {

  @Input() model: Website;
  isNewRecord: boolean;
  pk: number;
  submitted = false;
  formData = new FormGroup({
    domain: new FormControl('', Validators.required),
    enabled: new FormControl(true)
  });

  constructor(
    private websiteService: WebsiteService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNewRecord = false;
      this.pk = id;
      this.submitted = true;
      this.websiteService.view(id).subscribe(response => {
        if (response && response.success) {
          this.formData.get('domain').setValue(response.data.domain);
          this.formData.get('enabled').setValue(!!response.data.enabled);
        }
      });
    } else {
      this.isNewRecord = true;
    }
  }

  onCreate(): void {
    this.websiteService.create(this.formData).subscribe(response => {
      if (response.success) {
        this.model = response.data.items;
        setTimeout(() => this.router.navigateByUrl('websites'));
      }
    });
  }

  onUpdate(id: number) {
    this.websiteService.update(id, this.formData).subscribe(response => {
      if (response && response.success) {
        this.goBack();
        // this.formData.get('domain').setValue(response.data.domain);
        // this.formData.get('enabled').setValue(!!response.data.enabled);
      }
    });
  }


  goBack() {
    this.location.back();
  }

}
