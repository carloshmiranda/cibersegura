interface Tool {
  name: string;
  benefit: string;
  url: string;
  category: string;
}

interface AffiliateCTAProps {
  tools: Tool[];
  title?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export function AffiliateCTA({
  tools,
  title = "Ferramentas Recomendadas para Conformidade NIS2",
  utmSource = "ciberpme",
  utmMedium = "blog",
  utmCampaign = "nis2-affiliate"
}: AffiliateCTAProps) {
  const addUTMParams = (url: string) => {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
  };

  return (
    <div className="my-12 p-6 bg-bg-subtle border border-border rounded-md">
      <h3 className="text-lg font-bold text-brand mb-4">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <div key={index} className="flex flex-col justify-between p-4 bg-bg border border-border rounded-sm hover:border-accent transition-colors">
            <div className="mb-3">
              <h4 className="font-bold text-text mb-1">{tool.name}</h4>
              <p className="text-sm text-text-secondary line-clamp-2">{tool.benefit}</p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-accent-light text-accent rounded-full">
                {tool.category}
              </span>
            </div>
            <a
              href={addUTMParams(tool.url)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-bg bg-accent hover:bg-accent/90 rounded-sm transition-colors"
            >
              Ver Ferramenta
            </a>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-text-muted">
        Alguns links são afiliados. O CiberPME pode receber uma comissão por compras realizadas através destes links, sem custo adicional para si.
      </p>
    </div>
  );
}