import { Builder, By, Key, until } from 'selenium-webdriver';

// We connect to our 'selenium' service
const server = 'http://selenium:4444';

// Set up a new browser session and launch Chrome
let driver = await new Builder()
    .usingServer(server)
    .forBrowser('chrome')
    .build();

const login = async (email, password) => {
    await driver.get(
        'https://secure.runescape.com/m=weblogin/loginform?theme=oldschool&mod=oldschool&ssl=1&dest='
    )

    await typeInField('email', email, Key.ENTER)
    await typeInField('login-password', password, Key.ENTER)

    // Logged In Name
    await driver.wait(
        until.textIsVisible('Thank You for your purchase')
    );

    return driver
};

const getMembership = async (membershipCode) => {
    await driver.get('https://secure.runescape.com/m=billing_core/voucherform.ws')

    await typeInField('voucherCode', membershipCode, Key.ENTER)

    await clickLink(By.id('packageId2685'))

    await clickLink(By.id('redeemButton'))

    await clickLink(By.linkText('Continue'))

    await driver.wait(

    )
}

const typeInField = async (id, text, finalKey) => {
    await driver.wait(until.elementLocated(By.id(id)), 2000);

    const field = await driver.findElement(By.id(id));
    await field.sendKeys(text, finalKey);
}

const clickLink = async (finder) => {
    await driver.wait(until.elementLocated(finder), 2000);

    const field = await driver.findElement(finder);
    await field.click();
}


try {
    await login(user, pass)
    await getMembership(code)
} finally {
    await driver.quit();
}
