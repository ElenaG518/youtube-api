const GITHUB_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  console.log(`display searchTerm from getDataFromApi ${searchTerm}`)
  const query = {
    part:'snippet',
    key: 'AIzaSyDE2RS2B27KuUp-G6TWpRFtLpySC36Zf3c',
    q: `${searchTerm} in:name`,
   }
  $.getJSON(GITHUB_SEARCH_URL, query, callback);
}

function renderResult(result, index) {
  console.log(result);
  return `
    <div class="column">
    <img src="${result.snippet.thumbnails.medium.url} onclick="openModal();currentSlide(${index+1})" class="hover-shadow">
    </div>
    <div>
    <p><a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">more from this channel </a></p>
    </div>
    `;
  }

// function renderLightBox(event) {
//   $('.js-search-results').on('click', 'img', event=> {
//     console.log('renderLightBox has ran');
//     let ind = $('.js-search-results').find(event.currentTarget).attr('data-index');

//     console.log(ind);

//     <div class="mySlides">
//       <div class="numbertext">1 / 4</div>
//       <img src="img1_wide.jpg" style="width:100%">
//     </div>

//      })
// }

function displayGitHubSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item, index));
  console.log(`display results ${results}`);
  // let lightBox= data.items.map((item, index) =>
  // renderLightBox(item, index));

  // <div class="row"> ${lightBox} </div>`;

  //   $('.js-search-results').html(results);
  //   $('.modal-content').html()
}



function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(`watch submit function has a search for ${query}`);
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

// // Open the Modal
// function openModal() {
//   document.getElementById('myModal').style.display = "block";
// }

// // Close the Modal
// function closeModal() {
//   document.getElementById('myModal').style.display = "none";
// }

function start() {
  // openModal();
  // closeModal();
  // renderLightBox();
  watchSubmit();
}

$(start);
