/*Arrays

a. Dado el siguiente array: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] mostrar por
consola los meses 5 y 11 (utilizar console.log).

b. Ordenar el array de meses alfabéticamente y mostrarlo por consola (utilizar sort).

c. Agregar un elemento al principio y al final del array (utilizar unshift y push).

d. Quitar un elemento del principio y del final del array (utilizar shift y pop).

e. Invertir el orden del array (utilizar reverse).

f. Unir todos los elementos del array en un único string donde cada mes este
separado por un guión - (utilizar join).

g. Crear una copia del array de meses que contenga desde Mayo hasta Noviembre
(utilizar slice).*/
//3.a
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
console.log(meses[4],meses[10])
//3.b
var mOrdenados = [...meses].sort();
console.log(mOrdenados .toString());
//3.c

meses.unshift("inicio");
meses.push("final");
console.log(meses.toString());
//3.d
meses.shift();
meses.pop();
console.log(meses.toString());
//3.e
var mInvertidos = [...meses].reverse();

console.log(mInvertidos.toString());
//3.f
var mSeparados = meses.join(" - ");
console.log(mSeparados);
//3.g
var mSlice = [...meses].slice(4,11);
console.log(mSlice.toString());