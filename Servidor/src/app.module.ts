import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModel } from './usuario/usuario.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env.dev'
    }),
//de toda la conexión a BD, solo se tendrá acceso
//a UsuarioModel
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host:process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [UsuarioModel]
    }),
    UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
