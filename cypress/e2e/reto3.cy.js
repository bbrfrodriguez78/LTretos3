describe('REST API - JSONPlaceholder', () => {
  const endpoints = [
    { url: '/todos/1', schema: require('../fixtures/schemaPlaceholder_Inicio.json'), dato: 'site'},
    { url: '/users',   schema: require('../fixtures/schemaPlaceholder_Users.json'), dato: 'users' },
    { url: '/photos',  schema: require('../fixtures/schemaPlaceholder_Photos.json'), dato: 'photos' }
  ];

  endpoints.forEach((endpoint) => {
    it(`Validar el endpoint: ${endpoint.url}`, () => {
      const url = `https://jsonplaceholder.typicode.com${endpoint.url}`;

      cy.request('GET', url)
        .then((response) => {
          cy.log(endpoint.dato)
          expect(response.status).to.equal(200);
          expect(response.body).to.not.be.empty;

          cy.log('Status Code: '+response.status)
          cy.log('Status Body: '+JSON.stringify(response.body))
          cy.validateSchema(response.body,endpoint.schema)
                    
          switch(endpoint.dato) {
            case 'site':
              break;
            case 'users':
              cy.validateData(response.body, 'name', 'Patricia Lebsack');
              break;
            case 'photos':
              cy.validateData(response.body, 'title', 'quo quidem iste maxime');
              break;
            default:
              cy.log('Valor por default')
              break;
          }
        });
    });
  });
});

