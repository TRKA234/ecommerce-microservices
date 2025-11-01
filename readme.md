# E-commerce Microservices

This repository contains a collection of microservices designed for an e-commerce platform. Each service is built to be independent, scalable, and maintainable, following best practices for microservice architecture. This project aims to demonstrate a robust and modern approach to building distributed systems.

## Services

Currently, the following services are included:

- **Product Service**: Manages product information, including details, inventory, and categories.
- **Order Service**: Handles order creation, processing, and status updates.
- **User Service**: Manages user authentication, authorization, and profile information.
- **Cart Service**: Manages shopping cart functionality for users.
- **Payment Service**: Integrates with payment gateways to process transactions.

## Technologies Used

- **Spring Boot**: For building robust and scalable microservices.
- **Spring Cloud**: For service discovery, configuration, and other cloud-native patterns.
- **Eureka Server**: For service registration and discovery.
- **API Gateway (Spring Cloud Gateway)**: For routing and filtering requests to microservices.
- **MySQL**: As the primary database for most services.
- **MongoDB**: For specific services requiring NoSQL capabilities (e.g., product catalog with flexible schemas).
- **Kafka**: For asynchronous communication and event-driven architecture.
- **Docker**: For containerization of services.
- **Kubernetes**: For orchestration and deployment of containerized applications.

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Docker Desktop (optional, for local containerization)
- Kubernetes (optional, for local deployment with Minikube or similar)

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ecommerce-microservices.git
    cd ecommerce-microservices
    ```

2.  **Database Setup:**
    -   Ensure you have MySQL and MongoDB instances running. You can use Docker for this:
        ```bash
        docker-compose -f docker-compose-databases.yml up -d
        ```
    -   Update the database connection properties in `application.properties` or `application.yml` for each service if necessary.

3.  **Build All Services:**
    ```bash
    mvn clean install
    ```

4.  **Run Services (in order):**

    a.  **Eureka Server:**
        ```bash
        cd eureka-server
        mvn spring-boot:run
        ```        cd config-server
        mvn spring-boot:run
        ```
    c.  **API Gateway:**
        ```bash
        cd api-gateway
        mvn spring-boot:run
        ```
    d.  **Product Service:**
        ```bash
        cd product-service
        mvn spring-boot:run
        ```
    e.  **User Service:**
        ```bash
        cd user-service
        mvn spring-boot:run
        ```
    f.  **Cart Service:**
        ```bash
        cd cart-service
        mvn spring-boot:run
        ```
    g.  **Order Service:**
        ```bash
        cd order-service
        mvn spring-boot:run
        ```
    h.  **Payment Service:**
        ```bash
        cd payment-service
        mvn spring-boot:run
        
    i.  **Notification Service:**
        ```bash
        cd notification-service
        mvn spring-boot:run
       