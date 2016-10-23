"use strict";
var router_1 = require("@angular/router");
var blog_component_1 = require("./blog.component");
var dashboard_component_1 = require("./dashboard.component");
var about_component_1 = require("./about.component");
var post_component_1 = require("./post.component");
var appRoutes = [
    {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full"
    },
    {
        path: "blog",
        component: blog_component_1.BlogComponent
    },
    {
        path: "dashboard",
        component: dashboard_component_1.DashboardComponent
    },
    {
        path: "about",
        component: about_component_1.AboutComponent
    },
    {
        path: "post/:id",
        component: post_component_1.PostComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map