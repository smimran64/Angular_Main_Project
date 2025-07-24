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
import { AllGuard } from './guards/all-guard';
import { AdminGuard } from './guards/admin-guard';
import { HotelAdminGuard } from './guards/hoteladmin-guard';
import { UserGuard } from './guards/user-guard';
import { AdminHotelAdminGuard } from './guards/adminhoteladmin-guard';
import { AboutHotelBookingSystem } from './layout/about-hotel-booking-system/about-hotel-booking-system';
import { ViewAllUsers } from './view-all-users/view-all-users';





const routes: Routes = [
  {path: 'home',component: Home, canActivate:[AllGuard]},

  {path: 'viewhotel',component: Viewallhotel, canActivate:[AdminHotelAdminGuard]},
  {path: 'addhotel', component: Addhotel, canActivate:[HotelAdminGuard]},
  {path: 'updatehotel/:id',component: Updatehotel, canActivate:[HotelAdminGuard]},

  {path:'addlocation',component:Addlocation, canActivate:[AdminGuard]},
  {path: 'viewlocation',component:Viewlocation, canActivate:[AdminGuard]},
  {path: 'updatelocation/:id',component: Updatelocation, canActivate:[AdminGuard]},

  {path:'addroom', component: Addroom , canActivate:[HotelAdminGuard]},
  {path: 'roomview', component: Viewallroom , canActivate:[AdminHotelAdminGuard]},
  {path: 'updateroom/:id', component:Updateroom , canActivate:[HotelAdminGuard]},  

  {path: 'reg', component: Registrationform},
  {path: 'login', component: Login},
  {path: 'logout', component: Logout},

  {path: 'userprofile', component: Userprofile, canActivate:[UserGuard]},
  {path: 'hoteladminprofile', component: Hoteladminprofile, canActivate:[HotelAdminGuard]},
  {path: 'adminprofile', component: Adminprofile, canActivate:[AdminGuard]},

  {path: 'hotel-details/:id', component: HotelDetails},
  {path: 'booking/:id', component: Addbooking},
  {path:'viewallbooking',component:Viewallbooking, canActivate:[AdminGuard]},

  {path:'bookingalert',component:Bookingalert, canActivate:[AdminGuard]},
  {path:'',component:AboutHotelBookingSystem},
  {path:'viewallusers',component:ViewAllUsers,canActivate:[AdminGuard] }
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
