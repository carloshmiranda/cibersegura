#!/usr/bin/env node

/**
 * Seeds email sequences for CiberPME newsletter
 * Run with: node scripts/seed-email-sequences.js
 */

import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

const emailSequences = [
  // Waitlist Welcome Sequence
  {
    sequence: "waitlist_welcome",
    step: 1,
    subject: "Bem-vindo ao CiberPME — A sua posição na lista é #{{POSITION}}",
    body_html: `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo ao CiberPME</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #1e40af; padding: 40px 40px 30px; text-align: center;">
                    <h1 style="color: white; font-size: 28px; font-weight: bold; margin: 0; margin-bottom: 10px;">CiberPME</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 0;">Cibersegurança para PMEs Portuguesas</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="color: #1f2937; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Olá {{NAME}}! 👋</h2>

                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                      Obrigado por se ter subscrito à nossa newsletter sobre cibersegurança para PMEs.
                    </p>

                    <div style="background-color: #eff6ff; border: 1px solid #3b82f6; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                      <p style="color: #1e40af; font-size: 18px; font-weight: 600; margin: 0; text-align: center;">
                        A sua posição na lista: #{{POSITION}}
                      </p>
                    </div>

                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                      Enquanto preparamos conteúdo exclusivo para si, pode já:
                    </p>

                    <ul style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px; padding-left: 20px;">
                      <li style="margin-bottom: 10px;">📖 <strong>Ler os nossos artigos</strong> sobre ameaças, boas práticas e ferramentas</li>
                      <li style="margin-bottom: 10px;">🛡️ <strong>Explorar recursos</strong> de cibersegurança recomendados para PMEs</li>
                      <li style="margin-bottom: 10px;">📋 <strong>Fazer o check-up</strong> da segurança da sua empresa</li>
                    </ul>

                    <div style="text-align: center; margin-bottom: 30px;">
                      <a href="https://ciberpme.vercel.app/blog" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Ver Artigos</a>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

                    <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin-bottom: 15px;">💡 Dica da Semana: Passwords Seguras</h3>
                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                      <strong>80% dos ataques</strong> começam com passwords fracas. Use um gestor de passwords como Bitwarden (gratuito) para gerar e guardar passwords únicas para cada serviço.
                    </p>

                    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 30px;">
                      <p style="color: #92400e; font-size: 14px; margin: 0;">
                        <strong>Convide colegas:</strong> Partilhe o seu código {{REFERRAL_CODE}} e ajude outros a protegerem as suas empresas. <a href="{{REFERRAL_LINK}}" style="color: #d97706;">{{REFERRAL_LINK}}</a>
                      </p>
                    </div>

                    <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">
                      Até breve,<br>
                      <strong>Equipa CiberPME</strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f3f4f6; padding: 20px 40px; text-align: center;">
                    <p style="color: #6b7280; font-size: 12px; margin: 0; margin-bottom: 10px;">
                      CiberPME — Blog de cibersegurança para PMEs portuguesas
                    </p>
                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                      <a href="https://ciberpme.vercel.app" style="color: #3b82f6; text-decoration: none;">ciberpme.vercel.app</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    body_text: `
Olá {{NAME}}!

Obrigado por se ter subscrito à nossa newsletter sobre cibersegurança para PMEs.

A sua posição na lista: #{{POSITION}}

Enquanto preparamos conteúdo exclusivo para si, pode já:

📖 Ler os nossos artigos sobre ameaças, boas práticas e ferramentas: https://ciberpme.vercel.app/blog

🛡️ Explorar recursos de cibersegurança recomendados para PMEs: https://ciberpme.vercel.app/recursos

💡 Dica da Semana: Passwords Seguras

80% dos ataques começam com passwords fracas. Use um gestor de passwords como Bitwarden (gratuito) para gerar e guardar passwords únicas para cada serviço.

Convide colegas: Partilhe o seu código {{REFERRAL_CODE}} e ajude outros a protegerem as suas empresas: {{REFERRAL_LINK}}

Até breve,
Equipa CiberPME

---
CiberPME — Blog de cibersegurança para PMEs portuguesas
https://ciberpme.vercel.app
    `,
    delay_hours: 0,
    variant: "a",
    is_active: true
  },

  // Weekly Newsletter Template
  {
    sequence: "weekly_newsletter",
    step: 1,
    subject: "🔒 CiberPME Semanal — Ameaça da Semana + Dicas Práticas",
    body_html: `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter CiberPME</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #1e40af; padding: 30px 40px; text-align: center;">
                    <h1 style="color: white; font-size: 24px; font-weight: bold; margin: 0; margin-bottom: 8px;">🔒 CiberPME Semanal</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 14px; margin: 0;">{{WEEK_DATE}} — Edição {{EDITION_NUMBER}}</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <!-- Threat Alert -->
                    <div style="background-color: #fef2f2; border: 1px solid #fca5a5; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                      <h2 style="color: #dc2626; font-size: 18px; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center;">
                        ⚠️ Ameaça da Semana
                      </h2>
                      <p style="color: #7f1d1d; font-size: 16px; line-height: 1.6; margin: 0;">
                        {{THREAT_DESCRIPTION}}
                      </p>
                    </div>

                    <!-- Quick Tips -->
                    <h2 style="color: #1f2937; font-size: 20px; font-weight: bold; margin-bottom: 20px;">💡 Dicas Rápidas</h2>
                    <div style="margin-bottom: 30px;">
                      {{TIPS_CONTENT}}
                    </div>

                    <!-- Article Highlights -->
                    <h2 style="color: #1f2937; font-size: 20px; font-weight: bold; margin-bottom: 20px;">📖 Artigos em Destaque</h2>
                    <div style="margin-bottom: 30px;">
                      {{ARTICLES_CONTENT}}
                    </div>

                    <!-- Resource of the Week -->
                    <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                      <h3 style="color: #166534; font-size: 18px; font-weight: bold; margin-bottom: 15px;">🛠️ Ferramenta da Semana</h3>
                      <p style="color: #166534; font-size: 16px; line-height: 1.6; margin: 0;">
                        {{TOOL_RECOMMENDATION}}
                      </p>
                    </div>

                    <div style="text-align: center; margin-bottom: 30px;">
                      <a href="https://ciberpme.vercel.app/blog" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; margin-right: 15px;">Ler Mais Artigos</a>
                      <a href="https://ciberpme.vercel.app/recursos" style="display: inline-block; border: 1px solid #d1d5db; color: #374151; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Ver Recursos</a>
                    </div>

                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

                    <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">
                      Mantenha-se seguro,<br>
                      <strong>Equipa CiberPME</strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f3f4f6; padding: 20px 40px; text-align: center;">
                    <p style="color: #6b7280; font-size: 12px; margin: 0; margin-bottom: 10px;">
                      CiberPME — Newsletter semanal de cibersegurança para PMEs
                    </p>
                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                      <a href="{{UNSUBSCRIBE_LINK}}" style="color: #6b7280; text-decoration: underline;">Cancelar subscrição</a> |
                      <a href="https://ciberpme.vercel.app" style="color: #3b82f6; text-decoration: none;">ciberpme.vercel.app</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    body_text: `
🔒 CiberPME Semanal — {{WEEK_DATE}} — Edição {{EDITION_NUMBER}}

⚠️ AMEAÇA DA SEMANA
{{THREAT_DESCRIPTION}}

💡 DICAS RÁPIDAS
{{TIPS_CONTENT}}

📖 ARTIGOS EM DESTAQUE
{{ARTICLES_CONTENT}}

🛠️ FERRAMENTA DA SEMANA
{{TOOL_RECOMMENDATION}}

Ler mais: https://ciberpme.vercel.app/blog
Recursos: https://ciberpme.vercel.app/recursos

Mantenha-se seguro,
Equipa CiberPME

---
CiberPME — Newsletter semanal de cibersegurança para PMEs
Cancelar subscrição: {{UNSUBSCRIBE_LINK}}
https://ciberpme.vercel.app
    `,
    delay_hours: 0,
    variant: "a",
    is_active: false // Template only, not automatically sent
  },

  // Follow-up after 7 days
  {
    sequence: "waitlist_followup",
    step: 1,
    subject: "Preparado para melhorar a segurança da sua empresa? 🛡️",
    body_html: `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Check-up de Segurança CiberPME</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #1e40af; padding: 30px 40px; text-align: center;">
                    <h1 style="color: white; font-size: 24px; font-weight: bold; margin: 0;">🛡️ Check-up de Segurança</h1>
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 16px; margin: 10px 0 0;">Avalie o estado da cibersegurança na sua PME</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="color: #1f2937; font-size: 18px; line-height: 1.6; margin-bottom: 25px;">
                      Olá {{NAME}},
                    </p>

                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                      Há uma semana que está connosco na lista da CiberPME. É altura de fazer um <strong>check-up rápido</strong> à segurança da sua empresa.
                    </p>

                    <h2 style="color: #1f2937; font-size: 20px; font-weight: bold; margin-bottom: 20px;">✅ Lista de Verificação Essencial</h2>

                    <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 25px;">
                      <h3 style="color: #1e40af; font-size: 16px; font-weight: 600; margin-bottom: 15px;">1. Passwords e Acesso</h3>
                      <ul style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                        <li>Usa passwords únicas para cada serviço?</li>
                        <li>Tem autenticação de dois fatores ativada?</li>
                        <li>A equipa usa um gestor de passwords?</li>
                      </ul>
                    </div>

                    <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 25px;">
                      <h3 style="color: #1e40af; font-size: 16px; font-weight: 600; margin-bottom: 15px;">2. Backup e Recuperação</h3>
                      <ul style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                        <li>Tem backups automáticos configurados?</li>
                        <li>Testou a recuperação nos últimos 3 meses?</li>
                        <li>Os backups estão protegidos contra ransomware?</li>
                      </ul>
                    </div>

                    <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 25px;">
                      <h3 style="color: #1e40af; font-size: 16px; font-weight: 600; margin-bottom: 15px;">3. Software e Atualizações</h3>
                      <ul style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                        <li>O sistema operativo está atualizado?</li>
                        <li>Tem antivírus empresarial ativo?</li>
                        <li>As aplicações são atualizadas regularmente?</li>
                      </ul>
                    </div>

                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://ciberpme.vercel.app/recursos" style="display: inline-block; background-color: #16a34a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Ver Ferramentas Recomendadas</a>
                    </div>

                    <div style="background-color: #fef7cd; border: 1px solid #fbbf24; border-radius: 6px; padding: 20px; margin-bottom: 25px;">
                      <h3 style="color: #92400e; font-size: 16px; font-weight: 600; margin-bottom: 10px;">🎯 Dica: Comece pelo Mais Crítico</h3>
                      <p style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 0;">
                        Se respondeu "não" a alguma questão, priorize: <strong>1º Passwords</strong>, <strong>2º Backups</strong>, <strong>3º Antivírus</strong>. Pequenos passos fazem grande diferença!
                      </p>
                    </div>

                    <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">
                      Continue seguro,<br>
                      <strong>Equipa CiberPME</strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f3f4f6; padding: 20px 40px; text-align: center;">
                    <p style="color: #6b7280; font-size: 12px; margin: 0; margin-bottom: 10px;">
                      CiberPME — Segurança simples para PMEs portuguesas
                    </p>
                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                      <a href="https://ciberpme.vercel.app" style="color: #3b82f6; text-decoration: none;">ciberpme.vercel.app</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    body_text: `
🛡️ Check-up de Segurança CiberPME

Olá {{NAME}},

Há uma semana que está connosco na lista da CiberPME. É altura de fazer um check-up rápido à segurança da sua empresa.

✅ LISTA DE VERIFICAÇÃO ESSENCIAL

1. PASSWORDS E ACESSO
- Usa passwords únicas para cada serviço?
- Tem autenticação de dois fatores ativada?
- A equipa usa um gestor de passwords?

2. BACKUP E RECUPERAÇÃO
- Tem backups automáticos configurados?
- Testou a recuperação nos últimos 3 meses?
- Os backups estão protegidos contra ransomware?

3. SOFTWARE E ATUALIZAÇÕES
- O sistema operativo está atualizado?
- Tem antivírus empresarial ativo?
- As aplicações são atualizadas regularmente?

🎯 DICA: COMECE PELO MAIS CRÍTICO
Se respondeu "não" a alguma questão, priorize:
1º Passwords, 2º Backups, 3º Antivírus

Ver ferramentas recomendadas: https://ciberpme.vercel.app/recursos

Continue seguro,
Equipa CiberPME

---
CiberPME — Segurança simples para PMEs portuguesas
https://ciberpme.vercel.app
    `,
    delay_hours: 168, // 7 days
    variant: "a",
    is_active: true
  }
];

async function seedEmailSequences() {
  console.log("🌱 Seeding email sequences...");

  try {
    // Clear existing sequences (optional - comment out in production)
    // await sql`DELETE FROM email_sequences`;

    for (const sequence of emailSequences) {
      const result = await sql`
        INSERT INTO email_sequences
        (sequence, step, subject, body_html, body_text, delay_hours, variant, is_active)
        VALUES (
          ${sequence.sequence},
          ${sequence.step},
          ${sequence.subject},
          ${sequence.body_html},
          ${sequence.body_text},
          ${sequence.delay_hours},
          ${sequence.variant},
          ${sequence.is_active}
        )
        ON CONFLICT (sequence, step, variant)
        DO UPDATE SET
          subject = EXCLUDED.subject,
          body_html = EXCLUDED.body_html,
          body_text = EXCLUDED.body_text,
          delay_hours = EXCLUDED.delay_hours,
          is_active = EXCLUDED.is_active,
          updated_at = now()
        RETURNING id, sequence, step
      `;

      console.log(`✅ Seeded: ${sequence.sequence} step ${sequence.step}`);
    }

    console.log("🎉 Email sequences seeded successfully!");

    // Show summary
    const summary = await sql`
      SELECT sequence, COUNT(*) as steps, SUM(CASE WHEN is_active THEN 1 ELSE 0 END) as active_steps
      FROM email_sequences
      GROUP BY sequence
      ORDER BY sequence
    `;

    console.log("\n📊 Summary:");
    summary.forEach(row => {
      console.log(`   ${row.sequence}: ${row.steps} steps (${row.active_steps} active)`);
    });

  } catch (error) {
    console.error("❌ Error seeding email sequences:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedEmailSequences()
    .then(() => process.exit(0))
    .catch(error => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}

export { seedEmailSequences, emailSequences };