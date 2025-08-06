

export class RoomModel {
    id!: string;
    image!: string;
    roomType!: string;
    totalRooms!: number;    
    adults!: number;
    children!: number;
    price!: number;
    hotelId!: string;  // as room Id  

    bookedRooms!: number;
    availableRooms!: number;
}