import { Column, Model, Table, ForeignKey, BelongsTo, DataType, PrimaryKey} from 'sequelize-typescript'
import { Camion } from 'src/camion/entities/camion.entity';
import { Carguio } from 'src/carguio/entities/carguio.entity';
import { Destino } from 'src/destino/entities/destino.entity';
import { Flota } from 'src/flota/entities/flota.entity';
import { Origen } from 'src/origen/entities/origen.entity';

@Table({
    //nombre de la tabla en la bd
    tableName: 'viaje',
    timestamps: false
})
export class Viaje extends Model<Viaje>{
    
    @PrimaryKey
    @Column
    idviaje: number;

    @ForeignKey(() => Carguio)
    @Column({
        allowNull: false,
        field: 'idcarguio',
        type: DataType.INTEGER
    })
    idcarguio: number;

    @ForeignKey(() => Camion)
    @Column({
        allowNull: false,
        field: 'idfecha',
        type: DataType.DATE
    })
    idfecha: Date;


    @ForeignKey(() => Camion)
    @Column({
        allowNull: false,
        field: 'idcamion',
        type: DataType.INTEGER
    })
    idcamion: number;

    @ForeignKey(() => Origen)
    @Column({
        allowNull: false,
        field: 'idorigen',
        type: DataType.INTEGER
    })
    idorigen: number;

    @ForeignKey(() => Destino)
    @Column({
        allowNull: false,
        field: 'iddestino',
        type: DataType.INTEGER
    })
    iddestino: number;

    @Column
    ciclos: number

    @Column
    tonelaje: number

    @Column
    tonelajereal: number
    
    @Column
    material: string;


    @BelongsTo(() => Carguio, 'idcarguio')
    carguio: Carguio;

    @BelongsTo(() => Carguio, 'idcamion')
    camion: Camion;

    @BelongsTo(() => Carguio, 'idorigen')
    origen: Origen;

    @BelongsTo(() => Destino, 'iddestino')
    destino: Destino;

}