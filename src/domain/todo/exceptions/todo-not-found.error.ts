
export class TodoNotFoundError extends Error {
    constructor(id: string) {
        super(`Туду с id ${id} не найден`)
    }
}