"use client";
import { ReactNode } from "react";

export const Tooltip = ({ 
  content, 
  children 
}: { 
  content: string; 
  children: ReactNode;
}) => (
  <div className="group relative">
    {children}
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 
                    bg-gray-900 dark:bg-gray-800 text-white text-xs rounded
                    opacity-0 group-hover:opacity-100 transition-opacity">
      {content}
    </div>
  </div>
); 