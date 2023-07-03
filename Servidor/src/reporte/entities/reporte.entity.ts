import { Column, Model, Table } from 'sequelize-typescript';
@Table({ tableName: 'prekpirajo', modelName: 'Reporte', freezeTableName: true })

//Vista PREKPIRAJO
export class Reporte extends Model<Reporte> {
    
  @Column
  rajonombre: string;

  @Column
  fecha: Date;

  @Column
  idfecha: number;

  @Column
  rajoreal: number;

  @Column
  esperadokpi: number;
}