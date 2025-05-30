# --- STAGE 1: Build the Spring Boot application ---
# Use a Maven image with a specific JDK version (e.g., temurin-21 is OpenJDK 21).
# Adjust '21' to match the Java version your Spring Boot project uses (e.g., '17' if you're on Java 17).
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory inside the container for the build process.
WORKDIR /app

# Copy the Maven project files (pom.xml) first.
# This helps Docker cache dependencies. If only pom.xml changes, it won't re-download everything.
COPY pom.xml .

# Copy your application's source code.
# The '.' after 'src' means copy the content of the 'src' directory to './src' in the container.
COPY src ./src

# Build the Spring Boot application.
# `mvn clean package`: cleans any previous builds and packages the application into a JAR.
# `-DskipTests`: skips running unit/integration tests during the build. This speeds up deployment.
# We're building the executable JAR directly here.
RUN mvn clean package -DskipTests

# --- STAGE 2: Create the final runnable image ---
# Use a lightweight JRE (Java Runtime Environment) image for the final application.
# 'eclipse-temurin:21-jre-alpine' is recommended for small image sizes and faster startup.
# Ensure this JRE version matches your JDK version used in the build stage.
FROM eclipse-temurin:21-jre-alpine

# Set the working directory for the final application inside the container.
WORKDIR /app

# Copy the executable JAR from the 'build' stage to the current stage.
# The JAR file is located in the 'target/' directory after Maven builds it.
# `*.jar` is a wildcard; it will pick up the single JAR file in 'target/'.
# We copy it to '/app/app.jar' in the final image for a consistent name.
COPY --from=build /app/target/*.jar /app/app.jar

# Expose the port your Spring Boot application listens on.
# By default, Spring Boot runs on port 8080.
EXPOSE 8080

# Define the command to run the application when the container starts.
# `java -jar /app/app.jar`: This executes your Spring Boot application's JAR.
# `ENTRYPOINT` is preferred for main application processes.
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# --- Optional Best Practice for Production Deployment ---
# For enhanced security, it's good practice to run your application
# with a non-root user inside the container. You can uncomment these
# lines if you want to implement this.
# RUN addgroup -S spring && adduser -S spring -G spring
# USER spring