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

let gridView = new GridView();

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

gridView.render(gridViewConfig);