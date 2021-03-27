/**
 * GridView.js
 *
 * @description class for generating simple tables. Main idea belongs to Alex Luschenko from JS OOP course https://itgid.info/
 * @version 0.1
 * @author Ovchinnikov Egor https://github.com/urcosmos
 * @license
 * MIT License
 *
 * Copyright (c) 2021 urcosmos
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

class GridView {

  /**
   * properties
   * @param {string} _parent=body - html tag or class or id in wich the table will be added (default is body)
   * @param {string|boolean} _titleTag=h2 - html tag for table title. Set it to false if you don't need it (default is h2)
   * @param {string} _titleText - text for table title
   * @param {array} _titleClass - css classes for table title
   * @param {array} _tableClass - css classes for table
   * @param {object} attribute - configuration for columns
   * @param {array} data - main data for table
   */

  constructor() {
    this._parent = 'body';
    this._titleTag = 'h2';
    this._titleText = 'GridView table title';
    this._titleClass = [];
    this._tableClass = [];
    this.attribute = {};
    this.data = [];
  }

  /**
   * Method, set html element in wich the table will be added
   * @param {string} parent - html tag or class or id of element in wich the table will be added (default is body)
   */

  setParent(parent) {
    if (parent == '') {
      return false;
    } else if (document.querySelector(parent)) {
      this._parent = parent;
      return true;
    }
    return false;
  }

  /**
   * Method, set title html tag if you need table title
   * @param {string|boolean} titleTag - html tag for table title. Set it to false if you don't need it (default is h2)
   */

  setTitleTag(titleTag) {
    if (typeof titleTag === 'string' && titleTag.trim() != '') {
      this._titleTag = titleTag.trim();
      return true;
    }
    this._titleTag = false;
    return false;
  }

  /**
   * Method, set text for table title
   * @param {string} titleText - text for table title. You can add an html element too
   */

  setTitleText(titleText) {
    if (typeof titleText === 'string' && titleText.trim() != '') {
      this._titleText = titleText.trim();
      return true;
    }
    return false;
  }

  /**
   * Method, set css classes for table title
   * @param {array} titleClass - css classes for table title
   */

  setTitleClass(titleClass) {
    if (titleClass instanceof Array) {
      this._titleClass = titleClass;
      return true;
    }
    return false;
  }

  /**
   * Method, set css classes for table
   * @param {array} tableClass - css classes for table
   */

  setTableClass(tableClass) {
    if (tableClass instanceof Array) {
      this._tableClass = tableClass;
      return true;
    }
    return false;
  }

  /**
   * Method, check if needed and creating title
   */

  createTitle() {
    if (this._titleTag != false) {
      const titleTag = document.createElement(this._titleTag);
      titleTag.innerHTML = this._titleText;
      this._titleClass.forEach(cssClass => {
        titleTag.classList.add(cssClass);
      });
      document.querySelector(this._parent).append(titleTag);
    }
  }

  /**
   * Method, creating table
   */

  createTable() {

    // setting table

    const table = document.createElement('table');
    this._tableClass.forEach(cssClass => {
      table.classList.add(cssClass);
    });

    // create table headers

    let trHeader = document.createElement('tr');
    for (let key in this.attribute) {
      let th = document.createElement('th');
      if (this.attribute[key].label) {
        th.textContent = this.attribute[key].label;
      } else {
        th.textContent = key;
      }
      trHeader.append(th);
    }
    table.append(trHeader);

    // create table content

    for (let i = 0; i < this.data.length; i++) {
      let rowArr = this.data[i];
      let tr = document.createElement('tr');
      for (let key in this.attribute) {
        let td = document.createElement('td');
        let value = rowArr[key];

        // check if you have function in column (set function in 'value' of attribute)

        if (this.attribute[key].value) {
          value = this.attribute[key].value(rowArr);
        }

        // check if you need to show in html view or raw view

        if (this.attribute[key].html) {
          td.innerHTML = value;
        } else {
          td.textContent = value;
        }
        tr.append(td);
      }
      table.append(tr);
    }

    document.querySelector(this._parent).append(table);
  }

  /**
   * Method, show table
   * @param {object} data - main configuration
   */

  render(data) {

    // setting main parametrs

    this.setParent(data.parent);
    this.setTitleTag(data.titleTag);
    this.setTitleText(data.titleText);
    this.setTitleClass(data.titleClass);
    this.setTableClass(data.tableClass);
    this.attribute = data.attribute;
    this.data = data.data;

    //  create title and table

    this.createTitle();
    this.createTable();
  }
}