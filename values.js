const { response } = require("express");

let info = null;

const requestApi = async () => {
  const city = "Gliwice";
  const api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ba3083ea48a23651d227cc88f7057fc2`;
  const response = await fetch(api);
  const data = await response.json();
  getInfo(data);
  return info;
};

const getInfo = (data) => {
  const { main, rain } = data.list[1];
  const { temp } = main;
  const ifRain = rain ? rain["3h"] : undefined;
  dataAnalysis(temp, ifRain);
};

const dataAnalysis = (temp, ifRain) => {
  let math;
  if (temp <= 21) {
    math = 100 - (21 - temp) * 3.2258;
  } else {
    math = 100 - (temp - 21) * 5.88235;
  }
  const test = 472 - 472 * (math / 100);
  const mathStr = math.toString().slice(0, 2);
  dataAnalysisRain(mathStr, ifRain);
};

const dataAnalysisRain = (mathStr, ifRain) => {
  let newResolut;
  if (ifRain === undefined) {
    console.log("Nie działa");
    newResolut = mathStr;
    ifRain = "Nieprzewidujemy";
  } else {
    console.log("Działa");
    let percentage;
    let variable = Number(mathStr);
    if (ifRain >= 0 && ifRain < 0.1) {
      percentage = 0.15;
    } else if (ifRain >= 0.1 && ifRain < 0.2) {
      percentage = 0.35;
    } else if (ifRain >= 0.2 && ifRain < 0.3) {
      percentage = 0.45;
    } else {
      percentage = 1;
    }
    ifRain = `${ifRain} opadu`;
    const subtractedValue = variable * percentage;
    const result = variable - subtractedValue;
    newResolut = result < 0 ? 0 : result.toString().slice(0, 2);
  }
  info = { newResolut, ifRain };
};

module.exports = { requestApi };
