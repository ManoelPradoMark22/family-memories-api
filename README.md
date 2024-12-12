### Requisitos

  # Usuário
- [x] Deve ser possível criar um usuário
- [] Deve ser possível editar um usuário (nome e avatar)
- [x] Deve ser possível listar todos os usuários

  # Login
- [x] Deve ser possível fazer login, retornando o token JWT

  # Foto
- [] Deve ser possível adicionar uma foto
- [] Deve ser possível deletar uma foto

  # Família
- [] Deve ser possível criar uma família
- [] Deve ser possível editar uma família (título e descrição)
- [] Deve ser possível listar todas as famílias
- [] Deve ser possível listar uma família pelo id

  # Família-Usuário
- [] Deve ser possível adicionar um usuário à uma família

  # Álbum
- [] Deve ser possível criar um álbum em uma família
- [] Deve ser possível editar um álbum (título e descrição)

  # Álbum-Foto
- [] Deve ser possível adicionar uma foto a um álbum com descrição optativa
- [] Deve ser possível editar a descrição de uma foto em um álbum pelo usuário que postou
- [] Deve ser possível remover uma foto de um álbum

- [] Deve ser possível


---

## Regras de negócio

  # Usuário
- [x] Não deve ser possível cadastrar um usuário com email já existente

  # Login
- [x] Não deve ser possível logar com email inexistente
- [x] Não deve ser possível logar com senha incorreta

  # Família-Usuário
- [] Não deve ser possível adicionar um usuário à uma família se ele já faz parte dela.

  # Álbum-Foto
- [] Não deve ser possível adicionar uma foto a um album se ela já faz parte dele.
- [] Não deve ser possível editar a descrição de uma foto em um álbum por um usuário diferente do que postou.


- [] Não deve ser possível

