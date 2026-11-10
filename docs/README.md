# Documentação técnica do Movie Search (frontend)

Esta pasta descreve o frontend do Movie Search em mais profundidade que o `README.md` da raiz. O frontend é um painel pessoal de filmes feito com React 18, TypeScript, Vite, Redux Toolkit e styled-components, e consome a API do repositório `movie-search-backend`.

Tudo o que está aqui foi escrito a partir da leitura do código no diretório de trabalho, incluindo alterações ainda não commitadas (a tela de séries, o `AddTitleDialog` e o `WatchedBadge`). O que não pôde ser confirmado pelo código está marcado como "não verificado".

## Índice

| Documento | Conteúdo |
|---|---|
| [arquitetura.md](arquitetura.md) | Estrutura de pastas, roteamento, store Redux, camada de API, tratamento de erro, tema, idioma, preferências e hooks compartilhados. Inclui os diagramas. |
| [telas.md](telas.md) | Cada rota: o que aparece, o que dá para fazer, componentes, estado, chamadas à API e os estados de carregamento, vazio e erro. |
| [componentes.md](componentes.md) | Componentes de `app/ui/` e de `app/dashboard/components/`, com props e locais de uso. |
| [api-consumida.md](api-consumida.md) | Todas as rotas do backend que o frontend chama, quem chama e o formato de resposta esperado. |
| [desenvolvimento.md](desenvolvimento.md) | Instalação, execução, build, lint, variáveis de ambiente e convenções do código. |

## Visão rápida

- O código da aplicação fica em `app/` e a infraestrutura (cliente HTTP, classe base dos services, store) fica em `lib/`. Não existe pasta `src/`.
- Existem nove rotas, todas filhas de `/dashboard`, definidas em `app/router.tsx`.
- Só parte das telas usa Redux. Favoritos, detalhe do favorito, resenha e formulário de resenha têm slices; séries, palavras-chave, lista de resenhas, "Escrever" e Belas Artes guardam o estado em hooks locais.
- Não há autenticação. A única preferência do usuário (idioma dos textos dos filmes) fica no `localStorage`.
- Não há testes automatizados no repositório.

## Convenções deste material

- Caminhos de rota do backend aparecem relativos a `VITE_BASE_URL` (por exemplo `POST favorites/search`).
- "Não verificado" significa que a afirmação depende de algo fora do código lido (comportamento em execução, serviços externos, navegador).
- Os pontos em que o código do frontend e o do backend não combinam estão reunidos no fim de [api-consumida.md](api-consumida.md).
