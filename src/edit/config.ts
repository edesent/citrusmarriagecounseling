/**
 * Emailed-link sign-in for the private /stats page (the sign-in half of the
 * DFD site editor; this site has no /edit). Secrets and the allowed email
 * addresses stay in the hosting environment.
 */
export const EDITOR = {
  siteName: "Citrus Marriage Counseling",
  siteShortName: "Citrus Marriage Counseling",
  publicSite: "citrusmarriagecounseling.com",
  // www is canonical; the apex redirects to it.
  hosts: ["www.citrusmarriagecounseling.com", "citrusmarriagecounseling.com", "localhost"],
  cookieName: "dfd_edesent_citrusmarriagecounseling_edit",
  // Gold dark enough for white button text in the sign-in email.
  accent: "#7f6210",
} as const;
