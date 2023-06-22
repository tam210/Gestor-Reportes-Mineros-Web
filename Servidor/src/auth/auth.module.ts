import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env.dev'
    }),
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d'}
    })
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
