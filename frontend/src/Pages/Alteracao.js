import { useEffect, useMemo, useState } from "react";
import "./Cadastro.css";
import api from "../backend/configApi";
import { useParams } from "react-router-dom";
import axios from "axios";

const Alteracao = () => {
  console.log("Render");
  // const [post, setPost] = useState([]);

  // const { id } = useParams();

  // const url = useMemo(() => {
  //   return "http://localhost:3000/pacientes/" + id;
  // }, [id]);

  // useEffect(() => {
  //   console.log("URL MUDOU");
  // }, [url]);

  // // const url = "http://localhost:3000/pacientes/" + id;

  // //  PUXAR USÚARIOS DO SISTEMA E PREENCHER
  // useEffect(() => {
  //   axios
  //     .get(url)
  //     .then((response) => setPost(response.data))
  //     .catch((err) => {
  //       console.error("ops! ocorreu um erro" + err);
  //     });
  // }, []);

  // console.log("post", post);

  // const [name, setName] = useState();
  // const [nasci, setNasci] = useState();
  // const [email, setEmail] = useState();
  // const [ender, setEnder] = useState();
  // const [num, setNum] = useState();

  // // apagar usuário
  // const delUser = async (e) => {
  //   e.preventDefault();

  //   await api
  //     .delete("/pacientes/" + id)
  //     .then(function (response) {
  //       console.log(response.userdata);
  //       alert("apagado");
  //       // <Navigate to="/" />; NÃO ESTÁ REDIRECIONANDO PARA A PAGINA DE BUSCA
  //     })
  //     .catch(function (error) {
  //       console.error(error.response);
  //     });
  // };

  // console.log(post.id);
  // return (
  //   <div className="container-cadastro">
  //     <form>
  //       <div className="quadro-cadastro">
  //         <h1>Cadastro de paciente</h1>
  //         <label htmlFor="name">Nome Completo</label>
  //         <input
  //           type="text"
  //           name="name"
  //           placeholder="Digite seu nome completo"
  //           onChange={(e) => setName(e.target.value)}
  //           value={name}
  //         />
  //         <label htmlFor="data">Data de Nascimento</label>
  //         <input
  //           type="data"
  //           name="data"
  //           placeholder="dd/mm/aaaa"
  //           onChange={(e) => setNasci(e.target.value)}
  //         />
  //         <label htmlFor="Email">E-mail</label>
  //         <input
  //           type="email"
  //           name="Email"
  //           placeholder="seuemail@email.com"
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //         <div className="endereço">
  //           <div className="rua">
  //             <label htmlFor="ender">Endereço completo</label>
  //             <input
  //               type="text"
  //               name="ender"
  //               placeholder="Rua, Bairro"
  //               onChange={(e) => setEnder(e.target.value)}
  //             />
  //           </div>
  //           <div className="numero">
  //             <label htmlFor="numero">Número</label>
  //             <input
  //               type="number"
  //               name="numero"
  //               onChange={(e) => setNum(e.target.value)}
  //             />
  //           </div>
  //         </div>
  //         <input type="submit" className="btn-enviar" value="Concluir" />
  //         <button onClick={delUser}>Deletar</button>
  //       </div>
  //     </form>
  //     <div>
  //       <h1>Nomes</h1>
  //       <ul>
  //         {post.map((nome) => (
  //           <li key={nome.id}>
  //             <h2>nome: {nome.nome}</h2>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   </div>
  // );
  return <div>opa</div>;
};

export default Alteracao;
