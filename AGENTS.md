@C:\Users\Lucas PC\.codex\RTK.md

## Limite de processos

Não executar `npx`, `npm`, `pnpm`, `yarn`, Playwright, navegadores automatizados,
dev servers, watchers, builds, testes ou processos paralelos sem autorização
explícita do usuário. Priorizar revisão estática, leitura de código e validação por
screenshots fornecidos pelo usuário. Antes de qualquer execução que possa criar
processos Node ou consumir recursos relevantes, informar comando, impacto e limite
de processos; aguardar autorização.
