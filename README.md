# Next.js OpenJira App
Para correr localmente, se neceista la base de datos

```docker-compose up -d```

* El -d, significa __detached__

* MongoDB URL Local
```MONGO_URL= mongodb://localhost:27017/bitashopdb```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

* Reconstruir los modulos de node y levantar Next
```npm install ``` 
```npm run dev ```

## Llenar la base de datos con informacion de pruebas

Llamar a:
```http://localhost:3000/api/seed```

## Construir imagen docker
docker build -t nextjs-bita-shop .