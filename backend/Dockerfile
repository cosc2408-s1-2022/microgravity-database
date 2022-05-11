### Build Stage ###
FROM maven:3.8.5-openjdk-17 as build-stage
WORKDIR /usr/src/app
COPY src src
COPY pom.xml .
RUN mvn -f pom.xml clean package -DskipTests -Pprod

### Run Stage ###
FROM openjdk:17-alpine
WORKDIR /usr/src/app
COPY --from=build-stage /usr/src/app/target/mgdb-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
