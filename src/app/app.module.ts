import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WebsiteComponent } from './components/website/website.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { WebsiteFormComponent } from './components/website/form/website-form.component';

const apiPrefix = '192.168.1.1/index.php/api';

@NgModule({
  declarations: [
    AppComponent,
    WebsiteComponent,
    LoginComponent,
    WebsiteFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
