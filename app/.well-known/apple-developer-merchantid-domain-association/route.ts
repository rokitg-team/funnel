import {
  APPLE_PAY_DOMAIN_ASSOCIATION_ENV,
  getApplePayDomainAssociation,
} from '@/lib/apple-pay-domain';

export async function GET() {
  const association = getApplePayDomainAssociation();

  if (!association) {
    return new Response(
      `Missing ${APPLE_PAY_DOMAIN_ASSOCIATION_ENV}. Add the exact file contents from Stripe to verify this domain.`,
      {
        status: 503,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
        },
      },
    );
  }

  return new Response(association, {
    status: 200,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=300',
    },
  });
}
