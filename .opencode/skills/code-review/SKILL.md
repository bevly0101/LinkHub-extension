---
name: code-review
description: Faz revisão completa de código antes de commit — segurança, performance, legibilidade, e boas práticas. Use quando o usuário pedir para revisar, checar ou auditar código.
compatibility: opencode
---

## O que faço
Revisão completa de código com foco em qualidade de produção.

## Checklist obrigatório

### Segurança
- [ ] Sem credenciais ou secrets hardcoded
- [ ] Inputs validados e sanitizados
- [ ] Sem SQL injection ou XSS expostos
- [ ] Autenticação e autorização corretas

### Performance
- [ ] Sem N+1 queries ou loops desnecessários
- [ ] Cache aplicado onde faz sentido
- [ ] Operações assíncronas usadas corretamente

### Qualidade
- [ ] Funções com responsabilidade única
- [ ] Nomes de variáveis e funções descritivos
- [ ] Sem código morto ou comentários desatualizados
- [ ] Edge cases tratados

### Testes
- [ ] Casos de sucesso cobertos
- [ ] Casos de erro cobertos
- [ ] Mocks corretos onde necessário

## Output esperado
Retorne: APROVADO / APROVADO COM SUGESTÕES / REPROVADO
Liste cada problema com: arquivo, linha, severidade (crítico/médio/baixo), e sugestão de correção.