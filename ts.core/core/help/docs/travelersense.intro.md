Descripción general de plataforma Traveler Sense
--------------

v1.0 del 17 de mayo de 2016

# Webs
* openmarket.travel (b2c cliente final de Traveler Sense)
* yourttoo.com (solo para clientes b2b previo registro)
* su agencia online circuitos (especial para grupo de gestión)
* Marcas blancas (b2b2c)

# Aplicaciones

## APIs
Traveler sense cuenta con 2 versiones de api

### API v 1.
_alias conocidos: **api omt o "api vieja"**_  

Es la primer api que se desarrolló en 2014 exclusivamente en http y la consume openmarket.travel (en migración)

### API v 2.
_alias conocidos: **api yto, api TS o "api nueva"**_  

Es la versión que se desarrolla desde mediados de 2015 actualmente solo por sockets (estamos trabajando en la version http) se lanzó junto con yourttoo.com

## Gestor de contenidos
Utilizamos keystone CMS para gestionar los contenidos de las webs

## Servicios

## Base de datos
Utilizamos mongo DB v.3.2

## Aplicaciones en entornos

Servicios/Aplicaciones | Producción | Test | Alternativo
----|-----
api v1 | http://tscores.cloudapp.net:3000 | http://yourttootest.cloudapp.net:3000
api v2 | http://tscores.cloudapp.net:6033 | http://yourttootest.cloudapp.net:6033
web yourttoo | http://tswebs.cloudapp.net:80 | http://yourttootest.cloudapp.net:80
web openmarket | http://openmarket.travel | http://yourttootest.cloudapp.net:82 | http://yourttoo.com:82
web sao | http://tswebs.cloudapp.net:1200 | http://yourttootest.cloudapp.net:1200
keystone CMS | http://openmarketprd.cloudapp.net:3005 | http://yourttootest.cloudapp.net:3005



Nomenclatura
--------------

## Usuarios

### Traveler
Es el cliente final que reserva en openmarket.travel o marcas blancas

### DMC
Es el proveedor de servicios en este caso son los receptivos o destination manager companies

### Affiliate
Es el usuario de yourttoo.com nuestro cliente B2B el que va a tener la posibilidad de tener una marca blanca.

### Admin
Son los administradores del sistema

-----

## Productos

### Programa Multidays
Es la programación regular cargada por por los DMCs

### A medida o tailormade
Son las solicitudes a medida que realizan los Travelers o los Afiliados



Reserva
---------------
## Variables y construcción de precios

## amount
Es el monto totla que tiene que percibir Traveler Sense  
corresponde en openmarket.travel a:

* pvp cliente final omt  

corresponde en yourttoo.com a:
* neto agencia

## PVP cliente final
Es el valor que carga el DMC en sus progrmas  
El DMC carga en los programas multidays

## Neto AV (agencia de viajes)

PVP DMC	| comision b2b/b2c	| Neto DMC | omtmargin| MARGEN NETO OMT | Neto AV | COMISION % AAVV | PVP AAVV	 | NETO A PAGAR OMT
-- | --
1.000	 | 13%	 | 870 | 3%	| 27	 | 897	 | 15% | 	1.055	 | 897
PVP DMC | COMISION % OMT | PVP DMC - COMISION B2B | MARGEN % OMT | PRECIO NETO AV - NETO DMC | NETO DMC / (1-% MARGEN % OMT) | fee % AV | NETO AAVV / (1-fee % AV) | = PVP AV - COMISION % AGENCIA  VIAJES



```javascript
```
## PVP DMC
Es el precio que carga el dmc en el producto multidays

```javascript
```
## Neto DMC
PVP DMC - comision (b2b/b2c)
```javascript
```
## comision b2c
comision b2c del DMC
```javascript
 comission: { type: Types.Number },
```
## comision b2b
es la comision b2b del dmc
```javascript
b2bcommission: { type: Types.Number },
```
## omtmargin
Es lo que OMT le puso como margen a ese afiliado
```javascript
 omtmargin: { type: Types.Number },
```
## fees
```javascript
fees: {
       unique: { type: Types.Number, index: true },
       groups: { type: Types.Number, index: true },
       tailormade: { type: Types.Number, index: true },
       flights: { type: Types.Number, index: true }
   },
```


#TODO

Booking model actions
