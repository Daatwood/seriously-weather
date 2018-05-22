# # FROM microsoft/aspnetcore:2.0 AS builder
# # ARG source=.
# # WORKDIR /app
# # EXPOSE $PORT
# # COPY $source .
# # ENTRYPOINT ["dotnet", "seriously-weather.dll"]

# FROM microsoft/aspnetcore-build:2.0 AS builder
# WORKDIR /source

# # Run NPM install for dependencies
# COPY package.json ./
# RUN npm install

# # caches restore result by copying csproj file separately
# COPY *.csproj .
# RUN dotnet restore

# # copies the rest of your code
# COPY . .
# RUN dotnet publish --output /app/ --configuration Release

# # Stage 2
# FROM microsoft/aspnetcore
# WORKDIR /app
# COPY --from=builder /app .
# ENTRYPOINT ["dotnet", "seriously-weather.dll"]

FROM microsoft/aspnetcore
WORKDIR /app
COPY . .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet seriously-weather.dll
