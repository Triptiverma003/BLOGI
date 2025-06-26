# ─── Stage 1: Build React frontend ────────────────────────────────────────────
FROM node:18-alpine AS frontend

WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build


# ─── Stage 2: Build Go backend ────────────────────────────────────────────────
FROM golang:1.21-alpine AS backend

WORKDIR /app
COPY server/go.mod server/go.sum ./
RUN go mod download
COPY server/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o blog-server ./


# ─── Stage 3: Final image with NGINX + Go server ─────────────────────────────
FROM alpine:latest

# install Nginx and bash
RUN apk add --no-cache nginx bash

# copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# copy React build
COPY --from=frontend /app/build /var/www/html

# copy Go binary
COPY --from=backend /app/blog-server /usr/local/bin/blog-server

# copy entrypoint script
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh

# expose ports
EXPOSE 80 8000

# start Go server in background, then nginx in foreground
ENTRYPOINT ["/bash", "/startup.sh"]
