//get.total

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let deleteAll = document.getElementById('deleteAll');
let search = document.getElementById('search');
let mood = 'create';
let tem;

//*********************************get total **********/
// ************معمول  onkeyup="getTotal()" داخل العناصر price **********
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = null;
    }
} //*********************************get total **********/

// .create product
// .save.localstorage
//********************************* create product **********/
// .save.localstorage
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}
// .save.localstorage
submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        newPro.count <= 100) {
        if (mood === 'create') {
            // count
            // ** ** ** ** ** ** ** ** * count******************
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
            localStorage.setItem('product', JSON.stringify(dataPro));
            shiwData();
        } else {
            dataPro[tem] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData();
    }
}

//.clear.inputs
// *************************clear.inputs ***************
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// read
// *********************read********************
// *********************shiwData()*****************
function shiwData() {
    let tbody = '';
    for (let i = 0; i < dataPro.length; i++) {
        tbody += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td> <button onclick="updateData(${i})" id="update">update</button></td>
                <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = tbody;
    if (dataPro.length > 0) {
        deleteAll.style.display = 'block';
    } else {
        deleteAll.style.display = null;
    }

    deleteAll.innerHTML = 'Delete All (' + dataPro.length + ')';
}

//.delete
// ******************delete*********************
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    shiwData();
}
// ********************************* onclick="deleteALL****************
function deleteAllData() {
    localStorage.clear();
    dataPro.splice(0);
    localStorage.clear();
    dataPro.splice(0);
    shiwData();
}

// update
function updateData(i) {
    tem = i;
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    total.innerHTML = dataPro[i].total;
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    getTotal();
    scroll({
        top: 0,
        behavior: 'smooth'
    });
}

// · search
let searchMood = 'title';

function getSearchMood(id) {
    if (id == 'searctTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.focus();
    search.placeholder = 'Search ' + searchMood;
    search.value = '';
    shiwData();
}

function searchData(value) {
    let tbody = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                tbody += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td> <button onclick="updateData(${i})" id="update">update</button></td>
                <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
            }
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                tbody += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td> <button onclick="updateData(${i})" id="update">update</button></td>
                <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
            }
        }
        document.getElementById('tbody').innerHTML = tbody;
    }
}
// . clean . data
shiwData();