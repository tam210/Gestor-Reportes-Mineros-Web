import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Usuario } from './usuario/entities/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './middlewares/jwt-middleware';
import { SolicitudModule } from './solicitud/solicitud.module';
import { Solicitud } from './solicitud/entities/solicitud.entity';
import { ReporteController } from './reporte/reporte.controller';
import { ReporteModule } from './reporte/reporte.module';
import { Reporte } from './reporte/entities/reporte.entity';
import sequelize from 'sequelize';
import { ReporteService } from './reporte/reporte.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env.dev'
    }),
//de toda la conexión a BD, solo se tendrá acceso
//a los modelos especificadps
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host:process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [Usuario, Solicitud, Reporte]
    }),
    UsuarioModule,
    AuthModule,
    SolicitudModule,
    ReporteModule,
    SequelizeModule.forFeature([Reporte])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    // consumer
    // .apply(JwtMiddleware)
    // //que se pueda crear un usuario sin un token
    // .exclude({ path: 'usuario', method: RequestMethod.POST })
    // .forRoutes('usuario');
  }
}
