export const API = {
  DONOR: {
    REGISTER: "/donor/register",
    LOGIN: "/donor/login",

    PROFILE: "/donor/profile",
    UPDATE_PROFILE: "/donor/profile",
    DELETE_PROFILE: "/donor/profile",
    REMOVE_PROFILE_IMAGE: "/donor/profile/image",
    CHANGE_PASSWORD: "/donor/profile/change-password",

    // Donations
    MY_DONATIONS: "/donation/my-donations",
  },

  NGO: {
    REGISTER: "/ngo/register",
    LOGIN: "/ngo/login",

    PROFILE: "/ngo/profile",
    VERIFIED: "/ngo/verified",

    VERIFY: (id: string) => `/ngo/verify/${id}`,

    // Donations
    AVAILABLE_DONATIONS: "/donation/ngo/available",
    CLAIM_DONATION: (id: string) => `/donation/ngo/${id}/claim`,
    COMPLETE_DONATION: (id: string) => `/donation/ngo/${id}/complete`,
    CLAIMED_DONATIONS: "/donation/ngo/claimed",
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

    // Rewards
    REWARDS: "/admin/rewards",
    ACTIVE_REWARDS: "/admin/rewards/active",
    REWARD_BY_ID: (id: string) => `/admin/rewards/${id}`,
    DELETE_REWARD: (id: string) => `/admin/rewards/${id}`,
    TOGGLE_REWARD_STATUS: (id: string) => `/admin/rewards/${id}/toggle-status`,

    // Donations
    PENDING_DONATIONS: "/donation/admin/pending",
    APPROVE_DONATION: (id: string) => `/donation/admin/${id}/approve`,
  },

  // Donation routes (shared)
  DONATION: {
    CREATE: "/donation",
    UPDATE: (id: string) => `/donation/${id}`,
    DELETE: (id: string) => `/donation/${id}`,
    DELETE_PHOTO: (id: string) => `/donation/${id}/photos`,
    BY_ID: (id: string) => `/donation/${id}`,
  },
};
