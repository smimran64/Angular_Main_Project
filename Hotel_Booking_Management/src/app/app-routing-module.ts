import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Viewallhotel } from './hotel/viewallhotel/viewallhotel';
import { Addhotel } from './hotel/addhotel/addhotel';
import { Updatehotel } from './hotel/updatehotel/updatehotel';
import { Viewlocation } from './location/viewlocation/viewlocation';
import { Updatelocation } from './location/updatelocation/updatelocation';
import { Addlocation } from './location/addlocation/addlocation';

import { Registrationform } from './auth/registrationform/registrationform';
import { Login } from './auth/login/login';
import { Logout } from './auth/logout/logout';
import { Userprofile } from './profile/userprofile/userprofile';
import { Addroom } from './room/addroom/addroom';
import { Viewallroom } from './room/viewallroom/viewallroom';
import { Home } from './home/home';
import { HotelDetails } from './hotel/hotel-details/hotel-details';
import { Updateroom } from './room/updateroom/updateroom';
import { Addbooking } from './booking/addbooking/addbooking';
import { Viewallbooking } from './booking/viewallbooking/viewallbooking';
import { Bookingalert } from './booking/bookingalert/bookingalert';

import { Hoteladminprofile } from './profile/hoteladminprofile/hoteladminprofile';
import { Adminprofile } from './profile/adminprofile/adminprofile';
import { AdminGuard } from './guard/admin-guard';
import { HotelAdminGuard } from './guard/hoteladmin-guard';
import { AdminHotelAdminGuard } from './guard/adminhoteladmin-guard';
import { UserGuard } from './guard/user-guard';
import { AllGuard } from './guard/all-guard';




const routes: Routes = [
  {path: 'home',component: Home},
  {path: 'viewhotel',component: Viewallhotel},
  {path: 'addhotel', component: Addhotel},
  {path: 'updatehotel/:id',component: Updatehotel},
  {path:'addlocation',component:Addlocation},
  {path: 'viewlocation',component:Viewlocation},
  {path: 'updatelocation/:id',component: Updatelocation},
  {path:'addroom', component: Addroom},
  {path: 'roomview', component: Viewallroom},
  {path: 'updateroom/:id', component:Updateroom},
  // {path: 'updateroom/:id', component: Updateroom},
  {path: 'reg', component: Registrationform},
  {path: '', component: Login},
  {path: 'logout', component: Logout},
  {path: 'userprofile', component: Userprofile },
  {path: 'hoteladminprofile', component: Hoteladminprofile},
  {path: 'adminprofile', component: Adminprofile},
  {path: 'hotel-details/:id', component: HotelDetails},
  {path: 'booking/:id', component: Addbooking},
  {path:'viewallbooking',component:Viewallbooking},
  {path:'bookingalert',component:Bookingalert},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
