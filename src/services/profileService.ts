import { prismaClient } from "..";
import { ResourceNotFound } from "../middlewares";
import { cloudinary } from "../utils/cloudinary";
import { getPublicIdFromUrl } from "../utils/getPublicId";
import log from "../utils/logger";
import fs from "fs";
export class ProfileService {
  public async uploadProfileImage(userId: string, file: Express.Multer.File) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "/civicTrack/profile",
      public_id: `user_${userId}`,
    });

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user.google_id && user.image_url) {
      const publicId = getPublicIdFromUrl(user.image_url);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await prismaClient.user.update({
      where: { id: userId },
      data: { image_url: result.secure_url },
    });
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("Error deleting file from server:", err);
      }
    });
    return { message: "Profile image updated" };
  }

  public async updateProfile(
    userId: string,
    payload: any
  ): Promise<{ message: string }> {
    const {
      name,
      email,
      state,
      local_gov,
      xUrl,
      linkedinUrl,
      instagramUrl,
      facebookUrl,
    } = payload;

    // Update the user details
    await prismaClient.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        state,
        local_gov,
      },
    });

    // Build an array of updated social media data
    const socialMediaData = [
      { field: "facebookUrl", value: facebookUrl },
      { field: "xUrl", value: xUrl },
      { field: "linkedinUrl", value: linkedinUrl },
      { field: "instagramUrl", value: instagramUrl },
    ].filter((item) => item.value); // Filter out null or undefined values

    if (socialMediaData.length > 0) {
      const existingSocialMedia = await prismaClient.socialMedia.findMany({
        where: { userId },
      });

      // Prepare data for updates and creations
      const updateData = [];
      const createData = [];

      socialMediaData.forEach(({ field, value }) => {
        const existing = existingSocialMedia.find((sm) => sm[field] !== null);

        if (existing) {
          updateData.push({
            where: { id: existing.id },
            data: { [field]: value },
          });
        } else {
          createData.push({ userId, [field]: value });
        }
      });
      // Perform updates individually
      for (const { where, data } of updateData) {
        await prismaClient.socialMedia.update({
          where,
          data,
        });
      }
      // Perform bulk create

      if (createData.length > 0) {
        await prismaClient.socialMedia.createMany({
          data: createData,
        });
      }
    }

    return {
      message: "Profile saved",
    };
  }

  public async createPolRepProfile(
    userId: string,
    payload: any
  ): Promise<{ message: string }> {
    const { profession, education, politicalParty, previousRole } = payload;

    // Create PoliticalProfile for the user
    const politicalProfile = await prismaClient.politicalProfile.create({
      data: {
        userId,
      },
    });

    // Create Profession records
    if (profession && profession.length > 0) {
      const professionRecords = profession.map((item: any) => ({
        politicalProfileId: politicalProfile.id,
        position: item.position,
        term: item.term,
        startDate: new Date(item.startDate),
        endDate: new Date(item.startDate),
      }));
      await prismaClient.profession.createMany({
        data: professionRecords,
      });
    }

    // Create Education records
    if (education && education.length > 0) {
      const educationRecords = education.map((item: any) => ({
        politicalProfileId: politicalProfile.id,
        institution: item.institution,
        city: item.city,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
      }));
      await prismaClient.education.createMany({
        data: educationRecords,
      });
    }

    // Create PoliticalParty records
    if (politicalParty && politicalParty.length > 0) {
      const politicalPartyRecords = politicalParty.map((party: any) => ({
        politicalProfileId: politicalProfile.id,
        partyName: party.partyName,
        yearJoined: party.yearJoined,
      }));
      await prismaClient.politicalParty.createMany({
        data: politicalPartyRecords,
      });
    }

    // Create PreviousRole records
    if (previousRole && previousRole.length > 0) {
      const previousRoleRecords = previousRole.map((role: any) => ({
        politicalProfileId: politicalProfile.id,
        position: role.position,
        startDate: new Date(role.startDate),
        endDate: new Date(role.endDate),
      }));
      await prismaClient.previousRole.createMany({
        data: previousRoleRecords,
      });
    }

    return {
      message: "Profile saved",
    };
  }
  public async getPolRepProfile(
    userId: string
  ): Promise<{ message: string; data: any }> {
    const data = await prismaClient.politicalProfile.findMany({
      where: { userId },
      include: {
        profession: true,
        education: true,
        politicalParty: true,
        previousRole: true,
      },
    });

    return {
      message: "Profile retrieved successfully",
      data,
    };
  }

  public async updatePolRepProfile(
    userId: string,
    payload: any
  ): Promise<{ message: string }> {
    const { profession, education, politicalParty, previousRole } = payload;

    const politicalProfile = await prismaClient.politicalProfile.findFirst({
      where: { userId },
    });

    if (!politicalProfile) {
      throw new ResourceNotFound("Political profile not found for this user.");
    }

    const politicalProfileId = politicalProfile.id;

    // Update professions
    await this.syncRelatedTable(
      "profession",
      profession,
      politicalProfileId,
      (item: any) => ({
        politicalProfileId,
        position: item.position,
        term: item.term,
        startDate: item.startDate,
        endDate: item.endDate,
      })
    );

    // Update education
    await this.syncRelatedTable(
      "education",
      education,
      politicalProfileId,
      (item: any) => ({
        politicalProfileId,
        institution: item.institution,
        city: item.city,
        startDate: item.startDate,
        endDate: item.endDate,
      })
    );

    // Update political parties
    await this.syncRelatedTable(
      "politicalParty",
      politicalParty,
      politicalProfileId,
      (item: any) => ({
        politicalProfileId,
        partyName: item.partyName,
        yearJoined: item.yearJoined,
      })
    );

    // Update previous roles
    await this.syncRelatedTable(
      "previousRole",
      previousRole,
      politicalProfileId,
      (item: any) => ({
        politicalProfileId,
        position: item.position,
        startDate: item.startDate,
        endDate: item.endDate,
      })
    );

    return {
      message: "Political profile updated successfully.",
    };
  }

  private async syncRelatedTable(
    tableName: string,
    records: any[],
    politicalProfileId: string,
    createDataMapper: (item: any) => any
  ) {
    const existingRecords = await prismaClient[tableName].findMany({
      where: { politicalProfileId },
    });

    const existingRecordIds = existingRecords.map((record) => record.id);

    const formRecordIds = records.map((record) => record.id).filter(Boolean);

    // Delete records not in the form submission
    const recordsToDelete = existingRecords.filter(
      (record) => !formRecordIds.includes(record.id)
    );
    for (const record of recordsToDelete) {
      await prismaClient[tableName].delete({ where: { id: record.id } });
    }

    // Process submitted records
    for (const record of records) {
      if (record.id) {
        // Check for missing fields to determine if the record should be deleted
        const hasEmptyFields = Object.values(record).some(
          (value) => value === null || value === "" || value === undefined
        );
        if (hasEmptyFields) {
          await prismaClient[tableName].delete({
            where: { id: record.id },
          });
        } else {
          // Update the record
          const updateData = Object.fromEntries(
            Object.entries(record).filter(([key, value]) => key !== "id")
          );
          await prismaClient[tableName].update({
            where: { id: record.id },
            data: updateData,
          });
        }
      } else {
        // Create new record if no ID is provided
        await prismaClient[tableName].create({
          data: createDataMapper(record),
        });
      }
    }
  }
}
