import type { Request, Response, NextFunction } from "express";
import * as arctic from "arctic";

export const handleCallback = async (req: Request, res: Response, _next: NextFunction) => {
  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
  } = process.env;

  const hostUrl = `https://${req.headers.host}`;
  
  const { code } = req.query;

  if (!code || typeof(code) !== "string") {
    return res.status(400).send({
      error: "Missing or malformed code."
    });
  }

  try {
    // @ts-ignore
    const github = new arctic.GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, `${hostUrl}/callback`);

    const tokens = await github.validateAuthorizationCode(code);
    const responseBody = handleBody("success", {
      token: tokens.accessToken(),
      provider: "github"
    });

    return res.send(responseBody);
  } catch (e) {
    return res.send(handleBody("error", {
      error: e,
      provider: "github"
    }));
  }
}

const handleBody = (status: string, content: { token?: string, error?: unknown, provider: string }) => {
  return `
    <!doctype html>
    <html>
      <body>
        <script>
          (() => {
            window.addEventListener('message', ({ data, origin }) => {
              if (data === 'authorizing:${content.provider}') {
                window.opener?.postMessage(
                  'authorization:${content.provider}:${status}:${JSON.stringify(content)}',
                  origin
                );
              }
            });
            window.opener?.postMessage('authorizing:${content.provider}', '*');
          })();
        </script>
      </body>
    </html>
  `;
}