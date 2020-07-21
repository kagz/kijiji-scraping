'use strict';

const puppeteer = require('puppeteer');
// the exported function
// a function must return  hekayafull


module.exports = function createKijijiDataSource(browser) {
  return async () => {
    async function scrapeHekaya() {

    const page = await browser.newPage();
    await page.goto('https://www.kenyatalk.com/index.php?all-threads/', { waitUntil: 'load', timeout: 0 });
    await page.waitFor(120000);
    await page.waitForSelector('.structItemContainer');
/**
1.click on each link
2.
 */
const nextBtn = page.querySelector('.pageNav-jump--next');
    if(nextBtn) await nextBtn.click(),

      return stuffs;
    }

// this is a paginating button that should be clicked through for scraping
    const nextBtn = page.querySelector('.pageNav-jump--next');
    if(nextBtn) await nextBtn.click();


/// this code returns array list of links for story
     const hekayas = await page.evaluate(() => Array.from(document.querySelectorAll('div.structItem'))
      .map(eventRowEl => ({
        storyLink: eventRowEl.querySelector('div.structItem-title >a')
          .href,
      })));


    return Promise.all(
      [
        scrapeHekaya(),
      ]
    );
   };
};



//await page.screenshot({path: 'google.png'});

//1.go to page


    const page = await browser.newPage();
    await page.goto('https://www.kenyatalk.com/index.php?all-threads/', { waitUntil: 'load', timeout: 0 });
    await page.waitFor(120000);
    await page.waitForSelector('.structItemContainer');


//2. scrape storylink


//

//3.see if theres another page
//
if(nextPage){

}
//

//4.scrape
//
function storyLinks(url){

  return hekayas;
}


//5.open each story and

function getHekaya(hekaya){

return hekayasAndComments;
}

//6.scrape story and comments
//
if(postHasNextPageComments){

}





//7.click next pages comments





 /**
  // functions

1. =>  scraping story links[allPages]

2. =>  scraping each post and comments

3. =>  looping each page

4. =>  looping each comment





  *
  // constants



/**+
 *
 *
 */



