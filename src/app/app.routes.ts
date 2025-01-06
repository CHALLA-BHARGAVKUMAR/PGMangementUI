import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { MembersComponent } from './components/members/members.component';
import { RoomsWithMembersComponent } from './components/rooms-with-members/rooms-with-members.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

    {
     path:'admin',
     component:AdminComponent,
    // canActivate:[authGuard]
    },    
    {
        path:'login',
        component:LoginComponent,
       // canActivate:[authGuard]
       }, 
    {
        path:'',
        component:LayoutComponent,
        canActivate:[authGuard],
        children:[
            
            {
                path:'admindashboard',
                component:AdmindashboardComponent,
               // canActivate:[authGuard]
            },
            {
                path:'rooms',
                component:RoomsComponent,
               // canActivate:[authGuard]
            },
            {
                path:'members',
                component:MembersComponent,
               // canActivate:[authGuard]
            },
            {
                path:'rooms-details',
                component:RoomsWithMembersComponent,
               // canActivate:[authGuard]
            },
        ]
       // canActivate:[authGuard]
    }
];
