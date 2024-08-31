import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Artur",
      email: "artur@gmail.com",
      password: "123456",
    },
    mode: "onChange",
  });

  const onSubmit = async (value) => {
    const data = await dispatch(fetchRegister(value));

    if (!data.payload) {
      return alert("Не вдалось зареєструватись!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Створення акаунту
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Вкажіть повне ім'я" })}
          className={styles.field}
          label="Повне ім'я"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Вкажіть пошту" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register("password", { required: "Вкажіть пароль" })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Зареєструватись
        </Button>
      </form>
    </Paper>
  );
};
