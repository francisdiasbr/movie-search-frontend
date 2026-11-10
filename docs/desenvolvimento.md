# Desenvolvimento

## Pré-requisitos

- Node.js e npm. O repositório não declara a versão (não há campo `engines` em `package.json` nem arquivo `.nvmrc`). A verificação de tipos e o lint citados nesta página foram executados com Node 20.19.4. A versão mínima exigida pelo Vite 8 não foi verificada.
- O backend `movie-search-backend` em execução. Sem ele, as telas abrem, mas todas as chamadas falham.

O repositório tem `package-lock.json`, então o gerenciador de pacotes de referência é o npm. O `README.md` da raiz também cita `yarn`, mas não há `yarn.lock`.

## Instalação

```bash
npm install
cp .env.example .env
```

Depois ajuste `VITE_BASE_URL` no `.env`, se o backend não estiver no endereço padrão.

## Variáveis de ambiente

| Variável | Obrigatória | Exemplo (`.env.example`) | Uso |
|---|---|---|---|
| `VITE_BASE_URL` | sim | `http://127.0.0.1:5000/api/` | Base de todas as chamadas à API, lida em `lib/api/BaseApi.ts` por `import.meta.env.VITE_BASE_URL`. |

Cuidados:

- A URL precisa terminar com `/`. Os services montam caminhos relativos, como `favorites/search`.
- O Vite só expõe ao código variáveis com o prefixo `VITE_`, e o valor é fixado no momento em que o servidor de desenvolvimento sobe ou o build roda. Depois de mudar o `.env`, reinicie o `npm run dev`.
- O arquivo `.env` está no `.gitignore`.
- O tipo de `import.meta.env` vem de `vite-env.d.ts`, que só referencia `vite/client`. Não há declaração própria para `VITE_BASE_URL`.

Não há outra variável de ambiente lida pelo código.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento do Vite. A porta não está configurada em `vite.config.ts`; vale o padrão do Vite. |
| `npm run build` | Roda `tsc -b` (verificação de tipos) e depois `vite build`. A saída vai para `dist/`, que está no `.gitignore`. |
| `npm run preview` | Serve localmente o conteúdo de `dist/`. |
| `npm run lint` | Roda o ESLint no projeto inteiro. |
| `npm run lint-fix` | Roda o ESLint com correção automática. |

No estado atual do diretório de trabalho, `npx tsc --noEmit -p .` terminou sem erros e `npx eslint .` não reportou problemas. `npm run dev` e `npm run build` não foram executados para escrever esta documentação.

## Testes

Não há testes automatizados. Não existe script `test` no `package.json`, nem biblioteca de testes nas dependências, nem arquivos de teste no repositório. Também não há configuração de integração contínua no repositório.

## Configuração do TypeScript e do Vite

- `tsconfig.json`: `strict` ligado, `noEmit`, `jsx: react-jsx`, `moduleResolution: bundler`. Inclui todos os arquivos `.ts` e `.tsx` da raiz.
- `vite.config.ts`: plugin `@vitejs/plugin-react` e o alias `@` apontando para a raiz do repositório. O mesmo alias existe em `tsconfig.json` (`paths`).
- Apesar de o alias existir, a regra `no-restricted-imports` do ESLint proíbe imports que comecem com `@/`. O código usa só caminhos relativos.

## Regras de lint

O `.eslintrc.json` estende `eslint:recommended`, `plugin:react/recommended`, `plugin:@typescript-eslint/recommended`, `plugin:jsx-a11y/recommended` e `plugin:react-hooks/recommended`. Regras próprias que afetam o dia a dia:

| Regra | Efeito |
|---|---|
| `quotes` | Aspas simples, inclusive em atributos JSX escritos como string. |
| `object-curly-spacing` | Espaço dentro das chaves. |
| `import-helpers/order-imports` | Imports de pacotes primeiro, depois os relativos, com linha em branco entre os grupos e ordem alfabética. É um aviso, não um erro. |
| `no-restricted-imports` | Proíbe `@/*`. |
| `jsx-a11y/*` | Cinco regras de acessibilidade elevadas a erro, entre elas `click-events-have-key-events` e `no-noninteractive-element-interactions`. |
| `react-hooks/exhaustive-deps` | Aviso. O código desliga a regra pontualmente em alguns efeitos, com comentário. |
| `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-unused-vars` | Desligadas. |

O Prettier e os plugins `eslint-plugin-prettier`, `eslint-config-prettier` e `eslint-plugin-perfectionist` estão instalados, mas não aparecem no `.eslintrc.json`, e não há arquivo de configuração do Prettier no repositório.

## Convenções do código

Estas convenções aparecem no código e estão descritas no `CLAUDE.md` da raiz.

- **Uma pasta por feature** em `app/dashboard/`, com `service/` próprio e, quando a tela guarda estado global, `reducer/` e `types.ts`.
- **Nenhuma URL fora de um service.** As features não importam `BaseApi`; herdam de `BaseService`.
- **Thunks com `createApiThunk` e reducers com `addStatusCases`.** Nenhum slice escreve os casos `pending`, `fulfilled` e `rejected` à mão.
- **Estado local quando só uma tela usa o dado.** Nesse caso um hook da feature (`useSeries`, `useKeywords`) chama o service e guarda `status` com `useState`.
- **Rotas em `ROUTES`** (`app/const.ts`). Nenhum caminho `/dashboard/...` é escrito direto nos componentes.
- **Estilos em `styles.ts`**, importados como `* as S`, lendo cores, espaçamentos, raios e sombras de `theme`.
- **`useStatusToast` e `useAsyncAction`** no lugar de efeitos e indicadores de carregamento escritos à mão.
- **Textos da interface em português**, escritos direto nos componentes. Comentários do código em inglês, com poucas exceções.

## Como adicionar uma tela

O caminho abaixo segue o que as telas existentes fazem. A tela de séries é o exemplo mais recente de tela sem Redux; a de favoritos, de tela com Redux.

1. Crie a pasta `app/dashboard/<feature>/` com `page.tsx`, `types.ts` e `service/<Nome>Service.ts`. O service estende `BaseService`, define `prefix` e é exportado como instância.
2. Se o dado só interessa a essa tela, crie um hook `use<Nome>.ts` que chama o service. Se o dado é usado em mais de um lugar, crie `reducer/<nome>Slice.ts` com `createApiThunk` e `addStatusCases`, e registre o reducer em `lib/store.ts`.
3. Acrescente o caminho em `ROUTES` (`app/const.ts`) e a rota em `app/router.tsx`.
4. Se a tela deve aparecer na barra de navegação, acrescente o link na lista `links` de `app/dashboard/layout.tsx`.
5. Comece a página com `PageHeader` e use os componentes de `app/ui/`.

## Arquivos gerados e locais

| Caminho | Situação |
|---|---|
| `dist/` | Saída do build. Ignorado pelo git. |
| `tsconfig.tsbuildinfo` | Gerado por `tsc -b`. Ignorado pelo git. |
| `.env` | Configuração local. Ignorado pelo git. |
| `node_modules/` | Dependências. Ignorado pelo git. |

## Publicação

Não há configuração de publicação no repositório (nenhum arquivo de plataforma de hospedagem, contêiner ou pipeline). O app roda localmente com `npm run dev`.
