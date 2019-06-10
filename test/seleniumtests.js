const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const path = require('chromedriver').path
const { expect } = require('chai')
const { Builder, By, Key, until } = require('selenium-webdriver')
const driver = new Builder().forBrowser('chrome').build()

before(async () =>{
    await driver.get('http://localhost:3001/')
})

describe('LaunchPageTest', () => {
    it('should open page', async () => {
        let title = await driver.getTitle()

        expect(title).to.equal('Web Doctor')
    })
})


describe('UserTests', () => {
    it('should open page and login as user', async () => {
        await driver.findElement(webdriver.By.className('nav-link text-light')).click()
        await driver.findElement(By.name('username')).sendKeys('user1')
        await driver.findElement(By.name('password')).sendKeys('user1')
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click()

        let LogOut = await driver.findElement(By.className('btn btn-outline-light')).getAttribute('href')

        expect(LogOut).to.equal('http://localhost:3001/signout')
    })

    it('ask question as a user', async () => {
        await driver.findElement(webdriver.By.className('area-button')).click()
        await driver.sleep(1000)
        await driver.findElement(webdriver.By.className('symptom-button')).click()
        await driver.findElement(webdriver.By.id('searchButton')).click()
        await driver.sleep(1000)
        await driver.findElement(webdriver.By.xpath('//*[@id="disaeContainer"]/a[1]/div/div[1]')).click()
        await driver.findElement(webdriver.By.xpath('/html/body/main/div[2]/div[1]/div/div[2]/a')).click()
        await driver.findElement(By.name('name')).sendKeys('My leg hurts')
        await driver.findElement(By.name('content')).sendKeys('My leg hurts really bad')
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click()

        let question = await driver.findElement(By.xpath('/html/body/main/div[2]/div[2]/div[11]/a/div/h5')).getText()

        expect(question).to.equal('My leg hurts')

        await driver.findElement(By.className('btn btn-outline-light')).click()
    })

    it('should not login a user with wrong password', async () => {
        await driver.findElement(webdriver.By.className('nav-link text-light')).click()
        await driver.findElement(By.name('username')).sendKeys('user1')
        await driver.findElement(By.name('password')).sendKeys('user')
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click()

        let wronguser = await driver.findElement(By.className('alert alert-danger my-alert')).getText()

        expect(wronguser).to.equal('Nieprawidłowa nazwa użytkownika lub hasło.')
    })
})


describe('DoctorTests', () => {
    it('should open page and login as doctor', async () => {
        await driver.findElement(webdriver.By.className('nav-link text-light')).click()
        await driver.findElement(By.name('username')).sendKeys('doctor0')
        await driver.findElement(By.name('password')).sendKeys('doctor')
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click()

        let waitingAnswer = await driver.findElement(By.xpath('//*[@id="n"]/ul/li[2]/a')).getAttribute('href')

        expect(waitingAnswer).to.equal('http://localhost:3001/waitingQuestions')
    })

    it('answer the question of a user', async () => {
        await driver.findElement(webdriver.By.className('area-button')).click()
        await driver.sleep(1000)
        await driver.findElement(webdriver.By.className('symptom-button')).click()
        await driver.findElement(webdriver.By.id('searchButton')).click()
        await driver.sleep(1000)
        await driver.findElement(webdriver.By.xpath('//*[@id="disaeContainer"]/a[1]/div/div[1]')).click()
        await driver.findElement(webdriver.By.className('question')).click()
        await driver.findElement(By.name('content')).sendKeys('You should res for a while')
        await driver.findElement(webdriver.By.xpath('/html/body/main/div[2]/div/form/button')).click()
        await driver.sleep(500)

        let answer = await driver.findElement(By.xpath('/html/body/main/div[3]/div[2]/div[1]/div[1]/div/div[1]/a')).getText()

        expect(answer).to.equal('doctor realname 0')

        await driver.findElement(By.className('btn btn-outline-light')).click()
    })
})

describe('AdminTests', () => {
    it('should open page and login as admin', async () => {
        await driver.findElement(webdriver.By.className('nav-link text-light')).click()
        await driver.findElement(By.name('username')).sendKeys('admin')
        await driver.findElement(By.name('password')).sendKeys('admin')
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click()

        let Disea = await driver.findElement(By.xpath('//*[@id="n"]/ul/li[4]/a')).getAttribute('href')

        expect(Disea).to.equal('http://localhost:3001/disae')

    })

    it('should create new spec', async () => {
        await driver.findElement(webdriver.By.xpath('//*[@id="n"]/ul/li[2]/a')).click()
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[1]/div/div[2]/a')).click()
        await driver.findElement(By.name('name')).sendKeys('Ortopeda')
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/form/button')).click()
        await driver.sleep(1000)

        let spec = await driver.findElement(By.xpath('/html/body/main/div/div[2]/div[2]/table/tbody/tr[5]/td[1]')).getText()

        expect(spec).to.equal('Ortopeda')

        await driver.findElement(By.xpath('/html/body/main/div/div[2]/div[2]/table/tbody/tr[5]/td[2]/form/button')).click()

       
    })

    it('should delete user', async () => {
        await driver.findElement(webdriver.By.xpath('//*[@id="n"]/ul/li[7]/a')).click()
        await driver.findElement(webdriver.By.xpath('/html/body/main/div/div[2]/div[2]/table/tbody/tr[8]/td[4]/form/button')).click()


        await driver.findElement(By.className('btn btn-outline-light')).click()
    })
})

describe('RegisterTest', () => {
    it('should open page and register properly', async () => {
        await driver.findElement(webdriver.By.xpath('//*[@id="n"]/div/ul/li[2]/a')).click()
        await driver.findElement(By.name('username')).sendKeys('Test')
        await driver.findElement(By.name('password')).sendKeys('test1')
        await driver.findElement(By.className('confirm')).sendKeys('test1')
        await driver.findElement(By.className('register')).click()

        let registersuccess = await driver.findElement(By.xpath('//*[@id="n"]/div/a')).getText()

        expect(registersuccess).to.equal('Test')

        await driver.findElement(By.className('btn btn-outline-light')).click()
    })
})

after(async () => driver.quit())