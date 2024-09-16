import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserDto{
    @ApiProperty({ description: 'The user ID' })
    id: string;

    @ApiProperty({ description: 'The user name' })
    username: string;

    @ApiProperty({ description: 'The user password' })
    password: string;
}

export class UserResponseDto{
    @ApiProperty({ description: 'A message indicating success or failure' })
    success: boolean;

    @ApiProperty({ description: 'The data to be returned' })
    data?: UserDto;

    @ApiProperty({ description: 'Error messages if the request failed' })
    errors?: string[];
}

