import { createFileRoute } from "@tanstack/react-router";

function getEnvVariable(name: string): string | undefined {
  return process.env[name];
}

export const Route = createFileRoute("/api/auth")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const provider = url.searchParams.get("provider");
        const scope = url.searchParams.get("scope") || "repo,user";
        
        if (provider !== "github") {
          return new Response("Unsupported provider", { status: 400 });
        }

        const clientId = getEnvVariable("GITHUB_CLIENT_ID");
        if (!clientId) {
          const envKeys = Object.keys(process.env).filter(k => 
            !k.toLowerCase().includes("secret") && 
            !k.toLowerCase().includes("key") && 
            !k.toLowerCase().includes("token")
          );
          return new Response(
            `GITHUB_CLIENT_ID environment variable is not configured. Available non-sensitive env keys: ${JSON.stringify(envKeys)}`, 
            { status: 500 }
          );
        }

        // Dynamically build the redirect URI pointing to /api/callback on the same host
        const redirectUri = `${url.protocol}//${url.host}/api/callback`;
        
        // Generate a simple random state
        const state = Math.random().toString(36).substring(2, 15);

        const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
        githubAuthUrl.searchParams.set("client_id", clientId);
        githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
        githubAuthUrl.searchParams.set("scope", scope);
        githubAuthUrl.searchParams.set("state", state);

        return new Response(null, {
          status: 302,
          headers: {
            Location: githubAuthUrl.toString(),
          },
        });
      },
    },
  },
});
