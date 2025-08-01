

export interface HotelCredentials {
  id: string;
  hotelId: string;
  OwnerInfo:string;
  description: string;
  hotelPolicy: string;
  facilities:{
    [key: string]: boolean;
    FreeWifi: boolean;
    FreeParking: boolean;
    SwimmingPool: boolean;
    Gym: boolean;
    Restaurant: boolean;
    RoomService: boolean;
    AirConditioning: boolean;
    LaundryService: boolean;
    WheelchairAccessible: boolean;
    healthServices: boolean;
  }
  
}
