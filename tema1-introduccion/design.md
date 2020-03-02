# Diseño: Smells, Strategy Pattern y el Switch Smell

## Code Smells

### Definición de *Code Smell* de la Wikipedia:

According to Martin Fowler, *"a **code smell** is a surface indication that usually corresponds to a deeper problem in the system"*.

Smells are certain structures in the code that indicate violation of fundamental design principles and negatively impact design quality.

Code smells **are usually not bugs**. They are not technically incorrect and do not currently prevent the program from functioning. Instead, **they indicate weaknesses in design** that may be slowing down development or increasing the risk of bugs or failures in the future.


### Application-level smells:
* **Duplicated code:** identical or very similar code exists in more than one location.
* **Contrived complexity:** forced usage of overcomplicated design patterns where simpler design would suffice.

### Class-level smells:
* **Large class:** a class that has grown too large. See God object.
* **Feature envy:** a class that uses methods of another class excessively.
* **Inappropriate intimacy:** a class that has dependencies on implementation details of another class.
* **Refused bequest:** a class that overrides a method of a base class in such a way that the contract of the base class is not honored by the derived class. See Liskov substitution principle.
* **Lazy class / Freeloader:** a class that does too little.
* **Excessive use of literals:** these should be coded as named constants, to improve readability and to avoid programming errors. Additionally, literals can and should be externalized into resource files/scripts where possible, to facilitate localization of software if it is intended to be deployed in different regions.
* **Cyclomatic complexity:** too many branches or loops; this may indicate a function needs to be broken up into smaller functions, or that it has potential for simplification.
* **Downcasting:** a type cast which breaks the abstraction model; the abstraction may have to be refactored or eliminated.
* **Orphan Variable or Constant class:** a class that typically has a collection of constants which belong elsewhere (typically a problem when using a Constants class ) where those constants should be owned by one of the other member classes.

### Method-level smells:

* **Too many parameters:** a long list of parameters is hard to read, and makes calling and testing the function complicated. It may indicate that the purpose of the function is ill-conceived and that the code should be refactored so responsibility is assigned in a more clean-cut way.
* **Long method:** a method, function, or procedure that has grown too large.
* **Excessively long identifiers:** in particular, the use of naming conventions to provide disambiguation that should be implicit in the software architecture.
* **Excessively short identifiers:** the name of a variable should reflect its function unless the function is obvious.
* **Excessive return of data:** a function or method that returns more than what each of its callers needs.

### Switch Smell

* El uso de un `switch` es siempre un punto débil: si introducimos nuevas casos deberemos modificar el código de la clase original en la que está el switch introduciendo un nuevo `case`.

 Viola el principio *Open/Closed*.

### Eliminate JavaScript Code Smells

Vea el Vídeo  de Elijah Manor.

Presta especial atención al *code smell* **Switch Statement Smell** desde el minuto 11:37 al 29:15.

[![](https://img.youtube.com/vi/JVlfj7mQZPo/0.jpg)](https://www.youtube.com/watch?v=JVlfj7mQZPo)

Pueden encontrar las [trasparencias](http://elijahmanor.com/talks/js-smells/#/) de la presentación en [http://elijahmanor.com/talks/js-smells/#/](http://elijahmanor.com/talks/js-smells/#/).

## El principio *Open/Closed*

* *"software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification"*;
that is, such an entity can allow its behaviour to be extended without modifying its source code.

## Strategy Design Pattern

La solución para eliminar el *Switch Smell* es usar el `strategy design pattern`. Vea como hacerlo en este vídeo.

The basic idea  of the `strategy design pattern` is to **delegate tasks to encapsulated algorithms which are interchangable at runtime**.

In the Strategy pattern we have an object (the *context*) that is trying to get something done. But to get that thing done, we need to supply the context with a second object, called the *strategy*, that helps￼ to get the thing done.

  1. Define a family of objects which all do the same thing
  2. Ensure the family of objects share the same interface so that they are interchangable.

Otro ejemplo, también de Elijah Manor se encuentra en el artículo [Switching to the Strategy Pattern in JavaScript](http://elijahmanor.com/switching-to-the-strategy-pattern-in-javascript/).

## Ejemplo

* [ULL-ESIT-GRADOII-DSI/temperature-oop-noswitch](https://github.com/ULL-ESIT-GRADOII-DSI/temperature-oop-noswitch/tree/sepfiles)

## Referencias

* [Apuntes del curso 15/16: Code Smells/Código Hediondo](https://casianorodriguezleon.gitbooks.io/pl1516/content/apuntes/codesmell.html)
* [Apuntes del curso 16/17: Patrones de Diseño](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/patterns/)
* [Apuntes del curso 15/16: Eliminando Switch Smell](https://casianorodriguezleon.gitbooks.io/pl1516/content/practicas/noswitchsmell.html)
* [Apuntes del curso 16/17: Strategy Pattern](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/patterns/strategypattern.html)
* [Apuntes del curso 16/17: Práctica: Evaluar Strategy Pattern](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicaevaluastrategypattern.html)
* [Apuntes del curso 16/17: Práctica: Creación de Paquetes NPM y Strategy Pattern](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicamodulestrategypattern.html)
* [JSHint](http://jshint.com/)
