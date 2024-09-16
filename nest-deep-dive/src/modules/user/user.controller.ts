import { Controller, Get, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResponseDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";


@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController{
    constructor(private userService: UserService){}

    @Get('/me')
    async getMe(): Promise<UserResponseDto>{
        return this.userService.getMe()
    }
}