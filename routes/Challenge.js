const express = require('express');
const path = require('path');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async() => {
    try{
        return await axios.get('https://www.greenpeace.org/korea/issue-plastic/');
    } catch (error){
        console.error(error);
    }
};

// 크롤링으로 그린피스 챌린지 가져오기
getHtml()
    .then((html) => {
        let sectionList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $('div.outer_block_container').children("section.section-featured section-featured-tips")
        
        $bodyList.each(function(i, elem){
            sectionList[i] = {
                title: $(this).find('div.tip p').text(),
                image_url: $(this).find('div.tip-icon img').attr('src'),
                people: $(this).find('div.tip-commitments').text(),
            };
    });

    const data = sectionList.filter(n => n.title);
    return data;
});

module.exports = router;