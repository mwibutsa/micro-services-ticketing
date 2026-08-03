import axios, { AxiosInstance } from "axios";
import { headers } from "next/headers";

const buildClient = async (): Promise<AxiosInstance> => {
  if (typeof window === "undefined") {
    // We are on the server (inside Docker / K8s pod)
    const reqHeaders = await headers();

    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: {
        cookie: reqHeaders.get("cookie") || "",
        host: reqHeaders.get("host") || "ticketing.dev",
      },
    });
  } else {
    // We are on the browser (https://ticketing.dev)
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;

