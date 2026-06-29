import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { AppoitmentItem } from "@shared/types/appointment";

const headers = [
  "ID",
  "Description",
  "Appointment At",
  "Client",
  "Order",
];

function toRows(appointments: AppoitmentItem[]) {
  return appointments.map((item) => [
    item.id,
    item.description,
    new Date(item.appointmentAt).toLocaleString("pt-BR"),
    item.clientName,
    item.orderTitle ?? "-",
  ]);
}

export function exportToExcel(
  appointments: AppoitmentItem[], 
  fileName = "agendas-recentes.xlsx"
) {
  const rows = [headers, ...toRows(appointments)];

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");
  XLSX.writeFile(workbook, fileName);
}

export function exportToPdf(
  appointments: AppoitmentItem[], 
  fileName = "agendas-recentes.pdf",
  daysCanBeConsidered = 1
) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(`Agenda - Próximos ${daysCanBeConsidered} dia(s)`, 14, 15);

  autoTable(doc, {
    head: [headers],
    body: toRows(appointments),
    startY: 22,
  });

  doc.save(fileName);
}