import React from 'react';

const ReferencesPage = () => {
  // Reference data organized by categories
  const references = {
    academicPapers: [
      {
        authors: "Kurtz, S. M., Ong, K. L., Lau, E., & Bozic, K. J.",
        year: 2014,
        title: "Impact of the economic downturn on total joint replacement demand in the United States: Updated projections to 2021",
        journal: "The Journal of Bone and Joint Surgery",
        volume: "96(8)",
        pages: "624-630",
        doi: "10.2106/JBJS.M.00285"
      },
      {
        authors: "Learmonth, I. D., Young, C., & Rorabeck, C.",
        year: 2007,
        title: "The operation of the century: Total hip replacement",
        journal: "The Lancet",
        volume: "370(9597)",
        pages: "1508-1519",
        doi: "10.1016/S0140-6736(07)60457-7"
      },
      {
        authors: "Pivec, R., Johnson, A. J., Mears, S. C., & Mont, M. A.",
        year: 2012,
        title: "Hip arthroplasty",
        journal: "The Lancet",
        volume: "380(9855)",
        pages: "1768-1777",
        doi: "10.1016/S0140-6736(12)60607-2"
      },
      {
        authors: "Affatato, S., Traina, F., & Toni, A.",
        year: 2011,
        title: "Microseparation and stripe wear in alumina-on-alumina hip implants",
        journal: "International Journal of Artificial Organs",
        volume: "34(6)",
        pages: "506-512",
        doi: "10.5301/IJAO.2011.8457"
      },
      {
        authors: "Bozic, K. J., Kurtz, S. M., Lau, E., Ong, K., Vail, T. P., & Berry, D. J.",
        year: 2009,
        title: "The epidemiology of revision total hip arthroplasty in the United States",
        journal: "The Journal of Bone and Joint Surgery",
        volume: "91(1)",
        pages: "128-133",
        doi: "10.2106/JBJS.H.00155"
      }
    ],
    standards: [
      {
        id: "ISO 7206-1:2008",
        title: "Implants for surgery — Partial and total hip joint prostheses — Part 1: Classification and designation of dimensions",
        organization: "International Organization for Standardization",
        year: 2008
      },
      {
        id: "ISO 7206-2:2011",
        title: "Implants for surgery — Partial and total hip joint prostheses — Part 2: Articulating surfaces made of metallic, ceramic and plastics materials",
        organization: "International Organization for Standardization",
        year: 2011
      },
      {
        id: "ASTM F1537-20",
        title: "Standard Specification for Wrought Cobalt-28Chromium-6Molybdenum Alloys for Surgical Implants",
        organization: "ASTM International",
        year: 2020
      },
      {
        id: "ASTM F136-13",
        title: "Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI (Extra Low Interstitial) Alloy for Surgical Implant Applications",
        organization: "ASTM International",
        year: 2013
      },
      {
        id: "ASTM F2033-12",
        title: "Standard Specification for Total Hip Joint Prosthesis and Hip Endoprosthesis Bearing Surfaces Made of Metallic, Ceramic, and Polymeric Materials",
        organization: "ASTM International",
        year: 2012
      }
    ],
    regulatoryDocuments: [
      {
        id: "FDA-2011-D-0293",
        title: "Guidance for Industry and FDA Staff: Metal-on-Metal Hip Replacement Systems",
        organization: "U.S. Food and Drug Administration",
        year: 2013,
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/information-metal-metal-hip-implants"
      },
      {
        id: "MEDDEV 2.7/1 Rev.4",
        title: "Guidelines on Medical Devices: Clinical Evaluation",
        organization: "European Commission",
        year: 2016,
        url: "https://ec.europa.eu/health/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en"
      },
      {
        id: "93/42/EEC",
        title: "Council Directive 93/42/EEC concerning medical devices",
        organization: "European Union",
        year: 1993,
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:31993L0042"
      }
    ],
    books: [
      {
        authors: "Revell, P. A.",
        year: 2008,
        title: "Joint Replacement Technology",
        publisher: "Woodhead Publishing",
        location: "Cambridge, UK",
        isbn: "978-1-84569-305-6"
      },
      {
        authors: "Santavirta, S.",
        year: 2003,
        title: "The Young Patient's Hip in Orthopaedic Surgery",
        publisher: "Elsevier",
        location: "Amsterdam, Netherlands",
        isbn: "978-0-444-51486-6"
      },
      {
        authors: "Callaghan, J. J., Rosenberg, A. G., & Rubash, H. E.",
        year: 2007,
        title: "The Adult Hip",
        publisher: "Lippincott Williams & Wilkins",
        location: "Philadelphia, PA",
        isbn: "978-0-7817-5092-9"
      }
    ],
    websites: [
      {
        title: "American Academy of Orthopaedic Surgeons: Total Hip Replacement",
        url: "https://orthoinfo.aaos.org/en/treatment/total-hip-replacement/",
        accessed: "April 14, 2023"
      },
      {
        title: "National Joint Registry (UK)",
        url: "https://www.njrcentre.org.uk/",
        accessed: "April 14, 2023"
      },
      {
        title: "American Joint Replacement Registry",
        url: "https://www.ajrr.net/",
        accessed: "April 14, 2023"
      }
    ]
  };

  return (
    <div className="references-page">
      <h1>References</h1>
      
      <div className="references-container">
        <section className="reference-section">
          <h2>Academic Papers</h2>
          <div className="reference-list">
            {references.academicPapers.map((paper, index) => (
              <div className="reference-item" key={index}>
                <p className="reference-text">
                  {paper.authors} ({paper.year}). {paper.title}. <em>{paper.journal}</em>, {paper.volume}, {paper.pages}.
                  {paper.doi && <span> DOI: {paper.doi}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="reference-section">
          <h2>Standards & Specifications</h2>
          <div className="reference-list">
            {references.standards.map((standard, index) => (
              <div className="reference-item" key={index}>
                <p className="reference-text">
                  {standard.id}: {standard.title}. {standard.organization}. ({standard.year}).
                </p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="reference-section">
          <h2>Regulatory Documents</h2>
          <div className="reference-list">
            {references.regulatoryDocuments.map((doc, index) => (
              <div className="reference-item" key={index}>
                <p className="reference-text">
                  {doc.organization}. ({doc.year}). {doc.title}. {doc.id}.
                  {doc.url && <span> Retrieved from <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.url}</a></span>}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="reference-section">
          <h2>Books</h2>
          <div className="reference-list">
            {references.books.map((book, index) => (
              <div className="reference-item" key={index}>
                <p className="reference-text">
                  {book.authors} ({book.year}). <em>{book.title}</em>. {book.publisher}, {book.location}. ISBN: {book.isbn}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="reference-section">
          <h2>Websites</h2>
          <div className="reference-list">
            {references.websites.map((website, index) => (
              <div className="reference-item" key={index}>
                <p className="reference-text">
                  {website.title}. Retrieved {website.accessed} from <a href={website.url} target="_blank" rel="noopener noreferrer">{website.url}</a>
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <div className="citation-note">
        <h3>Citation Style</h3>
        <p>
          The references on this page follow the American Psychological Association (APA) 7th edition citation style. 
          This style is commonly used in scientific and medical publications.
        </p>
      </div>
    </div>
  );
};

export default ReferencesPage;
