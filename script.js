"use strict";

// CONFIGURE aqui o nome da loja e o link verdadeiro de atendimento.
const CONFIG = {
  nome: "Next Stories",
  // WhatsApp: https://wa.me/55DDDNUMERO
  // Discord: https://discord.com/channels/ID_DO_SERVIDOR/ID_DO_CANAL
  linkTicket: "https://wa.me/5500000000000"
};

// Altere os preços e as descrições para refletir seus serviços reais.
const PLANOS = {
  basico: {
    nome: "Básico",
    preco: 19.90,
    descricao: "Plano para começar seu projeto."
  },
  profissional: {
    nome: "Profissional",
    preco: 39.90,
    descricao: "Plano para projetos em crescimento."
  },
  premium: {
    nome: "Premium",
    preco: 69.90,
    descricao: "Plano com recursos mais completos."
  }
};

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function configurarLinkAtendimento(plano) {
  const botao = document.getElementById("open-ticket");
  if (!botao) return;

  let destino;
  try {
    destino = new URL(CONFIG.linkTicket);
  } catch (erro) {
    botao.href = "index.html#contato";
    return;
  }

  if (destino.hostname === "wa.me") {
    const mensagem =
      `Olá! Quero contratar o plano ${plano.nome} da ${CONFIG.nome}, ` +
      `no valor de ${formatarPreco(plano.preco)} por mês. ` +
      "Gostaria de finalizar minha compra.";
    destino.searchParams.set("text", mensagem);
  }

  botao.href = destino.toString();
}

function inicializarPaginaTicket() {
  const params = new URLSearchParams(window.location.search);
  const chavePlano = params.get("plano");
  const plano = chavePlano ? PLANOS[chavePlano] : null;

  const nomeElemento = document.getElementById("ticket-plan");
  const precoElemento = document.getElementById("ticket-price");
  const descricaoElemento = document.getElementById("ticket-description");
  const botao = document.getElementById("open-ticket");

  if (!nomeElemento || !precoElemento) return;

  if (!plano) {
    nomeElemento.textContent = "Nenhum plano selecionado";
    precoElemento.textContent = "Consulte";
    descricaoElemento.textContent =
      "Volte à loja e selecione um dos planos disponíveis.";

    if (botao) {
      botao.textContent = "Escolher um plano";
      botao.href = "index.html#planos";
      botao.removeAttribute("target");
    }
    return;
  }

  nomeElemento.textContent = plano.nome;
  precoElemento.textContent = formatarPreco(plano.preco);
  descricaoElemento.textContent = plano.descricao;
  configurarLinkAtendimento(plano);
}

function atualizarAno() {
  const ano = new Date().getFullYear();
  ["current-year", "ticket-year"].forEach((id) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.textContent = ano;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.title = document.title.replace("Next Stories", CONFIG.nome);
  atualizarAno();
  inicializarPaginaTicket();
});
