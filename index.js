const input = document.querySelector(".asked"),
  btn = document.querySelector(".search");

btn.addEventListener("click", (e) => {
  doFetch(input.value);
  e.preventDefault();
});

function getData(text) {
  return fetch(
    "https://api.bluenetid.com/alquran/6d56a1b89b4ee7bc3c2ccbe163cba0cf?query=" +
      text
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => res);
}

const doFetch = async (text) => {
  const data = await getData(text);
  let quran = {
    type: "al-quran",
    val: "",
  };
  const list = document.querySelector(".list");

  try {
    if (data.type === quran.type) {
      data.data.forEach((item) => {
        tampilData(item, quran, list);
      });
      action(list);
    }
  } catch (e) {
    console.log(e);
  }
};

const tampilData = (data, quran, msok) => {
  quran.val += templateCard(
    data.description.name.transliteration.id,
    data.text.arab,
    data.translation.id,
    "Play",
    data.number.inSurah,
    data.audio.primary
  );
  msok.innerHTML = quran.val;
  //console.log(data);
  return true;
};

const action = (list) => {
  const audio = list.querySelectorAll(".audio");
  audio.forEach((item) => {
    const data = item.dataset.audio;
    item.addEventListener("click", function () {
      const a = new Audio();
      a.src = data;
      a.play();
    });
  });
};

const templateCard = (headline, title, deskripsi, btnText, ayat, audio) => {
  return `<div
          style="width: 21rem; margin: 0 auto"
          class="shadow card col btn-outline-light bg-primary mt-2"
        >
          <h5 class="card-header">${headline ? headline : ''} ${ayat ? ayat : ''}</h5>
          <div class="card-body">
            <h5 class="card-title">${title ? title : ''}</h5>
            <p class="card-text">
              ${deskripsi ? deskripsi : ''}
            </p>
            <div class="btn audio btn-info shadow" data-audio="${audio ? audio : ''}">${btnText ? btnText : ''}</div>
          </div>
        </div>`;
};
