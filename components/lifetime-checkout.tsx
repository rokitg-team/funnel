'use client';

import { CheckCircle2, Copy, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ACCESS_PLANS, getJoinPlanHref, LIFETIME_RETURN_PATH } from '@/lib/access-plans';
import { TELEGRAM_DISPLAY, TELEGRAM_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from '@/lib/contact';
import type { EnsVerification } from '@/lib/ens';
import { getSiteUrl } from '@/lib/site';

function track(
  name: string,
  data: Record<string, string | number | boolean | null | undefined> = {},
) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const analytics = (window as typeof window & { va?: (...args: unknown[]) => void }).va;
    analytics?.('event', { name, data });
  } catch {}
}

const lifetimePlan = ACCESS_PLANS.find((plan) => plan.key === 'lifetime') ?? ACCESS_PLANS[2];
const preferredStablecoin = 'USDC on Base';
const acceptedStablecoins = ['USDC on Base', 'USDT', 'DAI'];
const acceptedChains = ['Base preferred', 'Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'BSC'];

type ApprovalFormState = {
  stablecoin: string;
  chain: string;
  txHash: string;
  senderWallet: string;
  amount: string;
  contactHandle: string;
  notes: string;
};

const initialApprovalForm: ApprovalFormState = {
  stablecoin: 'USDC',
  chain: 'Base',
  txHash: '',
  senderWallet: '',
  amount: '',
  contactHandle: '',
  notes: '',
};

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function isTxHash(value: string) {
  return /^0x[a-fA-F0-9]{64}$/.test(value.trim());
}

function isWalletAddress(value: string) {
  const normalized = value.trim();
  return /^0x[a-fA-F0-9]{40}$/.test(normalized) || normalized.toLowerCase().endsWith('.eth');
}

function buildApprovalPacket(form: ApprovalFormState, source: string) {
  return [
    'Lifetime deal approval request',
    `ENS: rokitg.eth`,
    `Destination: 0xc7BcB2EeE9BbFbf875499960746Bc52B2E1A75C6`,
    `Preferred rail: ${preferredStablecoin}`,
    `Stablecoin sent: ${form.stablecoin}`,
    `Chain used: ${form.chain}`,
    `Amount sent: ${form.amount || 'not supplied'}`,
    `TX hash: ${form.txHash.trim()}`,
    `Sender wallet: ${form.senderWallet.trim() || 'not supplied'}`,
    `Buyer handle: ${form.contactHandle.trim() || 'not supplied'}`,
    `Notes: ${form.notes.trim() || 'none'}`,
    `Source: ${source}`,
    `Return page: ${getSiteUrl(LIFETIME_RETURN_PATH)}`,
  ].join('\n');
}

type LifetimeCheckoutProps = {
  ens: EnsVerification;
};

export function LifetimeCheckout({ ens }: LifetimeCheckoutProps) {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const source = searchParams.get('source') ?? 'join';
  const variant = searchParams.get('variant') ?? 'direct';
  const showSuccess = status === 'paid' || status === 'success';

  const [form, setForm] = useState<ApprovalFormState>(initialApprovalForm);
  const [error, setError] = useState<string | null>(null);
  const [submittedPacket, setSubmittedPacket] = useState<string | null>(null);
  const [copied, setCopied] = useState<'address' | 'ens' | 'packet' | null>(null);

  useEffect(() => {
    if (showSuccess) {
      track('lifetime-deal-success', { location: 'lifetime-success', source, variant });
    }
  }, [showSuccess, source, variant]);

  const contactHref = WHATSAPP_URL || TELEGRAM_URL;
  const contactLabel = WHATSAPP_URL ? WHATSAPP_DISPLAY || 'WhatsApp' : TELEGRAM_DISPLAY;
  const approvalPacket = useMemo(() => buildApprovalPacket(form, source), [form, source]);

  async function copyValue(value: string, kind: 'address' | 'ens' | 'packet') {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied((current) => (current === kind ? null : current)), 1600);
    } catch {}
  }

  function openContactAfterSubmit(packet: string) {
    if (WHATSAPP_URL) {
      const separator = WHATSAPP_URL.includes('?') ? '&' : '?';
      const href = `${WHATSAPP_URL}${separator}text=${encodeURIComponent(packet)}`;
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    window.open(TELEGRAM_URL, '_blank', 'noopener,noreferrer');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isTxHash(form.txHash)) {
      setError('Enter a valid transaction hash.');
      return;
    }

    if (form.senderWallet && !isWalletAddress(form.senderWallet)) {
      setError('Enter a valid sender wallet or ENS name.');
      return;
    }

    if (!form.contactHandle.trim()) {
      setError('Add your Telegram, Discord, or X handle so RokitG can approve you faster.');
      return;
    }

    setError(null);
    setSubmittedPacket(approvalPacket);
    track('lifetime-deal-success', {
      location: 'lifetime-approval-form',
      source,
      variant,
      stablecoin: form.stablecoin,
      chain: form.chain,
    });
    void copyValue(approvalPacket, 'packet');
    openContactAfterSubmit(approvalPacket);
  }

  return (
    <main className="lifetime-page whop-brand">
      <div className="join-shell lifetime-shell">
        <div className="join-head">
          <Link href="/" className="join-brand">
            ROKIT<span>G</span>
          </Link>
          <div className="join-status">
            {showSuccess ? 'approval packet ready' : 'limited-time crypto deal'}
          </div>
        </div>

        <div className="lifetime-stage">
          <section className="lifetime-hero-card lifetime-deal-card">
            <div className="section-tag">{'// DIRECT CRYPTO CHECKOUT'}</div>
            <h1>
              SEND STABLES.
              <br />
              <span className="green">LOCK LIFETIME.</span>
            </h1>
            <p className="join-subtitle lifetime-subtitle">
              Prefer <strong>{preferredStablecoin}</strong>. We also accept{' '}
              <strong>USDC / USDT / DAI</strong> across all major EVM chains. Send the payment, then
              submit the TX below for manual approval by RokitG himself.
            </p>

            <div className="lifetime-stat-row">
              <div className="lifetime-stat-card">
                <strong>{lifetimePlan.price}</strong>
                <span>one-time lifetime deal</span>
              </div>
              <div className="lifetime-stat-card">
                <strong>{preferredStablecoin}</strong>
                <span>preferred rail</span>
              </div>
              <div className="lifetime-stat-card">
                <strong>Manual</strong>
                <span>RokitG approval</span>
              </div>
            </div>

            <div className="crypto-proof-grid">
              <div className="crypto-proof-card">
                <div className="crypto-proof-head">
                  <ShieldCheck size={18} strokeWidth={2.1} />
                  <span>ENS proof</span>
                </div>
                <strong>{ens.ensName}</strong>
                <p>
                  {ens.verified
                    ? 'Forward and reverse ENS lookups match the destination wallet.'
                    : 'ENS proof is temporarily unavailable, but the wallet address below remains the payment destination.'}
                </p>
              </div>
              <div className="crypto-proof-card">
                <div className="crypto-proof-head">
                  <CheckCircle2 size={18} strokeWidth={2.1} />
                  <span>Accepted rails</span>
                </div>
                <strong>All EVM stables</strong>
                <p>USDC, USDT, and DAI are accepted, with Base positioned as the cleanest route.</p>
              </div>
            </div>

            <div className="crypto-checkout-grid">
              <div className="crypto-qr-card">
                <div className="crypto-qr-showcase">
                  <div className="crypto-qr-showcase-head">
                    <div className="crypto-qr-title">Receive</div>
                    <div className="crypto-qr-ens">{ens.ensName}</div>
                  </div>

                  <div className="crypto-qr-frame crypto-qr-frame-showcase">
                    <Image
                      src="/brand/rokitg-wallet-qr.svg"
                      alt="QR code for rokitg.eth receiving wallet"
                      width={360}
                      height={360}
                      className="crypto-qr-image crypto-qr-image-showcase"
                      priority
                    />
                  </div>
                </div>

                <div className="crypto-wallet-lines">
                  <button
                    type="button"
                    className="crypto-copy-line"
                    onClick={() => copyValue(ens.ensName, 'ens')}
                  >
                    <div>
                      <span>ENS</span>
                      <strong>{ens.ensName}</strong>
                    </div>
                    <span>{copied === 'ens' ? 'copied' : 'copy'}</span>
                  </button>
                  <button
                    type="button"
                    className="crypto-copy-line"
                    onClick={() => copyValue(ens.address, 'address')}
                  >
                    <div>
                      <span>Wallet</span>
                      <strong>{truncateAddress(ens.address)}</strong>
                    </div>
                    <span>{copied === 'address' ? 'copied' : 'copy'}</span>
                  </button>
                </div>

                <p className="checkout-caption">
                  Wallet destination: <strong>{ens.address}</strong>
                </p>
              </div>

              <div className="crypto-form-card">
                <div className="checkout-panel-label">Manual approval form</div>
                <div className="checkout-panel-title">Submit your TX</div>
                <p className="direct-offer-copy">
                  After sending funds, fill this out. We&apos;ll prepare the approval packet, copy
                  it for you, and open your direct contact route with RokitG.
                </p>

                <form className="crypto-approval-form" onSubmit={handleSubmit}>
                  <div className="crypto-form-grid">
                    <label>
                      <span>Stablecoin</span>
                      <select
                        value={form.stablecoin}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, stablecoin: event.target.value }))
                        }
                      >
                        <option value="USDC">USDC</option>
                        <option value="USDT">USDT</option>
                        <option value="DAI">DAI</option>
                      </select>
                    </label>
                    <label>
                      <span>Chain</span>
                      <select
                        value={form.chain}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, chain: event.target.value }))
                        }
                      >
                        {['Base', 'Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'BSC'].map(
                          (chain) => (
                            <option key={chain} value={chain}>
                              {chain}
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                  </div>

                  <label>
                    <span>Transaction hash</span>
                    <input
                      value={form.txHash}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, txHash: event.target.value }))
                      }
                      placeholder="0x..."
                    />
                  </label>

                  <div className="crypto-form-grid">
                    <label>
                      <span>Sender wallet or ENS</span>
                      <input
                        value={form.senderWallet}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, senderWallet: event.target.value }))
                        }
                        placeholder="0x... or yourname.eth"
                      />
                    </label>
                    <label>
                      <span>Amount sent</span>
                      <input
                        value={form.amount}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, amount: event.target.value }))
                        }
                        placeholder="99 USDC"
                      />
                    </label>
                  </div>

                  <label>
                    <span>Best contact handle</span>
                    <input
                      value={form.contactHandle}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, contactHandle: event.target.value }))
                      }
                      placeholder="@telegram / @x / discord user"
                    />
                  </label>

                  <label>
                    <span>Notes (optional)</span>
                    <textarea
                      value={form.notes}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, notes: event.target.value }))
                      }
                      placeholder="Anything RokitG should know before approving you."
                      rows={4}
                    />
                  </label>

                  {error ? <div className="checkout-result error">{error}</div> : null}

                  <div className="crypto-form-actions">
                    <button type="submit" className="btn-primary btn-cta-blue">
                      SUBMIT FOR APPROVAL →
                    </button>
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => copyValue(approvalPacket, 'packet')}
                    >
                      <Copy size={15} strokeWidth={2.2} />
                      COPY APPROVAL PACKET
                    </button>
                  </div>
                </form>

                {submittedPacket ? (
                  <div className="crypto-submission-card">
                    <div className="checkout-result-label">Approval packet ready</div>
                    <strong>Packet copied. Open {contactLabel} and send it directly.</strong>
                    <pre>{submittedPacket}</pre>
                    <div className="crypto-form-actions">
                      <a
                        href={contactHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary btn-cta-blue"
                      >
                        OPEN CONTACT
                      </a>
                      <Link href={`${LIFETIME_RETURN_PATH}&source=${source}`} className="btn-ghost">
                        MARK AS SENT
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {showSuccess ? (
              <div className="checkout-result success lifetime-success-card">
                <div className="checkout-result-label">Payment sent</div>
                <h3>Now get approved.</h3>
                <p>
                  Your direct-buy flow is not complete until RokitG reviews your TX and activates
                  lifetime access. Use the approval form above or contact {contactLabel} directly.
                </p>
                <div className="lifetime-success-links">
                  <a
                    href={contactHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-cta-blue"
                  >
                    OPEN CONTACT
                  </a>
                  <Link href="/welcome" className="btn-ghost">
                    OPEN WELCOME GUIDE
                  </Link>
                </div>
              </div>
            ) : null}
          </section>

          <aside className="lifetime-side-card lifetime-deal-side">
            <div className="checkout-panel-label">Why this route wins</div>
            <div className="checkout-panel-title">Crypto-native checkout.</div>
            <div className="lifetime-side-copy">
              <p>
                This page is the direct on-site deal. We prefer stablecoins here because it keeps
                the buyer flow fast and the sale on-domain.
              </p>
              <p>
                Base is the recommended rail for USDC, but we can still process USDT and DAI across
                major EVM chains if that&apos;s what you&apos;re already using.
              </p>
            </div>

            <div className="lifetime-note-card">
              <span>Preferred rail</span>
              <strong>USDC on Base</strong>
              <p>
                Fastest manual approval path and the cleanest operator workflow for direct buys.
              </p>
            </div>

            <div className="lifetime-note-card">
              <span>Accepted stables</span>
              <strong>{acceptedStablecoins.join(' · ')}</strong>
              <p>Accepted chains: {acceptedChains.join(' · ')}.</p>
            </div>

            <div className="lifetime-note-card">
              <span>Onchain identity</span>
              <strong>{ens.verified ? 'Verified ENS owner' : 'ENS check pending'}</strong>
              <p>
                {ens.primaryName
                  ? `Primary name resolves back to ${ens.primaryName}.`
                  : 'Forward ENS resolution remains displayed even if reverse lookup is unavailable.'}
              </p>
            </div>

            <div className="lifetime-note-card">
              <span>Return path</span>
              <strong>{LIFETIME_RETURN_PATH}</strong>
              <p>
                Use this confirmation URL after payment if you want the approval state to open fast.
              </p>
            </div>

            <Link
              href={getJoinPlanHref('monthly', { cta: 'lifetime-fallback', variant })}
              className="btn-ghost lifetime-whop-fallback"
              onClick={() =>
                track('monthly-init', {
                  location: 'lifetime-page-fallback',
                  source,
                  variant,
                  plan: 'monthly',
                })
              }
            >
              I&apos;D RATHER USE WHOP
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
