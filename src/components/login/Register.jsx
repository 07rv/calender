import { useState } from "react";
import { createUser } from "../../../db/eventactions";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();
  const [inputField, setInputField] = useState({
    email: "",
    name: "",
    password: "",
    confirmPasword: "",
  });
  const [errorField, setErrorField] = useState({
    email: "",
    name: "",

    password: "",
    confirmPasword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputHandler = (name, value) => {
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorField((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  const setErrorMessage = (name, value) => {
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
      } else if (field === "name") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter Name");
        }
      } else if (field === "password") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter password");
        }
      } else if (field === "confirmPasword") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter confirm Pasword");
        } else if (inputField[field] !== inputField.password) {
          hasError = true;
          setErrorMessage(field, "Password & Confirm password should match");
        }
      }
    });
    return hasError;
  };

  const submitButton = async () => {
    setIsLoading(true);
    if (!checkAndSetValidationsErrors()) {
      const response = await createUser({
        name: inputField.name,
        password: inputField.password,
        email: inputField.email,
      });
      if (response.success) {
        ///to do
        router.push("/home");
        window.alert("user created");
      } else {
        window.alert(response.error);
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Sign Up to your account
          </h1>
          <div className="space-y-4 md:space-y-6" action="#">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                placeholder="email@gmail.com"
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
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                defaultValue={inputField.name}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.name && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.name}</small>
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
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                defaultValue={inputField.password}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.password && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.password}</small>
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Confirm Pasword
              </label>
              <input
                type="password"
                name="confirmPasword"
                id="confirmPasword"
                placeholder="••••••••"
                className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                defaultValue={inputField.confirmPasword}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
              />
              {errorField && errorField.confirmPasword && (
                <div className="mt-1 text-red-600">
                  <small>{errorField.confirmPasword}</small>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div
                onClick={() => {
                  setOpenForgetPassword(true);
                }}
                className="text-blue-600 dark:text-blue-500 text-sm font-medium hover:underline cursor-pointer"
              >
                Forgot password?
              </div>
            </div>
            <button
              disabled={isLoading}
              onClick={submitButton}
              className="bg-blue-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              {isLoading ? "loading..." : "Sign Up"}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                href="#"
                className="text-blue-600 dark:text-primary-500 font-medium hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
