function hourNow(response) {
  let now = new Date();
  let h2 = document.querySelector("h2.hour");
  let h3 = document.querySelector("h3.date");
  let hours = now.getHours();
  let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  h2.innerHTML = `${hours}:${minutes}`;
  h3.innerHTML = `${day}`;
}
hourNow();

