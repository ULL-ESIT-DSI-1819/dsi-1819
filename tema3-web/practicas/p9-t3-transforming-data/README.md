# Práctica Transforming Data and Testing Continuously (p9-t3-transfoming-data)

In this lab, you’ll learn how to use Node.js to transform XML data into JSON and line-delimited JSON (LDJ). 

Deberá primero estar autenticado en [BULL PuntoQ](https://www.ull.es/servicios/biblioteca/servicios/puntoq/), luego lea:
    
El Capítulo 5 "Transforming Data and Testing Continuously" de [Node.js 8 the Right Way]({{site.bull_permanente}}/15vbjs7/ullsfx4340000000247287). Jim Wilson. 2018  
y resuelva los problemas en la secciónes *Extracting Classification Codes* y *Extracting Sources*

* En el repo creado al aceptar la assignación deberá dejar
  - Los códigos de los ejemplos realizados durante la lectura, 
  - Capturas de ejecuciones
  - Las pruebas,
  - Añada integración contínua con [Travis](https://crguezl.github.io/ull-esit-1617/_book/apuntes/pruebas/travis.html) (Haga un badge en su README.md)
  - Las soluciones a los problemas planteados 
  - Un `gulpfile.js` para la ejecución de las tareas
  - Un `README.md` con un tutorial explicando lo que ha aprendido. 

Suba el enlace al repo en el campus.

## Procuring External Data

Before we can start manipulating data with Node.js, we have to get it. The data we’ll be using comes from [Project Gutenberg](http://www.gutenberg.org/), which is dedicated to making public-domain works available as free ebooks.

[Project Gutenberg](http://www.gutenberg.org/) produces catalog download bundles that contain Resource Description Framework (RDF) files for each of its 53,000-plus books. 
(RDF is an XML-based format.) The bz2 compressed version of the catalog file is about 40 MB. Fully extracted, it contains a little over 1 GB of RDF files.

See [Section *The Complete Project Gutenberg Catalog*](https://www.gutenberg.org/wiki/Gutenberg:Feeds)

To obtain the data:

```
curl -O https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2
```

then you have to extract the files form the archive:

```
tar -xvjf rdf-files.tar.bz2
```

I made a `gulpfile.js` to simplify the execution of tasks and included a target `c5-get-guttenberg`:

(Here is my [`gulpfile.js`](https://github.com/ULL-MII-CA-1819/nodejs-the-right-way/blob/master/gulpfile.js) not available at the moment)

See the code of the gulp task:

```js
var gulp = require('gulp');
var shell = require('gulp-shell');

// ... many tasks omitted

/********************* CHAPTER 5 *********************/
// Chapter 5: Transforming Data and Testing Continuously
gulp.task("c5-get-guttenberg", shell.task(
    /* curl option -O, --remote-name
        Write  output to a local file named like the remote file we get. (Only the file part of the remote file is used, the path
        is cut off.)
        The file will be saved in the current working directory. If you want the file saved in a different directory,  make  sure
        you change the current working directory before invoking curl with this option.
        The remote file name to use for saving is extracted from the given URL, nothing else, and if it already exists it will be
        overwritten.
    */
    'cd transforming-data-and-testing-continuously-chapter-5/data && ' +
    'curl -O https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2 &&' +
    /*
    -x      Extract to disk from the archive.  If a file with the same name appears more than once in the archive, each copy will be
          extracted, with later copies overwriting (replacing) earlier copies.
    -j      (c mode only) Compress the resulting archive with bzip2(1).  In extract or list modes, this option is ignored.  Note that,
          unlike other tar implementations, this implementation recognizes bzip2 compression automatically when reading archives.
    -f file
            Read the archive from or write the archive to the specified file.  The filename can be - for standard input or standard
          output.
    -v      Produce verbose output.  In create and extract modes, tar will list each file name as it is read from or written to the
         archive.  In list mode, tar will produce output similar to that of ls(1).  Additional -v options will provide additional
         detail.
    */
    'tar -xvjf rdf-files.tar.bz2'
));
```

I'm using gulp version 3.9 (not compatible with 4.0):

```
[~/local/src/CA/sol-nodejs-the-right-way(master)]$ gulp --version
[15:02:08] CLI version 3.9.1
[15:02:08] Local version 3.9.1
``` 


This is the tree structure. Directory `data` contains the guttenberg data.

```
[~/local/src/CA/sol-nodejs-the-right-way/transforming-data-and-testing-continuously-chapter-5(master)]$ tree -L 3
.
├── data
│   ├── README.md
│   └── cache
│       └── epub
├── databases
│   ├── README.md
│   ├── lib
│   │   └── parse-rdf.js
│   ├── rdf-to-bulk.js
│   ├── rdf-to-json.js
│   └── test
│       ├── parse-rdf-test.js
│       └── pg132.rdf
└── jim-r-wilson-databases-solutions -> ../nodejs-the-right-way/databases

~/local/src/CA/sol-nodejs-the-right-way/transforming-data-and-testing-continuously-chapter-5(master)]$ ls -l data/cache/epub/ | head -n 5
total 0
drwxr-xr-x  3 casiano  staff  96 25 oct 15:19 0
drwxr-xr-x  3 casiano  staff  96 25 oct 15:20 1
drwxr-xr-x  3 casiano  staff  96 25 oct 15:19 10
drwxr-xr-x  3 casiano  staff  96 25 oct 15:19 100
[~/local/src/CA/sol-nodejs-the-right-way/transforming-data-and-testing-continuously-chapter-5(master)]$ ls -l data/cache/epub/100
total 24
-rw-r--r--  1 casiano  staff  10868 25 oct 10:00 pg100.rdf
```  

Book [132](../data/cache/epub/132/pg132.rdf) is *The Art of War*:

```xml
[~/local/src/CA/sol-nodejs-the-right-way/transforming-data-and-testing-continuously-chapter-5(master)]$ head -20 data/cache/epub/132/pg132.rdf
<?xml version="1.0" encoding="utf-8"?>
<rdf:RDF xml:base="http://www.gutenberg.org/"
  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
  xmlns:pgterms="http://www.gutenberg.org/2009/pgterms/"
  xmlns:dcterms="http://purl.org/dc/terms/"
  xmlns:marcrel="http://id.loc.gov/vocabulary/relators/"
  xmlns:cc="http://web.resource.org/cc/"
  xmlns:dcam="http://purl.org/dc/dcam/"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
>
  <pgterms:ebook rdf:about="ebooks/132">
    <dcterms:publisher>Project Gutenberg</dcterms:publisher>
    <dcterms:subject>
      <rdf:Description rdf:nodeID="N5def35f1db104b7c836569744b4390be">
        <rdf:value>Military art and science -- Early works to 1800</rdf:value>
        <dcam:memberOf rdf:resource="http://purl.org/dc/terms/LCSH"/>
      </rdf:Description>
    </dcterms:subject>
    <dcterms:hasFormat>
      <pgterms:file rdf:about="http://www.gutenberg.org/ebooks/132.epub.noimages">
```

The important pieces of information that we’d like to extract are as follows:

- The Gutenberg ID (132)
- The book’s title
- The list of authors (agents)
- The list of subjects

What we want to have:

A way to transform all these XML files to equivalent JSON documents, suitable for passing in to [elasticsearch](https://www.elastic.co/blog/a-practical-introduction-to-elasticsearch)

```
[~/local/src/CA/sol-nodejs-the-right-way/transforming-data-and-testing-continuously-chapter-5(master)]$ node databases/rdf-to-json.js data/cache/epub/132/pg132.rdf
```

```json
{
  "id": 132,
  "title": "The Art of War",
  "authors": [
    "Sunzi, active 6th century B.C.",
    "Giles, Lionel"
  ],
  "subjects": [
    "Military art and science -- Early works to 1800",
    "War -- Early works to 1800"
  ]
}
```

## Extracting Classification Codes

- When extracting fields from the Project Gutenberg RDF (XML) files,
in Traversing the Document, we specifically selected the Library
of Congress Subject Headings (LCSH) and stored them in an array
called subjects.
- At that time, we carefully avoided the Library of
Congress Classification (LCC) single-letter codes. Recall that the
LCC portion of an RDF file looks like this:

```xml
<dcterms:subject>
  <rdf:Description rdf:nodeID="Nfb797557d91f44c9b0cb80a0d207eaa5">
    <dcam:memberOf rdf:resource="http://purl.org/dc/terms/LCC"/>
    <rdf:value>U</rdf:value>
  </rdf:Description>
</dcterms:subject>
```

Using your BDD infrastructure built on Mocha and Chai, implement the following:

* Add a new assertion to `parse-rdf-test.js` that checks for `book.lcc`. 
* It should be of type `string` and it should be at least one character long.
* It should start with an uppercase letter of the English alphabet, but not I, O, W, X, or Y.

1. Run the tests to see that they fail.
2. Add code to your exported module function in `parse-rdf.js` to make the tests pass.


## Extracting Sources

Most of the metadata in the Project Gutenberg RDF files describes
where each book can be downloaded in various formats. 

For example,
here’s the part that shows where to download the plain text of The
Art of War:

```xml
<dcterms:hasFormat>
  <pgterms:file rdf:about="http://www.gutenberg.org/ebooks/132.txt.utf-8">
    <dcterms:isFormatOf rdf:resource="ebooks/132"/>
    <dcterms:modified rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">
    2016-09-01T01:20:00.437616</dcterms:modified>
    <dcterms:format>
      <rdf:Description rdf:nodeID="N2293d0caa918475e922a48041b06a3bd">
        <dcam:memberOf rdf:resource="http://purl.org/dc/terms/IMT"/>
        <rdf:value
        rdf:datatype="http://purl.org/dc/terms/IMT">text/plain</rdf:value>
      </rdf:Description>
    </dcterms:format>
    <dcterms:extent rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">
    343691</dcterms:extent>
  </pgterms:file>
</dcterms:hasFormat>

        ...

<dcterms:hasFormat>
      <pgterms:file rdf:about="http://www.gutenberg.org/ebooks/132.kindle.noimages">
        <dcterms:isFormatOf rdf:resource="ebooks/132"/>
        <dcterms:modified rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2015-08-01T01:24:38.440052</dcterms:modified>
        <dcterms:extent rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">598678</dcterms:extent>
        <dcterms:format>
          <rdf:Description rdf:nodeID="N90d807c6b2a042078ac4e05e8e265dd7">
            <rdf:value rdf:datatype="http://purl.org/dc/terms/IMT">application/x-mobipocket-ebook</rdf:value>
            <dcam:memberOf rdf:resource="http://purl.org/dc/terms/IMT"/>
          </rdf:Description>
        </dcterms:format>
      </pgterms:file>
</dcterms:hasFormat>
```

Suppose we wanted to include a list of download sources in each
JSON object we create from an RDF file. 

To get an idea of what data
you might want, take a look at the [Project Gutenberg page for The
Art of War](http://www.gutenberg.org/ebooks/132).

Consider these questions:

* Which fields in the raw data would we want to capture, and which could we discard?
* What structure would make the most sense for this data?
* What information would you need to be able to produce a table that looked like the one on the Project Gutenberg site?

Once you have an idea of what data you’ll want to extract, try
creating a JSON object by hand for this one download source. When
you’re happy with your data representation, use your existing
continuous testing infrastructure and add a test that checks for
this new information.

Finally, extend the book object produced in `parse-rdf.js` to include
this data to make the test pass.


## Recursos

* [GitHub repo ULL-MII-CA-1819/nodejs-the-right-way](https://github.com/ULL-MII-CA-1819/nodejs-the-right-way)
* [BULL PuntoQ](https://www.ull.es/servicios/biblioteca/servicios/puntoq/)
* [Safari. Chapter 5
Transforming Data and Testing Continuously](https://proquest-safaribooksonline-com.accedys2.bbtk.ull.es/book/web-development/9781680505344/part-iidot-working-with-data/chp_databases_html#X2ludGVybmFsX0h0bWxWaWV3P3htbGlkPTk3ODE2ODA1MDUzNDQlMkZjaHBfdHJhbnNmb3JtaW5nX2RhdGFfaHRtbCZxdWVyeT0=)
* [Sección Pruebas en los Apuntes del curso 16/17](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/)
  * [Mocha](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/mocha.html)
  * [Should](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/mocha.html#should)
  * [Travis](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/travis.html)
  * [Chai](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/chai.html)
  * [Sinon](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/sinon.html)
  * [Karma](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/karma.html)
  * [Covering](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/covering.html)
  * [Blanket](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/blanket.html)
  * [Istanbul](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/istanbul.html)
  * [BrowserSync](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/browsersync.html)
* Pruebas en el Navegador/Browser
  * [Learning JavaScript Test-Driven Development by Example](https://www.sitepoint.com/learning-javascript-test-driven-development-by-example/) SitePoint Tutorial
  * [Mocha y Chai en el navegador. Apuntes del curso 15/16](https://casianorodriguezleon.gitbooks.io/pl1516/content/practicas/mochachaisinon.html)
  * [Testing your frontend JavaScript code using mocha, chai, and sinon. Nicolas Perriault](https://nicolas.perriault.net/code/2013/testing-frontend-javascript-code-using-mocha-chai-and-sinon/)
   [Covering](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/covering.html)
    * [Blanket](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/blanket.html)
    * [Istanbul](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/istanbul.html)
    * [BrowserSync](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/browsersync.html)


