/**
 * The product video: a short, real recording of creating and printing a GR.
 *
 * Leave PRODUCT_VIDEO as null until the video is on YouTube. The video block
 * (and its VideoObject schema) renders only when this is set, on
 * /gr-software and /bilty-software. Shot list and script:
 * docs/video-and-case-study-kit.md
 *
 * Example:
 *   export const PRODUCT_VIDEO = {
 *     youtubeId: 'AbCdEfGhIjk',
 *     title: 'How to create and print a GR (bilty) in BiltyOne',
 *     description: 'Create a GR in under 2 minutes and print driver, consignor and consignee copies.',
 *     uploadDate: '2026-12-01',
 *     duration: 'PT1M45S', // ISO 8601: 1 min 45 s
 *   } as ProductVideo | null;
 */

export interface ProductVideo {
  youtubeId: string;
  title: string;
  description: string;
  /** YYYY-MM-DD, the YouTube publish date. */
  uploadDate: string;
  /** ISO 8601 duration, e.g. 'PT1M45S'. */
  duration: string;
}

export const PRODUCT_VIDEO = null as ProductVideo | null;
