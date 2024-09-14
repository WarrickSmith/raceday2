FROM node:20-alpine AS base
FROM base AS build
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /src
COPY package.json package-lock.json ./
RUN npm --force install
COPY . .

RUN npm run build

FROM base AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY --from=build /src/public ./public
COPY --from=build /src/.next/standalone ./ 
COPY --from=build /src/.next/static ./.next/static

ENV PORT=3020
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
