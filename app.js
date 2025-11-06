const API = "http://localhost:3000/leituras";
const API_USER = "http://localhost:3000/usuarios/1"; // rota para pegar dados do usuário

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#formLeitura");
  const lista = document.querySelector("#listaLeituras");
  const generoSelect = document.querySelector(".filtro-card select:nth-of-type(1)");
  const notaSelect = document.querySelector(".filtro-card select:nth-of-type(2)");
  const aplicarBtn = document.querySelector(".filtro-card button");

  const livrosLidos = document.querySelector("#livrosLidos"); // elemento do painel
  const mediaNotas = document.querySelector("#mediaNotas");   // elemento do painel
  const nomeUsuario = document.querySelector("#nomeUsuario"); // nome no card

  // =============================
  // 1️⃣ Carregar leituras
  // =============================
  async function carregarLeituras(filtros = {}) {
    try {
      const params = new URLSearchParams(filtros).toString();
      const res = await fetch(`${API}?${params}`);
      const leituras = await res.json();

      lista.innerHTML = "";
      if (!leituras.length) {
        lista.innerHTML = "<p class='text-muted'>Nenhuma leitura encontrada.</p>";
        return;
      }

      leituras.forEach((l) => {
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";
        card.innerHTML = `
          <div class="card p-3 shadow-sm h-100">
            <h5 class="fw-bold">${l.titulo}</h5>
            <p class="small text-muted">${l.autor || "Autor desconhecido"} — ${l.genero || "Sem gênero"}</p>
            <p class="mb-1"><strong>Páginas:</strong> ${l.paginas || "-"} | <strong>Tempo:</strong> ${l.tempo_leitura || "-"}h</p>
            <p class="mb-1"><strong>Nota:</strong> ⭐ ${l.nota}</p>
            <p class="small text-secondary">${l.resenha || "Sem resenha"}</p>
            <p class="text-end small text-muted">${new Date(l.data_registro).toLocaleDateString("pt-BR")}</p>
          </div>
        `;
        lista.appendChild(card);
      });
    } catch (err) {
      console.error("Erro ao carregar leituras:", err);
      lista.innerHTML = "<p class='text-danger'>Erro ao carregar leituras.</p>";
    }
  }

  async function carregarUsuario() {
    try {
      const res = await fetch(API_USER);
      const user = await res.json();

      nomeUsuario.textContent = user.nome;
      livrosLidos.textContent = user.livros_lidos;
      mediaNotas.textContent = user.media_notas.toFixed(1);
    } catch (err) {
      console.error("Erro ao carregar usuário:", err);
    }
  }
 
  aplicarBtn.addEventListener("click", () => {
    const filtros = {
      genero: generoSelect.value,
      nota: notaSelect.value,
    };
    carregarLeituras(filtros);
  });


  carregarUsuario();
  carregarLeituras();
});
