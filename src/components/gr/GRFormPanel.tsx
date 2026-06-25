"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Loader2,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Search,
  Pencil,
} from "lucide-react";
import posthog from "posthog-js";
import { cn } from "@/lib/utils/cn";
import { useCreateGR, useUpdateGR } from "@/hooks/useGR";
import { useCustomers, useCreateCustomer } from "@/hooks/useCustomers";
import { useDebounce } from "@/hooks/useDebounce";
import type { GR, CreateGRInput } from "@/types/gr";
import type {
  CreateCustomerInput,
  Customer,
  PricingType as CustomerPricingType,
} from "@/types/customer";
import { GRStatus, PricingType, PaymentStatus, BillingType } from "@/types/gr";
import { toast } from "sonner";
import { Toggle } from "@/components/ui";
import { sanitizeValue } from "@/lib/validation/sanitize";
import { validateValue } from "@/lib/validation/validate";
import type { FieldSchema } from "@/lib/validation/fieldSchema";
import {
  grConsignorSchema,
  grConsigneeSchema,
  grCitySchema,
  grDescriptionSchema,
  grRemarksSchema,
  grWeightSchema,
  grQuantitySchema,
  grRateSchema,
  vehicleNumberSchema,
  customerPhoneSchema,
  gstinSchema,
  customerAddressSchema,
  customerCitySchema,
  pincodeSchema,
  driverNameSchema,
  grInvoiceNumberSchema,
  grInsuranceAmountSchema,
} from "@/lib/validation/schemas";
import { usePincodeAutofill } from "@/hooks/usePincodeAutofill";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GRFormPanelProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: GR | null;
}

interface FormState {
  bookingDate: string;
  fromCity: string;
  toCity: string;
  consignor: string;
  consignorPhone: string;
  consignorGST: string;
  consignorAddress: string;
  consignorCity: string;
  consignorState: string;
  consignorPincode: string;
  consignee: string;
  consigneeGST: string;
  productDescription: string;
  weight: string;
  boxCount: string;
  billingType: string;
  pricingType: string;
  rate: string;
  freightAmount: string;
  vehicleNumber: string;
  driverName: string;
  driverDocumentId: string;
  driverMobile: string;
  paymentStatus: string;
  status: string;
  invoiceNumber: string;
  ewayBillNumber: string;
  insuranceCompany: string;
  insurancePolicyNo: string;
  insuranceDate: string;
  insuranceAmount: string;
  insuranceRisk: string;
  remarks: string;
  value: string;
  gstPaidBy: string;
  shipTo: string;
  doorDelivery: boolean;
}

const getLocalDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const today = getLocalDateString();

const EMPTY_FORM: FormState = {
  bookingDate: today,
  fromCity: "",
  toCity: "",
  consignor: "",
  consignorPhone: "",
  consignorGST: "",
  consignorAddress: "",
  consignorCity: "",
  consignorState: "",
  consignorPincode: "",
  consignee: "",
  consigneeGST: "",
  productDescription: "",
  weight: "",
  boxCount: "",
  billingType: BillingType.TO_PAID,
  pricingType: PricingType.KG,
  rate: "",
  freightAmount: "",
  vehicleNumber: "",
  driverName: "",
  driverDocumentId: "",
  driverMobile: "",
  paymentStatus: PaymentStatus.PENDING,
  status: GRStatus.BOOKED,
  invoiceNumber: "",
  ewayBillNumber: "",
  insuranceCompany: "",
  insurancePolicyNo: "",
  insuranceDate: "",
  insuranceAmount: "",
  insuranceRisk: "",
  remarks: "",
  value: "",
  gstPaidBy: "",
  shipTo: "",
  doorDelivery: false,
};

// Schema map for GR form fields
const GR_FIELD_SCHEMAS: Partial<Record<keyof FormState, FieldSchema>> = {
  consignor: grConsignorSchema,
  consignorPhone: customerPhoneSchema,
  consignorGST: gstinSchema,
  consignorAddress: customerAddressSchema,
  consignorCity: customerCitySchema,
  consignorPincode: pincodeSchema,
  consignee: grConsigneeSchema,
  consigneeGST: gstinSchema,
  fromCity: grCitySchema,
  toCity: grCitySchema,
  productDescription: grDescriptionSchema,
  weight: grWeightSchema,
  boxCount: grQuantitySchema,
  rate: grRateSchema,
  vehicleNumber: vehicleNumberSchema,
  driverName: driverNameSchema,
  driverMobile: customerPhoneSchema,
  remarks: grRemarksSchema,
  invoiceNumber: grInvoiceNumberSchema,
  insuranceAmount: grInsuranceAmountSchema,
  freightAmount: {
    type: "number",
    label: "Freight Amount",
    required: true,
    min: 0,
    max: 99999999,
  },
  value: {
    type: "string",
    label: "Declared Value",
    required: false,
    maxLength: 30,
    allowedChars: /^[0-9]+$/,
    sanitize: ["trim"],
  },
  gstPaidBy: {
    type: "string",
    label: "GST Paid By",
    required: false,
  },
  shipTo: {
    type: "string",
    label: "Ship To Address",
    required: false,
    maxLength: 300,
    sanitize: ["trim", "stripHtml"],
  },
};

const STATUS_CONFIG = {
  [GRStatus.BOOKED]: {
    label: "Booked",
    cls: "bg-slate-100 text-slate-700 border-slate-300",
  },
  [GRStatus.IN_TRANSIT]: {
    label: "In Transit",
    cls: "bg-amber-100 text-amber-700 border-amber-300",
  },
  [GRStatus.DELIVERED]: {
    label: "Delivered",
    cls: "bg-sky-50 text-sky-700 border-sky-300",
  },
};

function buildCustomerPayloadFromGR(form: FormState): CreateCustomerInput {
  const payload: CreateCustomerInput = {
    name: String(form.consignor ?? "").trim(),
    phone: String(form.consignorPhone ?? "").trim(),
  };

  const gst = String(form.consignorGST ?? "").trim();
  if (gst) payload.gstin = gst.toUpperCase();

  const addr = String(form.consignorAddress ?? "").trim();
  if (addr) payload.address = addr;

  const city = String(form.consignorCity ?? "").trim();
  if (city) payload.city = city;

  const state = String(form.consignorState ?? "").trim();
  if (state) payload.state = state;

  const pincodeVal =
    typeof form.consignorPincode === "number"
      ? form.consignorPincode
      : parseInt(String(form.consignorPincode ?? "").trim(), 10);
  if (pincodeVal && !isNaN(pincodeVal)) payload.pincode = pincodeVal;

  if (form.pricingType)
    payload.pricingType = form.pricingType as CustomerPricingType;

  const rateVal =
    typeof form.rate === "number"
      ? form.rate
      : parseFloat(String(form.rate ?? "").trim());
  if (rateVal != null && !isNaN(rateVal)) payload.defaultRate = rateVal;

  return payload;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function GRFormPanel({ isOpen, onClose, editData }: GRFormPanelProps) {
  const isEditing = !!editData?.id;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {},
  );
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search uses the consignor field directly
  const debouncedSearch = useDebounce(form.consignor, 400);

  const createGR = useCreateGR();
  const updateGR = useUpdateGR();
  const createCustomer = useCreateCustomer();

  // Fetch customers based on consignor input
  const { data: customerListRes, isLoading: isLoadingCustomers } = useCustomers(
    { search: debouncedSearch || undefined },
  );
  const customers = isOpen ? (customerListRes?.data ?? []) : [];

  // Determine if the exact typed name matches an existing customer
  const exactMatchExists = customers.some(
    (c) => c.name.toLowerCase() === form.consignor.trim().toLowerCase(),
  );

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm({
          bookingDate: editData.bookingDate?.slice(0, 10) ?? today,
          fromCity: editData.fromCity ?? "",
          toCity: editData.toCity ?? "",
          consignor: editData.consignor ?? "",
          consignorPhone: editData.customer?.phone ?? "",
          consignorGST: editData.consignorGST ?? "",
          consignorAddress: editData.customer?.address ?? "",
          consignorCity: editData.customer?.city ?? "",
          consignorState: editData.customer?.state ?? "",
          consignorPincode: editData.customer?.pincode ?? "",
          consignee: editData.consignee ?? "",
          consigneeGST: editData.consigneeGST ?? "",
          productDescription: editData.productDescription ?? "",
          weight: editData.weight != null ? String(editData.weight) : "",
          boxCount: editData.boxCount != null ? String(editData.boxCount) : "",
          billingType: editData.billingType
            ? editData.billingType.toUpperCase().replace(/\s+/g, "_")
            : BillingType.TO_PAID,
          pricingType: editData.pricingType ?? PricingType.KG,
          rate: editData.rate != null ? String(editData.rate) : "",
          freightAmount:
            editData.freightAmount != null
              ? String(editData.freightAmount)
              : "",
          vehicleNumber: editData.vehicleNumber ?? "",
          driverName: editData.driverName ?? "",
          driverDocumentId: editData.driverDocumentId ?? "",
          driverMobile: editData.driverMobile ?? "",
          paymentStatus: editData.paymentStatus ?? PaymentStatus.PENDING,
          status: editData.status ?? GRStatus.BOOKED,
          invoiceNumber: editData.invoiceNumber ?? "",
          ewayBillNumber: editData.ewayBillNumber ?? "",
          insuranceCompany: editData.insurance?.company ?? "",
          insurancePolicyNo: editData.insurance?.policyNo ?? "",
          insuranceDate: editData.insurance?.date?.slice(0, 10) ?? "",
          insuranceAmount:
            editData.insurance?.amount != null
              ? String(editData.insurance.amount)
              : "",
          insuranceRisk: editData.insurance?.risk ?? "",
          remarks: editData.remarks ?? "",
          value: editData.value ?? "",
          gstPaidBy: editData.gstPaidBy ?? "",
          shipTo: editData.shipTo ?? "",
          doorDelivery: editData.doorDelivery ?? false,
        });
        setCustomerId(editData.customer?.id ?? null);
        setFieldErrors({});
        setTouchedFields({});
      } else {
        setForm(EMPTY_FORM);
        setCustomerId(null);
        setFieldErrors({});
        setTouchedFields({});
      }
    }
  }, [isOpen, editData]);

  // Auto-calculate freight amount
  useEffect(() => {
    const rate = parseFloat(form.rate) || 0;
    const qty =
      form.pricingType === PricingType.BOX
        ? parseFloat(form.boxCount) || 0
        : parseFloat(form.weight) || 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm((prev) => ({ ...prev, freightAmount: (rate * qty).toFixed(2) }));
  }, [form.rate, form.weight, form.boxCount, form.pricingType]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const validateField = (
    field: keyof FormState,
    value: string,
  ): string | null => {
    if (field === "bookingDate") {
      if (!isEditing && value && value < today) {
        return "Booking date cannot be in the past.";
      }
      return null;
    }

    const schema = GR_FIELD_SCHEMAS[field];
    if (!schema) return null;

    const isMandatory =
      field === "consignor" ||
      field === "fromCity" ||
      field === "toCity" ||
      field === "freightAmount";
    if (
      isMandatory &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      return `${schema.label || field} is required.`;
    }

    // Treat other fields as optional for this form
    const optionalSchema = { ...schema, required: false };
    if (!value || (typeof value === "string" && !value.trim())) {
      return null;
    }
    return validateValue(value, optionalSchema);
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Re-validate dynamically if the field has been touched or currently has an error
    if (touchedFields[field] || fieldErrors[field]) {
      const error = validateField(field, value);
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next[field] = error;
        } else {
          delete next[field];
        }
        return next;
      });
    }
  };

  const handleFieldBlur = (field: keyof FormState) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    const value = form[field];
    const error = validateField(
      field,
      typeof value === "string" ? value.trim() : String(value),
    );
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const schema = GR_FIELD_SCHEMAS[field];
      let value = e.target.value;
      if (schema) value = sanitizeValue(value, schema) as string;

      handleFieldChange(field, value);

      if (field === "consignor") {
        if (customerId) setCustomerId(null);
        setIsDropdownOpen(true);
      }
    };

  const blur = (field: keyof FormState) => () => {
    let value = form[field];
    if (typeof value === "string") {
      value = value.trim();
      setForm((prev) => ({ ...prev, [field]: value }));
    }
    handleFieldBlur(field);
  };

  // ── Phone-specific handlers (digits only, max 10) ──
  const handleConsignorPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    handleFieldChange("consignorPhone", val);
  };

  const handleDriverMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    handleFieldChange("driverMobile", val);
  };

  const handleSelectCustomer = (c: Customer) => {
    setCustomerId(c.id);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next.consignor;
      delete next.consignorPhone;
      delete next.consignorGST;
      delete next.consignorAddress;
      delete next.consignorCity;
      delete next.consignorState;
      delete next.consignorPincode;
      delete next.fromCity;
      delete next.rate;
      return next;
    });
    setForm((prev) => ({
      ...prev,
      consignor: c.name,
      consignorGST: c.gstin || "",
      consignorPhone: c.phone || "",
      consignorAddress: c.address || "",
      consignorCity: c.city || "",
      consignorState: c.state || "",
      consignorPincode: c.pincode || "",
      fromCity: prev.fromCity || c.city || "",
      pricingType: c.pricingType ?? prev.pricingType,
      rate: c.defaultRate != null ? String(c.defaultRate) : prev.rate,
    }));
    setIsDropdownOpen(false);
  };

  const handleClearCustomer = () => {
    setCustomerId(null);
    setFieldErrors({});
    setTouchedFields({});
    setForm((prev) => ({
      ...prev,
      consignor: "",
      consignorPhone: "",
      consignorGST: "",
      consignorAddress: "",
      consignorCity: "",
      consignorState: "",
      consignorPincode: "",
      pricingType: PricingType.KG,
      rate: "",
      fromCity: "",
    }));
  };

  const validateAll = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    for (const field of Object.keys(EMPTY_FORM) as Array<keyof FormState>) {
      const value = form[field];
      const error = validateField(
        field,
        typeof value === "string" ? value : String(value),
      );
      if (error) {
        errors[field] = error;
      }
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateAll();
    if (Object.keys(errors).length > 0) {
      // Mark all fields as touched so their error states show up in the UI
      const allTouched = Object.keys(EMPTY_FORM).reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      );
      setTouchedFields(allTouched);
      setFieldErrors(errors);
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }

    let finalCustomerId = customerId;

    // IMPLICIT CUSTOMER CREATION (only if both name and phone are provided since everything is optional)
    if (
      !isEditing &&
      !customerId &&
      String(form.consignor ?? "").trim() &&
      String(form.consignorPhone ?? "").trim()
    ) {
      try {
        const res = await createCustomer.mutateAsync(
          buildCustomerPayloadFromGR(form),
        );
        finalCustomerId = res.data.id;
        setCustomerId(res.data.id); // Save it locally in case GR creation fails and they retry
      } catch (err) {
        console.error("Failed to implicitly create customer:", err);
        // Error toast is already handled by useCreateCustomer hook
        return;
      }
    }

    const insCompany = String(form.insuranceCompany ?? "").trim();
    const insPolicy = String(form.insurancePolicyNo ?? "").trim();
    const insRisk = String(form.insuranceRisk ?? "").trim();

    const insurance =
      insCompany ||
      insPolicy ||
      form.insuranceDate ||
      form.insuranceAmount ||
      insRisk
        ? {
            company: insCompany || undefined,
            policyNo: insPolicy || undefined,
            date: form.insuranceDate || undefined,
            amount: parseFloat(form.insuranceAmount) || undefined,
            risk: insRisk || undefined,
          }
        : undefined;

    const payload: CreateGRInput = {
      ...(finalCustomerId ? { customerId: finalCustomerId } : {}),
      bookingDate: form.bookingDate || undefined,
      fromCity: form.fromCity || undefined,
      toCity: form.toCity || undefined,
      consignor: form.consignor || undefined,
      consignorGST: form.consignorGST || undefined,
      consignee: form.consignee || undefined,
      consigneeGST: form.consigneeGST || undefined,
      productDescription: form.productDescription || undefined,
      weight: parseFloat(form.weight) || undefined,
      boxCount: parseInt(form.boxCount, 10) || undefined,
      billingType: form.billingType
        ? form.billingType.toUpperCase().replace(/\s+/g, "_")
        : undefined,
      pricingType: form.pricingType || undefined,
      rate: parseFloat(form.rate) || undefined,
      freightAmount: parseFloat(form.freightAmount) || undefined,
      vehicleNumber: form.vehicleNumber || undefined,
      driverName: form.driverName || undefined,
      driverDocumentId: form.driverDocumentId || undefined,
      driverMobile: form.driverMobile || undefined,
      paymentStatus: form.paymentStatus || undefined,
      status: form.status || undefined,
      invoiceNumber: String(form.invoiceNumber ?? "").trim() || undefined,
      ewayBillNumber: String(form.ewayBillNumber ?? "").trim() || undefined,
      insurance,
      remarks: form.remarks || undefined,
      value: String(form.value ?? "").trim() || undefined,
      gstPaidBy: form.gstPaidBy || undefined,
      shipTo: String(form.shipTo ?? "").trim() || undefined,
      doorDelivery: form.doorDelivery,
    };
    if (isEditing && editData?.id) {
      updateGR.mutate(
        { id: editData.id, data: payload },
        {
          onSuccess: () => {
            posthog.capture("gr_updated", {
              gr_number: editData.grNumber,
              from_city: payload.fromCity,
              to_city: payload.toCity,
              freight_amount: payload.freightAmount,
              status: payload.status,
            });
            onClose();
          },
        },
      );
    } else {
      createGR.mutate(payload, {
        onSuccess: (res) => {
          posthog.capture("gr_created", {
            gr_number: res.data?.grNumber,
            from_city: payload.fromCity,
            to_city: payload.toCity,
            freight_amount: payload.freightAmount,
            pricing_type: payload.pricingType,
          });
          onClose();
        },
      });
    }
  };

  const isSaving =
    createGR.isPending || updateGR.isPending || createCustomer.isPending;
  const isSubmitDisabled =
    !form.consignor.trim() ||
    !form.fromCity.trim() ||
    !form.toCity.trim() ||
    !form.freightAmount ||
    parseFloat(form.freightAmount) <= 0 ||
    isSaving;
  const isNewCustomer =
    !isEditing &&
    !customerId &&
    form.consignor.trim().length > 0 &&
    !exactMatchExists;

  // ── Pincode autofill for isNewCustomer address block ───────────────────────────
  const [grManualMode, setGrManualMode] = React.useState(false);
  const [grStateLocked, setGrStateLocked] = React.useState(true);
  const [grLocalityOpen, setGrLocalityOpen] = React.useState(false);
  const [grLocalityQuery, setGrLocalityQuery] = React.useState("");
  const grLocalityRef = React.useRef<HTMLDivElement>(null);

  const {
    status: grPincodeStatus,
    errorMessage: grPincodeError,
    localityOptions: grLocalityOptions,
    selectLocality: grSelectLocality,
    clearAutofill: grClearAutofill,
  } = usePincodeAutofill(
    form.consignorPincode,
    (payload) => {
      setForm((prev) => ({
        ...prev,
        ...(payload.city ? { consignorCity: payload.city } : {}),
        consignorState: payload.state || prev.consignorState,
      }));
    },
    () => {
      setForm((prev) => ({ ...prev, consignorCity: "", consignorState: "" }));
    },
  );

  // Re-lock when API succeeds; reset manual mode on new customer
  React.useEffect(() => {
    if (grPincodeStatus === "success") {
      setGrStateLocked(true);
      setGrManualMode(false);
    }
    if (grPincodeStatus === "idle") setGrStateLocked(true);
  }, [grPincodeStatus]);

  // Reset pincode UI state when the customer section resets
  React.useEffect(() => {
    if (!isNewCustomer) {
      setGrManualMode(false);
      setGrStateLocked(true);
    }
  }, [isNewCustomer]);

  // Locality combobox outside-click
  React.useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        grLocalityRef.current &&
        !grLocalityRef.current.contains(e.target as Node)
      ) {
        setGrLocalityOpen(false);
        setGrLocalityQuery("");
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const grHandleEnterManually = () => {
    grClearAutofill();
    setGrManualMode(true);
  };

  const grHandleBackToAuto = () => {
    setGrManualMode(false);
    setForm((prev) => ({ ...prev, consignorCity: "", consignorState: "" }));
  };
  // ───────────────────────────────────────────────────────────────────────────────

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-40"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          "fixed top-0 right-0 h-full bg-white dark:bg-slate-950 z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out",
          "w-full md:w-[85vw] lg:w-[80vw] max-w-6xl",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-10 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div>
            <p className="text-[10px] font-black tracking-[0.3em] text-sky-600 dark:text-sky-400 uppercase italic">
              {isEditing ? "EDIT RECORD" : "NEW RECORD"}
            </p>
            <h2 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              {isEditing ? editData?.grNumber : "Create Goods Receipt"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto custom-scrollbar"
        >
          <div className="px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {/* ── LEFT COLUMN ── */}
            <div className="space-y-8">
              {/* SECTION: Customer */}
              <section className="space-y-4">
                {/* Customer linked badge */}
                {customerId && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 rounded-2xl mb-4">
                    <CheckCircle2 size={16} className="text-sky-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                        Customer Linked
                      </p>
                      <p className="text-sm font-bold text-sky-900 dark:text-sky-200 truncate">
                        {form.consignor} · {form.consignorPhone}
                      </p>
                    </div>
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={handleClearCustomer}
                        className="text-xs text-slate-500 hover:text-red-500 font-bold transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                )}

                {/* Consignor combobox */}
                <div ref={dropdownRef} className="relative">
                  <Field
                    label="Consignor (Sender)"
                    required
                    error={fieldErrors.consignor}
                  >
                    <div className="relative">
                      <Search
                        size={15}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                      <input
                        placeholder="Company or person sending goods"
                        value={form.consignor}
                        onChange={set("consignor")}
                        onBlur={blur("consignor")}
                        onFocus={() => setIsDropdownOpen(true)}
                        readOnly={!!customerId}
                        maxLength={60}
                        className={cn(
                          inputClass,
                          "pl-11",
                          !!customerId && "opacity-60 cursor-not-allowed",
                          fieldErrors.consignor && errorInputClass,
                        )}
                        autoComplete="off"
                      />
                    </div>
                  </Field>

                  {isDropdownOpen && !customerId && !isEditing && (
                    <div className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                      <div className="max-h-52 overflow-y-auto">
                        {isLoadingCustomers ? (
                          <div className="flex items-center justify-center p-4 text-slate-400 gap-2">
                            <Loader2 size={15} className="animate-spin" />{" "}
                            Searching...
                          </div>
                        ) : customers.length === 0 ? (
                          <div className="px-4 py-4 text-sm text-slate-500 flex flex-col items-center justify-center gap-2">
                            <p>No matches found.</p>
                            {form.consignor.trim().length > 0 && (
                              <p className="text-xs">
                                You can save this as a new customer.
                              </p>
                            )}
                          </div>
                        ) : (
                          customers.map((c) => (
                            <button
                              type="button"
                              key={c.id}
                              onClick={() => handleSelectCustomer(c)}
                              className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0"
                            >
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {c.name}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {c.phone}
                                {c.city ? ` · ${c.city}` : ""}
                              </p>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Consignor Phone ── */}
                <Field
                  label="Consignor Phone"
                  error={fieldErrors.consignorPhone}
                >
                  <div className="relative">
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="9XXXXXXXXX"
                      value={form.consignorPhone}
                      onChange={handleConsignorPhoneChange}
                      onBlur={blur("consignorPhone")}
                      readOnly={!!customerId}
                      maxLength={10}
                      className={cn(
                        inputClass,
                        !!customerId && "opacity-60 cursor-not-allowed",
                        fieldErrors.consignorPhone && errorInputClass,
                        // live green border when exactly 10 digits
                        !fieldErrors.consignorPhone &&
                          form.consignorPhone.length === 10 &&
                          "!border-sky-500",
                      )}
                    />
                    {/* digit counter */}
                    {!customerId && form.consignorPhone.length > 0 && (
                      <span
                        className={cn(
                          "absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tabular-nums pointer-events-none",
                          form.consignorPhone.length === 10
                            ? "text-sky-500"
                            : "text-slate-400",
                        )}
                      >
                        {form.consignorPhone.length}/10
                      </span>
                    )}
                  </div>
                </Field>

                {/* Additional New Customer Fields */}
                {isNewCustomer && (
                  <div className="pt-2">
                    {!showMoreDetails ? (
                      <button
                        type="button"
                        onClick={() => setShowMoreDetails(true)}
                        className="text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors"
                      >
                        + Add Full Address (Optional)
                      </button>
                    ) : (
                      <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold text-slate-500">
                            Additional Details
                          </p>
                          <button
                            type="button"
                            onClick={() => setShowMoreDetails(false)}
                            className="text-xs text-slate-400 hover:text-slate-600"
                          >
                            Hide
                          </button>
                        </div>

                        {/* Full street address (always plain) */}
                        <Field
                          label="Address"
                          error={fieldErrors.consignorAddress}
                        >
                          <input
                            placeholder="Street address"
                            value={form.consignorAddress}
                            onChange={set("consignorAddress")}
                            onBlur={blur("consignorAddress")}
                            maxLength={300}
                            className={cn(
                              inputClass,
                              fieldErrors.consignorAddress && errorInputClass,
                            )}
                          />
                        </Field>

                        {/* ── Pincode-first smart block ── */}
                        {grManualMode ? (
                          /* Manual fallback */
                          <>
                            <div className="flex items-center justify-between px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                              <span className="text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                                <Pencil size={11} /> Manual entry
                              </span>
                              <button
                                type="button"
                                onClick={grHandleBackToAuto}
                                className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium"
                              >
                                ← Auto-detect
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <Field
                                label="Pincode"
                                error={fieldErrors.consignorPincode}
                              >
                                <input
                                  inputMode="numeric"
                                  placeholder="Pincode"
                                  value={form.consignorPincode}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "consignorPincode",
                                      e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6),
                                    )
                                  }
                                  onBlur={blur("consignorPincode")}
                                  maxLength={6}
                                  className={cn(
                                    inputClass,
                                    fieldErrors.consignorPincode &&
                                      errorInputClass,
                                  )}
                                />
                              </Field>
                              <Field
                                label="City"
                                error={fieldErrors.consignorCity}
                              >
                                <input
                                  placeholder="City"
                                  value={form.consignorCity}
                                  onChange={set("consignorCity")}
                                  onBlur={blur("consignorCity")}
                                  maxLength={60}
                                  className={cn(
                                    inputClass,
                                    fieldErrors.consignorCity &&
                                      errorInputClass,
                                  )}
                                />
                              </Field>
                              <Field
                                label="State"
                                error={fieldErrors.consignorState}
                              >
                                <input
                                  placeholder="State"
                                  value={form.consignorState}
                                  onChange={set("consignorState")}
                                  maxLength={60}
                                  className={cn(
                                    inputClass,
                                    fieldErrors.consignorState &&
                                      errorInputClass,
                                  )}
                                />
                              </Field>
                            </div>
                          </>
                        ) : (
                          /* Smart mode */
                          <>
                            {/* Pincode trigger */}
                            <Field
                              label="Pincode"
                              error={fieldErrors.consignorPincode}
                            >
                              <div className="relative">
                                <input
                                  inputMode="numeric"
                                  placeholder="Enter 6-digit pincode"
                                  value={form.consignorPincode}
                                  onChange={(e) =>
                                    handleFieldChange(
                                      "consignorPincode",
                                      e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6),
                                    )
                                  }
                                  onBlur={blur("consignorPincode")}
                                  maxLength={6}
                                  className={cn(
                                    inputClass,
                                    "pr-10",
                                    grPincodeStatus === "error" &&
                                      "border-red-400 focus:border-red-500",
                                    grPincodeStatus === "success" &&
                                      "border-emerald-400 focus:border-emerald-500",
                                    fieldErrors.consignorPincode &&
                                      errorInputClass,
                                  )}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  {grPincodeStatus === "loading" && (
                                    <Loader2
                                      size={14}
                                      className="animate-spin text-sky-500"
                                    />
                                  )}
                                  {grPincodeStatus === "success" && (
                                    <CheckCircle2
                                      size={14}
                                      className="text-emerald-500"
                                    />
                                  )}
                                  {grPincodeStatus === "error" && (
                                    <AlertCircle
                                      size={14}
                                      className="text-red-400"
                                    />
                                  )}
                                </div>
                              </div>
                              {grPincodeStatus === "error" &&
                                grPincodeError && (
                                  <div className="mt-1 space-y-1">
                                    <p className="text-xs text-red-500">
                                      {grPincodeError}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={grHandleEnterManually}
                                      className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-medium"
                                    >
                                      Fill manually instead →
                                    </button>
                                  </div>
                                )}
                            </Field>

                            {/* Locality combobox + State */}
                            <div className="grid grid-cols-2 gap-4">
                              {/* Locality */}
                              <div ref={grLocalityRef} className="relative">
                                <Field
                                  label="City / Locality"
                                  error={fieldErrors.consignorCity}
                                >
                                  <div className="relative">
                                    <input
                                      type="text"
                                      value={
                                        grLocalityOpen
                                          ? grLocalityQuery
                                          : form.consignorCity
                                      }
                                      onChange={(e) =>
                                        setGrLocalityQuery(e.target.value)
                                      }
                                      onFocus={() => {
                                        if (
                                          grPincodeStatus === "success" &&
                                          grLocalityOptions.length > 0
                                        )
                                          setGrLocalityOpen(true);
                                      }}
                                      onClick={() => {
                                        if (
                                          grPincodeStatus === "success" &&
                                          grLocalityOptions.length > 0
                                        )
                                          setGrLocalityOpen(true);
                                      }}
                                      placeholder={
                                        grPincodeStatus !== "success"
                                          ? "Enter pincode first"
                                          : "Select locality"
                                      }
                                      disabled={grPincodeStatus !== "success"}
                                      autoComplete="off"
                                      className={cn(
                                        inputClass,
                                        "pr-8",
                                        grPincodeStatus !== "success" &&
                                          "opacity-60 cursor-not-allowed",
                                      )}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                      {grLocalityOpen ? (
                                        <Search size={13} />
                                      ) : (
                                        <ChevronDown size={13} />
                                      )}
                                    </div>
                                  </div>
                                  {grLocalityOpen &&
                                    grLocalityOptions.filter(
                                      (o) =>
                                        !grLocalityQuery ||
                                        o
                                          .toLowerCase()
                                          .includes(
                                            grLocalityQuery.toLowerCase(),
                                          ),
                                    ).length > 0 && (
                                      <div className="absolute z-50 mt-1 w-full max-h-44 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg">
                                        {grLocalityOptions
                                          .filter(
                                            (o) =>
                                              !grLocalityQuery ||
                                              o
                                                .toLowerCase()
                                                .includes(
                                                  grLocalityQuery.toLowerCase(),
                                                ),
                                          )
                                          .map((name) => (
                                            <button
                                              key={name}
                                              type="button"
                                              onMouseDown={(e) =>
                                                e.preventDefault()
                                              }
                                              onClick={() => {
                                                grSelectLocality(name);
                                                setForm((prev) => ({
                                                  ...prev,
                                                  consignorCity: name,
                                                }));
                                                setGrLocalityQuery("");
                                                setGrLocalityOpen(false);
                                              }}
                                              className={cn(
                                                "w-full text-left px-3 py-2.5 text-sm transition-colors",
                                                form.consignorCity === name
                                                  ? "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-medium"
                                                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
                                              )}
                                            >
                                              {name}
                                            </button>
                                          ))}
                                      </div>
                                    )}
                                  {grPincodeStatus === "success" &&
                                    grLocalityOptions.length > 1 &&
                                    !form.consignorCity && (
                                      <p className="text-xs text-sky-500 mt-1">
                                        Select your locality above
                                      </p>
                                    )}
                                  {(grPincodeStatus === "idle" ||
                                    grPincodeStatus === "loading") && (
                                    <button
                                      type="button"
                                      onClick={grHandleEnterManually}
                                      className="mt-1 text-xs text-slate-400 hover:text-sky-500 transition-colors"
                                    >
                                      Skip, enter manually
                                    </button>
                                  )}
                                </Field>
                              </div>

                              {/* State — locked when autofilled */}
                              <Field label="State">
                                {grPincodeStatus === "success" &&
                                grStateLocked ? (
                                  <div
                                    className={cn(
                                      inputClass,
                                      "bg-sky-50 dark:bg-sky-900/20 border-sky-300 dark:border-sky-700 flex items-center justify-between",
                                    )}
                                  >
                                    <span className="text-sm font-medium text-slate-900 dark:text-sky-100">
                                      {form.consignorState || "State"}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setGrStateLocked(false)}
                                      className="text-sky-400 hover:text-sky-600 transition-colors ml-2 flex-shrink-0"
                                      title="Edit manually"
                                    >
                                      <Pencil size={13} />
                                    </button>
                                  </div>
                                ) : (
                                  <input
                                    placeholder="State"
                                    value={form.consignorState}
                                    onChange={set("consignorState")}
                                    maxLength={60}
                                    className={cn(
                                      inputClass,
                                      fieldErrors.consignorState &&
                                        errorInputClass,
                                    )}
                                  />
                                )}
                                {grPincodeStatus === "success" &&
                                  grStateLocked && (
                                    <p className="text-xs text-sky-500 mt-1 flex items-center gap-1">
                                      <CheckCircle2 size={11} /> Auto-filled
                                    </p>
                                  )}
                              </Field>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Consignor GST */}
                <Field label="Consignor GST" error={fieldErrors.consignorGST}>
                  <input
                    placeholder="e.g. 22AAAAA0000A1Z5"
                    value={form.consignorGST}
                    onChange={set("consignorGST")}
                    onBlur={blur("consignorGST")}
                    readOnly={!!customerId}
                    maxLength={15}
                    className={cn(
                      inputClass,
                      !!customerId && "opacity-60 cursor-not-allowed",
                      fieldErrors.consignorGST && errorInputClass,
                    )}
                    style={{ textTransform: "uppercase" }}
                  />
                </Field>

                {/* Consignee */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Field
                    label="Consignee (Receiver)"
                    error={fieldErrors.consignee}
                  >
                    <input
                      placeholder="Company or person receiving goods"
                      value={form.consignee}
                      onChange={set("consignee")}
                      onBlur={blur("consignee")}
                      maxLength={60}
                      className={cn(
                        inputClass,
                        fieldErrors.consignee && errorInputClass,
                      )}
                    />
                  </Field>
                  <div className="mt-4">
                    <Field
                      label="Consignee GST"
                      error={fieldErrors.consigneeGST}
                    >
                      <input
                        placeholder="e.g. 22AAAAA0000A1Z5"
                        value={form.consigneeGST}
                        onChange={set("consigneeGST")}
                        onBlur={blur("consigneeGST")}
                        maxLength={15}
                        className={cn(
                          inputClass,
                          fieldErrors.consigneeGST && errorInputClass,
                        )}
                        style={{ textTransform: "uppercase" }}
                      />
                    </Field>
                  </div>
                </div>
              </section>

              {/* SECTION: Shipment Info */}
              <section className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Booking Date" error={fieldErrors.bookingDate}>
                    <input
                      type="date"
                      value={form.bookingDate}
                      onChange={set("bookingDate")}
                      onBlur={blur("bookingDate")}
                      min={!isEditing ? today : undefined}
                      className={cn(
                        inputClass,
                        fieldErrors.bookingDate && errorInputClass,
                      )}
                    />
                  </Field>
                  <Field label="GR Number">
                    <input
                      type="text"
                      value={isEditing ? (editData?.grNumber ?? "") : "Auto"}
                      readOnly
                      className={inputClass + " opacity-50 cursor-not-allowed"}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="From City"
                    required
                    error={fieldErrors.fromCity}
                  >
                    <input
                      placeholder="e.g. Mumbai"
                      value={form.fromCity}
                      onChange={set("fromCity")}
                      onBlur={blur("fromCity")}
                      maxLength={60}
                      className={cn(
                        inputClass,
                        fieldErrors.fromCity && errorInputClass,
                      )}
                    />
                  </Field>
                  <Field label="To City" required error={fieldErrors.toCity}>
                    <input
                      placeholder="e.g. Delhi"
                      value={form.toCity}
                      onChange={set("toCity")}
                      onBlur={blur("toCity")}
                      maxLength={60}
                      className={cn(
                        inputClass,
                        fieldErrors.toCity && errorInputClass,
                      )}
                    />
                  </Field>
                </div>
                <Field label="Ship To Address" error={fieldErrors.shipTo}>
                  <input
                    placeholder="Plot / street address for delivery"
                    value={form.shipTo}
                    onChange={set("shipTo")}
                    onBlur={blur("shipTo")}
                    maxLength={300}
                    className={cn(
                      inputClass,
                      fieldErrors.shipTo && errorInputClass,
                    )}
                  />
                </Field>
                <div className="flex items-center pt-2">
                  <Toggle
                    checked={form.doorDelivery}
                    onChange={(val) =>
                      setForm((prev) => ({ ...prev, doorDelivery: val }))
                    }
                    label="Door Delivery"
                  />
                </div>
              </section>

              {/* SECTION: Invoice & Insurance */}
              <section className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Invoice Number"
                    error={fieldErrors.invoiceNumber}
                  >
                    <input
                      placeholder="Invoice no."
                      value={form.invoiceNumber}
                      onChange={set("invoiceNumber")}
                      onBlur={blur("invoiceNumber")}
                      maxLength={60}
                      className={cn(
                        inputClass,
                        fieldErrors.invoiceNumber && errorInputClass,
                      )}
                    />
                  </Field>
                  <Field
                    label="E-way Bill Number"
                    error={fieldErrors.ewayBillNumber}
                  >
                    <input
                      placeholder="E-way bill no."
                      value={form.ewayBillNumber}
                      onChange={set("ewayBillNumber")}
                      maxLength={60}
                      className={cn(
                        inputClass,
                        fieldErrors.ewayBillNumber && errorInputClass,
                      )}
                    />
                  </Field>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                  <p className="text-xs font-bold text-slate-500">
                    Insurance Details
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Company" error={fieldErrors.insuranceCompany}>
                      <input
                        placeholder="Insurer"
                        value={form.insuranceCompany}
                        onChange={set("insuranceCompany")}
                        maxLength={80}
                        className={cn(
                          inputClass,
                          fieldErrors.insuranceCompany && errorInputClass,
                        )}
                      />
                    </Field>
                    <Field
                      label="Policy No."
                      error={fieldErrors.insurancePolicyNo}
                    >
                      <input
                        placeholder="Policy number"
                        value={form.insurancePolicyNo}
                        onChange={set("insurancePolicyNo")}
                        maxLength={80}
                        className={cn(
                          inputClass,
                          fieldErrors.insurancePolicyNo && errorInputClass,
                        )}
                      />
                    </Field>
                    <Field label="Date" error={fieldErrors.insuranceDate}>
                      <input
                        type="date"
                        value={form.insuranceDate}
                        onChange={set("insuranceDate")}
                        className={cn(
                          inputClass,
                          fieldErrors.insuranceDate && errorInputClass,
                        )}
                      />
                    </Field>
                    <Field
                      label="Amount (₹)"
                      error={fieldErrors.insuranceAmount}
                    >
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0.00"
                        value={form.insuranceAmount}
                        onChange={set("insuranceAmount")}
                        onBlur={blur("insuranceAmount")}
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e")
                            e.preventDefault();
                        }}
                        onWheel={(e) => e.currentTarget.blur()}
                        className={cn(
                          inputClass,
                          fieldErrors.insuranceAmount && errorInputClass,
                        )}
                      />
                    </Field>
                  </div>
                  <Field label="Risk" error={fieldErrors.insuranceRisk}>
                    <input
                      placeholder="Risk covered"
                      value={form.insuranceRisk}
                      onChange={set("insuranceRisk")}
                      maxLength={120}
                      className={cn(
                        inputClass,
                        fieldErrors.insuranceRisk && errorInputClass,
                      )}
                    />
                  </Field>
                </div>
              </section>

              {/* SECTION: Status */}
              <section className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {[
                    GRStatus.BOOKED,
                    GRStatus.IN_TRANSIT,
                    GRStatus.DELIVERED,
                  ].map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    if (!cfg) return null;
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() =>
                          setForm((prev) => ({ ...prev, status: s }))
                        }
                        className={cn(
                          "px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all",
                          form.status === s
                            ? cfg.cls + " scale-105 shadow-sm"
                            : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300",
                        )}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-8">
              {/* SECTION: Goods */}
              <section className="space-y-4">
                <Field
                  label="Product Description"
                  error={fieldErrors.productDescription}
                >
                  <textarea
                    placeholder="Describe the goods..."
                    value={form.productDescription}
                    onChange={set("productDescription")}
                    onBlur={blur("productDescription")}
                    rows={2}
                    maxLength={300}
                    className={cn(
                      inputClass,
                      "h-auto resize-none py-3",
                      fieldErrors.productDescription && errorInputClass,
                    )}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Weight (kg)" error={fieldErrors.weight}>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      placeholder="0.00"
                      value={form.weight}
                      onChange={set("weight")}
                      onBlur={blur("weight")}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") e.preventDefault();
                      }}
                      onInput={(e) => {
                        if (e.currentTarget.value.length > 7)
                          e.currentTarget.value = e.currentTarget.value.slice(
                            0,
                            7,
                          );
                      }}
                      onWheel={(e) => e.currentTarget.blur()}
                      className={cn(
                        inputClass,
                        fieldErrors.weight && errorInputClass,
                      )}
                    />
                  </Field>
                  <Field label="Box Count" error={fieldErrors.boxCount}>
                    <input
                      type="number"
                      min={0}
                      placeholder="Number of boxes"
                      value={form.boxCount}
                      onChange={set("boxCount")}
                      onBlur={blur("boxCount")}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === ".")
                          e.preventDefault();
                      }}
                      onInput={(e) => {
                        if (e.currentTarget.value.length > 7)
                          e.currentTarget.value = e.currentTarget.value.slice(
                            0,
                            7,
                          );
                      }}
                      onWheel={(e) => e.currentTarget.blur()}
                      className={cn(
                        inputClass,
                        fieldErrors.boxCount && errorInputClass,
                      )}
                    />
                  </Field>
                </div>
                <Field label="Value (₹)" error={fieldErrors.value}>
                  <input
                    placeholder="e.g. 250000"
                    value={form.value}
                    onChange={set("value")}
                    onBlur={blur("value")}
                    className={cn(
                      inputClass,
                      fieldErrors.value && errorInputClass,
                    )}
                  />
                </Field>
              </section>

              {/* SECTION: Pricing */}
              <section className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Billing Type">
                    <div className="relative">
                      <select
                        value={form.billingType}
                        onChange={set("billingType")}
                        className={inputClass + " appearance-none pr-10"}
                      >
                        <option value={BillingType.TO_PAID}>To Paid</option>
                        <option value={BillingType.TO_BE_BILLED}>
                          To be Billed
                        </option>
                        <option value={BillingType.PAID}>Paid</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </Field>
                  <Field label="Pricing Type">
                    <div className="relative">
                      <select
                        value={form.pricingType}
                        onChange={set("pricingType")}
                        className={inputClass + " appearance-none pr-10"}
                      >
                        <option value={PricingType.KG}>Per KG</option>
                        <option value={PricingType.BOX}>Per Box</option>
                        <option value={PricingType.KM}>Per KM</option>
                        <option value={PricingType.QUINTAL}>Per Quintal</option>
                        <option value={PricingType.TON}>Per Ton</option>
                      </select>
                      <ChevronDown
                        size={15}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Rate (₹)" error={fieldErrors.rate}>
                    <input
                      type="number"
                      min={0}
                      step="1"
                      placeholder="0.00"
                      value={form.rate}
                      onChange={set("rate")}
                      onBlur={blur("rate")}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") e.preventDefault();
                      }}
                      onInput={(e) => {
                        if (e.currentTarget.value.length > 7)
                          e.currentTarget.value = e.currentTarget.value.slice(
                            0,
                            7,
                          );
                      }}
                      onWheel={(e) => e.currentTarget.blur()}
                      className={cn(
                        inputClass,
                        fieldErrors.rate && errorInputClass,
                      )}
                    />
                  </Field>
                  <Field label="Freight Amount (₹)" required>
                    <input
                      type="text"
                      value={`₹ ${form.freightAmount || "0.00"}`}
                      readOnly
                      className={
                        inputClass +
                        " font-black text-sky-600 dark:text-sky-400 cursor-not-allowed"
                      }
                    />
                  </Field>
                </div>
                <Field label="GST Paid By" error={fieldErrors.gstPaidBy}>
                  <div className="relative">
                    <select
                      value={form.gstPaidBy}
                      onChange={set("gstPaidBy")}
                      className={inputClass + " appearance-none pr-10"}
                    >
                      <option value="">Select who pays GST</option>
                      <option value="CONSIGNOR">Consignor</option>
                      <option value="CONSIGNEE">Consignee</option>
                      <option value="TRANSPORTER">Transporter</option>
                    </select>
                    <ChevronDown
                      size={15}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </Field>
                {/* <Field label="Payment Status">
                  <div className="relative">
                    <select value={form.paymentStatus} onChange={set('paymentStatus')} className={inputClass + ' appearance-none pr-10'}>
                      <option value={PaymentStatus.PENDING}>Pending</option>
                      <option value={PaymentStatus.PAID}>Paid</option>
                    </select>
                    <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </Field> */}
              </section>

              {/* SECTION: Vehicle & Driver */}
              <section className="space-y-4">
                <Field label="Vehicle Number" error={fieldErrors.vehicleNumber}>
                  <input
                    placeholder="e.g. MH04 AB 1234"
                    value={form.vehicleNumber}
                    onChange={set("vehicleNumber")}
                    onBlur={blur("vehicleNumber")}
                    maxLength={20}
                    className={cn(
                      inputClass,
                      fieldErrors.vehicleNumber && errorInputClass,
                    )}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Driver Name" error={fieldErrors.driverName}>
                    <input
                      placeholder="Driver's full name"
                      value={form.driverName}
                      onChange={set("driverName")}
                      onBlur={blur("driverName")}
                      maxLength={60}
                      className={cn(
                        inputClass,
                        fieldErrors.driverName && errorInputClass,
                      )}
                    />
                  </Field>
                  <Field
                    label="Driver Document ID"
                    error={fieldErrors.driverDocumentId}
                  >
                    <input
                      placeholder="Licence / Aadhar No."
                      value={form.driverDocumentId}
                      onChange={set("driverDocumentId")}
                      maxLength={60}
                      className={cn(
                        inputClass,
                        fieldErrors.driverDocumentId && errorInputClass,
                      )}
                    />
                  </Field>
                </div>

                {/* ── Driver Mobile ── */}
                <Field label="Driver Mobile" error={fieldErrors.driverMobile}>
                  <div className="relative">
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="9XXXXXXXXX"
                      value={form.driverMobile}
                      onChange={handleDriverMobileChange}
                      onBlur={blur("driverMobile")}
                      maxLength={10}
                      className={cn(
                        inputClass,
                        fieldErrors.driverMobile && errorInputClass,
                        !fieldErrors.driverMobile &&
                          form.driverMobile.length === 10 &&
                          "!border-sky-500",
                      )}
                    />
                    {form.driverMobile.length > 0 && (
                      <span
                        className={cn(
                          "absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold tabular-nums pointer-events-none",
                          form.driverMobile.length === 10
                            ? "text-sky-500"
                            : "text-slate-400",
                        )}
                      >
                        {form.driverMobile.length}/10
                      </span>
                    )}
                  </div>
                </Field>
              </section>

              {/* SECTION: Remarks */}
              <section className="space-y-4">
                <Field label="Remarks" error={fieldErrors.remarks}>
                  <textarea
                    placeholder="Any additional notes..."
                    value={form.remarks}
                    onChange={set("remarks")}
                    onBlur={blur("remarks")}
                    rows={3}
                    maxLength={300}
                    className={cn(
                      inputClass,
                      "h-auto resize-none py-3",
                      fieldErrors.remarks && errorInputClass,
                    )}
                  />
                </Field>
              </section>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="h-20 border-t border-slate-100 dark:border-slate-800 px-10 flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            className="h-12 px-10 bg-sky-700 hover:bg-sky-800 text-white rounded-xl font-bold text-sm tracking-tight transition-all active:scale-95 shadow-lg shadow-sky-500/25 disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving && <Loader2 size={15} className="animate-spin" />}
            {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create GR"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Field({
  label,
  children,
  required,
  error,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-tight">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[10px] text-red-500 font-bold flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all";
const errorInputClass = "!border-red-500 !ring-red-500/20";
