import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    //Para acceder a las funciones hechas de user
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService)
        {}

    async login(loginDto: LoginDto){
        const { correo, pass } = loginDto;
        const user = await this.usuarioService.findOneCorreo(correo);

        if (!user) return null;

        //validar contraseña 
        //
        //
        ///
        
        const payload = {correo}
        return {
            token: this.jwtService.sign(payload)
        }
    }


}
