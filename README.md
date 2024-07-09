# AluraGeek

AluraGeek es un proyecto que permite a los usuarios subir y gestionar productos mediante un formulario. Este proyecto fue desarrollado como parte del programa ONE de Alura LATAM y Oracle.

## Características

- Subir productos: Los usuarios pueden agregar nuevos productos especificando el nombre, precio y URL del producto.
- Eliminar productos: Los usuarios pueden eliminar productos previamente subidos.
- Conexión con API: El proyecto está conectado a una API utilizando JSON server para la gestión de los datos.

## Tecnologías utilizadas

- HTML: Utilizado para la estructura del sitio web.
- CSS: Usado para los estilos y diseño del sitio web.
- JavaScript: Empleado para la lógica y funcionalidad del sitio web.
- JSON Server: Utilizado como servidor mock para manejar los datos de los productos.
- LocalStorage: Utilizado para almacenar los datos localmente.
- Vercel: Usado para desplegar la aplicación.

## Instalación

1. Clona el repositorio:
    bash
    git clone https://github.com/tuusuario/AluraGeek.git
    

2. Navega al directorio del proyecto:
    bash
    cd AluraGeek
    

3. Instala las dependencias:
    bash
    npm install
    

4. Inicia el servidor JSON:
    bash
    npx json-server --watch db.json --port 5000
    

5. Inicia la aplicación:
    bash
    npm run dev
    

## Uso

1. Abre tu navegador y navega a http://localhost:3000.
2. Usa el formulario para agregar nuevos productos.
3. Visualiza y gestiona los productos en la interfaz de usuario.

## Contribuciones

Las contribuciones son bienvenidas. Para realizar cambios, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz commit (git commit -am 'Agrega nueva funcionalidad').
4. Haz push a la rama (git push origin feature/nueva-funcionalidad).
5. Crea un nuevo Pull Request.

## Agradecimientos

Este proyecto fue desarrollado con el apoyo de Alura LATAM y Oracle a través del programa ONE.
