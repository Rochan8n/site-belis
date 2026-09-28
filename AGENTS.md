@C:\Users\Lucas PC\.codex\RTK.md

## Execução e uso de recursos

Executar os comandos e ferramentas necessários para concluir e verificar a tarefa,
incluindo `npx`, `npm`, `pnpm`, `yarn`, Node, builds, testes, Playwright, navegadores
automatizados e servidores locais, sem solicitar autorização adicional para cada
execução. A autorização do usuário para a tarefa cobre essas verificações.

Evitar processos redundantes, watchers desnecessários e servidores duplicados.
Preferir validações em sequência quando houver consumo relevante de CPU ou memória.
Usar paralelismo apenas quando trouxer benefício concreto. Encerrar servidores,
navegadores e outros processos temporários iniciados pela tarefa ao concluir.

Informar progresso e limitações reais. Commit, push e publicação continuam sujeitos
ao pedido do usuário; autorização para testar não implica autorização para publicar.
