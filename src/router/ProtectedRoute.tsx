import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import React from 'react';
import type { RootState } from "../store/store";
export default function ProtectedRoute({children}: {children: React.ReactNode}) {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);


  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
