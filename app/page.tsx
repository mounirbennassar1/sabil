"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowRightIcon, BookOpenIcon, AcademicCapIcon, UserGroupIcon, ChartBarIcon, PlayIcon, StarIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#23544e] via-[#2a5f58] to-[#0b867a]">
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-lg rotate-45 animate-spin-slow" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/3 rounded-full animate-bounce-slow" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-xl border-b border-white/20 transition-all duration-500 z-50 translate-y-0 opacity-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center transform transition-transform duration-300 hover:scale-105">
                <Image 
                  src="/sabil.png" 
                  alt="SABIL" 
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-white hover:text-white/80 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto text-center transition-all duration-1000 translate-y-0 opacity-100">
            <div className="mb-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <StarIcon className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-white/90 text-sm font-medium">Trusted by 500+ Companies</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-1000 delay-300 translate-y-0 opacity-100">
              Transform Your
              <span className="block bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent animate-gradient">
                Learning Experience
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 translate-y-0 opacity-100">
              Empower your workforce with SABIL's cutting-edge Learning Management System. 
              Create engaging training programs, track progress in real-time, and certify achievements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-700 translate-y-0 opacity-100">
              <Link
                href="/auth/signup"
                className="group bg-white text-[#23544e] hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center hover:scale-105 hover:-translate-y-1"
              >
                Start Learning Today
                <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <button className="group border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center justify-center backdrop-blur-sm">
                <PlayIcon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </button>
            </div>

            {/* Floating Cards */}
            <div className="absolute top-20 left-10 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 animate-float-slow">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">+1,200 Students Online</span>
                </div>
              </div>
            </div>

            <div className="absolute top-40 right-10 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 animate-float-delayed">
                <div className="flex items-center space-x-3">
                  <AcademicCapIcon className="h-6 w-6 text-yellow-400" />
                  <span className="text-white text-sm">95% Completion Rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-20">
              <div className="inline-flex items-center bg-[#23544e]/10 rounded-full px-6 py-2 mb-6">
                <span className="text-[#23544e] text-sm font-semibold">FEATURES</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#23544e] mb-6">
                Everything You Need for
                <span className="block text-[#0b867a]">Employee Excellence</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive platform provides all the tools necessary to create, deliver, 
                and track impactful learning programs for your entire organization.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: BookOpenIcon,
                  title: "Smart Course Library",
                  description: "AI-powered course recommendations with interactive multimedia content and adaptive learning paths.",
                  color: "from-[#23544e] to-[#2a5f58]",
                  delay: "0"
                },
                {
                  icon: ChartBarIcon,
                  title: "Advanced Analytics",
                  description: "Real-time insights and detailed reporting with predictive analytics for optimal learning outcomes.",
                  color: "from-[#0b867a] to-[#0ea572]",
                  delay: "100"
                },
                {
                  icon: AcademicCapIcon,
                  title: "Digital Certificates",
                  description: "Blockchain-verified certificates with social sharing capabilities and professional recognition.",
                  color: "from-[#4f46e5] to-[#7c3aed]",
                  delay: "200"
                },
                {
                  icon: UserGroupIcon,
                  title: "Team Collaboration",
                  description: "Social learning features with peer-to-peer interactions and collaborative project management.",
                  color: "from-[#ef4444] to-[#f97316]",
                  delay: "300"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`group relative p-8 rounded-3xl bg-white shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up`}
                  style={{ animationDelay: `${feature.delay}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#23544e] mb-4 group-hover:text-[#0b867a] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#23544e]/5 to-[#0b867a]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#23544e] to-[#0b867a] relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-xl text-white/80">Join thousands of companies transforming their workforce</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "500+", label: "Companies Trust SABIL", icon: UserGroupIcon },
                { number: "50K+", label: "Employees Trained", icon: AcademicCapIcon },
                { number: "98%", label: "Completion Rate", icon: CheckCircleIcon },
                { number: "24/7", label: "Support Available", icon: StarIcon }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group animate-fade-in-up hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <stat.icon className="h-12 w-12 text-white/80 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 counter" data-target={stat.number}>
                      {stat.number}
                    </div>
                    <div className="text-white/80 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="bg-gradient-to-r from-[#23544e] to-[#0b867a] rounded-3xl p-12 md:p-16 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your
                  <span className="block text-green-200">Learning Culture?</span>
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
                  Join the revolution in employee development. Start your free trial today and see the difference SABIL can make.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    href="/auth/signup"
                    className="group bg-white text-[#23544e] hover:bg-gray-50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-105 hover:-translate-y-1"
                  >
                    Start Free Trial
                    <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">
                    Schedule Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#23544e] text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="hover:scale-105 transition-transform duration-300 inline-block">
                <Image 
                  src="/sabil.png" 
                  alt="SABIL" 
                  width={200}
                  height={60}
                  className="h-16 w-auto mx-auto mb-6"
                />
              </div>
              <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
                Empowering organizations worldwide through innovative learning solutions and cutting-edge technology.
              </p>
              
              <div className="border-t border-white/20 pt-8">
                <div className="text-white/60 text-sm">
                  © 2024 SABIL Learning Management System. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite 1s; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>
    </div>
  )
}
