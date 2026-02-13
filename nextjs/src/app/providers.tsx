"use client";
import { ChakraProviders } from "../providers/Chakra";
import { LangProvider } from "@/providers/Lang";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProviders>
      <LangProvider>{children}</LangProvider>
    </ChakraProviders>
  );
}