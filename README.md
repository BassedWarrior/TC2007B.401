# Sistema de CRM para Fundación Sanders 
## TC2007B.401
Integración de seguridad informática en redes y sistemas de software (Gpo 401).
Repo del equipo.

## Miembros de equipo
- [Miguel Enrique Soria](https://github.com/MESC2004)
- [Fausto Jiménez de la Cuesta Vallejo](https://github.com/BassedWarrior)
- [Hector Julián Zárate Ramirez](https://github.com/HJZR2004)
- [Valentina González Hernández](https://github.com/paydelimon22)

# Instalación

## Clonar el repositorio

```
git clone https://github.com/BassedWarrior/TC2007B.401
```

## Certificados y HTTPS

Como prueba de concepto, este proyecto únicamente contempla la utilización
de llaves y certificados auto generados y auto firmados para el uso del
protocolo de HTTPS. Para ello, se utiliza la librería de `openssl`. De modo
que localmente, se cuente con los certificados requeridos para correr el
proyecto con HTTPS.

Dentro de los directorios de `/frontend` y `/backend`, se requiere generar
subdirectorios `/frontend/crm/certs` y `/backend/certs`, y dentro de estos, se
deben correr los siguientes comandos en terminal:

1. Generar una llave privada para la Autoridad Certificadora (CA):
```sh
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out ca.key
```
2. Generar el certificado raíz para la CA:
```sh
openssl req -x509 -new -nodes -key ca.key -sha256 -days 365 -out ca.crt
```
3. Generar una llave privada para tu servidor:
```sh
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out server.key
```
4. Crear una Solicitud de Firma de Certificado (CSR) para el servidor:
```sh
openssl req -new -key server.key -out server.csr
```
5. Firmar un CSR:
```sh
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365 -sha256
```

Todos los archivos se deben de ignorar con archivos
`/frontend/certs/.gitignore`, `/backend/certs/.gitignore` que contengan lo
siguiente:
```
*
```
De modo que se ignore completamente todo el contenido del directorio, ya que
no se deben de publicar las llaves, ni los certificados como buena práctica de
seguridad. Aún si fuera inconsecuente ya que es únicamente una prueba de
concepto como parte de los requisitos de la materia.

## Variables de entorno

### Backend
En la raíz de `\backend` debe existir un archivo `.env` con los siguientes elementos.

```
  MONGO_URI=mongodb://localhost:27017/SandersDB
  PORT=5001
  JWT_SECRET=super_secret_phrase
  JWT_EXPIRATION_TIME=3600
```

### Frontend

En `\frontend\crm`:
```
  VITE_API_URL=https://localhost:5001/api
```

En `\frontend\donaciones`:
```
  HTTPS=true
```

## Instalación de dependencias del proyecto

En la raíz del proyecto, corre el comando:
```npm run dependencies```

## Creación de usuario administrativo

En la raíz del proyecto, corre el comando:
```npm run SUDOcreate```

> [!WARNING]
> Se necesita instalar en el sistema [Mongodb](https://www.mongodb.com/docs/manual/installation/) y [Mongosh](https://www.mongodb.com/try/download/shell) para poder correr la base de datos e insertar el usuario administrativo con este comando.

Esto creara un usuario para acceder al crm con las siguientes credenciales:
- Username: `admin`
- Contraseña: `admin`

## Correr el proyecto

Utiliza el comando `npm start` para correr el proyecto. Si todo se instaló de manera apropiada deberías ver mensajes en la terminal de `[DONOS], [FRONT] y [BACK]`.
Puedes acceder al CRM con las credenciales creadas en la URL [https:localhost:5173](https://localhost:5173) y al portal de donaciones en la URL [https://localhost:3000](https://localhost:3000), o los puertos que se hayan configurado en los archivos `.env`.
