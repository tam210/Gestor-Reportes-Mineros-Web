import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [UsuarioModule, 
    JwtModule.register({
      global: true,
      secret: 'ABC',
      signOptions:{
        expiresIn: '60s'
      }, 
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
