import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.local.env',}),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type:'postgres',
      host: configService.get('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: configService.get<boolean>("DATABASE_SYNC"),
      logging: configService.get<boolean>("DATABASE_LOGGING"),
      database: configService.get("DATABASE_NAME"), 

    }),
    inject: [ConfigService],
  }),
  UserModule,
  AuthModule,
  MailerModule
  ],
    
  controllers: [],
  providers: [],
})
export class AppModule {}
