import React from "react";

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="w-12 h-12 border-4 border-t-transparent border-white animate-spin rounded-full" />
    </div>
  );
}
