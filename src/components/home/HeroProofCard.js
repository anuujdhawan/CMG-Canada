import Link from "next/link";
import { Check, MapPin, ShieldCheck } from "lucide-react";

const CICC_REGISTER_URL = "https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=18715";

const HANDLED_FILES = [
  "Express Entry refusals (CRS, eligibility)",
  "Provincial Nominee Program (PNP) refusals",
  "Study permit & PGWP refusals",
  "Spousal & family sponsorship refusals",
  "LMIA & work permit refusals",
  "Judicial review referrals",
];

export default function HeroProofCard({ ariaLabel = "Track record and files we handle" }) {
  return (
    <article className="visual-card hero-proof-card" aria-label={ariaLabel}>
      <div className="mini-badges">
        <Link href={CICC_REGISTER_URL} target="_blank" rel="noopener noreferrer" className="mini-badge">
          <ShieldCheck width={15} height={15} aria-hidden="true" /> CICC-regulated
        </Link>
        <span className="mini-badge"><MapPin width={15} height={15} aria-hidden="true" /> Canada-wide</span>
      </div>
      <h2>Our track record</h2>
      <p>A decade of files, decisions and outcomes across every major Canadian pathway.</p>
      <div className="visual-record" aria-label="Track record highlights">
        <div className="visual-record__row"><span>Cases since 2016</span><strong>10,000+</strong></div>
        <div className="visual-record__row"><span>File reviews</span><strong>100%</strong></div>
        <div className="visual-record__row"><span>Urgent deadlines</span><strong>Same-day</strong></div>
      </div>
      <p className="visual-card__section-label">What we handle</p>
      <ul className="visual-handles">
        {HANDLED_FILES.map((item) => <li key={item}><Check width={18} height={18} aria-hidden="true" />{item}</li>)}
      </ul>
      <div className="visual-card__footer">
        <span>Commonwealth Migration Group Inc</span>
        <strong>CICC-Regulated Practice</strong>
      </div>
    </article>
  );
}
