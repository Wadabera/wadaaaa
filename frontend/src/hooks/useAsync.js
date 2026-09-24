import { useCallback, useEffect, useState } from "react";

export function useAsync(task, deps = [], immediate = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError("");
      try {
        const result = await task(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message || "Something went wrong");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  useEffect(() => {
    if (immediate) run().catch(() => {});
  }, [immediate, run]);

  return { data, setData, error, loading, run };
}
