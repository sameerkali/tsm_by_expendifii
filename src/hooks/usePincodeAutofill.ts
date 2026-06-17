'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

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

/** Fields filled by the API. Consumed by any form, regardless of library. */
export interface PincodeAutofillPayload {
  city: string;
  district: string;
  state: string;
}

interface UsePincodeAutofillReturn {
  status: PincodeStatus;
  errorMessage: string;
  localityOptions: string[];
  /** Call this when a locality is selected — triggers onAutofill with the full payload */
  selectLocality: (name: string) => void;
  /** Call this to clear all autofilled values */
  clearAutofill: () => void;
  /** Currently resolved District (from API) */
  resolvedDistrict: string;
  /** Currently resolved State (from API) */
  resolvedState: string;
}

/**
 * Pincode-driven address autofill hook.
 *
 * @param pincode  - Watched pincode string (triggers lookup on 6 digits)
 * @param onAutofill - Called when the API resolves; receives { city, district, state }
 * @param onClear    - Called when the pincode is invalid/cleared; reset your fields here
 */
export function usePincodeAutofill(
  pincode: string,
  onAutofill: (payload: PincodeAutofillPayload) => void,
  onClear: () => void
): UsePincodeAutofillReturn {
  const [status, setStatus] = useState<PincodeStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);
  const [resolvedDistrict, setResolvedDistrict] = useState('');
  const [resolvedState, setResolvedState] = useState('');

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Stable refs so callbacks don't trigger the main effect
  const onAutofillRef = useRef(onAutofill);
  const onClearRef = useRef(onClear);
  useEffect(() => { onAutofillRef.current = onAutofill; }, [onAutofill]);
  useEffect(() => { onClearRef.current = onClear; }, [onClear]);

  const clearAutofill = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
    setPostOffices([]);
    setResolvedDistrict('');
    setResolvedState('');
    onClearRef.current();
  }, []);

  const selectLocality = useCallback(
    (name: string) => {
      const match = postOffices.find((po) => po.Name === name);
      if (match) {
        setResolvedDistrict(match.District);
        setResolvedState(match.State);
        onAutofillRef.current({
          city: match.Name,
          district: match.District,
          state: match.State,
        });
      }
    },
    [postOffices]
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
          // Pre-populate district + state immediately; city only if single result
          onAutofillRef.current({
            city: offices.length === 1 ? firstOffice.Name : '',
            district: firstOffice.District,
            state: firstOffice.State,
          });
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
