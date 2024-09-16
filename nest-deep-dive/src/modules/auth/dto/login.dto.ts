import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginRequestDto{
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password
}

export class LoginDataDto{
    @ApiProperty({ description: 'The newly created user ID' })
    id: string;

    @ApiProperty({ description: 'The access token for authentication' })
    token: string;
}

export class LoginResponseDto{
    @ApiProperty({ description: 'Indicates whether registration was successful' })
    success: boolean;

    @ApiProperty({ description: 'Registration data' })
    data?: LoginDataDto;

    @ApiProperty({ description: 'Error messages if registration failed' })
    errors?: string[];
}

