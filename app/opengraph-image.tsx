import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'RokitG branded preview image for The Circle';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

let cachedAvatarDataUrl: string | null = null;

async function getAvatarDataUrl() {
  if (cachedAvatarDataUrl) {
    return cachedAvatarDataUrl;
  }

  const avatarBuffer = await readFile(join(process.cwd(), 'public/brand/laser-pfp.jpg'));
  cachedAvatarDataUrl = `data:image/jpeg;base64,${avatarBuffer.toString('base64')}`;
  return cachedAvatarDataUrl;
}

export default async function OpenGraphImage() {
  const avatarSrc = await getAvatarDataUrl();

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 18% 22%, rgba(91,169,255,0.32), transparent 30%), radial-gradient(circle at 82% 16%, rgba(42,78,140,0.48), transparent 30%), linear-gradient(135deg, #050913 0%, #09111d 45%, #0e1726 100%)',
        color: '#eaf0fb',
        fontFamily: 'Inter, Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.16,
        }}
      />

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '72px 74px',
          gap: '48px',
        }}
      >
        <div
          style={{
            width: '58%',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: 24,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#9bc8ff',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '999px',
                background: '#5ba9ff',
                boxShadow: '0 0 18px rgba(91,169,255,0.85)',
              }}
            />
            ROKITG
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              textTransform: 'uppercase',
              lineHeight: 0.92,
              fontWeight: 800,
              letterSpacing: '-0.04em',
            }}
          >
            <div style={{ display: 'flex', fontSize: 108 }}>THE CIRCLE</div>
            <div style={{ display: 'flex', fontSize: 58, color: '#9bc8ff' }}>PRO COMMUNITY</div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              marginTop: '6px',
            }}
          >
            {['VERIFIED ON WHOP', '42 MEMBERS'].map((label) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px 18px',
                  borderRadius: '999px',
                  border: '1px solid rgba(91,169,255,0.28)',
                  background: 'rgba(91,169,255,0.08)',
                  color: '#eaf0fb',
                  fontSize: 18,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: '42%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '38px 30px',
              borderRadius: '32px',
              border: '1px solid rgba(91,169,255,0.24)',
              background:
                'linear-gradient(180deg, rgba(11,19,31,0.96) 0%, rgba(7,13,23,0.98) 100%)',
              boxShadow: '0 18px 50px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.07)',
              gap: '22px',
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: next/og ImageResponse renders standard img tags, not next/image. */}
            <img
              src={avatarSrc}
              alt="RokitG"
              width="290"
              height="290"
              style={{
                borderRadius: '999px',
                border: '4px solid rgba(91,169,255,0.34)',
                boxShadow: '0 0 70px rgba(91,169,255,0.22)',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 44,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                }}
              >
                @rokitdotgg
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  background: 'rgba(91,169,255,0.1)',
                  border: '1px solid rgba(91,169,255,0.26)',
                  color: '#9bc8ff',
                  fontSize: 18,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                Verified trader
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
