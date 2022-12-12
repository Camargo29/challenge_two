import "./Cadastro.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/configApi";

import dayjs from "dayjs";
import "dayjs/locale/pt";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box, Button } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../Components/Validation";

const Cadastro = () => {
  const [value, setValue] = useState(dayjs("2022-01-01"));

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(value);
    // value = { ...register("datanacimento") };
    // NÃO ESTÁ FUNCIONANDO
  };

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, err) => {
    if (data) {
      await api
        .post("/pacientes", data)
        .then(function (response) {
          console.log(response.userdata);
          alert("cadastrado");
        })
        .catch(function (error) {
          console.error(error.response);
        });
    } else if (err) {
      console.log(err);
    }
    console.log(data);
  };

  // console.log(
  //   watch("datanacimento").replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, "$3$2$1")
  // );

  return (
    <div className="container-cadastro">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="quadro-cadastro">
          <h1>Cadastro de paciente</h1>
          <Box
            sx={{
              "& > :not(style)": {
                m: 1,
                marginLeft: "0",
                marginRight: "0",
              },
            }}
            autoComplete="off"
          >
            {!errors.nome && (
              <TextField
                id="outlined-basic"
                label="Digite seu nome"
                variant="outlined"
                size="small"
                fullWidth
                {...register("nome")}
              />
            )}
            {errors.nome && (
              <TextField
                error
                id="outlined-basic-error"
                label={errors.nome?.message}
                variant="outlined"
                size="small"
                fullWidth
              />
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  key="ptBR"
                  label="Data de Nascimento"
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>

            {!errors.email && (
              <TextField
                id="outlined-basic"
                label="Digite seu Email"
                variant="outlined"
                size="small"
                fullWidth
                {...register("email")}
              />
            )}

            <div className="endereço">
              <div className="rua">
                {!errors.endereco && (
                  <TextField
                    id="outlined-basic"
                    label="Digite seu endereço"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("endereco")}
                  />
                )}
              </div>
              <div className="numero">
                {!errors.numero && (
                  <TextField
                    id="outlined-basic"
                    label="Número"
                    variant="outlined"
                    size="small"
                    fullWidth
                    {...register("numero")}
                  />
                )}
              </div>
            </div>
            {/* <Button
              type="submit"
              className="btn-cadastro"
              variant="contained"
              sx={{ fontSize: 14 }}
              fullWidth
            >
              Enviar
            </Button> */}
            <input type="submit" className="btn-enviar" value="enviar" />
          </Box>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
