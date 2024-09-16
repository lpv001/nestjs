import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory{
    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'nest',
            entities: ["dist/**/*.entity.js"],
            synchronize: true,
            autoLoadEntities: true,
            keepConnectionAlive: true,
            logging: true
        }
    }
    
}


