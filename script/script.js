(function () {
  const cep = document.querySelector("input[name=postalCode]");

  if (!cep) return; // evita erro se o campo não existir

  cep.addEventListener('blur', async () => {
    const value = cep.value.replace(/\D/g, ''); // mantém apenas números

    // CEP deve ter 8 dígitos
    if (value.length !== 8) {
      alert("CEP inválido. Digite um CEP com 8 números.");
      return;
    }

    const url = `https://viacep.com.br/ws/${value}/json/`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar CEP");

      const json = await response.json();

      if (json.erro) {
        alert("CEP não encontrado!");
        return;
      }

      document.querySelector('input[name=address]')?.setAttribute('value', json.logradouro || '');
      document.querySelector('input[name=neighborhood]')?.setAttribute('value', json.bairro || '');
      document.querySelector('input[name=city]')?.setAttribute('value', json.localidade || '');
      document.querySelector('input[name=state]')?.setAttribute('value', json.uf || '');

    } catch (err) {
      console.error("Erro ao consultar o CEP:", err);
      alert("Não foi possível consultar o CEP. Tente novamente mais tarde.");
    }
  });
})();
