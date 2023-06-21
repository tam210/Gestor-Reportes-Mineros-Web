import { HttpException, Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response} from "express";
@Injectable()
export class JwtMiddleware implements NestMiddleware{
    constructor(
        private jwtServices: JwtService
    ){}
    //req: lo que viene del frontend (request)
    //res: lo que responde la api (response)
    use(req: Request, res: Response, next: NextFunction) {
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

            if(!verificarToken) throw new UnauthorizedException('Token no válido (fallo al verificar)');
            //Continúo
            next();
        }catch(error){
            throw new HttpException(error.message, error.status || 500);
        }
    }
}
