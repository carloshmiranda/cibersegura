export interface AffiliateTool {
  name: string;
  description: string;
  category: "siem" | "passwords" | "email" | "backup";
  url: string;
  recommended?: boolean;
}

// NIS2-focused affiliate tools
export const nis2Tools: AffiliateTool[] = [
  {
    name: "Wazuh",
    description: "SIEM open-source para monitorização de segurança e deteção de ameaças em tempo real",
    category: "siem",
    url: "https://wazuh.com/?utm_source=ciberpme&utm_medium=affiliate&utm_content=cta",
    recommended: true
  },
  {
    name: "1Password Business",
    description: "Gestor de palavras-passe empresarial com autenticação multi-fator e políticas centralizadas",
    category: "passwords",
    url: "https://1password.com/business/?utm_source=ciberpme&utm_medium=affiliate&utm_content=cta",
    recommended: true
  },
  {
    name: "Proton Business",
    description: "Email empresarial seguro e VPN com encriptação end-to-end para comunicações protegidas",
    category: "email",
    url: "https://proton.me/business?utm_source=ciberpme&utm_medium=affiliate&utm_content=cta",
    recommended: true
  },
  {
    name: "Backblaze Business Backup",
    description: "Backup na cloud ilimitado e seguro com encriptação para proteção empresarial contínua",
    category: "backup",
    url: "https://www.backblaze.com/?utm_source=ciberpme&utm_medium=affiliate&utm_content=cta",
    recommended: true
  }
];

// Get tools by category for targeted recommendations
export const getToolsByCategory = (category: string): AffiliateTool[] => {
  return nis2Tools.filter(tool => tool.category === category);
};

// Get recommended tools only
export const getRecommendedTools = (): AffiliateTool[] => {
  return nis2Tools.filter(tool => tool.recommended);
};

// Get all tools
export const getAllNIS2Tools = (): AffiliateTool[] => {
  return nis2Tools;
};