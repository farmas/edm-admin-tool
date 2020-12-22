
export const categories = [
  createCategory('Cat1', 'College of Arts and Sciences'),
  createCategory('Cat2', 'Academic Personnel'),
  createCategory('Cat3', 'EHS Radiation Safety Office'),
];

export const documentTypes = [
  createDocumentType('Doc1', 'Yearly Activity Report', 'Cat1'),
  createDocumentType('Doc2', 'Reappointment Packet', 'Cat1'),
  createDocumentType('Doc3', 'Summer Salary Notification', 'Cat1'),
  createDocumentType('Doc4', 'Hiring Packet', 'Cat1'),
  createDocumentType('Doc5', 'Degree Verification', 'Cat1'),
];

export function createCategory(id, name) {
  return { id, name };
}

export function createDocumentType(id, name, categoryId) {
  return { 
    id, 
    name, 
    categoryId,
    categoryName: categories.find(c => c.id === categoryId).name
  };
}