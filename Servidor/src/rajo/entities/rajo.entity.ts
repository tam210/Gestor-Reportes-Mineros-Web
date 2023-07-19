import { Column, Model, Table, PrimaryKey} from 'sequelize-typescript'

@Table({
    //nombre de la tabla en la bd
    tableName: 'rajo',
    timestamps: false
})
export class Rajo extends Model<Rajo>{
    
    @PrimaryKey
    @Column
    idrajo: number;
    @Column
    nombre: string;

}