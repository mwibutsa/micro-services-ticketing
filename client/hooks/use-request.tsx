import axios, { Method } from "axios";
import { useState, JSX } from "react";

interface RequestError {
  message: string;
  field?: string;
}

interface UseRequestOptions<T> {
  url: string;
  method: Method | "get" | "post" | "put" | "delete" | "patch";
  body?: Record<string, unknown>;
  onSuccess?: (data: T) => void;
}

interface UseRequestResult<T> {
  doRequest: () => Promise<T | undefined>;
  errors: JSX.Element | null;
}

export default <T = unknown>({
  url,
  method,
  body,
  onSuccess,
}: UseRequestOptions<T>): UseRequestResult<T> => {
  const [errors, setErrors] = useState<JSX.Element | null>(null);

  const doRequest = async (): Promise<T | undefined> => {
    try {
      setErrors(null);
      const response = await axios.request<T>({
        url,
        method,
        data: body,
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.errors) {
        const errorList: RequestError[] = err.response.data.errors;
        setErrors(
          <div className="mb-4 rounded-md bg-red-50 p-4 border border-red-200">
            <h4 className="text-sm font-semibold text-red-800 mb-2">Ooops....</h4>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {errorList.map((e) => (
                <li key={e.message}>{e.message}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        setErrors(
          <div className="mb-4 rounded-md bg-red-50 p-4 border border-red-200">
            <h4 className="text-sm font-semibold text-red-800">Ooops....</h4>
            <p className="text-sm text-red-700 mt-1">Something went wrong.</p>
          </div>
        );
      }
    }
  };

  return { doRequest, errors };
};
