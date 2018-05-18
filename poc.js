const puppeteer = require('puppeteer');

(async () => {
  // set true for headless, false for normal
  const browser = await puppeteer.launch({ headless: false });

  // the slowMo option slows down Puppeteer operations by the specified amount of milliseconds
  //const browser = await puppeteer.launch({
  //headless: false,
  //slowMo: 250 // slow down by 250ms
  //});

  const page = await browser.newPage();
  await page.goto('https://worth.systems');

  // take screenshot
  await page.screenshot({ path: 'worthsystems.png' });

  await page.click('a[href="/jobs.html"]');

  // Wait for the jobs page to load and display the results.
  const jobsImg = 'img[src="/images/img-about.jpg"]';
  await page.waitForSelector(jobsImg);

  await page.click('a[href="/job/accurate-qa-tester-nl.html"]');
  await page.waitForSelector(jobsImg);

  // click 'Apply now!' using xpath
  const applyNow = (await page.$x('//a[contains(text(), "Apply now")]'))[0];
  await applyNow.click();

  // Waits are important
  const name = 'input[name=first_name]'
  await page.waitForSelector(name);

  // send keys
  await page.type('input[name=first_name]', 'Piet');
  await page.type('input[name=last_name]', 'Mondriaan', { delay: 100 }); // to act like user

  // sendkeys using xpath
  const email = (await page.$x('//input[@name="email"]'))[0];
  await email.type('pmondriaan@worth.systems');

  // keyboard functions
  await page.keyboard.press('Tab');
  await page.keyboard.type('01-01-2000');

  // create pdf from vacancy
  await page.pdf({path: 'QAvacancy.pdf', format: 'A4'});

  // assert
  // Would need testing framework for this. Puppeteer just automates the browser
  // maybe https://github.com/smooth-code/jest-puppeteer

  await browser.close();
})();