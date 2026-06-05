
/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a short URL
 *     tags:
 *       - URLs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originalUrl
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: https://github.com
 *               customAlias:
 *                 type: string
 *                 example: github
 *     responses:
 *       201:
 *         description: URL created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Alias already exists
 */

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Redirect to original URL
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to original URL
 *       404:
 *         description: URL not found
 *       410:
 *         description: Link expired, deleted, or inactive
 */

/**
 * @swagger
 * /stats/{shortCode}:
 *   get:
 *     summary: Get URL statistics
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Statistics fetched successfully
 *       404:
 *         description: URL not found
 */

/**
 * @swagger
 * /analytics/{shortCode}:
 *   get:
 *     summary: Get analytics for a URL
 *     tags:
 *       - Analytics
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Analytics fetched successfully
 *       404:
 *         description: URL not found
 */

/**
 * @swagger
 * /expiration/{shortCode}:
 *   patch:
 *     summary: Update expiration date
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - expiresAt
 *             properties:
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Expiration updated successfully
 *       404:
 *         description: URL not found
 */

/**
 * @swagger
 * /linkStatus/{shortCode}:
 *   patch:
 *     summary: Activate or deactivate URL
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Status updated successfully
 *       404:
 *         description: URL not found
 */


/**
 * @swagger
 * /deleteUrl/{shortCode}:
 *   delete:
 *     summary: Soft delete a URL
 *     tags:
 *       - URLs
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: URL deleted successfully
 *       404:
 *         description: URL not found
 */