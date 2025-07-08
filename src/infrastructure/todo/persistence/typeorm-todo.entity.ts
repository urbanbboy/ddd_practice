import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("todos")
export class TypeOrmTodoEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isDone: boolean;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt?: Date;
}
