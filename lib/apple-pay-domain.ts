const APPLE_PAY_DOMAIN_ASSOCIATION_ENV = 'APPLE_PAY_DOMAIN_ASSOCIATION';

function normalizeApplePayDomainAssociation(value: string) {
  return value.replace(/\r\n/g, '\n').trim();
}

export function getApplePayDomainAssociation() {
  const rawValue = process.env[APPLE_PAY_DOMAIN_ASSOCIATION_ENV];

  if (!rawValue?.trim()) {
    return null;
  }

  return normalizeApplePayDomainAssociation(rawValue);
}

export { APPLE_PAY_DOMAIN_ASSOCIATION_ENV };
