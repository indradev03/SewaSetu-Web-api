import Donation, { IDonation } from "../models/donation.model";
import { CreateDonationType, UpdateDonationType } from "../dtos/donation.dto";

export const DonationRepository = {
  // ── Create
  async create(
    data: CreateDonationType & { donorId: string },
  ): Promise<IDonation> {
    return await Donation.create(data);
  },

  // ── Find ──
  async findById(id: string): Promise<IDonation | null> {
    return await Donation.findById(id).populate(
      "donorId",
      "username fullName email profileImage",
    );
  },

  async findByDonorId(donorId: string): Promise<IDonation[]> {
    return await Donation.find({ donorId })
      .sort({ createdAt: -1 })
      .populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  async findAll(filters?: {
    status?: string;
    category?: string;
    donorId?: string;
  }): Promise<IDonation[]> {
    const query: any = {};
    if (filters?.status) query.status = filters.status;
    if (filters?.category) query.category = filters.category;
    if (filters?.donorId) query.donorId = filters.donorId;

    return await Donation.find(query)
      .sort({ createdAt: -1 })
      .populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  // ── Update
  async updateById(
    id: string,
    data: UpdateDonationType,
  ): Promise<IDonation | null> {
    return await Donation.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    ).populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  async updateStatus(
    id: string,
    status: string,
    estimatedPickupTime?: Date,
    pointsEarned?: number,
  ): Promise<IDonation | null> {
    const updateData: any = { status };
    if (estimatedPickupTime)
      updateData.estimatedPickupTime = estimatedPickupTime;
    if (pointsEarned !== undefined) updateData.pointsEarned = pointsEarned;

    return await Donation.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  // ── Delete
  async deleteById(id: string): Promise<IDonation | null> {
    return await Donation.findByIdAndDelete(id);
  },

  // ── Exists
  async exists(id: string): Promise<boolean> {
    const doc = await Donation.exists({ _id: id });
    return !!doc;
  },

  // ── Count
  async countByDonorId(donorId: string): Promise<number> {
    return await Donation.countDocuments({ donorId });
  },

  async countByStatus(status: string): Promise<number> {
    return await Donation.countDocuments({ status });
  },

  // ── Admin Approval Methods
  async updateAdminStatus(
    id: string,
    adminStatus: string,
    adminRejectionReason?: string,
  ): Promise<IDonation | null> {
    const updateData: any = { adminStatus };
    if (adminRejectionReason)
      updateData.adminRejectionReason = adminRejectionReason;

    return await Donation.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    ).populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  async findPendingApprovals(): Promise<IDonation[]> {
    return await Donation.find({ adminStatus: "Pending" })
      .sort({ createdAt: -1 })
      .populate("donorId", "username fullName email profileImage");
  },

  async findApprovedDonations(): Promise<IDonation[]> {
    return await Donation.find({
      adminStatus: "Approved",
      status: "Available",
    })
      .sort({ createdAt: -1 })
      .populate("donorId", "username fullName email profileImage");
  },

  // ── NGO Claim Methods
  async findAvailableDonations(): Promise<IDonation[]> {
    return await Donation.find({
      adminStatus: "Approved",
      $or: [
        { status: "Available" },
        { status: { $exists: false } }
      ]
    })
      .sort({ createdAt: -1 })
      .populate("donorId", "username fullName email profileImage");
  },

  async findClaimedByNgo(ngoId: string): Promise<IDonation[]> {
    return await Donation.find({ claimedByNgoId: ngoId })
      .sort({ createdAt: -1 })
      .populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  async releaseClaim(id: string, ngoId: string): Promise<IDonation | null> {
    return await Donation.findByIdAndUpdate(
      id,
      {
        $set: {
          claimedByNgoId: null,
          status: "Available",
          claimedAt: null,
        },
      },
      { new: true },
    )
      .populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  async claimDonation(
    id: string,
    ngoId: string,
  ): Promise<IDonation | null> {
    return await Donation.findByIdAndUpdate(
      id,
      {
        $set: {
          claimedByNgoId: ngoId,
          status: "Claimed",
          claimedAt: new Date(),
        },
      },
      { new: true },
    )
      .populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  async markPickedUp(id: string): Promise<IDonation | null> {
    return await Donation.findByIdAndUpdate(
      id,
      { $set: { status: "PickedUp" } },
      { new: true },
    )
      .populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  async markCompleted(
    id: string,
    rewardPointsAwarded: number,
  ): Promise<IDonation | null> {
    return await Donation.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "Completed",
          rewardPointsAwarded,
          rewardGranted: true,
        },
      },
      { new: true },
    )
      .populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  async findByStatus(status: string): Promise<IDonation[]> {
    return await Donation.find({ status })
      .sort({ createdAt: -1 })
      .populate("donorId", "username fullName email profileImage")
      .populate("claimedByNgoId", "organizationName email contactPerson profileImage address");
  },

  async delete(id: string): Promise<IDonation | null> {
    return await Donation.findByIdAndDelete(id);
  },
};
