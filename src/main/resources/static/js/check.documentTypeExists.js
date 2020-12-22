import * as docFinity from './docfinity-service.js';

const categoryMap = {};

export async function checkDocumentTypeExists(documentType) {
  if (!categoryMap[documentType.category]) {
    categoryMap[documentType.category] = await docFinity.getDocumentTypesForCategory(documentType.category);
  }

  const docsInCategory = categoryMap[documentType.category];
  return docsInCategory.some(d => d.name === documentType.name);
}