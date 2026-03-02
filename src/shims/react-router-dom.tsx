"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
  useParams as useNextParams,
} from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { useCallback, useEffect, useMemo } from "react";

export type NavigateOptions = { replace?: boolean };

export type LinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  to?: string;
  href?: string;
};

export const LinkShim = ({ to, href, ...props }: LinkProps) => {
  const finalHref = href ?? to ?? "";
  return <Link href={finalHref} {...props} />;
};

export { LinkShim as Link };

export const useNavigate = () => {
  const router = useRouter();
  return useCallback(
    (to: string, options?: NavigateOptions) => {
      if (options?.replace) {
        router.replace(to);
        return;
      }
      router.push(to);
    },
    [router],
  );
};

export const useLocation = () => {
  const pathname = usePathname() ?? "/";
  const searchParams = useNextSearchParams();
  const search = searchParams && searchParams.toString() ? `?${searchParams.toString()}` : "";
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  return { pathname, search, hash };
};

export const useParams = <T extends Record<string, string | string[] | undefined>>() => {
  return useNextParams() as T;
};

export const useSearchParams = () => {
  const params = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  const setSearchParams = useCallback((
    next: URLSearchParams | Record<string, string | number | undefined>,
    options?: NavigateOptions,
  ) => {
    let search = "";
    if (next instanceof URLSearchParams) {
      search = next.toString();
    } else {
      const sp = new URLSearchParams();
      Object.entries(next).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        sp.set(key, String(value));
      });
      search = sp.toString();
    }

    const url = `${pathname}${search ? `?${search}` : ""}`;
    if (options?.replace) {
      router.replace(url);
      return;
    }
    router.push(url);
  }, [pathname, router]);

  const stableParams = useMemo(() => params ?? new URLSearchParams(), [params]);

  return [stableParams, setSearchParams] as const;
};

export const Navigate = ({ to, replace }: { to: string; replace?: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
      return;
    }
    router.push(to);
  }, [router, replace, to]);

  return null;
};

export const BrowserRouter = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Routes = ({ children }: { children: ReactNode }) => <>{children}</>;
export const Route = () => null;
