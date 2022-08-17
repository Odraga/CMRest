const btn_exit = document.querySelector("#btn_exit")

const tbl_status_tables = document.querySelector("#tbl_status_tables")

var tables = JSON.parse(localStorage.getItem("tables"))

for(var item in tables){
    create_table_of_tables(item, tables[item].table, tables[item].status)
}

function create_table_of_tables(index, table, status){

    let input_checkbox_status = document.createElement("input")
    input_checkbox_status.title = status ? "Occupied" : "Free"
    input_checkbox_status.type = "checkbox"
    input_checkbox_status.checked = status
    input_checkbox_status.disabled = true

    let cell = document.createElement("td")
    let row = document.createElement("tr")

    cell = row.insertCell(0)
    cell.innerHTML = parseInt(index) + 1

    cell = row.insertCell(1)
    cell.innerHTML = table

    cell = row.insertCell(2)
    cell.appendChild(input_checkbox_status)

    tbl_status_tables.appendChild(row)
}

btn_exit.addEventListener("click", function(){
    window.location.replace("../index.html")
});