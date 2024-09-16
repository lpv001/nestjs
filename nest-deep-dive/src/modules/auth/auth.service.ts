import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterRequestDto, RegisterResponseDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { LoginRequestDto, LoginResponseDto } from "./dto/login.dto";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterRequestDto): Promise<RegisterResponseDto> {
        try {
            registerDto.password = await bcrypt.hash(registerDto.password, 10)
            const user = await this.authRepository.save(this.authRepository.create(registerDto))
            const token = await this.jwtService.sign({ userId: user.id })
            delete user.password
            return {
                success: true,
                data: {
                    ...user,
                    token,
                }
            };
        } catch (error) {
            return {
                success: false,
                errors: [error.message], // Handle specific error scenarios
            };
        }
    }

    async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
        try {
            const { username, password } = loginDto
            const user = await this.authRepository.findOne({ where: { username: username } })

            if( !user ) {
                throw new UnauthorizedException('Invalid email or password')
            }
            const isPasswordMatched = await bcrypt.compare(password, user.password)
            if (!isPasswordMatched) {
                throw new UnauthorizedException('Invalid password')
            }
            const token = this.jwtService.sign({ id: user.id })
            return {
                success: true,
                data: {
                    id: user.id,
                    token: token
                }
            }
        } catch (error) {
            return {
                success: false,
                errors: [error.message], // Handle specific error scenarios
            };
        }
    }
}