### Requisitos

  # Usuário
- [x] Deve ser possível criar um usuário
- [x] Deve ser possível editar um usuário
- [x] Deve ser possível listar um usuário pelo id
- [x] Deve ser possível retornar o Profile do usuário pelo id (dados exceto password)
- [x] Deve ser possível listar todos os usuários

  # Login
- [x] Deve ser possível fazer login, retornando o token JWT

  # Foto
- [x] Deve ser possível adicionar uma foto
- [x] Deve ser possível deletar uma foto

  # Família
- [x] Deve ser possível criar uma família
- [x] Deve ser possível editar uma família (título e descrição)
- [x] Deve ser possível listar todas as famílias
- [x] Deve ser possível listar uma família pelo id

  # Família-Usuário
- [x] Deve ser possível adicionar um usuário à uma família

  # Álbum
- [x] Deve ser possível criar um álbum em uma família
- [x] Deve ser possível editar um álbum (título e descrição)

  # Álbum-Foto
- [x] Deve ser possível adicionar uma foto a um álbum com descrição optativa
- [] Deve ser possível remover uma foto de um álbum

---

## Regras de negócio

  # Usuário
- [x] Não deve ser possível cadastrar um usuário com email já existente
- [x] Não deve ser possível retornar o password na response ao fazer: getProfile, createUser, editUser

  # Login
- [x] Não deve ser possível logar com email inexistente
- [x] Não deve ser possível logar com senha incorreta

  # Família-Usuário
- [x] Não deve ser possível adicionar um usuário à uma família se ele já faz parte dela.

  # Álbum-Foto
- [x] Não deve ser possível adicionar uma foto a um album se ela já faz parte dele.
- [x] Não deve ser possível adicionar uma foto a um album se o usuario nao faz parte dele.

---

## TO-DO

  # Rotas Autenticadas

  # Álbum-Foto
- [] Deve ser possível editar a descrição de uma foto em um álbum pelo usuário que postou
- [] Não deve ser possível editar a descrição de uma foto em um álbum por um usuário diferente do que postou.

