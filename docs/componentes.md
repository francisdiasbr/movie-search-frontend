# Componentes

O projeto separa os componentes em três níveis:

1. `app/ui/`: componentes genéricos, sem regra de negócio e sem acesso à store.
2. `app/dashboard/components/`: componentes compartilhados entre features do dashboard.
3. `app/dashboard/<feature>/components/` (ou `[tconst]/components/`): componentes de uma única feature.

Todos os estilos ficam em um `styles.ts` ao lado do componente e leem os valores de `theme`. As props transitórias do styled-components usam o prefixo `$` (por exemplo `$variant`, `$active`).

## Componentes de `app/ui/`

### `Button`

Arquivos: `app/ui/Button/index.tsx`, `types.ts`, `styles.ts`.

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'transparent' \| 'danger' \| 'success'` | `'primary'` | Aparência. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Altura de 28px, 36px ou 40px. |
| `iconLeft`, `iconRight` | componente de ícone | nenhum | Ícone antes ou depois do texto. |
| `loading` | `boolean` | `false` | Esconde o conteúdo, mostra um spinner e desabilita o botão. |
| `disabled` | `boolean` | `false` | |
| `fullWidth` | `boolean` | `false` | Ocupa a largura do contêiner. |
| `href` | `string` | nenhum | Renderiza um `<a>` com aparência de botão, que abre em nova aba com `rel='noopener noreferrer'`. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | |

Aceita também os demais atributos de `<button>`. Um botão sem `children` é tratado como botão só de ícone.

Onde é usado: em praticamente todas as telas e diálogos. As variantes em uso são `primary`, `secondary`, `outline`, `danger` e, por meio do `IconButton`, `transparent`. A variante `success`, o tamanho `large` e as props `fullWidth` e `iconRight` não têm uso no código atual.

### `IconButton`

Arquivo: `app/ui/IconButton/index.tsx`. É um `Button` só com ícone.

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `icon` | componente de ícone | obrigatório | |
| `title` | `string` | obrigatório | Vira a dica de ferramenta e o `aria-label`. |
| `variant` | `ButtonVariant` | `'transparent'` | |
| `size` | `ButtonSize` | `'small'` | |

Aceita as demais props de `Button`, como `loading` e `onClick`.

Onde é usado: ações das tabelas de favoritos e de séries (onde é estendido como `DangerIconButton`, que fica vermelho ao passar o mouse), `EditInfoModal`, `MainImageUpload`, `ReviewImageCard` e `SuggestedMovieCard`.

### `Card`

Arquivo: `app/ui/Card/index.tsx`.

| Prop | Tipo | Descrição |
|---|---|---|
| `children` | `ReactNode` | Corpo do cartão. Obrigatório. |
| `title` | `ReactNode` | Título no cabeçalho. |
| `actions` | `ReactNode` | Conteúdo à direita do cabeçalho. |
| `badge` | `string` | Selo antes do título. |
| `cover` | `ReactNode` | Conteúdo de borda a borda acima do cabeçalho, como um banner. |
| `footer` | `ReactNode` | Rodapé. |
| `className` | `string` | Permite estender com `styled(Card)`. |

O cabeçalho só é renderizado quando há `title` ou `actions`.

Onde é usado: `MovieInfoCard`, cartões "Links", "Citações" e "Palavras-chave" do detalhe do favorito, `MainImageUpload`, `LanguageCard` e cartão "Imagens" da resenha. A prop `footer` não tem uso no código atual.

### `Dialog`

Arquivo: `app/ui/Dialog/index.tsx`. Usa o elemento `<dialog>` nativo com `showModal()`.

| Prop | Tipo | Descrição |
|---|---|---|
| `isOpen` | `boolean` | Abre com `showModal()` e fecha com `close()`. |
| `onClose` | `() => void` | Chamado pelo botão de fechar, pelo clique no fundo e pelo evento `close` nativo (tecla Escape). |
| `title` | `string` | Título no cabeçalho. |
| `children` | `ReactNode` | Corpo. |

O arquivo também exporta três blocos para montar formulários dentro de diálogos: `DialogField` (rótulo e campo empilhados), `DialogRow` (campo e botão na mesma linha) e `DialogFooter` (linha dos botões).

Onde é usado: `ConfirmDialog`, `AddTitleDialog`, `EditInfoModal` e `MainImageModal`.

### `ConfirmDialog`

Arquivo: `app/ui/ConfirmDialog/index.tsx`. Pergunta de confirmação antes de uma ação sem volta.

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `isOpen` | `boolean` | obrigatório | |
| `title` | `string` | obrigatório | |
| `children` | `ReactNode` | obrigatório | Texto da pergunta. |
| `onConfirm` | `() => void` | obrigatório | |
| `onCancel` | `() => void` | obrigatório | Também é usado como `onClose` do diálogo. |
| `confirmLabel` | `string` | `'Excluir'` | Texto do botão de confirmação, que usa a variante `danger`. |
| `loading` | `boolean` | `false` | Spinner no botão de confirmação e bloqueio do "Cancelar". |

Onde é usado: telas de favoritos (exclusão de favorito e de resenha) e de séries.

### `ExternalLink`

Arquivo: `app/ui/ExternalLink/index.tsx`. Um `<a>` que abre em nova aba com `rel='noopener noreferrer'`. Aceita os atributos de `<a>`. Sem `children`, mostra o próprio `href` como texto.

Onde é usado: `MovieInfoCard`, cartão "Links" do detalhe do favorito, `SuggestedMovieCard` e colunas da tela Belas Artes.

### `Stack` e `Row`

Arquivo: `app/ui/Layout/index.ts`. São primitivas de flexbox.

| Prop | Valores | Padrão |
|---|---|---|
| `$align` | `'center' \| 'flex-end' \| 'flex-start' \| 'stretch'` | `Stack`: `stretch`; `Row`: `center` |
| `$gap` | passo de `theme.spacing` | `Stack`: `md`; `Row`: `sm` |
| `$justify` | `'center' \| 'flex-end' \| 'flex-start' \| 'space-between'` | `flex-start` |
| `$mt` | passo de `theme.spacing` | sem margem |
| `$wrap` | `boolean` (só tem efeito em `Row`) | `true` |

`Stack` empilha na vertical e `Row` alinha na horizontal, quebrando a linha quando falta espaço.

Onde é usado: `Row` nas telas de palavras-chave e "Escrever". `Stack` não tem uso no código atual.

### `LoadingSpinner`

Arquivo: `app/ui/LoadingSpinner/index.tsx`.

| Prop | Tipo | Padrão |
|---|---|---|
| `size` | `string` | `'40px'` |
| `thickness` | `string` | `'4px'` |
| `speed` | `string` | `'0.65s'` |
| `color` | `string` | cor definida no estilo |
| `inline` | `boolean` | `false` |

Onde é usado: `Button` (versão `inline` de 16px), `LoadingModal`, corpo da `Table`, detalhe do favorito, palavras-chave e lista de resenhas.

### `LoadingModal`

Arquivo: `app/ui/LoadingModal/index.tsx`. Sobreposição de tela cheia com spinner e mensagem. Não usa `<dialog>`; é um `div` posicionado.

| Prop | Tipo | Padrão |
|---|---|---|
| `isOpen` | `boolean` | obrigatório |
| `message` | `string` | `'Carregando...'` |

Onde é usado: `AddFavorite`.

### `MediaCard`

Arquivo: `app/ui/MediaCard/index.tsx`. Player do Spotify em um `<iframe>`.

| Prop | Tipo | Descrição |
|---|---|---|
| `spotifyUrl` | `string` | Link de compartilhamento do Spotify. `spotifyEmbedUrl` usa os dois últimos segmentos do caminho como tipo e identificador para montar a URL de incorporação. |

Não renderiza nada quando a URL está vazia ou não pode ser convertida.

Onde é usado: detalhe do favorito.

### `PageHeader`

Arquivo: `app/ui/PageHeader/index.tsx`. Cabeçalho padrão das páginas.

| Prop | Tipo | Descrição |
|---|---|---|
| `title` | `ReactNode` | Renderizado em um `<h1>`. Obrigatório. |
| `description` | `ReactNode` | Texto abaixo do título. |
| `actions` | `ReactNode` | Botões à direita. |
| `children` | `ReactNode` | Conteúdo acima do título, normalmente o `GoBack`. |

Onde é usado: todas as telas, exceto o detalhe do favorito, que usa o `MovieInfoCard` como cabeçalho.

### `Select`

Arquivo: `app/ui/Select/index.tsx`. Um `<select>` nativo com a aparência do app.

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `label` | `string` | obrigatório | Nome acessível (`aria-label`). Não é exibido. |
| `value` | `string` | obrigatório | `''` representa "nada selecionado". |
| `onChange` | `(value: string) => void` | obrigatório | Recebe o valor, não o evento. |
| `options` | `SelectOption[]` | obrigatório | `{ label, value }`. |
| `placeholder` | `string` | nenhum | Texto da opção vazia. Sem ele, não há opção vazia. |
| `clearable` | `boolean` | `false` | Mostra um botão "×" quando há valor; clicar envia `''`. |
| `size` | `'small' \| 'medium'` | `'medium'` | |

Aceita os demais atributos de `<select>`, como `disabled`.

Onde é usado: filtros de país e de status em `Search`, e seletor de registros por página em `Pagination`.

### `Table`

Arquivos: `app/ui/Table/index.tsx`, `types.ts`, `sort.ts` e as subpastas `Header`, `Body`, `Pagination` e `RowsLoader`. É genérica no tipo da linha (`Table<Row>`).

| Prop | Tipo | Descrição |
|---|---|---|
| `columns` | `Column<Row>[]` | Definição das colunas. |
| `entries` | `Row[]` | Linhas. |
| `rowKey` | `(row) => string` | Chave de cada linha. |
| `isLoading` | `boolean` | Mostra 10 linhas de esqueleto. |
| `isActionLoading` | `boolean` | Com `isLoading`, mostra um spinner no lugar do esqueleto. Serve para recargas causadas por uma ação de linha. |
| `pagination` | `PaginationProps` | Sem ela, todas as linhas aparecem e não há rodapé. |

`Column<Row>`:

| Campo | Tipo | Descrição |
|---|---|---|
| `key` | `string` | Identificador da coluna e campo usado na ordenação. |
| `label` | `string` | Texto do cabeçalho. |
| `render` | `(row) => ReactNode` | Célula personalizada. Sem ela, a célula mostra `row[key]`. |
| `sort` | `boolean` | Torna o cabeçalho clicável. |
| `style` | `CSSProperties` | Estilo aplicado à célula do cabeçalho, usado para larguras. |

`PaginationProps`: `page` (começa em 1), `pageSize`, `totalDocuments`, `onPageChange` e `onPageSizeChange`. O rodapé tem os botões "Anterior" e "Próximo", o número da página, um `Select` com os tamanhos 5, 10, 50 e 100 e o texto "X a Y de Z".

Comportamento da ordenação (`sort.ts`): é feita sobre as linhas recebidas em `entries`, ou seja, só sobre a página atual. O primeiro clique ordena de forma crescente e o seguinte alterna para decrescente. Booleanos e números são comparados por valor, textos numéricos são comparados como números e o restante com `localeCompare`. A ordenação usa sempre `row[key]`, mesmo quando a coluna tem `render`.

A tabela não tem mensagem para lista vazia.

Onde é usado: favoritos (com paginação), séries e Belas Artes (sem paginação).

### `TagList`

Arquivo: `app/ui/TagList/index.tsx`. Linha de etiquetas clicáveis, renderizadas como `<button>`.

| Prop | Tipo | Descrição |
|---|---|---|
| `items` | `string[]` | Etiquetas. Obrigatório. |
| `onSelect` | `(item) => void` | Clique em uma etiqueta. Obrigatório. |
| `favorited` | `string[]` | Etiquetas já favoritadas: ficam destacadas e, com `onRemove`, mostram um coração que vira "×" ao passar o mouse. |
| `onRemove` | `(item) => void` | Clique em uma etiqueta favoritada. Sem ele, o clique chama `onSelect`. |
| `selected` | `string[]` | Etiquetas destacadas com borda, para telas de seleção múltipla. |

Onde é usado: diretor e palavras-chave no detalhe do favorito (com `favorited` e `onRemove`) e a tela de palavras-chave (com `selected`).

## Componentes compartilhados do dashboard

Ficam em `app/dashboard/components/`.

### `AddTitleDialog`

Diálogo "digite o identificador do IMDb", usado pelas listas que adicionam títulos pelo `tconst`. Ainda não commitado.

| Prop | Tipo | Descrição |
|---|---|---|
| `isOpen` | `boolean` | |
| `title` | `string` | Título do diálogo. |
| `hint` | `string` | Texto de ajuda abaixo do campo. |
| `loading` | `boolean` | Desabilita o campo, mostra spinner em "Adicionar" e impede o fechamento. |
| `onSubmit` | `(tconst: string) => void` | Recebe o valor já validado. |
| `onClose` | `() => void` | |

O botão "Adicionar" só fica ativo quando o valor, sem espaços nas pontas, casa com `TCONST_REGEX`. A tecla Enter envia. O componente deve ser montado só enquanto está aberto, para o campo começar vazio a cada abertura; é assim que `AddFavorite` e a tela de séries o usam.

Onde é usado: `AddFavorite` (tela de favoritos) e tela de séries.

### `GoBack`

Botão "Voltar" com seta, na variante `outline`.

| Prop | Tipo | Descrição |
|---|---|---|
| `to` | `string` | Rota de destino. Sem ela, volta uma entrada no histórico (`navigate(-1)`). |

Onde é usado: detalhe do favorito e formulário de resenha (ambos com `to={ROUTES.favorites}`) e tela da resenha (sem `to`).

### `LanguageSelector`

Seletor EN/PT da barra de navegação. Não recebe props. Lê `language` e chama `changeLanguage` de `useLanguage()`. É um grupo de dois botões com `aria-pressed`.

Onde é usado: `DashboardLayout`.

### `WatchedBadge`

Selo-botão "assistido / não assistido". Só cuida da aparência; quem usa decide o que o clique faz. Ainda não commitado como componente compartilhado (o `styles.ts` veio de `WatchedTag`).

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `watched` | `boolean` | obrigatório | Define a cor, o ícone e o `aria-pressed`. |
| `onClick` | `() => void` | obrigatório | |
| `busy` | `boolean` | `false` | Desabilita o botão e reduz a opacidade. |
| `feminine` | `boolean` | `false` | Usa "Assistida" em vez de "Assistido". |

Onde é usado: `WatchedTag` (favoritos) e colunas da tela de séries.

## Componentes de feature

| Componente | Local | Props principais | Papel |
|---|---|---|---|
| `AddFavorite` | `favorites/components/AddFavorite` | `onAdded` | Botão do cabeçalho que abre o `AddTitleDialog`, despacha `addFavorite` e mostra o `LoadingModal`. |
| `Search` | `favorites/components/Search` | `values`, `onChange`, `countryOptions`, `yearBounds` | Barra de filtros da coleção. É controlado: devolve o objeto completo a cada mudança. |
| `YearRange` | `favorites/components/YearRange` | `min`, `max`, `value: { from?, to? }`, `onChange` | Dois `input type='range'` sobrepostos em uma trilha. Um limite igual a `min` ou `max` é devolvido como `undefined`. Fica desabilitado quando `max <= min`. |
| `WatchedTag` | `favorites/components/WatchedTag` | `tconst`, `watched`, `onUpdate?` | Liga o `WatchedBadge` ao thunk `editDetails` e mostra o toast do resultado. |
| `MovieInfoCard` | `favorites/[tconst]/components/MovieInfoCard` | `data`, `favoritedKeywords`, `onEditClick?`, `onKeywordSelect`, `onKeywordRemove` | Cartão principal do detalhe do favorito. |
| `EditInfoModal` | `favorites/[tconst]/components/EditInfoModal.tsx` | `data`, `isOpen`, `onClose` | Formulário de trilha sonora, wiki, magnet link e referências. Despacha `editDetails`. |
| `MainImageUpload` | `favorites/[tconst]/components/MainImageUpload` | `images`, `onUploadMainImage`, `onDeleteMain`, `onMainImageClick`, `updateImageStatus` | Grade das imagens principais com envio e exclusão. |
| `MainImageModal` | `favorites/[tconst]/components/MainImageModal.tsx` | `isOpen`, `onClose`, `selectedMainImage` | Mostra a imagem ampliada em um `Dialog`. |
| `SuggestedMovieCard` | `keywords/components/SuggestedMovieCard` | `movie`, `collected`, `loading`, `onCollect` | Item da lista de sugestões. |
| `LanguageCard` | `reviews/[tconst]/components/LanguageCard` | `title`, `badge`, `text?`, `editing`, `value`, `onChange` | Um idioma da resenha: texto ou área de edição. |
| `ReviewImageCard` | `reviews/[tconst]/components/ReviewImageCard` | `image`, `position`, `onDelete`, `onSaveCaption` | Imagem da galeria com legenda e edição embutida. |
| `AuthoralReviewForm` | `write-review/Form` | nenhuma | Formulário de criação da resenha. Lê `tconst` e `primaryTitle` da query string. |
