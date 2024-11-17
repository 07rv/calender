import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { signIn, SignInResponse } from "next-auth/react";

interface RegisterProps {
  setOpenTab: Dispatch<SetStateAction<number>>;
}

const Login: React.FC<RegisterProps> = ({ setOpenTab }) => {
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
  const inputHandler = (name: string, value: string) => {
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorField((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  const setErrorMessage = (name: string, value: string) => {
    setErrorField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkAndSetValidationsErrors = () => {
    let hasError = false;
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

        <button
          disabled={isLoading}
          onClick={submitButton}
          className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
        >
          {isLoading ? "Signing in.." : "Sign In"}
        </button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpenTab(1);
            }}
            className="text-blue-600 dark:text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
