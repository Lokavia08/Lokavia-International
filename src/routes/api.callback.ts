import { createFileRoute } from "@tanstack/react-router";

function getEnvVariable(name: string): string | undefined {
  return process.env[name];
}

// Authorized credentials for access control
const ALLOWED_USERNAMES = ["lokieie", "lokavia08"];
const ALLOWED_EMAIL = "lokesh.gd04@gmail.com";

export const Route = createFileRoute("/api/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");

        if (!code) {
          return new Response("Missing authorization code", { status: 400 });
        }

        const clientId = getEnvVariable("GITHUB_CLIENT_ID");
        const clientSecret = getEnvVariable("GITHUB_CLIENT_SECRET");

        if (!clientId || !clientSecret) {
          return new Response("GitHub client credentials are not configured.", { status: 500 });
        }

        try {
          // 1. Exchange the authorization code for an access token
          const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              client_id: clientId,
              client_secret: clientSecret,
              code,
            }),
          });

          if (!tokenResponse.ok) {
            const errText = await tokenResponse.text();
            throw new Error(`Failed to exchange token: ${errText}`);
          }

          const tokenData = (await tokenResponse.json()) as {
            access_token?: string;
            error?: string;
            error_description?: string;
          };

          if (tokenData.error || !tokenData.access_token) {
            throw new Error(tokenData.error_description || tokenData.error || "No access token returned");
          }

          const accessToken = tokenData.access_token;

          // 2. Fetch authenticated GitHub user details
          const userResponse = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
              "User-Agent": "Lokavia-International-CMS-Auth",
            },
          });

          if (!userResponse.ok) {
            throw new Error("Failed to fetch user profile from GitHub");
          }

          const userData = (await userResponse.json()) as {
            login: string;
            email: string | null;
          };

          // 3. Fetch user emails in case profile email is private
          let emails: Array<{ email: string; verified: boolean; primary: boolean }> = [];
          try {
            const emailsResponse = await fetch("https://api.github.com/user/emails", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
                "User-Agent": "Lokavia-International-CMS-Auth",
              },
            });
            if (emailsResponse.ok) {
              emails = await emailsResponse.json();
            }
          } catch (emailErr) {
            console.error("Error fetching user emails:", emailErr);
          }

          // 4. Validate user identity against authorization criteria
          const githubUsername = userData.login?.toLowerCase();
          const githubEmail = userData.email?.toLowerCase();
          
          const isUsernameAllowed = ALLOWED_USERNAMES.includes(githubUsername);
          const isEmailAllowed = githubEmail === ALLOWED_EMAIL || 
            emails.some(e => e.email?.toLowerCase() === ALLOWED_EMAIL && e.verified);

          const isAuthorized = isUsernameAllowed || isEmailAllowed;

          if (!isAuthorized) {
            // Render beautiful error/Access Denied page
            const errorHtml = `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <title>Access Denied — Lokavia CMS</title>
                  <style>
                    body {
                      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                      background-color: #0b0f19;
                      color: #f3f4f6;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      height: 100vh;
                      margin: 0;
                    }
                    .card {
                      background: #111827;
                      border: 1px solid #1f2937;
                      padding: 2.5rem;
                      border-radius: 16px;
                      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
                      text-align: center;
                      max-width: 440px;
                    }
                    .icon {
                      font-size: 3rem;
                      margin-bottom: 1rem;
                      color: #ef4444;
                    }
                    h1 {
                      font-size: 1.5rem;
                      margin: 0 0 0.75rem 0;
                      font-weight: 700;
                      letter-spacing: -0.025em;
                    }
                    p {
                      color: #9ca3af;
                      font-size: 0.95rem;
                      line-height: 1.6;
                      margin: 0 0 1.5rem 0;
                    }
                    .badge {
                      display: inline-block;
                      background-color: #1e1b4b;
                      border: 1px solid #312e81;
                      color: #c7d2fe;
                      font-size: 0.8rem;
                      font-family: monospace;
                      padding: 0.35rem 0.75rem;
                      border-radius: 9999px;
                      margin-bottom: 1rem;
                    }
                  </style>
                </head>
                <body>
                  <div class="card">
                    <div class="icon">🔒</div>
                    <h1>Access Denied</h1>
                    <p>Your GitHub account (<span style="color: #f3f4f6; font-weight: 500;">${userData.login}</span>) is not authorized to modify the CMS.</p>
                    <div class="badge">Unauthorized User</div>
                    <p style="font-size: 0.8rem; color: #6b7280; margin-bottom: 0;">This window will close automatically.</p>
                  </div>
                  <script>
                    (function() {
                      const provider = "github";
                      const content = {
                        message: "Access Denied: You are not authorized to login to this CMS.",
                        provider: provider
                      };
                      
                      function receiveMessage(e) {
                        if (e.origin !== window.location.origin) return;
                        window.opener.postMessage(
                          "authorization:" + provider + ":error:" + JSON.stringify(content),
                          e.origin
                        );
                        window.removeEventListener("message", receiveMessage, false);
                        setTimeout(() => window.close(), 3000);
                      }
                      
                      window.addEventListener("message", receiveMessage, false);
                      window.opener.postMessage("authorizing:" + provider, "*");
                    })();
                  </script>
                </body>
              </html>
            `;
            return new Response(errorHtml, {
              status: 403,
              headers: { "Content-Type": "text/html; charset=utf-8" },
            });
          }

          // 5. Successful login: Return the postMessage handshake HTML
          const successHtml = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8" />
                <title>Success — Lokavia CMS</title>
                <style>
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    background-color: #0b0f19;
                    color: #f3f4f6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                  }
                  .card {
                    background: #111827;
                    border: 1px solid #1f2937;
                    padding: 2.5rem;
                    border-radius: 16px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
                    text-align: center;
                    max-width: 440px;
                  }
                  .spinner {
                    border: 3px solid rgba(255, 255, 255, 0.1);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border-left-color: #f97316;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1.5rem auto;
                  }
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                  h1 {
                    font-size: 1.3rem;
                    margin: 0 0 0.5rem 0;
                    font-weight: 600;
                  }
                  p {
                    color: #9ca3af;
                    font-size: 0.9rem;
                    margin: 0;
                  }
                </style>
              </head>
              <body>
                <div class="card">
                  <div class="spinner"></div>
                  <h1>Authenticating...</h1>
                  <p>Completing login handshake. This window will close shortly.</p>
                </div>
                <script>
                  (function() {
                    const token = "${accessToken}";
                    const provider = "github";
                    const content = {
                      token: token,
                      provider: provider
                    };
                    
                    function receiveMessage(e) {
                      if (e.origin !== window.location.origin) return;
                      
                      window.opener.postMessage(
                        "authorization:" + provider + ":success:" + JSON.stringify(content),
                        e.origin
                      );
                      window.removeEventListener("message", receiveMessage, false);
                      window.close();
                    }
                    
                    window.addEventListener("message", receiveMessage, false);
                    
                    // Notify opener that we are ready to receive handshake trigger
                    window.opener.postMessage("authorizing:" + provider, "*");
                  })();
                </script>
              </body>
            </html>
          `;

          return new Response(successHtml, {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });

        } catch (error: any) {
          console.error("OAuth callback error:", error);
          const errorMsg = error instanceof Error ? error.message : "Authentication error";
          const failHtml = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8" />
                <title>Authentication Error</title>
                <style>
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    background-color: #0b0f19;
                    color: #f3f4f6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                  }
                  .card {
                    background: #111827;
                    border: 1px solid #1f2937;
                    padding: 2.5rem;
                    border-radius: 16px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
                    text-align: center;
                    max-width: 440px;
                  }
                  .icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    color: #f97316;
                  }
                  h1 {
                    font-size: 1.5rem;
                    margin: 0 0 0.75rem 0;
                    font-weight: 700;
                  }
                  p {
                    color: #9ca3af;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin: 0 0 1.5rem 0;
                  }
                </style>
              </head>
              <body>
                <div class="card">
                  <div class="icon">⚠️</div>
                  <h1>Authentication Error</h1>
                  <p>${errorMsg}</p>
                  <p style="font-size: 0.8rem; color: #6b7280; margin-bottom: 0;">This window will close automatically.</p>
                </div>
                <script>
                  (function() {
                    const provider = "github";
                    const content = {
                      message: "${errorMsg}",
                      provider: provider
                    };
                    
                    function receiveMessage(e) {
                      if (e.origin !== window.location.origin) return;
                      window.opener.postMessage(
                        "authorization:" + provider + ":error:" + JSON.stringify(content),
                        e.origin
                      );
                      window.removeEventListener("message", receiveMessage, false);
                      setTimeout(() => window.close(), 3000);
                    }
                    
                    window.addEventListener("message", receiveMessage, false);
                    window.opener.postMessage("authorizing:" + provider, "*");
                  })();
                </script>
              </body>
            </html>
          `;
          return new Response(failHtml, {
            status: 500,
            headers: { "Content-Type": "text/html; charset=utf-8" },
          });
        }
      },
    },
  },
});
