
# E-Commerce Microservices Platform

This project demonstrates a scalable e-commerce platform built with a microservices architecture, utilizing Node.js, Docker, Convex, and Next.js.

## Architecture

```mermaid
graph TD
    Client[Next.js Frontend] -->Gateway[API Gateway / Next.js API Routes]
    Gateway --> UserS[User Service]
    Gateway --> ProductS[Product Service]
    Gateway --> OrderS[Order Service]
    Gateway --> PaymentS[Payment Service]
    
    UserS --> Convex[(Convex Database)]
    ProductS --> Convex
    OrderS --> Convex
    PaymentS --> Convex
```

## Services

- **User Service**: Handles authentication and user profiles.
- **Product Service**: Manages product catalog and inventory.
- **Order Service**: Processes orders and cart management.
- **Payment Service**: Handles transactions.

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Lucide React
- **Backend Services**: Node.js, Express
- **Database**: Convex (Real-time, scalable)
- **Containerization**: Docker, Docker Compose
- **Deployment**: Vercel (Frontend), Docker Containers (Backend)

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Convex Account

### Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Initialize Convex**
    ```bash
    npx convex dev
    ```
3.  **Environment Variables**:
    -   Create a `.env` file in the root directory.
    -   Add `CONVEX_URL` and `JWT_SECRET`.
    -   *Note*: The services currently have a hardcoded fallback for `CONVEX_URL` to ease deployment, but you should set this environment variable in production.

4.  **Start Microservices (Docker)**
    ```bash
    docker-compose up --build
    ```

5.  **Start Frontend**
    ```bash
    npm run dev:frontend
    ```
    Or access via Vercel deployment.

## APIs

The frontend proxies requests to services via `/api/[service]/[endpoint]`.

- `GET /api/products/products` -> Product Service
- `POST /api/users/register` -> User Service
