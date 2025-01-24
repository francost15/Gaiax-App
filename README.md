## Getting Started

1. Instala las dependencias del proyecto:
    npm install
2. Levanta o configura tu base de datos (por ejemplo usando Docker).
   docker-compose up -d
3. Migrar tu shcema de prisma al docker
    npx prisma migrate deploy

4. Una vez lista la base de datos, ejecuta para realizar la carga inicial de datos:
    npm run seed
5.. Ejecuta tu entorno local:
npm run dev