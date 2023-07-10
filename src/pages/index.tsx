import React from "react";
// Layout
import MainLayout from "../layouts/mainLayout/MainLayout";

Index.getLayout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default function Index() {
  return <div>index</div>;
}
