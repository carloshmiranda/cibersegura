import { NextRequest, NextResponse } from "next/server";

// Tool content templates
const toolContent = {
  "security-checklist": {
    title: "Lista de Verificação de Cibersegurança para PMEs",
    description: "Avaliação completa de 50 pontos para identificar vulnerabilidades",
    content: `
# Lista de Verificação de Cibersegurança para PMEs

## Segurança da Rede e Firewall

□ Firewall empresarial configurado e ativo
□ Wi-Fi empresarial com WPA3 ou WPA2 forte
□ Rede separada para visitantes
□ Monitorização de tráfego de rede suspeito
□ Portas desnecessárias bloqueadas
□ VPN configurada para acesso remoto
□ Segmentação de rede implementada
□ Inventário de todos os dispositivos na rede
□ Políticas de acesso à rede definidas
□ Logs de rede monitorizados regularmente

## Gestão de Utilizadores e Acessos

□ Política de passwords fortes implementada
□ Autenticação de dois fatores (2FA) ativa
□ Gestor de passwords empresarial em uso
□ Revisão regular de permissões de utilizadores
□ Contas inativas desativadas promptamente
□ Princípio do menor privilégio aplicado
□ Segregação de funções implementada
□ Auditoria de acessos trimestral
□ Políticas de onboarding/offboarding
□ Controlo de acesso físico aos sistemas

## Proteção de Dados e Backup

□ Backup automático diário implementado
□ Estratégia 3-2-1 de backup seguida
□ Testes de recuperação regulares
□ Dados sensíveis identificados e classificados
□ Encriptação de dados em repouso
□ Encriptação de dados em trânsito
□ Política de retenção de dados definida
□ Conformidade RGPD verificada
□ Contratos de DPA com fornecedores
□ Procedimentos de breach notification

## Segurança dos Endpoints

□ Antivírus empresarial em todos os dispositivos
□ Sistema operativo sempre atualizado
□ Software sempre na versão mais recente
□ Política de instalação de software
□ Controlo de dispositivos USB/externos
□ Mobile Device Management (MDM) ativo
□ Proteção de email contra phishing
□ Sandboxing para ficheiros suspeitos
□ Monitorização de comportamento anómalo
□ Inventário completo de hardware e software

## Políticas e Formação

□ Política de segurança da informação documentada
□ Procedimento de resposta a incidentes definido
□ Formação anual de cibersegurança obrigatória
□ Testes de phishing simulados
□ Política de trabalho remoto seguro
□ Contactos de emergência atualizados
□ Seguro de cibersegurança considerado
□ Auditorias de segurança regulares
□ Gestão de fornecedores de IT
□ Plano de continuidade de negócio

## Pontuação e Ações Prioritárias

**Pontuação Total: ___/50**

### Interpretação:
- 40-50 pontos: Excelente postura de segurança
- 30-39 pontos: Boa base, algumas melhorias necessárias
- 20-29 pontos: Riscos significativos, ação urgente
- 0-19 pontos: Vulnerabilidades críticas, consultoria recomendada

### Top 5 Prioridades (marque as mais urgentes):
□ Implementar backup automático diário
□ Ativar 2FA em todos os serviços críticos
□ Atualizar todos os sistemas e software
□ Configurar firewall empresarial
□ Formar colaboradores sobre phishing

---
**CiberPME** | Cibersegurança para PMEs Portuguesas
https://ciberpme.vercel.app | Mais recursos gratuitos disponíveis
`
  },
  "rgpd-audit": {
    title: "Auditoria RGPD Simplificada",
    description: "Template para verificar conformidade com o RGPD",
    content: `
# Auditoria RGPD Simplificada para PMEs

## 1. Inventário de Dados Pessoais

### 1.1 Tipos de Dados Recolhidos
□ Dados de identificação (nome, email, telefone)
□ Dados financeiros (IBAN, cartão de crédito)
□ Dados de localização (morada, GPS)
□ Dados comportamentais (navegação web, compras)
□ Dados sensíveis (saúde, religiosos, políticos)

### 1.2 Fontes de Recolha
□ Formulários no website
□ Interações por email
□ Redes sociais
□ Parceiros comerciais
□ Dados públicos

### 1.3 Sistemas de Armazenamento
□ CRM (Customer Relationship Management)
□ Sistema de faturação
□ Base de dados de marketing
□ Ficheiros Excel/Word
□ Email e calendários

## 2. Base Legal para Tratamento

### Para cada finalidade, identifique a base legal:
□ **Consentimento** - Marketing direto
□ **Execução contrato** - Processar encomendas
□ **Obrigação legal** - Facturação, contabilidade
□ **Interesse legítimo** - Segurança, fraude
□ **Interesse vital** - Emergências médicas
□ **Interesse público** - Autoridades públicas

### Verificações:
□ Base legal documentada para cada tratamento
□ Consentimentos válidos e documentados
□ Políticas de privacidade atualizadas
□ Informação clara fornecida aos titulares

## 3. Direitos dos Titulares

### Procedimentos implementados para:
□ **Direito de acesso** - Fornecer cópia dos dados
□ **Direito de retificação** - Corrigir dados incorretos
□ **Direito de apagamento** - "Direito ao esquecimento"
□ **Direito de portabilidade** - Transferir dados
□ **Direito de oposição** - Parar tratamento
□ **Direito de limitação** - Suspender tratamento

### Verificações:
□ Processo de resposta em 30 dias implementado
□ Identidade do requerente verificada
□ Registos de pedidos mantidos
□ Formação da equipa sobre direitos

## 4. Medidas Técnicas e Organizativas

### Medidas de Segurança Técnicas:
□ Encriptação de dados sensíveis
□ Controlo de acessos por utilizador
□ Backup seguro e testado
□ Firewall e antivírus atualizados
□ Redes Wi-Fi seguras (WPA2/WPA3)
□ Software sempre atualizado

### Medidas Organizativas:
□ Política de privacidade e segurança
□ Formação RGPD para colaboradores
□ Contratos com processadores (DPA)
□ Procedimento de notificação de violações
□ Avaliações de impacto (quando necessário)
□ Registos de tratamento mantidos

## 5. Transferências Internacionais

### Se transferir dados para fora da UE:
□ País com decisão de adequação
□ Cláusulas contratuais tipo (SCC)
□ Normas vinculativas (BCR)
□ Derrogações aplicáveis
□ Transferências documentadas

## 6. Violações de Dados

### Procedimentos implementados:
□ Deteção de violações em 72h
□ Notificação à CNPD em 72h (se aplicável)
□ Comunicação aos titulares (se alto risco)
□ Registo interno de todas as violações
□ Análise de causas e medidas corretivas

## 7. Encarregado de Proteção de Dados (DPO)

□ DPO nomeado (se obrigatório)
□ Contactos do DPO publicados
□ DPO envolvido em questões de proteção
□ Formação adequada do DPO
□ Independência do DPO garantida

## Plano de Ação

### Prioridade Alta (resolver em 30 dias):
□ ________________________________
□ ________________________________
□ ________________________________

### Prioridade Média (resolver em 90 dias):
□ ________________________________
□ ________________________________
□ ________________________________

### Prioridade Baixa (resolver em 180 dias):
□ ________________________________
□ ________________________________
□ ________________________________

## Contactos Úteis

**CNPD** - Comissão Nacional de Proteção de Dados
Website: cnpd.pt | Email: geral@cnpd.pt | Tel: 213 928 400

**Linha RGPD CiberPME**: Subscreva a newsletter para suporte adicional

---
**CiberPME** | Cibersegurança para PMEs Portuguesas
https://ciberpme.vercel.app | Mais recursos gratuitos disponíveis
`
  },
  "vendor-risk-assessment": {
    title: "Avaliação de Risco de Fornecedores",
    description: "Questionário para avaliar riscos de cibersegurança de fornecedores",
    content: `
# Avaliação de Risco de Fornecedores - Cibersegurança

**Nome do Fornecedor:** _________________________
**Data da Avaliação:** ___________________________
**Avaliador:** ____________________________________

## 1. Informações Gerais

### 1.1 Dados do Fornecedor
- **Empresa:** _________________________________
- **Contacto:** _________________________________
- **Serviços/Produtos:** _________________________
- **Acesso a sistemas:** □ Sim □ Não
- **Acesso a dados:** □ Sim □ Não

### 1.2 Criticidade do Fornecedor
□ **Crítico** - Falha causa interrupção do negócio
□ **Importante** - Falha causa impacto significativo
□ **Normal** - Falha causa impacto limitado

## 2. Certificações de Segurança

### 2.1 Certificações Possuídas
□ ISO 27001 (Gestão de Segurança da Informação)
□ SOC 2 Type II (Controlos de Segurança)
□ ISO 22301 (Continuidade de Negócio)
□ PCI DSS (Segurança de Pagamentos)
□ TISAX (Automotive)
□ Outras: ___________________________________

### 2.2 Verificação
□ Certificados verificados e válidos
□ Âmbito das certificações relevante
□ Auditorias anuais confirmadas

## 3. Políticas de Proteção de Dados

### 3.1 Conformidade RGPD
□ Política de privacidade publicada
□ DPO nomeado (se aplicável)
□ Procedimentos para direitos dos titulares
□ Notificação de violações implementada
□ Contratos DPA disponíveis

### 3.2 Gestão de Dados
□ Classificação de dados implementada
□ Encriptação de dados em repouso
□ Encriptação de dados em trânsito
□ Backup e recuperação testados
□ Retenção de dados definida

## 4. Gestão de Incidentes

### 4.1 Capacidades de Resposta
□ Centro de operações de segurança (SOC)
□ Equipa de resposta a incidentes
□ Procedimentos documentados
□ Tempo de resposta definido (< 4h)
□ Comunicação 24/7 disponível

### 4.2 Histórico de Incidentes
□ Sem incidentes nos últimos 2 anos
□ Incidentes menores resolvidos rapidamente
□ Incidentes maiores com root cause analysis
□ Melhorias implementadas pós-incidente

## 5. Contratos e SLAs de Segurança

### 5.1 Cláusulas Contratuais
□ SLA de segurança definido (99.9% uptime)
□ Cláusulas de notificação de incidentes
□ Direito de auditoria incluído
□ Responsabilidades de segurança claras
□ Penalidades por falhas de segurança

### 5.2 Seguros e Garantias
□ Seguro de responsabilidade civil
□ Cobertura de cibersegurança
□ Garantias de performance
□ Proteção de propriedade intelectual

## 6. Auditoria e Monitorização Contínua

### 6.1 Acesso para Auditoria
□ Auditorias anuais aceites
□ Relatórios de penetration testing
□ Logs de acesso fornecidos
□ Transparência sobre subcontratados

### 6.2 Monitorização
□ Dashboard de segurança disponível
□ Alertas automáticos configurados
□ Relatórios mensais de segurança
□ KPIs de segurança definidos

## 7. Controlo de Acessos

### 7.1 Gestão de Identidades
□ Autenticação multifator obrigatória
□ Gestão centralizada de utilizadores
□ Revisão regular de acessos
□ Offboarding automático

### 7.2 Acesso aos Nossos Sistemas
□ VPN empresarial obrigatória
□ Acesso por sessões monitorizadas
□ Princípio do menor privilégio
□ Logs de auditoria mantidos

## Pontuação e Classificação

### Cálculo do Risco:
- **Verde (Baixo Risco):** 35-42 pontos
- **Amarelo (Risco Médio):** 25-34 pontos
- **Vermelho (Alto Risco):** 0-24 pontos

**Pontuação Total:** ____/42

### Ações Recomendadas:

#### Risco Baixo:
□ Renovação automática aprovada
□ Revisão anual mantida

#### Risco Médio:
□ Plano de melhorias acordado
□ Revisão semestral implementada
□ Monitorização adicional ativada

#### Risco Alto:
□ Auditoria presencial obrigatória
□ Plano de remediação em 90 dias
□ Avaliação de fornecedores alternativos
□ Aprovação da gestão de topo necessária

## Aprovações

**Avaliador:** _________________________ **Data:** __________

**Gestor IT:** _________________________ **Data:** __________

**Administração:** _____________________ **Data:** __________

---
**CiberPME** | Cibersegurança para PMEs Portuguesas
https://ciberpme.vercel.app | Mais recursos gratuitos disponíveis
`
  }
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const toolId = searchParams.get('tool');

  if (!toolId || !toolContent[toolId as keyof typeof toolContent]) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
  }

  const tool = toolContent[toolId as keyof typeof toolContent];

  // Set headers for file download
  const headers = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Disposition': `attachment; filename="${tool.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt"`,
    'Cache-Control': 'public, max-age=3600'
  };

  return new NextResponse(tool.content, { headers });
}