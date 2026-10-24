import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  MessageSquare,
  ExternalLink,
  MessageCircle,
  Video,
  Info
} from 'lucide-react';
import { IconGithub, IconLinkedin, IconInstagram } from './SocialIcons';
import { ScrollFloat } from './react-bits/ScrollFloat';
import { ShinyText } from './react-bits/ShinyText';
import { FluidGlass } from './react-bits/FluidGlass';
import { SpecularButton } from './react-bits/SpecularButton';
import { SOCIAL_LINKS, CONTACT_CONFIG } from '../data/socialLinks';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submittedNotice, setSubmittedNotice] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.message.trim()) errs.message = 'Message cannot be empty';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmittedNotice(true);
    }
  };

  const handleMailtoDirect = () => {
    const subject = encodeURIComponent(`Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(`Hi Bima,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${SOCIAL_LINKS.EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
  };

  const socialButtons = [
    { name: 'WhatsApp', href: SOCIAL_LINKS.WHATSAPP_URL, icon: MessageCircle },
    { name: 'GitHub', href: SOCIAL_LINKS.GITHUB_URL, icon: IconGithub },
    { name: 'LinkedIn', href: SOCIAL_LINKS.LINKEDIN_URL, icon: IconLinkedin },
    { name: 'Instagram', href: SOCIAL_LINKS.INSTAGRAM_URL, icon: IconInstagram },
    { name: 'TikTok', href: SOCIAL_LINKS.TIKTOK_URL, icon: Video },
    { name: 'Email', href: `mailto:${SOCIAL_LINKS.EMAIL_ADDRESS}`, icon: Mail },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-14">
          <ScrollFloat>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-3">
              <span>06 / Collaboration</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Let's Build <ShinyText text="Together" speed={5} />
            </h2>
            <p className="text-neutral-400 text-sm md:text-base mt-2 max-w-lg">
              {CONTACT_CONFIG.description}
            </p>
          </ScrollFloat>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-5">
            <FluidGlass className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Direct Contact</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Available for freelance projects, software engineering roles, and open collaborative explorations.
                </p>
              </div>

              {/* Email Direct */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <span className="text-[11px] font-mono text-neutral-400 uppercase">Primary Email</span>
                <a
                  href={`mailto:${SOCIAL_LINKS.EMAIL_ADDRESS}`}
                  className="block text-sm font-mono font-medium text-white hover:text-neutral-300 transition-colors truncate"
                >
                  {SOCIAL_LINKS.EMAIL_ADDRESS}
                </a>
              </div>

              {/* Social Channels */}
              <div>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block mb-2.5">
                  Social Channels:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {socialButtons.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 flex items-center justify-between text-xs font-medium text-neutral-300 hover:text-white transition-all group"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
                          <span>{social.name}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Location Card */}
              <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-neutral-400 flex items-center justify-between">
                <span>{CONTACT_CONFIG.location}</span>
                <span className="text-emerald-400">● Available</span>
              </div>
            </FluidGlass>
          </div>

          {/* Contact Interactive Form */}
          <div className="lg:col-span-7">
            <FluidGlass className="p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-neutral-400" />
                <span>Send a Direct Inquiry</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border ${
                      errors.name ? 'border-red-500/50' : 'border-white/10'
                    } focus:border-white/30 focus:outline-none text-white placeholder-neutral-600 text-sm font-medium transition-all`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border ${
                      errors.email ? 'border-red-500/50' : 'border-white/10'
                    } focus:border-white/30 focus:outline-none text-white placeholder-neutral-600 text-sm font-medium transition-all`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, ideas, or questions..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-black/40 border ${
                      errors.message ? 'border-red-500/50' : 'border-white/10'
                    } focus:border-white/30 focus:outline-none text-white placeholder-neutral-600 text-sm font-medium transition-all resize-none`}
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                {submittedNotice && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-200 space-y-2"
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <Info className="w-4 h-4 text-neutral-300" />
                      <span>Form Ready for Backend Integration</span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">
                      Validasi input berhasil. Untuk pengiriman nyata, buka klien email langsung:
                    </p>
                    <SpecularButton
                      onClick={handleMailtoDirect}
                      variant="primary"
                      className="px-4 py-2 text-xs font-mono"
                    >
                      <span>Open in Mail Client ({SOCIAL_LINKS.EMAIL_ADDRESS})</span>
                    </SpecularButton>
                  </motion.div>
                )}

                <SpecularButton
                  type="submit"
                  variant="primary"
                  className="w-full py-3 text-xs font-semibold mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </SpecularButton>
              </form>
            </FluidGlass>
          </div>

        </div>

      </div>
    </section>
  );
};
