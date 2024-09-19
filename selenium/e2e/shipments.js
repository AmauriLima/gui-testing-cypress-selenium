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
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
  });

  it('should ship a ready shipment', async () => {
    await driver.findElement(By.linkText('Shipments')).click();
    const dropdown = await driver.findElement(By.id('criteria_state'));
    await dropdown.findElement(By.xpath("//option[. = 'Ready']")).click();
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon teal button"]'));
    await buttons[0].click();
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Shipment has been successfully shipped.'));
  });

  it('should display a warning when no shipments are found', async () => {
    await driver.findElement(By.linkText('Shipments')).click();
    const dropdown = await driver.findElement(By.id('criteria_state'));
    await dropdown.findElement(By.xpath("//option[. = 'Cancelled']")).click();
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('There are no results to display'));
  });

  it('should clear all filters when clear filter button is clicked', async () => {
    await driver.findElement(By.linkText('Shipments')).click();
    const dropdown = await driver.findElement(By.id('criteria_state'));
    await dropdown.findElement(By.xpath("//option[. = 'Ready']")).click();
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    await driver.findElement(By.css('*[class^="ui labeled icon button"]')).click();
    const selectedValue = await driver.findElement(By.id('criteria_state')).getAttribute('value');
    assert.strictEqual(selectedValue, '');
  });

  it('should navigate to the correct order page when clicking on an order', async () => {
    await driver.findElement(By.linkText('Shipments')).click();
    await driver.findElement(By.xpath('//td/a[contains(text(), "#000000020")]')).click();
    const url = await driver.getCurrentUrl();
    assert(url.includes('/admin/orders/20'));
    const headerText = await driver.findElement(By.css('.ui.header .content')).getText();
    assert(headerText.includes('#000000020'));
  });

  it('should retain state between list view and details page', async () => {
    await driver.findElement(By.linkText('Shipments')).click();
    const dropdown = await driver.findElement(By.id('criteria_state'));
    await dropdown.findElement(By.xpath("//option[. = 'Ready']")).click();
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('State: Ready'));
  });

  it('should retain the tracking code after shipment with a tracking number', async () => {
    await driver.findElement(By.linkText('Shipments')).click();
    const dropdown = await driver.findElement(By.id('criteria_state'));
    await dropdown.findElement(By.xpath("//option[. = 'Ready']")).click();
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Tracking code:'));
  });

  it('should navigate between shipment pages correctly using pagination', async () => {
    await driver.findElement(By.linkText('Shipments')).click();
    await driver.findElement(By.xpath("//a[text()='2']")).click();
    const url = await driver.getCurrentUrl();
    assert(url.includes('page=2'));
    const activePage = await driver.findElement(By.css('*[class^="ui pagination menu"] .active')).getText();
    assert.strictEqual(activePage, '2');
  });

  it('should toggle the filters section correctly', async () => {
    await driver.findElement(By.linkText('Shipments')).click();
    const filtersTitle = await driver.findElement(By.css('.ui.styled.fluid.accordion .title'));
    await filtersTitle.click();
    const filtersContent = await driver.findElement(By.css('.ui.styled.fluid.accordion .content'));
    const isVisible = await filtersContent.isDisplayed();
    assert.strictEqual(isVisible, true);
    await filtersTitle.click();
    const isVisibleAfterClick = await filtersContent.isDisplayed();
    assert.strictEqual(isVisibleAfterClick, false);
  });

  it('should display the correct sorting order for shipments', async () => {
    await driver.findElement(By.linkText('Shipments')).click();
    await driver.findElement(By.css('.sylius-table-column-createdAt')).click();
    const url = await driver.getCurrentUrl();
    assert(url.includes('sorting%5BcreatedAt%5D=asc'));
    const classAttribute = await driver.findElement(By.css('.sylius-table-column-createdAt')).getAttribute('class');
    assert(classAttribute.includes('sorted ascending'));
  });
});
