"use client";

import React from "react";

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EidiSend",
    url: "https://eidisend.com",
    description: "Send digital Eid Salami and gifts to your loved ones in Bangladesh.",
    potentialAction: {
      "@type": "SendAction",
      target: "https://eidisend.com/send",
      actionStatus: "https://schema.org/PotentialActionStatus",
    },
    publisher: {
      "@type": "Organization",
      name: "EidiSend",
      logo: {
        "@type": "ImageObject",
        url: "https://eidisend.com/logo.png",
      },
    },
    areaServed: "BD",
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EidiSend",
    url: "https://eidisend.com",
    logo: "https://eidisend.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      areaServed: "BD",
      availableLanguage: ["Bengali", "English"],
    },
    sameAs: [
      "https://www.facebook.com/itzmerayhan1",
      "https://www.instagram.com/itzmerayhan",
      "https://www.linkedin.com/in/rakib-aziz-b33553147",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
    </>
  );
};

export default StructuredData;
