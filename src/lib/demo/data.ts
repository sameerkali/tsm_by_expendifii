import type { Customer, CustomerListResponse, CustomerResponse } from '@/types/customer';
import type { GR } from '@/types/gr';
import { BillingType, GRStatus, PaymentStatus, PricingType } from '@/types/gr';
import type { PaginatedGRResponse, GetGRsParams } from '@/lib/api/gr.api';
import type { CustomerListParams } from '@/lib/api/customer.api';
import type { DashboardData } from '@/lib/api/dashboard.api';
import type { ApiResponse } from '@/types/api';

const createdAt = '2026-05-01T10:00:00.000Z';
const userId = 'guest-user';

export const demoCustomers: Customer[] = [
  ['demo-customer-01', 'Sharma Traders', '9811223344', 'accounts@sharmatraders.in', '07AAXCS1234F1Z5', 'Delhi', 'Delhi', 'BOX', 150],
  ['demo-customer-02', 'Bengal Goods Co', '9733445566', 'ops@bengalgoods.in', '19AABCB5678K1Z2', 'Kolkata', 'West Bengal', 'BOX', 80],
  ['demo-customer-03', 'Patel Industries', '9922334455', 'dispatch@patelind.in', '27AAECP9988L1Z7', 'Pune', 'Maharashtra', 'KM', 12],
  ['demo-customer-04', 'Tamil Textiles', '9444556677', 'sales@tamiltextiles.in', '33AAACT4455M1Z1', 'Chennai', 'Tamil Nadu', 'KG', 8],
  ['demo-customer-05', 'Raj Enterprises', '9876543210', 'raj@enterprises.in', '27AABFR2345Q1Z8', 'Mumbai', 'Maharashtra', 'TON', 2200],
  ['demo-customer-06', 'Karnataka Cloth House', '9345678901', 'billing@kcloth.in', '29AACCK7788D1Z4', 'Bangalore', 'Karnataka', 'BOX', 95],
  ['demo-customer-07', 'Bihar Distributors', '9123456780', 'orders@bihardist.in', '10AABCB7890R1Z3', 'Patna', 'Bihar', 'QUINTAL', 320],
  ['demo-customer-08', 'Western Auto Parts', '9988776655', 'fleet@waparts.in', '24AAACW1122H1Z9', 'Ahmedabad', 'Gujarat', 'KG', 11],
  ['demo-customer-09', 'Odisha Minerals', '9090909090', 'logistics@odishaminerals.in', '21AAACO3344N1Z6', 'Bhubaneswar', 'Odisha', 'TON', 1850],
  ['demo-customer-10', 'Hyderabad Pharma', '9700011122', 'ship@hydpharma.in', '36AAACH5566P1Z2', 'Hyderabad', 'Telangana', 'BOX', 125],
  ['demo-customer-11', 'Punjab Agro Supply', '9870012300', 'supply@punjabagro.in', '03AAACP6677S1Z5', 'Ludhiana', 'Punjab', 'QUINTAL', 280],
  ['demo-customer-12', 'Kerala Spices Export', '9847012345', 'export@kspices.in', '32AAACK8899T1Z1', 'Kochi', 'Kerala', 'KG', 16],
].map(([id, name, phone, email, gstin, city, state, pricingType, defaultRate]) => ({
  id: String(id),
  userId,
  name: String(name),
  phone: String(phone),
  email: String(email),
  gstin: String(gstin),
  address: `Demo address, ${city}`,
  city: String(city),
  state: String(state),
  pincode: '400001',
  pricingType: pricingType as Customer['pricingType'],
  defaultRate: Number(defaultRate),
  isDeleted: false,
  deletedAt: null,
  createdAt,
  updatedAt: createdAt,
}));

const grSeeds = [
  ['GR-0001', '2026-05-01', 'Delhi', 'Mumbai', 'Sharma Traders', 'Raj Enterprises', 'Electronic Components', 120.5, 10, PricingType.BOX, 150, 1500, 'DL01AB1234', 'Ramesh Kumar', '9811223344', PaymentStatus.PENDING, GRStatus.BOOKED, 0],
  ['GR-0002', '2026-05-02', 'Kolkata', 'Patna', 'Bengal Goods Co', 'Bihar Distributors', 'Rice Bags', 1000, 50, PricingType.BOX, 80, 4000, 'WB01GH3456', 'Bikash Das', '9733445566', PaymentStatus.PENDING, GRStatus.IN_TRANSIT, 1],
  ['GR-0003', '2026-05-03', 'Pune', 'Nashik', 'Patel Industries', 'Joshi Brothers', 'Automobile Parts', 340, 4, PricingType.KM, 12, 1800, 'MH12CD5678', 'Suresh Patil', '9922334455', PaymentStatus.PAID, GRStatus.DELIVERED, 2],
  ['GR-0004', '2026-05-04', 'Chennai', 'Bangalore', 'Tamil Textiles', 'Karnataka Cloth House', 'Cotton Fabric Rolls', 580, 20, PricingType.KG, 8, 4640, 'TN09EF9012', 'Murugan S', '9444556677', PaymentStatus.PENDING, GRStatus.BOOKED, 3],
  ['GR-0005', '2026-05-05', 'Mumbai', 'Ahmedabad', 'Raj Enterprises', 'Western Auto Parts', 'Machine Tools', 750, 12, PricingType.TON, 2200, 6600, 'MH04JK7788', 'Imran Shaikh', '9876543210', PaymentStatus.PAID, GRStatus.IN_TRANSIT, 4],
  ['GR-0006', '2026-05-06', 'Bangalore', 'Chennai', 'Karnataka Cloth House', 'Tamil Textiles', 'Finished Garments', 420, 35, PricingType.BOX, 95, 3325, 'KA03LM4567', 'Prakash N', '9345678901', PaymentStatus.PENDING, GRStatus.DELIVERED, 5],
  ['GR-0007', '2026-05-07', 'Patna', 'Kolkata', 'Bihar Distributors', 'Bengal Goods Co', 'Pulses', 900, 45, PricingType.QUINTAL, 320, 2880, 'BR01MN2233', 'Vijay Singh', '9123456780', PaymentStatus.PENDING, GRStatus.BOOKED, 6],
  ['GR-0008', '2026-05-08', 'Ahmedabad', 'Pune', 'Western Auto Parts', 'Patel Industries', 'Brake Assemblies', 510, 8, PricingType.KG, 11, 5610, 'GJ01PQ9988', 'Hardik Patel', '9988776655', PaymentStatus.PAID, GRStatus.IN_TRANSIT, 7],
  ['GR-0009', '2026-05-09', 'Bhubaneswar', 'Hyderabad', 'Odisha Minerals', 'Hyderabad Pharma', 'Industrial Minerals', 2200, 18, PricingType.TON, 1850, 9250, 'OD02RS4455', 'Amit Nayak', '9090909090', PaymentStatus.PENDING, GRStatus.BOOKED, 8],
  ['GR-0010', '2026-05-10', 'Hyderabad', 'Ludhiana', 'Hyderabad Pharma', 'Punjab Agro Supply', 'Medical Supplies', 260, 28, PricingType.BOX, 125, 3500, 'TS08TU1122', 'Naveen Rao', '9700011122', PaymentStatus.PAID, GRStatus.DELIVERED, 9],
  ['GR-0011', '2026-05-11', 'Ludhiana', 'Kochi', 'Punjab Agro Supply', 'Kerala Spices Export', 'Agro Equipment', 830, 14, PricingType.QUINTAL, 280, 2324, 'PB10VW7788', 'Gurpreet Singh', '9870012300', PaymentStatus.PENDING, GRStatus.IN_TRANSIT, 10],
  ['GR-0012', '2026-05-12', 'Kochi', 'Delhi', 'Kerala Spices Export', 'Sharma Traders', 'Spice Cartons', 390, 26, PricingType.KG, 16, 6240, 'KL07XY3344', 'Anoop Menon', '9847012345', PaymentStatus.PAID, GRStatus.BOOKED, 11],
] as const;

export const demoGRs: GR[] = grSeeds.map((row, index) => {
  const customer = demoCustomers[row[17]];
  return {
    id: `demo-gr-${String(index + 1).padStart(2, '0')}`,
    userId,
    grNumber: row[0],
    bookingDate: `${row[1]}T00:00:00.000Z`,
    fromCity: row[2],
    toCity: row[3],
    consignor: row[4],
    consignee: row[5],
    productDescription: row[6],
    weight: row[7],
    boxCount: row[8],
    billingType: BillingType.TO_BE_BILLED,
    pricingType: row[9],
    rate: row[10],
    freightAmount: row[11],
    vehicleNumber: row[12],
    driverName: row[13],
    driverMobile: row[14],
    paymentStatus: row[15],
    status: row[16],
    remarks: 'Demo record for guest preview.',
    isDeleted: false,
    deletedAt: null,
    createdAt,
    updatedAt: createdAt,
    customer: customer ? {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,
    } : undefined,
  };
});

function paginate<T>(items: T[], page = 1, limit = 10) {
  const currentPage = Math.max(page, 1);
  const currentLimit = Math.max(limit, 1);
  const total = items.length;
  const totalPages = Math.max(Math.ceil(total / currentLimit), 1);
  const start = (currentPage - 1) * currentLimit;
  return {
    data: items.slice(start, start + currentLimit),
    pagination: {
      currentPage,
      totalPages,
      total,
      limit: currentLimit,
    },
  };
}

export function getDemoGRResponse(params?: GetGRsParams): PaginatedGRResponse {
  const search = params?.search?.toLowerCase().trim();
  const status = params?.status;
  let items = [...demoGRs];

  if (status) items = items.filter((gr) => gr.status === status);
  if (search) {
    items = items.filter((gr) =>
      [gr.grNumber, gr.consignor, gr.consignee, gr.vehicleNumber, gr.fromCity, gr.toCity]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search))
    );
  }

  return {
    success: true,
    ...paginate(items, params?.page, params?.limit ?? 10),
  };
}

export function getDemoCustomerResponse(params?: CustomerListParams): CustomerListResponse {
  const search = params?.search?.toLowerCase().trim();
  let items = [...demoCustomers];

  if (search) {
    items = items.filter((customer) =>
      [customer.name, customer.phone, customer.email, customer.gstin, customer.city]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search))
    );
  }

  return {
    success: true,
    ...paginate(items, params?.page, params?.limit ?? 10),
  };
}

export function getDemoCustomerById(id: string): CustomerResponse {
  const customer = demoCustomers.find((item) => item.id === id);
  if (!customer) {
    throw { success: false, message: 'Demo customer not found.' };
  }
  return { success: true, data: customer };
}

export function getDemoDashboardResponse(): ApiResponse<DashboardData> {
  const grs = {
    total: demoGRs.length,
    booked: demoGRs.filter((gr) => gr.status === GRStatus.BOOKED).length,
    inTransit: demoGRs.filter((gr) => gr.status === GRStatus.IN_TRANSIT).length,
    delivered: demoGRs.filter((gr) => gr.status === GRStatus.DELIVERED).length,
  };

  const paidRevenue = demoGRs
    .filter((gr) => gr.paymentStatus === PaymentStatus.PAID)
    .reduce((sum, gr) => sum + (gr.freightAmount ?? 0), 0);

  const pendingRevenue = demoGRs
    .filter((gr) => gr.paymentStatus === PaymentStatus.PENDING)
    .reduce((sum, gr) => sum + (gr.freightAmount ?? 0), 0);

  const totalRevenue = paidRevenue + pendingRevenue;

  const revenue = {
    total: totalRevenue,
    pending: pendingRevenue,
    paid: paidRevenue,
  };

  const payment = {
    pending: pendingRevenue,
    paid: paidRevenue,
  };

  // Customers count by GR count
  const customerMap: Record<string, { grCount: number; revenue: number; name: string; phone: string }> = {};

  demoCustomers.forEach((c) => {
    customerMap[c.name] = { grCount: 0, revenue: 0, name: c.name, phone: c.phone };
  });

  demoGRs.forEach((gr) => {
    const name = gr.consignor;
    if (!customerMap[name]) {
      customerMap[name] = { grCount: 0, revenue: 0, name, phone: gr.customer?.phone || gr.driverMobile || '' };
    }
    customerMap[name].grCount += 1;
    customerMap[name].revenue += gr.freightAmount ?? 0;
  });

  const customerList = Object.values(customerMap);

  const topCustomersByGRCount = [...customerList]
    .sort((a, b) => b.grCount - a.grCount)
    .slice(0, 5)
    .map((c, idx) => ({
      grCount: c.grCount,
      customerId: `demo-cust-gr-${idx}`,
      name: c.name,
      phone: c.phone,
    }));

  const topCustomersByRevenue = [...customerList]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((c, idx) => ({
      revenue: c.revenue,
      customerId: `demo-cust-rev-${idx}`,
      name: c.name,
      phone: c.phone,
    }));

  const recentGRs = demoGRs
    .slice(0, 5)
    .map((gr) => ({
      grNumber: gr.grNumber,
      bookingDate: gr.bookingDate,
      fromCity: gr.fromCity,
      toCity: gr.toCity,
      freightAmount: gr.freightAmount ?? 0,
      paymentStatus: gr.paymentStatus,
      status: gr.status,
      grId: gr.id,
    }));

  return {
    success: true,
    data: {
      grs,
      revenue,
      payment,
      totalCustomers: demoCustomers.length,
      topCustomersByGRCount,
      topCustomersByRevenue,
      recentGRs,
    },
  };
}
