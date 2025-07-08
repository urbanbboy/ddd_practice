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
    if (this.isDone) return;
    this.isDone = true;
    this.updatedAt = new Date();
  }

  update(title: string, description: string) {
    if (!title || title.length === 0) {
      throw new Error("Title cannot be empty");
    }
    this.title = title;
    this.description = description;
    this.updatedAt = new Date();
  }
}
