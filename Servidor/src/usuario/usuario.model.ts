import { Column, Model, Table} from 'sequelize-typescript'
import { Usuario } from './entities/usuario.entity';

@Table({
    tableName: 'usuario',
    timestamps: false
})
export class UsuarioModel extends Model<UsuarioModel> implements Usuario {
    @Column({
        primaryKey: true
    })
    idusuario: number;
    @Column
    nombre: string;
    @Column
    apellido: string;
    @Column
    correo: string;
    @Column
    pass: string;
    @Column
    tipousuario: number;
}