/*-------------------------elements---------------------------------------------*/

const searchBtn = document.querySelector(".searchBtn");
const searchList = document.querySelector(".searchList");
const crossBtn = document.querySelector(".fa-xmark");
const leftside = document.querySelector(".leftside");
const searchCity = document.querySelector(".searchCity");
const search = document.querySelector(".search");
const lastSearchList = document.querySelector(".lastSearch");
const currentlocation = document.querySelector(".currentlocation");

const date = document.querySelector(".Date");
const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weatherIcon");
const temp = document.querySelector(".temp");

const windStatus = document.querySelector(".windStatus");
const humidity = document.querySelector(".humidity");
const airpressure = document.querySelector(".airpressure");
const visibility = document.querySelector(".visibility");

const progress = document.getElementById("progress");
const cards = document.querySelectorAll(".upperCard");

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/*-------------------------funtions----------------------------------------------*/

const Toggle = () => {
  leftside.classList.toggle("hidden");
  searchList.classList.toggle("hidden");
};

function changeIcon(element, value) {
  if (value == "Snow") {
    element.src = `./img/Snow.png`;
  } else if (value == "Sleet") {
    element.src = `./img/Sleet.png`;
  } else if (value == "Clear") {
    element.src = `./img/Clear.png`;
  } else if (value === "moderate rain" || value === "light rain") {
    element.src = `./img/LightRain.png`;
  } else if (value == "heavy intensity rain") {
    element.src = `./img/HeavyRain.png`;
  } else if (value == "overcast clouds") {
    element.src = `./img/HeavyCloud.png`;
  } else if ((value = "broken clouds")) {
    element.src = `./img/LightCloud.png`;
  } else if (value === "shower") {
    element.src = `./img/Shower.png`;
  } else if (value == "overcast clouds") {
    element.src = `./img/HeavyCloud.png`;
  } else {
    element.src = `./img/Thunderstorm.png`;
  }
}

const renderData = () => {
  let cityName = searchCity.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=ebd7b2e73b4cd4b0a7b5931e071e7688`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      currentlocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.city.name}`;
      const todaysDate = new Date();
      date.innerText = `${todaysDate.getDate()} ${
        month[todaysDate.getMonth()]
      }`;

      temp.innerHTML =
        Math.round(data.list[0].main.temp - 273) + "<span>&deg;C</span>";
      weather.innerText = `${data.list[0].weather[0].main}`;

      changeIcon(weatherIcon, data.list[0].weather[0].description);
      windStatus.innerText = Math.round(data.list[0].wind.speed) + "Mph";
      visibility.innerText =
        Math.round(data.list[0].visibility / 1000) + " miles";
      airpressure.innerText = data.list[0].main.pressure + " mb";
      humidity.innerText = data.list[0].main.humidity + "%";
      progress.value = data.list[0].main.humidity;

      const listArr = data.list.filter((cur, i) => {
        if (i % 8 == 0) return cur;
      });
      cards.forEach((item, i) => {
        update(item, i, listArr);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

function update(item, i, listArr) {
  const maxTemp = item.querySelector(".maxTemp");
  const minTemp = item.querySelector(".minTemp");

  maxTemp.innerHTML = Math.round(listArr[i].main.temp_max - 273) + "&deg;";
  minTemp.innerHTML = Math.round(listArr[i].main.temp_min - 273) + "&deg;";
  changeIcon(item.querySelector("img"), listArr[i].weather[0].description);

  if (i !== 0) {
    item.querySelector(".day").innerText = `${Number(
      listArr[i].dt_txt.slice(8, 10)
    )}, ${month[Number(listArr[i].dt_txt.slice(5, 7) - 1)]}`;
  }
}

function checkKey(e) {
  if (e.key == "Enter") {
    renderData();
    addListItem();
  }
}

function addListItem() {
  const node = document.createElement("li");
  const textNode = document.createTextNode(searchCity.value);
  node.appendChild(textNode);
  lastSearchList.appendChild(node);
  searchCity.value = "";
}
/*------------------------- eventlistner-----------------------------------------*/

searchBtn.addEventListener("click", Toggle);
crossBtn.addEventListener("click", Toggle);
search.addEventListener("click", renderData);
searchCity.addEventListener("keydown", checkKey);
