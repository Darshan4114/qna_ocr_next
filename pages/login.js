import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
} from "firebase/auth";
import nookies from "nookies";
import { firebaseAdmin } from "../firebase/adminApp";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

import app from "../firebase/clientApp";
import Header from "../components/Header";
import { toastOptions } from "../components/constants";
import Logo from "../components/Logo";

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    if (token) {
      ctx.res.writeHead(302, { Location: "/" });
      ctx.res.end();
      return {
        props: {},
      };
    } else {
      return {
        props: {
          loginRedirectPath: ctx.params.loginRedirectPath,
        },
      };
    }
  } catch (err) {
    // either the `token` cookie didn't exist or token verification failed either way: redirect to the login page
    return {
      props: {},
    };
  }
};
const auth = getAuth(app);

function resendVerificationMail() {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    // Requires https
    url: "https://localhost:3000/",
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.example.ios",
    },
    android: {
      packageName: "com.example.android",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "babydojolocal.page.link",
  };
  sendSignInLinkToEmail(
    auth,
    window.localStorage.getItem("email"),
    actionCodeSettings
  )
    .then(() => {
      const email = window.localStorage.getItem("email");
      toast.success(
        `Resent verification mail, please check your inbox ${email}`,
        toastOptions
      );
    })
    .catch((error) => {
      toast.error(`Error during sending sign in link ${error}`, toastOptions);
    });
}

const ResendVerificationMessage = ({ resendVerificationMail, email }) => {
  window.localStorage.setItem("email", email);
  return (
    <div>
      Please verify your email address. Verification mail sent to {email}
      <p>
        Didn&apos;t get the mail?
        <span>
          <button onClick={resendVerificationMail}> RESEND </button>
        </span>
      </p>
    </div>
  );
};

export default function Login({ loginRedirectPath }) {
  //Instantiating router
  const router = useRouter();
  //Hook for storing user in local storage

  //Instantiating form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    //Signing in
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        //signing out if email not verified
        if (!user.emailVerified) {
          toast.error(
            <ResendVerificationMessage
              email={user.email}
              resendVerificationMail={resendVerificationMail}
            />,
            toastOptions
          );
          signOut(auth)
            .then(() => {
              router.push("/login");
            })
            .catch((error) => {
              toast.error(`Error during logout ${error}`, toastOptions);
            });
          return;
        }
        //Logged in successfully
        toast.success(`Logged in as ${user.displayName}`, toastOptions);
        //Redirecting after login
        if (loginRedirectPath) {
          router.push(loginRedirectPath);
        } else {
          router.push("/");
        }
      })
      .catch((error) => {
        //Handling login errors
        const errorCode = error.code;
        //ERROR: wrong password
        if (errorCode === "auth/wrong-password") {
          toast.error(`Invalid Password ${error.message}`, toastOptions);
        }
        //ERROR: user not found
        if (errorCode === "auth/user-not-found") {
          toast.error(`User does not exist ${error.message}`, toastOptions);
        }
      });
  }

  return (
    <Container>
      <div className="logo">
        <Logo />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login </h1>
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
          <InputLabel htmlFor="info">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && "Password is required"}
        </FormControl>
        <FormControl margin="normal">
          <button type="submit" value="submit">
            Login
          </button>
        </FormControl>
      </Form>
      <p style={{ textAlign: "center", marginBottom: "0.25em" }}>
        Don&apos;t have an account{" "}
        <span
          style={{ textDecoration: "underline", color: "var(--brand-color)" }}
        >
          <Link href="/register"> Register </Link>
        </span>
      </p>
      <p style={{ textAlign: "center", marginBottom: "0.25em" }}>
        Forgot Password{" "}
        <span
          style={{ textDecoration: "underline", color: "var(--brand-color)" }}
        >
          <Link href="/forgot-password"> Reset password </Link>
        </span>
      </p>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;

  .logo {
    width: 170px;
    margin: 9em auto 0;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  padding: 1em;
  margin: 1em auto 1em auto;
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
