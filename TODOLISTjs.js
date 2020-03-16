function jsTODO(){
    if(!window.localStorage){
        alert("浏览器不支持localstorage");
    }else{
        var todo=document.getElementById("submit");
        if(todo.value.toString()===""){
            alert("请不要输入空值");
        }
        else{
          storage.setItem(todo.value.toString(),"TODO");  
        }
        todo.value="";
        updateDATA();
    }
}

var storage=window.localStorage;

function updateDATA(){
    for(var i=0;i<storage.length;i++){
        var key=storage.key(i);
        var TODOvalue=storage.getItem(key);

        var TODO=document.getElementById("TODO");
        var Completed=document.getElementById("Completed");
        var newLI=document.createElement("li");
        if(TODOvalue==="TODO"){    
                newLI.setAttribute("id",key);
                newLI.innerText=key+" ";
                var buttonCompleted=document.createElement("input");
                buttonCompleted.type="button";
                buttonCompleted.value="完成";
                buttonCompleted.setAttribute("class","littlebutton");
                buttonCompleted.id=key;
                buttonCompleted.setAttribute("onclick","TaskCompleted(this);");
                newLI.appendChild(buttonCompleted);

                var buttonDelete=document.createElement("input");
                buttonDelete.type="button";
                buttonDelete.value="删除";
                buttonDelete.setAttribute("class","littlebutton");
                buttonDelete.id=key;
                buttonDelete.setAttribute("onclick","TODOdelete(this);");
                newLI.appendChild(buttonDelete);

                var buttonChange=document.createElement("input");
                buttonChange.type="button";
                buttonChange.value="更改";
                buttonChange.setAttribute("class","littlebutton");
                buttonChange.id=key;
                buttonChange.setAttribute("onclick","TODOchange(this);");
                newLI.appendChild(buttonChange);
                if(document.getElementById(key)===null){
                    TODO.appendChild(newLI); 
                } 
            
        }
        else if(TODOvalue==="Completed"){
            if(document.getElementById(key)===null){
                newLI.setAttribute("id",key);
                newLI.innerText=key+" ";
                Completed.appendChild(newLI);  
            } 
        }
    }  
}

function TaskCompleted(Taskbutton){
    var task=Taskbutton.id;
    var deleteLi=document.getElementById(task);
    deleteLi.remove();
    storage[task]="Completed";
    updateDATA();
}

function TODOchange(ChangeButton){
    var task=ChangeButton.id;
    var changeLi=document.getElementById(task);
    changeLi.textContent="";
    var inputfiled=document.createElement("input");
    inputfiled.type="text";
    inputfiled.id="changeDATA";
    changeLi.appendChild(inputfiled);

    var buttonYes=document.createElement("input");
    buttonYes.type="button";
    buttonYes.value="确认";
    buttonYes.setAttribute("class","littlebutton");
    buttonYes.setAttribute("onclick","DATAchange()");
    changeLi.appendChild(buttonYes);

    var buttonNo=document.createElement("input");
    buttonNo.type="button";
    buttonNo.value="取消";
    buttonNo.setAttribute("class","littlebutton");
    buttonNo.id="cancel";
    buttonNo.setAttribute("onclick","ChangeCancel(this)");
    changeLi.appendChild(buttonNo);
}

function DATAchange(){
    var inputvalue=document.getElementById("changeDATA");
    var content=inputvalue.value.toString();
    var IDchanged=inputvalue.parentNode.id;
    storage.removeItem(IDchanged);
    storage.setItem(content,"TODO");

    document.getElementById(IDchanged).remove();

    updateDATA();
}

function TODOdelete(DeleteButton){
    var task=DeleteButton.id;
    var deleteLi=document.getElementById(task);
    deleteLi.remove();
    storage.removeItem(task);
    updateDATA();
}

function ChangeCancel(buttonNo){
    var task=buttonNo.id;
    var deleteLi=document.getElementById(task);
    deleteLi.parentNode.remove();
    updateDATA();
}

updateDATA();

