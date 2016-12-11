import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";

import { BlogComponent } from "./blog.component";
import { DashboardComponent } from "./dashboard.component";
import { AboutComponent } from "./about.component";
import { PostComponent } from "./post.component";

import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
	{
        path: "",
		redirectTo: "/dashboard",
		pathMatch: "full"
	},
	{
		path: "blog",
        component: BlogComponent,
        canActivate: [AuthGuard]
	},
	{
		path: "dashboard",
		component: DashboardComponent
    },
    {
        path: "about",
        component: AboutComponent  
    },
	{
		path:"post/:id",
        component: PostComponent,
        canActivate: [AuthGuard]
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);