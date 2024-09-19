const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('shipments', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
  });

  // Remove .only and implement others test cases!
  it.only('ship a ready shipment', async () => {
    // Click in shipments in side menu
    await driver.findElement(By.linkText('Shipments')).click();

    // Select the state to search for new shipments
    const dropdown = await driver.findElement(By.id('criteria_state'));
    await dropdown.findElement(By.xpath("//option[. = 'Ready']")).click();

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in Ship of the first shipment listed
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon teal button"]'));
    await buttons[0].click();

    // Assert that shipment has been completed
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Shipment has been successfully shipped.'));
  });

  it('ship a ready shipment', async () => {
    // Implement navigation and actions for shipping a ready shipment
  });

  it('Testar se caso a lista de shipment vier vazia, o warning aparece', async () => {
    // Implement navigation and check for empty shipment list warning
  });

  it('Testar se o botão clear filter está limpando todos os filtros', async () => {
    // Implement test for the "clear filter" button functionality
  });

  it('Testar se o botão de order está mandando para a página correta admin/orders/{valor do botão}', async () => {
    // Implement test for correct redirection of the order button
  });

  it('Verificar se o state se mantém igual tanto na listagem quanto na página de detalhes', async () => {
    // Implement test to verify that the shipment state remains consistent between listing and detail page
  });

  it('Testar se enviando uma encomenda com código de tracking, o código se mantém na página de order através do botão show', async () => {
    // Implement test to check if tracking code is preserved in the order page
  });

  it('Testar se botão de previous e next funcionam corretamente', async () => {
    // Implement test for previous and next buttons functionality
  });

  it('Testar se a box filters esconde e mostra o conteúdo corretamente', async () => {
    // Implement test to check if the filters box hides and shows content correctly
  });

  it('Verificar se os filtros de ordenação funcionam corretamente', async () => {
    // Implement test to verify if sorting filters work properly
  });

  it('Verificar se as linhas com status Shipped não têm o botão Ship, e se a linha com status READY tem', async () => {
    // Implement test to check that "Shipped" status rows do not have the "Ship" button, but "READY" status rows do
  });
  // Implement the remaining test cases in a similar manner
});
