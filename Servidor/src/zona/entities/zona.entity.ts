import { Column, Model, Table, ForeignKey, BelongsTo, DataType, PrimaryKey} from 'sequelize-typescript'
import { Rajo } from 'src/rajo/entities/rajo.entity';

@Table({
    //nombre de la tabla en la bd
    tableName: 'zona',
    timestamps: false
})
export class Zona extends Model<Zona>{
    
    @PrimaryKey
    @Column
    idzona: number;
    @ForeignKey(() => Rajo)
    @Column({
        allowNull: false,
        field: 'idrajo',
        type: DataType.INTEGER
    })
    idrajo: number;
    @Column
    nombre: string;

    @BelongsTo(() => Rajo)
    rajo: Rajo;
}