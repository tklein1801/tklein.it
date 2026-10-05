# tklein.it

## Getting started

1. Clone the repo

   ```bash
   git clone git@github.com:tklein1801/tklein.it.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set environment variables (as defined in the `./.env.example`)

   ```bash
   # Start the development server
   npm run dev
   ```

## Docker

Create `.env` from `.env.example` and set the required API credentials before starting the container:

```bash
cp .env.example .env
```

Run the prebuilt production image from GitHub Container Registry:

```bash
docker compose up -d
```

To build and run the image locally instead, use the local Compose override:

```bash
docker compose -f compose.yml -f compose.local.yml up --build -d
```

Both configurations serve the app at <http://localhost:3000>. See [docs/docker.md](docs/docker.md) for environment-variable and container details.

## CI

The Concourse pipelines and the staged migration from GitHub Actions are documented in [docs/concourse.md](docs/concourse.md).
