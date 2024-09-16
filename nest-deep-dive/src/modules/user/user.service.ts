import { Inject, Injectable, InternalServerErrorException, NotFoundException, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { UserResponseDto } from "./dto/user.dto";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class UserService {
    constructor(
        @Inject(REQUEST) private readonly request,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async getMe(): Promise<UserResponseDto> {
        try {
            const { id } = this.request.user
            const user = await this.userRepository.findOne({ where: { id: id } })
            console.log(this.request.user)
            if (!user) {
                throw new NotFoundException(`User not found`);
            }
            const sanitizedUser = { ...user }
            delete sanitizedUser.createdAt
            delete sanitizedUser.updatedAt
            return {
                success: true,
                data: sanitizedUser
            }
        } catch (error) {
            return {
                success: false,
                errors: [error.message], // Handle specific error scenarios
            };
        }
    }

}