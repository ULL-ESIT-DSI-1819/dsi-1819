# Reto para la práctica p4-t2-networking

Escriba un servidor que permita un *chat* via `telnet` o `netcat`.

Cuando se arranca el sevidor debe decir algo como esto:

```
server$ node chat-server.js 
Server listening at http://localhost:8000
```

Después si se conecta un cliente, debe recibir un mensaje de bienvenida:

```
1$ nc localhost 8000
Welcome to telnet chat!
```

En la consola del server debe reflejarse que un cliente se ha conectado:

```
server$ node chat-server.js 
Server listening at http://localhost:8000
Guest1 joined this chat.
```

Si desde otra terminal se conecta otro cliente ...

```
2$ nc localhost 8000
Welcome to telnet chat!
```

y un cliente escribe algo ...

```
1$ nc localhost 8000
Welcome to telnet chat!
Guest2 joined this chat.
hello all!
```

debe reflejarse en el resto de los clientes:

```
2$ nc localhost 8000
Welcome to telnet chat!
Guest1> hello all!
```

así como en la consola del server:

```
server$ node chat-server.js 
Server listening at http://localhost:8000
Guest1 joined this chat.
Guest2 joined this chat.
Guest1> hello all!
```
