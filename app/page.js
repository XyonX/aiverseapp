"use client";
import { useState } from "react";
import {
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PhotoIcon,
  MusicalNoteIcon,
  CommandLineIcon,
  SparklesIcon,
  InformationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: "AI-Powered Bots",
      description:
        "Conversational AI companions with unique personalities and expertise",
      icon: CommandLineIcon,
    },
    {
      title: "Multimedia Sharing",
      description:
        "Send files, images, audio messages and more in your conversations",
      icon: PhotoIcon,
    },
    {
      title: "Smart Responses",
      description:
        "AI-generated response suggestions to keep conversations flowing",
      icon: ChatBubbleLeftRightIcon,
    },
    {
      title: "Cross-Platform",
      description: "Seamless sync across mobile, web, and desktop applications",
      icon: PaperAirplaneIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-purple-50/95 backdrop-blur-lg border-b border-purple-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Desktop Left Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="flex items-center space-x-2 text-purple-700 hover:text-rose-600 transition-colors duration-300 font-medium"
              >
                <SparklesIcon className="h-5 w-5" />
                <span>Features</span>
              </a>
              <a
                href="#about"
                className="flex items-center space-x-2 text-purple-700 hover:text-rose-600 transition-colors duration-300 font-medium"
              >
                <InformationCircleIcon className="h-5 w-5" />
                <span>About</span>
              </a>
            </div>

            {/* Centered Logo */}
            <div className="flex-shrink-0 mx-4 group">
              <span className="bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-3xl font-bold text-transparent transition-transform duration-300 group-hover:scale-105">
                AIVERSE
              </span>
            </div>

            {/* Desktop Right CTA */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/chat"
                className="relative group bg-gradient-to-r from-purple-600 to-rose-500 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-purple-200 hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRightIcon className="h-5 w-5" />
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-7 w-7 text-rose-600" />
              ) : (
                <Bars3Icon className="h-7 w-7 text-purple-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute w-full bg-purple-50/95 backdrop-blur-lg border-b border-purple-100 shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-4 py-6 space-y-8 flex flex-col items-center">
            <a
              href="#features"
              className="flex items-center space-x-2 text-purple-700 hover:text-rose-600 transition-colors duration-300 text-lg font-medium"
            >
              <SparklesIcon className="h-5 w-5" />
              <span>Features</span>
            </a>
            <a
              href="#about"
              className="flex items-center space-x-2 text-purple-700 hover:text-rose-600 transition-colors duration-300 text-lg font-medium"
            >
              <InformationCircleIcon className="h-5 w-5" />
              <span>About</span>
            </a>
            <a
              href="/chat"
              className="bg-gradient-to-r from-purple-600 to-rose-500 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-purple-200 w-full text-center flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Chat with the <span className="text-indigo-600">Future</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Welcome to Aiverse - where your contacts are AI-powered
              companions. Experience messaging enhanced with artificial
              intelligence, multimedia sharing, and smart conversation features.
            </p>
            <div className="flex space-x-4">
              <a
                href="/chat"
                className="bg-indigo-600 text-white px-8 py-4 rounded-full hover:bg-indigo-700 flex items-center"
              >
                Start Chatting
                <ChevronRightIcon className="h-5 w-5 ml-2" />
              </a>
              <a
                href="#features"
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full hover:bg-indigo-50"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Chat Preview */}
          <div className="md:w-1/2 lg:pl-16">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <CommandLineIcon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-2xl max-w-[70%]">
                    <p className="text-gray-900">
                      Hi! I'm your AI companion. How can I help you today?
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-end">
                  <div className="bg-indigo-600 text-white p-3 rounded-2xl max-w-[70%]">
                    <p>Can you help me plan a trip?</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-2xl max-w-[70%]">
                    <p className="text-gray-900">
                      Absolutely! I can help with travel planning, bookings, and
                      recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center bg-gray-50 rounded-lg p-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent outline-none"
                />
                <div className="flex space-x-2 ml-4">
                  <button className="text-gray-500 hover:text-indigo-600">
                    <PhotoIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-indigo-600">
                    <MusicalNoteIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need for modern AI-powered communication
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-indigo-600 mb-6" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">AIVERSE</h4>
              <p className="text-gray-400">
                Redefining communication through AI-powered interactions
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-indigo-400">
                  Twitter
                </a>
                <a href="#" className="hover:text-indigo-400">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-indigo-400">
                  Blog
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} AIVERSE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
