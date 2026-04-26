---
name: Restart reminder
description: Sempre informar ao usuário quando uma mudança exige reinício do backend ou frontend
type: feedback
---

Após qualquer alteração em arquivos do backend ou do frontend que exija reinício do servidor, informar explicitamente ao usuário que ele precisa reiniciar o projeto afetado.

**Why:** O usuário quer saber quando precisa reiniciar para não ficar testando com servidor desatualizado.

**How to apply:** Ao final de qualquer resposta que envolva mudança em código do backend (Python/Flask) ou configurações que não são hot-reloaded, adicionar: "Reinicie o backend para aplicar as alterações." Para mudanças no frontend que não são capturadas pelo hot reload, avisar também.
