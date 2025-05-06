// components/ClinicMap.tsx
'use client';

export default function ClinicMap({ mapHtml }: { mapHtml?: string }) {
  if (!mapHtml) {
    return (
      <div className="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Peta tidak tersedia</span>
      </div>
    );
  }

  // Ekstrak src dari iframe untuk validasi
  const srcMatch = mapHtml.match(/src="([^"]*)"/);
  const iframeSrc = srcMatch ? srcMatch[1] : null;

  if (!iframeSrc) {
    return <div className="text-error">Format peta tidak valid</div>;
  }

  return (
    <div className="w-full aspect-video">
      <iframe 
        src={iframeSrc}
        className="w-full h-full border-0 rounded-lg"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}