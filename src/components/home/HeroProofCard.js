import Link from "next/link";
import { Check, MapPin, ShieldCheck } from "lucide-react";

const CICC_REGISTER_URL = "https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=18715";

const HANDLED_FILES = [
  "Visitor, study & work refusals",
  "Spousal & family sponsorship refusals",
  "Express Entry / PR refusals",
  "PGWP & restoration",
  "PFL response · GCMS · Reapplication",
  "Judicial review · appeals",
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
      <div className="visual-record" aria-label="Track record highlights">
        <div className="visual-record__row"><span>Cases</span><strong>1,000+</strong></div>
        <div className="visual-record__row"><span>GCMS notes</span><strong>Every case</strong></div>
        <div className="visual-record__row"><span>Urgent PFLs</span><strong>Priority<br />drafting</strong></div>
      </div>
      <p className="visual-card__section-label">What we handle</p>
      <ul className="visual-handles">
        {HANDLED_FILES.map((item) => <li key={item}><Check width={18} height={18} aria-hidden="true" />{item}</li>)}
      </ul>
    </article>
  );
}
