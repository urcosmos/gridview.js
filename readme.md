# GridView.js
Class for creating tables
Current version 0.1.

Read documentation in another languages:
* RU - Русский - https://github.com/urcosmos/gridview.js/blob/master/README-ru.md

## Content
* [Introduction](#introduction)
* [Capability](#capability)
* [Documentation](#documentation)
  * [Getting start](#getting-start)
  * [Input data](#input-data)
  * [Table configuration](#table-configuration)
* [Example of use](#example-of-use)
* [Update](#update)
* [License](#license)

## Introduction
[Back to content][toc]

GridView.js is a class for creating tables from array of data.
This file is a continuation of Alexandr's Luschenko GridView class in his OOP JS course (https://itgid.info/).

## Capability
[Back to content][toc]

* Create table from data array and set css styles;
* Add table title and set css style;
* Set output style for cell like plain text or like html;
* Set handler function for cell value.

## Documentation
[Back to content][toc]

### Getting start
[Back to content][toc]

First, link GridView.js to your project. You may use minified version.

```html
<!-- index.html -->

<script src="js/class/GridView.js"></script>
<!-- or -->
<script src="js/class/GridView.min.js"></script>
```

Then create new instance of GridView in your scripts file..

```js
// script.js

// create object
let gridView = new GridView();
```

Then set table configuration...

```js
// script.js

// table configuration
const gridViewConfig = {
  // list of parameters
};
```

...and do `.render()` method for adding table to document.

```js
// script.js

// add table to document
gridView.render(gridViewConfig); // use configuration object as argument to .render() method
```

Also, you need input data for table. Write it before you create table object.

```js
// script.js

// input data for table
const dataExample = [{
    // list of columns for one row
  },
  {
    // list of columns for one row
  },
    // etc.
];
```

### Input data
[Back to content][toc]

Input data should be presented as array of objects, where each object it's a data for one row. Key of object is a column name, value - cell value in this column. Number of columns is infinite. Key of object must be the same as name in attribute (column name) (see [Table configuration](#table-configuration) section).

```js
// script.js

// input data example with two rows (without row of columns header).
const dataExample = [{
    company: 'Masters Co. <b>Unlimited</b>',
    chef: 'John Ford',
    country: 'German'
  },
  {
    company: 'Max FX',
    chef: 'Maxim Root',
    country: 'USA'
  }
];
```

As you can see, in first cell of first row of "company" column there is a html tag. In configuration of attributes there will be an option, which set how html tags should be displayed: like a plain text or like html tag. Check [Table configuration](#table-configuration) section for more information.

### Table configuration
[Back to content][toc]

Table configuration needed for setting table styles, input data and columns.

```js
// script.js

// example of setting basic parameters
const gridViewConfig = {
  parent: '.gridview-container',
  titleTag: 'h1',
  titleText: 'GridView title example',
  titleClass: ['header'],
  tableClass: ['table-class'],
  attribute: {
    'company': {
      'label': 'Company',
      'html': true,
    },
    'chef': {
      'label': 'Chef',
    },
    'country': {
      'label': 'Country',
      'value': (rowArr) => {
        if (rowArr.country === 'German') {
          return rowArr.country + ' map';
        }
        return rowArr.country;
      }
    }
  },
  data: dataExample
};
```

More about all of them.

**parent** {string}

Here you set in which element your table will be added. `<body>` is default. You can select element by tag, class or id.

```js
// select first div element in document
parent: 'div',

// ...or select by css class
parent: '.gridview-container',

// ...or select by id
parent: '#gridview-container',
```

**titleTag** {string|boolean}

Here you set html tag for table title. `<h2>` is default. If you don't need table title, set it to `false`.

```js
// set h1 tag for example
titleTag: 'h1',

// ...or set it to false if you don't need title
titleTag: false,
```

**titleText** {string}

Here you set text for table title. `GridView table title` is default.

```js
// text for title for example
titleText: 'GridView title example',
```

**titleClass** {array}

Here you set css classes for table title. No classes set by defaule.

```js
// add class 'header' for table title
titleClass: ['header'],
```

**tableClass** {array}

Here you set css classes for table. No classes set by default.

```js
// class 'table-class' will be added
tableClass: ['table-class'],
```

**attribute** {object}

Here you set columns configuration. This parameter takes an object in wich key is a column name and value is another object with columns configuration. Names of columns should be the same as keys of input data (see [Input data](#input-data) section).

`label` sets text in cell in column header, it sets the name of column.

`html` sets how html tags should be displayed. Set it `true` if you need to use html tags in cells. Or set it `false` if you need plain text.

`value` sets handler function. This function takes an object (e.g. a whole row) from input data as argument and do something with this row.

```js
attribute: {
    'company': { // name of column should be the same as the key of object from input data
      'label': 'Company', // text of column header
      'html': true, // if you have html tags in cell value they will be displayed as html, not like plain text
    },
    'chef': { // name of column should be the same as the key of object from input data
      'label': 'Chef', // text of column header
    },
    'country': { // name of column should be the same as the key of object from input data
      'label': 'Country', // text of column header
      'value': (rowArr) => { // handle function
        if (rowArr.country === 'German') {
          return rowArr.country + ' map';
        }
        return rowArr.country;
      }
    }
  },
```

In the example above argumen `rowArr` is the object from const `dataExample` (from input data array).

**data** {array}

Here you set array of input data. Array contains objects.

```js
// link for array created earlier
data: dataExample
```

## Example of use
[Back to content][toc]

```js
// script.js

// create array of input data
const dataExample = [{
    company: 'Masters Co. <b>Unlimited</b>',
    chef: 'John Ford',
    country: 'German'
  },
  {
    company: 'Max FX',
    chef: 'Maxim Root',
    country: 'USA'
  },
  {
    company: 'Sigma',
    chef: 'Fedor Valuksta',
    country: 'Canada'
  },
  {
    company: 'Harry\'s Muse',
    chef: 'Harold York',
    country: 'Ireland'
  }
];

// create object
let gridView = new GridView();

// set table configuration
const gridViewConfig = {
  parent: '.gridview-container',
  titleTag: 'h1',
  titleText: 'GridView title example',
  titleClass: ['header'],
  tableClass: ['table-class'],
  attribute: {
    'company': {
      'label': 'Company',
      'html': true,
    },
    'chef': {
      'label': 'Chef',
    },
    'country': {
      'label': 'Country',
      'value': (rowArr) => {
        if (rowArr.country === 'German') {
          return rowArr.country + ' map';
        }
        return rowArr.country;
      }
    }
  },
  data: dataExample
};

// add table to document
gridView.render(gridViewConfig);
```

```css
// gridView.css

table {
  border-collapse: collapse;
  border: 1px solid darkslategray;
}

table tr,
td,
th {
  border: 2px solid darkslateblue;
}

table td,
th {
  padding: 10px;
  font-family: 'Open Sans', sans-serif;
}

table th {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  color: darkslateblue
}

.header {
  color: darkslateblue;
  font-family: 'Montserrat', sans-serif;
}

.table-class {
  border: 5px dotted hotpink
}
```

Result:

![GridView example](https://evoe.dev/projects/gridview.js/example.png)

## Update
[Back to content][toc]

Current version 0.1.
There is no update yet.

## License
[Back to content][toc]

MIT.

<!-- Ссылки -->
[toc]: #content
