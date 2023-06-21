import { Column, Model, Table, ForeignKey, BelongsTo, DataType} from 'sequelize-typescript'
import { Usuario } from 'src/usuario/entities/usuario.entity';
@Table({
    //nombre de la tabla en la bd
    tableName: 'solicitud',
    //campo extra q se guarda en la BD
    //cuando se modificó, creó, etc.
    timestamps: false
})
export class Solicitud extends Model<Solicitud>{
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    idsolicitud: number;

    @ForeignKey(() => Usuario)
    @Column({
        allowNull: false,
        field: 'idusuario',
        type: DataType.INTEGER
    })
    idusuario: number;

    @Column({
        allowNull: false,
        defaultValue: 'pendiente',
    })
    estado: boolean;

    @Column({
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    fecha: Date;

    @BelongsTo(() => Usuario)
    usuario: Usuario;

}