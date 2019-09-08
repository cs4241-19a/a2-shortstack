// Register HTML elements ==============================================================================================
const addBtn = document.getElementById('add');
const deleteBtn = document.getElementById('delete');
const modifyBtn = document.getElementById('modify');
const overview = document.getElementById('overview');

// =====================================================================================================================

// GET =================================================================================================================
let tabularFront = "Empty Tabular";
let bombIndex = 0;
const createNode = function (element) {
    return document.createElement(element);
};
const append = function (parent, el) {
    return parent.appendChild(el);
};
const makeHeadings = function () {
    let th1 = createNode('th');
    let th2 = createNode('th');
    let th3 = createNode('th');
    let th4 = createNode('th');
    let th5 = createNode('th');
    th1.innerHTML = 'Name';
    th2.innerHTML = 'Gender';
    th3.innerHTML = 'Age';
    th4.innerHTML = 'Hobby';
    th5.innerHTML = 'Match Score';
    let tr = createNode('tr');
    append(tr, th1);
    append(tr, th2);
    append(tr, th3);
    append(tr, th4);
    append(tr, th5);
    append(overview, tr);
};
const refresh = function () {
    fetch('/refresh', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        tabularFront = data;
        overview.innerHTML = "";
        makeHeadings();

        let rowNum = 1;
        const setBombIndex = function (e) {
            console.log('hi');
            bombIndex = rowNum;
            e.preventDefault();
            return false;
        };
        tabularFront.map(function (row) {
            let td1 = createNode('th');
            let td2 = createNode('th');
            let td3 = createNode('th');
            let td4 = createNode('th');
            let td5 = createNode('th');
            let td6 = createNode('th');
            let td7 = createNode('th');

            let gear = createNode('i');
            gear.id = `gear${rowNum}`;
            gear.className = 'fa fa-gear';

            let bomb = createNode('i');
            bomb.id = `bomb${rowNum}`;
            bomb.className = 'fa fa-bomb';
            bomb.onclick = setBombIndex;

            td1.innerHTML = row.name;
            td2.innerHTML = row.gender;
            td3.innerHTML = row.age;
            td4.innerHTML = row.hobby;
            td5.innerHTML = row.matchScore;
            append(td6, gear);
            append(td7, bomb);

            let tr = createNode('tr');
            tr.className = rowNum;
            append(tr, td1);
            append(tr, td2);
            append(tr, td3);
            append(tr, td4);
            append(tr, td5);
            append(tr, td6);
            append(tr, td7);
            append(overview, tr);

            rowNum++;
        });
    });
};
refresh();
// =====================================================================================================================

// POST ================================================================================================================
let input = 'Empty Input';
const makeBody = function () {
    const name = document.querySelector('#name');
    const age = document.querySelector('#age');

    const genderS = document.getElementsByName('gender');
    let gender;
    for (let i = 0; i < genderS.length; i++) {
        if (genderS[i].checked) {
            gender = genderS[i].value;
            break
        }
    }

    const hobbyS = document.getElementsByName('hobby');
    let hobby;
    for (let i = 0; i < hobbyS.length; i++) {
        if (hobbyS[i].checked) {
            hobby = hobbyS[i].value;
            break
        }
    }

    const json = {
        name: name.value,
        age: parseInt(age.value),
        gender: gender,
        hobby: hobby,
        matchScore: 0
    };
    return JSON.stringify(json);
};
const handlePost = function () {
    let body = makeBody();
    fetch(`/${input}`, {
        method: 'POST',
        body
    }).then(function (response) {
        console.log("Post sent to server: " + response);
        refresh();
    });
};

const setInputAdd = function (e) {
    input = 'add';
    handlePost();
    e.preventDefault();
    return false;
};
const setInputDelete = function (e) {
    input = 'delete';
    handlePost();
    e.preventDefault();
    return false;
};
const setInputModify = function (e) {
    input = 'modify';
    handlePost();
    e.preventDefault();
    return false;
};

addBtn.onclick = setInputAdd;
deleteBtn.onclick = setInputDelete;
modifyBtn.onclick = setInputModify;

let element = document.getElementById('overview').getElementsByTagName('tr');
console.log(element);

let bo = document.getElementsByClassName('fa fa-bomb');
console.log(bo);


// let i = 1;
// while (i > 0) {
//     console.log('hi');
//     document.getElementById(`bomb${i}`).onclick = foo;
//     i++;
// }
// =====================================================================================================================