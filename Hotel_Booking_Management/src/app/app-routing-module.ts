import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Viewallhotel } from './hotel/viewallhotel/viewallhotel';
import { Addhotel } from './hotel/addhotel/addhotel';
import { Updatehotel } from './hotel/updatehotel/updatehotel';
import { Viewlocation } from './location/viewlocation/viewlocation';
import { Updatelocation } from './location/updatelocation/updatelocation';
import { Addlocation } from './location/addlocation/addlocation';
import { Addroom } from './room/addroom/addroom';

const routes: Routes = [
  {path: '',component: Viewallhotel},
  {path: 'addhotel', component: Addhotel},
  {path: 'updatehotel/:id',component: Updatehotel},
  {path:'addlocation',component:Addlocation},
  {path: 'viewlocation',component:Viewlocation},
  {path: 'updatelocation/:id',component: Updatelocation},
  {path:'addroom', component: Addroom}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
