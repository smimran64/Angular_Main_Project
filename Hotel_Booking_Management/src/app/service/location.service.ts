import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../model/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseUrl: string = 'http://localhost:3000/location';

 
  constructor(private http: HttpClient) { }

  getAllLocation(): Observable<any> {

    return this.http.get(this.baseUrl);

  }

   saveLocation(l : Location): Observable<any>{


    return this.http.post(this.baseUrl,l);

  }


  deleteLocation(id :string): Observable<any>{


    return this.http.delete(this.baseUrl + '/'+ id);

  }


  getLocationById(id :string, ): Observable<any>{


    return this.http.get(this.baseUrl + '/'+ id);

  }



  updateLocation(id:string,l:Location):Observable<any>{

    return this.http.put(this.baseUrl+'/'+id,l);
   
  }
}
