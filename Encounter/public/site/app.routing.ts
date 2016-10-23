import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { DashboardComponent } from './dashboard.component';
import { AboutComponent } from './about.component';
import { PostComponent } from './post.component';

const appRoutes: Routes = [
	{
		path: "",
		redirectTo: "/dashboard",
		pathMatch: "full"
	},
	{
		path: "blog",
		component: BlogComponent
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
		component: PostComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);