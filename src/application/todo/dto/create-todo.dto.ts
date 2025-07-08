// Dto используется только в application слое,
// это входные данные для юзкейса, а не для контроллера

import { IsString, Length } from "class-validator";

export class CreateTodoDto {
  @IsString({ message: "Заголовок должен быть строкой." })
  @Length(1, 100, { message: "Заголовок должен быть не меньше 1 и не больше 100 символов" })
  title: string;

  @IsString({ message: "Описание должно быть строкой" })
  @Length(0, 500, { message: "Описание должно быть не меньше 1 и не больше 100 символов" })
  description: string;
}
