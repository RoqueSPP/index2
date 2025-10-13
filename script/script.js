 <script>
    const cep = document.querySelector("#postalCode");
    const logradouro = document.querySelector("#address");
    const bairro = document.querySelector("#neighborhood");
    const cidade = document.querySelector("#city");
    const uf = document.querySelector("#state");
    const mensagem = document.querySelector("#mensagem");

    // Máscara do CEP: 00000-000
    cep.addEventListener("input", () => {
      let v = cep.value.replace(/\D/g, "").slice(0, 8);
      if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5);
      cep.value = v;

      // Quando o usuário termina de digitar (8 dígitos), busca automaticamente
      if (v.length === 9) {
        buscarCEP(v.replace("-", ""));
      }
    });

    function buscarCEP(cepNumerico) {
      mensagem.textContent = "";
      fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`)
        .then(resp => {
          if (!resp.ok) throw new Error("Erro ao consultar o CEP");
          return resp.json();
        })
        .then(data => {
          if (data.erro) {
            limparCampos();
            mensagem.textContent = "CEP não encontrado.";
          } else {
            logradouro.value = data.logradouro || "";
            bairro.value = data.bairro || "";
            cidade.value = data.localidade || "";
            uf.value = data.uf || "";
          }
        })
        .catch(() => {
          limparCampos();
          mensagem.textContent = "Erro ao buscar o CEP.";
        });
    }

    function limparCampos() {
      logradouro.value = "";
      bairro.value = "";
      cidade.value = "";
      uf.value = "";
    }
  </script>
