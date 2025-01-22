## Getting Started

1. Instala las dependencias del proyecto:
    npm install
2. Levanta o configura tu base de datos (por ejemplo usando Docker).
docker-compose up -d
3. Una vez lista la base de datos, ejecuta para realizar la carga inicial de datos:
    npm run seed
4. Ejecuta tu entorno local:
npm run dev