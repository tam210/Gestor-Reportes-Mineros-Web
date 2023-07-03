import { Column, Model, Table, ForeignKey, BelongsTo, DataType, PrimaryKey} from 'sequelize-typescript'
import { Zona } from 'src/zona/entities/zona.entity';

@Table({
    //nombre de la tabla en la bd
    tableName: 'origen',
    timestamps: false
})
export class Origen extends Model<Origen>{
    
    @PrimaryKey
    @Column
    idorigen: number;
    @ForeignKey(() => Zona)
    @Column({
        allowNull: false,
        field: 'idzona',
        type: DataType.INTEGER
    })
    idzona: number;
    @Column
    nombre: string;

    @BelongsTo(() => Zona)
    zona: Zona;
}