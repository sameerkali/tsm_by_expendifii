import type { Coupon, User } from '@/types/session';

export const GUEST_COOKIE = 'tms_guest';
export const GUEST_STORAGE_KEY = 'tms_guest_mode';

const guestCookie = `${GUEST_COOKIE}=1; path=/; max-age=28800; SameSite=Lax`;
const expiredGuestCookie = `${GUEST_COOKIE}=; path=/; max-age=0; SameSite=Lax`;

export function isGuestModeClient(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(GUEST_STORAGE_KEY) === 'true' || document.cookie.includes(`${GUEST_COOKIE}=1`);
}

export function enterGuestMode() {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GUEST_STORAGE_KEY, 'true');
  document.cookie = guestCookie;
}

export function exitGuestMode() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GUEST_STORAGE_KEY);
  document.cookie = expiredGuestCookie;
}

export const guestCoupon: Coupon = {
  _id: 'guest-coupon',
  code: 'DEMO',
  durationDays: 30,
  startDate: '2026-05-01T00:00:00.000Z',
  expiresAt: '2026-05-31T23:59:59.000Z',
  isActive: true,
  isUsed: true,
  isExpired: false,
  usedAt: '2026-05-01T00:00:00.000Z',
  createdAt: '2026-05-01T00:00:00.000Z',
};

export const guestUser: User = {
  id: 'guest-user',
  email: 'guest@expendifii.demo',
  name: 'Guest Demo',
  phone: '9999999999',
  role: 'GUEST',
  isActive: true,
  accountStatus: 'ACTIVE',
  isDeleted: false,
  createdAt: '2026-05-01T00:00:00.000Z',
  company: {
    companyName: 'Expendifii Demo Transport',
    gstin: '27ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    phone: '9999999999',
    email: 'demo@expendifii.com',
    contactPerson: 'Guest Demo',
    grCounter: 13,
    address: {
      fullAddress: 'Demo Yard, Logistics Park',
      city: 'Mumbai',
      district: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    bankDetails: {
      bankName: 'Demo Bank',
      accountHolder: 'Expendifii Demo Transport',
      accountNumber: '000000000000',
      ifscCode: 'DEMO0000001',
    },
  },
  coupons: [guestCoupon],
  _count: {
    coupons: 1,
    customers: 12,
    gRs: 12,
  },
};

export const DEMO_READ_ONLY_MESSAGE = 'Guest demo is read-only. Sign in to create or change records.';
