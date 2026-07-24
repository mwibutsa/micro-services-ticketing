"use client";
import axios from "axios";
import { SyntheticEvent, useCallback, useState } from "react";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = useCallback(
    (e: { target: { name: string; value: string } }) => {
      setCredentials((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [],
  );

  const submitHandler = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const response = await axios.post("/api/users/signup", credentials);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    [credentials],
  );

  return (
    <div className="p-20">
      <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="name@flowbite.com"
            required
            value={credentials.email}
            onChange={onChangeHandler}
            name="email"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="••••••••"
            required
            value={credentials.password}
            onChange={onChangeHandler}
            name="password"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-600 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default SignUp;
