"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import {
  ArrowLeft,
  ArrowRight,
  Filter,
  MoreHorizontal,
  CheckSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

interface Props {
  boardTitle?: string;
  onEditBoard?: () => void;
  onFilterClick?: () => void;
  filterCount?: number;
}

export default function Navbar({
  boardTitle,
  onEditBoard,
  onFilterClick,
  filterCount = 0,
}: Props) {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();

  const isDashboardPage = pathname === "/dashboard";
  const isBoardPage = pathname.startsWith("/boards/");

  // Logo Component for consistency
  const Logo = ({ size = "default" }: { size?: "default" | "small" }) => (
    <div className="flex items-center space-x-3">
      <div
        className={`${
          size === "small" ? "w-8 h-8" : "w-10 h-10"
        } bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center`}
      >
        <CheckSquare
          className={`${size === "small" ? "h-4 w-4" : "h-6 w-6"} text-white`}
        />
      </div>
      <span
        className={`${
          size === "small" ? "text-lg" : "text-xl sm:text-2xl"
        } font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
      >
        OrganizeX
      </span>
    </div>
  );

  // Dashboard Page Navbar
  if (isDashboardPage) {
    return (
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <Logo />

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Welcome,{" "}
                {user?.firstName || user?.emailAddresses[0].emailAddress}
              </span>
            </div>
            <div className="relative">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 ring-2 ring-blue-200 hover:ring-blue-300 transition-all duration-200",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Board Page Navbar
  if (isBoardPage) {
    return (
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
              {/* Back Button */}
              <Link
                href="/dashboard"
                className="group flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-blue-600 flex-shrink-0 transition-colors duration-200"
              >
                <div className="p-1.5 rounded-lg group-hover:bg-blue-50 transition-colors duration-200">
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="hidden sm:inline font-medium">Dashboard</span>
                <span className="sm:hidden font-medium">Back</span>
              </Link>

              {/* Separator */}
              <div className="h-4 sm:h-6 w-px bg-gray-200 hidden sm:block" />

              {/* Board Title */}
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                <Logo size="small" />
                <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                    {boardTitle}
                  </h1>
                  {onEditBoard && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 flex-shrink-0 p-0 hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                      onClick={onEditBoard}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {onFilterClick && (
                <Button
                  variant={filterCount > 0 ? "default" : "outline"}
                  size="sm"
                  className={`text-xs sm:text-sm transition-all duration-200 ${
                    filterCount > 0
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                      : "hover:bg-blue-50 hover:border-blue-200"
                  }`}
                  onClick={onFilterClick}
                >
                  <Filter className="h-3 w-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Filter</span>
                  {filterCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-xs ml-1 sm:ml-2 bg-white/20 text-white border-white/20"
                    >
                      {filterCount}
                    </Badge>
                  )}
                </Button>
              )}

              <div className="relative">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-9 h-9 ring-2 ring-blue-200 hover:ring-blue-300 transition-all duration-200",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Landing Page Navbar
  return (
    <header className="border-b border-gray-100 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <Logo />

        <div className="flex items-center space-x-2 sm:space-x-4">
          {isSignedIn ? (
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Welcome Message */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Welcome,{" "}
                  {user?.firstName ||
                    user?.emailAddresses[0].emailAddress.split("@")[0]}
                </span>
              </div>

              {/* Dashboard Button */}
              <Link href="/dashboard">
                <Button
                  size="sm"
                  className="text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Dashboard
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>

              <div className="relative">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-9 h-9 ring-2 ring-blue-200 hover:ring-blue-300 transition-all duration-200",
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <SignInButton>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs sm:text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  size="sm"
                  className="text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Free Trial
                </Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
