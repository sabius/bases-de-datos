# MySQL & phpMyAdmin con Docker

Esta guía explica cómo configurar una **base de datos MySQL** con **phpMyAdmin** usando Docker y Docker Compose. Incluye instrucciones para la instalación, inicio de contenedores, acceso a phpMyAdmin y creación de un usuario administrador.

---

## **Prerequisitos**

* Docker instalado y en ejecución (`docker --version` para verificar).
* Docker Compose instalado (`docker-compose --version` para verificar).

Si Docker no está instalado, puedes usar **Colima** como alternativa:

```bash
brew install colima
colima start
```

---

## **1. Ejecutar los Contenedores**

Asegúrate de estar en el directorio que contiene el archivo `docker-compose.yml`, luego ejecuta:

```bash
docker-compose up -d
```

Para Docker Compose v2:

```bash
docker compose up -d
```

Verifica si los contenedores están en ejecución:

```bash
docker ps
```

Deberías ver dos contenedores: `mysql-container` y `phpmyadmin-container`.

---

## **2. Acceder a phpMyAdmin**

1. Abre un navegador y ve a  **[http://localhost:8080](http://localhost:8080/)** .
2. Inicia sesión con las credenciales predeterminadas:
   * **Servidor:** `mysql`
   * **Usuario:** `myuser`
   * **Contraseña:** `mypassword`

---

## **3. Crear un Usuario Administrador en MySQL**

1. Abre una terminal y conéctate a MySQL dentro del contenedor:

   ```bash
   docker exec -it mysql-container mysql -uroot -p
   ```

   Ingresa la contraseña de root de MySQL ( **root** , o la que hayas configurado en `MYSQL_ROOT_PASSWORD`).
2. Crea un usuario administrador:

   ```sql
   CREATE USER 'myadmin'@'%' IDENTIFIED BY 'adminpassword';
   GRANT ALL PRIVILEGES ON *.* TO 'myadmin'@'%' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   EXIT;
   ```
3. Reinicia phpMyAdmin para aplicar los cambios:

   ```bash
   docker restart phpmyadmin-container
   ```
4. Inicia sesión en phpMyAdmin con:

   * **Usuario:** `myadmin`
   * **Contraseña:** `adminpassword`

---

## **4. Detener y Reiniciar Contenedores**

Para detener los contenedores:

```bash
docker-compose down
```

Para reiniciar los contenedores:

```bash
docker-compose up -d
```

Para eliminar todo (contenedores, redes, volúmenes):

```bash
docker-compose down -v
```

---

## **5. Solución de Problemas**

* **"Cannot connect to the Docker daemon"** → Asegúrate de que Docker está en ejecución: `docker info`.
* **phpMyAdmin muestra "mysqli::real_connect(): (HY000/2002)"** → Asegúrate de que `PMA_HOST` está configurado correctamente (`mysql`).
* **Errores de permisos en `/var/run/docker.sock`** → Es posible que necesites agregar tu usuario al grupo `docker`:

  ```bash
  sudo usermod -aG docker $(whoami)
  ```

  Luego, cierra sesión y vuelve a iniciarla.

---

## **6. Notas Adicionales**

* Para  **cambiar la configuración de la base de datos** , edita el archivo `docker-compose.yml`.
* Puedes **conectarte a MySQL desde otra aplicación** usando:
  ```
  Host: localhost
  Puerto: 3306
  Usuario: myuser
  Contraseña: mypassword
  ```

🚀 **¡Tu configuración de MySQL y phpMyAdmin está lista!** ¡Avísame si tienes algún problema! 😊
