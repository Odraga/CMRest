const tbl_orders_waiting = document.querySelector("#tbl_orders_waiting")
const tbl_orders_done = document.querySelector("#tbl_orders_done")
const tbl_view_orders = document.querySelector("#tbl_view_orders")

const status_tbl = document.querySelector("#status_tbl")

var tamanio = localStorage.length
var tables = JSON.parse(localStorage.getItem("tables"))

var list_orders = new Array()
//var list_table_orders = new Array()

for (let index = 0; index < localStorage.length; index++) {

    var name_key = localStorage.key(index)

    var extract_name_key = name_key.substring(0,6)

   if (name_key != null && extract_name_key == "order_"){
        let get_order = localStorage.getItem(name_key)

        let convert_order_to_object = JSON.parse(get_order)
        
        list_orders.push(convert_order_to_object)
    }
}

function All_Orders(order, table, status){
    this.order = order
    this.table = table
    this.status = status
}


if(list_orders.length < 1){
    status_tbl.innerHTML = "<h5>No backorder found.</h5>"
}

$.each(list_orders, function (indexP, item){
    if (item.length > 0){
        let all_status = 0
        for (let index = 0; index < item.length; index++) {
            if(item[index].status){
                all_status++
            }
            if(index == item.length -1){
                if (all_status == item.length || all_status != 0){

                    //let obj_add = new All_Orders(item[index].num_order, item[index].table, true)

                    //list_table_orders.push(obj_add)
                    
                    create_table_order_waiting(indexP, item[index].num_order, item[index].table, true)
                }
                else{
                    //let obj_add = new All_Orders(item[index].num_order, item[index].table, false)

                    //list_table_orders.push(obj_add)

                    create_table_order_waiting(indexP, item[index].num_order, item[index].table, false)
                }
            }
        }
    }

});

function create_table_order_waiting(index, order, table, status){
    let cell = document.createElement("td")
    let row = document.createElement("tr")

    let input_checkbox_status = document.createElement("input")
    input_checkbox_status.title = status ? "Waiting" : "Done"
    input_checkbox_status.type = "checkbox"
    input_checkbox_status.disabled = true
    input_checkbox_status.checked = status

    let link_view_order = document.createElement("a")
    link_view_order.href = "#"
    link_view_order.innerText = "View"
    link_view_order.addEventListener("click", function () {
        document.getElementsByClassName("fondo_transparente")[0].style.display="block"
        document.querySelector("#modal_titulo").innerHTML = "ORDER"

        let get_order = localStorage.getItem(order)
        let view_order = JSON.parse(get_order)

        for (var item in view_order) {
            create_table_view_order(item, view_order[item].id, view_order[item].num_order, view_order[item].food_dishes, view_order[item].candy, view_order[item].drink, view_order[item].table, view_order[item].status)
        }
    });

    let link_cancel_order = document.createElement("a")
    link_cancel_order.href = "#"
    link_cancel_order.innerText = "Delete"
    link_cancel_order.addEventListener("click", function(){

        update_status_table(table)

        localStorage.removeItem(order)
        
        window.location.reload()
    });

    cell = row.insertCell(0)
    cell.innerHTML = index + 1

    cell = row.insertCell(1)
    cell.innerHTML = order

    cell = row.insertCell(2)
    cell.innerHTML = table

    cell = row.insertCell(3)
    cell.appendChild(input_checkbox_status)

    cell = row.insertCell(4)
    cell.appendChild(link_view_order)

    cell = row.insertCell(5)
    cell.appendChild(link_cancel_order)

    if (status){
        tbl_orders_waiting.appendChild(row)
    }else{
        update_status_table(table)

        tbl_orders_done.appendChild(row)
    }
}

function create_table_view_order(position, id, num_order, food_dishes, candy, drink_merengada, table, status){

    let input_checkbox_status = document.createElement("input")
    input_checkbox_status.title = status ? "Waiting" : "Done"
    input_checkbox_status.type = "checkbox"
    input_checkbox_status.disabled = true
    input_checkbox_status.checked = false
    input_checkbox_status.value = num_order
    input_checkbox_status.addEventListener("change", function(){
        let get_items = localStorage.getItem(num_order)
        let loaded_orders = JSON.parse(get_items)

        elementIndex = loaded_orders.findIndex((item => item.id == id))

        loaded_orders[elementIndex].status = status ? false : true

        localStorage.setItem(num_order, JSON.stringify(loaded_orders))

    });

    let cell = document.createElement("td")
    let row = document.createElement("tr")

    cell = row.insertCell(0)
    cell.innerHTML = parseInt(position) + 1

    cell = row.insertCell(1)
    cell.innerHTML = food_dishes

    cell = row.insertCell(2)
    cell.innerHTML = candy

    cell = row.insertCell(3)
    cell.innerHTML = drink_merengada

    cell = row.insertCell(4)
    cell.innerHTML = table

    cell = row.insertCell(5)
    cell.appendChild(input_checkbox_status)

    tbl_view_orders.appendChild(row)
}

function update_status_table(table){
    elementIndex = tables.findIndex(item => item.table == table)

    tables[elementIndex].status = tables[elementIndex].status ? false : false

    localStorage.setItem("tables", JSON.stringify(tables))
}