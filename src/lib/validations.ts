import { z } from "zod";

export const spotifyScopes = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-library-read",
  "user-library-modify",
  "user-top-read",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
] as const;

export const formSchema = z.object({
  clientId: z.string().min(1, "Client ID is required"),
  clientSecret: z.string().min(1, "Client Secret is required"),
  redirectUri: z
    .string()
    .min(1, "Redirect URI is required")
    .url("Redirect URI must be a valid URL"),
  scopes: z
    .array(z.string())
    .min(1, "Select at least one scope")
    .refine(
      (scopes) =>
        scopes.every((scope) =>
          spotifyScopes.includes(scope as (typeof spotifyScopes)[number])
        ),
      "All scopes must be valid"
    ),
});

export type FormData = z.infer<typeof formSchema>;
