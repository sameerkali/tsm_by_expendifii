import { JsonLd } from '@/components/seo/JsonLd';
import { PRODUCT_VIDEO } from '@/config/video';
import { IDS } from '@/lib/seo';
import { LiteYouTube } from './LiteYouTube';

/**
 * The GR creation and printing video, with VideoObject schema.
 * Renders nothing until PRODUCT_VIDEO is set in src/config/video.ts.
 */
export function ProductVideo() {
  const video = PRODUCT_VIDEO;
  if (!video) return null;

  return (
    <figure className="my-10">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: video.title,
          description: video.description,
          thumbnailUrl: [`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`],
          uploadDate: video.uploadDate,
          duration: video.duration,
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
          contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
          publisher: { '@id': IDS.organization },
        }}
      />
      <LiteYouTube id={video.youtubeId} title={video.title} />
      <figcaption className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">{video.description}</figcaption>
    </figure>
  );
}
