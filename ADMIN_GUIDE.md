# Guia do Painel Administrativo

## 🔐 Acesso ao Painel Admin

O painel administrativo está protegido por senha e pode ser acessado através do botão **"Admin"** na barra de navegação (canto superior direito).


## 📋 Funcionalidades do Painel

### 1. Gerenciamento de Projetos

O painel permite adicionar, editar e deletar projetos de forma intuitiva.

#### Adicionar Novo Projeto
1. Clique no botão **"Novo Projeto"**
2. Preencha os campos obrigatórios:
   - **Título**: Nome do projeto
   - **Descrição**: Descrição curta (exibida no card)
   - **Descrição Completa**: Descrição detalhada (exibida no modal)
   - **URL do GitHub**: Link para o repositório
   - **Categoria**: Selecione entre Frontend, Backend, Full-Stack, Data ou Game Development
   - **Tecnologias**: Separadas por vírgula (ex: Python, Django, PostgreSQL)

3. Campos opcionais:
   - **URL da Demo**: Link para versão ao vivo do projeto
   - **Funcionalidades**: Descrição das features principais

4. Clique em **"Salvar"** para adicionar o projeto

#### Editar Projeto Existente
1. Localize o projeto na lista
2. Clique no ícone de **edição** (lápis)
3. Modifique os campos desejados
4. Clique em **"Salvar"**

#### Deletar Projeto
1. Localize o projeto na lista
2. Clique no ícone de **lixeira**
3. Confirme a exclusão quando solicitado

### 2. Gerenciamento de Habilidades

Funcionalidade em desenvolvimento. Em breve será possível adicionar, editar e deletar habilidades personalizadas.

### 3. Gerenciamento de Ferramentas

Funcionalidade em desenvolvimento. Em breve será possível adicionar, editar e deletar ferramentas personalizadas.

## 💾 Armazenamento de Dados

Todos os dados são salvos automaticamente no **localStorage** do navegador. Isso significa que:

- ✅ Os dados persistem entre sessões
- ✅ Não há necessidade de servidor backend
- ✅ Os dados são armazenados localmente no seu navegador

**Importante**: Se você limpar o cache/histórico do navegador, os dados podem ser perdidos. Faça backup regularmente!

## 🔄 Sincronização com GitHub

Os projetos adicionados no painel admin são exibidos imediatamente no portfólio. Para sincronizar com GitHub:

1. Faça as alterações desejadas no painel admin
2. Os dados são salvos no localStorage
3. Para fazer deploy no GitHub Pages:
   ```bash
   npm run build
   npm run deploy
   ```

## 🎨 Estrutura de Dados dos Projetos

Cada projeto contém os seguintes campos:

```javascript
{
  title: "Nome do Projeto",
  description: "Descrição curta",
  fullDescription: "Descrição completa para o modal",
  tech: ["Tech1", "Tech2", "Tech3"],
  category: "Frontend|Backend|Full-Stack|Data|Game Development",
  github: "https://github.com/usuario/repo",
  demo: "https://demo-url.com", // opcional
  features: ["Feature 1", "Feature 2"], // opcional
  updated: "Mês Ano"
}
```

## 🚀 Dicas de Uso

1. **Mantenha as descrições concisas**: A descrição curta aparece no card do projeto
2. **Use categorias consistentes**: Isso ajuda na filtragem de projetos
3. **Adicione múltiplas tecnologias**: Separe por vírgula para melhor visualização
4. **Atualize a data**: Use o formato "Mês Ano" (ex: "Fev 2026")
5. **Teste no modal**: Clique no projeto para visualizar como ficará no modal

## 🔒 Segurança

- A senha é verificada apenas no lado do cliente
- Para maior segurança em produção, considere implementar autenticação no backend
- Não compartilhe a senha do admin com pessoas não autorizadas

## 📱 Responsividade

O painel admin é totalmente responsivo e funciona em:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## ❓ Troubleshooting

### Os dados não estão sendo salvos
- Verifique se o localStorage está habilitado no navegador
- Tente limpar o cache e recarregar a página

### Não consigo acessar o painel
- Verifique se a senha está correta (admin123)
- Tente recarregar a página

### Os projetos não aparecem no portfólio
- Recarregue a página
- Verifique se os dados foram salvos no painel admin

## 📧 Suporte

Para dúvidas ou sugestões sobre o painel admin, entre em contato através do formulário de contato no portfólio.
