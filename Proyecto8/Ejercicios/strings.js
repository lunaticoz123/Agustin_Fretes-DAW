/*a. Crear una variable de tipo string con al menos 10 caracteres y convertir todo el
texto en mayúscula (utilizar toUpperCase).
b. Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
string con los primeros 5 caracteres guardando el resultado en una nueva
variable (utilizar substring).
c. Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
string con los últimos 3 caracteres guardando el resultado en una nueva variable
(utilizar substring).
d. Crear una variable de tipo string con al menos 10 caracteres y generar un nuevo
string con la primera letra en mayúscula y las demás en minúscula. Guardar el
resultado en una nueva variable (utilizar substring, toUpperCase, toLowerCase y
el operador +).
e. Crear una variable de tipo string con al menos 10 caracteres y algún espacio en
blanco. Encontrar la posición del primer espacio en blanco y guardarla en una
variable (utilizar indexOf).
f. Crear una variable de tipo string con al menos 2 palabras largas (10 caracteres y
algún espacio entre medio). Utilizar los métodos de los ejercicios anteriores para
generar un nuevo string que tenga la primera letra de ambas palabras en
mayúscula y las demás letras en minúscula (utilizar indexOf, substring,
toUpperCase, toLowerCase y el operador +)*/
//2.a
var str = "federico benedetti";
strUpper = str.toUpperCase();
console.log("2.a:",strUpper);
//2.b
var str2 = str.substring(0,5);
console.log("2.b:",str2);
//2.c
var str3 = str.substring(str.length-3);
console.log("2.c:",str3);
//2.d
var str4 = str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase();
console.log("2.d:",str4);
//2.e
var space = str.indexOf(" ");
console.log("2.e: La posicion del espacio en blanco es:",space);
//2.f
var str5 = str.substring(0,1).toLocaleUpperCase() + str.substring(1,space).toLowerCase() + str.substring(space,space+1) + str.substring(space+1,space + 2).toUpperCase() + str.substring(space +2).toLowerCase();
console.log(str5);