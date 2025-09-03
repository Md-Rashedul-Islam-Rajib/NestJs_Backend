import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  post: parseInt(process.env.DATABASE_PORT || '5432', 10),
  user: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  name: process.env.DATABASE_NAME || 'nestdb',
  synchronize: process.env.DATABASE_SYNC === 'true' ? true : false,
  autoLoadEntites: process.env.DATABASE_AUTOLOAD === 'true' ? true : false,
}));