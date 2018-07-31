const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  console.log(`display searchTerm from getDataFromApi ${searchTerm}`)
  const query = {
    part:'snippet',
    key: 'AIzaSyDE2RS2B27KuUp-G6TWpRFtLpySC36Zf3c',
    q: `${searchTerm} in:name`,
   }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback)
      .fail(showErr);
}

function renderResult(result, index) {
  console.log(`renderResult function ran`);
  return `
     <a class="thumbnail" href="#">
      <img src="${result.snippet.thumbnails.medium.url}"
     alt="${result.snippet.title}" data-index="${index}" data-channel="https://www.youtube.com/channel/${result.snippet.channelId}" data-href="https://www.youtube.com/watch?v=${result.id.videoId}"></a>
    `;
  }

function renderHero(src, alt, channel, url) {
  console.log(`renderHero function ran with src ${src} and with alt ${alt} and with channel ${channel} and with url ${url}`);
  
    $('.hero').html(`
    <a href="${url}" target="_blank">
    <img src="${src}" alt="${alt}">
    </a>
    <a href="${channel}" target="_blank">more from this channel</a>
    `);
}

function displayGitHubSearchData(data) {
  console.log(data);
  const results = data.items.map((item, index) => renderResult(item, index));
  console.log(`display results ${results}`);
  $('.js-output').prop('hidden', false);
  $('.thumbnails').html(results);
}

function showErr(err) {
  const outputElem = $('.js-output');
  const errMsg = (
    `<p>We couldn't find any videos related to your search term!</p>`
  ); 
  outputElem
    .prop('hidden', false)
    .html(errMsg);
}



$(function() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(`watch submit function has a search for ${query}`);
    console.log(`query as when search button is pressed is ${query}`);
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });

$('.thumbnails').on('click', '.thumbnail', function(event) {
  console.log(`thumbnail clicked!`);
  let address = $(this).find('img').attr('src');
  let alter = $(this).find('img').attr('alt');
  let channel = $(this).find('img').attr('data-channel');
  let url = $(this).find('img').attr('data-href');
  console.log(`this is address ${address} and this is alter ${alter} and this is channel ${channel} and this is the url ${url}`);
  renderHero(address, alter, channel, url);
});
  
})

