let lista = [];

function adicionarItem(nome, quantidade) {
  lista.push({
    nome,
    quantidade,
  });

  atualizarTela();
}

function atualizarTela() {
  const section = document.getElementById("lista");

  section.innerHTML = "";

  if (lista.length === 0) {
    section.innerHTML = `
      <div id="empty">
        <h2>Nenhum item na lista ainda</h2>
        <p>Toque em adicionar item</p>
      </div>
    `;
  } else {
    lista.forEach((item) => {
      section.innerHTML += `
        <div class="item">
          <span>${item.nome}</span>
          <small>${item.quantidade}</small>
        </div>
      `;
    });
  }

  atualizarContador();
}

function atualizarContador() {
  document.getElementById("contador").innerText =
    `${lista.length} ${lista.length === 1 ? "item" : "itens"}`;
}

const modalAdicionar = document.getElementById("modalAdicionar");

document.getElementById("btnAdicionar").addEventListener("click", () => {
  modalAdicionar.classList.remove("hidden");
});

document.getElementById("salvarItem").addEventListener("click", () => {
  const nome = document.getElementById("nomeItem").value.trim();
  const quantidade = document.getElementById("quantidade").value.trim();

  if (nome === "") {
    alert("Digite o nome do produto.");
    return;
  }

  adicionarItem(nome, quantidade);

  // limpa os campos
  document.getElementById("nomeItem").value = "";
  document.getElementById("quantidade").value = "";

  modalAdicionar.classList.add("hidden");
});

const modalEditar = document.getElementById("modalEditar");

document.getElementById("btnEditar").addEventListener("click", () => {
  abrirEdicao();
  modalEditar.classList.remove("hidden");
});

document.getElementById("fecharEditar").addEventListener("click", () => {
  modalEditar.classList.add("hidden");
});

function abrirEdicao() {
  const editar = document.getElementById("listaEditar");

  editar.innerHTML = "";

  if (lista.length === 0) {
    editar.innerHTML = "<p>Nenhum item para editar.</p>";
    return;
  }

  lista.forEach((item, index) => {
    editar.innerHTML += `
      <div class="editItem">

        <input
          type="text"
          value="${item.nome}"
          onchange="editarNome(${index}, this.value)">

        <input
          type="text"
          value="${item.quantidade}"
          onchange="editarQuantidade(${index}, this.value)">

        <button
          class="btnExcluir"
          onclick="removerItem(${index})">
          🗑
        </button>

      </div>
    `;
  });
}

function editarNome(index, novoNome) {
  lista[index].nome = novoNome;
  atualizarTela();
}

function editarQuantidade(index, novaQuantidade) {
  lista[index].quantidade = novaQuantidade;
  atualizarTela();
}

function removerItem(index) {
  lista.splice(index, 1);

  abrirEdicao();
  atualizarTela();
}
