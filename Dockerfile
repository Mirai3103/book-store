from mcr.microsoft.com/dotnet/aspnet:6.0.12
WORKDIR /app


from mcr.microsoft.com/dotnet/sdk:6.0 as build
WORKDIR /src
COPY . /src
RUN ls 
RUN dotnet restore "src/book ecommerce.csproj"
RUN dotnet build "src/book ecommerce.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "src/book ecommerce.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "book ecommerce.dll"]

