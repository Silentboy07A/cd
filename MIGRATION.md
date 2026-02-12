
# Migration Guide: Monolith to Microservices

This document outlines the strategy for migrating a legacy monolithic e-commerce application to the new microservices architecture.

## Strategy: Strangler Fig Pattern

We adopted the Strangler Fig pattern to gradually replace functionality.

1.  **Identify Bounded Contexts**:
    - Users
    - Products
    - Orders
    - Payments

2.  **Database Migration**:
    - **Old**: Relational SQL (e.g., Postgres/MySQL)
    - **New**: Convex (Document-based, Reactive)
    - **Step**: Export data to JSON/CSV and import into Convex using `npx convex import`.

3.  **Service Extraction**:
    - Created independent Node.js services for each context.
    - Decoupled logic from the monolith.
    - Implemented Convex mutations/queries to replace SQL queries.

## Schema Mapping

| SQL Table | Convex Table | Notes |
|-----------|--------------|-------|
| `users` | `users` | `password` hashed, `role` added |
| `products` | `products` | `images` now optional URL |
| `orders` | `orders` | Items embedded as array of objects |
| `payments` | `payments` | Linked to orders via ID |

## Deployment Pipeline

- **GitHub Actions**:
  - Automatically builds Docker images on push to `main`.
  - Deploys Frontend to Vercel with preview URLs for PRs.
