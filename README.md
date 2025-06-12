Guía de Configuración y Uso de la Calculadora Fluorescente
Este repositorio contiene el código de una calculadora web interactiva con un diseño en tonos oscuros y detalles en verde fluorescente. Está desarrollado utilizando HTML, CSS y TypeScript , siguiendo las mejores prácticas de programación para asegurar su funcionalidad y mantenibilidad.

Pasos para ponerla en marcha:
Sigue estos sencillos pasos para tener la calculadora funcionando en tu máquina local:

1. Guarda los Archivos
Primero, organiza los archivos de tu proyecto:

Crea una nueva carpeta para tu calculadora.
Dentro de esta carpeta, guarde el código HTML como index.html.
Guarde el código CSS como style.cssen la misma carpeta.
Guarde el código TypeScript como script.tstambién en la misma carpeta.


2. Compila TypeScript en JavaScript
Dado que el navegador ejecuta JavaScript, necesitamos compilar el archivo TypeScript ( .ts) a JavaScript ( .js):

Instala TypeScript (si no lo tienes): abre tu terminal o línea de comandos y ejecuta el siguiente comando globalmente:
Intento

npm install -g typescript

Navega a la carpeta de tu proyecto: En la terminal, dirígete a la carpeta donde guardaste los archivos de la calculadora.
Compila el archivo: Ejecuta este comando para transformar script.tsen script.js:
Intento

tsc script.ts

Este comando generará el archivo script.jsen tu misma carpeta, que es el que utilizará el navegador.


3. Abre la Calculadora en tu Navegador
Una vez compilado, ¡ya está lista para usar!

Simplemente abre el archivoindex.html en tu navegador web preferido.
