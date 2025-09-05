/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export async function dropDatabase(config: ConfigService): Promise<void>{

    const AppDataSource = new DataSource({
        type: 'postgres',
        autoLoadEntities: config.get('database.autoLoadEntities'), // automatically load entities
        synchronize: config.get('database.synchronize'),
        database: config.get<string>('database.name'),
        username: config.get<string>('database.user'),
        password: config.get<string>('database.password'),
        host: config.get<string>('database.host'),
        port: parseInt(
            config.get<string>('DATABASE_PORT') || '5432',
            10
        ),
    })
 
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
}