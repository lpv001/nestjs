import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt"
import { User } from "src/entities/user.entity";
import { JWT_SECRET } from "src/environment";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET
        })
    }

    async validate(payload: any): Promise<User> {
        const { userId } = payload
        const user = await this.userRepository.findOne({ where: { id: userId } })
        if (!user) {
            throw new UnauthorizedException('Login first to access this endpoint.')
        }
        return user
    }
}