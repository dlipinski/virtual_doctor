var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
const { expect } = require('chai');
const { Builder, By, Key, until } = require('selenium-webdriver');
const driver = new Builder().forBrowser('chrome').build();

describe('TitleTest', () => {

    it('should open page and return title', async () => {
        await driver.get('http://localhost:3001/');
        const title = await driver.getTitle();

        expect(title).to.equal('Web Doctor');
    });

    //after(async () => driver.quit());
});

describe('PermissionTest', () => {

    it('should open page with area and return login view', async () => {
        await driver.get('http://localhost:3001/area');
        const area = await driver.getCurrentUrl();

        expect(area).to.equal('http://localhost:3001/signin');
    });

    //after(async () => driver.quit());
});

describe('LoginUserTest', () => {

    it('should open page and login as user', async () => {
        await driver.get('http://localhost:3001/');
        await driver.findElement(webdriver.By.className('nav-link text-light')).click();
        //await driver.wait(until.elementLocated(By.className('btn btn-primary btn-blockch')));
        await driver.findElement(By.name('username')).sendKeys('user1');
        await driver.findElement(By.name('password')).sendKeys('user1');
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click();

        const LogOut = await driver.findElement(By.className('btn btn-outline-light')).getAttribute('href');;

        expect(LogOut).to.equal('http://localhost:3001/signout');

        await driver.findElement(By.className('btn btn-outline-light')).click();
    });

    //after(async () => driver.quit());
});

describe('LoginAdminTest', () => {

    it('should open page and login as admin', async () => {
        await driver.get('http://localhost:3001/');
        await driver.findElement(webdriver.By.className('nav-link text-light')).click();
        await driver.findElement(By.name('username')).sendKeys('admin');
        await driver.findElement(By.name('password')).sendKeys('admin');
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click();

        const Disea = await driver.findElement(By.xpath('//*[@id="n"]/ul/li[4]/a')).getAttribute('href');;

        expect(Disea).to.equal('http://localhost:3001/disae');

        await driver.findElement(By.className('btn btn-outline-light')).click();
    });

    //after(async () => driver.quit());
});

describe('LoginDoctorTest', () => {

    it('should open page and login as doctor', async () => {
        await driver.get('http://localhost:3001/');
        await driver.findElement(webdriver.By.className('nav-link text-light')).click();
        await driver.findElement(By.name('username')).sendKeys('doctor0');
        await driver.findElement(By.name('password')).sendKeys('doctor');
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click();

        const waitingAnswer = await driver.findElement(By.xpath('//*[@id="n"]/ul/li[2]/a')).getAttribute('href');

        expect(waitingAnswer).to.equal('http://localhost:3001/waitingAnswers');

        await driver.findElement(By.className('btn btn-outline-light')).click();
    });

    //after(async () => driver.quit());
});

// describe('RegisterTest', () => {

//     it('should open page and register properly', async () => {
//         await driver.get('http://localhost:3001/');
//         await driver.findElement(webdriver.By.xpath('//*[@id="n"]/div/ul/li[2]/a')).click();
//         await driver.findElement(By.name('username')).sendKeys('Test');
//         await driver.findElement(By.name('password')).sendKeys('test1');
//         await driver.findElement(By.xpath('/html/body/main/div/div[2]/form/div[3]/input')).sendKeys('test1');
//         await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click();

//         const registersuccess = await driver.findElement(By.xpath('//*[@id="n"]/div/a')).getText();

//         expect(registersuccess).to.equal('Test');

//         await driver.findElement(By.className('btn btn-outline-light')).click();
//     });

//     //after(async () => driver.quit());
// });

describe('AskQuestionTest', () => {

    it('ask question as a user', async () => {
        await driver.get('http://localhost:3001/');
        await driver.findElement(webdriver.By.className('nav-link text-light')).click();
        //await driver.wait(until.elementLocated(By.className('btn btn-primary btn-blockch')));
        await driver.findElement(By.name('username')).sendKeys('user1');
        await driver.findElement(By.name('password')).sendKeys('user1');
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click();
        await driver.findElement(webdriver.By.id('5cfd097f9a26644e9c52b23f')).click();
        await driver.sleep(4000);
        await driver.findElement(webdriver.By.xpath('//*[@id="symptoms_buttons"]/button[1]')).click();
        await driver.findElement(webdriver.By.id('searchButton')).click();
        await driver.sleep(4000);
        await driver.findElement(webdriver.By.xpath('//*[@id="disaeContainer"]/a[1]/div/div[1]')).click();
        await driver.findElement(webdriver.By.xpath('/html/body/main/div[2]/div[1]/div/div[2]/a')).click();
        await driver.findElement(By.name('name')).sendKeys('My leg hurts');
        await driver.findElement(By.name('content')).sendKeys('My leg hurts really bad');
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click();


        const question = await driver.findElement(By.xpath('/html/body/main/div[2]/div[2]/div[13]/a/div/h5')).getText();

        expect(question).to.equal('My leg hurts');

        await driver.findElement(By.className('btn btn-outline-light')).click();
    });

    describe('AnswerQuestionTest', () => {

        it('ask question as a user', async () => {
            await driver.get('http://localhost:3001/');
            await driver.findElement(webdriver.By.className('nav-link text-light')).click();
            //await driver.wait(until.elementLocated(By.className('btn btn-primary btn-blockch')));
            await driver.findElement(By.name('username')).sendKeys('doctor0');
            await driver.findElement(By.name('password')).sendKeys('doctor');
            await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click();
            await driver.findElement(webdriver.By.id('5cfd097f9a26644e9c52b23f')).click();
            await driver.sleep(4000);
            await driver.findElement(webdriver.By.xpath('//*[@id="symptoms_buttons"]/button[1]')).click();
            await driver.findElement(webdriver.By.id('searchButton')).click();
            await driver.sleep(4000);
            await driver.findElement(webdriver.By.xpath('//*[@id="disaeContainer"]/a[1]/div/div[1]')).click();
            await driver.findElement(webdriver.By.xpath('/html/body/main/div[2]/div[2]/div[13]/a/div')).click();
            await driver.findElement(By.name('content')).sendKeys('You should res for a while');
            await driver.findElement(webdriver.By.xpath('/html/body/main/div[2]/div/form/button')).click();
            await driver.sleep(4000);
    
    
            const answer = await driver.findElement(By.xpath('/html/body/main/div[3]/div[2]/div[1]/div[1]/div/div[1]/a')).getText();
    
            expect(answer).to.equal('doctor realname 0');
    
            await driver.findElement(By.className('btn btn-outline-light')).click();
        });
        
        after(async () => driver.quit());
    })});