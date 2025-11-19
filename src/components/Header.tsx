import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Menu, User, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b-4 border-green-600">
      {/* Main Header - White Background */}
      <div className="bg-white">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ImageWithFallback
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/BPJS_Kesehatan_logo.svg/2560px-BPJS_Kesehatan_logo.svg.png"
                alt="BPJS Kesehatan Logo"
                className="h-12 w-auto"
              />
              <div className="border-l-2 border-gray-300 pl-4">
                <h1 className="text-green-700 text-lg">Skrining Kesehatan Mental</h1>
                <p className="text-xs text-gray-600">Program JKN-KIS</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors text-sm">
                Beranda
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors text-sm">
                Layanan
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors text-sm">
                Tentang
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors text-sm">
                Bantuan
              </a>
              <button className="text-gray-700 hover:text-green-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-gray-700 hover:text-green-600 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </nav>
            <button className="md:hidden text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
