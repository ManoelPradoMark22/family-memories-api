- check if the ENABLE_CORS_URL_FRONTEND in .env matches the URL the frontend is running on
- npm i
- npm run dev
- im using sqlite, so, if some error occurs, you can delete the database.sqlite (in the root) and run this command again: npm run dev

- Fronted: https://github.com/ManoelPradoMark22/family-memories-frontend?tab=readme-ov-file


- Postman Collection: https://github.com/ManoelPradoMark22/family-memories-api/blob/master/Family-Memories.postman_collection.json

---

## Requirements

  # User
- [x] It must be possible to create a user

- [x] It must be possible to edit a user

- [x] It must be possible to retrieve a user by ID

- [x] It must be possible to retrieve the user's profile by ID (data except for the password)

- [x] It must be possible to list all users

  # Login
- [x] It must be possible to log in, returning the JWT token

  # Photo
- [x] It must be possible to add a photo

- [x] It must be possible to delete a photo

  # Family
- [x] It must be possible to create a family

- [x] It must be possible to edit a family (title and description)

- [x] It must be possible to list all families

- [x] It must be possible to retrieve a family by ID

  # Family-User
- [x] It must be possible to add a user to a family

  # Album
- [x] It must be possible to create an album within a family

- [x] It must be possible to edit an album (title and description)

  # Album-Photo
- [x] It must be possible to add a photo to an album with an optional description

- [x] It must be possible to remove a photo from an album

---

## Business Rules

  # User
- [x] It must not be possible to register a user with an existing email

- [x] It must not be possible to return the password in the response for: getProfile, createUser, editUser

  # Login
- [x] It must not be possible to log in with a non-existent email

- [x] It must not be possible to log in with an incorrect password

  # Family-User
- [x] It must not be possible to add a user to a family if they are already part of it

  # Album-Photo
- [x] It must not be possible to add a photo to an album if it is already part of it

- [x] It must not be possible to add a photo to an album if the user is not part of the family associated with the album

---

## TO-DO
- [] Authenticated Routes
- [] Add Likes and Comments in a photo with is posted in an album
- [] Show the TotalLikesCount by photo
  # Album-Photo
- [] It must be possible for a user to edit the description of a photo in an album they posted
- [] It must not be possible for a user to edit the description of a photo in an album posted by someone else.


---
---

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
- [x] Deve ser possível remover uma foto de um álbum

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

- [] Rotas Autenticadas
- [] Adicionar likes e comentários em uma foto que foi publicada em um álbum
- [] Mostrar o TotalLikesCount por foto

  # Álbum-Foto
- [] Deve ser possível editar a descrição de uma foto em um álbum pelo usuário que postou
- [] Não deve ser possível editar a descrição de uma foto em um álbum por um usuário diferente do que postou.

