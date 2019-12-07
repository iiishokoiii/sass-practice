$(function () {
  const API_KEY = '73364f403ced8c1cbbde8dc580744ee4';
  const REQUEST_URL = 'https://api.flickr.com/services/rest';

  const data = {
    keyword: '',
    idxPage: 1,
    maxPages: 1,
    items: []
  };
  const perPage = 24;
  const msgNoInput = 'キーワードを入力してください';

  //画面の初期化
  function renderInit() {
    if ($('#js-wrapper')) {
      $('#js-wrapper').remove();
      $('#js-morebtn').addClass('is-hidden');
    }
  }
  //
  function renderStatus() {

  }

  //JSONデータから写真のURLを取得し、ブラウザにサムネイルを表示
  function renderGallery() {
    $('#js-status').hide();
    let wrapper = document.createElement('div');
    wrapper.id = 'js-wrapper';

    for (let i = 0; i < perPage; i++) {
      let item = data.items[i];
      let url = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
      let img = document.createElement('img');
      img.src = url;
      wrapper.appendChild(img);
    }
    $('#js-result').append(wrapper);
    $('#js-morebtn').removeClass('is-hidden');
  }

  //JSONデータの取得
  function fetchData() {
    $.ajax({
      url: REQUEST_URL,
      type: 'GET',
      data: {
        'page': data.idxPage,
        'format': 'json',
        'api_key': API_KEY,
        'method': 'flickr.photos.search',
        'text': data.keyword,
        'per_page': perPage
      },
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      success: function (res) {
        if (res.stat == 'ok') {
          // success
          data.items = res.photos.photo;
          renderGallery();
        } else {
          // fail
        }
      }
    })
  }

  function handleSearch() {
    data.keyword = $('#js-searchbox').val();
    if (!data.keyword) {
      $('#js-status').text(msgNoInput);
    } else {
      renderInit();
      fetchData();
    }
  }

  //検索ボタンを押下したとき
  $('#js-searchbtn').on('click', function () {
    handleSearch();
  })
  //もっとみるボタンを押下したとき
  $('#js-morebtn').on('click', function () {
    data.idxPage++;
    fetchData();
  })

})


