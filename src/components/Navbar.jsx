import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ElectricLogo } from './react-bits/ElectricLogo';
import { SpecularButton } from './react-bits/SpecularButton';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:py-5 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-5xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-[#0f0f13]/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand / Logo */}
        <a href="#home" className="flex items-center gap-2 focus:outline-none">
          <ElectricLogo />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-3.5 py-1.5 text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all duration-150"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Quick Contact CTA */}
        <div className="hidden md:flex items-center gap-3">
          <SpecularButton
            href="#contact"
            variant="glass"
            className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider"
          >
            <span>Let's Talk</span>
          </SpecularButton>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-xl bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 inset-x-4 p-5 rounded-2xl bg-[#121216]/98 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-2 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:bg-white/5 hover:text-white flex items-center justify-between transition-colors"
              >
                <span>{item.name}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </a>
            ))}
            <div className="pt-2 border-t border-white/10">
              <SpecularButton
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                variant="primary"
                className="w-full py-2.5 text-xs"
              >
                Get in Touch
              </SpecularButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
