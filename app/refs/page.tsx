import { redirect } from 'next/navigation';

// /refs has been renamed to /sponsors for a more professional positioning.
// This page exists only to redirect any legacy inbound links.
export default function RefsRedirect(): never {
  redirect('/sponsors');
}
