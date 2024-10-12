# Run this shell script to generate the keys automatically, in case they are
# missing.
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out ca.key
openssl req -x509 -new -nodes -key ca.key -sha256 -days 365 -out ca.crt
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:4096 -out server.key
openssl req -new -key server.key -out server.csr && openssl x509 \
    -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
    -out server.crt -days 365 -sha256
