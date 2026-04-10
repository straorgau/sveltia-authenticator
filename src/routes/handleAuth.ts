import type { Request, Response, NextFunction } from "express";
import * as arctic from "arctic";

const authScopes = {
  github: ["user", "repo"]
  // No GitLab support.
}

export const handleAuth = (req: Request, res: Response, _next: NextFunction) => {
  const hostUrl = `https://${req.headers.host}`
  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
  } = process.env;

  // @ts-ignore
  const github = new arctic.GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, `${hostUrl}/callback`)
  const state = arctic.generateState();
  const url = github.createAuthorizationURL(state, authScopes.github);

  return res.redirect(url.toString());
}