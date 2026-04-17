import { AffiliateTool } from '@/components/blog/inline-affiliate-cta';
import { nis2Tools } from '@/lib/affiliate-tools';

interface InlineCtaConfig {
  afterHeading: string; // Insert CTA after this heading text (partial match)
  tool: AffiliateTool;
  contextualCopy: string;
}

// Configuration for high-traffic articles that should get inline CTAs
export const INLINE_CTA_CONFIGS: Record<string, InlineCtaConfig[]> = {
  // 1. Complete CNCS registration guide - highest priority for SIEM/monitoring
  'registo-cncs-nis2-guia-completo': [
    {
      afterHeading: 'Documentação',
      tool: nis2Tools.find(t => t.name === 'Wazuh')!,
      contextualCopy: '💡 Para cumprir os requisitos de monitorização contínua do CNCS, implemente um SIEM gratuito como o Wazuh. Detecte incidentes em tempo real e mantenha logs de segurança conformes com a NIS2.'
    }
  ],

  // 2. NIS2 entered force article - password management focus
  'nis2-entrou-em-vigor': [
    {
      afterHeading: 'Medidas de Segurança',
      tool: nis2Tools.find(t => t.name === '1Password Business')!,
      contextualCopy: '🔐 A autenticação multi-factor é obrigatória na NIS2. Implemente já um gestor de palavras-passe empresarial para centralizar acessos e eliminar passwords fracas na sua PME.'
    }
  ],

  // 3. Main NIS2 guide for SMEs - backup focus
  'nis2-portugal-guia-pme': [
    {
      afterHeading: 'Gestão de Incidentes',
      tool: nis2Tools.find(t => t.name === 'Acronis Cyber Backup')!,
      contextualCopy: '📦 Backups seguros são essenciais para recuperação rápida após incidentes. Proteja-se contra ransomware com uma solução que cumpre os padrões de continuidade exigidos pela NIS2.'
    }
  ],

  // 4. CNCS deadline article - email security focus
  'registo-cncs-nis2-prazo-4-maio-2026': [
    {
      afterHeading: 'Prazos Críticos',
      tool: nis2Tools.find(t => t.name === 'Proton Business')!,
      contextualCopy: '📧 Com o prazo CNCS a aproximar-se, implemente comunicações seguras imediatamente. Email encriptado end-to-end protege dados sensíveis e cumpre requisitos de confidencialidade.'
    }
  ],

  // 5. Best cybersecurity tools article - SIEM focus for monitoring
  'melhores-ferramentas-ciberseguranca-pmes-2026': [
    {
      afterHeading: 'Monitorização',
      tool: nis2Tools.find(t => t.name === 'Wazuh')!,
      contextualCopy: '🔍 Para monitorização eficaz em 2026, considere o Wazuh como SIEM gratuito. Detecta ameaças em tempo real, mantém logs de conformidade e integra-se facilmente com a infraestrutura existente.'
    }
  ]
};

// Check if an article should have inline CTAs
export function getInlineCtaConfigs(articleSlug: string): InlineCtaConfig[] {
  return INLINE_CTA_CONFIGS[articleSlug] || [];
}

// Check if CTA should be inserted after a specific heading
export function shouldInsertCtaAfterHeading(heading: string, configs: InlineCtaConfig[]): InlineCtaConfig | null {
  return configs.find(config =>
    heading.toLowerCase().includes(config.afterHeading.toLowerCase())
  ) || null;
}