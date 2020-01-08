// JQuery (Bootstrap dependency)
import $ from "jquery";

// Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


// Get directory for source
const elementStatsSourcePath = document.querySelector("#diff-stats-source-path");

// Get directory for target
const elementStatsTargetPath = document.querySelector("#diff-stats-target-path");

// find all matches and misses in the files

/* List all of the misses in a table */
const tableMissesRowTemplate = document.querySelector("#template-diff-table-misses-row");
const TableMisses = document.querySelector("#diff-table-misses");
const tableMissesBody = TableMisses.querySelector("tbody");

let missesRowNumber = 1;
const printTableMissesRow = (rowNumber, source, target) => {
  let rowContent = document.importNode(tableMissesRowTemplate.content, true);
  let columns = rowContent.querySelectorAll("td");
  columns[0].textContent  = rowNumber
  columns[1].textContent  = source
  columns[2].textContent  = target

  tableMissesBody.appendChild(rowContent);
  missesRowNumber++
}
printTableMissesRow(missesRowNumber, "Source text", "Target text")

/* List of the matches in a table */
const tableHitsRowTemplate = document.querySelector("#template-diff-table-hits-row");
const tableHits = document.querySelector("#diff-table-hits");
const tableHitsBody = tableHits.querySelector("tbody");

let hitsRowNumber = 1;
const printTableHitsRow = (rowNumber, source, target, result) => {
  let rowContent = document.importNode(tableHitsRowTemplate.content, true);
  let columns = rowContent.querySelectorAll("td");
  columns[0].textContent  = rowNumber
  columns[1].textContent  = source
  columns[2].textContent  = target
  columns[3].textContent  = result
  /*
  rowContent = rowContent.replace(/\${rowNumber}/g, rowNumber)
                          .replace(/\${source}/g, source)
                          .replace(/\${target}/g, target)
  */
  tableHitsBody.appendChild(rowContent);
  hitsRowNumber++
}
printTableHitsRow(hitsRowNumber, "Source text", "Target text", "Result text")
