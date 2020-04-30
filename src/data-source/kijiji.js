'use strict';
const {sequence} =require('../utils/util');

async function scrapePosts(page,el){
    await el.click();
    console.log(el);

}


module.exports=function createKijijiDataSource({browser}){

    async function fetchAll(){
        const page = await browser.newPage();
        await page.goto('https://www.kenyatalk.com/index.php?all-threads/4737295/');
        await page.waitForSelector('.structItemContainer');
        const categoryEls = await page.$$('div.structItem-title');
        return sequence(categoryEls,els => scrapePosts(page,els));
    }
    return {fetchAll}
}
