# API consumida

Esta página lista todas as rotas do backend que o frontend chama. Os caminhos são relativos a `VITE_BASE_URL` (no `.env.example`, `http://127.0.0.1:5000/api/`). O formato "esperado" vem dos tipos TypeScript e do uso que o código faz da resposta, não de uma especificação do backend.

Como ler a tabela:

- **Service** é o método que monta a chamada. Todos ficam em `app/dashboard/<feature>/service/` ou em `lib/service/ImagesBaseService.ts`.
- **Disparado por** é o thunk, hook ou página que chama o service.
- Corpos são JSON, exceto os uploads, que usam `multipart/form-data` com o campo `file`.
- `:tconst`, `:filename` e `:keyword` passam por `encodeURIComponent`.

## Favoritos (`favorites`)

| Método e caminho | Service | Disparado por | Corpo enviado | Resposta esperada |
|---|---|---|---|---|
| `POST favorites/search` | `FavoritesService.searchFavorites` | thunk `fetchFavorites` (tela de favoritos) | `{ filters, page, page_size, search_term }`. `filters` pode ter `country`, `watched` e `startYear: { $gte?, $lte? }`. | `{ entries: FavoriteEntry[], total_documents: number, countries?: string[], years?: number[] }`. O thunk falha com "Formato de resposta inválido" se `entries` não for uma lista. |
| `POST favorites/search` | `KeywordsService.findCollectedTconsts` | tela de palavras-chave, após receber sugestões | `{ filters: { tconst: { $in: string[] } }, page_size: 0 }` | `{ entries: [{ tconst }] }`. Só o `tconst` é lido. |
| `POST favorites/:tconst` | `FavoritesService.addFavorite` | thunk `addFavorite` (`AddFavorite`) | sem corpo | `{ data: MovieDetailsItem }`. Um 409 é tratado como "filme já está na coleção". |
| `POST favorites/:tconst` | `KeywordsService.addToCollection` | tela de palavras-chave (estrela da sugestão) | sem corpo | Resposta ignorada. Um 409 é tratado como "já está na coleção". |
| `GET favorites/:tconst?lang=en\|pt` | `FavoritesService.getDetails` | thunk `fetchDetails` (detalhe do favorito) | | `{ data: MovieDetailsItem }`. O campo `data.lang` informa o idioma em que os textos realmente vieram. |
| `GET favorites/:tconst` | `WriteService.getMovieTitle` | tela "Escrever" | | `{ data: { primaryTitle } }`. Só o título é lido. |
| `PUT favorites/:tconst` | `FavoritesService.edit` | thunk `editDetails` (`EditInfoModal` e `WatchedTag`) | `EditDetailsPayload`: `tconst` e qualquer subconjunto de `watched`, `soundtrack`, `wiki`, `magnet_link`, `references` | `{ data: MovieDetailsItem }`. O frontend conta com o backend gravar só os campos enviados. |
| `DELETE favorites/:tconst` | `FavoritesService.removeFavorite` | thunk `deleteFavorite` (tela de favoritos) | | Resposta ignorada. |
| `POST favorites/:tconst/translate` | `FavoritesService.translate` | thunk `translateDetails` (detalhe do favorito) | sem corpo | `{ data: MovieDetailsItem }`, já em português. |

`POST favorites/search` vindo de `searchFavorites` usa `cancelPrevious: true`.

Campos de `MovieDetailsItem` que a interface lê: `tconst`, `primaryTitle`, `title_pt`, `startYear`, `country`, `director`, `writers`, `stars`, `genres`, `plot`, `trivia`, `quote`, `plot_keywords`, `poster_url`, `backdrop_url`, `imdb_url`, `magnet_link`, `subtitle_url`, `soundtrack`, `wiki`, `references` e `lang`. Campos de `FavoriteEntry` que a tabela lê: `tconst`, `primaryTitle`, `startYear`, `watched` e `poster_url`.

## Imagens principais (`main-images`)

| Método e caminho | Service | Disparado por | Corpo enviado | Resposta esperada |
|---|---|---|---|---|
| `GET main-images/:tconst` | `MainImagesService.list` | thunks `fetchMainImage`, `uploadMainImage` e `deleteMainImage` (detalhe do favorito) | | `{ images: ImageItem[] }`. Se `images` não for uma lista, o thunk usa lista vazia. |
| `POST main-images/:tconst` | `MainImagesService.upload` | thunk `uploadMainImage` | multipart, campo `file` | Tipada como `{ object_name, url? }`, mas a resposta é ignorada; a lista é relida em seguida. |
| `DELETE main-images/:tconst/:filename` | `MainImagesService.removeImage` | thunk `deleteMainImage` | | Resposta ignorada; a lista é relida em seguida. |

`ImageItem`: `{ filename, url, subtitle_pt?, subtitle_en?, sequential_id? }`. A tela de imagens principais usa `filename` e `url`.

`MainImagesService` herda também `updateSubtitle` (`PUT main-images/:tconst/:filename`), mas nenhum código o chama.

## Galeria da resenha (`images`)

| Método e caminho | Service | Disparado por | Corpo enviado | Resposta esperada |
|---|---|---|---|---|
| `GET images/:tconst` | `ImagesService.list` | thunks `fetchImages`, `uploadMovieImage`, `deleteImage` e `updateImageSubtitle` (tela da resenha) | | `{ images: ImageItem[] }`. Sem `images`, o thunk usa lista vazia. |
| `POST images/:tconst` | `ImagesService.upload` | thunk `uploadMovieImage` | multipart, campo `file` | Resposta ignorada; a galeria é relida. |
| `DELETE images/:tconst/:filename` | `ImagesService.removeImage` | thunk `deleteImage` | | Resposta ignorada; a galeria é relida. |
| `PUT images/:tconst/:filename` | `ImagesService.updateSubtitle` | thunk `updateImageSubtitle` | `{ subtitle_pt, subtitle_en }`, com o mesmo texto nos dois | Resposta ignorada; a galeria é relida. |

A tela usa `filename`, `url` e `subtitle_pt` de cada imagem.

## Resenhas (`write-review`)

| Método e caminho | Service | Disparado por | Corpo enviado | Resposta esperada |
|---|---|---|---|---|
| `POST write-review/search` | `FavoritesService.findReviewedTconsts` | thunk `fetchFavorites`, depois de cada busca | `{ filters: { tconst: { $in: string[] } } }` | `{ entries: [{ tconst }] }`. Uma falha é tolerada. |
| `POST write-review/search` | `ReadService.searchReviews` | hook `useReviews` (tela "Resenhas") | `{ filters: {} }` | `{ entries: ReviewSummary[] }`. A tela lê `tconst` e `primaryTitle`. |
| `GET write-review/:tconst` | `ReviewsService.getByTconst` | thunk `fetchAuthoralReview` (tela da resenha) | | `{ entries: [MovieReviewResponse] }`. O thunk usa `entries[0]`. Um 404 é aceito e vira `null` (`nullIfNotFound`). |
| `GET write-review/:tconst` | `WriteService.findReview` | tela "Escrever" | | `{ entries: [...] }`. Um 404 (tratado por `nullIfNotFound`), ou lista vazia ou ausente, significa "ainda não há resenha". |
| `POST write-review/:tconst` | `WriteReviewService.create` | thunk `createReview` (formulário de resenha) | `{ content: { pt: { text }, en: { text } }, tconst, primaryTitle }` | `{ data: CreateReviewResponse }`. O conteúdo da resposta não é usado. |
| `PUT write-review/:tconst` | `ReviewsService.update` | thunk `updateAuthoralReview` (tela da resenha) | `{ content: { pt: { text }, en: { text } } }` | `{ data: MovieReviewResponse }`, que substitui a resenha na tela. |
| `DELETE write-review/:tconst` | `FavoritesService.removeReview` | tela de favoritos | | Resposta ignorada. Um 404 é tratado como "não havia resenha". |

`MovieReviewResponse`: `{ tconst, primaryTitle, content?: { pt?: { text }, en?: { text } } }`.

## Palavras-chave (`keywords`)

| Método e caminho | Service | Disparado por | Corpo enviado | Resposta esperada |
|---|---|---|---|---|
| `GET keywords` | `KeywordsService.list` | hook `useKeywords` (`load` e `refresh`), nas telas de palavras-chave e de detalhe do favorito | | `{ data: Keyword[] }`, com `Keyword = { _id, keyword }`. Só `keyword` é lido. |
| `POST keywords` | `KeywordsService.add` | `useKeywords().add` (detalhe do favorito) | `{ keyword }` | Resposta ignorada. Um 409 mostra "já existe" ou "não permitida". |
| `DELETE keywords/:keyword` | `KeywordsService.removeKeyword` | `useKeywords().remove` (detalhe do favorito) | | Resposta ignorada. |
| `POST keywords/suggest-movies` | `KeywordsService.suggestMovies` | tela de palavras-chave | `{ keywords: string[] }` | `{ data: { movies: SuggestedMovie[] } }`. |

`SuggestedMovie`: `{ tconst, title, original_title?, year?, genres?, description?, relevance? }`.

## Séries (`series`)

| Método e caminho | Service | Disparado por | Corpo enviado | Resposta esperada |
|---|---|---|---|---|
| `POST series/search` | `SeriesService.searchSeries` | `useSeries().load` | `{ search_term }` | `{ entries: SeriesEntry[], total_documents }`. Só `entries` é lido. Usa `cancelPrevious: true`. |
| `POST series/:tconst` | `SeriesService.addSeries` | `useSeries().add` | sem corpo | `{ data: SeriesEntry }`, inserida direto na lista local. |
| `PUT series/:tconst` | `SeriesService.setWatched` | `useSeries().setWatched` | `{ watched }` | Resposta ignorada; a linha é atualizada localmente. |
| `DELETE series/:tconst` | `SeriesService.removeSeries` | `useSeries().remove` | | Resposta ignorada. |

`SeriesEntry`: `{ _id, tconst, primaryTitle, title_pt, startYear, endYear, seasons, episodes, genres, imdb_rating, poster_url, watched }`.

## Belas Artes (`belas-artes`)

| Método e caminho | Service | Disparado por | Corpo enviado | Resposta esperada |
|---|---|---|---|---|
| `GET belas-artes/recent` | `BelasArtesService.listRecentlyAdded` | hook `useRecentlyAdded` | | `{ data: { movies: RecentMovie[] } }`. |

`RecentMovie`: `{ id, title, original_title, director, year, tconst, imdb_rating }`. A tabela usa `id`, `title`, `tconst` e `imdb_rating`.

## Formato dos erros

O frontend extrai a mensagem de erro do corpo da resposta nesta ordem: `data` (se for string), depois `message` (se for string), depois o texto genérico `"HTTP error <status>"`. Códigos HTTP com tratamento específico:

| Código | Onde | Efeito |
|---|---|---|
| 409 | `POST favorites/:tconst` | "Este filme já está na coleção." (erro na tela de favoritos, aviso informativo na de palavras-chave). |
| 409 | `POST keywords` | "Palavra-chave já existe." se ela está na lista local; "Palavra-chave não permitida." se não está. |
| 404 | `DELETE write-review/:tconst` | "Nenhuma resenha encontrada para excluir.". |
| 404 | `GET write-review/:tconst` | Tratado como "filme sem resenha" por `nullIfNotFound`: a tela "Escrever" segue para o formulário e a tela da resenha mostra "Nenhuma resenha encontrada para este filme.". |

Nos demais casos, o código não distingue o status: mostra a mensagem do backend ou um texto fixo.

## Serviços externos acessados pelo navegador

Além do backend, a interface monta links ou carrega conteúdo de:

| Destino | Onde | Como |
|---|---|---|
| IMDb (`https://www.imdb.com/title/:tconst/`) | detalhe do favorito, séries, palavras-chave, Belas Artes | Link em nova aba (`imdbTitleUrl`). |
| Spotify (`https://open.spotify.com/embed/...`) | detalhe do favorito | `<iframe>` do `MediaCard`. |
| Busca externa de torrents (`pirateBaySearchUrl`) | detalhe do favorito, botão "Baixar Filme" | Link em nova aba. |
| URLs de imagem (`poster_url`, `backdrop_url`, `url` das imagens) | várias telas | `<img src>` com a URL que o backend devolve. A origem dessas URLs não foi verificada no frontend. |

## Divergências entre o frontend e o backend atual

Os itens abaixo foram conferidos lendo o código do backend em `~/www/movie-search-backend` (diretório de trabalho, último commit `588939d`). Nada foi executado; são diferenças entre os dois códigos, não resultados de teste.

1. **As rotas `images/...` não existem no backend.** `app.py` registra os namespaces `favorites`, `keywords`, `main-images`, `write-review`, `belas-artes` e `series`. Não há namespace `images`. As quatro chamadas da galeria da tela da resenha (`GET`, `POST`, `DELETE` e `PUT` em `images/...`) não têm rota correspondente.
2. **`main-images` não tem `PUT`.** O backend só tem `GET`, `POST` e `DELETE` nesse recurso. O método herdado `MainImagesService.updateSubtitle` não é chamado, então não há efeito prático.
3. **O dicionário de `API_MESSAGE` não casa com as mensagens atuais.** A única entrada traduz `'Movie not found in favorites'`, mas o backend hoje responde `'Filme não encontrado nos favoritos'`, já em português. A entrada não tem mais efeito.
4. **O 409 de `POST keywords` só significa "já existe".** O backend devolve 409 apenas quando a palavra-chave já está cadastrada. O ramo "Palavra-chave não permitida." do frontend só é alcançado quando a lista local está desatualizada.
5. **Mensagens de erro em inglês chegam à interface.** Algumas respostas de erro do backend estão em inglês (`"Movie not found"`, `"Review not found"`, `"Keyword already listed"`). Nas telas que mostram a mensagem do backend no toast, o texto aparece como veio.
6. **Comentário desatualizado sobre a tradução.** O comentário de `FavoritesService.translate` diz que a versão em português é gerada pelo Claude; o backend usa o Argos Translate, como diz o `README.md` da raiz.
7. **Criação de resenha.** O backend exige apenas o texto em português e usa o `primaryTitle` do favorito, ignorando o do corpo. O formulário exige os dois idiomas e envia `primaryTitle`. O backend também responde 404 se o filme não estiver nos favoritos; nesse caso o toast mostra a mensagem do backend.

O 404 de `GET write-review/:tconst` para filme sem resenha deixou de ser uma divergência: `WriteService.findReview` e `fetchAuthoralReview` passaram a tratá-lo com `nullIfNotFound`.

Rotas que o backend oferece e o frontend não usa: `GET series/:tconst`, `GET /` e `GET /routes`.

## Não verificado

- O comportamento real das chamadas com o backend em execução.
- O conteúdo e a origem das URLs de imagem devolvidas pelo backend.
- O tempo de resposta das operações que os textos da interface descrevem como demoradas (adicionar um filme, traduzir).
