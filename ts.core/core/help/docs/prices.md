Nomenclatura
--------------

Reserva
---------------
## Variables y construcción de precios

## Amount
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
