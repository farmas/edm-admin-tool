export const customers = [
  createCustomer('College of Arts and Sciences'),
  createCustomer('Endowments and Donor Services')
];

export function createField(name, required, editable, datasource) {
  return { 
    name, 
    required: !!required,
    editable: !!editable,
    datasource
  };
}

export function createDocumentType(name, category, retention) {
  return { name, category, retention, status: 'none', message: '' };
}

export function createDocumentSet(name) {
  return {
    name,
    documentTypes: [
      createDocumentType('Clock Extension Letter', 'College of Arts and Sciences', '19.01 Personnel Folder Other Copy'),
      createDocumentType('Reappointment Packet', 'College of Arts and Sciences', '19.01 Personnel Folder Other Copy'),
      createDocumentType('J: DS-2019 Documents', 'College of Arts and Sciences', '19.01 Personnel Folder Other Copy'),
    ],
    fields: [
      createField('Department', true, true),
      createField('Applicant Name', false, true),
    ]
  };
}

export function createCustomer(name) {
  return {
    name,
    documentSets: [
      createDocumentSet('Default')
    ]
  };
}