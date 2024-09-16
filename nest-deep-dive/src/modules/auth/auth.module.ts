import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JWT_EXPIRES, JWT_SECRET } from "src/environment";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        // JwtModule.register({
        //     secret: 'abc123',
        //     signOptions: {expiresIn: '1h'}
        // })
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: () => {
                return {
                    secret: JWT_SECRET,
                    signOptions: {
                        expiresIn: JWT_EXPIRES,
                    },
                };
            },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }