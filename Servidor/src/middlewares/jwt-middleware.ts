import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction,Request, Response } from "express";

@Injectable()
export class JwtMiddleware implements NestMiddleware{

    constructor(private jwtServices: JwtService){}
    use(req: Request, res: Response, next: NextFunction) {
        try{

        }catch(error){
            //throw new Error("Method not implemented.");
        }
    }
}