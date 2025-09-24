
let flights = []; 


async function loadFlights() {
  try {
    const response = await fetch('./dataset.json');
    flights = await response.json();
    console.log("Vuelos cargados:", flights);
  } catch (error) {
    console.error("Error al cargar los vuelos:", error);
  }
}

loadFlights();


const budgetInput = document.getElementById('budget');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');


function renderFlights(list) {
  resultsDiv.innerHTML = ''; 

  if (list.length === 0) {
    resultsDiv.innerHTML = '<p class="no-results">No hay vuelos disponibles.</p>';
    return;
  }

  list.forEach(f => {
    const formattedDate = new Date(f.date).toLocaleString('es-AR', {
      dateStyle: 'short',
      timeStyle: 'short'
    });

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${f.origin} → ${f.destination}</h3>
      <p>Precio: $${f.price}</p>
      <p>Asientos: ${f.availability}</p>
      <p>Fecha: ${formattedDate}</p>
    `;
    resultsDiv.appendChild(card);
  });
}


searchBtn.addEventListener('click', () => {
  const budget = parseFloat(budgetInput.value);

  if (isNaN(budget) || budget <= 0) {
    alert('Ingresá un presupuesto válido');
    return;
  }

  const availableFlights = flights.filter(f =>
    f.availability > 0 && f.price <= budget
  );
  availableFlights.sort((a, b) => a.price - b.price);
  renderFlights(availableFlights);
});