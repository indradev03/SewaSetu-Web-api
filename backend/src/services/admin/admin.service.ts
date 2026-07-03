import { HttpException } from "../../exceptions/http-exception";
import { AdminRepository } from "../../repositories/admin/admin.repository";

export class AdminService {
  // DASHBOARD

  async dashboard() {
    const [totalDonors, totalAdmins, totalNGOs, verifiedNGOs, pendingNGOs] =
      await Promise.all([
        AdminRepository.getTotalDonors(),
        AdminRepository.getTotalAdmins(),
        AdminRepository.getTotalNGOs(),
        AdminRepository.getVerifiedNGOs(),
        AdminRepository.getPendingNGOs(),
      ]);

    return {
      totalDonors,
      totalAdmins,
      totalNGOs,
      verifiedNGOs,
      pendingNGOs,
    };
  }

  // DONORS

  async getAllDonors(page?: string, limit?: string, search?: string) {
    const currentPage = page ? parseInt(page) : 1;
    const currentLimit = limit ? parseInt(limit) : 7;

    const { data, total } = await AdminRepository.getAllDonors(
      currentPage,
      currentLimit,
      search,
    );

    if (!data) {
      throw new HttpException(404, "No donors found");
    }

    const pagination = {
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages: Math.ceil(total / currentLimit),
    };

    return {
      data,
      pagination,
    };
  }

  async getDonorById(id: string) {
    const donor = await AdminRepository.getDonorById(id);

    if (!donor) {
      throw new HttpException(404, "Donor not found");
    }

    return donor;
  }

  async deleteDonor(id: string) {
    const deleted = await AdminRepository.deleteDonor(id);

    if (!deleted) {
      throw new HttpException(404, "Donor not found");
    }

    return deleted;
  }

  // NGOs

  async getAllNGOs(page?: string, limit?: string, search?: string) {
    const currentPage = page ? parseInt(page) : 1;
    const currentLimit = limit ? parseInt(limit) : 7;

    const { data, total } = await AdminRepository.getAllNGOs(
      currentPage,
      currentLimit,
      search,
    );

    if (!data) {
      throw new HttpException(404, "No NGOs found");
    }

    const pagination = {
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages: Math.ceil(total / currentLimit),
    };

    return {
      data,
      pagination,
    };
  }

  async getNGOById(id: string) {
    const ngo = await AdminRepository.getNGOById(id);

    if (!ngo) {
      throw new HttpException(404, "NGO not found");
    }

    return ngo;
  }

  async deleteNGO(id: string) {
    const deleted = await AdminRepository.deleteNGO(id);

    if (!deleted) {
      throw new HttpException(404, "NGO not found");
    }

    return deleted;
  }
}
