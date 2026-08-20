const whatsappNumber = "5492257691814";

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const quickQuote = document.querySelector("#quickQuote");
const bookingForm = document.querySelector("#bookingForm");

function todayIso() {
  return new Date().toISOString().split("T")[0];
}

function openWhatsApp(message) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function getValue(selector) {
  return document.querySelector(selector).value.trim();
}

document.querySelector("#quickDate").value = todayIso();
document.querySelector("#date").value = todayIso();

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
});

quickQuote.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = getValue("#tripType");
  const passengers = getValue("#quickPassengers");
  const date = getValue("#quickDate");

  openWhatsApp(`Hola DariMar, quiero consultar por un traslado.\nTipo: ${type}\nPasajeros: ${passengers}\nFecha: ${date}`);
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = [
    "Hola DariMar, quiero cotizar un traslado.",
    `Nombre: ${getValue("#name")}`,
    `Teléfono: ${getValue("#phone")}`,
    `Origen: ${getValue("#origin")}`,
    `Destino: ${getValue("#destination")}`,
    `Pasajeros: ${getValue("#passengers")}`,
    `Fecha: ${getValue("#date")}`,
    `Horario: ${getValue("#time")}`,
    `Regreso: ${getValue("#returnTrip")}`,
    `Fecha y hora de regreso: ${getValue("#returnDateTime") || "A confirmar"}`,
    `Comentario: ${getValue("#notes") || "Sin comentarios"}`,
  ].join("\n");

  openWhatsApp(message);
});

const animatedBlocks = document.querySelectorAll(".section-title, .service-card, .feature, .vehicle-card, .about-card, .gallery-item, .booking");
animatedBlocks.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  animatedBlocks.forEach((element) => observer.observe(element));
} else {
  animatedBlocks.forEach((element) => element.classList.add("is-visible"));
}
