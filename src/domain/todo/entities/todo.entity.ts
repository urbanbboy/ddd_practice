//Сердце DDD - сущность

export class Todo {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public isDone: boolean = false,
    public readonly createdAt: Date = new Date(),
    public updatedAt?: Date
  ) {}

  markAsDone() {
    if(this.isDone) return;
    this.isDone = true;
    this.updatedAt = new Date()
  }

  updateTitle(title: string) {
    this.title = title
    this.updatedAt = new Date()
  }

  updateDescription(descr: string) {
    this.description = descr;
    this.updatedAt = new Date()
  }
}
