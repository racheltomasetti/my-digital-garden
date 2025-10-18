import { NextResponse } from "next/server";

// Cache for storing stream status
let cache: {
  data: any;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 60000; // 60 seconds

// Twitch API credentials from environment
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const TWITCH_USERNAME = process.env.TWITCH_USERNAME;

// Token cache
let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getTwitchAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  // Get new token
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: TWITCH_CLIENT_ID!,
      client_secret: TWITCH_CLIENT_SECRET!,
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get Twitch access token");
  }

  const data = await response.json();
  const newToken = data.access_token as string;
  accessToken = newToken;
  tokenExpiry = Date.now() + data.expires_in * 1000 - 60000; // Refresh 1 min before expiry

  return newToken;
}

async function getTwitchUserId(username: string, token: string): Promise<string> {
  const response = await fetch(
    `https://api.twitch.tv/helix/users?login=${username}`,
    {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get Twitch user ID");
  }

  const data = await response.json();
  if (!data.data || data.data.length === 0) {
    throw new Error("Twitch user not found");
  }

  return data.data[0].id;
}

async function getStreamStatus(userId: string, token: string, username: string) {
  const response = await fetch(
    `https://api.twitch.tv/helix/streams?user_id=${userId}`,
    {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get stream status");
  }

  const data = await response.json();

  if (!data.data || data.data.length === 0) {
    return { isLive: false };
  }

  const stream = data.data[0];
  return {
    isLive: true,
    title: stream.title,
    game: stream.game_name,
    viewerCount: stream.viewer_count,
    thumbnailUrl: stream.thumbnail_url.replace("{width}", "440").replace("{height}", "248"),
    username: username,
  };
}

export async function GET() {
  try {
    // Check environment variables
    if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET || !TWITCH_USERNAME) {
      return NextResponse.json(
        { error: "Missing Twitch credentials", isLive: false },
        { status: 500 }
      );
    }

    // Check cache
    const now = Date.now();
    if (cache && now - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json(cache.data);
    }

    // Get fresh data
    const token = await getTwitchAccessToken();
    const userId = await getTwitchUserId(TWITCH_USERNAME, token);
    const streamStatus = await getStreamStatus(userId, token, TWITCH_USERNAME);

    // Update cache
    cache = {
      data: streamStatus,
      timestamp: now,
    };

    return NextResponse.json(streamStatus);
  } catch (error) {
    console.error("Error fetching stream status:", error);
    return NextResponse.json(
      { error: "Failed to fetch stream status", isLive: false },
      { status: 500 }
    );
  }
}
