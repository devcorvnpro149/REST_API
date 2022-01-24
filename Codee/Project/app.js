var Api = 'http://localhost:3000/device';

function start(){
    get_token(renderToken);

    HandleCreateForm();
}

start();

//Function
function get_token(callback){
    fetch(Api)
        .then(function(response){
        return response.json();
        })
        .then(callback);
}
function createtoken(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    };
   fetch(Api, options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}
function deletetoken(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    };
   fetch(Api + '/' +id, options)
        .then(function(response){
            response.json();
        })
        .then(function(){
            var tokenitem = document.querySelector('.token-item-'+id);
            if (tokenitem){
                tokenitem.remove();         
            }
        });
}
function renderToken(device){
    var tokenblock = document.querySelector('#post');
    var htmls = device.map(function(device){
        return `
        <li class="token-item-${device.id}">
            <h4>Family: ${device.family}</h4>
            <h4>Management Ip Address: ${device.managementIpAddress}</h4>
            <h4>Mac Address: ${device.macAddress}</h4>
            <h4>Type: ${device.type}</h4>
            <h4>Status: ${device.status}</h4>
            <button onclick="deletetoken(${device.id})">Delete</button>
        </li>`
    });
    tokenblock.innerHTML = htmls.join('');
}


function HandleCreateForm(){
    var createBtn=document.querySelector('#create');
    createBtn.onclick = function(){
        var family = document.querySelector('input[name="family"]').value;
        var managementIpAddress = document.querySelector('input[name="managementIpAddress"]').value;
        var macAddress = document.querySelector('input[name="macAddress"]').value;
        var type = document.querySelector('input[name="type"]').value;
        var status = document.querySelector('input[name="status"]').value;
        console.log(family);
        var formData = {
            family:family,
            managementIpAddress:managementIpAddress,
            macAddress:macAddress,
            type:type,
            status:status
        };
        createtoken(formData, function(){
            get_token(renderToken);
        });
    }
}
