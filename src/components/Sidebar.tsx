"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) {
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-100 dark:bg-gray-800 p-4 transition-width duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        {isOpen && <h2 className="text-2xl font-bold">Navigation</h2>}
        <Button onClick={toggleSidebar} variant="ghost">
          {isOpen ? "<" : ">"}
        </Button>
      </div>
      {isOpen && (
        <nav>
          <ul>
            <li>
              <Link href="/dashboard" className="text-lg hover:text-blue-500">
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}