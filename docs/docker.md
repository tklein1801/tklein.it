# Dockerizing this Next.js app

This repository uses Next.js 16 with the App Router and npm. Its Docker setup builds a production image with Next.js standalone output, then runs the generated server as an unprivileged user.

## Requirements

- Docker Engine with the Compose plugin, or Docker Desktop
- A local `.env` file containing the app's API credentials

Create the local environment file from the example and add valid values:

```sh
cp .env.example .env
```

Set `COINMARKETCAP` to a CoinMarketCap API key and `GH_PAT` to a GitHub personal access token. Keep `.env` private. It is ignored by Git and excluded from the Docker build context.

## Build and run

From the repository root, run:

```sh
docker compose up --build -d
```

Open <http://localhost:3000>. To use a different host port, set `PORT` in the shell when starting Compose:

```sh
PORT=8080 docker compose up --build -d
```

View logs and stop the app with:

```sh
docker compose logs -f web
docker compose down
```

## How the image works

The Dockerfile uses three stages. The dependencies stage installs the exact packages in `package-lock.json`. The builder stage copies the app and runs `next build`. The runner stage contains only the standalone server, its traced runtime dependencies, and static assets. This keeps build tooling out of the production image.

`output: "standalone"` in `next.config.js` tells Next.js to produce the minimal server bundle. The container starts it with `node server.js` on port 3000. Compose publishes that container port to the selected host port and checks `/api/status` for health.

## Environment variables and secrets

`COINMARKETCAP` and `GH_PAT` are read by server-side services at request time. The home page is configured as dynamic, so the credentials are not needed while building the image. Compose loads them from `.env` only when the container starts. Do not pass credentials as Docker build arguments or copy `.env` into the image.

These values are not prefixed with `NEXT_PUBLIC_`, so Next.js does not expose them to browser code. For a server deployment, provide the same variables through the hosting platform's secret or environment-variable settings instead of committing `.env`.

## Sources

- [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying#docker)
- [Docker guide for containerizing Next.js](https://docs.docker.com/guides/nextjs/)
