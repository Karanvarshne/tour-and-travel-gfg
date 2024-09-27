const form = document.getElementById("trip-form");
const destinationInput = document.getElementById("destination");
const travelDatesInput = document.getElementById("travel-dates");
const planTripButton = document.getElementById("plan-trip-button");
const tripPlanContainer = document.getElementById("trip-plan-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const destination = destinationInput.value;
  const travelDates = travelDatesInput.value;
  fetch("/plan-trip", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ destination, travelDates }),
  })
    .then((response) => response.json())
    .then((data) => {
      const tripPlanHTML = `
        <h2>Trip Plan for ${destination}</h2>
        <p>Travel Dates: ${travelDates}</p>
        <p>Itinerary: ${data.itinerary}</p>
        <p>Map Coordinates: ${data.map_coordinates}</p>
      `;
      tripPlanContainer.innerHTML = tripPlanHTML;
    })
    .catch((error) => console.error(error));
});

planTripButton.addEventListener("click", () => {
  form.submit();
});