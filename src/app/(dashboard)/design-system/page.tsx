'use client';

import React, { useState } from 'react';
import {
  Check, X, AlertTriangle, Info, ChevronDown, Search, Loader2,
  Eye, EyeOff, Upload, CheckSquare, Square, Star
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

import {
  inputClass, Input, Textarea, Select, PasswordInput, SearchInput, Button, Badge, Alert,
  Card, CardHeader, CardBody, Spinner, Skeleton, Toggle, Checkbox, Slider, FileUpload,
  Modal, SectionLabel, PageHeading
} from '@/components/ui';

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM PAGE (Interactive Demo)
// ─────────────────────────────────────────────────────────────────────────────
export default function DesignSystemPage() {
  const [textVal, setTextVal] = useState('');
  const [selectVal, setSelectVal] = useState('option_a');
  const [toggleVal, setToggleVal] = useState(false);
  const [checkVal, setCheckVal] = useState(false);
  const [sliderVal, setSliderVal] = useState(40);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-16">
      <PageHeading label="COMPONENT LIBRARY" title="Design System" count="TMS v1" />

      {/* ── Color Tokens ── */}
      <Section title="Color Tokens">
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'Emerald 500', cls: 'bg-emerald-500' },
            { name: 'Slate 900', cls: 'bg-slate-900' },
            { name: 'Slate 100', cls: 'bg-slate-100 border border-slate-200' },
            { name: 'Blue 500', cls: 'bg-blue-500' },
            { name: 'Yellow 400', cls: 'bg-yellow-400' },
            { name: 'Red 500', cls: 'bg-red-500' },
          ].map((c) => (
            <div key={c.name} className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
              <div className={cn('h-6 w-6 rounded-lg', c.cls)} />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{c.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography">
        <div className="space-y-4">
          <p className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase italic">SECTION LABEL — 10px / black / tracked</p>
          <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-white">Page Heading — 4xl extrabold</h1>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Section Title — 2xl black</h2>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sub-heading — lg bold</h3>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Body text — sm medium, slate-600</p>
          <p className="text-xs font-bold text-slate-400">Secondary text — xs bold, slate-400</p>
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Mono label — 10px mono</p>
        </div>
      </Section>

      {/* ── Inputs ── */}
      <Section title="Form Inputs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Text Input" placeholder="Enter value..." hint="Optional hint" value={textVal} onChange={(e) => setTextVal(e.target.value)} />
          <Input label="With Error" placeholder="Enter email..." error="This field is required." />
          <PasswordInput label="Password" placeholder="Enter password..." required />
          <SearchInput placeholder="Search GR records..." />
          <Select label="Dropdown" options={[{ value: 'option_a', label: 'Option A' }, { value: 'option_b', label: 'Option B' }, { value: 'option_c', label: 'Option C' }]} value={selectVal} onChange={setSelectVal} />
          <Textarea label="Textarea" placeholder="Enter long text..." rows={3} />
        </div>
      </Section>

      {/* ── Buttons ── */}
      <Section title="Buttons">
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" loading={loading} onClick={simulateLoading}>
            {loading ? 'Loading...' : 'Simulate Load'}
          </Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </Section>

      {/* ── Badges ── */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="success">Delivered</Badge>
          <Badge variant="warning">In Transit</Badge>
          <Badge variant="error">Failed</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </Section>

      {/* ── Alerts ── */}
      <Section title="Alerts">
        <div className="space-y-4">
          <Alert variant="info" title="Information">This is an informational alert message.</Alert>
          <Alert variant="success" title="Success">Your GR record has been saved successfully.</Alert>
          <Alert variant="warning" title="Warning">Your account subscription is expiring in 5 days.</Alert>
          <Alert variant="error" title="Error">Failed to connect to the server. Please try again.</Alert>
        </div>
      </Section>

      {/* ── Interactive Controls ── */}
      <Section title="Controls">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Toggle checked={toggleVal} onChange={setToggleVal} label={toggleVal ? 'Enabled' : 'Disabled'} />
            <Checkbox checked={checkVal} onChange={setCheckVal} label="I agree to the terms" />
            <Slider label="Rate Slider" value={sliderVal} onChange={setSliderVal} min={0} max={100} />
          </div>
          <FileUpload label="Logo Upload" accept="image/*" hint="PNG or JPG. Max 2MB." />
        </div>
      </Section>

      {/* ── Cards ── */}
      <Section title="Cards">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Card Title" subtitle="Optional subtitle text" action={<Badge variant="success">Active</Badge>} />
            <CardBody><p className="text-sm text-slate-500">Card body content goes here. Use this for any grouped content or form sections.</p></CardBody>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader title="Dark Card" subtitle="For stats or callouts" />
            <CardBody><p className="text-2xl font-black text-white tracking-tighter italic">₹ 4.2L</p><p className="text-xs text-slate-400 mt-1">Revenue MTD</p></CardBody>
          </Card>
        </div>
      </Section>

      {/* ── Skeletons ── */}
      <Section title="Loading States">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-12 w-full mt-2" />
          </div>
          <div className="flex items-center justify-center h-32 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex flex-col items-center gap-2">
              <Spinner size={32} />
              <p className="text-xs font-bold text-slate-400">Loading data...</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Modal ── */}
      <Section title="Modal / Dialog">
        <Button variant="primary" onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm Action"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setModalOpen(false)}>Confirm Delete</Button>
            </>
          }
        >
          <Alert variant="warning" title="Are you sure?">
            This action cannot be undone. The selected GR record will be permanently deleted.
          </Alert>
        </Modal>
      </Section>
    </div>
  );
}

// ── Internal helper ──
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">{title}</h2>
        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
      </div>
      {children}
    </div>
  );
}
