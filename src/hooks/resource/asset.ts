import { useCallback, useEffect, useRef, useState } from "react";

export type FetchStatus = "none" | "loading" | "done" | "canceled";

export const useAsset = <T extends any>(
  name: string,
  parse = (data: any) => data as T
) => {
  const [data, setData] = useState<T | null>(null);
  const status = useRef<FetchStatus>("none");
  const controller = useRef(new AbortController());

  const cancel = useCallback(() => {
    status.current = "canceled";
    controller.current.abort();
  }, []);

  useEffect(() => {
    if (status.current === "none") {
      status.current = "loading";
      fetch(`/frontiers/assets/json/${name}.json`, {
        method: "GET",
        signal: controller.current.signal,
      })
        .then((data) => data.json())
        .then((data) => {
          status.current = "done";
          setData(parse({ ...data }));
        });
    }
  }, [name, parse]);

  return { data, status: status.current, cancel };
};
