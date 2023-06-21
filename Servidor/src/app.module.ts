import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from './usuario/entities/usuario.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env.dev'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host:process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [Usuario]
    }),
    UsuarioModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
