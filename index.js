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
  console.log(result);
  return `
    <div class="image">
     <a href="https://www.youtube.com/watch?v=${result.id
        .videoId}" target="_blank">
      <img src="${result.snippet.thumbnails.medium.url}"
     alt="${result.snippet.title}" data-index="${index}"></a>
     <p><a href="https://www.youtube.com/channel/${result.snippet
        .channelId}" target="_blank">more from this channel </a></p>
     </div>
   
    `;
  }


function displayGitHubSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item, index));
  console.log(`display results ${results}`);
  $('.js-output')
      .prop('hidden', false)
      .html(results);
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
})

