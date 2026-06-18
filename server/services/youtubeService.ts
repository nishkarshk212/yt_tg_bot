import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

interface Video {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: number;
  likeCount: number;
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  thumbnail: string;
  videoCount: number;
}

interface StreamInfo {
  url: string;
  quality: string;
  format: string;
  size: number;
}

export async function searchVideos(query: string, limit: number = 10): Promise<Video[]> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: limit,
      },
    });

    const videoIds = response.data.items.map((item: any) => item.id.videoId).join(',');

    const detailsResponse = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'contentDetails,statistics',
        id: videoIds,
      },
    });

    const videos: Video[] = response.data.items.map((item: any, index: number) => {
      const details = detailsResponse.data.items[index];
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        duration: details?.contentDetails?.duration || '',
        viewCount: parseInt(details?.statistics?.viewCount || '0'),
        likeCount: parseInt(details?.statistics?.likeCount || '0'),
      };
    });

    return videos;
  } catch (error) {
    console.error('YouTube search error:', error);
    throw new Error('Failed to search videos');
  }
}

export async function getVideoDetails(videoId: string): Promise<Video> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet,contentDetails,statistics',
        id: videoId,
      },
    });

    const item = response.data.items[0];
    if (!item) {
      throw new Error('Video not found');
    }

    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url,
      publishedAt: item.snippet.publishedAt,
      duration: item.contentDetails.duration,
      viewCount: parseInt(item.statistics.viewCount),
      likeCount: parseInt(item.statistics.likeCount || '0'),
    };
  } catch (error) {
    console.error('YouTube video details error:', error);
    throw new Error('Failed to get video details');
  }
}

export async function getStreamUrl(videoId: string, quality: string = 'highest'): Promise<StreamInfo> {
  try {
    // Using a third-party service for stream URLs
    // In production, you might want to use ytdl-core or similar
    const response = await axios.get(`https://api.cobalt.tools/api/json`, {
      method: 'POST',
      data: {
        url: `https://www.youtube.com/watch?v=${videoId}`,
        vCodec: 'h264',
        vQuality: quality,
        aFormat: 'mp3',
      },
    });

    return {
      url: response.data.url,
      quality: quality,
      format: 'mp4',
      size: response.data.size || 0,
    };
  } catch (error) {
    console.error('Stream URL error:', error);
    throw new Error('Failed to get stream URL');
  }
}

export async function getPlaylistDetails(playlistId: string): Promise<Playlist> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/playlists`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet,contentDetails',
        id: playlistId,
      },
    });

    const item = response.data.items[0];
    if (!item) {
      throw new Error('Playlist not found');
    }

    return {
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      videoCount: item.contentDetails.itemCount,
    };
  } catch (error) {
    console.error('YouTube playlist error:', error);
    throw new Error('Failed to get playlist details');
  }
}

export async function getThumbnail(videoId: string, quality: string = 'maxresdefault'): Promise<string> {
  const qualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'default'];
  const selectedQuality = qualities.includes(quality) ? quality : 'maxresdefault';
  return `https://img.youtube.com/vi/${videoId}/${selectedQuality}.jpg`;
}

export async function getRelatedVideos(videoId: string, limit: number = 10): Promise<Video[]> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/search`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        relatedToVideoId: videoId,
        type: 'video',
        maxResults: limit,
      },
    });

    const videoIds = response.data.items.map((item: any) => item.id.videoId).join(',');

    const detailsResponse = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'contentDetails,statistics',
        id: videoIds,
      },
    });

    const videos: Video[] = response.data.items.map((item: any, index: number) => {
      const details = detailsResponse.data.items[index];
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        publishedAt: item.snippet.publishedAt,
        duration: details?.contentDetails?.duration || '',
        viewCount: parseInt(details?.statistics?.viewCount || '0'),
        likeCount: parseInt(details?.statistics?.likeCount || '0'),
      };
    });

    return videos;
  } catch (error) {
    console.error('YouTube related videos error:', error);
    throw new Error('Failed to get related videos');
  }
}

export async function getComments(videoId: string, limit: number = 20): Promise<any[]> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/commentThreads`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'snippet',
        videoId: videoId,
        maxResults: limit,
        order: 'relevance',
      },
    });

    return response.data.items.map((item: any) => ({
      id: item.id,
      author: item.snippet.topLevelComment.snippet.authorDisplayName,
      authorProfileImage: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
      text: item.snippet.topLevelComment.snippet.textDisplay,
      likeCount: item.snippet.topLevelComment.snippet.likeCount,
      publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('YouTube comments error:', error);
    throw new Error('Failed to get comments');
  }
}
