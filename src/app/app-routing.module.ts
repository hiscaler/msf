import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from './components/website/website.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'passport/login', component: LoginComponent},
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
