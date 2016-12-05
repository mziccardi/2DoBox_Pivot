const assert = require('chai').assert
const webdriver = require('selenium-webdriver')
const test = require('selenium-webdriver/testing')

test.describe('testing ideabox', function(){
  this.timeout(10000)
  test.it('should allow me to add a title and a description', ()=>{
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
    driver.get('http://localhost:8080');

    const title = driver.findElement({className: 'title-input'})
    const description = driver.findElement({className: 'body-input'})
    title.sendKeys('this is a title').then(()=>{
      return title.getAttribute('value')
    }).then((value)=>{
      assert.equal(value, 'this is a title')
    })

    description.sendKeys('this is a description').then(()=>{
      return description.getAttribute('value')
    }).then((value)=>{
      assert.equal(value, 'this is a description')
    })
  })
  test.it('should let me save a task', ()=>{
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
    driver.get('http://localhost:8080')

    const title = driver.findElement({className:'title-input'})
    const body = driver.findElement({className:'body-input'})
    const saveButton = driver.findElement({className:'save'})

    title.sendKeys('MY TITLE')
    body.sendKeys('MY BODY')
    saveButton.click()
    driver.quit()
  })
  test.it('should be able to upvote from normal to high',()=>{
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
    driver.get('http://localhost:8080')
    let upvote = driver.findElement({className:'upvote'})

    upvote.click()
    let importance = driver.findElement({className:'displayed-quality'})
    assert.equal(importance.getText(),'quality:high')
  })
})
