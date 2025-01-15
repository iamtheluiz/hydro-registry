<p align="center">
	<img width="64px" src="./client/src/assets/valve.png" alt="Valve" /> <br>
  Hydro Register
</p>

<p align="center">
  <img alt="Typescript" src="https://img.shields.io/badge/-Typescript-44475a?logo=typescript&color=3182ce&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/-React-44475a?logo=react&color=3182ce&logoColor=white" />
  <img alt="Firebase" src="https://img.shields.io/badge/-Firebase-44475a?logo=firebase&color=3182ce&logoColor=white" />
</p>

<img src=".github/home.png" alt="Captura de Tela da Página Inicial" />

## 🗺 O projeto

O Hydro Register surgiu de uma conversa com meu pai sobre a necessidade de registrar a localização de registros e hidrantes nas cidades, facilitando a localização e o acompanhamento deles.

* **Luiz Gustavo** - *Desenvolvedor* - [iamtheluiz](https://github.com/iamtheluiz)

### ⚠ Observações

* É importante reforçar que a ideia atual do projeto é demonstrar uma possível solução, com uma plataforma desenvolvida pela curiosidade e vontade de propor a resolução de um problema
* Esse tipo de registro deve ser mantidos por empresas que possuem a concessão do sistema de águas de cada região, sendo problemática a divulgação pública da localidade de cada registro ou hidrante
* Assim sendo, o presente projeto propõe apenas demonstrar como um sistema de registros poderia ser desenvolvido, mas não visa se tornar um domínio público com dados sensíveis sobre os sistemas hídricos das regiões.

## 🛠 Tecnologias

O projeto foi desenvolvido com as seguintes tecnologias:
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com/)

## 🏃 Iniciando

Primeiro, clone esse repositório e acesse a pasta criada:

```bash
# Clonando repositório
git clone https://github.com/iamtheluiz/hydro-registry.git

cd hydro-registry/
```

Dentro da pasta, instale todas as dependências do projeto:

```bash
npm install
# ou
yarn install
```

## 💻 Executando

Para executar esse projeto em um ambiente local utilize:

```bash
npm run start
# ou
yarn start
```

Então abra [http://localhost:3000](http://localhost:3000) para visualizar o site no seu navegador.

É importante destacar que esse projeto utiliza o [Firebase](https://firebase.google.com/), sendo necessário criar um projeto e utilizar suas credênciais para disponibilizar um Realtime Database. O exemplo de arquivo com as variáveis de ambiente pode ser encontrado em [.env.example](.env.example).

## ⚙️ Build

Para gerar uma versão para disponibilização do projeto, execute:

```bash
yarn build
```

Aguarde até que as rotinas terminem e você terá uma pasta "/build", na raiz do projeto, com todos os arquivos estáticos gerados.
