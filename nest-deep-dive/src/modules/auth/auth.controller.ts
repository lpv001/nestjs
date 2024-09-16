import { Body, Controller, HttpCode, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterRequestDto, RegisterResponseDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import { LoginRequestDto, LoginResponseDto } from "./dto/login.dto";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    @HttpCode(201)
    async register(@Body(ValidationPipe) data: RegisterRequestDto): Promise<RegisterResponseDto>{
        return await this.authService.register(data)
    }

    @Post('/login')
    @HttpCode(200)
    async login(@Body(ValidationPipe) data: LoginRequestDto): Promise<LoginResponseDto>{
        return await this.authService.login(data)
    }

}