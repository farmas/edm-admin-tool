import * as mockData from './docfinity-data.js';

const docFinityUrl = '/edm-admin-ui/admin-tools/content/user-info?docfinity=true';
const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';

function makeDocFinityRequest(url, method) {
  return new Promise((resolve, reject) => {
    $.ajax({
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      type: 'POST',
      url: docFinityUrl,
      data: JSON.stringify({ url, method: method || 'GET' }),
      success: (response) => {
        console.log(response)
        resolve(response);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.log('error', textStatus, errorThrown);
        reject(textStatus);
      }
    });
  });
}

let cachedCategories = null;
export function getCategories() {
  if (cachedCategories) {
    return new Promise(resolve => resolve(cachedCategories));
  }
  if (isLocal) {
    return new Promise(resolve => resolve(mockData.categories));
  } else {
    return makeDocFinityRequest('/category').then(categories => {
      cachedCategories = categories.filter(c => c.status === 'STANDARD');
      return cachedCategories;
    });
  }
}

export async function getDocumentTypesForCategory(categoryName) {
  if (isLocal) {
    return new Promise(resolve => resolve(mockData.documentTypes.filter(d => d.categoryName === categoryName)));
  } else {
    const categories = await getCategories();
    const category = categories.find(c => c.name === categoryName);

    const response = await makeDocFinityRequest(`/category/hierarchy?id=${category.id}`);
    return response.results;
  }
}
