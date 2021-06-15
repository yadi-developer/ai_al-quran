

const input = document.querySelector(".asked"),
  btn = document.querySelector(".search");

btn.addEventListener("click", (e) => {
  doFetch(input.value);
  e.preventDefault();
});

const base_url =
  "https://api.bluenetid.com/alquran/6d56a1b89b4ee7bc3c2ccbe163cba0cf?query=";

const yadi = {
  url: "https://al-quran-8d642.firebaseio.com/data.json?print=pretty",
};

function getData(base_url, text) {
  return fetch(base_url + (text ? text : ""))
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => res);
}

const murotalPlay = async () => {
  //Murottal
  try {
    const murottal = await getData(yadi.url);
    const list = document.querySelector(".list");
    let ins = "";
    murottal.forEach((m) => {
      ins += templateCard(
        m.nama,
        m.asma,
        m.keterangan,
        "Play",
        "Surah ke " + m.nomor,
        m.audio
      );
    });
    list.innerHTML = ins;
    action(list);
  } catch (e) {
    console.log(e);
    console.log("Gagal memulai murottal");
  }
};

murotalPlay();

const doFetch = async (text) => {
  try {
    //Qur'an
    const data = await getData(base_url, text);
    let quran = {
      type: "al-quran",
      val: "",
    };
    const list = document.querySelector(".list");

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
  let musik = "",
    isPlaying = false;
  audio.forEach((item) => {
    const data = item.dataset.audio;
    const a = new Audio();
    musik = data;
    a.src = musik;
    item.addEventListener("click", function () {
      a.pause();
      isPlaying = true;
      if (isPlaying) {
        a.play();
      }
    });
  });
};

const templateCard = (headline, title, deskripsi, btnText, ayat, audio) => {
  return `<div
          style="width: 21rem; margin: 0 auto"
          class="shadow card col btn-outline-light bg-primary mt-2"
        >
          <h5 class="card-header">${headline ? headline : ""} ${
    ayat ? ayat : ""
  }</h5>
          <div class="card-body">
            <h5 class="card-title text-end">${title ? title : ""}</h5>
            <p class="card-text">
              ${deskripsi ? deskripsi : ""}
            </p>
            <div class="btn audio btn-info shadow" data-audio="${
              audio ? audio : ""
            }">${btnText ? btnText : ""}</div>
          </div>
        </div>`;
};
