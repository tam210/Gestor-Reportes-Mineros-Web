import { Column, Model, Table, PrimaryKey} from 'sequelize-typescript'

@Table({
    //nombre de la tabla en la bd
    tableName: 'flota',
    timestamps: false
})
export class Flota extends Model<Flota>{
    
    @PrimaryKey
    @Column
    idflota: number;
    @Column
    nombre: string;

}