import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-background">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white border-opacity-30"></div>
    </div>
  );
}
