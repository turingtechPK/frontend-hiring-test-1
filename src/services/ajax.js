import axios from "axios";

const AjaxCall = (type, api, params, is_cache, is_auth) => {
  console.log("this is data incoming", type, api, params, is_cache, is_auth);
  var ajaxPromise = new Promise(function (resolve, reject) {
    if (is_auth) {
      var headers = localStorage.getItem("SavedToken");
    } else {
      headers = "";
    }
    console.log("these header", headers);

    var url = "https://frontend-test-api.aircall.io/" + api;

    axios({
      method: type,
      url: url,
      data: params,
      headers: { Authorization: headers },
    })
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);

        if (error.response) {
          // client received an error response (5xx, 4xx)
          console.log("Something went Wrong! Please try later");
        } else {
          console.log("Something went Wrong! Please try later");
        }
      });
  });

  return ajaxPromise;
};

export default AjaxCall;
