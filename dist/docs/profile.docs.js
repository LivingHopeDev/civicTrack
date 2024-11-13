"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileSwagger = exports.uploadProfileImage = void 0;
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
exports.createProfileSwagger = `
/**
 * @swagger
 * /api/v1/profile/create:
 *   post:
 *     summary: Create a profile for the authenticated user (Citizen or Political Representative)
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               state:
 *                 type: string
 *                 example: Lagos
 *               local_gov:
 *                 type: string
 *                 example: Ikeja
 *               xUrl:
 *                 type: string
 *                 example: https://twitter.com/johndoe
 *               linkedinUrl:
 *                 type: string
 *                 example: https://linkedin.com/in/johndoe
 *               instagramUrl:
 *                 type: string
 *                 example: https://instagram.com/johndoe
 *               facebookUrl:
 *                 type: string
 *                 example: https://facebook.com/johndoe
 *               profession:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     position:
 *                       type: string
 *                       example: Senator
 *                     term:
 *                       type: string
 *                       example: 2020-2024
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: 2020-01-01
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: 2024-01-01
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     institution:
 *                       type: string
 *                       example: Harvard University
 *                     city:
 *                       type: string
 *                       example: Boston
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: 2010-09-01
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: 2014-06-30
 *               politicalParty:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     partyName:
 *                       type: string
 *                       example: Progressive Party
 *                     yearJoined:
 *                       type: integer
 *                       example: 2015
 *               previousRole:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     position:
 *                       type: string
 *                       example: City Councilor
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: 2015-05-01
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: 2020-04-30
 *     responses:
 *       201:
 *         description: Profile successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile created"
 *       400:
 *         description: Invalid role for profile creation or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid role for profile creation"
 *       500:
 *         description: Internal server error
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
