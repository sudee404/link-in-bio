"use client"
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { UserContextProvider } from "@/context/UserContext";

interface ProvidersProps {
  children: ReactNode;
}


const Providers: React.FC<ProvidersProps> = ({ children }) => {
  
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24, // 24 hours
            retry: 0,
          },
        },
      }),
    []
  );

  return (
    <SessionProvider refetchOnWindowFocus={false} refetchWhenOffline={false}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          {children} 
        </UserContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
