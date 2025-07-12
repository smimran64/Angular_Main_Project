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
import { Addroom } from './room/addroom/addroom';
import { Viewallroom } from './room/viewallroom/viewallroom';
import { Updateroom } from './room/updateroom/updateroom';
import { Login } from './auth/login/login';
import { Logout } from './auth/logout/logout';
import { Registrationform } from './auth/registrationform/registrationform';
import { Userprofile } from './profile/userprofile/userprofile';
import { Adminprofile } from './profile/adminprofile/adminprofile';


@NgModule({
  declarations: [
    App,
    Viewallhotel,
    Addhotel,
    Updatehotel,
    Addlocation,
    Viewlocation,
    Updatelocation,
    Addroom,
    Viewallroom,
    Updateroom,
    Login,
    Logout,
    Registrationform,
    Userprofile,
    Adminprofile
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch()
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
