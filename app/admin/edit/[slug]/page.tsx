'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PageContent, PageSection, LayoutType, PageVersion } from '@/types'
import { PageRepository } from '@/lib/data/repositories'
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit2,
  Copy,
  Trash2,
  UploadCloud,
  CheckCircle2,
  Clock,
  History,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'

const brandSwatches = [
  { name: 'Warm Ivory', hex: '#FBF6EC' },
  { name: 'Sand Cream', hex: '#F3E7D3' },
  { name: 'Soft Porcelain', hex: '#FFFDF8' },
  { name: 'Heritage Burgundy', hex: '#7A3037' },
  { name: 'Spice Copper', hex: '#B76B43' },
  { name: 'Antique Gold', hex: '#C69A5A' },
  { name: 'Cocoa Brown', hex: '#372722' },
  { name: 'Muted Olive', hex: '#777657' },
]

export default function VisualPageEditor({ params }: { params: { slug: string } }) {
  const [page, setPage] = useState<PageContent | null>(null)
  const [sections, setSections] = useState<PageSection[]>([])
  const [versions, setVersions] = useState<PageVersion[]>([])
  const [editingSection, setEditingSection] = useState<PageSection | null>(null)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'Saved' | 'Saving...'>('Saved')
  const [publishedSuccess, setPublishedSuccess] = useState(false)

  useEffect(() => {
    async function load() {
      const pageData = await PageRepository.getPage(params.slug)
      const vers = await PageRepository.getVersions(params.slug)
      setPage(pageData)
      setSections([...pageData.draftSections])
      setVersions(vers)
    }
    load()
  }, [params.slug])

  // Autosave draft when sections change
  const updateSectionsDraft = async (newSections: PageSection[]) => {
    setSections(newSections)
    setSaveStatus('Saving...')
    await PageRepository.saveDraftSections(params.slug, newSections)
    setTimeout(() => setSaveStatus('Saved'), 400)
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const updated = [...sections]
    const temp = updated[index - 1]
    updated[index - 1] = updated[index]
    updated[index] = temp
    // update order numbers
    updated.forEach((s, idx) => (s.order = idx + 1))
    updateSectionsDraft(updated)
  }

  const handleMoveDown = (index: number) => {
    if (index === sections.length - 1) return
    const updated = [...sections]
    const temp = updated[index + 1]
    updated[index + 1] = updated[index]
    updated[index] = temp
    updated.forEach((s, idx) => (s.order = idx + 1))
    updateSectionsDraft(updated)
  }

  const handleToggleVisible = (id: string) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    updateSectionsDraft(updated)
  }

  const handleDuplicate = (section: PageSection) => {
    const duplicated: PageSection = {
      ...section,
      id: `sec-${Date.now()}`,
      heading: `${section.heading} (Copy)`,
      order: sections.length + 1,
    }
    const updated = [...sections, duplicated]
    updateSectionsDraft(updated)
  }

  const handleDelete = (id: string) => {
    if (confirm('Hide this section from the page?')) {
      const updated = sections.filter((s) => s.id !== id)
      updated.forEach((s, idx) => (s.order = idx + 1))
      updateSectionsDraft(updated)
    }
  }

  const handleSaveSectionModal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSection) return
    const updated = sections.map((s) => (s.id === editingSection.id ? editingSection : s))
    updateSectionsDraft(updated)
    setEditingSection(null)
  }

  const handlePublish = async () => {
    await PageRepository.publishPage(params.slug)
    const vers = await PageRepository.getVersions(params.slug)
    setVersions(vers)
    setIsPublishModalOpen(false)
    setPublishedSuccess(true)
    setTimeout(() => setPublishedSuccess(false), 4000)
  }

  const handleRestoreVersion = async (verNum: number) => {
    await PageRepository.restoreVersion(params.slug, verNum)
    const pageData = await PageRepository.getPage(params.slug)
    setSections([...pageData.draftSections])
    setIsVersionModalOpen(false)
  }

  if (!page) {
    return <div className="p-8 text-center text-xs text-taupe">Loading visual page blocks...</div>
  }

  return (
    <div className="space-y-8">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/edit"
            className="p-2 rounded-xl bg-ivory border border-sand hover:text-burgundy"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-cocoa font-medium">
              Editing {page.title}
            </h1>
            <p className="text-xs text-taupe">
              Organise sections like Lego blocks. Changes are kept in draft until published.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-1 bg-cream rounded-full text-copper flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-botanical animate-pulse" />
            {saveStatus}
          </span>

          <button
            onClick={() => setIsVersionModalOpen(true)}
            className="btn-secondary h-10 px-3.5 text-xs inline-flex items-center gap-1.5"
            title="Version History"
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="btn-secondary h-10 px-3.5 text-xs inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Site</span>
          </Link>

          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="btn-primary h-10 px-5 text-xs justify-center"
          >
            <UploadCloud className="w-4 h-4 text-gold" />
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {publishedSuccess && (
        <div className="p-4 bg-botanical/15 border border-botanical/30 rounded-2xl text-botanical text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Website updated successfully! Live storefront is now reflecting your published draft.</span>
        </div>
      )}

      {/* Sections List (Lego Blocks) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-taupe uppercase tracking-wider font-semibold">
          <span>Active Sections ({sections.length})</span>
          <span>Order & Visibility Controls</span>
        </div>

        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
              section.visible ? 'bg-ivory border-sand hover:border-gold/60' : 'bg-sand/20 border-sand/50 opacity-60'
            }`}
          >
            {/* Left Block Preview */}
            <div className="flex items-center gap-4 min-w-0">
              <span className="font-mono text-xs font-bold w-6 h-6 rounded-full bg-cream flex items-center justify-center text-taupe flex-shrink-0">
                {section.order}
              </span>

              {section.image && (
                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-cream flex-shrink-0 border border-sand">
                  <Image src={section.image} alt={section.heading} fill className="object-cover" />
                </div>
              )}

              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-copper block">
                  {section.type.replace('_', ' ')} • {section.layout.replace('_', ' ')}
                </span>
                <h3 className="font-serif text-lg text-cocoa font-medium truncate">
                  {section.heading}
                </h3>
                <p className="text-xs text-taupe line-clamp-1">
                  {section.body || 'No description body'}
                </p>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              {/* Move Up */}
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="p-2 rounded-xl bg-porcelain border border-sand hover:text-burgundy disabled:opacity-30"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              {/* Move Down */}
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === sections.length - 1}
                className="p-2 rounded-xl bg-porcelain border border-sand hover:text-burgundy disabled:opacity-30"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Visibility Toggle */}
              <button
                onClick={() => handleToggleVisible(section.id)}
                className={`p-2 rounded-xl border ${
                  section.visible
                    ? 'bg-porcelain border-sand text-botanical hover:text-clay'
                    : 'bg-cream text-clay border-sand'
                }`}
                title={section.visible ? 'Hide section' : 'Show section'}
              >
                {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              {/* Edit Details */}
              <button
                onClick={() => setEditingSection(section)}
                className="btn-primary h-9 px-3 text-xs inline-flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              {/* Duplicate */}
              <button
                onClick={() => handleDuplicate(section)}
                className="p-2 rounded-xl bg-porcelain border border-sand hover:text-copper"
                title="Duplicate Block"
              >
                <Copy className="w-4 h-4" />
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(section.id)}
                className="p-2 rounded-xl bg-porcelain border border-sand hover:text-clay"
                title="Delete Section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION EDIT MODAL */}
      {editingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-cocoa/50 backdrop-blur-sm"
            onClick={() => setEditingSection(null)}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] bg-porcelain rounded-3xl border border-sand shadow-2xl p-6 sm:p-8 flex flex-col overflow-y-auto">
            <h2 className="font-serif text-2xl text-cocoa font-medium pb-3 border-b border-sand">
              Edit Section Block
            </h2>

            <form onSubmit={handleSaveSectionModal} className="space-y-4 py-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  required
                  value={editingSection.heading}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, heading: e.target.value })
                  }
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                  Eyebrow / Subheading
                </label>
                <input
                  type="text"
                  value={editingSection.subheading || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, subheading: e.target.value })
                  }
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                  Body Paragraph
                </label>
                <textarea
                  rows={3}
                  value={editingSection.body || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, body: e.target.value })
                  }
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-xs resize-none"
                />
              </div>

              {/* Layout Picker (Layout 1, Layout 2, Layout 3) */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1.5">
                  Approved Layout
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'layout_1', label: 'Layout 1', desc: 'Centered, Image Left' },
                    { id: 'layout_2', label: 'Layout 2', desc: 'Centered, Image Right' },
                    { id: 'layout_3', label: 'Layout 3', desc: '3 Cards Grid' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() =>
                        setEditingSection({ ...editingSection, layout: l.id as LayoutType })
                      }
                      className={`p-3 rounded-xl border text-left transition-all ${
                        editingSection.layout === l.id
                          ? 'bg-cream border-burgundy ring-1 ring-burgundy'
                          : 'bg-ivory border-sand hover:border-copper'
                      }`}
                    >
                      <p className="font-bold text-xs text-cocoa">{l.label}</p>
                      <p className="text-[10px] text-taupe">{l.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Control (ImageKit ready URL) */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                  Visual Image URL (Paste URL or use ImageKit)
                </label>
                <input
                  type="text"
                  value={editingSection.image || ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, image: e.target.value })
                  }
                  placeholder="/images/generated/..."
                  className="w-full p-2.5 bg-ivory border border-sand rounded-xl text-xs font-mono"
                />
              </div>

              {/* Background Colour Swatches */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1.5">
                  Background Colour
                </label>
                <div className="flex flex-wrap gap-2">
                  {brandSwatches.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() =>
                        setEditingSection({
                          ...editingSection,
                          background: { type: 'color', value: swatch.hex },
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] bg-ivory border-sand hover:border-burgundy"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-sand"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span>{swatch.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Button settings */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={editingSection.button?.text || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        button: {
                          visible: true,
                          text: e.target.value,
                          url: editingSection.button?.url || '/shop',
                        },
                      })
                    }
                    className="w-full p-2.5 bg-ivory border border-sand rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                    Button Link URL
                  </label>
                  <input
                    type="text"
                    value={editingSection.button?.url || ''}
                    onChange={(e) =>
                      setEditingSection({
                        ...editingSection,
                        button: {
                          visible: true,
                          text: editingSection.button?.text || 'Explore',
                          url: e.target.value,
                        },
                      })
                    }
                    className="w-full p-2.5 bg-ivory border border-sand rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-sand flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="btn-secondary h-10 px-4 text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary h-10 px-6 text-xs">
                  Save Changes to Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PUBLISH CONFIRMATION MODAL */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-cocoa/50 backdrop-blur-sm"
            onClick={() => setIsPublishModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-porcelain rounded-3xl border border-sand shadow-2xl p-6 sm:p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-cream text-burgundy flex items-center justify-center">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-cocoa">Publish These Changes?</h3>
            <p className="text-xs sm:text-sm text-taupe">
              Publishing will update the live public website and record a new version in your history log.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="btn-secondary h-11 text-xs justify-center"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                className="btn-primary h-11 text-xs justify-center"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VERSION HISTORY MODAL */}
      {isVersionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-cocoa/50 backdrop-blur-sm"
            onClick={() => setIsVersionModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-porcelain rounded-3xl border border-sand shadow-2xl p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-sand">
              <h3 className="font-serif text-xl text-cocoa">Version History</h3>
              <button onClick={() => setIsVersionModalOpen(false)} className="text-xs text-taupe">
                Close
              </button>
            </div>

            <div className="space-y-3">
              {versions.map((ver) => (
                <div
                  key={ver.id}
                  className="p-4 bg-ivory rounded-2xl border border-sand flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-sm text-cocoa">Version #{ver.versionNumber}</p>
                    <p className="text-xs text-taupe">
                      {new Date(ver.createdAt).toLocaleString('en-IN')} by {ver.publishedBy}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRestoreVersion(ver.versionNumber)}
                    className="btn-secondary h-9 px-3 text-xs"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
