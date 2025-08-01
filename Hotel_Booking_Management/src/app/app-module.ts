import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Viewallhotel } from './hotel/viewallhotel/viewallhotel';
import { Addhotel } from './hotel/addhotel/addhotel';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Updatehotel } from './hotel/updatehotel/updatehotel';
import { Addlocation } from './location/addlocation/addlocation';
import { Viewlocation } from './location/viewlocation/viewlocation';
import { Updatelocation } from './location/updatelocation/updatelocation';

import { Login } from './auth/login/login';
import { Logout } from './auth/logout/logout';
import { Registrationform } from './auth/registrationform/registrationform';
import { Userprofile } from './profile/userprofile/userprofile';
import { Adminprofile } from './profile/adminprofile/adminprofile';
import { Addroom } from './room/addroom/addroom';

import { Home } from './home/home';
import { HotelDetails } from './hotel/hotel-details/hotel-details';
import { Addbooking } from './booking/addbooking/addbooking';
import { Viewallbooking } from './booking/viewallbooking/viewallbooking';
import { Updateroom } from './room/updateroom/updateroom';
import { Bookingalert } from './booking/bookingalert/bookingalert';
import { Hoteladminprofile } from './profile/hoteladminprofile/hoteladminprofile';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { AboutHotelBookingSystem } from './layout/about-hotel-booking-system/about-hotel-booking-system';
import { ViewAllUsers } from './view-all-users/view-all-users';
import { Viewallroom } from './room/viewallroom/viewallroom';
import { Viewallroomforhoteladmin } from './room/viewallroomforhoteladmin/viewallroomforhoteladmin';
import { HotelBasicInfo } from './hotelCridentials/hotel-basic-info/hotel-basic-info';
import { ViewhotelbasicInfo } from './hotelCridentials/viewhotelbasic-info/viewhotelbasic-info';
import { UpdateHotelBasicInfo } from './hotelCridentials/update-hotel-basic-info/update-hotel-basic-info';
import { AddFacilities } from './hotelFacilities/add-facilities/add-facilities';
import { Viewfacilities } from './hotelFacilities/viewfacilities/viewfacilities';
import { UpdateFacilities } from './hotelFacilities/update-facilities/update-facilities';
import { AddHotelMedia } from './hotelMedia/add-hotel-media/add-hotel-media';
import { ViewHotelMedia } from './hotelMedia/view-hotel-media/view-hotel-media';
import { UpdateHotelMedia } from './hotelMedia/update-hotel-media/update-hotel-media';



@NgModule({
  declarations: [
    App,
    Viewallhotel,
    Addhotel,
    Updatehotel,
    Addlocation,
    Viewlocation,
    Updatelocation,

    Login,
    Logout,
    Registrationform,
    Userprofile,
    Adminprofile,
    Addroom,
    Viewallroom,

    Home,
    HotelDetails,
    Addbooking,
    Viewallbooking,
    Updateroom,
    Bookingalert,
    Hoteladminprofile,

    Navbar,
    Footer,
    AboutHotelBookingSystem,
    ViewAllUsers,
    HotelBasicInfo,
    ViewhotelbasicInfo,
    UpdateHotelBasicInfo,
    AddFacilities,
    Viewfacilities,
    UpdateFacilities,
    AddHotelMedia,
    ViewHotelMedia,
    UpdateHotelMedia
    
 
   



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
     Viewallroomforhoteladmin,
    

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch()
    ),

  ],
  bootstrap: [App]
})
export class AppModule { }