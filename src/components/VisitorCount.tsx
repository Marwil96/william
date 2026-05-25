import { useEffect, useState } from "react";

const ENDPOINT =
  "https://williammartinsson.goatcounter.com/counter/TOTAL.json";

export const VisitorCount = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(ENDPOINT)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const n = Number(String(data.count).replace(/[^\d]/g, ""));
        if (Number.isFinite(n)) setCount(n);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <>
      <span className="tabular-nums">{count.toLocaleString()} visits</span>
      <span aria-hidden className="text-gray-700">·</span>
    </>
  );
};
