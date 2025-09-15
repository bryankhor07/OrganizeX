"use client";

import React, { useState, useEffect } from "react";
import {
  CheckSquare,
  Zap,
  ArrowRight,
  Star,
  TrendingUp,
  Smartphone,
  Monitor,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [userCount, setUserCount] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // Redirect user to dashboard page if already signed
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  useEffect(() => {
    setIsVisible(true);
    // Animated counters
    const userInterval = setInterval(() => {
      setUserCount((prev) => (prev < 25000 ? prev + 250 : 25000));
    }, 50);

    const tasksInterval = setInterval(() => {
      setTasksCompleted((prev) => (prev < 1200000 ? prev + 12000 : 1200000));
    }, 50);

    return () => {
      clearInterval(userInterval);
      clearInterval(tasksInterval);
    };
  }, []);

  const features = [
    {
      icon: CheckSquare,
      title: "Visual Task Management",
      description: "Drag-and-drop boards that make complex projects simple",
      benefit: "Save 5+ hours per week",
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description:
        "Built with Next.js 15 for instant loading and smooth interactions",
      benefit: "3x faster than competitors",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Full-featured mobile apps for iOS and Android",
      benefit: "Work from anywhere",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechStart Inc",
      text: "OrganizeX transformed how our team collaborates. We're 40% more productive!",
    },
    {
      name: "Michael Torres",
      company: "Design Studio",
      text: "The visual boards make complex projects feel manageable. Game changer!",
    },
    {
      name: "Emily Watson",
      company: "Marketing Agency",
      text: "We moved from chaos to clarity in just one week. Incredible results.",
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50">
        <Navbar />
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Turn chaos into{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    clarity
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  OrganizeX transforms scattered tasks into visual workflows.
                  Your team will move faster, collaborate better, and achieve
                  more with our intuitive project boards.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <SignUpButton>
                  <Button
                    size="sm"
                    className="flex items-center justify-center px-8 py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Start Free Trial
                  </Button>
                </SignUpButton>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  {tasksCompleted.toLocaleString()}+ tasks completed
                </div>
                <div>No credit card required</div>
                <div>Free 1 board trial</div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                {/* Mobile image */}
                <Image
                  src="/OrganizeXDashboardPageMobile.png"
                  width={100}
                  height={100}
                  alt="OrganizeX Dashboard Page Mobile"
                  className="block sm:hidden w-full h-auto"
                />

                {/* Desktop image */}
                <Image
                  src="/OrganizeXDashboardPage.png"
                  width={750}
                  height={750}
                  alt="OrganizeX Dashboard Page"
                  className="hidden sm:block w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                stay organized
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to help your team collaborate
              seamlessly and achieve more together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="text-sm font-semibold text-blue-600">
                  {feature.benefit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Loved by teams everywhere
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how OrganizeX is transforming the way teams work together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-white mb-6 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-blue-100 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams who've already made the switch to organized,
            efficient project management.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <SignUpButton>
              <Button
                size="sm"
                className="flex items-center justify-center px-8 py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </Button>
            </SignUpButton>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
            <div>✓ 1 board free trial</div>
            <div>✓ No credit card required</div>
            <div>✓ Cancel anytime</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-8 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">OrganizeX</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
              <span>© 2024 OrganizeX. All rights reserved.</span>
              <span>Built with Next.js 15 & Clerk</span>
              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span>Available on all devices</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
