import { notification } from 'antd';


export function getQueryParams(object){
  let params = new URLSearchParams();
  
  for (const property in object) {
    let value = object[property];
  
    if(value !== undefined && value !== null){
      if(Array.isArray(value)){
        value.forEach((item) => {
          params.append(property, item);
        });
      }else{
        params.append(property, value);
      }
    }
  }
  
  return params;
}

export const getTimeInMinAndSec =(time)=>{
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  const hours = Math.floor(time / 3600);
  time = time - hours * 3600;

  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
  
  const final = str_pad_left(minutes, '0', 2) + ' minutes ' + str_pad_left(seconds, '0', 2) + ' seconds'

  return final
}

// Success
export function success(message, duration = 5) {
  const key = 'success';
  notification.open({
    closeIcon: <i className="icon-close"></i>,
    key,
    duration,
    description:
      typeof (message) === 'string'
        ?
        message || 'Notification'
        :
        <div>{
          message?.map((val) => {
            return (
              <p>{val}</p>
            )
          })
        }</div>,
    className: 'notification-success'
  });

}

// Error
export function errorMessage(message, duration = 5) {
  const key = 'error';
  notification.open({
    closeIcon: <i className="icon-close"></i>,
    key,
    duration,
    description:
      typeof (message) === 'string'
        ?
        message || 'Notification'
        :
        <div>{
          message?.map((val) => {
            return (
              <p>{val}</p>
            )
          })
        }</div>,
    className: 'notification-error'
  });

}