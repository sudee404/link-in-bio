import Loader from "@/components/ui/loader";
import { UserContextType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const UserContextContext = createContext<UserContextType>({});

export function UserContextProvider({ children }: { children: any }) {
  const { data: session ,status} = useSession();

  const { data: { user } = {}, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () =>
      await axios.get("/api/auth/profile").then((res) => res?.data),
    enabled: !!session,
  });

  if(isLoading){
    return <Loader/>
  }

  return (
    <UserContextContext.Provider value={{ user }}>
      {children}
    </UserContextContext.Provider>
  );
}
