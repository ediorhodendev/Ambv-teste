
# 🍺 Ambev Developer Evaluation API

Projeto desenvolvido por **Edio Rhoden** como parte de uma avaliação técnica, finalizado em **1 dia e meio**.  
Esta API simula um sistema de vendas da Ambev, com controle de produtos, clientes, filiais, vendas e regras de negócio associadas.

---

## 🚀 Tecnologias Utilizadas

- **.NET 8**
- **C#**
- **Entity Framework Core (InMemory)**
- **CQRS + MediatR**
- **AutoMapper**
- **FluentValidation**
- **Swagger**
- **Serilog**
- **Clean Architecture + DDD**

---

## 🧠 Regras de Negócio

- Compras com **mais de 4** unidades do mesmo produto: **10% de desconto**
- Compras entre **10 e 20** unidades do mesmo produto: **20% de desconto**
- **Máximo permitido**: 20 unidades por produto
- **Sem desconto** para quantidades inferiores a 4

---

## 🗃️ Estrutura de Pastas

```bash
src/
├── Ambev.DeveloperEvaluation.WebApi       # API
├── Ambev.DeveloperEvaluation.Application  # Commands, Queries, Handlers, DTOs
├── Ambev.DeveloperEvaluation.Domain       # Entidades e Interfaces
├── Ambev.DeveloperEvaluation.ORM          # DbContext (EF Core InMemory)
├── Ambev.DeveloperEvaluation.IoC          # Injeção de dependência
├── Ambev.DeveloperEvaluation.Infrastructure# Publicador de eventos
```

---

## 🔧 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/ediorhodendev/Ambev.git
   ```
2. Abra a solução no **Visual Studio** ou **VS Code**
3. Rode o projeto **Ambev.DeveloperEvaluation.WebApi** com perfil `IIS Express`
4. Acesse a documentação via [https://localhost:xxxx/swagger](https://localhost:xxxx/swagger)

🧠 **Importante**:  
Ao rodar o projeto, o banco de dados em memória será criado automaticamente com 30 registros de exemplo para cada entidade: `Product`, `Customer`, `Branch`, `Sale`.

---

## 📦 Endpoints Principais

| Recurso     | Método | Rota                        | Ação                            |
|-------------|--------|-----------------------------|---------------------------------|
| Produtos    | GET    | `/api/products/{id}`        | Obter produto por ID           |
|             | GET    | `/api/products`             | Listar todos os produtos       |
|             | POST   | `/api/products`             | Criar novo produto             |
|             | PUT    | `/api/products/{id}`        | Atualizar produto              |
|             | DELETE | `/api/products/{id}`        | Remover produto                |
| Clientes    | GET    | `/api/customers/{id}`       | Obter cliente por ID           |
|             | POST   | `/api/customers`            | Criar novo cliente             |
|             | PUT    | `/api/customers/{id}`       | Atualizar cliente              |
|             | DELETE | `/api/customers/{id}`       | Remover cliente                |
| Filiais     | GET    | `/api/branches/{id}`        | Obter filial por ID            |
|             | POST   | `/api/branches`             | Criar nova filial              |
|             | PUT    | `/api/branches/{id}`        | Atualizar filial               |
|             | DELETE | `/api/branches/{id}`        | Remover filial                 |
| Vendas      | GET    | `/api/sale/all`             | Listar todas as vendas         |
|             | GET    | `/api/sale/{id}`            | Obter venda por ID             |
|             | POST   | `/api/sale`                 | Criar nova venda               |
|             | PUT    | `/api/sale/{id}`            | Atualizar venda                |
|             | DELETE | `/api/sale/{id}`            | Excluir venda                  |

---

## 📢 Publicação de Eventos (Diferencial)

Eventos simulados e logados ao executar as operações:

- `SaleCreated`
- `SaleModified`
- `SaleCancelled`
- `ItemCancelled`

Estes eventos são registrados via `ILogger` para simular integração com mensagerias como Kafka, SQS ou RabbitMQ.

---

## 📝 Considerações Finais

- Projeto finalizado com arquitetura limpa, testável e escalável.
- Estrutura pronta para integrar autenticação, banco real (PostgreSQL), mensageria e testes automatizados.
- Cumprimento total das regras de negócio solicitadas com código moderno e limpo.

---

## 📷 Exemplo de Execução

![Execução com IIS Express](./docs/iis-express-execution.png)

---


