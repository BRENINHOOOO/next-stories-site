// Next Stories — configuração e funções dos botões
// Suporte oficial via Discord
const CONFIG = {
  nome: "Next Stories",
  linkTicket: "https://discord.com/channels/1561336092274204732/1561336095185174662"
};

// Planos de exemplo — ajuste nomes e preços conforme sua loja.
const PLANOS = {
  basic: { nome: "Basic", preco: "R$ 19,90" },
  profissional: { nome: "Professional", preco: "R$ 39,90" },
  premium: { nome: "Premium", preco: "R$ 69,90" }
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-nome-loja]").forEach((el) => {
    el.textContent = CONFIG.nome;
  });

  // Botões de compra/suporte sem destino próprio vão para o Discord.
  document.querySelectorAll("[data-ticket], .btn-ticket, .btn-comprar").forEach((botao) => {
    botao.addEventListener("click", (event) => {
      const href = botao.getAttribute("href");
      if (botao.tagName === "A" && href && href !== "#" && href !== "") return;

      event.preventDefault();
      window.open(CONFIG.linkTicket, "_blank", "noopener,noreferrer");
    });
  });

  // Preenche o plano quando ticket.html recebe ?plano=basic etc.
  const params = new URLSearchParams(window.location.search);
  const selected = params.get("plano");
  if (selected && PLANOS[selected]) {
    const plano = PLANOS[selected];
    const nomeEl = document.querySelector("[data-plano-nome]");
    const precoEl = document.querySelector("[data-plano-preco]");
    if (nomeEl) nomeEl.textContent = plano.nome;
    if (precoEl) precoEl.textContent = plano.preco;
  }

  // Links com o atributo data-discord apontam para o suporte.
  document.querySelectorAll("[data-discord]").forEach((link) => {
    link.setAttribute("href", CONFIG.linkTicket);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
});
