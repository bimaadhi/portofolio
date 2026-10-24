import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Upload,
  FileCheck,
  Eye,
  Trash2,
  ExternalLink,
  Plus,
  X,
  Sparkles,
  Calendar,
  CheckCircle2,
  FileText,
  RotateCcw
} from 'lucide-react';
import { ScrollFloat } from './react-bits/ScrollFloat';
import { ShinyText } from './react-bits/ShinyText';
import { FluidGlass } from './react-bits/FluidGlass';
import { INITIAL_CERTIFICATES } from '../data/certificates';

const STORAGE_KEY = 'portfolio_certificates_v7';

export const Certificates = () => {
  const [certificates, setCertificates] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const map = new Map();
        INITIAL_CERTIFICATES.forEach(item => map.set(item.id, item));
        parsed.forEach(item => {
          if (map.has(item.id)) {
            map.set(item.id, { ...map.get(item.id), image: item.image, fileName: item.fileName, fileType: item.fileType });
          } else {
            map.set(item.id, item);
          }
        });
        return Array.from(map.values());
      }

      // Check older storage versions for any uploaded certificate images to preserve them
      const prevSaved = localStorage.getItem('portfolio_certificates_v6') ||
                        localStorage.getItem('portfolio_certificates_v5') ||
                        localStorage.getItem('portfolio_certificates_v4') ||
                        localStorage.getItem('portfolio_certificates_v3') || 
                        localStorage.getItem('portfolio_certificates_v2') || 
                        localStorage.getItem('portfolio_certificates_v1');
      if (prevSaved) {
        const parsed = JSON.parse(prevSaved);
        const userUploads = new Map();
        parsed.forEach(item => {
          if (item.image) {
            userUploads.set(item.id, item);
          }
        });

        return INITIAL_CERTIFICATES.map(item => {
          const match = userUploads.get(item.id) || (item.id === 'lks-kab-wonogiri-2026' ? parsed.find(c => c.id?.includes('lks')) : null);
          if (match && match.image) {
            return {
              ...item,
              image: match.image,
              fileName: match.fileName,
              fileType: match.fileType
            };
          }
          return item;
        });
      }
    } catch (e) {
      console.error('Failed to load certificates from localStorage', e);
    }
    return INITIAL_CERTIFICATES;
  });

  const [previewItem, setPreviewItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadTargetId, setUploadTargetId] = useState(null);
  const [notification, setNotification] = useState(null);

  // New certificate form state
  const [newTitle, setNewTitle] = useState('');
  const [newCompetition, setNewCompetition] = useState('');
  const [newField, setNewField] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());
  const [newBadge, setNewBadge] = useState('1st Place');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);

  const fileInputRef = useRef(null);
  const modalFileInputRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));
    } catch (e) {
      console.warn('Storage quota exceeded or error saving certificates', e);
    }
  }, [certificates]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Handle direct file upload for existing certificate card
  const handleFileUpload = (certId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Maximum file size is 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === certId
            ? { ...c, image: base64Data, fileName: file.name, fileType: file.type }
            : c
        )
      );
      showNotification(`Certificate "${file.name}" uploaded successfully!`);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Trigger file dialog for specific certificate
  const triggerUploadFor = (certId) => {
    setUploadTargetId(certId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Remove uploaded certificate image
  const handleRemoveImage = (certId) => {
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === certId
          ? { ...c, image: null, fileName: null, fileType: null }
          : c
      )
    );
    showNotification('Certificate file removed.');
  };

  // Reset to default data
  const handleResetDefaults = () => {
    if (window.confirm('Reset certificate list to defaults?')) {
      setCertificates(INITIAL_CERTIFICATES);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
      showNotification('Certificates reset to default data.');
    }
  };

  // Handle modal file upload
  const handleModalFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Maximum file size is 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage({
        data: reader.result,
        name: file.name,
        type: file.type
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle create new certificate
  const handleCreateCertificate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Certificate / award title is required.');
      return;
    }

    const newCert = {
      id: `cert-${Date.now()}`,
      title: newTitle.trim(),
      category: 'Honors & Certifications',
      competition: newCompetition.trim() || newTitle.trim(),
      field: newField.trim() || 'Software Engineering',
      issuer: newIssuer.trim() || 'Official Organization',
      year: newYear.trim() || new Date().getFullYear().toString(),
      recipient: 'Bima Adhi Parawangsa',
      badge: newBadge.trim() || 'Certificate',
      description: newDescription.trim() || 'Official certificate awarded for technical expertise and competition excellence.',
      image: newImage ? newImage.data : null,
      fileName: newImage ? newImage.name : null,
      fileType: newImage ? newImage.type : null,
      skills: ['Problem Solving', 'Software Engineering']
    };

    setCertificates((prev) => [newCert, ...prev]);
    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewCompetition('');
    setNewField('');
    setNewIssuer('');
    setNewYear(new Date().getFullYear().toString());
    setNewBadge('1st Place');
    setNewDescription('');
    setNewImage(null);

    showNotification('New certificate added successfully!');
  };

  return (
    <section id="certificates" className="py-24 px-4 relative">
      {/* Hidden file input for card action */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => uploadTargetId && handleFileUpload(uploadTargetId, e)}
        accept="image/*,application/pdf"
        className="hidden"
      />

      {/* Floating Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-900/95 border border-white/10 text-neutral-200 shadow-2xl backdrop-blur-xl text-sm"
          >
            <Sparkles className="w-4 h-4 text-neutral-300 shrink-0" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        {/* Section Heading & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <ScrollFloat>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-3">
                <Award className="w-3.5 h-3.5 text-neutral-400" />
                <span>06 / Honors & Certificates</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Honors & <ShinyText text="Certificates" speed={5} />
              </h2>
              <p className="text-neutral-400 text-sm md:text-base mt-2 max-w-xl">
                Official competency awards, technology competition achievements, and verified certificate credentials.
              </p>
            </ScrollFloat>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 hover:text-white border border-white/10 font-medium text-xs tracking-wide transition-all shadow-lg hover:border-white/20 group"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              <span>Add / Upload Certificate</span>
            </button>

            <button
              onClick={handleResetDefaults}
              title="Reset to defaults"
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-all text-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {certificates.map((cert, idx) => {
            const hasFile = Boolean(cert.image);
            const isPdf = cert.fileType === 'application/pdf' || cert.fileName?.endsWith('.pdf');

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <FluidGlass className="p-6 md:p-7 h-full flex flex-col justify-between group hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                  <div>
                    {/* Top Meta Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-neutral-200 bg-white/[0.05] border border-white/10 shadow-sm">
                          <Award className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{cert.badge}</span>
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400 px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                          {cert.year}
                        </span>
                      </div>

                      {hasFile ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                          <FileCheck className="w-3 h-3" />
                          <span>Document Uploaded</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 bg-white/[0.02] border border-white/[0.06] px-2.5 py-0.5 rounded-full">
                          <span>No Document Yet</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Field */}
                    <h3 className="text-xl font-bold text-white group-hover:text-neutral-200 transition-colors tracking-tight mb-2">
                      {cert.title}
                    </h3>

                    <div className="text-sm font-semibold text-neutral-200 mb-1">
                      Field / Category: <span className="text-neutral-300 font-mono text-xs md:text-sm">{cert.field}</span>
                    </div>

                    <div className="text-xs text-neutral-400 mb-3">
                      Issued By: <span className="text-neutral-300">{cert.issuer}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                      {cert.description}
                    </p>

                    {/* Document Preview Thumbnail if Uploaded */}
                    {hasFile && (
                      <div className="mb-5 rounded-xl overflow-hidden border border-white/10 bg-black/40 relative group/thumb">
                        {isPdf ? (
                          <div className="p-6 flex items-center justify-center gap-3 text-neutral-300">
                            <FileText className="w-8 h-8 text-neutral-400" />
                            <div className="text-left">
                              <div className="text-xs font-semibold text-white">{cert.fileName || 'Certificate Document.pdf'}</div>
                              <div className="text-[10px] text-neutral-400 font-mono">Official PDF Document</div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-44 w-full relative">
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                          </div>
                        )}

                        {/* Quick View Button overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                          <button
                            onClick={() => setPreviewItem(cert)}
                            className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-medium flex items-center gap-2 border border-white/20 shadow-lg"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Certificate</span>
                          </button>
                          <button
                            onClick={() => handleRemoveImage(cert.id)}
                            title="Remove file"
                            className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 backdrop-blur-md"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Skill Tags */}
                    {cert.skills && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {cert.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-white/[0.03] text-neutral-300 border border-white/[0.06]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons Row */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <button
                      onClick={() => triggerUploadFor(cert.id)}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 hover:text-white border border-white/10 text-xs font-mono transition-all group/btn"
                    >
                      <Upload className="w-3.5 h-3.5 text-neutral-400 group-hover/btn:-translate-y-0.5 transition-transform" />
                      <span>{hasFile ? 'Replace File' : 'Upload Certificate'}</span>
                    </button>

                    {hasFile ? (
                      <button
                        onClick={() => setPreviewItem(cert)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-neutral-200 hover:text-white border border-white/15 text-xs font-medium transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    ) : (
                      <div className="text-[11px] font-mono text-neutral-500">
                        JPG / PNG / PDF
                      </div>
                    )}
                  </div>
                </FluidGlass>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal: Fullscreen Document Preview */}
      <AnimatePresence>
        {previewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#121217] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{previewItem.badge} • {previewItem.year}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {previewItem.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {previewItem.field} — {previewItem.issuer}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="my-4 flex-1 overflow-auto flex items-center justify-center bg-black/40 rounded-xl p-3 border border-white/5">
                {previewItem.image ? (
                  previewItem.fileType === 'application/pdf' || previewItem.fileName?.endsWith('.pdf') ? (
                    <iframe
                      src={previewItem.image}
                      title={previewItem.title}
                      className="w-full h-[60vh] rounded-lg border-0"
                    />
                  ) : (
                    <img
                      src={previewItem.image}
                      alt={previewItem.title}
                      className="max-h-[65vh] w-auto object-contain rounded-lg shadow-xl"
                    />
                  )
                ) : (
                  <div className="py-12 text-center text-neutral-500 font-mono text-xs">
                    No certificate image uploaded yet.
                  </div>
                )}
              </div>

              {/* Footer info & Download/Print */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-neutral-400">
                  Recipient: <strong className="text-neutral-200">{previewItem.recipient}</strong>
                </span>

                {previewItem.image && (
                  <a
                    href={previewItem.image}
                    download={previewItem.fileName || `Certificate-${previewItem.title}.png`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Download / Open Document</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Add New Certificate */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full my-8 bg-[#121217] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Add New Certificate</h3>
                    <p className="text-xs text-neutral-400">Add an award, honors, or competency certificate</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCertificate} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Certificate / Award Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1st Place Winner - Wonogiri Regency LKS"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 text-white text-sm outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Competition / Field
                    </label>
                    <input
                      type="text"
                      placeholder="IT Software Solutions for Business"
                      value={newField}
                      onChange={(e) => setNewField(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Award / Rank
                    </label>
                    <input
                      type="text"
                      placeholder="1st Place Winner"
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      placeholder="MKKS SMK Wonogiri Regency / Department of Education"
                      value={newIssuer}
                      onChange={(e) => setNewIssuer(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 text-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                      Year
                    </label>
                    <input
                      type="text"
                      placeholder="2026"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Brief Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe achievements, technical tasks, or tested competencies..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 text-white text-sm outline-none transition-colors resize-none"
                  />
                </div>

                {/* Upload File Input in Modal */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                    Certificate Document (Image / PDF)
                  </label>
                  <div
                    onClick={() => modalFileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/15 hover:border-white/30 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/[0.01] hover:bg-white/[0.03]"
                  >
                    <input
                      type="file"
                      ref={modalFileInputRef}
                      onChange={handleModalFileChange}
                      accept="image/*,application/pdf"
                      className="hidden"
                    />
                    <Upload className="w-6 h-6 text-neutral-400 mx-auto mb-1.5" />
                    {newImage ? (
                      <div className="text-xs text-neutral-200 font-mono">
                        {newImage.name} (Ready to upload)
                      </div>
                    ) : (
                      <div className="text-xs text-neutral-400">
                        Click to select certificate file (PNG, JPG, PDF up to 5MB)
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-neutral-300 text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 font-semibold text-xs transition-all shadow-lg"
                  >
                    Save Certificate
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
