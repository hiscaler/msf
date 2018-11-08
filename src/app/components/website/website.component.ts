import { Component, OnInit } from '@angular/core';
import { Website } from "../../models/Website";
import { WebsiteService } from "../../services/website.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  website: Website;
  websites: Website[];

  constructor(
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
    this.websiteService.delete(id).subscribe();
    this.location.go('/websites');
  }

}
