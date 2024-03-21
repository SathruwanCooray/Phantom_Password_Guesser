const puppeteer = require('puppeteer');
const fs = require('fs/promises');

(async () => {
  const extensionPath = 'C:\\Users\\sathruwan\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\bfnaelmomeimhlpmgjnjophhpkkoljpa\\24.3.0_0';
  const inputSelector = '.sc-jObWnj.fdrVDH';
  const errorSelector = '.sc-eGPXGI.fJDhZB';
  const wordsFilePath = 'words_dictionary.json'; // Path to your JSON file
  const outputFilePath = 'valid_words.json';
  const processingFilePath = 'processing_word.txt'; // Text file to store currently processing word

  // Specify the line number from which to start checking words
  const startLineNumber = 1;

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`
    ]
  });

  try {
    const page = await browser.newPage();
    await page.goto('chrome-extension://bfnaelmomeimhlpmgjnjophhpkkoljpa/onboarding.html');
    await page.waitForSelector('.sc-eCImPb.fajfuv');
    console.log('Button found!');

    await page.click('.sc-eCImPb.fajfuv');
    console.log('Button clicked successfully');

    const wordsFile = await fs.readFile(wordsFilePath);
    const wordsData = JSON.parse(wordsFile);

    const validWords = [];
    let lineNumber = 0;

    for (const word in wordsData) {
      if (Object.prototype.hasOwnProperty.call(wordsData, word)) {
        lineNumber++; // Increment line number
        if (lineNumber < startLineNumber) {
          continue; // Skip processing words before the start line number
        }

        await fs.writeFile(processingFilePath, `Processing word: ${word} (Line ${lineNumber})`); // Save word and line number to file

        await page.waitForSelector(inputSelector);
        await page.type(inputSelector, word);
        await page.keyboard.press('Enter');

        // Wait for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if error occurred
        const errorVisible = await page.evaluate((errorSelector) => {
          const errorElement = document.querySelector(errorSelector);
          return errorElement && window.getComputedStyle(errorElement).getPropertyValue('opacity') === '1';
        }, errorSelector);

        if (!errorVisible) {
          console.log(`"${word}" is a valid word.`);
          validWords.push(word);
          // Save valid words immediately to JSON file
          await fs.writeFile(outputFilePath, JSON.stringify({ validWords }));
        } else {
          console.log(`"${word}" is an invalid word. Ignoring...`);
        }

        // Clear the input field
        await page.evaluate((inputSelector) => {
          const inputField = document.querySelector(inputSelector);
          if (inputField) {
            inputField.value = '';
          }
        }, inputSelector);

        // Clear processing file
        await fs.unlink(processingFilePath);
      }
    }

    console.log('Valid words:', validWords);
    console.log('Screenshot taken');
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await browser.close();
    console.log('Browser closed');
  }
})();
