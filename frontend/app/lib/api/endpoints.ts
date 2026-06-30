export const API = {
  DONOR: {
    REGISTER: "/donor/register",
    LOGIN: "/donor/login",

    PROFILE: "/donor/profile",
    UPDATE_PROFILE: "/donor/profile",
    DELETE_PROFILE: "/donor/profile",
    REMOVE_PROFILE_IMAGE: "/donor/profile/image",
    CHANGE_PASSWORD: "/donor/profile/change-password",
  },

  NGO: {
    REGISTER: "/ngo/register",
    LOGIN: "/ngo/login",

    PROFILE: "/ngo/profile",
    VERIFIED: "/ngo/verified",

    // Admin-only — lives under /ngo because that's where the backend mounted it
    VERIFY: (id: string) => `/ngo/verify/${id}`,
  },

  ADMIN: {
    // Dashboard
    DASHBOARD: "/admin/dashboard",

    // Donors
    DONORS: "/admin/donors",
    DONOR_BY_ID: (id: string) => `/admin/donors/${id}`,
    DELETE_DONOR: (id: string) => `/admin/donors/${id}`,

    // NGOs
    NGOS: "/admin/ngos",
    NGO_BY_ID: (id: string) => `/admin/ngos/${id}`,
    DELETE_NGO: (id: string) => `/admin/ngos/${id}`,
  },
};
