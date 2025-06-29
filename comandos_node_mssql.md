
# 📘 Comandos do Node `mssql`

A biblioteca `mssql` do Node.js é utilizada para conectar e interagir com bancos de dados **SQL Server**.

---

## 📦 Instalação

```bash
npm install mssql
```

---

## 📌 Importação

```js
const sql = require('mssql');
```

---

## ⚙️ Configuração da Conexão

```js
const config = {
  user: 'seu_usuario',
  password: 'sua_senha',
  server: 'localhost',
  database: 'nome_do_banco',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};
```

---

## 🔌 Conectando ao Banco

```js
sql.connect(config).then(pool => {
  return pool.request().query('SELECT * FROM sua_tabela');
}).then(result => {
  console.dir(result.recordset);
}).catch(err => {
  console.error(err);
});
```

---

## 📚 Principais Comandos e Objetos

### 1. `sql.connect(config)`
Conecta ao banco.

### 2. `sql.close()`
Fecha a conexão.

### 3. `new sql.ConnectionPool(config)`
Cria uma instância da conexão.

### 4. `pool.request()`
Cria um novo request.

### 5. `request.query('SQL')`
Executa uma consulta SQL.

### 6. `request.input(nome, tipo, valor)`
Define parâmetros de entrada.

```js
request.input('id', sql.Int, 1);
```

### 7. `request.output(nome, tipo)`
Define parâmetros de saída.

### 8. `request.execute('nome_proc')`
Executa uma stored procedure.

### 9. `sql.Transaction()`
Cria uma transação:

```js
const transaction = new sql.Transaction(pool);
await transaction.begin();
const request = new sql.Request(transaction);
await request.query('INSERT...');
await transaction.commit();
```

### 10. `sql.Table()`
Usado para table-valued parameters.

```js
const table = new sql.Table();
table.columns.add('id', sql.Int);
table.rows.add(1);
request.input('meuTVP', table);
```

---

## 🧪 Tipos de Dados

| Tipo SQL Server     | Tipo Node           |
|---------------------|---------------------|
| INT                 | `sql.Int`           |
| VARCHAR(n)          | `sql.VarChar(n)`    |
| NVARCHAR(n)         | `sql.NVarChar(n)`   |
| BIT                 | `sql.Bit`           |
| FLOAT               | `sql.Float`         |
| DATETIME            | `sql.DateTime`      |
| DATE                | `sql.Date`          |
| TIME                | `sql.Time`          |
| TEXT                | `sql.Text`          |
| MONEY               | `sql.Money`         |
| UNIQUEIDENTIFIER    | `sql.UniqueIdentifier` |

---

## 📄 Exemplo Completo

```js
const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'senha123',
  server: 'localhost',
  database: 'MinhaBase',
  options: {
    trustServerCertificate: true
  }
};

async function buscarDados() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, 5)
      .query('SELECT * FROM Pessoas WHERE id = @id');

    console.log(result.recordset);
  } catch (err) {
    console.error('Erro:', err);
  } finally {
    await sql.close();
  }
}

buscarDados();
```

---

## 📂 Observação

Se desejar, posso converter este `.md` para PDF ou empacotar como um projeto completo com exemplos prontos.
