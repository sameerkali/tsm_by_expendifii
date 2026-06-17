'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { RegisterInput } from '@/lib/validations/auth.schema';

export type PincodeStatus = 'idle' | 'loading' | 'success' | 'error';

interface PostOffice {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
}

interface PincodeApiResponse {
  Status: string;
  PostOffice: PostOffice[] | null;
}

interface UsePincodeAutofillReturn {
  status: PincodeStatus;
  errorMessage: string;
  localityOptions: string[];
  /** Call this when a locality is selected to populate District + State */
  selectLocality: (name: string) => void;
  /** Call this to clear all autofilled values (e.g. on pincode clear) */
  clearAutofill: () => void;
  /** Currently resolved District (from API) */
  resolvedDistrict: string;
  /** Currently resolved State (from API) */
  resolvedState: string;
}

export function usePincodeAutofill(
  pincode: string,
  setValue: UseFormSetValue<RegisterInput>
): UsePincodeAutofillReturn {
  const [status, setStatus] = useState<PincodeStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);
  const [resolvedDistrict, setResolvedDistrict] = useState('');
  const [resolvedState, setResolvedState] = useState('');

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const clearAutofill = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
    setPostOffices([]);
    setResolvedDistrict('');
    setResolvedState('');
    setValue('company.address.city', '');
    setValue('company.address.district', '');
    setValue('company.address.state', '');
  }, [setValue]);

  const selectLocality = useCallback(
    (name: string) => {
      const match = postOffices.find((po) => po.Name === name);
      if (match) {
        setValue('company.address.city', match.Name);
        setValue('company.address.district', match.District);
        setValue('company.address.state', match.State);
        setResolvedDistrict(match.District);
        setResolvedState(match.State);
      }
    },
    [postOffices, setValue]
  );

  useEffect(() => {
    // Clear any pending debounce
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // If pincode is not 6 digits, reset
    if (!/^\d{6}$/.test(pincode)) {
      if (abortRef.current) abortRef.current.abort();
      clearAutofill();
      return;
    }

    // Debounce the API call 300ms
    debounceRef.current = setTimeout(async () => {
      // Abort any in-flight request
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      setStatus('loading');
      setErrorMessage('');

      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`,
          { signal: abortRef.current.signal }
        );

        if (!res.ok) throw new Error('API request failed');

        const data: PincodeApiResponse[] = await res.json();
        const result = data[0];

        if (!result || result.Status !== 'Success' || !result.PostOffice?.length) {
          setStatus('error');
          setErrorMessage('No locations found for this pincode.');
          setPostOffices([]);
          setResolvedDistrict('');
          setResolvedState('');
          return;
        }

        const offices: PostOffice[] = result.PostOffice;
        setPostOffices(offices);

        // Pre-fill District + State from the first result (they're the same for all entries)
        const firstOffice = offices[0];
        if (firstOffice) {
          setResolvedDistrict(firstOffice.District);
          setResolvedState(firstOffice.State);
          setValue('company.address.district', firstOffice.District);
          setValue('company.address.state', firstOffice.State);
        }

        // If only one post office, auto-select it
        if (offices.length === 1 && firstOffice) {
          setValue('company.address.city', firstOffice.Name);
        } else {
          setValue('company.address.city', '');
        }

        setStatus('success');
      } catch (err) {
        if ((err as Error).name === 'AbortError') return; // Intentional abort — do nothing
        setStatus('error');
        setErrorMessage('Could not fetch pincode data. Please enter manually.');
        setPostOffices([]);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pincode]);

  return {
    status,
    errorMessage,
    localityOptions: postOffices.map((po) => po.Name),
    selectLocality,
    clearAutofill,
    resolvedDistrict,
    resolvedState,
  };
}
