import { Component, OnInit } from '@angular/core';
import { Website } from "../../models/Website";
import { WebsiteService } from "../../services/website.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { GlobalService } from "../../services/global.service";
import { ResponseBody } from "../../services/response-body.service";

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
    private globalService: GlobalService,
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

  onDelete(id: number, index: number): void {
    this.websiteService.delete(id).subscribe(
      resp => {
        this.websites.splice(index, 1);
      },
      err => {
        console.info(err);
      }
    );
  }

}
