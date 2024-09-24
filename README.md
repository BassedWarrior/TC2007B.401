# TC2007B.401
Integración de seguridad informática en redes y sistemas de software (Gpo 401).
Repo del equipo.

## Certificados y HTTPS

Como prueba de concepto, este proyecto únicamente contempla la utilización
de llaves y certificados auto generados y auto firmados para el uso del
protocolo de HTTPS. Para ello, se utiliza la librería de `openssl`. De modo
que localmente, se cuente con los certificados requeridos para correr el
proyecto con HTTPS.

Dentro de los directorios de `/frontend` y `/backend`, se requiere generar
subdirectorios `/frontend/certs` y `/backend/certs`, y dentro de estos, se
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
