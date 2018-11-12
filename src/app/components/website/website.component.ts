import { Component, OnInit } from '@angular/core';
import { Website } from "../../models/Website";
import { WebsiteService } from "../../services/website.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  websites: Website[];

  constructor(
    private router: Router,
    private location: Location,
    private websiteService: WebsiteService
  ) {
  }

  ngOnInit() {
    this.websiteService.getWebsites().subscribe(response => {
      if (response.success) {
        this.websites = response.data.items;
      }
    });
  }

  onDelete(id: number): void {
    this.websiteService.delete(id).subscribe(
      resp => {
        // this.location.go('/websites');
        if (resp.success) {
          setTimeout(() => this.router.navigateByUrl('websites'));
        }
      },
      err => {
        alert('ddd');
        console.info(err);
      }
    );
  }

}
