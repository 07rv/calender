import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, SignInResponse } from "next-auth/react";

const SignIn = () => {
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const [errorField, setErrorField] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputHandler = (name: string, value: any) => {
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorField((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  const setErrorMessage = (name: string, value: any) => {
    setErrorField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkAndSetValidationsErrors = () => {
    var hasError = false;
    Object.keys(inputField).map((field) => {
      if (field === "email") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter emailId");
        }
      } else if (field === "password") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter password");
        }
      }
    });
    return hasError;
  };

  const submitButton = async () => {
    setIsLoading(true);
    if (!checkAndSetValidationsErrors()) {
      const status = (await signIn("credentials", {
        redirect: false,
        email: inputField.email,
        password: inputField.password,
        callbackUrl: "/home",
      })) as SignInResponse;
      if (status.ok) {
        setIsLoading(false);
        if (status.url) {
          router.push(status.url);
        }
      } else {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Sign In to your account
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={`focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm`}
                placeholder="user@gmail.com"
                defaultValue={inputField.email}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.email && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.email}</small>
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="focus:ring-blue-600 focus:border-blue-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                defaultValue={inputField.password}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.password && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.password}</small>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-blue-600 dark:text-blue-500 text-sm font-medium hover:underline cursor-pointer">
                Forgot password?
              </div>
            </div>
            <button
              disabled={isLoading}
              onClick={submitButton}
              className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              {isLoading ? "Signing in.." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
