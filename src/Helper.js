import { NotificationManager } from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export const currentDate = () => {
    var d = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return months[d.getMonth()]+' '+ d.getDate()+' '+d.getFullYear()+' | '+ hours + ':' + minutes + ' ' + ampm;
}


export const userAction = (obj,id,objId,userTitle,userDescription,userMessage) =>{
    confirmAlert({
        title: userTitle,
        message: userDescription,
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
                for (var i = 0; i < obj.length; i++){
                    if (obj[i].id === id){
                        obj[i].category=objId;
                    }
                }
                // setData(oldData);
                // oldData.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                // localStorage.setItem('items', JSON.stringify(oldData));
                NotificationManager.success(userMessage);
            }
          },
          {
            label: 'No'
          }
        ]
      }); 
}

