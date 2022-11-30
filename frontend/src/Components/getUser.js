import React from "react";

const getUser = () => {
  const getuserdata = {
    id: "",
    name: setName,
  };

  api
    .get("/pacientes/" + id, getuserdata)
    .then(function (response) {
      console.log(response.userdata);
      console.log("cadastro recuperado");
    })
    .catch(function (error) {
      console.error(error.response);
    });
};

const getUser = () => {
  return <div></div>;
};

export default getUser;
