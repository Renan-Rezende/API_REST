# Projeto de Treino de Requisições com JSON Server

## Visão Geral

Este projeto é um exercício para treinar habilidades de requisições utilizando a biblioteca `json-server`. Ele simula um aplicativo de gerenciamento de transações, permitindo a criação, edição e exclusão de transações, bem como a visualização do saldo.

### Configuração Inicial

1. **Instalação de Dependências**

   Antes de começar, certifique-se de ter o Node.js instalado. Em seguida, instale as dependências executando o seguinte comando no terminal:

   ```bash
   npm install

   Executar a Aplicação

Abra o arquivo index.html em um navegador web ou inicie um servidor local para visualizar a aplicação.

Funcionalidades Principais
Visualização de Transações e Saldo

O saldo é exibido no topo da página, e as transações são listadas com detalhes, incluindo nome, valor e se são débitos ou créditos.

Adição de Nova Transação

Preencha o formulário no topo da página com o nome e o valor da transação. Ao enviar o formulário, a transação será adicionada ao servidor e à lista de transações na página.

Edição de Transação

Cada transação tem um botão "Editar". Ao clicar nele, o formulário no topo será preenchido com os detalhes da transação selecionada. Após a edição e o envio do formulário, a transação será atualizada no servidor e na interface do usuário.

Exclusão de Transação

Cada transação possui um botão "Excluir". Ao clicar nele, a transação será removida tanto do servidor quanto da interface do usuário.

Estrutura do Projeto
index.html: A página principal que exibe as transações e fornece formulários para adicionar e editar transações.
script.js: O arquivo JavaScript que contém lógica para interagir com o servidor e manipular a interface do usuário.
styles.css: O arquivo de estilo que define a aparência da aplicação.
db.json: Um arquivo usado pelo json-server para armazenar dados simulados do servidor.

