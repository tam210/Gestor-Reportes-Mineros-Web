import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript'

@Table({
    //nombre de la tabla en la bd
    tableName: 'fecha',
    //campo extra q se guarda en la BD
    //cuando se modificó, creó, etc.
    timestamps: false
})
export class Fecha extends Model<Fecha>{
    @Column({
        primaryKey: true,
      })
    idfecha: string;
    @Column
    fecha: Date;
}