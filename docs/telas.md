# Telas

Cada seção descreve uma rota de `app/router.tsx`: o que a pessoa vê, o que consegue fazer, os componentes envolvidos, o estado usado e as chamadas à API. Os caminhos das chamadas são relativos a `VITE_BASE_URL`.

Todas as telas são renderizadas dentro de `DashboardLayout`, que mostra a barra de navegação e o seletor de idioma EN/PT.

| Rota | Tela | Arquivo |
|---|---|---|
| `/dashboard/favorites` | [Favoritos](#favoritos) | `app/dashboard/favorites/page.tsx` |
| `/dashboard/favorites/:tconst` | [Detalhe do favorito](#detalhe-do-favorito) | `app/dashboard/favorites/[tconst]/page.tsx` |
| `/dashboard/series` | [Séries](#séries) | `app/dashboard/series/page.tsx` |
| `/dashboard/keywords` | [Palavras-chave](#palavras-chave) | `app/dashboard/keywords/page.tsx` |
| `/dashboard/write` | [Escrever resenha](#escrever-resenha) | `app/dashboard/write/page.tsx` |
| `/dashboard/write-review` | [Formulário de resenha](#formulário-de-resenha) | `app/dashboard/write-review/page.tsx` |
| `/dashboard/read` | [Resenhas](#resenhas) | `app/dashboard/read/page.tsx` |
| `/dashboard/reviews/:tconst` | [Resenha de um filme](#resenha-de-um-filme) | `app/dashboard/reviews/[tconst]/page.tsx` |
| `/dashboard/belas-artes` | [Belas Artes](#belas-artes) | `app/dashboard/belas-artes/page.tsx` |

---

## Favoritos

Rota `/dashboard/favorites`. É a tela inicial: `/` redireciona para ela. Na barra de navegação aparece como "Minha coleção"; o título da página é "Favoritos".

### O que a pessoa vê e faz

- Cabeçalho com o título, a contagem "N filmes na coleção" (o valor de `total_documents` da última busca, portanto já com os filtros aplicados) e o botão "Adicionar na coleção".
- Barra de filtros: campo de busca por texto, select de país, intervalo de anos com dois controles deslizantes e select de status (assistidos ou não assistidos).
- Tabela paginada com as colunas Pôster, Título, Ano, Assistido e Ações.
- Clicar no título abre o detalhe do favorito.
- Clicar no selo da coluna "Assistido" alterna o status do filme.
- Na coluna "Ações" há o botão de excluir o favorito. Quando o filme tem resenha (`hasReview`), aparecem também "Ler resenha" (vai para `/dashboard/reviews/:tconst`) e "Excluir resenha".
- As duas exclusões pedem confirmação em um `ConfirmDialog`.
- Clicar no cabeçalho das colunas Título, Ano e Assistido ordena as linhas da página atual. A ordenação é local; não é enviada ao backend.

### Componentes

`PageHeader`, `AddFavorite` (que usa `AddTitleDialog` e `LoadingModal`), `Search` (que usa `Select` e `YearRange`), `ConfirmDialog`, `Table` com `buildColumns` (`columns.tsx`), `WatchedTag` (que usa `WatchedBadge`) e `IconButton`.

### Estado

| Origem | Campos usados |
|---|---|
| `state.favorites` | `entries`, `total_documents`, `countries`, `startYears`, `status`, `addStatus`, `error` |
| `state.favoriteDetails` | `deleteStatus` |
| Estado local da página | `search` (termo e filtros), `page` (começa em 1), `pageSize` (começa em 10), `pending` (remoção aguardando confirmação), `isActionLoading` |

As opções do select de país vêm de `countries`, e os limites do intervalo de anos vêm do menor e do maior valor de `startYears`. Os dois chegam na resposta da própria busca.

### Chamadas à API

| Quando | Chamada | Observações |
|---|---|---|
| Ao montar, ao mudar de página ou de tamanho de página | `POST favorites/search` | Corpo `{ filters, page, page_size, search_term }`. Usa `cancelPrevious`. |
| 500 ms depois da última mudança no termo ou nos filtros | `POST favorites/search` | Disparada por `useDebouncedEffect`. A página volta para 1. |
| Logo após cada busca | `POST write-review/search` | Corpo `{ filters: { tconst: { $in: [...] } } }`. Serve para marcar `hasReview`. Se falhar, nenhum filme é marcado e a busca continua valendo. |
| Confirmar "Adicionar na coleção" | `POST favorites/:tconst` | Sem corpo. Em seguida a lista é recarregada. |
| Clicar no selo "Assistido" | `PUT favorites/:tconst` | Corpo `{ tconst, watched }`. Em seguida a lista é recarregada. |
| Confirmar exclusão do favorito | `DELETE favorites/:tconst` | Em seguida a lista é recarregada. |
| Confirmar exclusão da resenha | `DELETE write-review/:tconst` | Chamada direto pela página, fora do Redux. |

Os filtros são convertidos por `toMongoFilters`: `startYearFrom` e `startYearTo` viram `startYear: { $gte, $lte }`, e `country` e `watched` seguem como estão. Um limite de ano igual ao mínimo ou ao máximo disponível não é enviado.

### Carregamento, vazio e erro

- **Carregamento.** Na primeira carga e a cada nova busca, a tabela mostra 10 linhas de esqueleto. Quando a recarga foi causada por uma ação de linha (alternar "assistido" ou excluir), a tabela mostra um spinner no lugar do esqueleto. Enquanto o filme é adicionado, um `LoadingModal` cobre a tela com "Adicionando filme na coleção...".
- **Vazio.** Não há mensagem de lista vazia. A tabela aparece só com o cabeçalho e o rodapé mostra "0 a 0 de 0".
- **Erro na busca.** Não há mensagem. Se `fetchFavorites` falhar, `status` vira `'failed'` e a tabela continua mostrando as linhas da busca anterior.
- **Erro ao adicionar.** Toast de erro com a mensagem do backend, ou "Este filme já está na coleção." em caso de 409. O diálogo permanece aberto.
- **Erro ao excluir favorito.** Toast "Não foi possível remover o filme dos favoritos.".
- **Erro ao excluir resenha.** Um 404 mostra o toast informativo "Nenhuma resenha encontrada para excluir."; outros erros mostram "Erro ao excluir resenha.".
- **Erro ao alternar "assistido".** Toast "Não foi possível atualizar o status.".

---

## Detalhe do favorito

Rota `/dashboard/favorites/:tconst`. Não está na barra de navegação; chega-se a ela pelo título do filme na tela de favoritos.

### O que a pessoa vê e faz

- Botão "Voltar", que leva a `/dashboard/favorites`.
- Cartão principal (`MovieInfoCard`):
  - Quando o filme tem `backdrop_url`, o título, o título brasileiro (`title_pt`, se for diferente do original), a linha "ano · país · diretor" e o botão "Editar" ficam sobre a imagem. Sem `backdrop_url`, ficam no cabeçalho e no topo do corpo do cartão.
  - O `tconst` ao lado do título é um link para o IMDb (`imdb_url`, ou a URL montada por `imdbTitleUrl`).
  - Pôster, diretor, roteiristas, elenco, gêneros, sinopse e trivia. A trivia é dividida em itens a cada linha em branco.
  - O nome do diretor é uma etiqueta clicável: clicar salva o nome como palavra-chave favorita, e clicar de novo remove.
  - Rodapé com o magnet link (quando existe), o botão "Baixar Legendas" (quando existe `subtitle_url`) e o botão "Baixar Filme", que abre uma busca externa pelo título em outra aba.
- Cartão "Links", com a página wiki e a lista numerada de referências. Só aparece quando há pelo menos um dos dois.
- Cartão "Citações", quando há `quote`. O texto no formato `Personagem: fala` é quebrado em linhas por `formatQuote`; se o padrão não casar, o texto aparece inteiro em itálico.
- Cartão "Palavras-chave", com as `plot_keywords` como etiquetas. Clicar em uma etiqueta a salva como favorita (fica rosa, com um coração); clicar em uma já favoritada a remove.
- Player do Spotify incorporado, quando `soundtrack` tem uma URL de onde se consegue extrair tipo e identificador.
- Cartão "Imagens": grade com as imagens principais, botão para enviar outra, botão de lixeira em cada uma e ampliação em um diálogo ao clicar na imagem.
- O botão "Editar" abre o `EditInfoModal`, com os campos trilha sonora (URL do Spotify), wiki, magnet link e a lista de referências (adicionar, alterar e remover linhas).
- O seletor EN/PT da barra de navegação troca o idioma da sinopse, da trivia, das citações, dos gêneros e das palavras-chave.

### Componentes

`GoBack`, `MovieInfoCard`, `EditInfoModal`, `Card`, `ExternalLink`, `TagList`, `MediaCard`, `MainImageUpload`, `MainImageModal`, `LoadingSpinner`, `Button`, `IconButton` e `Dialog`.

### Estado

| Origem | Campos usados |
|---|---|
| `state.favoriteDetails` | `data`, `fetchStatus`, `translateStatus`, `error` |
| `state.mainImages` | `images`, `status` |
| `useKeywords()` (estado local) | `keywords`, `load`, `add`, `remove` |
| `useLanguage()` | `language`, `changeLanguage` |
| Estado local da página | `isOpen` (modal de edição), `selectedMainImage` |

Ao sair da tela, o efeito de limpeza despacha `resetState()` de `favoriteDetails`. O slice `mainImages` não é limpo.

### Chamadas à API

| Quando | Chamada | Observações |
|---|---|---|
| Ao montar e a cada troca de idioma | `GET favorites/:tconst?lang=en\|pt` | Thunk `fetchDetails`. |
| Depois de carregar em `pt`, se a resposta veio com `lang` diferente de `pt` | `POST favorites/:tconst/translate` | Thunk `translateDetails`. Substitui `data` pela versão traduzida. |
| Ao montar | `GET main-images/:tconst` | Thunk `fetchMainImage`. |
| Ao montar | `GET keywords` | `useKeywords().load()`. |
| Salvar no modal de edição | `PUT favorites/:tconst` | Corpo `{ tconst, soundtrack, wiki, magnet_link, references }`. Referências vazias são descartadas antes do envio. |
| Clicar em uma etiqueta ainda não favoritada | `POST keywords` | Corpo `{ keyword }`. |
| Clicar em uma etiqueta favoritada | `DELETE keywords/:keyword` | |
| Escolher um arquivo em "Adicionar imagem" | `POST main-images/:tconst` e depois `GET main-images/:tconst` | Multipart, campo `file`. O seletor aceita `image/*`. |
| Clicar na lixeira de uma imagem | `DELETE main-images/:tconst/:filename` e depois `GET main-images/:tconst` | Não pede confirmação. |

Depois de um `editDetails` bem-sucedido, o reducer mantém na tela os textos em português que já estavam carregados (`genres`, `plot`, `plot_keywords`, `quote`, `trivia`), porque a resposta da edição vem em inglês.

### Carregamento, vazio e erro

- **Carregamento.** Enquanto `data` é nulo e `fetchStatus` é `'loading'`, a tela mostra só um `LoadingSpinner`. Na troca de idioma o conteúdo anterior continua visível até a nova resposta chegar. Durante a tradução não há indicador visual; o toast "Filme traduzido para o português." aparece ao final. O botão de envio de imagem mostra spinner enquanto `mainImages.status` é `'loading'`, o que inclui a leitura inicial e a exclusão.
- **Vazio.** Sem imagens, o cartão mostra "Nenhuma imagem adicionada.". Campos sem valor mostram "N/A". Os cartões "Links", "Citações" e "Palavras-chave" somem quando não têm conteúdo.
- **Erro ao carregar o filme.** Quando `data` é nulo e não está carregando, a tela mostra o texto "No data found.", em inglês, sem toast e sem o botão "Voltar". Isso vale tanto para filme inexistente quanto para falha de rede.
- **Erro na tradução.** Toast com a mensagem de erro e retorno do idioma global para `en`.
- **Erro na edição.** Toast "Não foi possível atualizar o filme."; o modal continua aberto.
- **Erro em palavras-chave.** Os toasts vêm de `useKeywords`: "Palavra-chave já existe." ou "Palavra-chave não permitida." em caso de 409, "Erro ao adicionar palavra-chave." e "Erro ao remover palavra-chave." nos demais.
- **Erro nas imagens.** Nenhum aviso. O erro fica em `state.mainImages.error`, que a tela não lê.

---

## Séries

Rota `/dashboard/series`. Tela ainda não commitada no repositório (pasta `app/dashboard/series/` não rastreada).

### O que a pessoa vê e faz

- Cabeçalho "Séries" com a descrição "N séries na lista" (ou um texto fixo quando a lista está vazia) e o botão "Adicionar série".
- Campo de busca por título.
- Tabela sem paginação com as colunas Pôster, Título, Anos, Temporadas, Nota IMDb, Assistida e Ações.
  - O título é um link para o IMDb em outra aba. Abaixo dele aparecem o título brasileiro (`title_pt`, quando diferente) e os gêneros.
  - "Anos" mostra `início–fim`, ou `início–` quando `endYear` é nulo (série ainda no ar).
  - "Temporadas" mostra `N (M ep.)`.
  - A nota é um link para o IMDb; sem nota, aparece "N/A".
  - O selo "Assistida / Não assistida" alterna o status.
  - A lixeira abre a confirmação de exclusão.
- As colunas Título, Anos, Temporadas, Nota IMDb e Assistida ordenam as linhas localmente.
- "Adicionar série" abre o `AddTitleDialog`, que pede o `tconst` da série.

Não existe tela de detalhe de série.

### Componentes

`PageHeader`, `Button`, `AddTitleDialog`, `ConfirmDialog`, `Table` com `buildColumns` (`series/columns.tsx`), `WatchedBadge` (com `feminine`) e `IconButton`.

### Estado

Tudo é local. `useSeries()` guarda `series` e `status` e expõe `load`, `add`, `remove` e `setWatched`. A página guarda `searchTerm`, `isAddOpen` e `pendingDelete`.

### Chamadas à API

| Quando | Chamada | Observações |
|---|---|---|
| Ao montar | `POST series/search` | Corpo `{ search_term: '' }`. |
| 500 ms depois da última tecla no campo de busca | `POST series/search` | Corpo `{ search_term }`. Usa `cancelPrevious`. |
| Confirmar "Adicionar série" | `POST series/:tconst` | Sem corpo. A série devolvida entra na lista local, ordenada por título. A lista não é recarregada. |
| Clicar no selo "Assistida" | `PUT series/:tconst` | Corpo `{ watched }`. A linha é atualizada localmente depois da resposta. |
| Confirmar exclusão | `DELETE series/:tconst` | A linha sai da lista local. |

### Carregamento, vazio e erro

- **Carregamento.** A tabela mostra as linhas de esqueleto enquanto `status` é `'loading'`. Os botões "Adicionar" e "Excluir" dos diálogos mostram spinner durante a chamada. O selo "Assistida" não mostra estado de espera.
- **Vazio.** Não há mensagem na tabela; aparece só o cabeçalho. A descrição da página troca para "Séries de TV que você acompanha, com os dados do IMDb.".
- **Erro ao carregar.** A tabela é substituída por "Não foi possível carregar as séries.". Uma busca cancelada por outra mais nova não conta como erro.
- **Erro ao adicionar.** Toast com a mensagem do backend (passada por `API_MESSAGE`) ou "Não foi possível adicionar a série.". O diálogo continua aberto.
- **Erro ao remover.** Toast "Não foi possível remover a série.".
- **Erro ao alternar o status.** Toast "Não foi possível atualizar o status.".

---

## Palavras-chave

Rota `/dashboard/keywords`. Na barra de navegação aparece como "Palavras-chave favoritadas"; o título da página é "Palavras-chave".

### O que a pessoa vê e faz

- Lista das palavras-chave favoritadas, como etiquetas. Clicar em uma etiqueta a seleciona ou tira da seleção (a selecionada ganha uma borda).
- Botão "Buscar filmes", ativo quando há pelo menos uma etiqueta selecionada, e botão "Limpar seleção".
- Lista "Filmes sugeridos", com um `SuggestedMovieCard` por filme: título original com link para o IMDb, ano, título localizado (quando diferente), gêneros, sinopse e o campo `relevance`.
- Em cada sugestão, uma estrela vazia adiciona o filme à coleção. Filmes que já estão na coleção mostram uma estrela cheia, sem botão.
- A lista de palavras-chave é recarregada em silêncio quando a aba volta a ficar em foco (eventos `focus` e `visibilitychange`), porque as palavras-chave são favoritadas na tela de detalhe do filme.

Nesta tela não é possível adicionar nem remover palavras-chave; isso é feito no detalhe do favorito.

### Componentes

`PageHeader`, `LoadingSpinner`, `TagList` (com `selected`), `Row`, `Button`, `SuggestedMovieCard`, `IconButton` e `ExternalLink`.

### Estado

Tudo é local. `useKeywords()` guarda `keywords` e `status`. A página guarda `selectedKeywords`, `suggestedMovies` (`null` antes da primeira busca), `collectedTconsts` e `addingTconst`.

### Chamadas à API

| Quando | Chamada | Observações |
|---|---|---|
| Ao montar | `GET keywords` | `load()`, com spinner. |
| Quando a aba volta ao foco | `GET keywords` | `refresh()`, sem alterar `status`. |
| Clicar em "Buscar filmes" | `POST keywords/suggest-movies` | Corpo `{ keywords: [...] }`. |
| Logo após receber sugestões | `POST favorites/search` | Corpo `{ filters: { tconst: { $in: [...] } }, page_size: 0 }`. Descobre quais sugestões já estão na coleção. Não é chamada quando não há sugestões. Se falhar, nenhuma é marcada. |
| Clicar na estrela vazia | `POST favorites/:tconst` | Sem corpo. Só uma adição por vez. |

### Carregamento, vazio e erro

- **Carregamento.** `LoadingSpinner` enquanto as palavras-chave carregam. O botão "Buscar filmes" mostra spinner durante a busca e a lista anterior de sugestões é apagada. A estrela do filme que está sendo adicionado mostra spinner.
- **Vazio.** Sem palavras-chave favoritadas, a área das etiquetas fica em branco, sem mensagem. Sem sugestões, aparece "Nenhum filme encontrado no IMDb para essas palavras-chave. Tente de novo ou mude a seleção.".
- **Erro ao carregar palavras-chave.** "Não foi possível carregar as palavras-chave.".
- **Erro na busca de sugestões.** Não há mensagem própria. A falha é tratada como lista vazia e mostra o mesmo texto de "Nenhum filme encontrado".
- **Erro ao adicionar à coleção.** Um 409 marca o filme como já coletado e mostra o toast informativo "Este filme já está na coleção."; outros erros mostram "Não foi possível adicionar o filme na coleção.".

---

## Escrever resenha

Rota `/dashboard/write`. É o primeiro passo para criar uma resenha.

### O que a pessoa vê e faz

Um campo de texto para o `tconst` (com exemplo `tt0084805`) e o botão "Escrever". A tecla Enter faz o mesmo que o botão. A tela verifica se já existe resenha para o filme, busca o título do filme e leva ao formulário em `/dashboard/write-review?tconst=...&primaryTitle=...`.

### Componentes

`PageHeader`, `Row` e `Button`.

### Estado

Local: `tconst` e o `loading` de `useAsyncAction`. Não usa Redux.

### Chamadas à API

| Quando | Chamada | Observações |
|---|---|---|
| Clicar em "Escrever" | `GET write-review/:tconst` | `WriteService.findReview`. Considera que há resenha quando `entries[0]` existe. Um 404 é convertido em `null` por `nullIfNotFound` e significa "ainda não há resenha". |
| Se não houver resenha | `GET favorites/:tconst` | `WriteService.getMovieTitle`. Uma falha aqui é tolerada: o título segue vazio. |

### Carregamento, vazio e erro

- **Carregamento.** O campo fica desabilitado e o botão mostra spinner.
- **Vazio.** O botão fica desabilitado enquanto o campo está vazio. O formato do `tconst` não é validado nesta tela; a validação acontece no formulário seguinte.
- **Resenha já existente.** Toast de aviso "Já existe uma resenha para este filme." e a navegação não acontece.
- **Filme sem resenha.** O 404 de `GET write-review/:tconst` não é erro: a tela busca o título e segue para o formulário.
- **Erro.** Qualquer outra falha em `GET write-review/:tconst` (rede, erro 5xx) mostra "Erro ao verificar resenhas." e a navegação não acontece.

---

## Formulário de resenha

Rota `/dashboard/write-review`. Não está na barra de navegação. Recebe `tconst` e `primaryTitle` pela query string.

### O que a pessoa vê e faz

- Botão "Voltar", que leva a `/dashboard/favorites`.
- Formulário com quatro campos obrigatórios: título do filme, `tconst`, resenha em português e resenha em inglês.
- Os campos de título e de `tconst` ficam desabilitados quando o valor veio da URL. Sem os parâmetros, os dois podem ser digitados.
- Botão "Enviar".

### Componentes

`PageHeader`, `GoBack`, `AuthoralReviewForm` (`write-review/Form`) e `Button`.

### Estado

| Origem | Campos usados |
|---|---|
| `state.writeReview` | `status`, `error` |
| Estado local do formulário | `primaryTitle`, `tconst`, `contentPt`, `contentEn` |

Ao desmontar, o formulário despacha `resetWriteReview()`.

### Chamadas à API

| Quando | Chamada | Observações |
|---|---|---|
| Enviar o formulário | `POST write-review/:tconst` | Corpo `{ content: { pt: { text }, en: { text } }, tconst, primaryTitle }`. Os dois textos passam por `PARAGRAPHS`, que troca cada quebra de linha por uma linha em branco. |

Antes do envio, `isValidTconst` confere o formato do `tconst`.

### Carregamento, vazio e erro

- **Carregamento.** O botão "Enviar" mostra spinner.
- **Validação.** Campos vazios são barrados pelo `required` do navegador. Um `tconst` fora do formato mostra o toast "Formato de tconst inválido. Deve começar com 'tt' seguido por 7 ou 8 dígitos.".
- **Sucesso.** Toast "Resenha adicionada com sucesso!" e os quatro campos são esvaziados. A tela não navega para outro lugar.
- **Erro.** Toast com a mensagem do backend, passada por `API_MESSAGE`, ou "Erro ao salvar a resenha".

---

## Resenhas

Rota `/dashboard/read`. Na barra de navegação aparece como "Ler"; o título da página é "Resenhas".

### O que a pessoa vê e faz

Uma lista de cartões clicáveis, um por resenha, mostrando o título do filme (`primaryTitle`, ou o `tconst` quando não há título). Clicar leva a `/dashboard/reviews/:tconst`.

### Componentes

`PageHeader`, `LoadingSpinner` e o botão estilizado `EntryCard` (`read/styles.ts`).

### Estado

Local, em `useReviews()`: `entries` e `status`.

### Chamadas à API

| Quando | Chamada | Observações |
|---|---|---|
| Ao montar | `POST write-review/search` | Corpo `{ filters: {} }`. Sem paginação. |

### Carregamento, vazio e erro

- **Carregamento.** `LoadingSpinner`.
- **Vazio.** "Nenhuma resenha encontrada.".
- **Erro.** "Não foi possível carregar as resenhas.".

---

## Resenha de um filme

Rota `/dashboard/reviews/:tconst`. Chega-se a ela pela tela "Resenhas" ou pelo botão "Ler resenha" da tabela de favoritos.

### O que a pessoa vê e faz

- Cabeçalho com o título do filme, o botão "Voltar" (volta no histórico do navegador) e o botão "Editar".
- Dois cartões lado a lado, "Português" e "English", com o texto da resenha em cada idioma. Um idioma sem texto mostra "Sem texto neste idioma.".
- "Editar" troca os textos por áreas de edição e mostra os botões "Cancelar" e "Salvar" no cabeçalho.
- Cartão "Imagens": galeria com botão de envio. Cada imagem tem a legenda (`subtitle_pt`), um botão para editar a legenda em um formulário embutido e um botão para excluir.

### Componentes

`PageHeader`, `GoBack`, `Button`, `LanguageCard`, `Card`, `ReviewImageCard` e `IconButton`.

### Estado

| Origem | Campos usados |
|---|---|
| `state.review` | `data`, `error`, `status` |
| `state.reviewImages` | `images`, `uploadStatus` |
| Estado local da página | `isEditing`, `editPt`, `editEn` |

Ao sair da tela, o efeito de limpeza despacha `clearState()` de `review`. O slice `reviewImages` não é limpo.

### Chamadas à API

| Quando | Chamada | Observações |
|---|---|---|
| Ao montar | `GET write-review/:tconst` | Thunk `fetchAuthoralReview`. Usa `entries[0]` da resposta. Um 404 é convertido em `null` por `nullIfNotFound`, e o thunk conclui com sucesso e `data` nulo. |
| Ao montar | `GET images/:tconst` | Thunk `fetchImages`. |
| Salvar a edição | `PUT write-review/:tconst` | Corpo `{ content: { pt: { text }, en: { text } } }`. O texto vai como foi digitado, sem `PARAGRAPHS`. |
| Escolher um arquivo | `POST images/:tconst` e depois `GET images/:tconst` | Multipart, campo `file`. |
| Excluir uma imagem | `DELETE images/:tconst/:filename` e depois `GET images/:tconst` | Não pede confirmação. |
| Salvar a legenda | `PUT images/:tconst/:filename` e depois `GET images/:tconst` | Corpo `{ subtitle_pt, subtitle_en }`, com o mesmo texto nos dois campos. |

As rotas `images/...` não existem no backend atual; veja [api-consumida.md](api-consumida.md#divergências-entre-o-frontend-e-o-backend-atual).

### Carregamento, vazio e erro

- **Carregamento.** Enquanto `review.status` é `'idle'` ou `'loading'`, a tela inteira é substituída pelo texto "Carregando...". Como o mesmo campo de status serve para a leitura e para a gravação, isso também acontece ao salvar a edição. O botão de envio de imagem mostra spinner durante o upload.
- **Vazio.** Quando o filme não tem resenha (404 do backend) ou a resenha não tem texto em nenhum idioma, a tela mostra um `PageHeader` com o botão "Voltar" e o título "Nenhuma resenha encontrada para este filme.". Os cartões de idioma e a galeria não aparecem. Com resenha e sem imagens, o cartão mostra "Nenhuma imagem ainda.".
- **Erro ao carregar.** Se a leitura falhar por outro motivo que não o 404, a mesma tela reduzida aparece com o botão "Voltar", e o título é a mensagem de `state.review.error` (a do backend, ou "Não foi possível carregar o artigo."). Não há toast.
- **Erro ao salvar.** Não há aviso. O modo de edição é fechado de qualquer forma e o texto digitado se perde.
- **Erro nas imagens.** Nenhum aviso. O erro fica em `state.reviewImages.error`, que a tela não lê.

---

## Belas Artes

Rota `/dashboard/belas-artes`.

### O que a pessoa vê e faz

Uma tabela somente de leitura com os filmes adicionados recentemente ao catálogo Belas Artes à la Carte, em duas colunas: Filme e Nota IMDb. A nota é um link para a página do filme no IMDb quando há `tconst` e nota; caso contrário aparece o valor ou "N/A". As duas colunas ordenam localmente. Não há paginação nem ações.

### Componentes

`PageHeader`, `Table` com `columns` (`belas-artes/columns.tsx`) e `ExternalLink`.

### Estado

Local, em `useRecentlyAdded()`: `movies` e `status`.

### Chamadas à API

| Quando | Chamada | Observações |
|---|---|---|
| Ao montar | `GET belas-artes/recent` | Espera `{ data: { movies: [...] } }`. |

O tipo `RecentMovie` tem também `director`, `original_title` e `year`, que a tabela não mostra.

### Carregamento, vazio e erro

- **Carregamento.** Linhas de esqueleto na tabela.
- **Vazio.** Tabela só com o cabeçalho, sem mensagem.
- **Erro.** A tabela é substituída por "Não foi possível carregar os filmes do Belas Artes.".
