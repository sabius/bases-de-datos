---

# Entorno de Desarrollo MySQL + phpMyAdmin con Docker

Este proyecto configura un entorno de desarrollo local utilizando Docker Compose. Levanta dos servicios principales:

1. **MySQL:** Una instancia de la base de datos MySQL (última versión).
2. **phpMyAdmin:** Una interfaz web para administrar la base de datos MySQL.

Los servicios están conectados a través de una red Docker dedicada (`mydb-network`) y los datos de MySQL persisten en un volumen Docker (`mysql_data`).

## Prerrequisitos

* Tener [Docker](https://docs.docker.com/get-docker/) instalado.
* Tener [Docker Compose](https://docs.docker.com/compose/install/) instalado (generalmente viene incluido con Docker Desktop en Windows y macOS).
* Si usas macOS, puedes usar [Colima](https://github.com/abiosoft/colima) o Docker Desktop. En Windows, Docker Desktop o WSL2. En Linux, la instalación nativa de Docker y Docker Compose.


# Uso

1. **Iniciar los servicios:**
   Abre una terminal en el directorio raíz del proyecto (donde está `docker-compose.yml`) y ejecuta:

   ```bash
   docker-compose up -d
   ```

   El comando `-d` ejecuta los contenedores en segundo plano (detached mode).
3. **Detener los servicios:**
   Para detener los contenedores:

   ```bash
   docker-compose down
   ```

   Este comando detiene y elimina los contenedores, pero **no** elimina el volumen `mysql_data` (tus datos persistirán).
4. **Detener y eliminar todo (incluidos los datos):**
   Si necesitas empezar desde cero (por ejemplo, para forzar la re-ejecución de `init.sql`), usa:

   ```bash
   docker-compose down -v
   ```

   El flag `-v` elimina los volúmenes nombrados definidos en el `docker-compose.yml` (en este caso, `mysql_data`). **¡CUIDADO! Esto borrará permanentemente todos los datos de tu base de datos.**

## Acceso a los Servicios

* **phpMyAdmin:** Abre tu navegador web y ve a `http://localhost:8080`.

  * **Servidor:** `mysql`
  * **Usuario:** `admin` (o `root`)
  * **Contraseña:** `admin` (o la `MYSQL_ROOT_PASSWORD` si usas `root`)
* **MySQL (desde otro contenedor o aplicación):**

  * **Host:** `mysql` (el nombre del servicio dentro de la red Docker `mydb-network`)
  * **Puerto:** `3306` (puerto estándar de MySQL)
  * **Usuario:** `admin`
  * **Contraseña:** `admin`
  * **Base de datos:** `pedidosdatabase`

  *(Nota: El puerto 3306 de MySQL no está expuesto directamente al host en esta configuración. Para conectarte desde tu máquina local con un cliente SQL, necesitarías añadir `ports: - "3306:3306"` a la sección `mysql` del `docker-compose.yml`)*.


## Troubleshooting


### Problema: Las tablas definidas en `init.sql` no se crean.


  1. Detén los contenedores y elimina el volumen:
     ```bash
     docker-compose down -v
     ```
     **¡Advertencia! Este comando eliminará todos los datos almacenados en la base de datos.**

  2. Vuelve a iniciar los servicios:
     ```bash
     docker-compose up -d
     ```
     Ahora, al iniciar, MySQL encontrará el directorio de datos vacío y ejecutará los scripts en `/docker-entrypoint-initdb.d/`