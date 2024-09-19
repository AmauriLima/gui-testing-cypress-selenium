describe('shipments', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
  });

  it('should ship a ready shipment', () => {
    cy.clickInFirst('a[href="/admin/shipments/"]');
    cy.get('#criteria_state').select('ready');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.clickInFirst('*[class^="ui labeled icon teal button"]');
    cy.get('body').should('contain', 'Shipment has been successfully shipped.');
  });

  it('should display a warning when no shipments are found', () => {
    cy.clickInFirst('a[href="/admin/shipments/"]');
    cy.get('#criteria_state').select('cancelled');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('body').should('contain', 'There are no results to displa');
  });

  it('should clear all filters when clear filter button is clicked', () => {
    cy.clickInFirst('a[href="/admin/shipments/"]');
    cy.get('#criteria_state').select('ready');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('*[class^="ui labeled icon button"]').contains('Clear filters').click();
    cy.get('#criteria_state').should('have.value', '');
  });

  it('should navigate to the correct order page when clicking on an order', () => {
    cy.clickInFirst('a[href="/admin/shipments/"]');
    cy.get('*[class^="sylius-table-column-number"]').contains('#000000020').click();
    cy.url().should('include', '/admin/orders/20');
    cy.get('.ui.header .content').should('contain', '#000000020');
  });

  it('should retain state between list view and details page', () => {
    cy.clickInFirst('a[href="/admin/shipments/"]');
    cy.get('#criteria_state').select('ready');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('body').should('contain', 'State: Ready');
  });

  it('should retain the tracking code after shipment with a tracking number', () => {
    cy.clickInFirst('a[href="/admin/shipments/"]');
    cy.get('#criteria_state').select('shipped');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    cy.get('body').should('contain', 'Tracking code:');
  });

  it('should navigate between shipment pages correctly using pagination', () => {
    cy.clickInFirst('a[href="/admin/shipments/"]');
    cy.get('*[class^="ui pagination menu"]').contains('2').click();
    cy.url().should('include', 'page=2');
    cy.get('*[class^="ui pagination menu"]').find('.active').should('contain', '2');
  });

  it('should toggle the filters section correctly', () => {
    cy.clickInFirst('a[href="/admin/shipments/"]');
    cy.get('.ui.styled.fluid.accordion .title').click();
    cy.get('.ui.styled.fluid.accordion .content').should('not.be.visible');
    cy.get('.ui.styled.fluid.accordion .title').click();
    cy.get('.ui.styled.fluid.accordion .content').should('be.visible');
  });

  it('should display the correct sorting order for shipments', () => {
    cy.clickInFirst('a[href="/admin/shipments/"]');
    cy.get('.sylius-table-column-createdAt').click();
    cy.url().should('include', 'sorting%5BcreatedAt%5D=asc');
    cy.get('.sylius-table-column-createdAt').should('have.class', 'sorted ascending');
  });
});
