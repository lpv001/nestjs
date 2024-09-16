import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class RegisterRequestDto{
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password
}

export class RegisterDataDto{
    @ApiProperty({ description: 'The newly created user ID' })
    id: string;

    @ApiProperty({ description: 'The newly created user name' })
    username: string;

    @ApiProperty({ description: 'The access token for authentication' })
    token: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export class RegisterResponseDto{
    @ApiProperty({ description: 'Indicates whether registration was successful' })
    success: boolean;

    @ApiProperty({ description: 'Registration data' })
    data?: RegisterDataDto;

    @ApiProperty({ description: 'Error messages if registration failed' })
    errors?: string[];
}

