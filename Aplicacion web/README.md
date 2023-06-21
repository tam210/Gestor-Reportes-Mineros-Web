# Instalación de bibliotecas

* npm install
* npm install react-datepicker
* npm install @mui/x-data-grid
* npm install @mui/material @emotion/react @emotion/styled

## Configuración

* La aplicación web esta en localhost:3000 puede cambiarse en el package.json agregando '-p puerto' en "dev" o "start"

## Documentación

* Para datepicker https://www.npmjs.com/package/react-datepicker
* Para datagrid https://mui.com/x/react-data-grid/getting-started/

## Posibles errores

* Puede ocurrir un error al acceder a una ventana con un data grid debido a la version de react, si encuentras el error webpackMissingModule refiriendose a que no encuentra un archivo de la biblioteca @emotion prueba usando ´npm update´ para actualizar react y luego usa npm install para evitar el error ModuleBuildError por la actualización
