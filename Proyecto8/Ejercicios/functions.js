/*
Funciones

a. Crear una función suma que reciba dos valores numéricos y retorne el resultado.
Ejecutar la función y guardar el resultado en una variable, mostrando el valor de
dicha variable en la consola del navegador.

b. A la función suma anterior, agregarle una validación para controlar si alguno de
los parámetros no es un número, mostrar una alerta aclarando que uno de los
parámetros tiene error y retornar el valor NaN como resultado.

c. Crear una función validate integer que reciba un número como parámetro y
devuelva verdadero si es un número entero.

d. A la función suma del ejercicio 6b) agregarle una llamada que valide que los
números sean enteros. En caso que haya decimales mostrar un alerta con el
error y retorna el número convertido a entero (redondeado).

e. Convertir la validación del ejercicio 6d) en una función separada y llamarla
dentro de la función suma probando que todo siga funcionando igual
*/

//6.a
function suma(a,b){
    return a + b;
}

var num1 = 1;
var num2 = 5;
var resultado = suma (num1, num2);
console.log(resultado); 
//6.b
function sumaValidada(a,b){
    if (typeof a  !== "number" || typeof b !== "number"){
        console.log("Uno de los parametros no es numerico");
    } else {
        return a+b;
    }
}
console.log(sumaValidada(1,"b"));
//6.c
function validarEnteros(a){
    return Number.isInteger(a);
}
console.log(2.2,validarEnteros(2.2));
console.log(5,validarEnteros(5));
//6.d

function validarEnterosMejorada(a,b){
    if (typeof a  !== "number" || typeof b !== "number"){
        console.log("Uno de los valos ingresados no es numerico");
        return NaN;
    }
    if (!Number.isInteger(a)){
        alert(`El valor de a: ${a} no es entero`)
        a = Math.round(a);
    }
    if (!Number.isInteger(b)){
        alert(`El valor de b: ${b} no es entero`)
        b = Math.round(b);
    }

    return a + b;
}
console.log(validarEnterosMejorada(6, 6));

//6.e

function validarEnterosMejorada(a,b){
    if (typeof a  !== "number" || typeof b !== "number"){
        console.log("Uno de los valos ingresados no es numerico");
        return NaN;
    }

    return valEnteros([a,b]);
}

function valEnteros(arr){
    if (!Number.isInteger(arr[0])){
        alert(`El valor de a: ${arr[0]} no es entero`);
        arr[0] = Math.round(arr[0]);
    }
    if (!Number.isInteger(arr[1])){
        alert(`El valor de b: ${arr[1]} no es entero`);
        arr[1] = Math.round(arr[1]);
    }
    return arr[0] + arr[1]
}
console.log(validarEnterosMejorada(1,3));