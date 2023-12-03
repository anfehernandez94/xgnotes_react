# XGNOTES (Frontend)

Aplicación web desarrollada en React(Frontend) y [NodeJS(Backend)](https://github.com/anfehernandez94/xgnotes_node), que permite al usuario agregar notas como presentación de prueba técnica: Desarrollador Full Stack - Startup de Medios Digitales. 
La aplicación permite a los usuarios agregar notas con los siguientes campos:

- Título [Campo de texto]
- Descripción [Textarea]
- fecha de creación [input Date]
- Estado [pendiente, completada]

## Instalación

1. Debes tener la aplicación de servidor corriendo, si aún no la tienes clonala [aquí](https://github.com/anfehernandez94/xgnotes_node) 

2. Clona el repositorio:

   ```bash
   git clone https://github.com/anfehernandez94/xgnotes_react.git

3. Instala las dependencias
   ```bash
   cd xgnotes_react
   npm install

4. Crea la siguiente variable de entorno (.env) con la dirección y puerto correspondiente:

   ```bash
   REACT_APP_API_URL=http://localhost:5000

5. Inicia la aplicación, usualmente será en esta ubicación `http://localhost:3000`

   ```bash
   npm start
