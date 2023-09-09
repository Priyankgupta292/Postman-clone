const radioButtoncustom=document.getElementById('con-type1');
const radioButtonjson=document.getElementById('con-type2');
let json=document.querySelector("request-json")
let custom=document.querySelector("request-custom")

function getelementbystr(string){
    let element=document.createElement('div')
    element.className="margin"
    element.innerHTML=string;
    return element;
}

radioButtoncustom.addEventListener("click",()=>{
    document.querySelector("#request-json").style.display='none';
    document.querySelector("#request-custom").style.display='block';

})

radioButtonjson.addEventListener("click",()=>{
    document.querySelector("#request-json").style.display='block';
    document.querySelector("#request-custom").style.display='none';

})
let addedParamsCount=1;
// button ke click par custom param jodne ka logic
let btn=document.getElementById("add")
btn.addEventListener('click',(e)=>{
    let str=`key <input type="text" name="key" id="key${addedParamsCount+1}" class="inline">
    value <input type="text" name="value" id="value${addedParamsCount+1}" class="inline">
    <input type="button" value="Del" id="delete" class="delete">`
    let child=getelementbystr(str);
    let parent=btn.parentNode.parentNode;
    parent.appendChild(child);
    addedParamsCount++;
    // delete button k click par custom param hatane ka logic
    let deletebtn=document.getElementsByClassName('delete');
    for (x of deletebtn){
        x.addEventListener('click',(e)=>{
            e.target.parentNode.remove();
            addedParamsCount--;
        })
    }

})
    



// adding the functionalities of get and post

let submit=document.getElementById('submit-btn');

submit.addEventListener('click',()=>{
    let restext=document.getElementById('res');
    restext.value='Please Wait.......';

    // fetch all values that user has entered
    let url=document.getElementById('URL').value;
    let reqtype=document.querySelector("input[name='Request']:checked").value;
    let contype=document.querySelector("input[name='content']:checked").value;
    let data;
    // console.log(reqtype,contype);
    // agar input json me ai to seedha text area ki value le lo
    if(contype=='json'){
        data=document.getElementById('json-content').value;
        console.log(data);
        
    }

    // agar input custom hai to uska logic likho

    else{
        data = {};
        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('key' + (i + 1)) != undefined) {
                let key = document.getElementById('key' + (i + 1)).value;
                let value = document.getElementById('value' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
        console.log(data);
    }




    // agar get request hai to
    if(reqtype=='GET'){
        fetch(url,{
            method:'GET'
        })
            .then(Response=>Response.text())
            .then((text)=>{
                restext.value=text;
            })
    }

    // agar request post hai to

    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                'content-type':'application/json; charset=UTF-8'
            }
        })
        .then(Response=>Response.text())
        .then((text)=>{
            restext.value=text;
        })
            
    }




    

})
   
