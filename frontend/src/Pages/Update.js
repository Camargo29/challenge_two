import "./Create.css";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
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

const notify = () => toast("Usuário apagado com sucesso!", { icon: "✅" });
const notifyAlt = () =>
  toast("Alteração realizada com sucesso!", { icon: "✅" });

const Update = () => {
  const navigate = useNavigate();
  const [reqDate, setReqDate] = useState(new Date());

  const [post, setPost] = useState();

  const { id } = useParams();

  const url = useMemo(() => {
    return "http://localhost:3000/pacientes/" + id;
  }, [id]);

  useLayoutEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const delUser = async (e) => {
    e.preventDefault();

    await api
      .delete("/pacientes/" + id)
      .then(function (response) {
        notify();
        navigate("/Read");
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

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
        .patch("/pacientes/" + id, data)
        .then(function (response) {
          notifyAlt();
          navigate("/Read");
        })
        .catch(function (error) {
          console.error(error.response);
        });
    } else if (err) {
      console.log(err);
    }
  };

  const nameLabel = useMemo(() => {
    if (errors?.name) {
      return errors.name.message;
    }
    if (post?.name) {
      setValue("name", post?.name);
      return "Nome";
    }
    return "Carregando...";
  }, [errors.name, post?.name, setValue]);

  const birthdateLabel = useMemo(() => {
    if (errors?.birthdate) {
      return errors.birthdate.message;
    }
    if (post?.birthdate) {
      setValue("datanacimento", new Date(post?.birthdate));
      return "Data de Nascimento";
    }
    return "Carregando...";
  }, [errors.birthdate, post?.birthdate, setValue]);

  const emailLabel = useMemo(() => {
    if (errors?.email) {
      return errors.email.message;
    }
    if (post?.email) {
      setValue("email", post?.email);
      return "Email";
    }
    return "Carregando...";
  }, [errors.email, post?.email, setValue]);
  const addressLabel = useMemo(() => {
    if (errors?.address) {
      return errors.address.message;
    }
    if (post?.address) {
      setValue("address", post?.address);
      return "Rua";
    }
    return "Carregando...";
  }, [errors.address, post?.address, setValue]);

  const numberLabel = useMemo(() => {
    if (errors?.number) {
      return errors.number.message;
    }
    if (post?.number) {
      setValue("number", post?.number);
      return "Número";
    }
    return "Carregando...";
  }, [errors.number, post?.number, setValue]);

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
              id="outlined-name"
              label={nameLabel}
              variant="outlined"
              size="medium"
              fullWidth
              disabled={!post?.name}
              error={errors.name}
              defaultValue="Carregando..."
              {...register("name")}
            />

            <Controller
              name="datanacimento"
              defaultValue={birthdateLabel}
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
              id="outlined-email"
              label={emailLabel}
              defaultValue={emailLabel}
              disabled={!post?.email}
              variant="outlined"
              size="medium"
              fullWidth
              error={errors.email}
              {...register("email")}
            />

            <div className="endereço">
              <div className="rua">
                <TextField
                  id="outlined-address"
                  label={addressLabel}
                  defaultValue={addressLabel}
                  disabled={!post?.address}
                  variant="outlined"
                  size="medium"
                  fullWidth
                  error={errors.address}
                  {...register("address")}
                />
              </div>

              <div className="number">
                <TextField
                  id="outlined-number"
                  label={numberLabel}
                  defaultValue={numberLabel}
                  disabled={!post?.number}
                  variant="outlined"
                  size="medium"
                  fullWidth
                  error={errors.number}
                  {...register("number")}
                />
              </div>
            </div>
            <div className="button">
              <Button
                className="btn-submit-alt"
                type="submit"
                variant="contained"
                sx={{
                  fontSize: 14,
                  marginLeft: 0,
                  marginBotton: 1,
                  height: 45,
                }}
                fullWidth
              >
                Enviar
              </Button>
              <Button
                className="btn-del"
                type="Button"
                variant="contained"
                sx={{
                  fontSize: 14,
                  marginLeft: 0,
                  marginBotton: 1,
                  height: 45,
                }}
                fullWidth
                onClick={delUser}
              >
                Apagar
              </Button>
            </div>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default Update;
