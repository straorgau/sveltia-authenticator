# `straorgau/sveltia-authenticator`
A port of the official [Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) to ExpressJS. 

This repository is intended for users of [Sveltia CMS](https://sveltiacms.app/), who need an authenticator for non-technical contributors to a repository, but the organisation does not use Cloudflare Workers.

> [!NOTE]
> 
> This repository only supports **Github** backends. Gitlab and Forgejo/Gitea users do not need this authenticator.

## How to use
### Step 1 - Clone or download the project.
Simply clone the project - `git clone https://github.com/straorgau/sveltia-authenticator`.

For **Docker users**, there is also a `Dockerfile` provided that also packages the application in a Docker image.

### Step 2 - Register an OAuth app
[Register an OAuth application](https://github.com/settings/applications/new) on Github with the following properties, along with your server URL.
- Application name: `Sveltia CMS Authenticator` (you can choose your application name)
- Homepage URL: `https://github.com/straorgau/sveltia-authenticator` (you can replace this link with anything you want)
- Application Description: (Optional, can be left empty)
- Authorization Callback URL: `<server-url>/callback`

Once registered, click on the "Generate a new Client Secret" button. The app's client ID & secret will be displayed. Make sure you note down the secret, as it won't be shown again!

### Step 3 - Configure the Application
Once done, create a new `.env` file - this will store the server's settings.

- `GITHUB_CLIENT_ID` - The Github **client ID** from step 2,
- `GITHUB_CLIENT_SECRET` - The Github **client secret** from step 2,
- `SERVER_PORT` - (*optional*) The port the server should run on. Defaults to port `3000`.


### Step 4 - Update CMS configuration
Open your CMS configuration file, wherever it may be (look for a `config.yml`), and add your server URL from step 1 as the new `base_url` option under the `backend` item.

```yml
backend:
  name: github
  repo: your/repo
  base_url: https://server-url.here/ # Change this option
```