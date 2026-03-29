import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt'; // JwtService ke liye JwtModule zaroori hai
import { PassportModule } from '@nestjs/passport';

// Controllers aur Services
import { BlogController } from './blog/blog.controller';
import { BlogService } from './blog/blog.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';

// Entities
import { BlogPost } from './blog/entities/blog.entity';
import { User } from './user/entities/user.entity';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    // 1. Environment Variables setup [cite: 28]
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Database Connection (MSSQL)
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 1433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [BlogPost, User],
      synchronize: true,
      options: {
        encrypt: false,
      },
      extra: {
        trustServerCertificate: true,
      },
    }),

    TypeOrmModule.forFeature([BlogPost, User]),

    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    BlogController, AuthController
  ],
  providers: [
    BlogService,
    AuthService,
    JwtStrategy
  ],
})
export class AppModule { }