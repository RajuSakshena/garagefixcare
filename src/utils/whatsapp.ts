export const WHATSAPP_BUSINESS_NUMBER = "919540553759";

type BookingDetails = Record<string, unknown>;

/** Opens a pre-filled booking message in WhatsApp. Call directly from a user action. */
export function openWhatsAppBooking(details: BookingDetails = {}): void {
  const labels: Record<string, string> = {
    serviceType: "Service", service: "Service", title: "Package", subtitle: "Vehicle category",
    price: "Price", discountedPrice: "Price", phoneNumber: "Customer phone", phone: "Customer phone",
    name: "Name", email: "Email", subject: "Subject", message: "Message", vehicle: "Vehicle",
    vehicleType: "Vehicle type", location: "Location", address: "Address", city: "City",
  };
  const lines = ["Hello Garage Fix Care, I would like to enquire/book a service."];
  Object.entries(details).forEach(([key, value]) => {
    if (value === undefined || value === null || String(value).trim() === "") return;
    const label = labels[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
    lines.push(`${label}: ${String(value)}`);
  });
  lines.push("Please share availability and confirm the final charges.");
  const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  const popup = window.open(url, "_blank");
  if (popup) {
    popup.opener = null;
  } else {
    window.location.href = url;
  }
}
