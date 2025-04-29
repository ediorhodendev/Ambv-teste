________________________________________
🍺 Ambev Developer Evaluation - Frontend
Projeto desenvolvido por Edio Rhoden como parte da avaliação técnica, finalizado em 1 dia e meio.
Este frontend Angular consome a API Ambev Developer Evaluation, permitindo gerenciar produtos, clientes, filiais e vendas com todas as regras de negócio aplicadas.
________________________________________
🚀 Tecnologias Utilizadas
•	Angular 17
•	TypeScript
•	RxJS
•	Angular Material
•	SCSS
•	Arquitetura Standalone Components
________________________________________
🧠 Regras de Negócio (Aplicadas nas Telas de Venda)
•	Compras com 4 ou mais unidades do mesmo produto: 10% de desconto automático
•	Compras entre 10 e 20 unidades do mesmo produto: 20% de desconto
•	Máximo permitido: 20 unidades por produto
•	Compras com menos de 4 unidades: sem desconto
O total da venda é atualizado automaticamente conforme seleção de produtos, quantidade e aplicação dos descontos.
________________________________________
🗃️ Estrutura de Pastas
src/
├── app/
│   ├── core/          # Models e Services
│   ├── features/      # Customers, Branches, Products e Sales (CRUDs)
│   ├── app.routes.ts  # Rotas
│   ├── app.component  # Componente raiz
│   └── styles/        # Estilos globais
├── assets/            # Imagens (ex: logo da Ambev)
├── environments/      # Configurações de ambiente
________________________________________
🔧 Como Rodar o Projeto
1.	Clone o repositório:
2.	git clone https://github.com/ediorhodendev/ambvfront.git
3.	Navegue para a pasta do frontend:
4.	cd ambvfront
5.	Instale as dependências:
6.	npm install
7.	Rode o projeto localmente:
8.	npm start
9.	Acesse no navegador:
10.	http://localhost:4200
________________________________________
🌎 Integração com a API
•	O projeto já está configurado para consumir a API Ambev Developer Evaluation.
•	Certifique-se que a API esteja rodando em https://localhost:44312 (ou ajuste no arquivo environment.ts).
export const environment = {
  production: false,
  apiUrl: 'https://localhost:44312'
};
________________________________________
🖥️ Funcionalidades
Módulo	Função
Products	CRUD completo: listar, criar, editar e excluir produtos
Customers	CRUD completo: listar, criar, editar e excluir clientes
Branches	CRUD completo: listar, criar, editar e excluir filiais
Sales	Listagem e cadastro de vendas com regras de desconto aplicadas automaticamente
________________________________________
📷 Exemplo de Telas
📋 Cadastro de Venda
•	Selecione cliente, filial e múltiplos produtos
•	Informe quantidades
•	Total calculado automaticamente com descontos aplicados
📋 Listagem de Vendas
•	Tabela com vendas cadastradas
•	Botões de visualizar, editar e excluir
________________________________________
📝 Considerações Finais
•	Front-end construído utilizando práticas modernas do Angular 17.
•	Layout responsivo com Angular Material.
•	Totalmente integrado e testado contra a API.
•	Aplicação fiel das regras de negócio solicitadas no desafio.
________________________________________
Se quiser, posso também gerar um PDF bonito desse README para documentação oficial.
Quer que eu já te envie também o PDF? 🚀🎯
________________________________________

