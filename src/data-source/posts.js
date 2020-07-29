'use strict';

async function storyScrape(page, link) {
  await page.goto(link, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.p-title-value');

  const postTitle = await page.evaluate(() => document.querySelector('.p-title-value').innerText);
  console.log(postTitle);
  await page.waitForSelector('.message-inner');
  const hekayaPost = await page.evaluate(() => Array.from(document.querySelectorAll('.message-inner'))
    .map(eventRowEl => ({
      villageUser: eventRowEl.querySelector('.username').innerText,
      //  villagerAvatar: eventRowEl.querySelector('#js-XFUniqueId4 > img').src,
      villagerTitle: eventRowEl.querySelector('.userTitle').innerText,
      postTime: eventRowEl.querySelector('time.u-dt').innerText,
      postDetail: eventRowEl.querySelector('.bbWrapper').innerText,
      postUrl: eventRowEl.querySelector('.message-attribution-opposite > a').href,
      postId: eventRowEl.querySelector('.message-attribution-opposite').innerText,
      // postTitle,

    })));
  console.log({
    postTitle,

    hekayaPost,

  });
  return {
    postTitle,

    hekayaPost,

  };
}
exports.getStory = async function getStory(allLinks, page) {

  return console.log(allLinks);

  // const pageLinks = [];
  // const content = await storyScrape(link, page);
  // if (link > 0) return pageLinks.concat(content);
  // await page.waitFor('.p-title-value');
  // return getStory(pageLinks.concat(content));
};
