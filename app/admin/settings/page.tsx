'use client'

import React, { useState, useEffect } from 'react'
import { SiteSettings } from '@/types'
import { SettingsRepository } from '@/lib/data/repositories'
import { Settings, Check, CheckCircle2 } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    SettingsRepository.getSettings().then(setSettings)
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return
    setSaving(true)
    await SettingsRepository.updateSettings(settings)
    setSaving(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  if (!settings) return <div className="p-8 text-xs text-taupe">Loading settings...</div>

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-16">
      <div className="pb-6 border-b border-sand">
        <h1 className="font-serif text-3xl sm:text-4xl text-cocoa">Store Settings</h1>
        <p className="text-xs sm:text-sm text-taupe mt-1">
          Configure official company details, helpline numbers, and announcement bar.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-botanical/15 border border-botanical/30 rounded-xl text-botanical text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-ivory p-6 sm:p-8 rounded-3xl border border-sand space-y-6">
        {/* Business Identity */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl text-cocoa font-medium pb-2 border-b border-sand">
            Business Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Business Name
              </label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                FSSAI License Number
              </label>
              <input
                type="text"
                value={settings.fssaiNumber || ''}
                onChange={(e) => setSettings({ ...settings, fssaiNumber: e.target.value })}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
              Registered Dispatch Facility Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Facility Latitude
              </label>
              <input
                type="number"
                step="any"
                value={settings.coordinates.lat}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    coordinates: { ...settings.coordinates, lat: parseFloat(e.target.value) },
                  })
                }
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Facility Longitude
              </label>
              <input
                type="number"
                step="any"
                value={settings.coordinates.lng}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    coordinates: { ...settings.coordinates, lng: parseFloat(e.target.value) },
                  })
                }
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Contact Helpline */}
        <div className="space-y-4 pt-4 border-t border-sand">
          <h2 className="font-serif text-xl text-cocoa font-medium pb-2 border-b border-sand">
            Helpline & WhatsApp
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Helpline Phone
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Customer Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="space-y-4 pt-4 border-t border-sand">
          <h2 className="font-serif text-xl text-cocoa font-medium pb-2 border-b border-sand">
            Storefront Announcement Bar
          </h2>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="annBarEnabled"
              checked={settings.announcementBar.enabled}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBar: { ...settings.announcementBar, enabled: e.target.checked },
                })
              }
              className="accent-burgundy"
            />
            <label htmlFor="annBarEnabled" className="text-xs font-semibold text-cocoa cursor-pointer">
              Enable Announcement Bar at top of website
            </label>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
              Announcement Copy
            </label>
            <input
              type="text"
              value={settings.announcementBar.text}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  announcementBar: { ...settings.announcementBar, text: e.target.value },
                })
              }
              className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-sand flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary text-sm px-8 h-11">
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
