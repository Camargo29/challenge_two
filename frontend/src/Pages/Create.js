import "./Create.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import api from "../api/configApi";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../Components/Validation";
import toast from "react-hot-toast";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const notify = () => toast("Cadastrado com sucesso.", { icon: "✅" });

const Create = () => {
  const navigate = useNavigate();
  const [reqDate, setReqDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("datanacimento", reqDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqDate]);

  const onSubmit = async (data, err) => {
    if (data) {
      await api
        .post("/pacientes", data)
        .then(function (response) {
          notify();
          navigate("/Read");
        })
        .catch(function (error) {
          console.error(error.response);
        });
    } else {
      console.log("err", err);
    }
  };

  return (
    <div className="container-create">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="quadro-create">
          <h1>Cadastro de paciente</h1>
          <Box
            sx={{
              "& > :not(style)": {
                m: 1,
                marginLeft: "0",
                marginRight: "0",
              },
            }}
          >
            <TextField
              id="outlined-basic"
              label={!errors.name ? "Digite seu nome" : errors.name.message}
              variant="outlined"
              size="medium"
              fullWidth
              error={errors.name}
              {...register("name")}
            />

            <Controller
              name="datanacimento"
              defaultValue={reqDate}
              control={control}
              render={({ field: { onChange, ...rest } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={2}>
                    <DesktopDatePicker
                      className="textFildData"
                      label="Data de Nascimento"
                      inputFormat="DD/MM/YYYY"
                      onChange={(newValue) => {
                        onChange(newValue);
                        setReqDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                      {...rest}
                    />
                  </Stack>
                </LocalizationProvider>
              )}
            />

            <TextField
              id="outlined-basic"
              label={!errors.email ? "Digite seu Email" : errors.email.message}
              variant="outlined"
              size="medium"
              fullWidth
              error={errors.email}
              {...register("email")}
            />

            <div className="endereço">
              <div className="rua">
                <TextField
                  id="outlined-basic"
                  label={
                    !errors.address
                      ? "Digite seu endereço"
                      : errors.address.message
                  }
                  variant="outlined"
                  size="medium"
                  fullWidth
                  error={errors.address}
                  {...register("address")}
                />
              </div>
              <div className="numero">
                <TextField
                  id="outlined-basic"
                  label={!errors.number ? "Número" : errors.number.message}
                  variant="outlined"
                  size="medium"
                  fullWidth
                  error={errors.number}
                  {...register("number")}
                />
              </div>
            </div>
            <Button
              className="btn-submit"
              type="submit"
              variant="contained"
              sx={{ fontSize: 14, marginLeft: 0, marginBotton: 1, height: 45 }}
              fullWidth
            >
              Enviar
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default Create;
