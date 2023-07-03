import { Column, Model, Table, ForeignKey, BelongsTo, DataType, PrimaryKey} from 'sequelize-typescript'
import { Flota } from 'src/flota/entities/flota.entity';

@Table({
    //nombre de la tabla en la bd
    tableName: 'camion',
    timestamps: false
})
export class Camion extends Model<Camion>{
    
    @PrimaryKey
    @Column
    idcamion: number;
    @ForeignKey(() => Flota)
    @Column({
        allowNull: false,
        field: 'idflota',
        type: DataType.INTEGER
    })
    idflota: number;
    @Column
    patente: string;
    @BelongsTo(() => Flota)
    flota: Flota;
}