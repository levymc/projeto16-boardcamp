import db from '../database/db.js'

// Função para cadastrar um novo usuário no banco de dados
export const signUp = async (req, res) => {
  try {
    // Obtenha os dados do usuário a partir do corpo da requisição
    const { name, email, password } = req.body;

    // Use a instância do pool de conexão para executar a consulta de inserção
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );

    // Envie a resposta com o novo usuário cadastrado
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Em caso de erro, envie uma resposta com o status de erro
    res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
};

// Função para realizar o login do usuário
export const signIn = async (req, res) => {
  try {
    // Obtenha os dados de login do usuário a partir do corpo da requisição
    const { email, password } = req.body;

    // Use a instância do pool de conexão para executar a consulta de busca do usuário
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    // Verifique se o usuário foi encontrado
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    // Verifique se a senha está correta
    const user = result.rows[0];
    if (user.password !== password) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Em caso de sucesso, envie a resposta com os dados do usuário
    res.status(200).json(user);
  } catch (error) {
    // Em caso de erro, envie uma resposta com o status de erro
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};
