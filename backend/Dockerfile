# ==========================================
# Build Stage
# ==========================================
FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven files first for dependency caching
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests


# ==========================================
# Runtime Stage
# ==========================================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy generated JAR
COPY --from=build /app/target/*.jar app.jar

# Render provides PORT
ENV PORT=8080

EXPOSE 8080

# Start Spring Boot
ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]