import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'CiberPME — Cibersegurança para PMEs Portuguesas';
    const description = searchParams.get('description') || 'Blog de cibersegurança e recursos para pequenas e médias empresas portuguesas';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f1f5f9', // brand-light from design tokens
            fontSize: 32,
            fontWeight: 600,
            position: 'relative',
          }}
        >
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 700,
                color: '#0f172a', // brand color from design tokens
                marginBottom: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {/* Simple shield icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#1e40af', // accent color from design tokens
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '36px',
                    borderRadius: '4px 4px 16px 16px',
                    border: '3px solid white',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '12px',
                      height: '2px',
                      backgroundColor: 'white',
                      borderRadius: '1px',
                    }}
                  />
                </div>
              </div>
              CiberPME
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '56px',
                fontWeight: 700,
                color: '#0f172a', // brand color
                lineHeight: '1.1',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '24px',
                color: '#6b7280', // text-secondary from design tokens
                lineHeight: '1.4',
                textAlign: 'center',
                maxWidth: '700px',
              }}
            >
              {description}
            </div>

            {/* Domain */}
            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                right: '60px',
                fontSize: '18px',
                color: '#9ca3af', // text-muted from design tokens
                fontWeight: 500,
              }}
            >
              ciberpme.vercel.app
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
