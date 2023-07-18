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
import { RolesGuard } from './roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { FechaModule } from './fecha/fecha.module';
import { ViajeModule } from './viaje/viaje.module';
import { Viaje } from './viaje/entities/viaje.entity';
import { Carguio } from './carguio/entities/carguio.entity';
import { Destino } from './destino/entities/destino.entity';
import { Rajo } from './rajo/entities/rajo.entity';
import { CamionModule } from './camion/camion.module';
import { Camion } from './camion/entities/camion.entity';
import { Flota } from './flota/entities/flota.entity';
import { Fecha } from './fecha/entities/fecha.entity';
import { FlotaModule } from './flota/flota.module';
import { ZonaModule } from './zona/zona.module';
import { Zona } from './zona/entities/zona.entity';
import { Origen } from './origen/entities/origen.entity';


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
      models: [Usuario, Solicitud, Reporte, Viaje, Carguio, Destino, Rajo, Camion, Flota, Fecha, Zona, Origen]
    }),
    UsuarioModule,
    AuthModule,
    SolicitudModule,
    ReporteModule,
    SequelizeModule.forFeature([Reporte]),
    FechaModule,
    ViajeModule,
    CamionModule,
    FlotaModule,
    ZonaModule
    
  ],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_GUARD,
    useClass: RolesGuard
  },],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(JwtMiddleware)
    //que se pueda crear un usuario sin un token
    // .exclude({ path: 'usuario', method: RequestMethod.POST })

    .forRoutes('usuario', 'reporte', 'solicitud');
  }
}
