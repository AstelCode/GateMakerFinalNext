"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(searchParams.get("q") ?? "");
  }, [pathname]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }

      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);
  if (pathname.includes("explore/mod/") || pathname.includes("explore/pack/"))
    return null;

  return (
    <Input
      defaultValue={searchParams.get("q") ?? ""}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}
