"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { ConfigProvider, App as AntdApp } from "antd";

export function AppProviders({ children }) {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
          },
        }}
      >
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ApolloProvider>
  );
}
