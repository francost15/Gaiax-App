## Getting Started

Instala las dependencias del proyecto:
npm install
Configura la base de datos:
Levanta la base de datos usando Docker:
docker-compose up -d
Aplica las migraciones del esquema de Prisma en Docker:

npx prisma migrate deploy
Genera el cliente de Prisma:
npx prisma generate
Carga inicial de datos en la base de datos (si aplica):
npm run seed
Ejecuta tu entorno local:
npm run dev
