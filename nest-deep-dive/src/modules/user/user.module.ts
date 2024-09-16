import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule{}