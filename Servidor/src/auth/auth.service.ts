import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsuarioService,
        private jwtService: JwtService
    ){}

    async login(LoginUserDto: LoginDto) {
        const { email, password } = LoginUserDto;

        const user = await this.userService.findOneEmail(email);
        if(user.pass !== password) throw new UnauthorizedException();
        
        const payload = { email };

        return {
            token: this.jwtService.sign(payload)
        }
    }
}
