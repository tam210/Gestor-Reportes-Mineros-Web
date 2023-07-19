import { Column, Model, Table, ForeignKey, BelongsTo, DataType, PrimaryKey} from 'sequelize-typescript'
import { Rajo } from 'src/rajo/entities/rajo.entity';

@Table({
    //nombre de la tabla en la bd
    tableName: 'destino',
    timestamps: false
})
export class Destino extends Model<Destino>{
    
    @PrimaryKey
    @Column
    iddestino: number;
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