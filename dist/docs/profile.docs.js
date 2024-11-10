"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfileImage = void 0;
exports.uploadProfileImage = `
/**
 * @swagger
 * /api/v1/profile/upload:
 *   post:
 *     summary: Upload and update the profile image for the authenticated user
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file to upload.
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile image updated"
 *       400:
 *         description: Bad request, no file or invalid file format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No file uploaded or invalid file format"
 *       401:
 *         description: Unauthorized, the user is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not authenticated"
 *       500:
 *         description: Internal server error during file upload or profile update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
`;
