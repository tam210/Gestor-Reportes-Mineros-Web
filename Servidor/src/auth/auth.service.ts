import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register-user.dto';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
    //Para acceder a las funciones hechas de user
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService)
        {}

    async login(loginDto: LoginDto){
        const { email, password } = loginDto;
        const user = await this.usuarioService.findOneCorreo(email);
        if (!user) return {token: null, user:{validEmail:false, validPassword:false, userType:null}};
        if (user.pass !== password)return{token: null, user:{validEmail:true, validPassword:false, userType:null}};
        if (user.estado !== 2)return{token:null, user:{validEmail:true, validPassword: true, userType:null, userActive:false}};//estados (0: rechazadp, 1: pendiente, 2:aprobado, 3: eliminado)
        const payload = {
            email: user.correo, 
            tipousuario: user.tipousuario
        }
        const userType = user.tipousuario;
        if (userType === 0 || userType === 1){
            return {
                token: this.jwtService.sign(payload), 
                user:{
                    validEmail:true, 
                    validPassword:true, 
                    userType:user.tipousuario
                }
                };
        }
        return {token: null, 
            user:{
                validEmail:true, 
                validPassword:true, 
                userType:user.tipousuario
            }
        }
    }

    async register(registerDto: RegisterDto){
        const { email, password, name, lastName, userType} = registerDto;
        let tipo;
        const user = await this.usuarioService.findOneCorreo(email);
        if (user!==null) return { validEmail: false };
        if (userType === 'Administrador'){
            tipo = 0;
        }else{
            if (userType === 'Usuario'){
                tipo = 1;
            }else{
                return { validEmail: true, validType: false}
            }
        }
        const newUser: CreateUsuarioDto= { correo:email, pass:password, nombre:name, apellido:lastName, tipousuario:tipo };
        return { validEmail: true, validType: true , user:this.usuarioService.create(newUser)};
    }

}
