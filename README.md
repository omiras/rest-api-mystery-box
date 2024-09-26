# Mystery Box 

La empresa Mytsery Box ha lanzado una campaña agresiva para vender el mayor núemero de _cajas misteriorias_ . Amigos y parejas de todo el mundo están comprando sus códigos porque no saben que regalar para cumpleaños y fechas destacadas.

![Mystery Box](wonder.jpg)

Al comprar una Mystery Box obtienes un código único asociado a una experiencia _sorpresa_. Debes canjear el código para obtener la experiencia, y además, hay que canjearlo antes de la fecha de caducidad.

## Iteración 1: Importar datos

Des de el CRM de Ventas de la empresa han generado una hoja Excel con todos los cupones disponibles. Incluso algunos ya han sido canjeados en las oficinas de Mystery Box. 

Busca la manera de importar este fichero Excel a una base de datos de MongoDB.
El resultado final es que debes obtener una base de datos de nombre **mystery_box**, y una colección de nombre **cupounCodes** 

Para este proceso no necesitas montar una app MVC. Crea un fichero de nombre **importDB.js** que sea capaz de leer el fichero **cupounDB.xlsx** e inserte todos los registro como documentos en la base de datos

## Iteración 2: Creación de la REST API

Por el momento se desea implementar un único _endpoint_ para que sea consumido tanto por la app Web http://mystery-box-prizes.com como por la app que se puede uno descargar en Google Play o Apple Store.

`PATCH /api/mystery-box/:code`

En el cuerpo de la solicitud en formato JSON se debe incluir la siguiente información para informar a la API que se quiere canjear el código:

```
{
  "redeemed": true
}
```

### Casos de error

Investiga la respuesta de error HTTP adecuada para cada caso.
La API debe contestar de la siguiente forma:

1. Si el cupon ya ha sido canjeado con anterioridad:

```
{
  "error": "CouponAlreadyRedeemed",
  "message": "This coupon has already been redeemed."
}
```

2. Si el cupón ha caducado:

```
{
  "error": "CouponExpired",
  "message": "This coupon has expired and cannot be redeemed."
}
```

3. Si se ha proporcionado un ID de cupón que no existe en la base de datos

```
{
  "error": "CouponNotFound",
  "message": "The coupon code  provided does not exist."
}
```

### Caso que existe el cupón, no se ha canjeado anteriorimente y no se ha caducado

Debe devolver un mensaje de éxito y código HTTP adecuado. Ejemplo:

```
{
  "message": "Coupon redeemed successfully.",
  "reward": "Night at a 5-star hotel"
}
```
 
## Iteración 3: Creación del cliente

Crea un cliente muy simple que consuma la REST API.
Puede tratarse de un campo para introducir el cupon y un botón para canjearlo
Si el cupón es correcta, aparecerá el nombre del premio.
Si no es correcto, debe informar al usuario adecuadamente de cuál es el motivo por el que no se puede canjear dicho cupón

Hay dos opciones para crear el cliente

1. Crea un poroyecto nuevo de Visual Studio (abre una nueva ventana) usando tan solo HTML/CSS/JavaScript. Usa adecuadamente el método _fetch_ para consumir la API como [en otros proyectos](https://github.com/omiras/random-joke-api-project).

2. Crea un endpoint /redeem-code que renderice un HTML con el formulario similar al punto anterior. Usa adecuadamente el método _fetch_ para consumir la API.



