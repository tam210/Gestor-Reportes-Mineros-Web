import { Column, Model, Table} from 'sequelize-typescript'

@Table({
    tableName: 'usuario',
    timestamps: false
})
export class Usuario extends Model<Usuario>{
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