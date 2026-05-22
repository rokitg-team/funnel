'use client';

import { Command } from 'cmdk';
import Image from 'next/image';
import { useMemo, useState } from 'react';

export type SponsorCatalogItem = {
  id: string;
  name: string;
  category: 'EXCHANGE' | 'PERPS' | 'DEX' | 'TOOL' | 'WALLET' | 'PREDICTION';
  protocolType: string;
  blockchains: string[];
  refCode?: string;
  bonus: string;
  desc: string;
  primaryUrl: string;
  primaryLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  logoSrc: string;
  logoAlt: string;
  logoWide?: boolean;
  heroSrc?: string;
  heroAlt?: string;
  theme?: 'bybit' | 'axiom' | 'hyperliquid';
  searchTerms?: string[];
};

type SponsorsCatalogProps = {
  partners: SponsorCatalogItem[];
};

function buildSearchIndex(partner: SponsorCatalogItem) {
  return [
    partner.name,
    partner.category,
    partner.protocolType,
    partner.refCode,
    partner.bonus,
    partner.desc,
    partner.primaryLabel,
    partner.secondaryLabel,
    partner.primaryUrl,
    partner.secondaryUrl,
    ...partner.blockchains,
    ...(partner.searchTerms ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function SponsorsCatalog({ partners }: SponsorsCatalogProps) {
  const [query, setQuery] = useState('');

  const filteredPartners = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return partners;
    }

    return partners.filter((partner) => buildSearchIndex(partner).includes(normalized));
  }, [partners, query]);

  return (
    <>
      <div className="refs-divider">
        <span>{'// Basic tier sponsors'}</span>
      </div>

      <section className="sponsor-search-shell" aria-label="Search sponsors">
        <div className="sponsor-search-copy">
          <div className="sponsor-search-label">Search reflinks</div>
          <div className="sponsor-search-title">Find by name, chain, protocol, or ref code.</div>
          <p>
            Search examples: <strong>solana</strong>, <strong>perps</strong>, <strong>ROKIT</strong>
            , <strong>prediction</strong>, <strong>base</strong>.
          </p>
        </div>
        <Command className="sponsor-search-box sponsor-command" shouldFilter={false}>
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search sponsors, chains, protocol types, or ref codes"
            aria-label="Search sponsors by name, chain, protocol, or referral code"
          />
          <div className="sponsor-search-meta">
            <span>{filteredPartners.length} results</span>
            <span>{query ? `query: ${query}` : 'all sponsors visible'}</span>
          </div>
          <Command.List className="sponsor-command-list">
            <Command.Empty className="sponsor-command-empty">
              No sponsors match that search.
            </Command.Empty>
          </Command.List>
        </Command>
      </section>

      <div className="refs-grid">
        {filteredPartners.map((p) => (
          <article
            key={p.id}
            className={`ref-card${p.secondaryUrl ? ' ref-card-dual' : ''}${p.theme ? ` ref-card-${p.theme}` : ''}${p.heroSrc ? ' ref-card-brand' : ''}`}
          >
            <div className="ref-visual" aria-hidden="true">
              <Image src={p.logoSrc} alt="" className="ref-visual-mark" width={92} height={92} />
            </div>
            {p.heroSrc ? (
              <div className="ref-hero" aria-hidden="true">
                <Image
                  src={p.heroSrc}
                  alt={p.heroAlt ?? ''}
                  className="ref-hero-img"
                  width={720}
                  height={360}
                />
              </div>
            ) : null}
            <div className="ref-card-head">
              <div className={`ref-logo${p.logoWide ? ' ref-logo-wide' : ''}`}>
                <Image
                  src={p.logoSrc}
                  alt={p.logoAlt}
                  className="ref-logo-img"
                  width={p.logoWide ? 104 : 36}
                  height={36}
                />
              </div>
              <span className="ref-category">{p.category}</span>
            </div>
            <div className="ref-name">{p.name}</div>
            <div className="ref-bonus">{p.bonus}</div>
            <div className="ref-taxonomy">
              <span>{p.protocolType}</span>
              <span>{p.blockchains.join(' · ')}</span>
              {p.refCode ? <span>code: {p.refCode}</span> : null}
            </div>
            <p className="ref-desc">{p.desc}</p>
            <div className="ref-actions">
              <a
                href={p.primaryUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="ref-cta"
                data-va-location={p.id === 'polymarket' ? 'polymarket-referral' : `sponsor-${p.id}`}
                data-va-event={`${p.id}-ref-click`}
              >
                {p.primaryLabel ?? 'Sign up'} <span>→</span>
              </a>
              {p.secondaryUrl ? (
                <a
                  href={p.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="ref-cta ref-cta-secondary"
                  data-va-location={
                    p.id === 'polymarket' ? 'polymarket-profile' : `sponsor-${p.id}-secondary`
                  }
                  data-va-event={
                    p.id === 'polymarket' ? 'polymarket-profile-click' : `${p.id}-secondary-click`
                  }
                >
                  {p.secondaryLabel}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
