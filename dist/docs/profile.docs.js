"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.updatePolRepProfile = exports.getAllPolRepProfile = exports.getPolRepProfil = exports.createProfileSwagger = exports.uploadProfileImage = void 0;
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
 * /api/v1/profile:
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
exports.getPolRepProfil = `
/**
 * @swagger
 * /api/v1/profile/:
 *   get:
 *     summary: Get Political Representative Profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Political Representative profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Profile retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     profession:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "prof_12345"
 *                           position:
 *                             type: string
 *                             example: "Mayor"
 *                           term:
 *                             type: string
 *                             example: "2015-2019"
 *                           startDate:
 *                             type: string
 *                             format: date
 *                             example: "2015-01-01"
 *                           endDate:
 *                             type: string
 *                             format: date
 *                             example: "2019-12-31"
 *                     education:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           institution:
 *                             type: string
 *                             example: "Harvard University"
 *                           city:
 *                             type: string
 *                             example: "Cambridge"
 *                           startDate:
 *                             type: string
 *                             format: date
 *                             example: "2005-09-01"
 *                           endDate:
 *                             type: string
 *                             format: date
 *                             example: "2009-06-15"
 *                     politicalParty:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           partyName:
 *                             type: string
 *                             example: "Democratic Party"
 *                           yearJoined:
 *                             type: string
 *                             example: "2010"
 *                     previousRole:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           position:
 *                             type: string
 *                             example: "City Council Member"
 *                           startDate:
 *                             type: string
 *                             format: date
 *                             example: "2010-01-01"
 *                           endDate:
 *                             type: string
 *                             format: date
 *                             example: "2014-12-31"
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       403:
 *         description: Forbidden. The user does not have the required role.
 *       404:
 *         description: Profile not found.
 *       500:
 *         description: Server error.
 */
`;
exports.getAllPolRepProfile = `/**
 * @swagger
 * /api/v1/profile/political-profile:
 *   get:
 *     summary: Get all Political Representative Profiles
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all Political Representative profiles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Profiles retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       profession:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "prof_12345"
 *                             position:
 *                               type: string
 *                               example: "Mayor"
 *                             term:
 *                               type: string
 *                               example: "2015-2019"
 *                             startDate:
 *                               type: string
 *                               format: date
 *                               example: "2015-01-01"
 *                             endDate:
 *                               type: string
 *                               format: date
 *                               example: "2019-12-31"
 *                       education:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             institution:
 *                               type: string
 *                               example: "Harvard University"
 *                             city:
 *                               type: string
 *                               example: "Cambridge"
 *                             startDate:
 *                               type: string
 *                               format: date
 *                               example: "2005-09-01"
 *                             endDate:
 *                               type: string
 *                               format: date
 *                               example: "2009-06-15"
 *                       politicalParty:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             partyName:
 *                               type: string
 *                               example: "Democratic Party"
 *                             yearJoined:
 *                               type: string
 *                               example: "2010"
 *                       previousRole:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             position:
 *                               type: string
 *                               example: "City Council Member"
 *                             startDate:
 *                               type: string
 *                               format: date
 *                               example: "2010-01-01"
 *                             endDate:
 *                               type: string
 *                               format: date
 *                               example: "2014-12-31"
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       403:
 *         description: Forbidden. The user does not have the required role.
 *       500:
 *         description: Server error.
 */
`;
exports.updatePolRepProfile = `
/**
 * @swagger
 * /api/v1/profile/political-profile:
 *   put:
 *     summary: Update a Political Representative's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profession:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     position:
 *                       type: string
 *                       example: "Mayor"
 *                     term:
 *                       type: string
 *                       example: "2015-2019"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2015-01-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2019-12-31"
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     institution:
 *                       type: string
 *                       example: "Harvard University"
 *                     city:
 *                       type: string
 *                       example: "Cambridge"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2005-09-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2009-06-15"
 *               politicalParty:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     partyName:
 *                       type: string
 *                       example: "Democratic Party"
 *                     yearJoined:
 *                       type: string
 *                       example: "2010"
 *               previousRole:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     position:
 *                       type: string
 *                       example: "City Council Member"
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: "2010-01-01"
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: "2014-12-31"
 *     responses:
 *       200:
 *         description: Political profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Political profile updated successfully.
 *       400:
 *         description: Invalid role or bad request.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       403:
 *         description: Forbidden. The user does not have the required role.
 *       404:
 *         description: Political profile not found for this user.
 *       500:
 *         description: Server error.
 */

`;
exports.updateProfile = `
/**
 * @swagger
 * /api/v1/profile:
 *   put:
 *     summary: Update a user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               state:
 *                 type: string
 *                 example: "California"
 *               local_gov:
 *                 type: string
 *                 example: "Los Angeles"
 *               facebookUrl:
 *                 type: string
 *                 example: "https://facebook.com/johndoe"
 *               xUrl:
 *                 type: string
 *                 example: "https://x.com/johndoe"
 *               linkedinUrl:
 *                 type: string
 *                 example: "https://linkedin.com/in/johndoe"
 *               instagramUrl:
 *                 type: string
 *                 example: "https://instagram.com/johndoe"
 *     responses:
 *       200:
 *         description: Profile saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Profile saved
 *       400:
 *         description: Bad request or invalid data
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Server error.
 */

`;
