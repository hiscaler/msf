import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { WebsiteComponent } from "./website/website.component";

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'websites', component: WebsiteComponent},
  {path: 'heroes', component: WebsiteComponent},
  {path: 'detail/:id', component: WebsiteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
