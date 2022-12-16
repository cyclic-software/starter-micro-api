import fetch from 'node-fetch';
import cheerio from 'cheerio';
import http from 'http';

async function parseData() {
  // Fetch data from the Investing.com website
  const response = await fetch('https://api.codetabs.com/v1/proxy/?quest=https://www.investing.com/economic-calendar/');
  const html = await response.text();

  // Use cheerio to parse the HTML
  const $ = cheerio.load(html);

  // Use the `$` function and CSS selectors to select the data rows from the HTML
  const rows = $('#economicCalendarData > tbody > tr.js-event-item');

  // Extract the data from each row and add it to an array
  const data = [];
  rows.each((index, row) => {
    // Use the correct class names and cheerio functions to select the elements from the HTML
    const time = $(row).find('.js-time');
    const timeValue = time.text().trim();
    const currency = $(row).find('.flagCur');
    const currencyValue = currency.text().trim();
    const impact = $(row).find('.sentiment');
    const impactValue = impact.attr('title').split(' ')[0];

    // Check if the elements exist before trying to access their properties or methods
    if (timeValue && currencyValue && impactValue) {
      data.push({
        time: timeValue,
        currency: currencyValue,
        impact: impactValue
      });
    }
  });

  // Return the data as a JSON object
  return data;
}


http.createServer(function (req, res) {
  console.log(`Just got a request at ${req.url}!`)
  const parseData = parseData().then(data => data);
  res.write('parseData >> ', parseData);
  res.end();
}).listen(process.env.PORT || 3000);
