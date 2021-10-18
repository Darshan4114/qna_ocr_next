import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebase/clientApp";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

import Logo from "../components/Logo";
import { toastOptions } from "../components/constants";

const auth = getAuth(app);

export default function ForgotPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //Sending password reset email
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toast.success(
          `Sent password reset mail to ${data.email}`,
          toastOptions
        );
        router.push("/login");
      })
      .catch((error) => {
        //Handling login errors
        const errorCode = error.code;
        //ERROR: user not found
        if (errorCode === "auth/user-not-found") {
          toast.error(
            `This email is not registered ${data.email} - ${error.message}`,
            toastOptions
          );
        }
      });
  };

  return (
    <>
      <Logo />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Reset Password</h1>
        <FormControl margin="normal">
          <InputLabel htmlFor="name">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && "Email is required"}
        </FormControl>
        <FormControl margin="normal">
          <button type="submit" value="submit">
            Send Password Reset Mail
          </button>
        </FormControl>
      </Form>
      <p style={{ textAlign: "center", marginBottom: "0.25em" }}>
        Remembered your password?{" "}
        <span
          style={{ textDecoration: "underline", color: "var(--brand-color)" }}
        >
          <Link href="/login">
            <a>Login</a>
          </Link>
        </span>
      </p>
      <p style={{ textAlign: "center", marginBottom: "0.25em" }}>
        Don't have an account?{" "}
        <span
          style={{ textDecoration: "underline", color: "var(--brand-color)" }}
        >
          <Link href="/register">
            <a>Register</a>
          </Link>
        </span>
      </p>
    </>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  padding: 1em;
  margin: 5em auto 1em auto;
  border-radius: 0.5em;
  text-align: center;
  h1 {
    font-size: 1.25rem;
  }
  button {
    background: var(--theme-primary);
    padding: 0.5em 0;
    font-size: 1.25rem;
    color: var(--theme-white);
    border: none;
    border-radius: 0.25em;
  }
`;
