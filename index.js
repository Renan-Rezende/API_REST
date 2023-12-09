// Função para criar um contêiner para uma transação com um determinado ID
function createTransactionContainer(id) {
  const container = document.createElement('div')
  container.classList.add('transaction')
  container.id = `transaction-${id}`
  return container
}

// Função para criar um elemento de título para uma transação com um nome específico
function createTransactionTitle(name) {
  const title = document.createElement('span')
  title.classList.add('transaction-title')
  title.textContent = name
  return title
}

// Função para criar um elemento de valor para uma transação com um valor específico
function createTransactionAmount(amount) {
  const span = document.createElement('span')
  span.classList.add('transaction-amount')
  // Formatando o valor usando a localidade brasileira
  const formatador = Intl.NumberFormat('pt-BR', {
    compactDisplay: 'long',
    currency: 'BRL',
    style: 'currency',
  })
  const valorFormatado = formatador.format(amount)
  // Exibindo o valor com 'C' para crédito e 'D' para débito
  if (amount > 0) {
    span.textContent = `${valorFormatado} C`
    span.classList.add('credit')
  } else {
    span.textContent = `${valorFormatado} D`
    span.classList.add('debit')
  }
  return span
}

// Função para renderizar uma transação criando seu contêiner, título e valor
function renderTransaction(transaction) {
  const container = createTransactionContainer(transaction.id)
  const title = createTransactionTitle(transaction.name)
  const amount = createTransactionAmount(transaction.amount)

  // Adicionando o contêiner ao elemento 'transactions' e adicionando título e valor ao contêiner
  document.querySelector('#transactions').append(container)
  container.append(title, amount)
}

// Função para buscar transações de um servidor (assumido como sendo executado localmente)
async function fetchTransactions() {
  return await fetch('http://localhost:3000/transactions').then(res => res.json())
}

// Array para armazenar as transações obtidas
let transactions = []

// Função para atualizar e exibir o saldo com base nas transações armazenadas
function updateBalance() {
  const balanceSpan = document.querySelector('#balance')
  // Calculando o saldo somando todos os valores das transações
  const saldo = transactions.reduce((soma, transaction) => soma + transaction.amount, 0)
  // Formatando o saldo usando a localidade brasileira
  const formatador = Intl.NumberFormat('pt-BR', {
    compactDisplay: 'long',
    currency: 'BRL',
    style: 'currency'
  })
  balanceSpan.textContent = formatador.format(saldo)
}

// Função de inicialização para buscar transações, renderizá-las e atualizar o saldo
async function setup() {
  const resultados = await fetchTransactions()
  transactions.push(...resultados)
  transactions.forEach(renderTransaction)
  updateBalance()
}

// Ouvinte de evento para o evento DOMContentLoaded para acionar a função de inicialização
document.addEventListener('DOMContentLoaded', setup)

// Ouvinte de evento para o envio do formulário para salvar uma nova transação
document.querySelector('form').addEventListener('submit', saveTransaction)

// Função para criar um botão 'Editar' para uma determinada transação
function createEditTransactionBtn(transaction) {
  const editBtn = document.createElement('button')
  editBtn.classList.add('edit-btn')
  editBtn.textContent = 'Editar'
  // Ouvinte de evento para popular o formulário com detalhes da transação para edição
  editBtn.addEventListener('click', () => {
    document.querySelector('#id').value = transaction.id
    document.querySelector('#name').value = transaction.name
    document.querySelector('#amount').value = transaction.amount
  })
  return editBtn
}

// Função para salvar uma transação (nova ou atualizada) no servidor
async function saveTransaction(ev) {
  ev.preventDefault()

  const id = document.querySelector('#id').value
  const name = document.querySelector('#name').value
  const amount = parseFloat(document.querySelector('#amount').value)

  if (id) {
    // Se o ID existe, é uma operação de atualização (PUT)
    const resposta = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, amount }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const transaction = await resposta.json()
    // Substitui a transação existente no array e atualiza a interface do usuário (UI)
    const indiceRemover = transactions.findIndex((t) => t.id === id)
    transactions.splice(indiceRemover, 1, transaction)
    document.querySelector(`#transaction-${id}`).remove()
    renderTransaction(transaction)
  } else {
    // Se o ID não existe, é uma operação nova (POST)
    const resposta = await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      body: JSON.stringify({ name, amount }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const transaction = await resposta.json()
    // Adiciona a nova transação ao array e atualiza a interface do usuário (UI)
    transactions.push(transaction)
    renderTransaction(transaction)
  }

  // Reinicia o formulário e atualiza o saldo
  ev.target.reset()
  updateBalance()
}

// Função para criar um botão 'Excluir' para um determinado ID de transação
function createDeleteTransactionButton(id) {
  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('delete-btn')
  deleteBtn.textContent = 'Excluir'
  // Ouvinte de evento para excluir a transação do servidor e atualizar a interface do usuário (UI)
  deleteBtn.addEventListener('click', async () => {
    await fetch(`http://localhost:3000/transactions/${id}`, { method: 'DELETE' })
    deleteBtn.parentElement.remove()
    const indiceRemover = transactions.findIndex((t) => t.id === id)
    transactions.splice(indiceRemover, 1)
    updateBalance()
  })
  return deleteBtn
}


