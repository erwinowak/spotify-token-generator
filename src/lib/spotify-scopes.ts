/**
 * Scope IDs must match spotifyScopes in validations.ts for zod validation.
 */
export const availableScopesWithCategories: { id: string; category: string }[] = [
  { id: "user-read-playback-state", category: "Spotify Connect" },
  { id: "user-modify-playback-state", category: "Spotify Connect" },
  { id: "user-read-currently-playing", category: "Spotify Connect" },
  { id: "app-remote-control", category: "Spotify Connect" },
  { id: "playlist-read-private", category: "Playlists" },
  { id: "playlist-read-collaborative", category: "Playlists" },
  { id: "playlist-modify-public", category: "Playlists" },
  { id: "playlist-modify-private", category: "Playlists" },
  { id: "user-library-read", category: "Library" },
  { id: "user-library-modify", category: "Library" },
  { id: "user-top-read", category: "Listening History" },
  { id: "user-read-recently-played", category: "Listening History" },
  { id: "user-read-private", category: "User" },
  { id: "user-read-email", category: "User" },
  { id: "user-follow-read", category: "Following" },
  { id: "user-follow-modify", category: "Following" },
];

export const scopeCategories = [
  ...new Set(availableScopesWithCategories.map((s) => s.category)),
];
