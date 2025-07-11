

export class RoomModel {
    id!: string;
    image!: string;
    roomtype!: string;
    adults!: number;
    children!: number;
    price!: number;
    hotel!: {
        id: string;
        name: string;
    };
}