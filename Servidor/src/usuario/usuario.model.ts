import { Column, Model, Table} from 'sequelize-typescript'
import { Usuario } from './entities/usuario.entity';

@Table({
    //nombre de la tabla en la bd
    tableName: 'usuario',
    //campo extra q se guarda en la BD
    //cuando se modificó, creó, etc.
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