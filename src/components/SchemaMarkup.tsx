export function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HomeHealthCareService",
        "@id": "https://algonquinnursesstl.com/#organization",
        name: "Algonquin Nurses Home Health Care I, LLC",
        alternateName: "Algonquin Nurses",
        url: "https://algonquinnursesstl.com",
        logo: "https://algonquinnursesstl.com/images/algonquin-logo-top-300.png",
        foundingDate: "1987",
        description:
          "Professional home health care services in St. Louis since 1987. Private duty care, Medicaid services, consumer directed services, youth programs, and veterans care.",
        telephone: "+1-314-822-8158",
        areaServed: [
          { "@type": "City", name: "St. Louis", addressRegion: "MO" },
          { "@type": "County", name: "St. Louis County", addressRegion: "MO" },
          { "@type": "County", name: "St. Charles County", addressRegion: "MO" },
          { "@type": "County", name: "Jefferson County", addressRegion: "MO" },
          { "@type": "County", name: "Franklin County", addressRegion: "MO" },
          { "@type": "County", name: "Lincoln County", addressRegion: "MO" },
          { "@type": "County", name: "Warren County", addressRegion: "MO" },
        ],
        serviceType: [
          "Private Duty Home Care",
          "Medicaid In-Home Care",
          "Consumer Directed Services",
          "Healthy Youth & Children Program",
          "Veterans Home Care",
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          servicePhone: {
            "@type": "ContactPoint",
            telephone: "+1-314-822-8158",
            contactType: "customer service",
            availableLanguage: "English",
          },
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://algonquinnursesstl.com/#stlouis",
        name: "Algonquin Nurses - St. Louis Office",
        address: {
          "@type": "PostalAddress",
          streetAddress: "10135 Manchester Rd.",
          addressLocality: "St. Louis",
          addressRegion: "MO",
          postalCode: "63122",
          addressCountry: "US",
        },
        telephone: "+1-314-822-8158",
        faxNumber: "+1-314-822-0952",
        openingHours: "Mo-Su 00:00-23:59",
        parentOrganization: {
          "@id": "https://algonquinnursesstl.com/#organization",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://algonquinnursesstl.com/#housesprings",
        name: "Algonquin Nurses - House Springs Office",
        address: {
          "@type": "PostalAddress",
          streetAddress: "7200 Executive Parkway",
          addressLocality: "House Springs",
          addressRegion: "MO",
          postalCode: "63051",
          addressCountry: "US",
        },
        telephone: "+1-636-274-1870",
        faxNumber: "+1-636-375-3336",
        openingHours: "Mo-Su 00:00-23:59",
        parentOrganization: {
          "@id": "https://algonquinnursesstl.com/#organization",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://algonquinnursesstl.com/#ofallon",
        name: "Algonquin Nurses - O'Fallon Office",
        telephone: "+1-636-978-1775",
        faxNumber: "+1-314-822-0952",
        openingHours: "Mo-Su 00:00-23:59",
        parentOrganization: {
          "@id": "https://algonquinnursesstl.com/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
