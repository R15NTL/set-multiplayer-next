import React, { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";

export default function index() {
  const context = useSocket();
  const { connect, disconnect } = context;

  useEffect(() => {
    console.log(context);
  }, [context]);

  useEffect(() => {
    connect();
  }, []);

  return <div>Please wait...</div>;
}
