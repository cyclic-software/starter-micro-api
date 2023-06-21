async function getData() {
  try {
    const city = "Gliwice";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ba3083ea48a23651d227cc88f7057fc2`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Wystąpił błąd:", error);
  }
}

getData();
