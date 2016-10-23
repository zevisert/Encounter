import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// Component declarations
import { AppComponent }   from "./app.component";
import { AboutComponent } from "./about.component";
import { BlogComponent } from "./blog.component";
import { PostComponent } from "./post.component";
import { DashboardComponent } from "./dashboard.component";

// Other declarations
import { routing } from "./app.routing";

import "./rxjs-extensions";

@NgModule({
  imports: [
  	BrowserModule,
  	FormsModule,
  	HttpModule,
    routing
  ],

  declarations: [
      AppComponent,
      AboutComponent,
      BlogComponent, 
      PostComponent,
      PostComponent,
      DashboardComponent
  ],

  providers: [
  ],

  bootstrap: [
  	AppComponent
  ]
})
export class AppModule { }
