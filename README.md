[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm)
# Teacher control system
El Teacher Control System es una API diseñada para la gestión de la autoevaluación de la labor académica de los docentes adscritos al programa. Este sistema proporciona funcionalidades clave, incluyendo la administración de materias, docentes, notificaciones y generación de reportes. La aplicación está diseñada para ser utilizada por tres tipos de usuarios: coordinadores (administradores del sistema), decanos y docentes.

## 🏗️ Estructura del Proyecto
* ```API Principal:``` Este repositorio contiene la API principal, escrita en Typescript y utiliza Node.js.

* ```Conexión con API Externa:``` La aplicación se conecta a otra API externa para acceder a funcionalidades adicionales [academicPeriod-Api](https://github.com/JulianRuano/academicPeriod-Api)

* ```Frontend:``` El frontend del sistema está ubicado en un repositorio separado [Frontend Repository](https://github.com/JulianRuano/evaluation_system_frontend). Este frontend consume la API proporcionada por este proyecto, ofreciendo una interfaz de usuario amigable para los diferentes roles de usuarios.
  
---
### 🚀 Configuración del Proyecto

* Instalación de Dependencias: Ejecute `npm install` para instalar las dependencias del proyecto. 
* API Externa en Python: clona el repositorio academicPeriod-Api y sigue las instrucciones.

#### Configuración del archivo .env.development
```c
DB_CNN=
API_PERIOD_URL=http://127.0.0.1:8000
```

#### Compilación del código TypeScript e iniciar el servidor de desarrollo
```
tsc
npm run dev
```


## 🔌 Puertos de la aplicación
El sistema utiliza los siguientes puertos:

Puerto 3000: API principal

Puerto 3001: WebSocket (Observer)

### 👨‍🏫 Registro de un nuevo usuario (Docente)
Realiza una solicitud POST a la siguiente URL para registrar un nuevo usuario (docente):
```bash
localhost:3000/api/auth/register
```
```json
{
    "email": "pedro@email.com",
    "password": "123456",
    "docentType": "Planta",
    "identification": "104321",
    "idType": "CC",
    "title": "pedro@email.com",
    "firstName": "pedro",
    "lastName": "toro"
}
```

### Respuesta esperada:
```json
{
    "message": "Usuario registrado correctamente",
    "payload": {
        "firstName": "pedro",
        "lastName": "toro",
        "email": "pedro@email.com",
        "role": "Docente"
    }
}
```
### Inicio de sesión
```
http://localhost:3000/api/auth/login
```
```json
{
    "email": "pedro@email.com",
    "password": "123456"
}
```

Obtén el token de las cookies para utilizarlo en las siguientes peticiones.
> [!NOTE]
> Asegúrate de gestionar adecuadamente el token para las solicitudes posteriores.

Con estos pasos, habrás configurado y utilizado el sistema de gestión para la autoevaluación de docentes. ¡Esperamos que esta guía te sea útil!

### Rutas API


| Ruta                  | Método | Descripción                                                            |
|-----------------------|--------|------------------------------------------------------------------------|
| /api/educators/getEducators/:role   | GET    | Obtener educadores por rol                               |
| /api/educators/getEducator/:id      | GET    | Obtener un educador por ID                               |
| /api/educators/getAutoEvalByPeriod  | GET    | Obtener autoevaluaciones por periodo                     |
| /api/educators/addNotification      | POST   | Agregar notificación                                     |
| /api/autoEvaluations/periods        | GET    | Obtener todos los periodos                               |
| /api/autoEvaluations /labours               | GET    | Obtener todos los trabajos                       |
| /api/autoEvaluations /labourTypes           | GET    | Obtener todos los tipos de trabajo               |
| /api/autoEvaluations /labour/:id            | GET    | Obtener un trabajo por ID                        |
| /api/autoEvaluations /getAutoEvaluations    | GET    | Obtener todas las autoevaluaciones               |
| /api/autoEvaluations /getAllAutoEvaluations/:id | GET | Obtener todas las autoevaluaciones por ID       |
| /api/autoEvaluations /getPercentageAutoEvaluations | GET | Obtener el porcentaje de autoevaluaciones    |
| /api/autoEvaluations /getAutoEvaluationsByDocentId | GET | Obtener autoevaluaciones por ID de docente   |
| /api/autoEvaluations /period                | POST   | Crear un periodo                                 |
| /api/autoEvaluations /labour                | POST   | Crear un trabajo                                 |
| /api/autoEvaluations /assignLabour          | POST   | Asignar un trabajo                               |
| /api/autoEvaluations /labourType            | POST   | Crear un tipo de trabajo                         |
| /api/autoEvaluations /labour/:id            | PUT    | Actualizar un trabajo por ID                     |
| /api/autoEvaluations /updateAutoEvaluation/:id | PUT | Actualizar una autoevaluación por ID             |
| /api/autoEvaluations /labour/:id            | DELETE | Eliminar un trabajo por ID                       |
| /api/notification/sendEmail | POST | Enviar correo electrónico                                          |

