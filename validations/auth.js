import { body } from "express-validator";

export const registerValidation = [
  body("email", "Невірний формат пошти").isEmail(),
  body("password", "Пароль повинен містити мінімум 5 символів").isLength({
    min: 5,
  }),
  body("fullName", "Ім'я повинно містити мінімум 3 символи").isLength({
    min: 3,
  }),
  body("avatarUrl", "Невірне посилання на аватарку").optional().isURL(),
];
