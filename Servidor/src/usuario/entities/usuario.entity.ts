import { AutoIncrement, Column, Model, PrimaryKey, Table} from 'sequelize-typescript'

@Table({
    //nombre de la tabla en la bd
    tableName: 'usuario',
    //campo extra q se guarda en la BD
    //cuando se modificó, creó, etc.
    timestamps: false
})
export class Usuario extends Model<Usuario>{
    @PrimaryKey
    @Column
    correo: string;
    @Column
    nombre: string;
    @Column
    apellido: string;
    @Column
    pass: string;
    @Column
    tipousuario: number;   
    @Column({
        allowNull: false,
        defaultValue: 1, //1=pendiente
    })
    estado: number;
}