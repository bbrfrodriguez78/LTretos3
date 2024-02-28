import Ajv from "ajv";
 
Cypress.Commands.add('validateSchema', (responseBody, schema) => {
    const ajv = new Ajv({ allErrors: true });
    const valid = ajv.validate(schema, responseBody);
    expect(valid, JSON.stringify(ajv.errors)).to.equal(true);
});
 
Cypress.Commands.add('requestSend', (method, url, body, expectedStatusCode, schema) =>{
    cy.request({ method: method, url: url, body:body}).then( (response) =>{
        cy.validateSchema(response.body, schema)
        expect(response.status).to.equal(expectedStatusCode)
    })
})

Cypress.Commands.add('validateDatax',(body, nombreUsario)=>{
        const user = body.find(user => user.name === nombreUsario);
        if (user) {
          return user;
        } else {
          throw new Error(`User with name "${nombreUsario}" not found in JSON data.`);
        }
})

Cypress.Commands.add('validateTitle',(body, titleData)=>{
    const photos = body.find(photos => photos.title === titleData);
    if (photos) {
      return photos;
    } else {
      throw new Error(`Photo with title "${titleData}" not found in JSON data.`);
    }
})

Cypress.Commands.add('validateData', (body, propertyName, data) => {
    const item = body.find(item => item[propertyName] === data);
    if (item) {
      return item;
    } else {
      throw new Error(`Item with ${propertyName} "${data}" not found in JSON data.`);
    }
  });