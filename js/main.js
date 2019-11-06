let tableBody = document.getElementById("tableBody");
let addForm = document.getElementById("addForm");
let editForm = document.getElementById("editForm");
let btnRefresh = document.getElementById("ref");

addForm.addEventListener("submit", addRow);
editForm.addEventListener("submit", editRow);
btnRefresh.addEventListener("click", fetchData);

function fetchData() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            // console.log(data[1]);
            for (let i = 0; i < data.length; i++) {
                let tr = document.createElement("tr");
                let tdID = document.createElement("td");
                tdID.innerHTML = data[i].id;
                let tdTitle = document.createElement("td");
                tdTitle.innerHTML = data[i].title;
                let tdBody = document.createElement("td");
                tdBody.innerHTML = data[i].body;
                let tdUserID = document.createElement("td");
                tdUserID.innerHTML = data[i].userId;
                tr.appendChild(tdID);
                tr.appendChild(tdTitle);
                tr.appendChild(tdBody);
                tr.appendChild(tdUserID);
                tableBody.appendChild(tr);
            }
        })
        .catch(err => console.log(err));
}
fetchData();

function addRow(e) {
    e.preventDefault();
    let title = document.getElementById("title-add").value;
    let body = document.getElementById("body-add").value;
    let userId = document.getElementById("userId-add").value;
    let model = document.getElementById("model");

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId
        })
    })
        .then(res => res.json())
        .then(data => {
            // handle success
            model.innerHTML = "New Post Was Added Successfully...";
            model.classList.add("success");
            setTimeout(function() {
                model.classList.remove("success");
            }, 5000);
            console.log(data);
        })
        .catch(err => {
            // handle err
            model.innerHTML = "Something Went Wronge...";
            model.classList.add("error");
            setTimeout(function() {
                model.classList.remove("error");
            }, 5000);
            console.log(err);
        });
}

function editRow(e) {
    e.preventDefault();
    let ID = document.getElementById("ID").value;
    let title = document.getElementById("title-edit").value;
    let body = document.getElementById("body-edit").value;
    let userId = document.getElementById("userId-edit").value;
    let model = document.getElementById("model2");

    fetch(`https://jsonplaceholder.typicode.com/posts/${ID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId
        })
    })
        .then(res => res.json())
        .then(data => {
            // handle success
            model.innerHTML = "New Post Was Updated Successfully...";
            model.classList.add("success");
            setTimeout(function() {
                model.classList.remove("success");
            }, 5000);
            console.log(data);
        })
        .catch(err => {
            // handle err
            model.innerHTML = "Something Went Wronge...";
            model.classList.add("error");
            setTimeout(function() {
                model.classList.remove("error");
            }, 5000);
            console.log(err);
        });
}
