/*
5. For

a. Crear un array que contenga 5 palabras y recorrer dicho array utilizando un
bucle for de JavaScript para mostrar una alerta utilizando cada una de las
palabras.

b. Al array anterior convertir la primera letra de cada palabra en mayúscula y
mostrar una alerta por cada palabra modificada.

c. Crear una variable llamada “sentence” que tenga un string vacío, luego al array
del punto a) recorrerlo con un bucle for para ir guardando cada palabra dentro de
la variable sentence. Al final mostrar una única alerta con la cadena completa.

d. Crear una array vacío y con un bucle for de 10 repeticiones. Llenar el array con
el número de la repetición, es decir que al final de la ejecución del bucle for
debería haber 10 elementos dentro del array, desde el número 0 hasta al número
9. Mostrar por la consola del navegador el array final (utilizar console.log).
*/
//5.a
var verduras = ["Zanahoria", "Lechuga", "Tomate", "Papa", "Calabaza"];
for (var i=0; i< verduras.length; i++){
    //alert(verduras[i]);
    console.log(verduras[i]);
}
//5.b
for (var i=0; i< verduras.length; i++){
    verduras[i] = verduras[i].charAt(0).toUpperCase() + verduras[i].substring(1).toLowerCase()
    console.log(verduras[i]);
}
//5.c
var sentence = "";
for (var i=0; i< verduras.length; i++){
    sentence = sentence + " " + verduras[i];
}
console.log(sentence);
//5.d
var bArray = [];
for (var i = 0; i < 10; i++){
    bArray.push(i);
}
console.log(bArray);