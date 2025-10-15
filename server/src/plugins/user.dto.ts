export class UserDto {
    id: string
    email: string

    constructor(model: Record<string, any>) {
        this.id = model._id
        this.email = model.email
    }
}