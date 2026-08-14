/**
 * DEMO NOC data — illustrative subset of NOC 2021 occupations.
 * Not a complete dataset. Replace/augment with the official NOC
 * (or an API integration) before client launch.
 */

export const teerLevels = {
  0: { label: "TEER 0", note: "Management occupations" },
  1: { label: "TEER 1", note: "University degree required" },
  2: { label: "TEER 2", note: "College diploma / apprenticeship (2+ years)" },
  3: { label: "TEER 3", note: "College diploma / apprenticeship (< 2 years)" },
  4: { label: "TEER 4", note: "High school + short training" },
};

export const nocOccupations = [
  { title: "Senior managers — financial, communications and other business services", code: "00012", teer: 0 },
  { title: "Senior managers — health, education, social and community services", code: "00013", teer: 0 },
  { title: "Advertising, marketing and public relations managers", code: "10022", teer: 0 },
  { title: "Restaurant and food service managers", code: "60030", teer: 0 },
  { title: "Financial auditors and accountants", code: "11100", teer: 1 },
  { title: "Other financial officers", code: "11109", teer: 1 },
  { title: "Professional occupations in advertising, marketing and public relations", code: "11202", teer: 1 },
  { title: "Executive assistants", code: "12100", teer: 1 },
  { title: "Software engineers and designers", code: "21232", teer: 1 },
  { title: "Web developers and programmers", code: "21234", teer: 1 },
  { title: "Data scientists", code: "21223", teer: 1 },
  { title: "Cybersecurity specialists", code: "21220", teer: 1 },
  { title: "Mechanical engineers", code: "21301", teer: 1 },
  { title: "Civil engineers", code: "21300", teer: 1 },
  { title: "Electrical and electronics engineers", code: "21310", teer: 1 },
  { title: "Registered nurses and registered psychiatric nurses", code: "31301", teer: 1 },
  { title: "General practitioners and family physicians", code: "31102", teer: 1 },
  { title: "Secondary school teachers", code: "41220", teer: 1 },
  { title: "University professors and lecturers", code: "41200", teer: 1 },
  { title: "Supervisors, general office and administrative support workers", code: "12010", teer: 2 },
  { title: "Administrative officers", code: "13100", teer: 2 },
  { title: "Accounting technicians and bookkeepers", code: "12200", teer: 2 },
  { title: "Chefs", code: "62200", teer: 2 },
  { title: "Cooks", code: "63200", teer: 2 },
  { title: "Electricians", code: "72200", teer: 2 },
  { title: "Carpenters", code: "72310", teer: 2 },
  { title: "Welders and related machine operators", code: "72106", teer: 2 },
  { title: "Heavy-duty equipment mechanics", code: "72401", teer: 2 },
  { title: "Automotive service technicians, truck and bus mechanics", code: "72410", teer: 2 },
  { title: "Early childhood educators and assistants", code: "42202", teer: 2 },
  { title: "Retail sales supervisors", code: "62010", teer: 2 },
  { title: "Transport truck drivers", code: "73300", teer: 3 },
  { title: "Automotive mechanical repairers", code: "75201", teer: 3 },
  { title: "Administrative assistants", code: "13110", teer: 3 },
  { title: "Retail salespersons", code: "64100", teer: 4 },
  { title: "Cashiers", code: "65100", teer: 4 },
  { title: "General office support workers", code: "14100", teer: 4 },
];

export default nocOccupations;
