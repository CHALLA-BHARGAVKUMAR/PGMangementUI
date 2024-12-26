import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { MembersComponent } from './components/members/members.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'layout',
        pathMatch:'full'
    },
    {
     path:'admin',
     component:AdminComponent,
    // canActivate:[authGuard]
    },    
    {
        path:'',
        component:LayoutComponent,
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
            
        ]
       // canActivate:[authGuard]
    }
];
