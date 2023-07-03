import { Column, Model, Table, PrimaryKey} from 'sequelize-typescript'

@Table({
    //nombre de la tabla en la bd
    tableName: 'carguio',
    timestamps: false
})
export class Carguio extends Model<Carguio>{
    
    @PrimaryKey
    @Column
    idcarguio: number;
    @Column
    nombre: string;

}