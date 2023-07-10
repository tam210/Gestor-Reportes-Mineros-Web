import { HttpException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response} from "express";
import { Usuario } from "src/usuario/entities/usuario.entity";

interface CustomRequest extends Request {
    user?: Usuario;
  }

@Injectable()
export class JwtMiddleware implements NestMiddleware{
    constructor(
        private jwtServices: JwtService
    ){}
    //req: lo que viene del frontend (request)
    //res: lo que responde la api (response)
    use(req: CustomRequest, res: Response, next: NextFunction) {
        try{
            const tokenH = req.headers.authorization;
            //Verificar si el token viene en el header 
            if(!tokenH) throw new UnauthorizedException('Token no válido (header)');
            //Verificar si el token
            if(!tokenH.startsWith('Bearer')) throw new UnauthorizedException('Token no válido (no empieza con bearer)');
            //Accedo al que está a la derecha
            const token = tokenH.split(' ').length ==2 ? tokenH.split(' ')[1] : null
            //Si el token es null
            if(!token) throw new UnauthorizedException('Token no válido (null)');
            const verificarToken = this.jwtServices.verify(token);
            //Si el token finalmente es válido
            if(!verificarToken) throw new UnauthorizedException('Token no válido (fallo al verificar)');


            
            // Verifico los roles del usuario
            // const roles = verificarToken.roles;
            // const requiredRoles = ['admin']; // Roles requeridos para acceder a la ruta (puedes personalizarlo)

            // const hasRequiredRoles = requiredRoles.some((role) => roles.includes(role));
            // if (!hasRequiredRoles) throw new UnauthorizedException('Acceso denegado');


            //Continúo
            next();
        }catch(error){
            throw new HttpException(error.message, error.status || 500);
        }
    }
}
