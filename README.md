Instrucciones para ejecución del aplicativo. 

Se requiere instalar el motor de bases de datos postgresql.
usuario: postgres,
contraseña: 12345*,
nombre bd: db_konecta,

Luego de clonar el repositorio en su ambiente, es necesario instalar todas las dependencias con el comando npm install. 
Luego de instaladas todas las dependencias es necesario ejecutar el comando npx prisma db pull, este comando creara la estructura de las tablas en la base de datos.

Una vez generadas las tablas en la bd, procedemos a crear los roles

-- Insertar el rol Administrador
INSERT INTO roles (nombre_rol) VALUES ('Administrador');

-- Insertar el rol Empleado
INSERT INTO roles (nombre_rol) VALUES ('Empleado');


Luego de ello crear el primer usuario por medio de la API 

url del endpoint: http://localhost:4000/user
tipo solicitud: POST
ejemplo del body:
{ 
"nombre": "Juanito",
"email": "juanito@prueba.com",
"contrase_a": "Password.1234*",
"rol_id": 2
}

La aplicación se ejecuta a tráves del comando npm run dev. 

Se utilizó prisma como ORM para el mapeo de entidades tablas, ademas de contribuir a la seguridad del aplicativo, previniendo inyecciones SQL.
Se utilizó JWT para la generación de token de acceso y gestion de roles. 

Luego de esto ya sera posible acceder a la aplicación por medio de un navegador web, despues de haber clonado y descargado el front end de la app. 

