import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({description:"full name",type:String})
    name: string;
    @ApiProperty({description:"Email",type:String})
    email: string;
    @ApiProperty({description:"Phone",type:Number})
    phone: string;
    @ApiProperty({description:"Password",type:String})
    password:string;
}
