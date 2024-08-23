import { body } from "express-validator";

export const loginValidation = [
  body("email", "Невірний формат пошти").isEmail(),
  body("password", "Пароль повинен містити мінімум 5 символів").isLength({
    min: 5,
  }),
];

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

export const postCreateValidation = [
  body("title", "Введіть заголовок статті").isLength({ min: 3 }).isString(),
  body("text", "Введіть текст статті").isLength({ min: 3 }).isString(),
  body("tags", "Невірний формат тегів").optional().isString(),
  body("imageURL", "Невірне посилання на зображення").optional().isString(),
];
