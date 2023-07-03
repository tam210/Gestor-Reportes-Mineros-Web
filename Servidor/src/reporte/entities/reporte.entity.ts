import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'prekpirajo',
 modelName: 'Reporte', 
 freezeTableName: true })
export class Reporte extends Model {
  @Column({ type: DataType.STRING })
  rajonombre: string;

  @Column({ type: DataType.DATE })
  fecha: Date;

  @Column({ type: DataType.INTEGER })
  idfecha: number;

  @Column({ type: DataType.INTEGER })
  rajoreal: number;

  @Column({ type: DataType.INTEGER })
  esperadokpi: number;
}
