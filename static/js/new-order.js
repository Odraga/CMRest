const select_tables = document.querySelector("#select_tables")
const select_food_dishes = document.querySelector("#select_food_dishes")
const select_candy = document.querySelector("#select_candy")
const select_drinks = document.querySelector("#select_drinks")

const btn_create_order = document.querySelector("#btn_create_order")
const btn_add_order = document.querySelector("#btn_add_order")
const tbl_order = document.querySelector("#tbl_order")

var lista_orders = new Array();
var tables = JSON.parse(localStorage.getItem("tables"))
var id_order_new = 0
var num_order = sessionStorage.getItem("num_orders")
var new_num = parseInt(num_order)+1

for (var item in tables){
    let option = document.createElement("option")
    option.disabled = tables[item].status
    option.innerText = tables[item].table
    select_tables.appendChild(option)
}

function Order (id, food_dishes, candy, drink, table, num_order){
    this.id = id
    this.food_dishes = food_dishes
    this.candy = candy
    this.drink = drink
    this.table = table
    this.num_order = num_order
    this.status = true
}

btn_add_order.addEventListener("click", function(){

    let table = select_tables.options[select_tables.selectedIndex].text
    let food_dishes = select_food_dishes.options[select_food_dishes.selectedIndex].text
    let candy = select_candy.options[select_candy.selectedIndex].text
    let drink = select_drinks.options[select_drinks.selectedIndex].text

    if (food_dishes != "No Food" || candy != "No Candy" || drink != "No Drink"){
        let number_of_order = "order_"+num_order
        let id_order = "order_"+num_order+"_"+id_order_new

        id_order_new++

        let order = new Order (id_order,food_dishes, candy, drink, table, number_of_order)

        lista_orders.push(order)

        let posicion = lista_orders.findIndex(valor => valor == order);

        let cell = document.createElement("td")
        let row = document.createElement("tr")

        let btn_del = document.createElement("button")
        btn_del.innerText = "Delete"
        btn_del.value = "del" + posicion
        btn_del.addEventListener("click", function () {

            let del_order = lista_orders.findIndex(valor => valor == order);

            tbl_order.deleteRow(del_order + 1);
            
            lista_orders.splice(del_order, 1)
            
        });

        cell = row.insertCell(0)
        cell.innerHTML = food_dishes

        cell = row.insertCell(1)
        cell.innerHTML = candy

        cell = row.insertCell(2)
        cell.innerHTML = drink

        cell = row.insertCell(3)
        cell.innerHTML = table

        cell = row.insertCell(4)
        cell.appendChild(btn_del)

        tbl_order.appendChild(row)

        if(lista_orders.length == 1){
            for (let index = 0; index < select_tables.length; index++) {
                select_tables.options[index].disabled = true
            }
        }
    }
    else{
        alert("Lo sentimos, para poder agregar una orden debe haber por lo menos seleccionado un alimento.")
    }
});

btn_create_order.addEventListener("click", function(){

    if(lista_orders.length > 0){
        localStorage.setItem("order_"+num_order, JSON.stringify(lista_orders))
        
        sessionStorage.setItem("num_orders", new_num.toString())

        update_status_table()

        window.location.reload()
    }
    else{
        alert("La lista de ordenes esta vacia, por favor, agregue aunque sea una orden.")
    }
});

function update_status_table(){
    elementIndex = tables.findIndex((item => item.table == select_tables.options[select_tables.selectedIndex].text))

    tables[elementIndex].status = tables[elementIndex].status ? false : true

    localStorage.setItem("tables", JSON.stringify(tables))
}