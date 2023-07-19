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
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        type: DataType.UUID
    })
    idsolicitud: string;

    @ForeignKey(() => Usuario)
    @Column({
        allowNull: false,
        field: 'idusuario',
        type: DataType.UUID
    })
    idusuario: string;

    @Column({
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    fecha: Date;

    @BelongsTo(() => Usuario)
    usuario: Usuario;
}