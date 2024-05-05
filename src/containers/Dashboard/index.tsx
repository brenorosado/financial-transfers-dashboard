"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

export const Dashboard = () => {
  const [showOptions, setShowOptions] = useState<boolean>(true);

  return (
    <>
      <Sidebar showOptions={showOptions} setShowOptions={setShowOptions} />
    </>
  );
};
