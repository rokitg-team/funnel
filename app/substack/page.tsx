import { redirect } from 'next/navigation';

// /substack has been renamed to /newsletter for a more professional positioning.
// This page exists only to redirect any legacy inbound links.
export default function SubstackRedirect(): never {
  redirect('/newsletter');
}
