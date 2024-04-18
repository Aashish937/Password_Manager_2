const copyContent = (content) => {
    navigator.clipboard.writeText(content).then( () =>{
       alert("Copied!!!"); 
    }).catch( err => {
        alert("Coping failed!!!");
    })
}

const  deletePasswordData = (index) =>{
    let passwordDetails = localStorage.getItem("passwordDetails");
    let passwordData = JSON.parse(passwordDetails);
    passwordData.splice(index,1);
    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));
    alert("Password details are Deleted.");
    SavedPasswordDetails();
}

const editPasswordData = (index) => {
    let table = document.querySelector("table");
    let passwordDetails = localStorage.getItem("passwordDetails");
    
    table.innerHTML = `<tr>
            <th style="background-color:lightgray">Website</th>
            <th style="background-color:lightgray">User Name</th>
            <th style="background-color:lightgray">Password</th>
            <th style="background-color:lightgray">Action</th>
        </tr>`;

        let passwordData = JSON.parse(passwordDetails);

        let html = "";
        let color = "gray";
        let edit = "";

        for(let i=0; i<passwordData.length; i++){
            row=passwordData[i];
            if(i==index){
                edit = "contenteditable";
            }
            else{
                edit = "";
            }
            if(i % 2 == 0){
                color = "white";
            }
            else{
                color = "whitesmoke";
            }
            html += 
                `<tr>
                    <td id="${i + "0"}" style = "background-color: ${color};" ${edit}>${row.website}<i onClick ="copyContent('${row.website}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td id="${i + "1"}" style = "background-color: ${color};" ${edit}>${row.username}<i onClick ="copyContent('${row.username}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td id="${i + "2"}" style = "background-color: ${color};" ${edit}>${row.password}<i onClick ="copyContent('${row.password}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td style = "background-color: ${color};">
                        <button class="delbtn" onClick="deletePasswordData('${i}')">Delete</button>
                        <button class="editbtn" onClick="editPasswordData('${i}')">Edit</button>
                        <button class="savebtn" onClick="savePasswordData('${i}')">Save</button>
                    </td>
                </tr>`;
        }
    table.innerHTML += html;
}

const savePasswordData = (index) =>{
    let websitedata = document.getElementById(index + "0").innerText;
    let usernamedata = document.getElementById(index + "1").innerText;
    let passworddata = document.getElementById(index + "2").innerText;
    console.log(websitedata,usernamedata,passworddata);
    
    let passwordDetails = localStorage.getItem("passwordDetails");

    let passwordData = JSON.parse(passwordDetails);

    passwordData[index].website =websitedata;
    passwordData[index].username =usernamedata;
    passwordData[index].password =passworddata;

    localStorage.setItem("passwordDetails", JSON.stringify(passwordData));

    SavedPasswordDetails();

}

const SavedPasswordDetails = () =>{
    let table = document.querySelector("table");
    let passwordDetails = localStorage.getItem("passwordDetails");
    if(passwordDetails == null){
        table.innerHTML = "No Details Available";
    }else{

        table.innerHTML = `<tr>
            <th style="background-color:lightgray">Website</th>
            <th style="background-color:lightgray">User Name</th>
            <th style="background-color:lightgray">Password</th>
            <th style="background-color:lightgray">Action</th>
        </tr>`;

        let passwordData = JSON.parse(passwordDetails);
        let html = "";
        let color = "gray";
        for(let i=0; i<passwordData.length; i++){
            row=passwordData[i];
            if(i % 2 == 0){
                color = "white";
            }
            else{
                color = "whitesmoke";
            }
            html += 
                `<tr>
                    <td id="${i + "0"}" style = "background-color: ${color};">${row.website}<i onClick ="copyContent('${row.website}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td id="${i + "1"}" style = "background-color: ${color};">${row.username}<i onClick ="copyContent('${row.username}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td id="${i + "2"}" style = "background-color: ${color};">${row.password}<i onClick ="copyContent('${row.password}')" class="fa-regular fa-clipboard copy"></i></td>
                    <td style = "background-color: ${color};">
                        <button class="delbtn" onClick="deletePasswordData('${i}')">Delete</button>
                        <button class="editbtn" onClick="editPasswordData('${i}')">Edit</button>
                        <button class="savebtn" onClick="savePasswordData('${i}')">Save</button>
                    </td>
                </tr>`;
        }
        table.innerHTML += html;
    }
}

SavedPasswordDetails();

document.querySelector(".btn").addEventListener("click", (event) => {
    event.preventDefault();

    let passwordDetails = localStorage.getItem("passwordDetails");
    if(passwordDetails == null){
        let passwordJSON = [];
        passwordJSON.push({
            website: website.value,
            username: username.value,
            password: password.value
        });
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
        alert("Password details are Saved.");
    }
    else{
        let passwordJSON = JSON.parse(passwordDetails);
        passwordJSON.push({
            website: website.value,
            username: username.value,
            password: password.value
        });
        localStorage.setItem("passwordDetails", JSON.stringify(passwordJSON));
        alert("Password details are Saved.");

    }

    website.value = "";
    username.value = "";
    password.value = "";

    SavedPasswordDetails();
});