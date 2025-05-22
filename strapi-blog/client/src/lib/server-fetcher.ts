import fetch from "node-fetch";
export const fetcher = <T>(...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json() as Promise<T>);
