import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [dados, setDados] = useState({});
  const [alerta, setAlerta] = useState({ mensagem: "", tipo: "" });

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dados.nome || !dados.cpf || !dados.tipoCadastro) {
      setAlerta({
        mensagem: "Por favor, preencha todos os campos obrigatórios.",
        tipo: "danger",
      });
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/cadastrar",
          dados
        );
        setAlerta({ mensagem: response.data.mensagem, tipo: "success" });
      } catch (error) {
        setAlerta({
          mensagem: "Erro ao cadastrar. Tente novamente.",
          tipo: "danger",
        });
      }
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Sistema de Gestão Universitária</h1>
      <Nav className="justify-content-center my-4">
        <NavItem>
          <NavLink href="#">Cadastro Pessoa Física</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Cadastro Pessoa Jurídica</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Cadastro Professores</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Cadastro Fornecedores</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Cadastro Alunos</NavLink>
        </NavItem>
      </Nav>

      {alerta.mensagem && <Alert color={alerta.tipo}>{alerta.mensagem}</Alert>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input
            type="text"
            name="nome"
            id="nome"
            placeholder="Digite seu nome"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="cpf">CPF</Label>
          <Input
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Digite seu CPF"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="tipoCadastro">Tipo de Cadastro</Label>
          <Input
            type="select"
            name="tipoCadastro"
            id="tipoCadastro"
            onChange={handleChange}
          >
            <option value="">Selecione...</option>
            <option value="Pessoa Física">Pessoa Física</option>
            <option value="Pessoa Jurídica">Pessoa Jurídica</option>
            <option value="Professor">Professor</option>
            <option value="Fornecedor">Fornecedor</option>
            <option value="Aluno">Aluno</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="senha">Senha</Label>
          <Input
            type="password"
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary">Salvar</Button>
      </Form>
    </Container>
  );
};

export default App;
