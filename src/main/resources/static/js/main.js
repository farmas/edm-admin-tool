import * as docFinity from './docfinity-service.js';
import * as models from './models.js';
import { checkDocumentTypeExists } from './check.documentTypeExists.js';

const data = {
  customers: models.customers,
  selectedCustomer: models.customers[0],
  selectedDocumentSet: models.customers[0].documentSets[0],
  retentions: ['19.01 Personnel Folder Other Copy'],
  categories: [],
  newDocumentType: models.createDocumentType(),
  newField: models.createField()
};

export function createVueApp() {
  return new Vue({
    el: '#app',
    data,
    computed: {
      isAddFieldDisabled() {
        const field = {...data.newField};
        const valid = field && field.name;
        return !valid;
      },
      isAddDocTypeDisabled() {
        const docType = {...data.newDocumentType};
        const valid = docType && docType.name && docType.category && docType.retention;
        return !valid;
      }
    },
    methods: {
      addCustomer: function() {
        const newCustomer = models.createCustomer('New Customer');
        data.customers.push(newCustomer);
        data.selectedCustomer = newCustomer;
        data.selectedDocumentSet = data.selectedCustomer.documentSets[0];
      },
      selectCustomer: function(customerName) {
        data.selectedCustomer = data.customers.find(c => c.name === customerName);
        data.selectedDocumentSet = data.selectedCustomer.documentSets[0];
  
        console.log(JSON.parse(JSON.stringify(data.selectedCustomer)));
      },
      deleteDocumentType: function(index) {
        data.selectedDocumentSet.documentTypes.splice(index, 1);
      },
      deleteField: function(index) {
        data.selectedDocumentSet.fields.splice(index, 1);
      },
      addDocumentType: function() {
        const docType = JSON.parse(JSON.stringify(data.newDocumentType));
        data.selectedDocumentSet.documentTypes.push(docType);
  
        console.log(JSON.parse(JSON.stringify(data.selectedCustomer)));
        data.newDocumentType.name = '';
        data.newDocumentType.category = '';
        data.newDocumentType.retention  ='';
      },
      addField: function() {
        const field = JSON.parse(JSON.stringify(data.newField));
        data.selectedDocumentSet.fields.push(field);
  
        console.log(JSON.parse(JSON.stringify(data.selectedCustomer)));
        data.newField.name = '';
        data.newField.required = false;
        data.newField.editable = false;
        data.newField.datasource = '';
      },
      validateDocumentTypes: function() {
        data.selectedDocumentSet.documentTypes.forEach(docType => docType.status = 'secondary');
        data.selectedDocumentSet.documentTypes.forEach(async docType => {
          const result = await checkDocumentTypeExists(docType);
          docType.status = result ? 'success' : 'danger';
        });
      }
    }
  });
}

docFinity.getCategories().then(categories => data.categories = categories.sort());