describe('shipments', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });
  // Remove .only and implement others test cases!
  it.only('ship a ready shipment', () => {
    // Click in shipments in side menu
    cy.clickInFirst('a[href="/admin/shipments/"]');
    // Type in value input to search for specify shipment
    cy.get('.ui > .sylius-filters > .sylius-filters__field > .field > #criteria_state').select('ready');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in Ship of the first shipment listed
    cy.clickInFirst('*[class^="ui labeled icon teal button"]');

    // Assert that shipment has been shipped
    cy.get('body').should('contain', 'Shipment has been successfully shipped.');
  });
  it('Testar se caso a lista de shipment vier vazia, o warning aparece', () => {
    // Implement your test case 2 code here
  });
  it('Testar se o botão clear filter está limpando todos os filtros', () => {
    // Implement your test case 3 code here
  });
  it('Testar se o botão de order está mandando pra pagina correta admin/orders/{valor do botão}', () => {
    // Implement your test case 3 code here
  });
  it('Verificar se o state se mantém igual tanto na listagem quanto na pagina de detalhes', () => {
    // Implement your test case 3 code here
  });
  it('Testar se enviando uma encomenda com codigo de tracking, o codigo se mantém na pagina de order atraves do botão show', () => {
    // Implement your test case 3 code here
  });
  it('Testar se botão de previous e next funcionam corretamente', () => {
    // Implement your test case 3 code here
  });
  it('Testar se a box filters esconde e mostra o conteudo corretamete', () => {
    // Implement your test case 3 code here
  });
  it('Verificar se os filtros de ordenação funcionam corretamente', () => {});
  it('Verificar as linhas com status Shipped não tem o botão Ship, e se a linha com status READY tem', () => {});
});
