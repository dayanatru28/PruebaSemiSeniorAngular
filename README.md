# Proyecto Angular: Gestión de Tareas

Este es un proyecto desarrollado en Angular para la gestión de tareas. Se ha implementado una API en Render para manejar los datos de manera dinámica y el front-end se ha desplegado en GitHub Pages.

## Prerrequisitos
Antes de ejecutar el proyecto, es necesario verificar que se cuenta con las siguientes herramientas instaladas:

- **Node.js** (Versión utilizada: v20.17.0)
- **npm** (Versión utilizada: 10.8.3)
- **Angular CLI** (Versión utilizada: 17.3.9)

Para verificar las versiones instaladas, ejecutar los siguientes comandos:

```sh
node -v
npm -v
ng version
```

Si no se tiene Angular CLI instalado, se puede instalar con:

```sh
npm install -g @angular/cli@17.3.9
```

## Ejecución del proyecto local desde la clonación del repositorio

1. Clonar el repositorio desde GitHub:
   ```sh
   git clone https://github.com/dayanatru28/PruebaSemiSeniorAngular
   ```
2. Acceder al directorio del proyecto:
   ```sh
   cd PruebaSemiSeniorAngular
   ```
3. Instalar las dependencias necesarias:
   ```sh
   npm install
   ```
4. Ejecutar el proyecto en local:
   ```sh
   ng serve --port=4200
   ```
   Puedes cambiar el puerto si es necesario, por ejemplo `--port=4300`.

## Producción
El proyecto también está disponible en producción mediante **GitHub Pages** para el front-end y **Render** para el backend, lo que permite que los datos sean dinámicos y los servicios funcionen correctamente.

- **Código fuente del front-end:** [https://github.com/dayanatru28/PruebaSemiSeniorAngular](https://github.com/dayanatru28/PruebaSemiSeniorAngular)
- **Aplicación web en producción:** [https://dayanatru28.github.io/PruebaSemiSeniorAngular/](https://dayanatru28.github.io/PruebaSemiSeniorAngular/)
- **API en Render:** [https://pruebasemiseniorangular.onrender.com/tareas](https://pruebasemiseniorangular.onrender.com/tareas)

### Beneficios de Render
- Permite desplegar el backend sin necesidad de un servidor propio.
- Ofrece bases de datos administradas y hosting para APIs.
- Soporta integración continua con GitHub, lo que facilita el despliegue automático.

## Conclusión
Este proyecto ha sido desarrollado en Angular y está disponible tanto en entorno local como en producción, con un backend dinámico en Render y un front-end accesible desde GitHub Pages. Con esta configuración, los datos son dinámicos y la aplicación puede escalar según las necesidades.

