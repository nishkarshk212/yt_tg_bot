import { Router } from 'express';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import * as youtubeService from '../services/youtubeService';
import { prisma } from '../lib/prisma';

const router = Router();

// Log API usage
const logUsage = async (
  userId: string,
  apiKey: string,
  endpoint: string,
  method: string,
  statusCode: number,
  responseTime: number
) => {
  try {
    await prisma.usageLog.create({
      data: {
        userId,
        apiKeyId: apiKey,
        endpoint,
        method,
        statusCode,
        responseTime,
      },
    });
  } catch (error) {
    console.error('Failed to log usage:', error);
  }
};

// Search videos
router.get('/search', async (req: AuthRequest, res, next) => {
  const startTime = Date.now();
  try {
    const query = req.query.q as string;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!query) {
      throw new AppError('Search query is required', 400);
    }

    const results = await youtubeService.searchVideos(query, limit);

    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, '/api/v1/search', 'GET', 200, responseTime);

    res.json({
      data: results,
      meta: {
        query,
        limit,
        responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, '/api/v1/search', 'GET', 500, responseTime);
    next(error);
  }
});

// Get video details
router.get('/videos/:videoId', async (req: AuthRequest, res, next) => {
  const startTime = Date.now();
  try {
    const { videoId } = req.params;

    const videoDetails = await youtubeService.getVideoDetails(videoId);

    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${videoId}`, 'GET', 200, responseTime);

    res.json({
      data: videoDetails,
      meta: {
        responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${req.params.videoId}`, 'GET', 500, responseTime);
    next(error);
  }
});

// Get video stream URL
router.get('/videos/:videoId/stream', async (req: AuthRequest, res, next) => {
  const startTime = Date.now();
  try {
    const { videoId } = req.params;
    const quality = req.query.quality as string || 'highest';

    const streamInfo = await youtubeService.getStreamUrl(videoId, quality);

    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${videoId}/stream`, 'GET', 200, responseTime);

    res.json({
      data: streamInfo,
      meta: {
        responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${req.params.videoId}/stream`, 'GET', 500, responseTime);
    next(error);
  }
});

// Get playlist details
router.get('/playlists/:playlistId', async (req: AuthRequest, res, next) => {
  const startTime = Date.now();
  try {
    const { playlistId } = req.params;

    const playlistDetails = await youtubeService.getPlaylistDetails(playlistId);

    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/playlists/${playlistId}`, 'GET', 200, responseTime);

    res.json({
      data: playlistDetails,
      meta: {
        responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/playlists/${req.params.playlistId}`, 'GET', 500, responseTime);
    next(error);
  }
});

// Get video thumbnail
router.get('/videos/:videoId/thumbnail', async (req: AuthRequest, res, next) => {
  const startTime = Date.now();
  try {
    const { videoId } = req.params;
    const quality = req.query.quality as string || 'maxresdefault';

    const thumbnail = await youtubeService.getThumbnail(videoId, quality);

    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${videoId}/thumbnail`, 'GET', 200, responseTime);

    res.json({
      data: thumbnail,
      meta: {
        responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${req.params.videoId}/thumbnail`, 'GET', 500, responseTime);
    next(error);
  }
});

// Get related videos
router.get('/videos/:videoId/related', async (req: AuthRequest, res, next) => {
  const startTime = Date.now();
  try {
    const { videoId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    const relatedVideos = await youtubeService.getRelatedVideos(videoId, limit);

    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${videoId}/related`, 'GET', 200, responseTime);

    res.json({
      data: relatedVideos,
      meta: {
        responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${req.params.videoId}/related`, 'GET', 500, responseTime);
    next(error);
  }
});

// Get video comments
router.get('/videos/:videoId/comments', async (req: AuthRequest, res, next) => {
  const startTime = Date.now();
  try {
    const { videoId } = req.params;
    const limit = parseInt(req.query.limit as string) || 20;

    const comments = await youtubeService.getComments(videoId, limit);

    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${videoId}/comments`, 'GET', 200, responseTime);

    res.json({
      data: comments,
      meta: {
        responseTime,
      },
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    await logUsage(req.user!.id, req.apiKey!, `/api/v1/videos/${req.params.videoId}/comments`, 'GET', 500, responseTime);
    next(error);
  }
});

export default router;
