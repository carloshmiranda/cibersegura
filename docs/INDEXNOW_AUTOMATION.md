# IndexNow Automation Setup

Este documento explica como configurar a submissão automática de URLs para IndexNow após deployments com conteúdo novo.

## Como Funciona

O sistema detecta automaticamente quando há novo conteúdo (artigos do blog, páginas novas) e submete apenas os URLs novos ou atualizados para o IndexNow, em vez de reenviar todos os URLs a cada deployment.

### Componentes

1. **`/api/indexnow-deploy`** - Endpoint que detecta e submete URLs novos/atualizados
2. **`/api/deploy-hook`** - Endpoint que o Vercel chama após deployments bem-sucedidos
3. **Tracking de estado** - Sistema que lembra quais URLs foram submetidos anteriormente

## Configuração no Vercel

### 1. Configurar Deploy Hook

No dashboard do Vercel:

1. Vá para **Settings → Git → Deploy Hooks**
2. Crie um novo hook com:
   - **Hook Name**: IndexNow Auto-Submit
   - **Branch**: main (ou sua branch principal)
   - **Command**: deixar vazio (será executado automaticamente)

3. Copie a URL do webhook gerada

4. Configure o webhook para chamar nosso endpoint:
   - URL: `https://ciberpme.vercel.app/api/deploy-hook`
   - Method: POST
   - Headers: `Content-Type: application/json`

### 2. Configurar Variáveis de Ambiente (Opcional)

Para maior segurança, adicione:

```bash
# No Vercel
DEPLOY_HOOK_SECRET=seu_token_secreto_aqui
```

Se configurado, o deploy hook verificará este token antes de executar.

### 3. Configurar Tracking de Estado

Para tracking persistente entre deployments, configure:

```bash
# Variável que será atualizada automaticamente
INDEXNOW_LAST_SUBMISSION=""
```

**Nota**: Em produção, recomenda-se usar uma base de dados para persistir o estado entre deployments.

## Como Usar

### Submissão Automática

Após configurar os deploy hooks, a submissão acontece automaticamente:

1. Você faz push para a branch principal
2. Vercel faz deploy
3. Após deploy bem-sucedido, Vercel chama `/api/deploy-hook`
4. O sistema detecta URLs novos/atualizados
5. Submete apenas os URLs novos para IndexNow

### Submissão Manual

Para testar ou submeter manualmente:

```bash
# Submeter URLs novos/atualizados
curl -X POST https://ciberpme.vercel.app/api/indexnow-deploy

# Verificar status
curl https://ciberpme.vercel.app/api/indexnow-deploy

# Testar deploy hook
curl -X POST https://ciberpme.vercel.app/api/deploy-hook
```

### Scripts Existentes

Os scripts existentes continuam funcionando:

```bash
# Submeter TODOS os URLs (bulk submission)
npm run indexnow

# Submeter apenas URLs novos (automático)
curl -X POST https://localhost:3000/api/indexnow-deploy
```

## Detecção de Conteúdo Novo

O sistema detecta URLs novos baseado em:

1. **Posts novos**: `publishedAt` posterior ao último submission
2. **Posts atualizados**: `updatedAt` posterior ao último submission  
3. **URLs não submetidos**: URLs que não estavam na lista anterior

### Exemplo de Log

```json
{
  "success": true,
  "submitted": 3,
  "urls": [
    "https://ciberpme.vercel.app/blog/novo-post-sobre-nis2",
    "https://ciberpme.vercel.app/blog/post-atualizado-rgpd",
    "https://ciberpme.vercel.app/recursos"
  ],
  "timestamp": "2026-04-15T10:30:00.000Z",
  "message": "Successfully submitted 3 new/updated URLs to IndexNow"
}
```

## Monitorização

### Verificar Status

```bash
curl https://ciberpme.vercel.app/api/indexnow-deploy
```

Retorna informações sobre a última submissão e o que seria submetido numa próxima execução.

### Logs no Vercel

Os logs detalhados aparecem no dashboard do Vercel em **Functions → Logs**.

## Troubleshooting

### Deploy Hook Não Funciona

1. Verificar se a URL do webhook está correta
2. Confirmar que o `DEPLOY_HOOK_SECRET` coincide (se configurado)
3. Verificar logs de deploy no Vercel

### URLs Não Detectados

1. Confirmar que os posts têm `publishedAt` ou `updatedAt` corretos
2. Verificar se o timestamp de última submissão está correto
3. Executar GET em `/api/indexnow-deploy` para debug

### Submission Falhada

1. Verificar se o ficheiro `fc431a309850fb7ff6682a95bee49ba3.txt` existe em `/public/`
2. Confirmar conectividade com `api.indexnow.org`
3. Verificar rate limits do IndexNow

## Benefícios

✅ **Submissão automática**: Zero intervenção manual  
✅ **Eficiência**: Só submete URLs novos, poupa quotas de API  
✅ **Rapidez**: Novos artigos ficam indexados imediatamente  
✅ **Compatibilidade**: Funciona com scripts existentes  
✅ **Monitorização**: Logs detalhados para debugging  

## Limitações Atuais

- Estado persistido via environment variable (em produção usar BD)
- Não detecta removal de conteúdo (só adições/atualizações)
- Rate limiting básico (IndexNow tem limites diários)

## Evolução Futura

- [ ] Integração com base de dados para tracking persistente
- [ ] Detecção de URLs removidos
- [ ] Dashboard para visualizar histórico de submissões
- [ ] Integração com Google Search Console
- [ ] Retry mechanism para submissions falhadas