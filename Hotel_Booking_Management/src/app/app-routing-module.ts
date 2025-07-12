import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Viewallhotel } from './hotel/viewallhotel/viewallhotel';
import { Addhotel } from './hotel/addhotel/addhotel';
import { Updatehotel } from './hotel/updatehotel/updatehotel';
import { Viewlocation } from './location/viewlocation/viewlocation';
import { Updatelocation } from './location/updatelocation/updatelocation';
import { Addlocation } from './location/addlocation/addlocation';
import { Addroom } from './room/addroom/addroom';
import { Viewallroom } from './room/viewallroom/viewallroom';
import { Updateroom } from './room/updateroom/updateroom';
import { Registrationform } from './auth/registrationform/registrationform';
import { Login } from './auth/login/login';
import { Logout } from './auth/logout/logout';
import { Userprofile } from './profile/userprofile/userprofile';

const routes: Routes = [
  {path: 'viewhotel',component: Viewallhotel},
  {path: 'addhotel', component: Addhotel},
  {path: 'updatehotel/:id',component: Updatehotel},
  {path:'addlocation',component:Addlocation},
  {path: 'viewlocation',component:Viewlocation},
  {path: 'updatelocation/:id',component: Updatelocation},
  {path:'addroom', component: Addroom},
  {path: 'roomview', component: Viewallroom},
  {path: 'updateroom/:id', component: Updateroom},
  {path: 'reg', component: Registrationform},
  {path: '', component: Login},
  {path: 'logout', component: Logout},
  {path: 'userprofile', component: Userprofile},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
