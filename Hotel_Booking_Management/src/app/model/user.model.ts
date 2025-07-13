import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";




@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})

export class User {

    id!: string;
    name!: string;
    email!: string;
    password!: string;
    role!: string;
    photo!: string;


}