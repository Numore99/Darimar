const whatsappNumber = "5492257691814";

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const quickQuote = document.querySelector("#quickQuote");
const bookingForm = document.querySelector("#bookingForm");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeLightbox = document.querySelector(".close-lightbox");

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
    `Origen: ${getValue("#origin")}`,
    `Destino: ${getValue("#destination")}`,
    `Pasajeros: ${getValue("#passengers")}`,
    `Fecha: ${getValue("#date")}`,
    `Horario: ${getValue("#time")}`,
    `Comentario: ${getValue("#notes") || "Sin comentarios"}`,
  ].join("\n");

  openWhatsApp(message);
});

document.querySelectorAll("[data-img]").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.img;
    lightbox.showModal();
  });
});

closeLightbox.addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});
