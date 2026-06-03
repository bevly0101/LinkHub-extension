---
name: debug-flow
description: Processo estruturado de debugging para erros complexos. Use quando o usuário tiver um erro, bug, comportamento inesperado ou problema difícil de diagnosticar.
compatibility: opencode
---

## O que faço
Conduzo um processo sistemático de debugging para encontrar a causa raiz.

## Processo de 5 etapas

### 1. Entender o problema
- Qual é o comportamento esperado vs o atual?
- O erro é consistente ou intermitente?
- Quando começou a acontecer?

### 2. Buscar contexto atualizado
- Se envolver uma biblioteca, use context7 para verificar problemas conhecidos na versão usada
- Se for erro recente, busque com tavily para ver se é um bug reportado

### 3. Isolar o problema
- Reproduzir em ambiente mínimo
- Identificar se é: dados, lógica, integração, ambiente ou configuração

### 4. Hipóteses ordenadas por probabilidade
Liste de 3 a 5 hipóteses da mais para menos provável.
Para cada uma: teste rápido para confirmar ou descartar.

### 5. Solução e prevenção
- Aplicar a correção
- Explicar por que o bug existia
- Sugerir como prevenir recorrência (teste, validação, lint rule)

## Output esperado
1. Causa raiz identificada
2. Correção aplicada com explicação
3. Como reproduzir o teste que confirma a correção