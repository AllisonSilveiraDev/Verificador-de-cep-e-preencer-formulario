'use strict'

const limparFormulario = endereco => {
  document.getElementById('endereco').value = ' '
  document.getElementById('bairro').value = ' '
  document.getElementById('cidade').value = ' '
  document.getElementById('estado').value = ' '
}

const preencherFormulario = endereco => {
  document.getElementById('endereco').value = endereco.logradouro
  document.getElementById('bairro').value = endereco.bairro
  document.getElementById('cidade').value = endereco.localidade
  document.getElementById('estado').value = endereco.uf
}

const isNumber = number => /^[0-9]+$/.test(number)

const cepValido = cep => cep.length == 8 && isNumber(cep)

const pesquisarCep = async () => {
  limparFormulario()

  const cep = document.getElementById('cep').value
  const url = `http://viacep.com.br/ws/${cep}/json/`
  if (cepValido(cep)) {
    const promise = await fetch(url)
    const endereco = await promise.json()
    if (endereco.hasOwnProperty('erro')) {
      document.getElementById('endereco').value = ' ERRO : Cep não encontrado!'
      alert('ERRO : Cep não encontrado!')
    } else {
      preencherFormulario(endereco)
    }
  } else {
    document.getElementById('endereco').value = ' ERRO : Cep Incorreto!'
    alert('ERRO : Cep Incorreto!')
  }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep)
