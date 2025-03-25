import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

export const spotifyConfig = {
    baseUrl: SPOTIFY_API_BASE_URL,
    endpoints: {
        search: `${SPOTIFY_API_BASE_URL}/search`,
        albums: `${SPOTIFY_API_BASE_URL}/albums`,
        artists: `${SPOTIFY_API_BASE_URL}/artists`,
        tracks: `${SPOTIFY_API_BASE_URL}/tracks`,
        playlists: `${SPOTIFY_API_BASE_URL}/playlists`
    },
    auth: {
        clientId: SPOTIFY_CLIENT_ID,
        clientSecret: SPOTIFY_CLIENT_SECRET,
        tokenUrl: SPOTIFY_AUTH_URL
    }
};

export async function getAccessToken(): Promise<string> {
    const response = await fetch(spotifyConfig.auth.tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

export default {spotifyConfig, getAccessToken};
